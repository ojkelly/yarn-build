import {
  Configuration,
  Manifest,
  Project,
  StreamReport,
  Workspace,
  FormatType,
  Locator,
  formatUtils,
} from "@yarnpkg/core";
import isCI from "is-ci";
import { cpus } from "os";
import { Filename, PortablePath, ppath, xfs } from "@yarnpkg/fslib";
import { isYarnBuildConfiguration, YarnBuildConfiguration } from "../config";
import micromatch from "micromatch";

import { EventEmitter } from "events";
import PQueue from "p-queue";
import path from "path";
import PLimit, { Limit } from "p-limit";
import { Mutex } from "await-semaphore";
import fs from "fs";
import stripAnsi from "strip-ansi";
import sliceAnsi from "slice-ansi";
import { Graph, Node, RunCallback } from "./graph";
import { Hansi } from "./hansi";
import { terminateAllChildProcesses } from "./terminate";

const YARN_RUN_CACHE_FILENAME = "yarn.build.json" as Filename;

const DIVIDER_LENGTH = 80;
const DIVIDER = "-".repeat(DIVIDER_LENGTH);

enum RunStatus {
  pending = "pending",
  skipped = "skipped",
  inProgress = "inProgress",
  failed = "failed",
  succeeded = "succeeded",
}
type RunLogFile = {
  comment: string;
  packages: {
    [relativePath: string]: RunLogEntry;
  };
};
type RunLog = Map<string, RunLogEntry>;
type RunLogEntry = {
  lastModified?: number;
  status?: RunStatus;
  rerun?: boolean;
  haveCheckedForRerun?: boolean;
  command: string;
};

enum RunSupervisorReporterEvents {
  pending = "pending",
  start = "start",
  info = "info",
  error = "error",
  skipped = "skipped",
  ignored = "ignored",
  success = "success",
  fail = "fail",
  finish = "finish",
  forceQuit = "force-quit",
}

type RunReport = {
  mutex: Mutex;
  runStart?: number;
  totalJobs: number;
  previousOutput: string;
  successCount: number;
  failCount: number;
  skipCount: number;
  ignoredCount: number;
  done: boolean;
  workspaces: {
    // Matches the workspace to its pseudo-thread
    [relativeCwd: string]: {
      start?: number;
      name: string;
      locator: Locator;
      runScript?: string;
      done: boolean;
      fail: boolean;
      stdout: string[];
      stderr: Error[];
      runtimeSeconds?: number;
      skipped?: boolean;
      ignored?: boolean;
    };
  };
};

type RunCommandCli = (
  command: string,
  cwd: PortablePath,
  runReporter: EventEmitter,
  prefix: string
) => Promise<number>;

class RunSupervisor {
  project: Project;

  configuration: Configuration;

  pluginConfiguration: YarnBuildConfiguration;

  report: StreamReport;

  runCommand: string;

  cli: RunCommandCli;

  runLog?: RunLog;

  runGraph = new Graph();

  runLength = 0;

  runTargets: Workspace[] = [];

  runMutexes: { [relativCwd: string]: Mutex } = {};

  currentRunTarget?: string;

  dryRun = false;

  ignoreRunCache = false;

  verbose = false;

  continueOnError = false;

  concurrency: number;

  limit: Limit;

  queue: PQueue;

  entrypoints: Node[] = [];

  excluded: Set<Workspace> = new Set<Workspace>();

  runReporter: EventEmitter = new EventEmitter();

  runReport: RunReport = {
    mutex: new Mutex(),
    totalJobs: 0,
    skipCount: 0,
    previousOutput: ``,
    successCount: 0,
    failCount: 0,
    ignoredCount: 0,
    workspaces: {},
    done: false,
  };

  header = "";

  nextUnitOfWork: Promise<void>[] = [];

  errorLogFile: fs.WriteStream | undefined;

  excludeWorkspacePredicate: (targetWorkspace: Workspace) => boolean;

  private hasSetup = false;

