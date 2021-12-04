import { Filename } from "@yarnpkg/fslib";
import glob from "glob-promise";

interface GetAllFilesProps {
  cwd: string;
}

export const getAllFiles = async ({
  cwd,
}: GetAllFilesProps): Promise<Filename[]> => {
  try {
    const files = (await glob(`${cwd}/**/*`, { dot: true })) as Filename[];

    return files
      .map((fileName) => fileName.split(`${cwd}/`)[1] ?? "")
      .filter(Boolean) as Filename[];
  } catch (_e) {
    return [];
  }
};