  constructor({
    project,
    report,
    runCommand,
    cli,
    configuration,
    pluginConfiguration,
    dryRun,
    ignoreRunCache,
    verbose,
    concurrency,
    continueOnError,
    excludeWorkspacePredicate,
  }: {
    project: Project;
    report: StreamReport;
    runCommand: string;
    cli: RunCommandCli;
    configuration: Configuration;
    pluginConfiguration: YarnBuildConfiguration;
    dryRun: boolean;
    ignoreRunCache: boolean;
    verbose: boolean;
    concurrency?: number | undefined;
    continueOnError: boolean;
    excludeWorkspacePredicate: (targetWorkspace: Workspace) => boolean;
  }) {
    const resolvedConcurrency = concurrency ?? Math.max(1, cpus().length);

    this.configuration = configuration;
    this.pluginConfiguration = pluginConfiguration;
    this.project = project;
    this.report = report;
    this.runCommand = runCommand;
    this.cli = cli;
    this.dryRun = dryRun;
    this.ignoreRunCache = ignoreRunCache;
    this.verbose = verbose;
    this.concurrency = resolvedConcurrency;
    this.continueOnError = continueOnError;
    this.limit = PLimit(resolvedConcurrency);
    this.queue = new PQueue({
      concurrency: resolvedConcurrency,
      carryoverConcurrencyCount: true,
      timeout: 50000, // TODO: make this customisable
      throwOnTimeout: true,
      autoStart: true,
    });
    this.excludeWorkspacePredicate = excludeWorkspacePredicate;
    if (this.verbose) {
      this.errorLogFile = xfs.createWriteStream(this.getRunErrorPath(), {
        flags: "a",
      });
    }
  }

  async setup(): Promise<void> {
    this.runLog = await this.readRunLog();
    this.setupRunReporter();

    this.hasSetup = true;
  }

  private getRunErrorPath() {
    return ppath.resolve(this.project.cwd, "yarn.build-error.log" as Filename);
  }

  private getRunLogPath() {
    return ppath.resolve(
      this.project.cwd,
      ".yarn" as Filename,
      YARN_RUN_CACHE_FILENAME
    );
  }

  private async readRunLog(): Promise<RunLog> {
    const runLog = new Map<string, RunLogEntry>();

    try {
      const runLogFile: RunLogFile = await xfs.readJsonPromise(
        this.getRunLogPath()
      );

      if (runLogFile && runLogFile.packages) {
        for (const id in runLogFile.packages) {
          runLog.set(id, {
            lastModified: runLogFile.packages[id].lastModified,
            status: runLogFile.packages[id].status,
            haveCheckedForRerun: false,
            rerun: true,
            command: this.runCommand,
          });
        }
      }
    } catch {}

    return runLog;
  }

  private async saveRunLog() {
    if (!this.runLog) {
      return;
    }
    let runLogFileOnDisk: RunLogFile | undefined;

    try {
      runLogFileOnDisk = await xfs.readJsonPromise(this.getRunLogPath());
    } catch {
      // do nothing
    }
    const runLogFile: RunLogFile = {
      comment:
        "This is an auto-generated file," +
        " it keeps track of whats been built." +
        " This is a local file, don't store this in version control.",
      packages: {
        ...(runLogFileOnDisk && runLogFileOnDisk.packages),
      },
    };

    for (const [id, entry] of this.runLog) {
      if (entry.status !== RunStatus.succeeded) {
        continue;
      }

      runLogFile.packages[id] = {
        ...runLogFile.packages[id],
        ...this.runLog.get(id),
      };
    }

    await xfs.writeJsonPromise(this.getRunLogPath(), runLogFile);
  }

  setupRunReporter = (): void => {
    this.runReporter.on(
      RunSupervisorReporterEvents.pending,
      (relativeCwd: PortablePath, locator: Locator, name: string) => {
        this.runReport.mutex.acquire().then((release: () => void) => {
          this.runReport.workspaces[relativeCwd] = {
            name,
            stdout: [],
            stderr: [],
            done: false,
            fail: false,
            locator,
          };
          release();
        });
      }
    );

    this.runReporter.on(
      RunSupervisorReporterEvents.start,
      (
        relativeCwd: PortablePath,
        locator: Locator,
        name: string,
        runScript: string
      ) => {
        this.runReport.mutex.acquire().then((release: () => void) => {
          this.runReport.workspaces[relativeCwd] = {
            ...this.runReport.workspaces[relativeCwd],
            start: Date.now(),
            runScript: runScript,
            name,
            locator,
          };
          release();
        });
      }
    );

    this.runReporter.on(
      RunSupervisorReporterEvents.info,
      (relativeCwd: PortablePath, message: string) => {
        this.runReport.mutex.acquire().then((release: () => void) => {
          if (typeof message != `undefined`) {
            this.runReport.workspaces[relativeCwd].stdout.push(message);
          }
          release();
        });
      }
    );

    this.runReporter.on(
      RunSupervisorReporterEvents.error,
      (relativeCwd: PortablePath, error: Error) => {
        this.runReport.mutex.acquire().then((release: () => void) => {
          if (typeof error != `undefined`) {
            this.runReport.workspaces[relativeCwd].stderr.push(error);
          }
          release();
        });
      }
    );

    this.runReporter.on(
      RunSupervisorReporterEvents.success,
      (relativeCwd: PortablePath) => {
        this.runReport.mutex.acquire().then((release: () => void) => {
          this.runReport.workspaces[relativeCwd] = {
            ...this.runReport.workspaces[relativeCwd],
            done: true,
          };

          this.runReport.successCount++;
          release();
        });
      }
    );
    this.runReporter.on(
      RunSupervisorReporterEvents.skipped,
      (relativeCwd: PortablePath) => {
        this.runReport.mutex.acquire().then((release: () => void) => {
          this.runReport.workspaces[relativeCwd].done = true;
          this.runReport.workspaces[relativeCwd].skipped = true;
          this.runReport.skipCount++;
          release();
        });
      }
    );
    this.runReporter.on(
      RunSupervisorReporterEvents.ignored,
      (relativeCwd: PortablePath) => {
        this.runReport.mutex.acquire().then((release: () => void) => {
          this.runReport.workspaces[relativeCwd].done = true;
          this.runReport.workspaces[relativeCwd].ignored = true;
          this.runReport.ignoredCount++;
          release();
        });
      }
    );
    this.runReporter.on(
      RunSupervisorReporterEvents.fail,
      (relativeCwd: PortablePath, error: Error) => {
        this.runReport.mutex.acquire().then((release: () => void) => {
          if (typeof error != `undefined`) {
            this.runReport.workspaces[relativeCwd].stderr.push(error);
          }
          this.runReport.workspaces[relativeCwd].done = true;
          this.runReport.workspaces[relativeCwd].fail = true;
          this.runReport.failCount++;
          release();
        });
      }
    );
  };

  async addRunTarget(workspace: Workspace): Promise<void> {
    if (this.excluded.has(workspace)) {
      return;
    }

    if (this.excludeWorkspacePredicate(workspace)) {
      this.excluded.add(workspace);

      return;
    }

    this.entrypoints.push(this.runGraph.addNode(workspace.relativeCwd));
    const shouldRun = await this.plan(workspace);

    if (shouldRun) {
      this.runTargets.push(workspace);
    }
  }

  getDependenciesCount = async (workspace: Workspace): Promise<number> => {
    let value = 0;

    for (const dependencyType of Manifest.hardDependencies) {
      for (const descriptor of workspace.manifest
        .getForScope(dependencyType)
        .values()) {
        const depWorkspace = this.project.tryWorkspaceByDescriptor(descriptor);

        if (depWorkspace === null) continue;

        value += 1;
      }
    }

    return value;
  };

  plan = async (workspace: Workspace): Promise<boolean> => {
    const parent = this.runGraph.getNode(workspace.relativeCwd);

    if (!parent) {
      throw new Error(
        "Internal error: lost reference to parent workspace. Please open an issue."
      );
    }
    parent.addWorkSpace(workspace);

    let rerunParent = false;

    this.runMutexes[workspace.relativeCwd] = new Mutex();

    for (const dependencyType of Manifest.hardDependencies) {
      for (const descriptor of workspace.manifest
        .getForScope(dependencyType)
        .values()) {
        const depWorkspace = this.project.tryWorkspaceByDescriptor(descriptor);

        if (
          depWorkspace === null ||
          this.excludeWorkspacePredicate(depWorkspace)
        ) {
          continue;
        }

        const dep = this.runGraph
          .addNode(depWorkspace.relativeCwd)
          .addWorkSpace(depWorkspace);

        parent.addDependency(dep);

        const depsOfDepsNeedRerun = await this.plan(depWorkspace);

        let depNeedsRun = false;

        if (depWorkspace !== this.project.topLevelWorkspace) {
          depNeedsRun = await this.checkIfRunIsRequired(depWorkspace);
        }

        if (depNeedsRun || depsOfDepsNeedRerun) {
          rerunParent = true;
          dep.addRunCallback(this.createRunItem(depWorkspace));
        }
      }
    }
    let hasChanges = false;

    if (workspace !== this.project.topLevelWorkspace) {
      hasChanges = await this.checkIfRunIsRequired(workspace);
    }
    this.runReporter.emit(
      RunSupervisorReporterEvents.pending,
      workspace.relativeCwd,
      workspace.locator
    );
    if (rerunParent || hasChanges) {
      this.runReporter.emit(
        RunSupervisorReporterEvents.pending,
        workspace.relativeCwd,
        workspace.locator,
        `${
          workspace.manifest.name?.scope
            ? `@${workspace.manifest.name?.scope}/`
            : ""
        }${workspace.manifest.name?.name}`
      );
      parent.addRunCallback(this.createRunItem(workspace));

      return true;
    } else {
      // Use the previous log entry if we don't need to rerun.
      // This ensures we always have all our run targets in the log.
      const previousRunLog = this.runLog?.get(
        `${workspace.relativeCwd}#${this.runCommand}`
      );

      if (previousRunLog) {
        this.runLog?.set(`${workspace.relativeCwd}#${this.runCommand}`, {
          lastModified: previousRunLog.lastModified,
          status: RunStatus.succeeded,
          haveCheckedForRerun: true,
          rerun: false,
          command: this.runCommand,
        });
      }
    }

    return false;
  };

  private getWorkspaceConfig(workspace: Workspace): YarnBuildConfiguration {
    const errors: string[] = [];
    const workspaceConfiguration = {
      ...this.pluginConfiguration,
      folders: {
        ...this.pluginConfiguration.folders,
        ...workspace?.manifest.raw["yarn.build"],
      },
    };

    if (isYarnBuildConfiguration(workspaceConfiguration, { errors })) {
      return workspaceConfiguration;
    }

    console.warn(errors);

    return this.pluginConfiguration;
  }

  private async checkIfRunIsRequired(workspace: Workspace): Promise<boolean> {
    if (this.ignoreRunCache === true) {
      return true;
    }

    //  skip if this workspace doesn't have the command we want to run
    if (typeof workspace.manifest.scripts.get(this.runCommand) !== `string`) {
      return false;
    }

    let needsRun = false;
    const dir = ppath.resolve(workspace.project.cwd, workspace.relativeCwd);

    const workspaceConfiguration = this.getWorkspaceConfig(workspace);

    // Determine which folders (if any) may contain run artifacts
    // we need to ignore.
    const outputPaths = Array.isArray(workspaceConfiguration.folders.output)
      ? [...workspaceConfiguration.folders.output]
      : [workspaceConfiguration.folders.output];

    if (typeof workspace?.manifest?.raw?.bin === "string") {
      outputPaths.push(workspace.manifest.raw.bin);
    } else if (typeof workspace?.manifest?.raw?.directories?.bin === "string") {
      outputPaths.push(workspace.manifest.raw.directories.bin);
    } else if (typeof workspace?.manifest?.raw?.files === "string") {
      outputPaths.push(workspace.manifest.raw.files);
    } else if (Array.isArray(workspace?.manifest?.raw?.files)) {
      outputPaths.push(...workspace.manifest.raw.files);
    } else if (typeof workspace?.manifest?.raw?.main === "string") {
      outputPaths.push(workspace.manifest.raw.main);
    }

    const ignorePaths = outputPaths.map(
      (d) => `${dir}${path.posix.sep}${d}` as PortablePath
    );

    const input = workspaceConfiguration.folders.input;
    const inputPaths = typeof input === "string" ? [input] : input;
    const srcPaths = inputPaths
      ?.map((d) => `${dir}${path.posix.sep}${d}` as PortablePath)
      .map((d) =>
        d?.endsWith("/.") ? (d.substring(0, d.length - 2) as PortablePath) : d
      );

    // Traverse the dirs and see if they've been modified
    const release = await this.runReport.mutex.acquire();

    try {
      const previousRunLog = this.runLog?.get(
        `${workspace.relativeCwd}#${this.runCommand}`
      );

      if (previousRunLog?.haveCheckedForRerun) {
        return previousRunLog?.rerun ?? true;
      }

      const currentLastModified = await getLastModifiedForPaths(
        srcPaths ?? [dir],
        ignorePaths
      );

      if (previousRunLog?.lastModified !== currentLastModified) {
        needsRun = true;
      }

      this.runLog?.set(`${workspace.relativeCwd}#${this.runCommand}`, {
        lastModified: currentLastModified,
        status: needsRun ? RunStatus.succeeded : RunStatus.pending,
        haveCheckedForRerun: true,
        rerun: needsRun,
        command: this.runCommand,
      });
    } catch (e) {
      this.runReport.workspaces[workspace.relativeCwd].stderr.push(
        new Error(`${workspace.relativeCwd}: failed to get lastModified (${e})`)
      );
    } finally {
      release();
    }

    return needsRun;
  }

  run = async (): Promise<boolean> => {
    if (this.hasSetup === false) {
      throw new Error(
        "RunSupervisor is not setup, you need to call await supervisor.setup()"
      );
    }

    this.runReport.runStart = Date.now();

    if (this.dryRun) {
      return true;
    }

    // Print our RunReporter output
    if (!isCI) {
      Hansi.pad(this.concurrency + 3); // ensure we have the space we need (required if we start near the bottom of the display).
    }

    // print progress
    this.raf(this.waitUntilDone);

    this.currentRunTarget =
      this.runTargets.length > 1
        ? "All"
        : this.runTargets[0]?.relativeCwd ?? "Nothing to run";

    // theres an off by one error in the RunLog
    if (!isCI) {
      process.stderr.write("\n");
    }

    this.header = this.generateHeaderString();

    // run
    await this.runGraph.run(this.entrypoints);

    const releaseMutex = await this.runReport.mutex.acquire();

    this.runReport.done = true;

    releaseMutex();

    const finalLine = this.generateFinalReport();

    if (typeof finalLine === `string`) {
      process.stdout.write(finalLine);
    }

    // commit the run log
    await this.saveRunLog();

    return this.runReport.failCount === 0;
  };

  // This is a very simple requestAnimationFrame polyfil
  raf = (f: (timestamp: number) => void): void => {
    setImmediate(() => f(Date.now()));
  };

  waitUntilDone = (timestamp: number): void => {
    if (this.runReport.done) {
      return;
    }

    let waitTime = 90;
    let output = "";

    if (isCI) {
      waitTime = 2000;

      output = this.generateProgressStringIsCI(timestamp);
    } else {
      output = this.generateProgressString(timestamp);

      Hansi.cursorUp(
        Hansi.linesRequired(
          this.runReport.previousOutput,
          process.stdout.columns
        )
      );
      Hansi.clearScreenDown();
    }

    if (typeof output != `undefined` && typeof output === `string`) {
      process.stdout.write(output);
    }

    this.runReport.previousOutput = output;

    delay(waitTime).then(() => {
      this.raf(this.waitUntilDone);
    });
  };

  grey = (s: string): string =>
    formatUtils.pretty(this.configuration, s, `grey`);

  formatHeader(name: string, depth = 0, withBrand = false): string {
    const label = `${this.grey("-".repeat(depth) + "[")} ${name} ${this.grey(
      "]"
    )}`;
    const length = stripAnsi(label).length;
    const brand = withBrand ? "[ yarn.build ]" : "";

    return (
      label +
      this.grey("-".repeat(DIVIDER_LENGTH - length - brand.length)) +
      this.grey(brand)
    );
  }

  generateHeaderString(): string {
    return `${formatUtils.pretty(
      this.configuration,
      `${this.runCommand}`,
      FormatType.CODE
    )} for ${formatUtils.pretty(
      this.configuration,
      this.currentRunTarget ? this.currentRunTarget : "",
      FormatType.SCOPE
    )}${
      this.dryRun
        ? formatUtils.pretty(this.configuration, ` --dry-run`, FormatType.NAME)
        : ""
    }`;
  }

  generateProgressStringIsCI(timestamp: number): string {
    let output = "";

    if (this.runReport.runStart) {
      const successString = formatUtils.pretty(
        this.configuration,
        `${this.runReport.successCount}`,
        "green"
      );
      const failedString = formatUtils.pretty(
        this.configuration,
        `${this.runReport.failCount}`,
        "red"
      );
      const totalString = formatUtils.pretty(
        this.configuration,
        `${
          this.runGraph.runSize - this.excluded.size - this.runReport.skipCount
        }`,
        "white"
      );

      output += `[${
        this.runCommand
      }]  Success: ${successString}\tFailed: ${failedString}\tTotal:  ${totalString}\tRuntime: ${formatTimestampDifference(
        this.runReport.runStart,
        timestamp
      )}\n`;
    }

    return output;
  }

  generateProgressString(timestamp: number): string {
    let output = "";

    const generateIndexString = (s: number) => this.grey(`[${s}]`);

    const idleString = formatUtils.pretty(this.configuration, `IDLE`, `grey`);

    output += this.formatHeader(this.generateHeaderString()) + "\n";

    let i = 1;

    for (const relativePath in this.runReport.workspaces) {
      const thread = this.runReport.workspaces[relativePath];

      if (!thread || !thread.start || thread.done) {
        continue;
      }

      if (!!this.runReport.runStart) {
        this.runReport.workspaces[relativePath].runtimeSeconds =
          timestamp - this.runReport.runStart;
      }

      const pathString = formatUtils.pretty(
        this.configuration,
        relativePath,
        FormatType.PATH
      );

      const runScriptString = formatUtils.pretty(
        this.configuration,
        `(${thread.runScript})`,
        FormatType.REFERENCE
      );

      const timeString = thread.start
        ? formatUtils.pretty(
            this.configuration,
            formatTimestampDifference(thread.start, timestamp),
            FormatType.RANGE
          )
        : "";
      const indexString = generateIndexString(i++);
      const indexSpacer = ` `.repeat(indexString.length - 1);
      const referenceString = formatUtils.pretty(
        this.configuration,
        thread.name,
        FormatType.NAME
      );

      let outputString = `${indexString} ${pathString}${referenceString} ${runScriptString} ${timeString}\n`;

      // If output width is more than the available width then we will use multiple lines.
      let outputSegment1 = ``;
      let outputSegment2 = ``;
      let outputSegment3 = ``;

      if (stripAnsi(outputString).length >= process.stdout.columns) {
        outputSegment1 = `${indexString} ${pathString}${referenceString}\n`;
        outputSegment2 = `${indexSpacer} ${runScriptString} ${timeString}\n`;

        if (stripAnsi(outputSegment1).length >= process.stdout.columns) {
          outputSegment1 = sliceAnsi(
            `${indexString} ${pathString}\n`,
            0,
            process.stdout.columns
          );
          outputSegment2 = sliceAnsi(
            `${indexSpacer} ${referenceString}\n`,
            0,
            process.stdout.columns
          );
          outputSegment3 = sliceAnsi(
            `${indexSpacer} ${runScriptString} ${timeString}\n`,
            0,
            process.stdout.columns
          );
        }
        outputString = outputSegment1 + outputSegment2 + outputSegment3;
      }

      output += outputString;
    }

    for (i; i < this.concurrency + 1; ) {
      output += `${generateIndexString(i++)} ${idleString}\n`;
    }

    if (this.runReport.runStart) {
      output += this.generateRunCountString(timestamp);
    }

    return output;
  }

  generateRunCountString = (timestamp: number): string => {
    let output = "";

    if (this.runReport.runStart) {
      const successString = formatUtils.pretty(
        this.configuration,
        `${this.runReport.successCount}`,
        "green"
      );
      const failedString = formatUtils.pretty(
        this.configuration,
        `${this.runReport.failCount}`,
        "red"
      );
      const totalString = formatUtils.pretty(
        this.configuration,
        `${this.runGraph.runSize}`,
        "white"
      );

      output +=
        this.formatHeader(
          `${successString}:${failedString}/${totalString} ${formatTimestampDifference(
            this.runReport.runStart,
            timestamp
          )}`,
          0,
          true
        ) + `\n`;
    }

    return output;
  };

  generateFinalReport = (): string => {
    if (!isCI) {
      // Cleanup the processing lines
      Hansi.cursorUp(
        Hansi.linesRequired(
          this.runReport.previousOutput,
          process.stdout.columns
        )
      );
      Hansi.clearScreenDown();
    }

    let printOutput = false;
    let output = "";

    // Check if there were errors, and print them out
    if (this.runReport.failCount !== 0) {
      printOutput = true;
    }

    if (this.verbose) {
      printOutput = true;
    }

    if (isCI) {
      printOutput = true;
    }

    if (printOutput) {
      const packagesWithErrors: string[] = [];

      output += `${this.formatHeader(this.header) + "\n"}`;

      // print out any build errors
      for (const relativePath in this.runReport.workspaces) {
        const workspace = this.runReport.workspaces[relativePath];

        if (workspace.fail) {
          packagesWithErrors.push(relativePath);
        }

        if (this.runReport.failCount !== 0 && workspace.fail === false) {
          continue;
        }

        if (workspace.stdout.length !== 0 || workspace.stderr.length !== 0) {
          const lineHeader = this.formatHeader(
            `Output: ${formatUtils.pretty(
              this.configuration,
              relativePath,
              FormatType.PATH
            )}`,
            2
          );

          output += `${lineHeader + "\n"}`;
        }

        if (workspace.stdout.length !== 0) {
          workspace.stdout.forEach((m) => {
            const lines = m.split("\n");

            lines.forEach((line) => {
              if (typeof line != `undefined` && line.length !== 0) {
                output += `${line + "\n"}`;
              }
            });
          });
        }

        if (workspace.stderr.length !== 0) {
          // stderr doesnt seem to be useful for showing to the user in cli
          // we'll still write it out to the run log
          const lineHeader = `[stderr]`;

          output += `${lineHeader + "\n"}`;

          workspace.stderr.forEach((e) => {
            const err = e instanceof Error ? e.toString() : `${e}`;
            const lines = err.split("\n");

            lines.forEach((line) => {
              if (typeof line !== `undefined` && line.length !== 0) {
                output += `${line + "\n"}`;
              }
            });
          });
        }
      }

      if (packagesWithErrors.length >= 2) {
        output += `${this.grey(DIVIDER) + "\n"}`;
        const errorHeader = this.grey(
          `ERROR for script ${this.header}\nThe following packages returned an error.\n`
        );

        output += `${errorHeader}`;

        packagesWithErrors.forEach((relativePath) => {
          const lineTail = `- ${formatUtils.pretty(
            this.configuration,
            relativePath,
            FormatType.PATH
          )}`;

          output += `${lineTail + "\n"}`;
        });
      }
    }

    const heading =
      this.formatHeader(
        `${formatUtils.pretty(
          this.configuration,
          `${this.runCommand} finished`,
          this.runReport.failCount === 0 ? "green" : "red"
        )}${
          this.runReport.failCount != 0
            ? formatUtils.pretty(
                this.configuration,
                ` with ${this.runReport.failCount} errors`,
                "red"
              )
            : ""
        }`,
        0,
        true
      ) + "\n";

    output += this.formatHeader("Summary") + "\n";

    if (this.runReport.runStart) {
      const { successCount, failCount, ignoredCount, skipCount } =
        this.runReport;

      const total = this.runGraph.runSize - ignoredCount;

      const upToDate = total - failCount - successCount - skipCount;

      const successString = formatUtils.pretty(
        this.configuration,
        `Success: ${successCount}`,
        "green"
      );
      const failedString = formatUtils.pretty(
        this.configuration,
        `Fail: ${failCount}`,
        "red"
      );
      const skippedString = formatUtils.pretty(
        this.configuration,
        `Skipped: ${skipCount}`,
        "white"
      );
      const excludedString = formatUtils.pretty(
        this.configuration,
        `Excluded: ${this.excluded.size}`,
        "white"
      );
      const upToDateString = formatUtils.pretty(
        this.configuration,
        `Up to date: ${upToDate}`,
        "white"
      );

      const totalString = formatUtils.pretty(
        this.configuration,
        `Total: ${total}`,
        "white"
      );

      output += successString + "\n";

      output += upToDateString + "\n";

      output += failedString + "\n";
      if (this.verbose && failCount > 0) {
        Object.keys(this.runReport.workspaces).forEach((k) => {
          const w = this.runReport.workspaces[k];

          if (w.fail) {
            output += ` - ${formatUtils.pretty(
              this.configuration,
              k,
              "grey"
            )}${formatUtils.pretty(this.configuration, w.locator, "IDENT")}\n`;
          }
        });
      }
      output += skippedString + "\n";
      if (this.verbose && skipCount > 0) {
        Object.keys(this.runReport.workspaces).forEach((k) => {
          const w = this.runReport.workspaces[k];

          if (w.skipped) {
            output += ` - ${formatUtils.pretty(
              this.configuration,
              k,
              "grey"
            )}${formatUtils.pretty(this.configuration, w.locator, "IDENT")}\n`;
          }
        });
      }

      output += excludedString + "\n";
      if (this.verbose && this.excluded.size > 0) {
        for (const w of this.excluded) {
          output += ` - ${formatUtils.pretty(
            this.configuration,
            w.relativeCwd,
            "grey"
          )}${formatUtils.pretty(this.configuration, w.locator, "IDENT")}\n`;
        }
      }

      output += totalString + "\n" + this.grey("---") + "\n";
    }

    let totalMs = 50;

    for (const relativePath in this.runReport.workspaces) {
      const workspace = this.runReport.workspaces[relativePath];

      totalMs += workspace.runtimeSeconds ?? 0;
    }

    if (!!this.runReport.runStart && this.runGraph.runSize > 1) {
      const cpuTime = totalMs;
      const now = Date.now();
      const wallTime = now - this.runReport.runStart;
      const savedTime = formatTimestampDifference(wallTime, cpuTime);

      if (!isCI) {
        output += `Cumulative: (cpu): ${formatTimestampDifference(
          0,
          totalMs
        )}\n`;
        output += `Saved: ${savedTime}\n`;
      }
    }
    if (!!this.runReport.runStart) {
      output +=
        `Runtime (wall): ` +
        formatTimestampDifference(Date.now(), this.runReport.runStart) +
        `\n`;
    }
    output += heading;

    output += "\n";

    return output;
  };

  // Returns a PQueue item
  createRunItem = (workspace: Workspace): RunCallback => {
    return async (cancelDependentJobs: () => void) =>
      await this.limit(async (): Promise<boolean> => {
        const prefix = workspace.relativeCwd;

        const command = workspace.manifest.scripts.get(this.runCommand);

        const currentRunLog = this.runLog?.get(
          `${workspace.relativeCwd}#${this.runCommand}`
        );

        this.runReporter.emit(
          RunSupervisorReporterEvents.start,
          workspace.relativeCwd,
          workspace.locator,
          `${
            workspace.manifest.name?.scope
              ? `@${workspace.manifest.name?.scope}/`
              : ""
          }${workspace.manifest.name?.name}`,
          command
        );

        if (!command) {
          if (this.verbose) {
            this.runReporter.emit(
              RunSupervisorReporterEvents.info,
              workspace.relativeCwd,
              `Missing \`${this.runCommand}\` script in manifest.`
            );
          }

          this.runReporter.emit(
            RunSupervisorReporterEvents.ignored,
            workspace.relativeCwd
          );

          return true;
        }

        try {
          if (this.runReport.failCount !== 0) {
            // We have bailed skip all!
            this.runReporter.emit(
              RunSupervisorReporterEvents.skipped,
              workspace.relativeCwd
            );
            this.runLog?.set(`${workspace.relativeCwd}#${this.runCommand}`, {
              lastModified: currentRunLog?.lastModified,
              status: RunStatus.skipped,
              haveCheckedForRerun: true,
              rerun: false,
              command: this.runCommand,
            });

            if (this.continueOnError === false) {
              return false;
            }
          }

          const exitCode = await this.cli(
            this.runCommand,
            workspace.cwd,
            this.runReporter,
            prefix
          );

          if (exitCode !== 0) {
            if (exitCode > 100) {
              // This has been force killed
              this.runReporter.emit(
                RunSupervisorReporterEvents.skipped,
                workspace.relativeCwd
              );

              this.runLog?.set(`${workspace.relativeCwd}#${this.runCommand}`, {
                lastModified: currentRunLog?.lastModified,
                status: RunStatus.skipped,
                haveCheckedForRerun: true,
                rerun: false,
                command: this.runCommand,
              });

              return false;
            } else {
              this.runReporter.emit(
                RunSupervisorReporterEvents.fail,
                workspace.relativeCwd
              );

              this.runLog?.set(`${workspace.relativeCwd}#${this.runCommand}`, {
                lastModified: currentRunLog?.lastModified,
                status: RunStatus.failed,
                haveCheckedForRerun: true,
                rerun: false,
                command: this.runCommand,
              });

              if (this.continueOnError === false) {
                void terminateAllChildProcesses();
              }

              return false;
            }
          }

          // run was a success

          this.runLog?.set(`${workspace.relativeCwd}#${this.runCommand}`, {
            lastModified: currentRunLog?.lastModified,
            status: RunStatus.succeeded,
            haveCheckedForRerun: true,
            rerun: false,
            command: this.runCommand,
          });

          this.runReporter.emit(
            RunSupervisorReporterEvents.success,
            workspace.relativeCwd
          );
        } catch (e) {
          this.runReporter.emit(
            RunSupervisorReporterEvents.fail,
            workspace.relativeCwd,
            e
          );

          this.runLog?.set(`${workspace.relativeCwd}#${this.runCommand}`, {
            lastModified: currentRunLog?.lastModified,
            status: RunStatus.failed,
            haveCheckedForRerun: true,
            rerun: false,
            command: this.runCommand,
          });

          if (this.continueOnError === false) {
            cancelDependentJobs();
            terminateAllChildProcesses();

            return false;
          }

          return false;
        }

        return false;
      });
  };
}

const getLastModifiedForPaths = async (
  paths: PortablePath[],
  ignored: PortablePath[] | undefined
): Promise<number> => {
  const lastModifiedTimestamps = await Promise.all(
    paths.map(async (p) => {
      if (ignored?.some((i) => p.startsWith(i))) {
        return 0;
      }

      if (ignored?.some((i) => micromatch.isMatch(p, i))) {
        return 0;
      }

      const stat = await xfs.statPromise(p);

      if (stat.isFile()) {
        return stat.mtimeMs;
      }

      if (stat.isDirectory()) {
        const contents = await xfs.readdirPromise(p);

        return await getLastModifiedForPaths(
          contents.map((c) => `${p}${path.posix.sep}${c}` as PortablePath),
          ignored
        );
      }

      return 0;
    })
  );

  return Math.max(...lastModifiedTimestamps);
};

export const formatTimestampDifference = (from: number, to: number): string => {
  let milliseconds = Math.abs(to - from);
  let output = "";

  const minutes = Math.trunc(milliseconds / 60000);

  if (minutes) {
    output += `${minutes}m`;
    milliseconds -= minutes * 60000;
  }

  if (milliseconds) {
    if (minutes) {
      output += ` `;
    }
    output += `${(milliseconds / 1000).toFixed(2)}s`;
  }

  return output;
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default RunSupervisor;

export { RunSupervisor, RunSupervisorReporterEvents };
