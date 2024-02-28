/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-bundle",
factory: function (require) {
"use strict";
var plugin = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../../../.yarn/cache/ignore-npm-5.3.1-f6947c5df7-703f7f45ff.zip/node_modules/ignore/index.js
  var require_ignore = __commonJS({
    "../../../.yarn/cache/ignore-npm-5.3.1-f6947c5df7-703f7f45ff.zip/node_modules/ignore/index.js"(exports, module) {
      function makeArray(subject) {
        return Array.isArray(subject) ? subject : [subject];
      }
      var EMPTY = "";
      var SPACE = " ";
      var ESCAPE = "\\";
      var REGEX_TEST_BLANK_LINE = /^\s+$/;
      var REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/;
      var REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
      var REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
      var REGEX_SPLITALL_CRLF = /\r?\n/g;
      var REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/;
      var SLASH = "/";
      var TMP_KEY_IGNORE = "node-ignore";
      if (typeof Symbol !== "undefined") {
        TMP_KEY_IGNORE = Symbol.for("node-ignore");
      }
      var KEY_IGNORE = TMP_KEY_IGNORE;
      var define = (object, key, value) => Object.defineProperty(object, key, { value });
      var REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g;
      var RETURN_FALSE = () => false;
      var sanitizeRange = (range) => range.replace(
        REGEX_REGEXP_RANGE,
        (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match : EMPTY
      );
      var cleanRangeBackSlash = (slashes) => {
        const { length } = slashes;
        return slashes.slice(0, length - length % 2);
      };
      var REPLACERS = [
        [
          // remove BOM
          // TODO:
          // Other similar zero-width characters?
          /^\uFEFF/,
          () => EMPTY
        ],
        // > Trailing spaces are ignored unless they are quoted with backslash ("\")
        [
          // (a\ ) -> (a )
          // (a  ) -> (a)
          // (a \ ) -> (a  )
          /\\?\s+$/,
          (match) => match.indexOf("\\") === 0 ? SPACE : EMPTY
        ],
        // replace (\ ) with ' '
        [
          /\\\s/g,
          () => SPACE
        ],
        // Escape metacharacters
        // which is written down by users but means special for regular expressions.
        // > There are 12 characters with special meanings:
        // > - the backslash \,
        // > - the caret ^,
        // > - the dollar sign $,
        // > - the period or dot .,
        // > - the vertical bar or pipe symbol |,
        // > - the question mark ?,
        // > - the asterisk or star *,
        // > - the plus sign +,
        // > - the opening parenthesis (,
        // > - the closing parenthesis ),
        // > - and the opening square bracket [,
        // > - the opening curly brace {,
        // > These special characters are often called "metacharacters".
        [
          /[\\$.|*+(){^]/g,
          (match) => `\\${match}`
        ],
        [
          // > a question mark (?) matches a single character
          /(?!\\)\?/g,
          () => "[^/]"
        ],
        // leading slash
        [
          // > A leading slash matches the beginning of the pathname.
          // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
          // A leading slash matches the beginning of the pathname
          /^\//,
          () => "^"
        ],
        // replace special metacharacter slash after the leading slash
        [
          /\//g,
          () => "\\/"
        ],
        [
          // > A leading "**" followed by a slash means match in all directories.
          // > For example, "**/foo" matches file or directory "foo" anywhere,
          // > the same as pattern "foo".
          // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
          // >   under directory "foo".
          // Notice that the '*'s have been replaced as '\\*'
          /^\^*\\\*\\\*\\\//,
          // '**/foo' <-> 'foo'
          () => "^(?:.*\\/)?"
        ],
        // starting
        [
          // there will be no leading '/'
          //   (which has been replaced by section "leading slash")
          // If starts with '**', adding a '^' to the regular expression also works
          /^(?=[^^])/,
          function startingReplacer() {
            return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
          }
        ],
        // two globstars
        [
          // Use lookahead assertions so that we could match more than one `'/**'`
          /\\\/\\\*\\\*(?=\\\/|$)/g,
          // Zero, one or several directories
          // should not use '*', or it will be replaced by the next replacer
          // Check if it is not the last `'/**'`
          (_, index, str2) => index + 6 < str2.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
        ],
        // normal intermediate wildcards
        [
          // Never replace escaped '*'
          // ignore rule '\*' will match the path '*'
          // 'abc.*/' -> go
          // 'abc.*'  -> skip this rule,
          //    coz trailing single wildcard will be handed by [trailing wildcard]
          /(^|[^\\]+)(\\\*)+(?=.+)/g,
          // '*.js' matches '.js'
          // '*.js' doesn't match 'abc'
          (_, p1, p2) => {
            const unescaped = p2.replace(/\\\*/g, "[^\\/]*");
            return p1 + unescaped;
          }
        ],
        [
          // unescape, revert step 3 except for back slash
          // For example, if a user escape a '\\*',
          // after step 3, the result will be '\\\\\\*'
          /\\\\\\(?=[$.|*+(){^])/g,
          () => ESCAPE
        ],
        [
          // '\\\\' -> '\\'
          /\\\\/g,
          () => ESCAPE
        ],
        [
          // > The range notation, e.g. [a-zA-Z],
          // > can be used to match one of the characters in a range.
          // `\` is escaped by step 3
          /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
          (match, leadEscape, range, endEscape, close) => leadEscape === ESCAPE ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" ? endEscape.length % 2 === 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]" : "[]"
        ],
        // ending
        [
          // 'js' will not match 'js.'
          // 'ab' will not match 'abc'
          /(?:[^*])$/,
          // WTF!
          // https://git-scm.com/docs/gitignore
          // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
          // which re-fixes #24, #38
          // > If there is a separator at the end of the pattern then the pattern
          // > will only match directories, otherwise the pattern can match both
          // > files and directories.
          // 'js*' will not match 'a.js'
          // 'js/' will not match 'a.js'
          // 'js' will match 'a.js' and 'a.js/'
          (match) => /\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`
        ],
        // trailing wildcard
        [
          /(\^|\\\/)?\\\*$/,
          (_, p1) => {
            const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
            return `${prefix}(?=$|\\/$)`;
          }
        ]
      ];
      var regexCache = /* @__PURE__ */ Object.create(null);
      var makeRegex = (pattern, ignoreCase) => {
        let source = regexCache[pattern];
        if (!source) {
          source = REPLACERS.reduce(
            (prev, current) => prev.replace(current[0], current[1].bind(pattern)),
            pattern
          );
          regexCache[pattern] = source;
        }
        return ignoreCase ? new RegExp(source, "i") : new RegExp(source);
      };
      var isString2 = (subject) => typeof subject === "string";
      var checkPattern = (pattern) => pattern && isString2(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern) && pattern.indexOf("#") !== 0;
      var splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF);
      var IgnoreRule = class {
        constructor(origin, pattern, negative, regex) {
          this.origin = origin;
          this.pattern = pattern;
          this.negative = negative;
          this.regex = regex;
        }
      };
      var createRule = (pattern, ignoreCase) => {
        const origin = pattern;
        let negative = false;
        if (pattern.indexOf("!") === 0) {
          negative = true;
          pattern = pattern.substr(1);
        }
        pattern = pattern.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
        const regex = makeRegex(pattern, ignoreCase);
        return new IgnoreRule(
          origin,
          pattern,
          negative,
          regex
        );
      };
      var throwError2 = (message, Ctor) => {
        throw new Ctor(message);
      };
      var checkPath = (path3, originalPath, doThrow) => {
        if (!isString2(path3)) {
          return doThrow(
            `path must be a string, but got \`${originalPath}\``,
            TypeError
          );
        }
        if (!path3) {
          return doThrow(`path must not be empty`, TypeError);
        }
        if (checkPath.isNotRelative(path3)) {
          const r = "`path.relative()`d";
          return doThrow(
            `path should be a ${r} string, but got "${originalPath}"`,
            RangeError
          );
        }
        return true;
      };
      var isNotRelative = (path3) => REGEX_TEST_INVALID_PATH.test(path3);
      checkPath.isNotRelative = isNotRelative;
      checkPath.convert = (p) => p;
      var Ignore = class {
        constructor({
          ignorecase = true,
          ignoreCase = ignorecase,
          allowRelativePaths = false
        } = {}) {
          define(this, KEY_IGNORE, true);
          this._rules = [];
          this._ignoreCase = ignoreCase;
          this._allowRelativePaths = allowRelativePaths;
          this._initCache();
        }
        _initCache() {
          this._ignoreCache = /* @__PURE__ */ Object.create(null);
          this._testCache = /* @__PURE__ */ Object.create(null);
        }
        _addPattern(pattern) {
          if (pattern && pattern[KEY_IGNORE]) {
            this._rules = this._rules.concat(pattern._rules);
            this._added = true;
            return;
          }
          if (checkPattern(pattern)) {
            const rule = createRule(pattern, this._ignoreCase);
            this._added = true;
            this._rules.push(rule);
          }
        }
        // @param {Array<string> | string | Ignore} pattern
        add(pattern) {
          this._added = false;
          makeArray(
            isString2(pattern) ? splitPattern(pattern) : pattern
          ).forEach(this._addPattern, this);
          if (this._added) {
            this._initCache();
          }
          return this;
        }
        // legacy
        addPattern(pattern) {
          return this.add(pattern);
        }
        //          |           ignored : unignored
        // negative |   0:0   |   0:1   |   1:0   |   1:1
        // -------- | ------- | ------- | ------- | --------
        //     0    |  TEST   |  TEST   |  SKIP   |    X
        //     1    |  TESTIF |  SKIP   |  TEST   |    X
        // - SKIP: always skip
        // - TEST: always test
        // - TESTIF: only test if checkUnignored
        // - X: that never happen
        // @param {boolean} whether should check if the path is unignored,
        //   setting `checkUnignored` to `false` could reduce additional
        //   path matching.
        // @returns {TestResult} true if a file is ignored
        _testOne(path3, checkUnignored) {
          let ignored = false;
          let unignored = false;
          this._rules.forEach((rule) => {
            const { negative } = rule;
            if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
              return;
            }
            const matched = rule.regex.test(path3);
            if (matched) {
              ignored = !negative;
              unignored = negative;
            }
          });
          return {
            ignored,
            unignored
          };
        }
        // @returns {TestResult}
        _test(originalPath, cache, checkUnignored, slices) {
          const path3 = originalPath && checkPath.convert(originalPath);
          checkPath(
            path3,
            originalPath,
            this._allowRelativePaths ? RETURN_FALSE : throwError2
          );
          return this._t(path3, cache, checkUnignored, slices);
        }
        _t(path3, cache, checkUnignored, slices) {
          if (path3 in cache) {
            return cache[path3];
          }
          if (!slices) {
            slices = path3.split(SLASH);
          }
          slices.pop();
          if (!slices.length) {
            return cache[path3] = this._testOne(path3, checkUnignored);
          }
          const parent = this._t(
            slices.join(SLASH) + SLASH,
            cache,
            checkUnignored,
            slices
          );
          return cache[path3] = parent.ignored ? parent : this._testOne(path3, checkUnignored);
        }
        ignores(path3) {
          return this._test(path3, this._ignoreCache, false).ignored;
        }
        createFilter() {
          return (path3) => !this.ignores(path3);
        }
        filter(paths) {
          return makeArray(paths).filter(this.createFilter());
        }
        // @returns {TestResult}
        test(path3) {
          return this._test(path3, this._testCache, true);
        }
      };
      var factory = (options) => new Ignore(options);
      var isPathValid = (path3) => checkPath(path3 && checkPath.convert(path3), path3, RETURN_FALSE);
      factory.isPathValid = isPathValid;
      factory.default = factory;
      module.exports = factory;
      if (
        // Detect `process` so that it can run in browsers.
        typeof process !== "undefined" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")
      ) {
        const makePosix = (str2) => /^\\\\\?\\/.test(str2) || /["<>|\u0000-\u001F]+/u.test(str2) ? str2 : str2.replace(/\\/g, "/");
        checkPath.convert = makePosix;
        const REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
        checkPath.isNotRelative = (path3) => REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path3) || isNotRelative(path3);
      }
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/array.js
  var require_array = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/array.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.splitWhen = exports.flatten = void 0;
      function flatten(items) {
        return items.reduce((collection, item) => [].concat(collection, item), []);
      }
      exports.flatten = flatten;
      function splitWhen(items, predicate) {
        const result = [[]];
        let groupIndex = 0;
        for (const item of items) {
          if (predicate(item)) {
            groupIndex++;
            result[groupIndex] = [];
          } else {
            result[groupIndex].push(item);
          }
        }
        return result;
      }
      exports.splitWhen = splitWhen;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/errno.js
  var require_errno = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/errno.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isEnoentCodeError = void 0;
      function isEnoentCodeError(error) {
        return error.code === "ENOENT";
      }
      exports.isEnoentCodeError = isEnoentCodeError;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/fs.js
  var require_fs = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/fs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createDirentFromStats = void 0;
      var DirentFromStats = class {
        constructor(name, stats) {
          this.name = name;
          this.isBlockDevice = stats.isBlockDevice.bind(stats);
          this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
          this.isDirectory = stats.isDirectory.bind(stats);
          this.isFIFO = stats.isFIFO.bind(stats);
          this.isFile = stats.isFile.bind(stats);
          this.isSocket = stats.isSocket.bind(stats);
          this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
        }
      };
      function createDirentFromStats(name, stats) {
        return new DirentFromStats(name, stats);
      }
      exports.createDirentFromStats = createDirentFromStats;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/path.js
  var require_path = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/path.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.convertPosixPathToPattern = exports.convertWindowsPathToPattern = exports.convertPathToPattern = exports.escapePosixPath = exports.escapeWindowsPath = exports.escape = exports.removeLeadingDotSegment = exports.makeAbsolute = exports.unixify = void 0;
      var os = __require("os");
      var path3 = __require("path");
      var IS_WINDOWS_PLATFORM = os.platform() === "win32";
      var LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2;
      var POSIX_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\()|\\(?![!()*+?@[\]{|}]))/g;
      var WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()[\]{}]|^!|[!+@](?=\())/g;
      var DOS_DEVICE_PATH_RE = /^\\\\([.?])/;
      var WINDOWS_BACKSLASHES_RE = /\\(?![!()+@[\]{}])/g;
      function unixify(filepath) {
        return filepath.replace(/\\/g, "/");
      }
      exports.unixify = unixify;
      function makeAbsolute(cwd, filepath) {
        return path3.resolve(cwd, filepath);
      }
      exports.makeAbsolute = makeAbsolute;
      function removeLeadingDotSegment(entry) {
        if (entry.charAt(0) === ".") {
          const secondCharactery = entry.charAt(1);
          if (secondCharactery === "/" || secondCharactery === "\\") {
            return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
          }
        }
        return entry;
      }
      exports.removeLeadingDotSegment = removeLeadingDotSegment;
      exports.escape = IS_WINDOWS_PLATFORM ? escapeWindowsPath : escapePosixPath;
      function escapeWindowsPath(pattern) {
        return pattern.replace(WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
      }
      exports.escapeWindowsPath = escapeWindowsPath;
      function escapePosixPath(pattern) {
        return pattern.replace(POSIX_UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
      }
      exports.escapePosixPath = escapePosixPath;
      exports.convertPathToPattern = IS_WINDOWS_PLATFORM ? convertWindowsPathToPattern : convertPosixPathToPattern;
      function convertWindowsPathToPattern(filepath) {
        return escapeWindowsPath(filepath).replace(DOS_DEVICE_PATH_RE, "//$1").replace(WINDOWS_BACKSLASHES_RE, "/");
      }
      exports.convertWindowsPathToPattern = convertWindowsPathToPattern;
      function convertPosixPathToPattern(filepath) {
        return escapePosixPath(filepath);
      }
      exports.convertPosixPathToPattern = convertPosixPathToPattern;
    }
  });

  // ../../../.yarn/cache/is-extglob-npm-2.1.1-0870ea68b5-5487da3569.zip/node_modules/is-extglob/index.js
  var require_is_extglob = __commonJS({
    "../../../.yarn/cache/is-extglob-npm-2.1.1-0870ea68b5-5487da3569.zip/node_modules/is-extglob/index.js"(exports, module) {
      module.exports = function isExtglob(str2) {
        if (typeof str2 !== "string" || str2 === "") {
          return false;
        }
        var match;
        while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str2)) {
          if (match[2])
            return true;
          str2 = str2.slice(match.index + match[0].length);
        }
        return false;
      };
    }
  });

  // ../../../.yarn/cache/is-glob-npm-4.0.3-cb87bf1bdb-17fb4014e2.zip/node_modules/is-glob/index.js
  var require_is_glob = __commonJS({
    "../../../.yarn/cache/is-glob-npm-4.0.3-cb87bf1bdb-17fb4014e2.zip/node_modules/is-glob/index.js"(exports, module) {
      var isExtglob = require_is_extglob();
      var chars = { "{": "}", "(": ")", "[": "]" };
      var strictCheck = function(str2) {
        if (str2[0] === "!") {
          return true;
        }
        var index = 0;
        var pipeIndex = -2;
        var closeSquareIndex = -2;
        var closeCurlyIndex = -2;
        var closeParenIndex = -2;
        var backSlashIndex = -2;
        while (index < str2.length) {
          if (str2[index] === "*") {
            return true;
          }
          if (str2[index + 1] === "?" && /[\].+)]/.test(str2[index])) {
            return true;
          }
          if (closeSquareIndex !== -1 && str2[index] === "[" && str2[index + 1] !== "]") {
            if (closeSquareIndex < index) {
              closeSquareIndex = str2.indexOf("]", index);
            }
            if (closeSquareIndex > index) {
              if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
                return true;
              }
              backSlashIndex = str2.indexOf("\\", index);
              if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
                return true;
              }
            }
          }
          if (closeCurlyIndex !== -1 && str2[index] === "{" && str2[index + 1] !== "}") {
            closeCurlyIndex = str2.indexOf("}", index);
            if (closeCurlyIndex > index) {
              backSlashIndex = str2.indexOf("\\", index);
              if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
                return true;
              }
            }
          }
          if (closeParenIndex !== -1 && str2[index] === "(" && str2[index + 1] === "?" && /[:!=]/.test(str2[index + 2]) && str2[index + 3] !== ")") {
            closeParenIndex = str2.indexOf(")", index);
            if (closeParenIndex > index) {
              backSlashIndex = str2.indexOf("\\", index);
              if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
                return true;
              }
            }
          }
          if (pipeIndex !== -1 && str2[index] === "(" && str2[index + 1] !== "|") {
            if (pipeIndex < index) {
              pipeIndex = str2.indexOf("|", index);
            }
            if (pipeIndex !== -1 && str2[pipeIndex + 1] !== ")") {
              closeParenIndex = str2.indexOf(")", pipeIndex);
              if (closeParenIndex > pipeIndex) {
                backSlashIndex = str2.indexOf("\\", pipeIndex);
                if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
                  return true;
                }
              }
            }
          }
          if (str2[index] === "\\") {
            var open = str2[index + 1];
            index += 2;
            var close = chars[open];
            if (close) {
              var n = str2.indexOf(close, index);
              if (n !== -1) {
                index = n + 1;
              }
            }
            if (str2[index] === "!") {
              return true;
            }
          } else {
            index++;
          }
        }
        return false;
      };
      var relaxedCheck = function(str2) {
        if (str2[0] === "!") {
          return true;
        }
        var index = 0;
        while (index < str2.length) {
          if (/[*?{}()[\]]/.test(str2[index])) {
            return true;
          }
          if (str2[index] === "\\") {
            var open = str2[index + 1];
            index += 2;
            var close = chars[open];
            if (close) {
              var n = str2.indexOf(close, index);
              if (n !== -1) {
                index = n + 1;
              }
            }
            if (str2[index] === "!") {
              return true;
            }
          } else {
            index++;
          }
        }
        return false;
      };
      module.exports = function isGlob(str2, options) {
        if (typeof str2 !== "string" || str2 === "") {
          return false;
        }
        if (isExtglob(str2)) {
          return true;
        }
        var check = strictCheck;
        if (options && options.strict === false) {
          check = relaxedCheck;
        }
        return check(str2);
      };
    }
  });

  // ../../../.yarn/cache/glob-parent-npm-5.1.2-021ab32634-cab87638e2.zip/node_modules/glob-parent/index.js
  var require_glob_parent = __commonJS({
    "../../../.yarn/cache/glob-parent-npm-5.1.2-021ab32634-cab87638e2.zip/node_modules/glob-parent/index.js"(exports, module) {
      "use strict";
      var isGlob = require_is_glob();
      var pathPosixDirname = __require("path").posix.dirname;
      var isWin32 = __require("os").platform() === "win32";
      var slash2 = "/";
      var backslash = /\\/g;
      var enclosure = /[\{\[].*[\}\]]$/;
      var globby2 = /(^|[^\\])([\{\[]|\([^\)]+$)/;
      var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
      module.exports = function globParent(str2, opts) {
        var options = Object.assign({ flipBackslashes: true }, opts);
        if (options.flipBackslashes && isWin32 && str2.indexOf(slash2) < 0) {
          str2 = str2.replace(backslash, slash2);
        }
        if (enclosure.test(str2)) {
          str2 += slash2;
        }
        str2 += "a";
        do {
          str2 = pathPosixDirname(str2);
        } while (isGlob(str2) || globby2.test(str2));
        return str2.replace(escaped, "$1");
      };
    }
  });

  // ../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/lib/utils.js
  var require_utils = __commonJS({
    "../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/lib/utils.js"(exports) {
      "use strict";
      exports.isInteger = (num) => {
        if (typeof num === "number") {
          return Number.isInteger(num);
        }
        if (typeof num === "string" && num.trim() !== "") {
          return Number.isInteger(Number(num));
        }
        return false;
      };
      exports.find = (node, type2) => node.nodes.find((node2) => node2.type === type2);
      exports.exceedsLimit = (min, max, step = 1, limit) => {
        if (limit === false)
          return false;
        if (!exports.isInteger(min) || !exports.isInteger(max))
          return false;
        return (Number(max) - Number(min)) / Number(step) >= limit;
      };
      exports.escapeNode = (block, n = 0, type2) => {
        let node = block.nodes[n];
        if (!node)
          return;
        if (type2 && node.type === type2 || node.type === "open" || node.type === "close") {
          if (node.escaped !== true) {
            node.value = "\\" + node.value;
            node.escaped = true;
          }
        }
      };
      exports.encloseBrace = (node) => {
        if (node.type !== "brace")
          return false;
        if (node.commas >> 0 + node.ranges >> 0 === 0) {
          node.invalid = true;
          return true;
        }
        return false;
      };
      exports.isInvalidBrace = (block) => {
        if (block.type !== "brace")
          return false;
        if (block.invalid === true || block.dollar)
          return true;
        if (block.commas >> 0 + block.ranges >> 0 === 0) {
          block.invalid = true;
          return true;
        }
        if (block.open !== true || block.close !== true) {
          block.invalid = true;
          return true;
        }
        return false;
      };
      exports.isOpenOrClose = (node) => {
        if (node.type === "open" || node.type === "close") {
          return true;
        }
        return node.open === true || node.close === true;
      };
      exports.reduce = (nodes) => nodes.reduce((acc, node) => {
        if (node.type === "text")
          acc.push(node.value);
        if (node.type === "range")
          node.type = "text";
        return acc;
      }, []);
      exports.flatten = (...args) => {
        const result = [];
        const flat = (arr) => {
          for (let i = 0; i < arr.length; i++) {
            let ele = arr[i];
            Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele);
          }
          return result;
        };
        flat(args);
        return result;
      };
    }
  });

  // ../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/lib/stringify.js
  var require_stringify = __commonJS({
    "../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/lib/stringify.js"(exports, module) {
      "use strict";
      var utils = require_utils();
      module.exports = (ast, options = {}) => {
        let stringify = (node, parent = {}) => {
          let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
          let invalidNode = node.invalid === true && options.escapeInvalid === true;
          let output = "";
          if (node.value) {
            if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
              return "\\" + node.value;
            }
            return node.value;
          }
          if (node.value) {
            return node.value;
          }
          if (node.nodes) {
            for (let child of node.nodes) {
              output += stringify(child);
            }
          }
          return output;
        };
        return stringify(ast);
      };
    }
  });

  // ../../../.yarn/cache/is-number-npm-7.0.0-060086935c-b4686d0d30.zip/node_modules/is-number/index.js
  var require_is_number = __commonJS({
    "../../../.yarn/cache/is-number-npm-7.0.0-060086935c-b4686d0d30.zip/node_modules/is-number/index.js"(exports, module) {
      "use strict";
      module.exports = function(num) {
        if (typeof num === "number") {
          return num - num === 0;
        }
        if (typeof num === "string" && num.trim() !== "") {
          return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
        }
        return false;
      };
    }
  });

  // ../../../.yarn/cache/to-regex-range-npm-5.0.1-f1e8263b00-487988b0a1.zip/node_modules/to-regex-range/index.js
  var require_to_regex_range = __commonJS({
    "../../../.yarn/cache/to-regex-range-npm-5.0.1-f1e8263b00-487988b0a1.zip/node_modules/to-regex-range/index.js"(exports, module) {
      "use strict";
      var isNumber = require_is_number();
      var toRegexRange = (min, max, options) => {
        if (isNumber(min) === false) {
          throw new TypeError("toRegexRange: expected the first argument to be a number");
        }
        if (max === void 0 || min === max) {
          return String(min);
        }
        if (isNumber(max) === false) {
          throw new TypeError("toRegexRange: expected the second argument to be a number.");
        }
        let opts = { relaxZeros: true, ...options };
        if (typeof opts.strictZeros === "boolean") {
          opts.relaxZeros = opts.strictZeros === false;
        }
        let relax = String(opts.relaxZeros);
        let shorthand = String(opts.shorthand);
        let capture = String(opts.capture);
        let wrap = String(opts.wrap);
        let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
        if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
          return toRegexRange.cache[cacheKey].result;
        }
        let a = Math.min(min, max);
        let b = Math.max(min, max);
        if (Math.abs(a - b) === 1) {
          let result = min + "|" + max;
          if (opts.capture) {
            return `(${result})`;
          }
          if (opts.wrap === false) {
            return result;
          }
          return `(?:${result})`;
        }
        let isPadded = hasPadding(min) || hasPadding(max);
        let state = { min, max, a, b };
        let positives = [];
        let negatives = [];
        if (isPadded) {
          state.isPadded = isPadded;
          state.maxLen = String(state.max).length;
        }
        if (a < 0) {
          let newMin = b < 0 ? Math.abs(b) : 1;
          negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
          a = state.a = 0;
        }
        if (b >= 0) {
          positives = splitToPatterns(a, b, state, opts);
        }
        state.negatives = negatives;
        state.positives = positives;
        state.result = collatePatterns(negatives, positives, opts);
        if (opts.capture === true) {
          state.result = `(${state.result})`;
        } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
          state.result = `(?:${state.result})`;
        }
        toRegexRange.cache[cacheKey] = state;
        return state.result;
      };
      function collatePatterns(neg, pos, options) {
        let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
        let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
        let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
        let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
        return subpatterns.join("|");
      }
      function splitToRanges(min, max) {
        let nines = 1;
        let zeros = 1;
        let stop = countNines(min, nines);
        let stops = /* @__PURE__ */ new Set([max]);
        while (min <= stop && stop <= max) {
          stops.add(stop);
          nines += 1;
          stop = countNines(min, nines);
        }
        stop = countZeros(max + 1, zeros) - 1;
        while (min < stop && stop <= max) {
          stops.add(stop);
          zeros += 1;
          stop = countZeros(max + 1, zeros) - 1;
        }
        stops = [...stops];
        stops.sort(compare);
        return stops;
      }
      function rangeToPattern(start, stop, options) {
        if (start === stop) {
          return { pattern: start, count: [], digits: 0 };
        }
        let zipped = zip(start, stop);
        let digits = zipped.length;
        let pattern = "";
        let count = 0;
        for (let i = 0; i < digits; i++) {
          let [startDigit, stopDigit] = zipped[i];
          if (startDigit === stopDigit) {
            pattern += startDigit;
          } else if (startDigit !== "0" || stopDigit !== "9") {
            pattern += toCharacterClass(startDigit, stopDigit, options);
          } else {
            count++;
          }
        }
        if (count) {
          pattern += options.shorthand === true ? "\\d" : "[0-9]";
        }
        return { pattern, count: [count], digits };
      }
      function splitToPatterns(min, max, tok, options) {
        let ranges = splitToRanges(min, max);
        let tokens = [];
        let start = min;
        let prev;
        for (let i = 0; i < ranges.length; i++) {
          let max2 = ranges[i];
          let obj = rangeToPattern(String(start), String(max2), options);
          let zeros = "";
          if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
            if (prev.count.length > 1) {
              prev.count.pop();
            }
            prev.count.push(obj.count[0]);
            prev.string = prev.pattern + toQuantifier(prev.count);
            start = max2 + 1;
            continue;
          }
          if (tok.isPadded) {
            zeros = padZeros(max2, tok, options);
          }
          obj.string = zeros + obj.pattern + toQuantifier(obj.count);
          tokens.push(obj);
          start = max2 + 1;
          prev = obj;
        }
        return tokens;
      }
      function filterPatterns(arr, comparison, prefix, intersection, options) {
        let result = [];
        for (let ele of arr) {
          let { string } = ele;
          if (!intersection && !contains(comparison, "string", string)) {
            result.push(prefix + string);
          }
          if (intersection && contains(comparison, "string", string)) {
            result.push(prefix + string);
          }
        }
        return result;
      }
      function zip(a, b) {
        let arr = [];
        for (let i = 0; i < a.length; i++)
          arr.push([a[i], b[i]]);
        return arr;
      }
      function compare(a, b) {
        return a > b ? 1 : b > a ? -1 : 0;
      }
      function contains(arr, key, val) {
        return arr.some((ele) => ele[key] === val);
      }
      function countNines(min, len) {
        return Number(String(min).slice(0, -len) + "9".repeat(len));
      }
      function countZeros(integer, zeros) {
        return integer - integer % Math.pow(10, zeros);
      }
      function toQuantifier(digits) {
        let [start = 0, stop = ""] = digits;
        if (stop || start > 1) {
          return `{${start + (stop ? "," + stop : "")}}`;
        }
        return "";
      }
      function toCharacterClass(a, b, options) {
        return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
      }
      function hasPadding(str2) {
        return /^-?(0+)\d/.test(str2);
      }
      function padZeros(value, tok, options) {
        if (!tok.isPadded) {
          return value;
        }
        let diff = Math.abs(tok.maxLen - String(value).length);
        let relax = options.relaxZeros !== false;
        switch (diff) {
          case 0:
            return "";
          case 1:
            return relax ? "0?" : "0";
          case 2:
            return relax ? "0{0,2}" : "00";
          default: {
            return relax ? `0{0,${diff}}` : `0{${diff}}`;
          }
        }
      }
      toRegexRange.cache = {};
      toRegexRange.clearCache = () => toRegexRange.cache = {};
      module.exports = toRegexRange;
    }
  });

  // ../../../.yarn/cache/fill-range-npm-7.0.1-b8b1817caa-7cdad7d426.zip/node_modules/fill-range/index.js
  var require_fill_range = __commonJS({
    "../../../.yarn/cache/fill-range-npm-7.0.1-b8b1817caa-7cdad7d426.zip/node_modules/fill-range/index.js"(exports, module) {
      "use strict";
      var util = __require("util");
      var toRegexRange = require_to_regex_range();
      var isObject3 = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
      var transform = (toNumber) => {
        return (value) => toNumber === true ? Number(value) : String(value);
      };
      var isValidValue = (value) => {
        return typeof value === "number" || typeof value === "string" && value !== "";
      };
      var isNumber = (num) => Number.isInteger(+num);
      var zeros = (input) => {
        let value = `${input}`;
        let index = -1;
        if (value[0] === "-")
          value = value.slice(1);
        if (value === "0")
          return false;
        while (value[++index] === "0")
          ;
        return index > 0;
      };
      var stringify = (start, end, options) => {
        if (typeof start === "string" || typeof end === "string") {
          return true;
        }
        return options.stringify === true;
      };
      var pad = (input, maxLength, toNumber) => {
        if (maxLength > 0) {
          let dash = input[0] === "-" ? "-" : "";
          if (dash)
            input = input.slice(1);
          input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
        }
        if (toNumber === false) {
          return String(input);
        }
        return input;
      };
      var toMaxLen = (input, maxLength) => {
        let negative = input[0] === "-" ? "-" : "";
        if (negative) {
          input = input.slice(1);
          maxLength--;
        }
        while (input.length < maxLength)
          input = "0" + input;
        return negative ? "-" + input : input;
      };
      var toSequence = (parts, options) => {
        parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
        parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
        let prefix = options.capture ? "" : "?:";
        let positives = "";
        let negatives = "";
        let result;
        if (parts.positives.length) {
          positives = parts.positives.join("|");
        }
        if (parts.negatives.length) {
          negatives = `-(${prefix}${parts.negatives.join("|")})`;
        }
        if (positives && negatives) {
          result = `${positives}|${negatives}`;
        } else {
          result = positives || negatives;
        }
        if (options.wrap) {
          return `(${prefix}${result})`;
        }
        return result;
      };
      var toRange = (a, b, isNumbers, options) => {
        if (isNumbers) {
          return toRegexRange(a, b, { wrap: false, ...options });
        }
        let start = String.fromCharCode(a);
        if (a === b)
          return start;
        let stop = String.fromCharCode(b);
        return `[${start}-${stop}]`;
      };
      var toRegex = (start, end, options) => {
        if (Array.isArray(start)) {
          let wrap = options.wrap === true;
          let prefix = options.capture ? "" : "?:";
          return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
        }
        return toRegexRange(start, end, options);
      };
      var rangeError = (...args) => {
        return new RangeError("Invalid range arguments: " + util.inspect(...args));
      };
      var invalidRange = (start, end, options) => {
        if (options.strictRanges === true)
          throw rangeError([start, end]);
        return [];
      };
      var invalidStep = (step, options) => {
        if (options.strictRanges === true) {
          throw new TypeError(`Expected step "${step}" to be a number`);
        }
        return [];
      };
      var fillNumbers = (start, end, step = 1, options = {}) => {
        let a = Number(start);
        let b = Number(end);
        if (!Number.isInteger(a) || !Number.isInteger(b)) {
          if (options.strictRanges === true)
            throw rangeError([start, end]);
          return [];
        }
        if (a === 0)
          a = 0;
        if (b === 0)
          b = 0;
        let descending = a > b;
        let startString = String(start);
        let endString = String(end);
        let stepString = String(step);
        step = Math.max(Math.abs(step), 1);
        let padded = zeros(startString) || zeros(endString) || zeros(stepString);
        let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
        let toNumber = padded === false && stringify(start, end, options) === false;
        let format = options.transform || transform(toNumber);
        if (options.toRegex && step === 1) {
          return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
        }
        let parts = { negatives: [], positives: [] };
        let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
        let range = [];
        let index = 0;
        while (descending ? a >= b : a <= b) {
          if (options.toRegex === true && step > 1) {
            push(a);
          } else {
            range.push(pad(format(a, index), maxLen, toNumber));
          }
          a = descending ? a - step : a + step;
          index++;
        }
        if (options.toRegex === true) {
          return step > 1 ? toSequence(parts, options) : toRegex(range, null, { wrap: false, ...options });
        }
        return range;
      };
      var fillLetters = (start, end, step = 1, options = {}) => {
        if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
          return invalidRange(start, end, options);
        }
        let format = options.transform || ((val) => String.fromCharCode(val));
        let a = `${start}`.charCodeAt(0);
        let b = `${end}`.charCodeAt(0);
        let descending = a > b;
        let min = Math.min(a, b);
        let max = Math.max(a, b);
        if (options.toRegex && step === 1) {
          return toRange(min, max, false, options);
        }
        let range = [];
        let index = 0;
        while (descending ? a >= b : a <= b) {
          range.push(format(a, index));
          a = descending ? a - step : a + step;
          index++;
        }
        if (options.toRegex === true) {
          return toRegex(range, null, { wrap: false, options });
        }
        return range;
      };
      var fill = (start, end, step, options = {}) => {
        if (end == null && isValidValue(start)) {
          return [start];
        }
        if (!isValidValue(start) || !isValidValue(end)) {
          return invalidRange(start, end, options);
        }
        if (typeof step === "function") {
          return fill(start, end, 1, { transform: step });
        }
        if (isObject3(step)) {
          return fill(start, end, 0, step);
        }
        let opts = { ...options };
        if (opts.capture === true)
          opts.wrap = true;
        step = step || opts.step || 1;
        if (!isNumber(step)) {
          if (step != null && !isObject3(step))
            return invalidStep(step, opts);
          return fill(start, end, 1, step);
        }
        if (isNumber(start) && isNumber(end)) {
          return fillNumbers(start, end, step, opts);
        }
        return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
      };
      module.exports = fill;
    }
  });

  // ../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/lib/compile.js
  var require_compile = __commonJS({
    "../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/lib/compile.js"(exports, module) {
      "use strict";
      var fill = require_fill_range();
      var utils = require_utils();
      var compile = (ast, options = {}) => {
        let walk = (node, parent = {}) => {
          let invalidBlock = utils.isInvalidBrace(parent);
          let invalidNode = node.invalid === true && options.escapeInvalid === true;
          let invalid = invalidBlock === true || invalidNode === true;
          let prefix = options.escapeInvalid === true ? "\\" : "";
          let output = "";
          if (node.isOpen === true) {
            return prefix + node.value;
          }
          if (node.isClose === true) {
            return prefix + node.value;
          }
          if (node.type === "open") {
            return invalid ? prefix + node.value : "(";
          }
          if (node.type === "close") {
            return invalid ? prefix + node.value : ")";
          }
          if (node.type === "comma") {
            return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
          }
          if (node.value) {
            return node.value;
          }
          if (node.nodes && node.ranges > 0) {
            let args = utils.reduce(node.nodes);
            let range = fill(...args, { ...options, wrap: false, toRegex: true });
            if (range.length !== 0) {
              return args.length > 1 && range.length > 1 ? `(${range})` : range;
            }
          }
          if (node.nodes) {
            for (let child of node.nodes) {
              output += walk(child, node);
            }
          }
          return output;
        };
        return walk(ast);
      };
      module.exports = compile;
    }
  });

  // ../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/lib/expand.js
  var require_expand = __commonJS({
    "../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/lib/expand.js"(exports, module) {
      "use strict";
      var fill = require_fill_range();
      var stringify = require_stringify();
      var utils = require_utils();
      var append = (queue = "", stash = "", enclose = false) => {
        let result = [];
        queue = [].concat(queue);
        stash = [].concat(stash);
        if (!stash.length)
          return queue;
        if (!queue.length) {
          return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
        }
        for (let item of queue) {
          if (Array.isArray(item)) {
            for (let value of item) {
              result.push(append(value, stash, enclose));
            }
          } else {
            for (let ele of stash) {
              if (enclose === true && typeof ele === "string")
                ele = `{${ele}}`;
              result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
            }
          }
        }
        return utils.flatten(result);
      };
      var expand = (ast, options = {}) => {
        let rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
        let walk = (node, parent = {}) => {
          node.queue = [];
          let p = parent;
          let q = parent.queue;
          while (p.type !== "brace" && p.type !== "root" && p.parent) {
            p = p.parent;
            q = p.queue;
          }
          if (node.invalid || node.dollar) {
            q.push(append(q.pop(), stringify(node, options)));
            return;
          }
          if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
            q.push(append(q.pop(), ["{}"]));
            return;
          }
          if (node.nodes && node.ranges > 0) {
            let args = utils.reduce(node.nodes);
            if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
              throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
            }
            let range = fill(...args, options);
            if (range.length === 0) {
              range = stringify(node, options);
            }
            q.push(append(q.pop(), range));
            node.nodes = [];
            return;
          }
          let enclose = utils.encloseBrace(node);
          let queue = node.queue;
          let block = node;
          while (block.type !== "brace" && block.type !== "root" && block.parent) {
            block = block.parent;
            queue = block.queue;
          }
          for (let i = 0; i < node.nodes.length; i++) {
            let child = node.nodes[i];
            if (child.type === "comma" && node.type === "brace") {
              if (i === 1)
                queue.push("");
              queue.push("");
              continue;
            }
            if (child.type === "close") {
              q.push(append(q.pop(), queue, enclose));
              continue;
            }
            if (child.value && child.type !== "open") {
              queue.push(append(queue.pop(), child.value));
              continue;
            }
            if (child.nodes) {
              walk(child, node);
            }
          }
          return queue;
        };
        return utils.flatten(walk(ast));
      };
      module.exports = expand;
    }
  });

  // ../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/lib/constants.js
  var require_constants = __commonJS({
    "../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/lib/constants.js"(exports, module) {
      "use strict";
      module.exports = {
        MAX_LENGTH: 1024 * 64,
        // Digits
        CHAR_0: "0",
        /* 0 */
        CHAR_9: "9",
        /* 9 */
        // Alphabet chars.
        CHAR_UPPERCASE_A: "A",
        /* A */
        CHAR_LOWERCASE_A: "a",
        /* a */
        CHAR_UPPERCASE_Z: "Z",
        /* Z */
        CHAR_LOWERCASE_Z: "z",
        /* z */
        CHAR_LEFT_PARENTHESES: "(",
        /* ( */
        CHAR_RIGHT_PARENTHESES: ")",
        /* ) */
        CHAR_ASTERISK: "*",
        /* * */
        // Non-alphabetic chars.
        CHAR_AMPERSAND: "&",
        /* & */
        CHAR_AT: "@",
        /* @ */
        CHAR_BACKSLASH: "\\",
        /* \ */
        CHAR_BACKTICK: "`",
        /* ` */
        CHAR_CARRIAGE_RETURN: "\r",
        /* \r */
        CHAR_CIRCUMFLEX_ACCENT: "^",
        /* ^ */
        CHAR_COLON: ":",
        /* : */
        CHAR_COMMA: ",",
        /* , */
        CHAR_DOLLAR: "$",
        /* . */
        CHAR_DOT: ".",
        /* . */
        CHAR_DOUBLE_QUOTE: '"',
        /* " */
        CHAR_EQUAL: "=",
        /* = */
        CHAR_EXCLAMATION_MARK: "!",
        /* ! */
        CHAR_FORM_FEED: "\f",
        /* \f */
        CHAR_FORWARD_SLASH: "/",
        /* / */
        CHAR_HASH: "#",
        /* # */
        CHAR_HYPHEN_MINUS: "-",
        /* - */
        CHAR_LEFT_ANGLE_BRACKET: "<",
        /* < */
        CHAR_LEFT_CURLY_BRACE: "{",
        /* { */
        CHAR_LEFT_SQUARE_BRACKET: "[",
        /* [ */
        CHAR_LINE_FEED: "\n",
        /* \n */
        CHAR_NO_BREAK_SPACE: "\xA0",
        /* \u00A0 */
        CHAR_PERCENT: "%",
        /* % */
        CHAR_PLUS: "+",
        /* + */
        CHAR_QUESTION_MARK: "?",
        /* ? */
        CHAR_RIGHT_ANGLE_BRACKET: ">",
        /* > */
        CHAR_RIGHT_CURLY_BRACE: "}",
        /* } */
        CHAR_RIGHT_SQUARE_BRACKET: "]",
        /* ] */
        CHAR_SEMICOLON: ";",
        /* ; */
        CHAR_SINGLE_QUOTE: "'",
        /* ' */
        CHAR_SPACE: " ",
        /*   */
        CHAR_TAB: "	",
        /* \t */
        CHAR_UNDERSCORE: "_",
        /* _ */
        CHAR_VERTICAL_LINE: "|",
        /* | */
        CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
        /* \uFEFF */
      };
    }
  });

  // ../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/lib/parse.js
  var require_parse = __commonJS({
    "../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/lib/parse.js"(exports, module) {
      "use strict";
      var stringify = require_stringify();
      var {
        MAX_LENGTH,
        CHAR_BACKSLASH,
        /* \ */
        CHAR_BACKTICK,
        /* ` */
        CHAR_COMMA: CHAR_COMMA2,
        /* , */
        CHAR_DOT,
        /* . */
        CHAR_LEFT_PARENTHESES,
        /* ( */
        CHAR_RIGHT_PARENTHESES,
        /* ) */
        CHAR_LEFT_CURLY_BRACE,
        /* { */
        CHAR_RIGHT_CURLY_BRACE,
        /* } */
        CHAR_LEFT_SQUARE_BRACKET: CHAR_LEFT_SQUARE_BRACKET2,
        /* [ */
        CHAR_RIGHT_SQUARE_BRACKET: CHAR_RIGHT_SQUARE_BRACKET2,
        /* ] */
        CHAR_DOUBLE_QUOTE: CHAR_DOUBLE_QUOTE2,
        /* " */
        CHAR_SINGLE_QUOTE: CHAR_SINGLE_QUOTE2,
        /* ' */
        CHAR_NO_BREAK_SPACE,
        CHAR_ZERO_WIDTH_NOBREAK_SPACE
      } = require_constants();
      var parse = (input, options = {}) => {
        if (typeof input !== "string") {
          throw new TypeError("Expected a string");
        }
        let opts = options || {};
        let max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
        if (input.length > max) {
          throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
        }
        let ast = { type: "root", input, nodes: [] };
        let stack = [ast];
        let block = ast;
        let prev = ast;
        let brackets = 0;
        let length = input.length;
        let index = 0;
        let depth = 0;
        let value;
        let memo = {};
        const advance = () => input[index++];
        const push = (node) => {
          if (node.type === "text" && prev.type === "dot") {
            prev.type = "text";
          }
          if (prev && prev.type === "text" && node.type === "text") {
            prev.value += node.value;
            return;
          }
          block.nodes.push(node);
          node.parent = block;
          node.prev = prev;
          prev = node;
          return node;
        };
        push({ type: "bos" });
        while (index < length) {
          block = stack[stack.length - 1];
          value = advance();
          if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
            continue;
          }
          if (value === CHAR_BACKSLASH) {
            push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
            continue;
          }
          if (value === CHAR_RIGHT_SQUARE_BRACKET2) {
            push({ type: "text", value: "\\" + value });
            continue;
          }
          if (value === CHAR_LEFT_SQUARE_BRACKET2) {
            brackets++;
            let closed = true;
            let next;
            while (index < length && (next = advance())) {
              value += next;
              if (next === CHAR_LEFT_SQUARE_BRACKET2) {
                brackets++;
                continue;
              }
              if (next === CHAR_BACKSLASH) {
                value += advance();
                continue;
              }
              if (next === CHAR_RIGHT_SQUARE_BRACKET2) {
                brackets--;
                if (brackets === 0) {
                  break;
                }
              }
            }
            push({ type: "text", value });
            continue;
          }
          if (value === CHAR_LEFT_PARENTHESES) {
            block = push({ type: "paren", nodes: [] });
            stack.push(block);
            push({ type: "text", value });
            continue;
          }
          if (value === CHAR_RIGHT_PARENTHESES) {
            if (block.type !== "paren") {
              push({ type: "text", value });
              continue;
            }
            block = stack.pop();
            push({ type: "text", value });
            block = stack[stack.length - 1];
            continue;
          }
          if (value === CHAR_DOUBLE_QUOTE2 || value === CHAR_SINGLE_QUOTE2 || value === CHAR_BACKTICK) {
            let open = value;
            let next;
            if (options.keepQuotes !== true) {
              value = "";
            }
            while (index < length && (next = advance())) {
              if (next === CHAR_BACKSLASH) {
                value += next + advance();
                continue;
              }
              if (next === open) {
                if (options.keepQuotes === true)
                  value += next;
                break;
              }
              value += next;
            }
            push({ type: "text", value });
            continue;
          }
          if (value === CHAR_LEFT_CURLY_BRACE) {
            depth++;
            let dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
            let brace = {
              type: "brace",
              open: true,
              close: false,
              dollar,
              depth,
              commas: 0,
              ranges: 0,
              nodes: []
            };
            block = push(brace);
            stack.push(block);
            push({ type: "open", value });
            continue;
          }
          if (value === CHAR_RIGHT_CURLY_BRACE) {
            if (block.type !== "brace") {
              push({ type: "text", value });
              continue;
            }
            let type2 = "close";
            block = stack.pop();
            block.close = true;
            push({ type: type2, value });
            depth--;
            block = stack[stack.length - 1];
            continue;
          }
          if (value === CHAR_COMMA2 && depth > 0) {
            if (block.ranges > 0) {
              block.ranges = 0;
              let open = block.nodes.shift();
              block.nodes = [open, { type: "text", value: stringify(block) }];
            }
            push({ type: "comma", value });
            block.commas++;
            continue;
          }
          if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
            let siblings = block.nodes;
            if (depth === 0 || siblings.length === 0) {
              push({ type: "text", value });
              continue;
            }
            if (prev.type === "dot") {
              block.range = [];
              prev.value += value;
              prev.type = "range";
              if (block.nodes.length !== 3 && block.nodes.length !== 5) {
                block.invalid = true;
                block.ranges = 0;
                prev.type = "text";
                continue;
              }
              block.ranges++;
              block.args = [];
              continue;
            }
            if (prev.type === "range") {
              siblings.pop();
              let before = siblings[siblings.length - 1];
              before.value += prev.value + value;
              prev = before;
              block.ranges--;
              continue;
            }
            push({ type: "dot", value });
            continue;
          }
          push({ type: "text", value });
        }
        do {
          block = stack.pop();
          if (block.type !== "root") {
            block.nodes.forEach((node) => {
              if (!node.nodes) {
                if (node.type === "open")
                  node.isOpen = true;
                if (node.type === "close")
                  node.isClose = true;
                if (!node.nodes)
                  node.type = "text";
                node.invalid = true;
              }
            });
            let parent = stack[stack.length - 1];
            let index2 = parent.nodes.indexOf(block);
            parent.nodes.splice(index2, 1, ...block.nodes);
          }
        } while (stack.length > 0);
        push({ type: "eos" });
        return ast;
      };
      module.exports = parse;
    }
  });

  // ../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/index.js
  var require_braces = __commonJS({
    "../../../.yarn/cache/braces-npm-3.0.2-782240b28a-321b4d6757.zip/node_modules/braces/index.js"(exports, module) {
      "use strict";
      var stringify = require_stringify();
      var compile = require_compile();
      var expand = require_expand();
      var parse = require_parse();
      var braces = (input, options = {}) => {
        let output = [];
        if (Array.isArray(input)) {
          for (let pattern of input) {
            let result = braces.create(pattern, options);
            if (Array.isArray(result)) {
              output.push(...result);
            } else {
              output.push(result);
            }
          }
        } else {
          output = [].concat(braces.create(input, options));
        }
        if (options && options.expand === true && options.nodupes === true) {
          output = [...new Set(output)];
        }
        return output;
      };
      braces.parse = (input, options = {}) => parse(input, options);
      braces.stringify = (input, options = {}) => {
        if (typeof input === "string") {
          return stringify(braces.parse(input, options), options);
        }
        return stringify(input, options);
      };
      braces.compile = (input, options = {}) => {
        if (typeof input === "string") {
          input = braces.parse(input, options);
        }
        return compile(input, options);
      };
      braces.expand = (input, options = {}) => {
        if (typeof input === "string") {
          input = braces.parse(input, options);
        }
        let result = expand(input, options);
        if (options.noempty === true) {
          result = result.filter(Boolean);
        }
        if (options.nodupes === true) {
          result = [...new Set(result)];
        }
        return result;
      };
      braces.create = (input, options = {}) => {
        if (input === "" || input.length < 3) {
          return [input];
        }
        return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
      };
      module.exports = braces;
    }
  });

  // ../../../.yarn/cache/picomatch-npm-2.3.1-c782cfd986-26c02b8d06.zip/node_modules/picomatch/lib/constants.js
  var require_constants2 = __commonJS({
    "../../../.yarn/cache/picomatch-npm-2.3.1-c782cfd986-26c02b8d06.zip/node_modules/picomatch/lib/constants.js"(exports, module) {
      "use strict";
      var path3 = __require("path");
      var WIN_SLASH = "\\\\/";
      var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
      var DOT_LITERAL = "\\.";
      var PLUS_LITERAL = "\\+";
      var QMARK_LITERAL = "\\?";
      var SLASH_LITERAL = "\\/";
      var ONE_CHAR = "(?=.)";
      var QMARK = "[^/]";
      var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
      var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
      var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
      var NO_DOT = `(?!${DOT_LITERAL})`;
      var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
      var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
      var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
      var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
      var STAR = `${QMARK}*?`;
      var POSIX_CHARS = {
        DOT_LITERAL,
        PLUS_LITERAL,
        QMARK_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        QMARK,
        END_ANCHOR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      };
      var WINDOWS_CHARS = {
        ...POSIX_CHARS,
        SLASH_LITERAL: `[${WIN_SLASH}]`,
        QMARK: WIN_NO_SLASH,
        STAR: `${WIN_NO_SLASH}*?`,
        DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
        NO_DOT: `(?!${DOT_LITERAL})`,
        NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
        NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
        NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
        QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
        START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
        END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
      };
      var POSIX_REGEX_SOURCE = {
        alnum: "a-zA-Z0-9",
        alpha: "a-zA-Z",
        ascii: "\\x00-\\x7F",
        blank: " \\t",
        cntrl: "\\x00-\\x1F\\x7F",
        digit: "0-9",
        graph: "\\x21-\\x7E",
        lower: "a-z",
        print: "\\x20-\\x7E ",
        punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
        space: " \\t\\r\\n\\v\\f",
        upper: "A-Z",
        word: "A-Za-z0-9_",
        xdigit: "A-Fa-f0-9"
      };
      module.exports = {
        MAX_LENGTH: 1024 * 64,
        POSIX_REGEX_SOURCE,
        // regular expressions
        REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
        REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
        REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
        REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
        REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
        REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
        // Replace globs with equivalent patterns to reduce parsing time.
        REPLACEMENTS: {
          "***": "*",
          "**/**": "**",
          "**/**/**": "**"
        },
        // Digits
        CHAR_0: 48,
        /* 0 */
        CHAR_9: 57,
        /* 9 */
        // Alphabet chars.
        CHAR_UPPERCASE_A: 65,
        /* A */
        CHAR_LOWERCASE_A: 97,
        /* a */
        CHAR_UPPERCASE_Z: 90,
        /* Z */
        CHAR_LOWERCASE_Z: 122,
        /* z */
        CHAR_LEFT_PARENTHESES: 40,
        /* ( */
        CHAR_RIGHT_PARENTHESES: 41,
        /* ) */
        CHAR_ASTERISK: 42,
        /* * */
        // Non-alphabetic chars.
        CHAR_AMPERSAND: 38,
        /* & */
        CHAR_AT: 64,
        /* @ */
        CHAR_BACKWARD_SLASH: 92,
        /* \ */
        CHAR_CARRIAGE_RETURN: 13,
        /* \r */
        CHAR_CIRCUMFLEX_ACCENT: 94,
        /* ^ */
        CHAR_COLON: 58,
        /* : */
        CHAR_COMMA: 44,
        /* , */
        CHAR_DOT: 46,
        /* . */
        CHAR_DOUBLE_QUOTE: 34,
        /* " */
        CHAR_EQUAL: 61,
        /* = */
        CHAR_EXCLAMATION_MARK: 33,
        /* ! */
        CHAR_FORM_FEED: 12,
        /* \f */
        CHAR_FORWARD_SLASH: 47,
        /* / */
        CHAR_GRAVE_ACCENT: 96,
        /* ` */
        CHAR_HASH: 35,
        /* # */
        CHAR_HYPHEN_MINUS: 45,
        /* - */
        CHAR_LEFT_ANGLE_BRACKET: 60,
        /* < */
        CHAR_LEFT_CURLY_BRACE: 123,
        /* { */
        CHAR_LEFT_SQUARE_BRACKET: 91,
        /* [ */
        CHAR_LINE_FEED: 10,
        /* \n */
        CHAR_NO_BREAK_SPACE: 160,
        /* \u00A0 */
        CHAR_PERCENT: 37,
        /* % */
        CHAR_PLUS: 43,
        /* + */
        CHAR_QUESTION_MARK: 63,
        /* ? */
        CHAR_RIGHT_ANGLE_BRACKET: 62,
        /* > */
        CHAR_RIGHT_CURLY_BRACE: 125,
        /* } */
        CHAR_RIGHT_SQUARE_BRACKET: 93,
        /* ] */
        CHAR_SEMICOLON: 59,
        /* ; */
        CHAR_SINGLE_QUOTE: 39,
        /* ' */
        CHAR_SPACE: 32,
        /*   */
        CHAR_TAB: 9,
        /* \t */
        CHAR_UNDERSCORE: 95,
        /* _ */
        CHAR_VERTICAL_LINE: 124,
        /* | */
        CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
        /* \uFEFF */
        SEP: path3.sep,
        /**
         * Create EXTGLOB_CHARS
         */
        extglobChars(chars) {
          return {
            "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
            "?": { type: "qmark", open: "(?:", close: ")?" },
            "+": { type: "plus", open: "(?:", close: ")+" },
            "*": { type: "star", open: "(?:", close: ")*" },
            "@": { type: "at", open: "(?:", close: ")" }
          };
        },
        /**
         * Create GLOB_CHARS
         */
        globChars(win32) {
          return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
        }
      };
    }
  });

  // ../../../.yarn/cache/picomatch-npm-2.3.1-c782cfd986-26c02b8d06.zip/node_modules/picomatch/lib/utils.js
  var require_utils2 = __commonJS({
    "../../../.yarn/cache/picomatch-npm-2.3.1-c782cfd986-26c02b8d06.zip/node_modules/picomatch/lib/utils.js"(exports) {
      "use strict";
      var path3 = __require("path");
      var win32 = process.platform === "win32";
      var {
        REGEX_BACKSLASH,
        REGEX_REMOVE_BACKSLASH,
        REGEX_SPECIAL_CHARS,
        REGEX_SPECIAL_CHARS_GLOBAL
      } = require_constants2();
      exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
      exports.hasRegexChars = (str2) => REGEX_SPECIAL_CHARS.test(str2);
      exports.isRegexChar = (str2) => str2.length === 1 && exports.hasRegexChars(str2);
      exports.escapeRegex = (str2) => str2.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
      exports.toPosixSlashes = (str2) => str2.replace(REGEX_BACKSLASH, "/");
      exports.removeBackslashes = (str2) => {
        return str2.replace(REGEX_REMOVE_BACKSLASH, (match) => {
          return match === "\\" ? "" : match;
        });
      };
      exports.supportsLookbehinds = () => {
        const segs = process.version.slice(1).split(".").map(Number);
        if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
          return true;
        }
        return false;
      };
      exports.isWindows = (options) => {
        if (options && typeof options.windows === "boolean") {
          return options.windows;
        }
        return win32 === true || path3.sep === "\\";
      };
      exports.escapeLast = (input, char, lastIdx) => {
        const idx = input.lastIndexOf(char, lastIdx);
        if (idx === -1)
          return input;
        if (input[idx - 1] === "\\")
          return exports.escapeLast(input, char, idx - 1);
        return `${input.slice(0, idx)}\\${input.slice(idx)}`;
      };
      exports.removePrefix = (input, state = {}) => {
        let output = input;
        if (output.startsWith("./")) {
          output = output.slice(2);
          state.prefix = "./";
        }
        return output;
      };
      exports.wrapOutput = (input, state = {}, options = {}) => {
        const prepend = options.contains ? "" : "^";
        const append = options.contains ? "" : "$";
        let output = `${prepend}(?:${input})${append}`;
        if (state.negated === true) {
          output = `(?:^(?!${output}).*$)`;
        }
        return output;
      };
    }
  });

  // ../../../.yarn/cache/picomatch-npm-2.3.1-c782cfd986-26c02b8d06.zip/node_modules/picomatch/lib/scan.js
  var require_scan = __commonJS({
    "../../../.yarn/cache/picomatch-npm-2.3.1-c782cfd986-26c02b8d06.zip/node_modules/picomatch/lib/scan.js"(exports, module) {
      "use strict";
      var utils = require_utils2();
      var {
        CHAR_ASTERISK: CHAR_ASTERISK2,
        /* * */
        CHAR_AT,
        /* @ */
        CHAR_BACKWARD_SLASH,
        /* \ */
        CHAR_COMMA: CHAR_COMMA2,
        /* , */
        CHAR_DOT,
        /* . */
        CHAR_EXCLAMATION_MARK,
        /* ! */
        CHAR_FORWARD_SLASH,
        /* / */
        CHAR_LEFT_CURLY_BRACE,
        /* { */
        CHAR_LEFT_PARENTHESES,
        /* ( */
        CHAR_LEFT_SQUARE_BRACKET: CHAR_LEFT_SQUARE_BRACKET2,
        /* [ */
        CHAR_PLUS,
        /* + */
        CHAR_QUESTION_MARK,
        /* ? */
        CHAR_RIGHT_CURLY_BRACE,
        /* } */
        CHAR_RIGHT_PARENTHESES,
        /* ) */
        CHAR_RIGHT_SQUARE_BRACKET: CHAR_RIGHT_SQUARE_BRACKET2
        /* ] */
      } = require_constants2();
      var isPathSeparator = (code) => {
        return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
      };
      var depth = (token) => {
        if (token.isPrefix !== true) {
          token.depth = token.isGlobstar ? Infinity : 1;
        }
      };
      var scan = (input, options) => {
        const opts = options || {};
        const length = input.length - 1;
        const scanToEnd = opts.parts === true || opts.scanToEnd === true;
        const slashes = [];
        const tokens = [];
        const parts = [];
        let str2 = input;
        let index = -1;
        let start = 0;
        let lastIndex = 0;
        let isBrace = false;
        let isBracket = false;
        let isGlob = false;
        let isExtglob = false;
        let isGlobstar = false;
        let braceEscaped = false;
        let backslashes = false;
        let negated = false;
        let negatedExtglob = false;
        let finished2 = false;
        let braces = 0;
        let prev;
        let code;
        let token = { value: "", depth: 0, isGlob: false };
        const eos = () => index >= length;
        const peek = () => str2.charCodeAt(index + 1);
        const advance = () => {
          prev = code;
          return str2.charCodeAt(++index);
        };
        while (index < length) {
          code = advance();
          let next;
          if (code === CHAR_BACKWARD_SLASH) {
            backslashes = token.backslashes = true;
            code = advance();
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braceEscaped = true;
            }
            continue;
          }
          if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
            braces++;
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_BACKWARD_SLASH) {
                backslashes = token.backslashes = true;
                advance();
                continue;
              }
              if (code === CHAR_LEFT_CURLY_BRACE) {
                braces++;
                continue;
              }
              if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
                isBrace = token.isBrace = true;
                isGlob = token.isGlob = true;
                finished2 = true;
                if (scanToEnd === true) {
                  continue;
                }
                break;
              }
              if (braceEscaped !== true && code === CHAR_COMMA2) {
                isBrace = token.isBrace = true;
                isGlob = token.isGlob = true;
                finished2 = true;
                if (scanToEnd === true) {
                  continue;
                }
                break;
              }
              if (code === CHAR_RIGHT_CURLY_BRACE) {
                braces--;
                if (braces === 0) {
                  braceEscaped = false;
                  isBrace = token.isBrace = true;
                  finished2 = true;
                  break;
                }
              }
            }
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (code === CHAR_FORWARD_SLASH) {
            slashes.push(index);
            tokens.push(token);
            token = { value: "", depth: 0, isGlob: false };
            if (finished2 === true)
              continue;
            if (prev === CHAR_DOT && index === start + 1) {
              start += 2;
              continue;
            }
            lastIndex = index + 1;
            continue;
          }
          if (opts.noext !== true) {
            const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK2 || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
            if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
              isGlob = token.isGlob = true;
              isExtglob = token.isExtglob = true;
              finished2 = true;
              if (code === CHAR_EXCLAMATION_MARK && index === start) {
                negatedExtglob = true;
              }
              if (scanToEnd === true) {
                while (eos() !== true && (code = advance())) {
                  if (code === CHAR_BACKWARD_SLASH) {
                    backslashes = token.backslashes = true;
                    code = advance();
                    continue;
                  }
                  if (code === CHAR_RIGHT_PARENTHESES) {
                    isGlob = token.isGlob = true;
                    finished2 = true;
                    break;
                  }
                }
                continue;
              }
              break;
            }
          }
          if (code === CHAR_ASTERISK2) {
            if (prev === CHAR_ASTERISK2)
              isGlobstar = token.isGlobstar = true;
            isGlob = token.isGlob = true;
            finished2 = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (code === CHAR_QUESTION_MARK) {
            isGlob = token.isGlob = true;
            finished2 = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (code === CHAR_LEFT_SQUARE_BRACKET2) {
            while (eos() !== true && (next = advance())) {
              if (next === CHAR_BACKWARD_SLASH) {
                backslashes = token.backslashes = true;
                advance();
                continue;
              }
              if (next === CHAR_RIGHT_SQUARE_BRACKET2) {
                isBracket = token.isBracket = true;
                isGlob = token.isGlob = true;
                finished2 = true;
                break;
              }
            }
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
            negated = token.negated = true;
            start++;
            continue;
          }
          if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_LEFT_PARENTHESES) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  finished2 = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
          if (isGlob === true) {
            finished2 = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
        }
        if (opts.noext === true) {
          isExtglob = false;
          isGlob = false;
        }
        let base = str2;
        let prefix = "";
        let glob = "";
        if (start > 0) {
          prefix = str2.slice(0, start);
          str2 = str2.slice(start);
          lastIndex -= start;
        }
        if (base && isGlob === true && lastIndex > 0) {
          base = str2.slice(0, lastIndex);
          glob = str2.slice(lastIndex);
        } else if (isGlob === true) {
          base = "";
          glob = str2;
        } else {
          base = str2;
        }
        if (base && base !== "" && base !== "/" && base !== str2) {
          if (isPathSeparator(base.charCodeAt(base.length - 1))) {
            base = base.slice(0, -1);
          }
        }
        if (opts.unescape === true) {
          if (glob)
            glob = utils.removeBackslashes(glob);
          if (base && backslashes === true) {
            base = utils.removeBackslashes(base);
          }
        }
        const state = {
          prefix,
          input,
          start,
          base,
          glob,
          isBrace,
          isBracket,
          isGlob,
          isExtglob,
          isGlobstar,
          negated,
          negatedExtglob
        };
        if (opts.tokens === true) {
          state.maxDepth = 0;
          if (!isPathSeparator(code)) {
            tokens.push(token);
          }
          state.tokens = tokens;
        }
        if (opts.parts === true || opts.tokens === true) {
          let prevIndex;
          for (let idx = 0; idx < slashes.length; idx++) {
            const n = prevIndex ? prevIndex + 1 : start;
            const i = slashes[idx];
            const value = input.slice(n, i);
            if (opts.tokens) {
              if (idx === 0 && start !== 0) {
                tokens[idx].isPrefix = true;
                tokens[idx].value = prefix;
              } else {
                tokens[idx].value = value;
              }
              depth(tokens[idx]);
              state.maxDepth += tokens[idx].depth;
            }
            if (idx !== 0 || value !== "") {
              parts.push(value);
            }
            prevIndex = i;
          }
          if (prevIndex && prevIndex + 1 < input.length) {
            const value = input.slice(prevIndex + 1);
            parts.push(value);
            if (opts.tokens) {
              tokens[tokens.length - 1].value = value;
              depth(tokens[tokens.length - 1]);
              state.maxDepth += tokens[tokens.length - 1].depth;
            }
          }
          state.slashes = slashes;
          state.parts = parts;
        }
        return state;
      };
      module.exports = scan;
    }
  });

  // ../../../.yarn/cache/picomatch-npm-2.3.1-c782cfd986-26c02b8d06.zip/node_modules/picomatch/lib/parse.js
  var require_parse2 = __commonJS({
    "../../../.yarn/cache/picomatch-npm-2.3.1-c782cfd986-26c02b8d06.zip/node_modules/picomatch/lib/parse.js"(exports, module) {
      "use strict";
      var constants = require_constants2();
      var utils = require_utils2();
      var {
        MAX_LENGTH,
        POSIX_REGEX_SOURCE,
        REGEX_NON_SPECIAL_CHARS,
        REGEX_SPECIAL_CHARS_BACKREF,
        REPLACEMENTS
      } = constants;
      var expandRange = (args, options) => {
        if (typeof options.expandRange === "function") {
          return options.expandRange(...args, options);
        }
        args.sort();
        const value = `[${args.join("-")}]`;
        try {
          new RegExp(value);
        } catch (ex) {
          return args.map((v) => utils.escapeRegex(v)).join("..");
        }
        return value;
      };
      var syntaxError = (type2, char) => {
        return `Missing ${type2}: "${char}" - use "\\\\${char}" to match literal characters`;
      };
      var parse = (input, options) => {
        if (typeof input !== "string") {
          throw new TypeError("Expected a string");
        }
        input = REPLACEMENTS[input] || input;
        const opts = { ...options };
        const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
        let len = input.length;
        if (len > max) {
          throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
        }
        const bos = { type: "bos", value: "", output: opts.prepend || "" };
        const tokens = [bos];
        const capture = opts.capture ? "" : "?:";
        const win32 = utils.isWindows(options);
        const PLATFORM_CHARS = constants.globChars(win32);
        const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
        const {
          DOT_LITERAL,
          PLUS_LITERAL,
          SLASH_LITERAL,
          ONE_CHAR,
          DOTS_SLASH,
          NO_DOT,
          NO_DOT_SLASH,
          NO_DOTS_SLASH,
          QMARK,
          QMARK_NO_DOT,
          STAR,
          START_ANCHOR
        } = PLATFORM_CHARS;
        const globstar = (opts2) => {
          return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
        };
        const nodot = opts.dot ? "" : NO_DOT;
        const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
        let star = opts.bash === true ? globstar(opts) : STAR;
        if (opts.capture) {
          star = `(${star})`;
        }
        if (typeof opts.noext === "boolean") {
          opts.noextglob = opts.noext;
        }
        const state = {
          input,
          index: -1,
          start: 0,
          dot: opts.dot === true,
          consumed: "",
          output: "",
          prefix: "",
          backtrack: false,
          negated: false,
          brackets: 0,
          braces: 0,
          parens: 0,
          quotes: 0,
          globstar: false,
          tokens
        };
        input = utils.removePrefix(input, state);
        len = input.length;
        const extglobs = [];
        const braces = [];
        const stack = [];
        let prev = bos;
        let value;
        const eos = () => state.index === len - 1;
        const peek = state.peek = (n = 1) => input[state.index + n];
        const advance = state.advance = () => input[++state.index] || "";
        const remaining = () => input.slice(state.index + 1);
        const consume = (value2 = "", num = 0) => {
          state.consumed += value2;
          state.index += num;
        };
        const append = (token) => {
          state.output += token.output != null ? token.output : token.value;
          consume(token.value);
        };
        const negate = () => {
          let count = 1;
          while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
            advance();
            state.start++;
            count++;
          }
          if (count % 2 === 0) {
            return false;
          }
          state.negated = true;
          state.start++;
          return true;
        };
        const increment = (type2) => {
          state[type2]++;
          stack.push(type2);
        };
        const decrement = (type2) => {
          state[type2]--;
          stack.pop();
        };
        const push = (tok) => {
          if (prev.type === "globstar") {
            const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
            const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
            if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
              state.output = state.output.slice(0, -prev.output.length);
              prev.type = "star";
              prev.value = "*";
              prev.output = star;
              state.output += prev.output;
            }
          }
          if (extglobs.length && tok.type !== "paren") {
            extglobs[extglobs.length - 1].inner += tok.value;
          }
          if (tok.value || tok.output)
            append(tok);
          if (prev && prev.type === "text" && tok.type === "text") {
            prev.value += tok.value;
            prev.output = (prev.output || "") + tok.value;
            return;
          }
          tok.prev = prev;
          tokens.push(tok);
          prev = tok;
        };
        const extglobOpen = (type2, value2) => {
          const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
          token.prev = prev;
          token.parens = state.parens;
          token.output = state.output;
          const output = (opts.capture ? "(" : "") + token.open;
          increment("parens");
          push({ type: type2, value: value2, output: state.output ? "" : ONE_CHAR });
          push({ type: "paren", extglob: true, value: advance(), output });
          extglobs.push(token);
        };
        const extglobClose = (token) => {
          let output = token.close + (opts.capture ? ")" : "");
          let rest;
          if (token.type === "negate") {
            let extglobStar = star;
            if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
              extglobStar = globstar(opts);
            }
            if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
              output = token.close = `)$))${extglobStar}`;
            }
            if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
              const expression = parse(rest, { ...options, fastpaths: false }).output;
              output = token.close = `)${expression})${extglobStar})`;
            }
            if (token.prev.type === "bos") {
              state.negatedExtglob = true;
            }
          }
          push({ type: "paren", extglob: true, value, output });
          decrement("parens");
        };
        if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
          let backslashes = false;
          let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
            if (first === "\\") {
              backslashes = true;
              return m;
            }
            if (first === "?") {
              if (esc) {
                return esc + first + (rest ? QMARK.repeat(rest.length) : "");
              }
              if (index === 0) {
                return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
              }
              return QMARK.repeat(chars.length);
            }
            if (first === ".") {
              return DOT_LITERAL.repeat(chars.length);
            }
            if (first === "*") {
              if (esc) {
                return esc + first + (rest ? star : "");
              }
              return star;
            }
            return esc ? m : `\\${m}`;
          });
          if (backslashes === true) {
            if (opts.unescape === true) {
              output = output.replace(/\\/g, "");
            } else {
              output = output.replace(/\\+/g, (m) => {
                return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
              });
            }
          }
          if (output === input && opts.contains === true) {
            state.output = input;
            return state;
          }
          state.output = utils.wrapOutput(output, state, options);
          return state;
        }
        while (!eos()) {
          value = advance();
          if (value === "\0") {
            continue;
          }
          if (value === "\\") {
            const next = peek();
            if (next === "/" && opts.bash !== true) {
              continue;
            }
            if (next === "." || next === ";") {
              continue;
            }
            if (!next) {
              value += "\\";
              push({ type: "text", value });
              continue;
            }
            const match = /^\\+/.exec(remaining());
            let slashes = 0;
            if (match && match[0].length > 2) {
              slashes = match[0].length;
              state.index += slashes;
              if (slashes % 2 !== 0) {
                value += "\\";
              }
            }
            if (opts.unescape === true) {
              value = advance();
            } else {
              value += advance();
            }
            if (state.brackets === 0) {
              push({ type: "text", value });
              continue;
            }
          }
          if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
            if (opts.posix !== false && value === ":") {
              const inner = prev.value.slice(1);
              if (inner.includes("[")) {
                prev.posix = true;
                if (inner.includes(":")) {
                  const idx = prev.value.lastIndexOf("[");
                  const pre = prev.value.slice(0, idx);
                  const rest2 = prev.value.slice(idx + 2);
                  const posix = POSIX_REGEX_SOURCE[rest2];
                  if (posix) {
                    prev.value = pre + posix;
                    state.backtrack = true;
                    advance();
                    if (!bos.output && tokens.indexOf(prev) === 1) {
                      bos.output = ONE_CHAR;
                    }
                    continue;
                  }
                }
              }
            }
            if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
              value = `\\${value}`;
            }
            if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
              value = `\\${value}`;
            }
            if (opts.posix === true && value === "!" && prev.value === "[") {
              value = "^";
            }
            prev.value += value;
            append({ value });
            continue;
          }
          if (state.quotes === 1 && value !== '"') {
            value = utils.escapeRegex(value);
            prev.value += value;
            append({ value });
            continue;
          }
          if (value === '"') {
            state.quotes = state.quotes === 1 ? 0 : 1;
            if (opts.keepQuotes === true) {
              push({ type: "text", value });
            }
            continue;
          }
          if (value === "(") {
            increment("parens");
            push({ type: "paren", value });
            continue;
          }
          if (value === ")") {
            if (state.parens === 0 && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "("));
            }
            const extglob = extglobs[extglobs.length - 1];
            if (extglob && state.parens === extglob.parens + 1) {
              extglobClose(extglobs.pop());
              continue;
            }
            push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
            decrement("parens");
            continue;
          }
          if (value === "[") {
            if (opts.nobracket === true || !remaining().includes("]")) {
              if (opts.nobracket !== true && opts.strictBrackets === true) {
                throw new SyntaxError(syntaxError("closing", "]"));
              }
              value = `\\${value}`;
            } else {
              increment("brackets");
            }
            push({ type: "bracket", value });
            continue;
          }
          if (value === "]") {
            if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
              push({ type: "text", value, output: `\\${value}` });
              continue;
            }
            if (state.brackets === 0) {
              if (opts.strictBrackets === true) {
                throw new SyntaxError(syntaxError("opening", "["));
              }
              push({ type: "text", value, output: `\\${value}` });
              continue;
            }
            decrement("brackets");
            const prevValue = prev.value.slice(1);
            if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
              value = `/${value}`;
            }
            prev.value += value;
            append({ value });
            if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
              continue;
            }
            const escaped = utils.escapeRegex(prev.value);
            state.output = state.output.slice(0, -prev.value.length);
            if (opts.literalBrackets === true) {
              state.output += escaped;
              prev.value = escaped;
              continue;
            }
            prev.value = `(${capture}${escaped}|${prev.value})`;
            state.output += prev.value;
            continue;
          }
          if (value === "{" && opts.nobrace !== true) {
            increment("braces");
            const open = {
              type: "brace",
              value,
              output: "(",
              outputIndex: state.output.length,
              tokensIndex: state.tokens.length
            };
            braces.push(open);
            push(open);
            continue;
          }
          if (value === "}") {
            const brace = braces[braces.length - 1];
            if (opts.nobrace === true || !brace) {
              push({ type: "text", value, output: value });
              continue;
            }
            let output = ")";
            if (brace.dots === true) {
              const arr = tokens.slice();
              const range = [];
              for (let i = arr.length - 1; i >= 0; i--) {
                tokens.pop();
                if (arr[i].type === "brace") {
                  break;
                }
                if (arr[i].type !== "dots") {
                  range.unshift(arr[i].value);
                }
              }
              output = expandRange(range, opts);
              state.backtrack = true;
            }
            if (brace.comma !== true && brace.dots !== true) {
              const out = state.output.slice(0, brace.outputIndex);
              const toks = state.tokens.slice(brace.tokensIndex);
              brace.value = brace.output = "\\{";
              value = output = "\\}";
              state.output = out;
              for (const t2 of toks) {
                state.output += t2.output || t2.value;
              }
            }
            push({ type: "brace", value, output });
            decrement("braces");
            braces.pop();
            continue;
          }
          if (value === "|") {
            if (extglobs.length > 0) {
              extglobs[extglobs.length - 1].conditions++;
            }
            push({ type: "text", value });
            continue;
          }
          if (value === ",") {
            let output = value;
            const brace = braces[braces.length - 1];
            if (brace && stack[stack.length - 1] === "braces") {
              brace.comma = true;
              output = "|";
            }
            push({ type: "comma", value, output });
            continue;
          }
          if (value === "/") {
            if (prev.type === "dot" && state.index === state.start + 1) {
              state.start = state.index + 1;
              state.consumed = "";
              state.output = "";
              tokens.pop();
              prev = bos;
              continue;
            }
            push({ type: "slash", value, output: SLASH_LITERAL });
            continue;
          }
          if (value === ".") {
            if (state.braces > 0 && prev.type === "dot") {
              if (prev.value === ".")
                prev.output = DOT_LITERAL;
              const brace = braces[braces.length - 1];
              prev.type = "dots";
              prev.output += value;
              prev.value += value;
              brace.dots = true;
              continue;
            }
            if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
              push({ type: "text", value, output: DOT_LITERAL });
              continue;
            }
            push({ type: "dot", value, output: DOT_LITERAL });
            continue;
          }
          if (value === "?") {
            const isGroup = prev && prev.value === "(";
            if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
              extglobOpen("qmark", value);
              continue;
            }
            if (prev && prev.type === "paren") {
              const next = peek();
              let output = value;
              if (next === "<" && !utils.supportsLookbehinds()) {
                throw new Error("Node.js v10 or higher is required for regex lookbehinds");
              }
              if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
                output = `\\${value}`;
              }
              push({ type: "text", value, output });
              continue;
            }
            if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
              push({ type: "qmark", value, output: QMARK_NO_DOT });
              continue;
            }
            push({ type: "qmark", value, output: QMARK });
            continue;
          }
          if (value === "!") {
            if (opts.noextglob !== true && peek() === "(") {
              if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
                extglobOpen("negate", value);
                continue;
              }
            }
            if (opts.nonegate !== true && state.index === 0) {
              negate();
              continue;
            }
          }
          if (value === "+") {
            if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
              extglobOpen("plus", value);
              continue;
            }
            if (prev && prev.value === "(" || opts.regex === false) {
              push({ type: "plus", value, output: PLUS_LITERAL });
              continue;
            }
            if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
              push({ type: "plus", value });
              continue;
            }
            push({ type: "plus", value: PLUS_LITERAL });
            continue;
          }
          if (value === "@") {
            if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
              push({ type: "at", extglob: true, value, output: "" });
              continue;
            }
            push({ type: "text", value });
            continue;
          }
          if (value !== "*") {
            if (value === "$" || value === "^") {
              value = `\\${value}`;
            }
            const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
            if (match) {
              value += match[0];
              state.index += match[0].length;
            }
            push({ type: "text", value });
            continue;
          }
          if (prev && (prev.type === "globstar" || prev.star === true)) {
            prev.type = "star";
            prev.star = true;
            prev.value += value;
            prev.output = star;
            state.backtrack = true;
            state.globstar = true;
            consume(value);
            continue;
          }
          let rest = remaining();
          if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
            extglobOpen("star", value);
            continue;
          }
          if (prev.type === "star") {
            if (opts.noglobstar === true) {
              consume(value);
              continue;
            }
            const prior = prev.prev;
            const before = prior.prev;
            const isStart = prior.type === "slash" || prior.type === "bos";
            const afterStar = before && (before.type === "star" || before.type === "globstar");
            if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
              push({ type: "star", value, output: "" });
              continue;
            }
            const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
            const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
            if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
              push({ type: "star", value, output: "" });
              continue;
            }
            while (rest.slice(0, 3) === "/**") {
              const after = input[state.index + 4];
              if (after && after !== "/") {
                break;
              }
              rest = rest.slice(3);
              consume("/**", 3);
            }
            if (prior.type === "bos" && eos()) {
              prev.type = "globstar";
              prev.value += value;
              prev.output = globstar(opts);
              state.output = prev.output;
              state.globstar = true;
              consume(value);
              continue;
            }
            if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
              state.output = state.output.slice(0, -(prior.output + prev.output).length);
              prior.output = `(?:${prior.output}`;
              prev.type = "globstar";
              prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
              prev.value += value;
              state.globstar = true;
              state.output += prior.output + prev.output;
              consume(value);
              continue;
            }
            if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
              const end = rest[1] !== void 0 ? "|$" : "";
              state.output = state.output.slice(0, -(prior.output + prev.output).length);
              prior.output = `(?:${prior.output}`;
              prev.type = "globstar";
              prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
              prev.value += value;
              state.output += prior.output + prev.output;
              state.globstar = true;
              consume(value + advance());
              push({ type: "slash", value: "/", output: "" });
              continue;
            }
            if (prior.type === "bos" && rest[0] === "/") {
              prev.type = "globstar";
              prev.value += value;
              prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
              state.output = prev.output;
              state.globstar = true;
              consume(value + advance());
              push({ type: "slash", value: "/", output: "" });
              continue;
            }
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "globstar";
            prev.output = globstar(opts);
            prev.value += value;
            state.output += prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          const token = { type: "star", value, output: star };
          if (opts.bash === true) {
            token.output = ".*?";
            if (prev.type === "bos" || prev.type === "slash") {
              token.output = nodot + token.output;
            }
            push(token);
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
            token.output = value;
            push(token);
            continue;
          }
          if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
            if (prev.type === "dot") {
              state.output += NO_DOT_SLASH;
              prev.output += NO_DOT_SLASH;
            } else if (opts.dot === true) {
              state.output += NO_DOTS_SLASH;
              prev.output += NO_DOTS_SLASH;
            } else {
              state.output += nodot;
              prev.output += nodot;
            }
            if (peek() !== "*") {
              state.output += ONE_CHAR;
              prev.output += ONE_CHAR;
            }
          }
          push(token);
        }
        while (state.brackets > 0) {
          if (opts.strictBrackets === true)
            throw new SyntaxError(syntaxError("closing", "]"));
          state.output = utils.escapeLast(state.output, "[");
          decrement("brackets");
        }
        while (state.parens > 0) {
          if (opts.strictBrackets === true)
            throw new SyntaxError(syntaxError("closing", ")"));
          state.output = utils.escapeLast(state.output, "(");
          decrement("parens");
        }
        while (state.braces > 0) {
          if (opts.strictBrackets === true)
            throw new SyntaxError(syntaxError("closing", "}"));
          state.output = utils.escapeLast(state.output, "{");
          decrement("braces");
        }
        if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
          push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
        }
        if (state.backtrack === true) {
          state.output = "";
          for (const token of state.tokens) {
            state.output += token.output != null ? token.output : token.value;
            if (token.suffix) {
              state.output += token.suffix;
            }
          }
        }
        return state;
      };
      parse.fastpaths = (input, options) => {
        const opts = { ...options };
        const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
        const len = input.length;
        if (len > max) {
          throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
        }
        input = REPLACEMENTS[input] || input;
        const win32 = utils.isWindows(options);
        const {
          DOT_LITERAL,
          SLASH_LITERAL,
          ONE_CHAR,
          DOTS_SLASH,
          NO_DOT,
          NO_DOTS,
          NO_DOTS_SLASH,
          STAR,
          START_ANCHOR
        } = constants.globChars(win32);
        const nodot = opts.dot ? NO_DOTS : NO_DOT;
        const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
        const capture = opts.capture ? "" : "?:";
        const state = { negated: false, prefix: "" };
        let star = opts.bash === true ? ".*?" : STAR;
        if (opts.capture) {
          star = `(${star})`;
        }
        const globstar = (opts2) => {
          if (opts2.noglobstar === true)
            return star;
          return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
        };
        const create = (str2) => {
          switch (str2) {
            case "*":
              return `${nodot}${ONE_CHAR}${star}`;
            case ".*":
              return `${DOT_LITERAL}${ONE_CHAR}${star}`;
            case "*.*":
              return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
            case "*/*":
              return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
            case "**":
              return nodot + globstar(opts);
            case "**/*":
              return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
            case "**/*.*":
              return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
            case "**/.*":
              return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
            default: {
              const match = /^(.*?)\.(\w+)$/.exec(str2);
              if (!match)
                return;
              const source2 = create(match[1]);
              if (!source2)
                return;
              return source2 + DOT_LITERAL + match[2];
            }
          }
        };
        const output = utils.removePrefix(input, state);
        let source = create(output);
        if (source && opts.strictSlashes !== true) {
          source += `${SLASH_LITERAL}?`;
        }
        return source;
      };
      module.exports = parse;
    }
  });

  // ../../../.yarn/cache/picomatch-npm-2.3.1-c782cfd986-26c02b8d06.zip/node_modules/picomatch/lib/picomatch.js
  var require_picomatch = __commonJS({
    "../../../.yarn/cache/picomatch-npm-2.3.1-c782cfd986-26c02b8d06.zip/node_modules/picomatch/lib/picomatch.js"(exports, module) {
      "use strict";
      var path3 = __require("path");
      var scan = require_scan();
      var parse = require_parse2();
      var utils = require_utils2();
      var constants = require_constants2();
      var isObject3 = (val) => val && typeof val === "object" && !Array.isArray(val);
      var picomatch = (glob, options, returnState = false) => {
        if (Array.isArray(glob)) {
          const fns = glob.map((input) => picomatch(input, options, returnState));
          const arrayMatcher = (str2) => {
            for (const isMatch of fns) {
              const state2 = isMatch(str2);
              if (state2)
                return state2;
            }
            return false;
          };
          return arrayMatcher;
        }
        const isState = isObject3(glob) && glob.tokens && glob.input;
        if (glob === "" || typeof glob !== "string" && !isState) {
          throw new TypeError("Expected pattern to be a non-empty string");
        }
        const opts = options || {};
        const posix = utils.isWindows(options);
        const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
        const state = regex.state;
        delete regex.state;
        let isIgnored = () => false;
        if (opts.ignore) {
          const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
          isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
        }
        const matcher = (input, returnObject = false) => {
          const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
          const result = { glob, state, regex, posix, input, output, match, isMatch };
          if (typeof opts.onResult === "function") {
            opts.onResult(result);
          }
          if (isMatch === false) {
            result.isMatch = false;
            return returnObject ? result : false;
          }
          if (isIgnored(input)) {
            if (typeof opts.onIgnore === "function") {
              opts.onIgnore(result);
            }
            result.isMatch = false;
            return returnObject ? result : false;
          }
          if (typeof opts.onMatch === "function") {
            opts.onMatch(result);
          }
          return returnObject ? result : true;
        };
        if (returnState) {
          matcher.state = state;
        }
        return matcher;
      };
      picomatch.test = (input, regex, options, { glob, posix } = {}) => {
        if (typeof input !== "string") {
          throw new TypeError("Expected input to be a string");
        }
        if (input === "") {
          return { isMatch: false, output: "" };
        }
        const opts = options || {};
        const format = opts.format || (posix ? utils.toPosixSlashes : null);
        let match = input === glob;
        let output = match && format ? format(input) : input;
        if (match === false) {
          output = format ? format(input) : input;
          match = output === glob;
        }
        if (match === false || opts.capture === true) {
          if (opts.matchBase === true || opts.basename === true) {
            match = picomatch.matchBase(input, regex, options, posix);
          } else {
            match = regex.exec(output);
          }
        }
        return { isMatch: Boolean(match), match, output };
      };
      picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
        const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
        return regex.test(path3.basename(input));
      };
      picomatch.isMatch = (str2, patterns, options) => picomatch(patterns, options)(str2);
      picomatch.parse = (pattern, options) => {
        if (Array.isArray(pattern))
          return pattern.map((p) => picomatch.parse(p, options));
        return parse(pattern, { ...options, fastpaths: false });
      };
      picomatch.scan = (input, options) => scan(input, options);
      picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
        if (returnOutput === true) {
          return state.output;
        }
        const opts = options || {};
        const prepend = opts.contains ? "" : "^";
        const append = opts.contains ? "" : "$";
        let source = `${prepend}(?:${state.output})${append}`;
        if (state && state.negated === true) {
          source = `^(?!${source}).*$`;
        }
        const regex = picomatch.toRegex(source, options);
        if (returnState === true) {
          regex.state = state;
        }
        return regex;
      };
      picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
        if (!input || typeof input !== "string") {
          throw new TypeError("Expected a non-empty string");
        }
        let parsed = { negated: false, fastpaths: true };
        if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
          parsed.output = parse.fastpaths(input, options);
        }
        if (!parsed.output) {
          parsed = parse(input, options);
        }
        return picomatch.compileRe(parsed, options, returnOutput, returnState);
      };
      picomatch.toRegex = (source, options) => {
        try {
          const opts = options || {};
          return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
        } catch (err) {
          if (options && options.debug === true)
            throw err;
          return /$^/;
        }
      };
      picomatch.constants = constants;
      module.exports = picomatch;
    }
  });

  // ../../../.yarn/cache/picomatch-npm-2.3.1-c782cfd986-26c02b8d06.zip/node_modules/picomatch/index.js
  var require_picomatch2 = __commonJS({
    "../../../.yarn/cache/picomatch-npm-2.3.1-c782cfd986-26c02b8d06.zip/node_modules/picomatch/index.js"(exports, module) {
      "use strict";
      module.exports = require_picomatch();
    }
  });

  // ../../../.yarn/cache/micromatch-npm-4.0.5-cfab5d7669-3d6505b20f.zip/node_modules/micromatch/index.js
  var require_micromatch = __commonJS({
    "../../../.yarn/cache/micromatch-npm-4.0.5-cfab5d7669-3d6505b20f.zip/node_modules/micromatch/index.js"(exports, module) {
      "use strict";
      var util = __require("util");
      var braces = require_braces();
      var picomatch = require_picomatch2();
      var utils = require_utils2();
      var isEmptyString = (val) => val === "" || val === "./";
      var micromatch = (list, patterns, options) => {
        patterns = [].concat(patterns);
        list = [].concat(list);
        let omit = /* @__PURE__ */ new Set();
        let keep = /* @__PURE__ */ new Set();
        let items = /* @__PURE__ */ new Set();
        let negatives = 0;
        let onResult = (state) => {
          items.add(state.output);
          if (options && options.onResult) {
            options.onResult(state);
          }
        };
        for (let i = 0; i < patterns.length; i++) {
          let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, true);
          let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
          if (negated)
            negatives++;
          for (let item of list) {
            let matched = isMatch(item, true);
            let match = negated ? !matched.isMatch : matched.isMatch;
            if (!match)
              continue;
            if (negated) {
              omit.add(matched.output);
            } else {
              omit.delete(matched.output);
              keep.add(matched.output);
            }
          }
        }
        let result = negatives === patterns.length ? [...items] : [...keep];
        let matches = result.filter((item) => !omit.has(item));
        if (options && matches.length === 0) {
          if (options.failglob === true) {
            throw new Error(`No matches found for "${patterns.join(", ")}"`);
          }
          if (options.nonull === true || options.nullglob === true) {
            return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
          }
        }
        return matches;
      };
      micromatch.match = micromatch;
      micromatch.matcher = (pattern, options) => picomatch(pattern, options);
      micromatch.isMatch = (str2, patterns, options) => picomatch(patterns, options)(str2);
      micromatch.any = micromatch.isMatch;
      micromatch.not = (list, patterns, options = {}) => {
        patterns = [].concat(patterns).map(String);
        let result = /* @__PURE__ */ new Set();
        let items = [];
        let onResult = (state) => {
          if (options.onResult)
            options.onResult(state);
          items.push(state.output);
        };
        let matches = new Set(micromatch(list, patterns, { ...options, onResult }));
        for (let item of items) {
          if (!matches.has(item)) {
            result.add(item);
          }
        }
        return [...result];
      };
      micromatch.contains = (str2, pattern, options) => {
        if (typeof str2 !== "string") {
          throw new TypeError(`Expected a string: "${util.inspect(str2)}"`);
        }
        if (Array.isArray(pattern)) {
          return pattern.some((p) => micromatch.contains(str2, p, options));
        }
        if (typeof pattern === "string") {
          if (isEmptyString(str2) || isEmptyString(pattern)) {
            return false;
          }
          if (str2.includes(pattern) || str2.startsWith("./") && str2.slice(2).includes(pattern)) {
            return true;
          }
        }
        return micromatch.isMatch(str2, pattern, { ...options, contains: true });
      };
      micromatch.matchKeys = (obj, patterns, options) => {
        if (!utils.isObject(obj)) {
          throw new TypeError("Expected the first argument to be an object");
        }
        let keys = micromatch(Object.keys(obj), patterns, options);
        let res = {};
        for (let key of keys)
          res[key] = obj[key];
        return res;
      };
      micromatch.some = (list, patterns, options) => {
        let items = [].concat(list);
        for (let pattern of [].concat(patterns)) {
          let isMatch = picomatch(String(pattern), options);
          if (items.some((item) => isMatch(item))) {
            return true;
          }
        }
        return false;
      };
      micromatch.every = (list, patterns, options) => {
        let items = [].concat(list);
        for (let pattern of [].concat(patterns)) {
          let isMatch = picomatch(String(pattern), options);
          if (!items.every((item) => isMatch(item))) {
            return false;
          }
        }
        return true;
      };
      micromatch.all = (str2, patterns, options) => {
        if (typeof str2 !== "string") {
          throw new TypeError(`Expected a string: "${util.inspect(str2)}"`);
        }
        return [].concat(patterns).every((p) => picomatch(p, options)(str2));
      };
      micromatch.capture = (glob, input, options) => {
        let posix = utils.isWindows(options);
        let regex = picomatch.makeRe(String(glob), { ...options, capture: true });
        let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);
        if (match) {
          return match.slice(1).map((v) => v === void 0 ? "" : v);
        }
      };
      micromatch.makeRe = (...args) => picomatch.makeRe(...args);
      micromatch.scan = (...args) => picomatch.scan(...args);
      micromatch.parse = (patterns, options) => {
        let res = [];
        for (let pattern of [].concat(patterns || [])) {
          for (let str2 of braces(String(pattern), options)) {
            res.push(picomatch.parse(str2, options));
          }
        }
        return res;
      };
      micromatch.braces = (pattern, options) => {
        if (typeof pattern !== "string")
          throw new TypeError("Expected a string");
        if (options && options.nobrace === true || !/\{.*\}/.test(pattern)) {
          return [pattern];
        }
        return braces(pattern, options);
      };
      micromatch.braceExpand = (pattern, options) => {
        if (typeof pattern !== "string")
          throw new TypeError("Expected a string");
        return micromatch.braces(pattern, { ...options, expand: true });
      };
      module.exports = micromatch;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/pattern.js
  var require_pattern = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/pattern.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.removeDuplicateSlashes = exports.matchAny = exports.convertPatternsToRe = exports.makeRe = exports.getPatternParts = exports.expandBraceExpansion = exports.expandPatternsWithBraceExpansion = exports.isAffectDepthOfReadingPattern = exports.endsWithSlashGlobStar = exports.hasGlobStar = exports.getBaseDirectory = exports.isPatternRelatedToParentDirectory = exports.getPatternsOutsideCurrentDirectory = exports.getPatternsInsideCurrentDirectory = exports.getPositivePatterns = exports.getNegativePatterns = exports.isPositivePattern = exports.isNegativePattern = exports.convertToNegativePattern = exports.convertToPositivePattern = exports.isDynamicPattern = exports.isStaticPattern = void 0;
      var path3 = __require("path");
      var globParent = require_glob_parent();
      var micromatch = require_micromatch();
      var GLOBSTAR = "**";
      var ESCAPE_SYMBOL = "\\";
      var COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/;
      var REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/;
      var REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/;
      var GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/;
      var BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./;
      var DOUBLE_SLASH_RE = /(?!^)\/{2,}/g;
      function isStaticPattern(pattern, options = {}) {
        return !isDynamicPattern2(pattern, options);
      }
      exports.isStaticPattern = isStaticPattern;
      function isDynamicPattern2(pattern, options = {}) {
        if (pattern === "") {
          return false;
        }
        if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
          return true;
        }
        if (COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern)) {
          return true;
        }
        if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
          return true;
        }
        if (options.braceExpansion !== false && hasBraceExpansion(pattern)) {
          return true;
        }
        return false;
      }
      exports.isDynamicPattern = isDynamicPattern2;
      function hasBraceExpansion(pattern) {
        const openingBraceIndex = pattern.indexOf("{");
        if (openingBraceIndex === -1) {
          return false;
        }
        const closingBraceIndex = pattern.indexOf("}", openingBraceIndex + 1);
        if (closingBraceIndex === -1) {
          return false;
        }
        const braceContent = pattern.slice(openingBraceIndex, closingBraceIndex);
        return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent);
      }
      function convertToPositivePattern(pattern) {
        return isNegativePattern2(pattern) ? pattern.slice(1) : pattern;
      }
      exports.convertToPositivePattern = convertToPositivePattern;
      function convertToNegativePattern(pattern) {
        return "!" + pattern;
      }
      exports.convertToNegativePattern = convertToNegativePattern;
      function isNegativePattern2(pattern) {
        return pattern.startsWith("!") && pattern[1] !== "(";
      }
      exports.isNegativePattern = isNegativePattern2;
      function isPositivePattern(pattern) {
        return !isNegativePattern2(pattern);
      }
      exports.isPositivePattern = isPositivePattern;
      function getNegativePatterns(patterns) {
        return patterns.filter(isNegativePattern2);
      }
      exports.getNegativePatterns = getNegativePatterns;
      function getPositivePatterns(patterns) {
        return patterns.filter(isPositivePattern);
      }
      exports.getPositivePatterns = getPositivePatterns;
      function getPatternsInsideCurrentDirectory(patterns) {
        return patterns.filter((pattern) => !isPatternRelatedToParentDirectory(pattern));
      }
      exports.getPatternsInsideCurrentDirectory = getPatternsInsideCurrentDirectory;
      function getPatternsOutsideCurrentDirectory(patterns) {
        return patterns.filter(isPatternRelatedToParentDirectory);
      }
      exports.getPatternsOutsideCurrentDirectory = getPatternsOutsideCurrentDirectory;
      function isPatternRelatedToParentDirectory(pattern) {
        return pattern.startsWith("..") || pattern.startsWith("./..");
      }
      exports.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory;
      function getBaseDirectory(pattern) {
        return globParent(pattern, { flipBackslashes: false });
      }
      exports.getBaseDirectory = getBaseDirectory;
      function hasGlobStar(pattern) {
        return pattern.includes(GLOBSTAR);
      }
      exports.hasGlobStar = hasGlobStar;
      function endsWithSlashGlobStar(pattern) {
        return pattern.endsWith("/" + GLOBSTAR);
      }
      exports.endsWithSlashGlobStar = endsWithSlashGlobStar;
      function isAffectDepthOfReadingPattern(pattern) {
        const basename = path3.basename(pattern);
        return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
      }
      exports.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
      function expandPatternsWithBraceExpansion(patterns) {
        return patterns.reduce((collection, pattern) => {
          return collection.concat(expandBraceExpansion(pattern));
        }, []);
      }
      exports.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
      function expandBraceExpansion(pattern) {
        const patterns = micromatch.braces(pattern, { expand: true, nodupes: true, keepEscaping: true });
        patterns.sort((a, b) => a.length - b.length);
        return patterns.filter((pattern2) => pattern2 !== "");
      }
      exports.expandBraceExpansion = expandBraceExpansion;
      function getPatternParts(pattern, options) {
        let { parts } = micromatch.scan(pattern, Object.assign(Object.assign({}, options), { parts: true }));
        if (parts.length === 0) {
          parts = [pattern];
        }
        if (parts[0].startsWith("/")) {
          parts[0] = parts[0].slice(1);
          parts.unshift("");
        }
        return parts;
      }
      exports.getPatternParts = getPatternParts;
      function makeRe(pattern, options) {
        return micromatch.makeRe(pattern, options);
      }
      exports.makeRe = makeRe;
      function convertPatternsToRe(patterns, options) {
        return patterns.map((pattern) => makeRe(pattern, options));
      }
      exports.convertPatternsToRe = convertPatternsToRe;
      function matchAny(entry, patternsRe) {
        return patternsRe.some((patternRe) => patternRe.test(entry));
      }
      exports.matchAny = matchAny;
      function removeDuplicateSlashes(pattern) {
        return pattern.replace(DOUBLE_SLASH_RE, "/");
      }
      exports.removeDuplicateSlashes = removeDuplicateSlashes;
    }
  });

  // ../../../.yarn/cache/merge2-npm-1.4.1-a2507bd06c-254a8a4605.zip/node_modules/merge2/index.js
  var require_merge2 = __commonJS({
    "../../../.yarn/cache/merge2-npm-1.4.1-a2507bd06c-254a8a4605.zip/node_modules/merge2/index.js"(exports, module) {
      "use strict";
      var Stream = __require("stream");
      var PassThrough = Stream.PassThrough;
      var slice = Array.prototype.slice;
      module.exports = merge2;
      function merge2() {
        const streamsQueue = [];
        const args = slice.call(arguments);
        let merging = false;
        let options = args[args.length - 1];
        if (options && !Array.isArray(options) && options.pipe == null) {
          args.pop();
        } else {
          options = {};
        }
        const doEnd = options.end !== false;
        const doPipeError = options.pipeError === true;
        if (options.objectMode == null) {
          options.objectMode = true;
        }
        if (options.highWaterMark == null) {
          options.highWaterMark = 64 * 1024;
        }
        const mergedStream = PassThrough(options);
        function addStream() {
          for (let i = 0, len = arguments.length; i < len; i++) {
            streamsQueue.push(pauseStreams(arguments[i], options));
          }
          mergeStream();
          return this;
        }
        function mergeStream() {
          if (merging) {
            return;
          }
          merging = true;
          let streams = streamsQueue.shift();
          if (!streams) {
            process.nextTick(endStream);
            return;
          }
          if (!Array.isArray(streams)) {
            streams = [streams];
          }
          let pipesCount = streams.length + 1;
          function next() {
            if (--pipesCount > 0) {
              return;
            }
            merging = false;
            mergeStream();
          }
          function pipe(stream) {
            function onend() {
              stream.removeListener("merge2UnpipeEnd", onend);
              stream.removeListener("end", onend);
              if (doPipeError) {
                stream.removeListener("error", onerror);
              }
              next();
            }
            function onerror(err) {
              mergedStream.emit("error", err);
            }
            if (stream._readableState.endEmitted) {
              return next();
            }
            stream.on("merge2UnpipeEnd", onend);
            stream.on("end", onend);
            if (doPipeError) {
              stream.on("error", onerror);
            }
            stream.pipe(mergedStream, { end: false });
            stream.resume();
          }
          for (let i = 0; i < streams.length; i++) {
            pipe(streams[i]);
          }
          next();
        }
        function endStream() {
          merging = false;
          mergedStream.emit("queueDrain");
          if (doEnd) {
            mergedStream.end();
          }
        }
        mergedStream.setMaxListeners(0);
        mergedStream.add = addStream;
        mergedStream.on("unpipe", function(stream) {
          stream.emit("merge2UnpipeEnd");
        });
        if (args.length) {
          addStream.apply(null, args);
        }
        return mergedStream;
      }
      function pauseStreams(streams, options) {
        if (!Array.isArray(streams)) {
          if (!streams._readableState && streams.pipe) {
            streams = streams.pipe(PassThrough(options));
          }
          if (!streams._readableState || !streams.pause || !streams.pipe) {
            throw new Error("Only readable stream can be merged.");
          }
          streams.pause();
        } else {
          for (let i = 0, len = streams.length; i < len; i++) {
            streams[i] = pauseStreams(streams[i], options);
          }
        }
        return streams;
      }
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/stream.js
  var require_stream = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/stream.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.merge = void 0;
      var merge2 = require_merge2();
      function merge3(streams) {
        const mergedStream = merge2(streams);
        streams.forEach((stream) => {
          stream.once("error", (error) => mergedStream.emit("error", error));
        });
        mergedStream.once("close", () => propagateCloseEventToSources(streams));
        mergedStream.once("end", () => propagateCloseEventToSources(streams));
        return mergedStream;
      }
      exports.merge = merge3;
      function propagateCloseEventToSources(streams) {
        streams.forEach((stream) => stream.emit("close"));
      }
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/string.js
  var require_string = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/string.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isEmpty = exports.isString = void 0;
      function isString2(input) {
        return typeof input === "string";
      }
      exports.isString = isString2;
      function isEmpty(input) {
        return input === "";
      }
      exports.isEmpty = isEmpty;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/index.js
  var require_utils3 = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/utils/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.string = exports.stream = exports.pattern = exports.path = exports.fs = exports.errno = exports.array = void 0;
      var array = require_array();
      exports.array = array;
      var errno = require_errno();
      exports.errno = errno;
      var fs4 = require_fs();
      exports.fs = fs4;
      var path3 = require_path();
      exports.path = path3;
      var pattern = require_pattern();
      exports.pattern = pattern;
      var stream = require_stream();
      exports.stream = stream;
      var string = require_string();
      exports.string = string;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/managers/tasks.js
  var require_tasks = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/managers/tasks.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.convertPatternGroupToTask = exports.convertPatternGroupsToTasks = exports.groupPatternsByBaseDirectory = exports.getNegativePatternsAsPositive = exports.getPositivePatterns = exports.convertPatternsToTasks = exports.generate = void 0;
      var utils = require_utils3();
      function generate(input, settings) {
        const patterns = processPatterns(input, settings);
        const ignore2 = processPatterns(settings.ignore, settings);
        const positivePatterns = getPositivePatterns(patterns);
        const negativePatterns = getNegativePatternsAsPositive(patterns, ignore2);
        const staticPatterns = positivePatterns.filter((pattern) => utils.pattern.isStaticPattern(pattern, settings));
        const dynamicPatterns = positivePatterns.filter((pattern) => utils.pattern.isDynamicPattern(pattern, settings));
        const staticTasks = convertPatternsToTasks(
          staticPatterns,
          negativePatterns,
          /* dynamic */
          false
        );
        const dynamicTasks = convertPatternsToTasks(
          dynamicPatterns,
          negativePatterns,
          /* dynamic */
          true
        );
        return staticTasks.concat(dynamicTasks);
      }
      exports.generate = generate;
      function processPatterns(input, settings) {
        let patterns = input;
        if (settings.braceExpansion) {
          patterns = utils.pattern.expandPatternsWithBraceExpansion(patterns);
        }
        if (settings.baseNameMatch) {
          patterns = patterns.map((pattern) => pattern.includes("/") ? pattern : `**/${pattern}`);
        }
        return patterns.map((pattern) => utils.pattern.removeDuplicateSlashes(pattern));
      }
      function convertPatternsToTasks(positive, negative, dynamic) {
        const tasks = [];
        const patternsOutsideCurrentDirectory = utils.pattern.getPatternsOutsideCurrentDirectory(positive);
        const patternsInsideCurrentDirectory = utils.pattern.getPatternsInsideCurrentDirectory(positive);
        const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsOutsideCurrentDirectory);
        const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsInsideCurrentDirectory);
        tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic));
        if ("." in insideCurrentDirectoryGroup) {
          tasks.push(convertPatternGroupToTask(".", patternsInsideCurrentDirectory, negative, dynamic));
        } else {
          tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic));
        }
        return tasks;
      }
      exports.convertPatternsToTasks = convertPatternsToTasks;
      function getPositivePatterns(patterns) {
        return utils.pattern.getPositivePatterns(patterns);
      }
      exports.getPositivePatterns = getPositivePatterns;
      function getNegativePatternsAsPositive(patterns, ignore2) {
        const negative = utils.pattern.getNegativePatterns(patterns).concat(ignore2);
        const positive = negative.map(utils.pattern.convertToPositivePattern);
        return positive;
      }
      exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
      function groupPatternsByBaseDirectory(patterns) {
        const group = {};
        return patterns.reduce((collection, pattern) => {
          const base = utils.pattern.getBaseDirectory(pattern);
          if (base in collection) {
            collection[base].push(pattern);
          } else {
            collection[base] = [pattern];
          }
          return collection;
        }, group);
      }
      exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
      function convertPatternGroupsToTasks(positive, negative, dynamic) {
        return Object.keys(positive).map((base) => {
          return convertPatternGroupToTask(base, positive[base], negative, dynamic);
        });
      }
      exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
      function convertPatternGroupToTask(base, positive, negative, dynamic) {
        return {
          dynamic,
          positive,
          negative,
          base,
          patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern))
        };
      }
      exports.convertPatternGroupToTask = convertPatternGroupToTask;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.stat-npm-2.0.5-01f4dd3030-88dafe5e3e.zip/node_modules/@nodelib/fs.stat/out/providers/async.js
  var require_async = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.stat-npm-2.0.5-01f4dd3030-88dafe5e3e.zip/node_modules/@nodelib/fs.stat/out/providers/async.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.read = void 0;
      function read(path3, settings, callback) {
        settings.fs.lstat(path3, (lstatError, lstat) => {
          if (lstatError !== null) {
            callFailureCallback(callback, lstatError);
            return;
          }
          if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
            callSuccessCallback(callback, lstat);
            return;
          }
          settings.fs.stat(path3, (statError, stat) => {
            if (statError !== null) {
              if (settings.throwErrorOnBrokenSymbolicLink) {
                callFailureCallback(callback, statError);
                return;
              }
              callSuccessCallback(callback, lstat);
              return;
            }
            if (settings.markSymbolicLink) {
              stat.isSymbolicLink = () => true;
            }
            callSuccessCallback(callback, stat);
          });
        });
      }
      exports.read = read;
      function callFailureCallback(callback, error) {
        callback(error);
      }
      function callSuccessCallback(callback, result) {
        callback(null, result);
      }
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.stat-npm-2.0.5-01f4dd3030-88dafe5e3e.zip/node_modules/@nodelib/fs.stat/out/providers/sync.js
  var require_sync = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.stat-npm-2.0.5-01f4dd3030-88dafe5e3e.zip/node_modules/@nodelib/fs.stat/out/providers/sync.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.read = void 0;
      function read(path3, settings) {
        const lstat = settings.fs.lstatSync(path3);
        if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
          return lstat;
        }
        try {
          const stat = settings.fs.statSync(path3);
          if (settings.markSymbolicLink) {
            stat.isSymbolicLink = () => true;
          }
          return stat;
        } catch (error) {
          if (!settings.throwErrorOnBrokenSymbolicLink) {
            return lstat;
          }
          throw error;
        }
      }
      exports.read = read;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.stat-npm-2.0.5-01f4dd3030-88dafe5e3e.zip/node_modules/@nodelib/fs.stat/out/adapters/fs.js
  var require_fs2 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.stat-npm-2.0.5-01f4dd3030-88dafe5e3e.zip/node_modules/@nodelib/fs.stat/out/adapters/fs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
      var fs4 = __require("fs");
      exports.FILE_SYSTEM_ADAPTER = {
        lstat: fs4.lstat,
        stat: fs4.stat,
        lstatSync: fs4.lstatSync,
        statSync: fs4.statSync
      };
      function createFileSystemAdapter(fsMethods) {
        if (fsMethods === void 0) {
          return exports.FILE_SYSTEM_ADAPTER;
        }
        return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
      }
      exports.createFileSystemAdapter = createFileSystemAdapter;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.stat-npm-2.0.5-01f4dd3030-88dafe5e3e.zip/node_modules/@nodelib/fs.stat/out/settings.js
  var require_settings = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.stat-npm-2.0.5-01f4dd3030-88dafe5e3e.zip/node_modules/@nodelib/fs.stat/out/settings.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var fs4 = require_fs2();
      var Settings = class {
        constructor(_options = {}) {
          this._options = _options;
          this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true);
          this.fs = fs4.createFileSystemAdapter(this._options.fs);
          this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false);
          this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
        }
        _getValue(option, value) {
          return option !== null && option !== void 0 ? option : value;
        }
      };
      exports.default = Settings;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.stat-npm-2.0.5-01f4dd3030-88dafe5e3e.zip/node_modules/@nodelib/fs.stat/out/index.js
  var require_out = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.stat-npm-2.0.5-01f4dd3030-88dafe5e3e.zip/node_modules/@nodelib/fs.stat/out/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.statSync = exports.stat = exports.Settings = void 0;
      var async = require_async();
      var sync = require_sync();
      var settings_1 = require_settings();
      exports.Settings = settings_1.default;
      function stat(path3, optionsOrSettingsOrCallback, callback) {
        if (typeof optionsOrSettingsOrCallback === "function") {
          async.read(path3, getSettings(), optionsOrSettingsOrCallback);
          return;
        }
        async.read(path3, getSettings(optionsOrSettingsOrCallback), callback);
      }
      exports.stat = stat;
      function statSync(path3, optionsOrSettings) {
        const settings = getSettings(optionsOrSettings);
        return sync.read(path3, settings);
      }
      exports.statSync = statSync;
      function getSettings(settingsOrOptions = {}) {
        if (settingsOrOptions instanceof settings_1.default) {
          return settingsOrOptions;
        }
        return new settings_1.default(settingsOrOptions);
      }
    }
  });

  // ../../../.yarn/cache/queue-microtask-npm-1.2.3-fcc98e4e2d-900a93d3cd.zip/node_modules/queue-microtask/index.js
  var require_queue_microtask = __commonJS({
    "../../../.yarn/cache/queue-microtask-npm-1.2.3-fcc98e4e2d-900a93d3cd.zip/node_modules/queue-microtask/index.js"(exports, module) {
      var promise;
      module.exports = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : global) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
        throw err;
      }, 0));
    }
  });

  // ../../../.yarn/cache/run-parallel-npm-1.2.0-3f47ff2034-200b5ab25b.zip/node_modules/run-parallel/index.js
  var require_run_parallel = __commonJS({
    "../../../.yarn/cache/run-parallel-npm-1.2.0-3f47ff2034-200b5ab25b.zip/node_modules/run-parallel/index.js"(exports, module) {
      module.exports = runParallel;
      var queueMicrotask2 = require_queue_microtask();
      function runParallel(tasks, cb) {
        let results, pending, keys;
        let isSync = true;
        if (Array.isArray(tasks)) {
          results = [];
          pending = tasks.length;
        } else {
          keys = Object.keys(tasks);
          results = {};
          pending = keys.length;
        }
        function done(err) {
          function end() {
            if (cb)
              cb(err, results);
            cb = null;
          }
          if (isSync)
            queueMicrotask2(end);
          else
            end();
        }
        function each(i, err, result) {
          results[i] = result;
          if (--pending === 0 || err) {
            done(err);
          }
        }
        if (!pending) {
          done(null);
        } else if (keys) {
          keys.forEach(function(key) {
            tasks[key](function(err, result) {
              each(key, err, result);
            });
          });
        } else {
          tasks.forEach(function(task, i) {
            task(function(err, result) {
              each(i, err, result);
            });
          });
        }
        isSync = false;
      }
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/constants.js
  var require_constants3 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/constants.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0;
      var NODE_PROCESS_VERSION_PARTS = process.versions.node.split(".");
      if (NODE_PROCESS_VERSION_PARTS[0] === void 0 || NODE_PROCESS_VERSION_PARTS[1] === void 0) {
        throw new Error(`Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`);
      }
      var MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
      var MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);
      var SUPPORTED_MAJOR_VERSION = 10;
      var SUPPORTED_MINOR_VERSION = 10;
      var IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION;
      var IS_MATCHED_BY_MAJOR_AND_MINOR = MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION;
      exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/utils/fs.js
  var require_fs3 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/utils/fs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createDirentFromStats = void 0;
      var DirentFromStats = class {
        constructor(name, stats) {
          this.name = name;
          this.isBlockDevice = stats.isBlockDevice.bind(stats);
          this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
          this.isDirectory = stats.isDirectory.bind(stats);
          this.isFIFO = stats.isFIFO.bind(stats);
          this.isFile = stats.isFile.bind(stats);
          this.isSocket = stats.isSocket.bind(stats);
          this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
        }
      };
      function createDirentFromStats(name, stats) {
        return new DirentFromStats(name, stats);
      }
      exports.createDirentFromStats = createDirentFromStats;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/utils/index.js
  var require_utils4 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/utils/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fs = void 0;
      var fs4 = require_fs3();
      exports.fs = fs4;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/providers/common.js
  var require_common = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/providers/common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.joinPathSegments = void 0;
      function joinPathSegments(a, b, separator) {
        if (a.endsWith(separator)) {
          return a + b;
        }
        return a + separator + b;
      }
      exports.joinPathSegments = joinPathSegments;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/providers/async.js
  var require_async2 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/providers/async.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.readdir = exports.readdirWithFileTypes = exports.read = void 0;
      var fsStat = require_out();
      var rpl = require_run_parallel();
      var constants_1 = require_constants3();
      var utils = require_utils4();
      var common2 = require_common();
      function read(directory, settings, callback) {
        if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
          readdirWithFileTypes(directory, settings, callback);
          return;
        }
        readdir(directory, settings, callback);
      }
      exports.read = read;
      function readdirWithFileTypes(directory, settings, callback) {
        settings.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
          if (readdirError !== null) {
            callFailureCallback(callback, readdirError);
            return;
          }
          const entries = dirents.map((dirent) => ({
            dirent,
            name: dirent.name,
            path: common2.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
          }));
          if (!settings.followSymbolicLinks) {
            callSuccessCallback(callback, entries);
            return;
          }
          const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings));
          rpl(tasks, (rplError, rplEntries) => {
            if (rplError !== null) {
              callFailureCallback(callback, rplError);
              return;
            }
            callSuccessCallback(callback, rplEntries);
          });
        });
      }
      exports.readdirWithFileTypes = readdirWithFileTypes;
      function makeRplTaskEntry(entry, settings) {
        return (done) => {
          if (!entry.dirent.isSymbolicLink()) {
            done(null, entry);
            return;
          }
          settings.fs.stat(entry.path, (statError, stats) => {
            if (statError !== null) {
              if (settings.throwErrorOnBrokenSymbolicLink) {
                done(statError);
                return;
              }
              done(null, entry);
              return;
            }
            entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
            done(null, entry);
          });
        };
      }
      function readdir(directory, settings, callback) {
        settings.fs.readdir(directory, (readdirError, names) => {
          if (readdirError !== null) {
            callFailureCallback(callback, readdirError);
            return;
          }
          const tasks = names.map((name) => {
            const path3 = common2.joinPathSegments(directory, name, settings.pathSegmentSeparator);
            return (done) => {
              fsStat.stat(path3, settings.fsStatSettings, (error, stats) => {
                if (error !== null) {
                  done(error);
                  return;
                }
                const entry = {
                  name,
                  path: path3,
                  dirent: utils.fs.createDirentFromStats(name, stats)
                };
                if (settings.stats) {
                  entry.stats = stats;
                }
                done(null, entry);
              });
            };
          });
          rpl(tasks, (rplError, entries) => {
            if (rplError !== null) {
              callFailureCallback(callback, rplError);
              return;
            }
            callSuccessCallback(callback, entries);
          });
        });
      }
      exports.readdir = readdir;
      function callFailureCallback(callback, error) {
        callback(error);
      }
      function callSuccessCallback(callback, result) {
        callback(null, result);
      }
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/providers/sync.js
  var require_sync2 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/providers/sync.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.readdir = exports.readdirWithFileTypes = exports.read = void 0;
      var fsStat = require_out();
      var constants_1 = require_constants3();
      var utils = require_utils4();
      var common2 = require_common();
      function read(directory, settings) {
        if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
          return readdirWithFileTypes(directory, settings);
        }
        return readdir(directory, settings);
      }
      exports.read = read;
      function readdirWithFileTypes(directory, settings) {
        const dirents = settings.fs.readdirSync(directory, { withFileTypes: true });
        return dirents.map((dirent) => {
          const entry = {
            dirent,
            name: dirent.name,
            path: common2.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
          };
          if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
            try {
              const stats = settings.fs.statSync(entry.path);
              entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
            } catch (error) {
              if (settings.throwErrorOnBrokenSymbolicLink) {
                throw error;
              }
            }
          }
          return entry;
        });
      }
      exports.readdirWithFileTypes = readdirWithFileTypes;
      function readdir(directory, settings) {
        const names = settings.fs.readdirSync(directory);
        return names.map((name) => {
          const entryPath = common2.joinPathSegments(directory, name, settings.pathSegmentSeparator);
          const stats = fsStat.statSync(entryPath, settings.fsStatSettings);
          const entry = {
            name,
            path: entryPath,
            dirent: utils.fs.createDirentFromStats(name, stats)
          };
          if (settings.stats) {
            entry.stats = stats;
          }
          return entry;
        });
      }
      exports.readdir = readdir;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/adapters/fs.js
  var require_fs4 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/adapters/fs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
      var fs4 = __require("fs");
      exports.FILE_SYSTEM_ADAPTER = {
        lstat: fs4.lstat,
        stat: fs4.stat,
        lstatSync: fs4.lstatSync,
        statSync: fs4.statSync,
        readdir: fs4.readdir,
        readdirSync: fs4.readdirSync
      };
      function createFileSystemAdapter(fsMethods) {
        if (fsMethods === void 0) {
          return exports.FILE_SYSTEM_ADAPTER;
        }
        return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
      }
      exports.createFileSystemAdapter = createFileSystemAdapter;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/settings.js
  var require_settings2 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/settings.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var path3 = __require("path");
      var fsStat = require_out();
      var fs4 = require_fs4();
      var Settings = class {
        constructor(_options = {}) {
          this._options = _options;
          this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false);
          this.fs = fs4.createFileSystemAdapter(this._options.fs);
          this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path3.sep);
          this.stats = this._getValue(this._options.stats, false);
          this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
          this.fsStatSettings = new fsStat.Settings({
            followSymbolicLink: this.followSymbolicLinks,
            fs: this.fs,
            throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
          });
        }
        _getValue(option, value) {
          return option !== null && option !== void 0 ? option : value;
        }
      };
      exports.default = Settings;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/index.js
  var require_out2 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.scandir-npm-2.1.5-89c67370dd-732c3b6d1b.zip/node_modules/@nodelib/fs.scandir/out/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Settings = exports.scandirSync = exports.scandir = void 0;
      var async = require_async2();
      var sync = require_sync2();
      var settings_1 = require_settings2();
      exports.Settings = settings_1.default;
      function scandir(path3, optionsOrSettingsOrCallback, callback) {
        if (typeof optionsOrSettingsOrCallback === "function") {
          async.read(path3, getSettings(), optionsOrSettingsOrCallback);
          return;
        }
        async.read(path3, getSettings(optionsOrSettingsOrCallback), callback);
      }
      exports.scandir = scandir;
      function scandirSync(path3, optionsOrSettings) {
        const settings = getSettings(optionsOrSettings);
        return sync.read(path3, settings);
      }
      exports.scandirSync = scandirSync;
      function getSettings(settingsOrOptions = {}) {
        if (settingsOrOptions instanceof settings_1.default) {
          return settingsOrOptions;
        }
        return new settings_1.default(settingsOrOptions);
      }
    }
  });

  // ../../../.yarn/cache/reusify-npm-1.0.4-95ac4aec11-c19ef26e4e.zip/node_modules/reusify/reusify.js
  var require_reusify = __commonJS({
    "../../../.yarn/cache/reusify-npm-1.0.4-95ac4aec11-c19ef26e4e.zip/node_modules/reusify/reusify.js"(exports, module) {
      "use strict";
      function reusify(Constructor) {
        var head = new Constructor();
        var tail = head;
        function get() {
          var current = head;
          if (current.next) {
            head = current.next;
          } else {
            head = new Constructor();
            tail = head;
          }
          current.next = null;
          return current;
        }
        function release(obj) {
          tail.next = obj;
          tail = obj;
        }
        return {
          get,
          release
        };
      }
      module.exports = reusify;
    }
  });

  // ../../../.yarn/cache/fastq-npm-1.17.1-56d4554993-1095f16cea.zip/node_modules/fastq/queue.js
  var require_queue = __commonJS({
    "../../../.yarn/cache/fastq-npm-1.17.1-56d4554993-1095f16cea.zip/node_modules/fastq/queue.js"(exports, module) {
      "use strict";
      var reusify = require_reusify();
      function fastqueue(context2, worker, _concurrency) {
        if (typeof context2 === "function") {
          _concurrency = worker;
          worker = context2;
          context2 = null;
        }
        if (!(_concurrency >= 1)) {
          throw new Error("fastqueue concurrency must be equal to or greater than 1");
        }
        var cache = reusify(Task);
        var queueHead = null;
        var queueTail = null;
        var _running = 0;
        var errorHandler = null;
        var self2 = {
          push,
          drain: noop,
          saturated: noop,
          pause,
          paused: false,
          get concurrency() {
            return _concurrency;
          },
          set concurrency(value) {
            if (!(value >= 1)) {
              throw new Error("fastqueue concurrency must be equal to or greater than 1");
            }
            _concurrency = value;
            if (self2.paused)
              return;
            for (; queueHead && _running < _concurrency; ) {
              _running++;
              release();
            }
          },
          running,
          resume,
          idle,
          length,
          getQueue,
          unshift,
          empty: noop,
          kill,
          killAndDrain,
          error
        };
        return self2;
        function running() {
          return _running;
        }
        function pause() {
          self2.paused = true;
        }
        function length() {
          var current = queueHead;
          var counter = 0;
          while (current) {
            current = current.next;
            counter++;
          }
          return counter;
        }
        function getQueue() {
          var current = queueHead;
          var tasks = [];
          while (current) {
            tasks.push(current.value);
            current = current.next;
          }
          return tasks;
        }
        function resume() {
          if (!self2.paused)
            return;
          self2.paused = false;
          if (queueHead === null) {
            _running++;
            release();
            return;
          }
          for (; queueHead && _running < _concurrency; ) {
            _running++;
            release();
          }
        }
        function idle() {
          return _running === 0 && self2.length() === 0;
        }
        function push(value, done) {
          var current = cache.get();
          current.context = context2;
          current.release = release;
          current.value = value;
          current.callback = done || noop;
          current.errorHandler = errorHandler;
          if (_running >= _concurrency || self2.paused) {
            if (queueTail) {
              queueTail.next = current;
              queueTail = current;
            } else {
              queueHead = current;
              queueTail = current;
              self2.saturated();
            }
          } else {
            _running++;
            worker.call(context2, current.value, current.worked);
          }
        }
        function unshift(value, done) {
          var current = cache.get();
          current.context = context2;
          current.release = release;
          current.value = value;
          current.callback = done || noop;
          current.errorHandler = errorHandler;
          if (_running >= _concurrency || self2.paused) {
            if (queueHead) {
              current.next = queueHead;
              queueHead = current;
            } else {
              queueHead = current;
              queueTail = current;
              self2.saturated();
            }
          } else {
            _running++;
            worker.call(context2, current.value, current.worked);
          }
        }
        function release(holder) {
          if (holder) {
            cache.release(holder);
          }
          var next = queueHead;
          if (next && _running <= _concurrency) {
            if (!self2.paused) {
              if (queueTail === queueHead) {
                queueTail = null;
              }
              queueHead = next.next;
              next.next = null;
              worker.call(context2, next.value, next.worked);
              if (queueTail === null) {
                self2.empty();
              }
            } else {
              _running--;
            }
          } else if (--_running === 0) {
            self2.drain();
          }
        }
        function kill() {
          queueHead = null;
          queueTail = null;
          self2.drain = noop;
        }
        function killAndDrain() {
          queueHead = null;
          queueTail = null;
          self2.drain();
          self2.drain = noop;
        }
        function error(handler) {
          errorHandler = handler;
        }
      }
      function noop() {
      }
      function Task() {
        this.value = null;
        this.callback = noop;
        this.next = null;
        this.release = noop;
        this.context = null;
        this.errorHandler = null;
        var self2 = this;
        this.worked = function worked(err, result) {
          var callback = self2.callback;
          var errorHandler = self2.errorHandler;
          var val = self2.value;
          self2.value = null;
          self2.callback = noop;
          if (self2.errorHandler) {
            errorHandler(err, val);
          }
          callback.call(self2.context, err, result);
          self2.release(self2);
        };
      }
      function queueAsPromised(context2, worker, _concurrency) {
        if (typeof context2 === "function") {
          _concurrency = worker;
          worker = context2;
          context2 = null;
        }
        function asyncWrapper(arg, cb) {
          worker.call(this, arg).then(function(res) {
            cb(null, res);
          }, cb);
        }
        var queue = fastqueue(context2, asyncWrapper, _concurrency);
        var pushCb = queue.push;
        var unshiftCb = queue.unshift;
        queue.push = push;
        queue.unshift = unshift;
        queue.drained = drained;
        return queue;
        function push(value) {
          var p = new Promise(function(resolve, reject) {
            pushCb(value, function(err, result) {
              if (err) {
                reject(err);
                return;
              }
              resolve(result);
            });
          });
          p.catch(noop);
          return p;
        }
        function unshift(value) {
          var p = new Promise(function(resolve, reject) {
            unshiftCb(value, function(err, result) {
              if (err) {
                reject(err);
                return;
              }
              resolve(result);
            });
          });
          p.catch(noop);
          return p;
        }
        function drained() {
          if (queue.idle()) {
            return new Promise(function(resolve) {
              resolve();
            });
          }
          var previousDrain = queue.drain;
          var p = new Promise(function(resolve) {
            queue.drain = function() {
              previousDrain();
              resolve();
            };
          });
          return p;
        }
      }
      module.exports = fastqueue;
      module.exports.promise = queueAsPromised;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/readers/common.js
  var require_common2 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/readers/common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.joinPathSegments = exports.replacePathSegmentSeparator = exports.isAppliedFilter = exports.isFatalError = void 0;
      function isFatalError(settings, error) {
        if (settings.errorFilter === null) {
          return true;
        }
        return !settings.errorFilter(error);
      }
      exports.isFatalError = isFatalError;
      function isAppliedFilter(filter, value) {
        return filter === null || filter(value);
      }
      exports.isAppliedFilter = isAppliedFilter;
      function replacePathSegmentSeparator(filepath, separator) {
        return filepath.split(/[/\\]/).join(separator);
      }
      exports.replacePathSegmentSeparator = replacePathSegmentSeparator;
      function joinPathSegments(a, b, separator) {
        if (a === "") {
          return b;
        }
        if (a.endsWith(separator)) {
          return a + b;
        }
        return a + separator + b;
      }
      exports.joinPathSegments = joinPathSegments;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/readers/reader.js
  var require_reader = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/readers/reader.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var common2 = require_common2();
      var Reader = class {
        constructor(_root, _settings) {
          this._root = _root;
          this._settings = _settings;
          this._root = common2.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
        }
      };
      exports.default = Reader;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/readers/async.js
  var require_async3 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/readers/async.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var events_1 = __require("events");
      var fsScandir = require_out2();
      var fastq = require_queue();
      var common2 = require_common2();
      var reader_1 = require_reader();
      var AsyncReader = class extends reader_1.default {
        constructor(_root, _settings) {
          super(_root, _settings);
          this._settings = _settings;
          this._scandir = fsScandir.scandir;
          this._emitter = new events_1.EventEmitter();
          this._queue = fastq(this._worker.bind(this), this._settings.concurrency);
          this._isFatalError = false;
          this._isDestroyed = false;
          this._queue.drain = () => {
            if (!this._isFatalError) {
              this._emitter.emit("end");
            }
          };
        }
        read() {
          this._isFatalError = false;
          this._isDestroyed = false;
          setImmediate(() => {
            this._pushToQueue(this._root, this._settings.basePath);
          });
          return this._emitter;
        }
        get isDestroyed() {
          return this._isDestroyed;
        }
        destroy() {
          if (this._isDestroyed) {
            throw new Error("The reader is already destroyed");
          }
          this._isDestroyed = true;
          this._queue.killAndDrain();
        }
        onEntry(callback) {
          this._emitter.on("entry", callback);
        }
        onError(callback) {
          this._emitter.once("error", callback);
        }
        onEnd(callback) {
          this._emitter.once("end", callback);
        }
        _pushToQueue(directory, base) {
          const queueItem = { directory, base };
          this._queue.push(queueItem, (error) => {
            if (error !== null) {
              this._handleError(error);
            }
          });
        }
        _worker(item, done) {
          this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
            if (error !== null) {
              done(error, void 0);
              return;
            }
            for (const entry of entries) {
              this._handleEntry(entry, item.base);
            }
            done(null, void 0);
          });
        }
        _handleError(error) {
          if (this._isDestroyed || !common2.isFatalError(this._settings, error)) {
            return;
          }
          this._isFatalError = true;
          this._isDestroyed = true;
          this._emitter.emit("error", error);
        }
        _handleEntry(entry, base) {
          if (this._isDestroyed || this._isFatalError) {
            return;
          }
          const fullpath = entry.path;
          if (base !== void 0) {
            entry.path = common2.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
          }
          if (common2.isAppliedFilter(this._settings.entryFilter, entry)) {
            this._emitEntry(entry);
          }
          if (entry.dirent.isDirectory() && common2.isAppliedFilter(this._settings.deepFilter, entry)) {
            this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path);
          }
        }
        _emitEntry(entry) {
          this._emitter.emit("entry", entry);
        }
      };
      exports.default = AsyncReader;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/providers/async.js
  var require_async4 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/providers/async.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var async_1 = require_async3();
      var AsyncProvider = class {
        constructor(_root, _settings) {
          this._root = _root;
          this._settings = _settings;
          this._reader = new async_1.default(this._root, this._settings);
          this._storage = [];
        }
        read(callback) {
          this._reader.onError((error) => {
            callFailureCallback(callback, error);
          });
          this._reader.onEntry((entry) => {
            this._storage.push(entry);
          });
          this._reader.onEnd(() => {
            callSuccessCallback(callback, this._storage);
          });
          this._reader.read();
        }
      };
      exports.default = AsyncProvider;
      function callFailureCallback(callback, error) {
        callback(error);
      }
      function callSuccessCallback(callback, entries) {
        callback(null, entries);
      }
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/providers/stream.js
  var require_stream2 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/providers/stream.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var stream_1 = __require("stream");
      var async_1 = require_async3();
      var StreamProvider = class {
        constructor(_root, _settings) {
          this._root = _root;
          this._settings = _settings;
          this._reader = new async_1.default(this._root, this._settings);
          this._stream = new stream_1.Readable({
            objectMode: true,
            read: () => {
            },
            destroy: () => {
              if (!this._reader.isDestroyed) {
                this._reader.destroy();
              }
            }
          });
        }
        read() {
          this._reader.onError((error) => {
            this._stream.emit("error", error);
          });
          this._reader.onEntry((entry) => {
            this._stream.push(entry);
          });
          this._reader.onEnd(() => {
            this._stream.push(null);
          });
          this._reader.read();
          return this._stream;
        }
      };
      exports.default = StreamProvider;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/readers/sync.js
  var require_sync3 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/readers/sync.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var fsScandir = require_out2();
      var common2 = require_common2();
      var reader_1 = require_reader();
      var SyncReader = class extends reader_1.default {
        constructor() {
          super(...arguments);
          this._scandir = fsScandir.scandirSync;
          this._storage = [];
          this._queue = /* @__PURE__ */ new Set();
        }
        read() {
          this._pushToQueue(this._root, this._settings.basePath);
          this._handleQueue();
          return this._storage;
        }
        _pushToQueue(directory, base) {
          this._queue.add({ directory, base });
        }
        _handleQueue() {
          for (const item of this._queue.values()) {
            this._handleDirectory(item.directory, item.base);
          }
        }
        _handleDirectory(directory, base) {
          try {
            const entries = this._scandir(directory, this._settings.fsScandirSettings);
            for (const entry of entries) {
              this._handleEntry(entry, base);
            }
          } catch (error) {
            this._handleError(error);
          }
        }
        _handleError(error) {
          if (!common2.isFatalError(this._settings, error)) {
            return;
          }
          throw error;
        }
        _handleEntry(entry, base) {
          const fullpath = entry.path;
          if (base !== void 0) {
            entry.path = common2.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
          }
          if (common2.isAppliedFilter(this._settings.entryFilter, entry)) {
            this._pushToStorage(entry);
          }
          if (entry.dirent.isDirectory() && common2.isAppliedFilter(this._settings.deepFilter, entry)) {
            this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path);
          }
        }
        _pushToStorage(entry) {
          this._storage.push(entry);
        }
      };
      exports.default = SyncReader;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/providers/sync.js
  var require_sync4 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/providers/sync.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var sync_1 = require_sync3();
      var SyncProvider = class {
        constructor(_root, _settings) {
          this._root = _root;
          this._settings = _settings;
          this._reader = new sync_1.default(this._root, this._settings);
        }
        read() {
          return this._reader.read();
        }
      };
      exports.default = SyncProvider;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/settings.js
  var require_settings3 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/settings.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var path3 = __require("path");
      var fsScandir = require_out2();
      var Settings = class {
        constructor(_options = {}) {
          this._options = _options;
          this.basePath = this._getValue(this._options.basePath, void 0);
          this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY);
          this.deepFilter = this._getValue(this._options.deepFilter, null);
          this.entryFilter = this._getValue(this._options.entryFilter, null);
          this.errorFilter = this._getValue(this._options.errorFilter, null);
          this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path3.sep);
          this.fsScandirSettings = new fsScandir.Settings({
            followSymbolicLinks: this._options.followSymbolicLinks,
            fs: this._options.fs,
            pathSegmentSeparator: this._options.pathSegmentSeparator,
            stats: this._options.stats,
            throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
          });
        }
        _getValue(option, value) {
          return option !== null && option !== void 0 ? option : value;
        }
      };
      exports.default = Settings;
    }
  });

  // ../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/index.js
  var require_out3 = __commonJS({
    "../../../.yarn/cache/@nodelib-fs.walk-npm-1.2.8-b4a89da548-db9de047c3.zip/node_modules/@nodelib/fs.walk/out/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Settings = exports.walkStream = exports.walkSync = exports.walk = void 0;
      var async_1 = require_async4();
      var stream_1 = require_stream2();
      var sync_1 = require_sync4();
      var settings_1 = require_settings3();
      exports.Settings = settings_1.default;
      function walk(directory, optionsOrSettingsOrCallback, callback) {
        if (typeof optionsOrSettingsOrCallback === "function") {
          new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
          return;
        }
        new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
      }
      exports.walk = walk;
      function walkSync(directory, optionsOrSettings) {
        const settings = getSettings(optionsOrSettings);
        const provider = new sync_1.default(directory, settings);
        return provider.read();
      }
      exports.walkSync = walkSync;
      function walkStream(directory, optionsOrSettings) {
        const settings = getSettings(optionsOrSettings);
        const provider = new stream_1.default(directory, settings);
        return provider.read();
      }
      exports.walkStream = walkStream;
      function getSettings(settingsOrOptions = {}) {
        if (settingsOrOptions instanceof settings_1.default) {
          return settingsOrOptions;
        }
        return new settings_1.default(settingsOrOptions);
      }
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/readers/reader.js
  var require_reader2 = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/readers/reader.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var path3 = __require("path");
      var fsStat = require_out();
      var utils = require_utils3();
      var Reader = class {
        constructor(_settings) {
          this._settings = _settings;
          this._fsStatSettings = new fsStat.Settings({
            followSymbolicLink: this._settings.followSymbolicLinks,
            fs: this._settings.fs,
            throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
          });
        }
        _getFullEntryPath(filepath) {
          return path3.resolve(this._settings.cwd, filepath);
        }
        _makeEntry(stats, pattern) {
          const entry = {
            name: pattern,
            path: pattern,
            dirent: utils.fs.createDirentFromStats(pattern, stats)
          };
          if (this._settings.stats) {
            entry.stats = stats;
          }
          return entry;
        }
        _isFatalError(error) {
          return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
        }
      };
      exports.default = Reader;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/readers/stream.js
  var require_stream3 = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/readers/stream.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var stream_1 = __require("stream");
      var fsStat = require_out();
      var fsWalk = require_out3();
      var reader_1 = require_reader2();
      var ReaderStream = class extends reader_1.default {
        constructor() {
          super(...arguments);
          this._walkStream = fsWalk.walkStream;
          this._stat = fsStat.stat;
        }
        dynamic(root, options) {
          return this._walkStream(root, options);
        }
        static(patterns, options) {
          const filepaths = patterns.map(this._getFullEntryPath, this);
          const stream = new stream_1.PassThrough({ objectMode: true });
          stream._write = (index, _enc, done) => {
            return this._getEntry(filepaths[index], patterns[index], options).then((entry) => {
              if (entry !== null && options.entryFilter(entry)) {
                stream.push(entry);
              }
              if (index === filepaths.length - 1) {
                stream.end();
              }
              done();
            }).catch(done);
          };
          for (let i = 0; i < filepaths.length; i++) {
            stream.write(i);
          }
          return stream;
        }
        _getEntry(filepath, pattern, options) {
          return this._getStat(filepath).then((stats) => this._makeEntry(stats, pattern)).catch((error) => {
            if (options.errorFilter(error)) {
              return null;
            }
            throw error;
          });
        }
        _getStat(filepath) {
          return new Promise((resolve, reject) => {
            this._stat(filepath, this._fsStatSettings, (error, stats) => {
              return error === null ? resolve(stats) : reject(error);
            });
          });
        }
      };
      exports.default = ReaderStream;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/readers/async.js
  var require_async5 = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/readers/async.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var fsWalk = require_out3();
      var reader_1 = require_reader2();
      var stream_1 = require_stream3();
      var ReaderAsync = class extends reader_1.default {
        constructor() {
          super(...arguments);
          this._walkAsync = fsWalk.walk;
          this._readerStream = new stream_1.default(this._settings);
        }
        dynamic(root, options) {
          return new Promise((resolve, reject) => {
            this._walkAsync(root, options, (error, entries) => {
              if (error === null) {
                resolve(entries);
              } else {
                reject(error);
              }
            });
          });
        }
        async static(patterns, options) {
          const entries = [];
          const stream = this._readerStream.static(patterns, options);
          return new Promise((resolve, reject) => {
            stream.once("error", reject);
            stream.on("data", (entry) => entries.push(entry));
            stream.once("end", () => resolve(entries));
          });
        }
      };
      exports.default = ReaderAsync;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/matchers/matcher.js
  var require_matcher = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/matchers/matcher.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var utils = require_utils3();
      var Matcher = class {
        constructor(_patterns, _settings, _micromatchOptions) {
          this._patterns = _patterns;
          this._settings = _settings;
          this._micromatchOptions = _micromatchOptions;
          this._storage = [];
          this._fillStorage();
        }
        _fillStorage() {
          for (const pattern of this._patterns) {
            const segments = this._getPatternSegments(pattern);
            const sections = this._splitSegmentsIntoSections(segments);
            this._storage.push({
              complete: sections.length <= 1,
              pattern,
              segments,
              sections
            });
          }
        }
        _getPatternSegments(pattern) {
          const parts = utils.pattern.getPatternParts(pattern, this._micromatchOptions);
          return parts.map((part) => {
            const dynamic = utils.pattern.isDynamicPattern(part, this._settings);
            if (!dynamic) {
              return {
                dynamic: false,
                pattern: part
              };
            }
            return {
              dynamic: true,
              pattern: part,
              patternRe: utils.pattern.makeRe(part, this._micromatchOptions)
            };
          });
        }
        _splitSegmentsIntoSections(segments) {
          return utils.array.splitWhen(segments, (segment) => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern));
        }
      };
      exports.default = Matcher;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/matchers/partial.js
  var require_partial = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/matchers/partial.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var matcher_1 = require_matcher();
      var PartialMatcher = class extends matcher_1.default {
        match(filepath) {
          const parts = filepath.split("/");
          const levels = parts.length;
          const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
          for (const pattern of patterns) {
            const section = pattern.sections[0];
            if (!pattern.complete && levels > section.length) {
              return true;
            }
            const match = parts.every((part, index) => {
              const segment = pattern.segments[index];
              if (segment.dynamic && segment.patternRe.test(part)) {
                return true;
              }
              if (!segment.dynamic && segment.pattern === part) {
                return true;
              }
              return false;
            });
            if (match) {
              return true;
            }
          }
          return false;
        }
      };
      exports.default = PartialMatcher;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/filters/deep.js
  var require_deep = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/filters/deep.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var utils = require_utils3();
      var partial_1 = require_partial();
      var DeepFilter = class {
        constructor(_settings, _micromatchOptions) {
          this._settings = _settings;
          this._micromatchOptions = _micromatchOptions;
        }
        getFilter(basePath, positive, negative) {
          const matcher = this._getMatcher(positive);
          const negativeRe = this._getNegativePatternsRe(negative);
          return (entry) => this._filter(basePath, entry, matcher, negativeRe);
        }
        _getMatcher(patterns) {
          return new partial_1.default(patterns, this._settings, this._micromatchOptions);
        }
        _getNegativePatternsRe(patterns) {
          const affectDepthOfReadingPatterns = patterns.filter(utils.pattern.isAffectDepthOfReadingPattern);
          return utils.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
        }
        _filter(basePath, entry, matcher, negativeRe) {
          if (this._isSkippedByDeep(basePath, entry.path)) {
            return false;
          }
          if (this._isSkippedSymbolicLink(entry)) {
            return false;
          }
          const filepath = utils.path.removeLeadingDotSegment(entry.path);
          if (this._isSkippedByPositivePatterns(filepath, matcher)) {
            return false;
          }
          return this._isSkippedByNegativePatterns(filepath, negativeRe);
        }
        _isSkippedByDeep(basePath, entryPath) {
          if (this._settings.deep === Infinity) {
            return false;
          }
          return this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
        }
        _getEntryLevel(basePath, entryPath) {
          const entryPathDepth = entryPath.split("/").length;
          if (basePath === "") {
            return entryPathDepth;
          }
          const basePathDepth = basePath.split("/").length;
          return entryPathDepth - basePathDepth;
        }
        _isSkippedSymbolicLink(entry) {
          return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
        }
        _isSkippedByPositivePatterns(entryPath, matcher) {
          return !this._settings.baseNameMatch && !matcher.match(entryPath);
        }
        _isSkippedByNegativePatterns(entryPath, patternsRe) {
          return !utils.pattern.matchAny(entryPath, patternsRe);
        }
      };
      exports.default = DeepFilter;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/filters/entry.js
  var require_entry = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/filters/entry.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var utils = require_utils3();
      var EntryFilter = class {
        constructor(_settings, _micromatchOptions) {
          this._settings = _settings;
          this._micromatchOptions = _micromatchOptions;
          this.index = /* @__PURE__ */ new Map();
        }
        getFilter(positive, negative) {
          const positiveRe = utils.pattern.convertPatternsToRe(positive, this._micromatchOptions);
          const negativeRe = utils.pattern.convertPatternsToRe(negative, Object.assign(Object.assign({}, this._micromatchOptions), { dot: true }));
          return (entry) => this._filter(entry, positiveRe, negativeRe);
        }
        _filter(entry, positiveRe, negativeRe) {
          const filepath = utils.path.removeLeadingDotSegment(entry.path);
          if (this._settings.unique && this._isDuplicateEntry(filepath)) {
            return false;
          }
          if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) {
            return false;
          }
          if (this._isSkippedByAbsoluteNegativePatterns(filepath, negativeRe)) {
            return false;
          }
          const isDirectory2 = entry.dirent.isDirectory();
          const isMatched = this._isMatchToPatterns(filepath, positiveRe, isDirectory2) && !this._isMatchToPatterns(filepath, negativeRe, isDirectory2);
          if (this._settings.unique && isMatched) {
            this._createIndexRecord(filepath);
          }
          return isMatched;
        }
        _isDuplicateEntry(filepath) {
          return this.index.has(filepath);
        }
        _createIndexRecord(filepath) {
          this.index.set(filepath, void 0);
        }
        _onlyFileFilter(entry) {
          return this._settings.onlyFiles && !entry.dirent.isFile();
        }
        _onlyDirectoryFilter(entry) {
          return this._settings.onlyDirectories && !entry.dirent.isDirectory();
        }
        _isSkippedByAbsoluteNegativePatterns(entryPath, patternsRe) {
          if (!this._settings.absolute) {
            return false;
          }
          const fullpath = utils.path.makeAbsolute(this._settings.cwd, entryPath);
          return utils.pattern.matchAny(fullpath, patternsRe);
        }
        _isMatchToPatterns(filepath, patternsRe, isDirectory2) {
          const isMatched = utils.pattern.matchAny(filepath, patternsRe);
          if (!isMatched && isDirectory2) {
            return utils.pattern.matchAny(filepath + "/", patternsRe);
          }
          return isMatched;
        }
      };
      exports.default = EntryFilter;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/filters/error.js
  var require_error = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/filters/error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var utils = require_utils3();
      var ErrorFilter = class {
        constructor(_settings) {
          this._settings = _settings;
        }
        getFilter() {
          return (error) => this._isNonFatalError(error);
        }
        _isNonFatalError(error) {
          return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
        }
      };
      exports.default = ErrorFilter;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/transformers/entry.js
  var require_entry2 = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/transformers/entry.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var utils = require_utils3();
      var EntryTransformer = class {
        constructor(_settings) {
          this._settings = _settings;
        }
        getTransformer() {
          return (entry) => this._transform(entry);
        }
        _transform(entry) {
          let filepath = entry.path;
          if (this._settings.absolute) {
            filepath = utils.path.makeAbsolute(this._settings.cwd, filepath);
            filepath = utils.path.unixify(filepath);
          }
          if (this._settings.markDirectories && entry.dirent.isDirectory()) {
            filepath += "/";
          }
          if (!this._settings.objectMode) {
            return filepath;
          }
          return Object.assign(Object.assign({}, entry), { path: filepath });
        }
      };
      exports.default = EntryTransformer;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/provider.js
  var require_provider = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/provider.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var path3 = __require("path");
      var deep_1 = require_deep();
      var entry_1 = require_entry();
      var error_1 = require_error();
      var entry_2 = require_entry2();
      var Provider = class {
        constructor(_settings) {
          this._settings = _settings;
          this.errorFilter = new error_1.default(this._settings);
          this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions());
          this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions());
          this.entryTransformer = new entry_2.default(this._settings);
        }
        _getRootDirectory(task) {
          return path3.resolve(this._settings.cwd, task.base);
        }
        _getReaderOptions(task) {
          const basePath = task.base === "." ? "" : task.base;
          return {
            basePath,
            pathSegmentSeparator: "/",
            concurrency: this._settings.concurrency,
            deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
            entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
            errorFilter: this.errorFilter.getFilter(),
            followSymbolicLinks: this._settings.followSymbolicLinks,
            fs: this._settings.fs,
            stats: this._settings.stats,
            throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
            transform: this.entryTransformer.getTransformer()
          };
        }
        _getMicromatchOptions() {
          return {
            dot: this._settings.dot,
            matchBase: this._settings.baseNameMatch,
            nobrace: !this._settings.braceExpansion,
            nocase: !this._settings.caseSensitiveMatch,
            noext: !this._settings.extglob,
            noglobstar: !this._settings.globstar,
            posix: true,
            strictSlashes: false
          };
        }
      };
      exports.default = Provider;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/async.js
  var require_async6 = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/async.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var async_1 = require_async5();
      var provider_1 = require_provider();
      var ProviderAsync = class extends provider_1.default {
        constructor() {
          super(...arguments);
          this._reader = new async_1.default(this._settings);
        }
        async read(task) {
          const root = this._getRootDirectory(task);
          const options = this._getReaderOptions(task);
          const entries = await this.api(root, task, options);
          return entries.map((entry) => options.transform(entry));
        }
        api(root, task, options) {
          if (task.dynamic) {
            return this._reader.dynamic(root, options);
          }
          return this._reader.static(task.patterns, options);
        }
      };
      exports.default = ProviderAsync;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/stream.js
  var require_stream4 = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/stream.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var stream_1 = __require("stream");
      var stream_2 = require_stream3();
      var provider_1 = require_provider();
      var ProviderStream = class extends provider_1.default {
        constructor() {
          super(...arguments);
          this._reader = new stream_2.default(this._settings);
        }
        read(task) {
          const root = this._getRootDirectory(task);
          const options = this._getReaderOptions(task);
          const source = this.api(root, task, options);
          const destination = new stream_1.Readable({ objectMode: true, read: () => {
          } });
          source.once("error", (error) => destination.emit("error", error)).on("data", (entry) => destination.emit("data", options.transform(entry))).once("end", () => destination.emit("end"));
          destination.once("close", () => source.destroy());
          return destination;
        }
        api(root, task, options) {
          if (task.dynamic) {
            return this._reader.dynamic(root, options);
          }
          return this._reader.static(task.patterns, options);
        }
      };
      exports.default = ProviderStream;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/readers/sync.js
  var require_sync5 = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/readers/sync.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var fsStat = require_out();
      var fsWalk = require_out3();
      var reader_1 = require_reader2();
      var ReaderSync = class extends reader_1.default {
        constructor() {
          super(...arguments);
          this._walkSync = fsWalk.walkSync;
          this._statSync = fsStat.statSync;
        }
        dynamic(root, options) {
          return this._walkSync(root, options);
        }
        static(patterns, options) {
          const entries = [];
          for (const pattern of patterns) {
            const filepath = this._getFullEntryPath(pattern);
            const entry = this._getEntry(filepath, pattern, options);
            if (entry === null || !options.entryFilter(entry)) {
              continue;
            }
            entries.push(entry);
          }
          return entries;
        }
        _getEntry(filepath, pattern, options) {
          try {
            const stats = this._getStat(filepath);
            return this._makeEntry(stats, pattern);
          } catch (error) {
            if (options.errorFilter(error)) {
              return null;
            }
            throw error;
          }
        }
        _getStat(filepath) {
          return this._statSync(filepath, this._fsStatSettings);
        }
      };
      exports.default = ReaderSync;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/sync.js
  var require_sync6 = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/providers/sync.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var sync_1 = require_sync5();
      var provider_1 = require_provider();
      var ProviderSync = class extends provider_1.default {
        constructor() {
          super(...arguments);
          this._reader = new sync_1.default(this._settings);
        }
        read(task) {
          const root = this._getRootDirectory(task);
          const options = this._getReaderOptions(task);
          const entries = this.api(root, task, options);
          return entries.map(options.transform);
        }
        api(root, task, options) {
          if (task.dynamic) {
            return this._reader.dynamic(root, options);
          }
          return this._reader.static(task.patterns, options);
        }
      };
      exports.default = ProviderSync;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/settings.js
  var require_settings4 = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/settings.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
      var fs4 = __require("fs");
      var os = __require("os");
      var CPU_COUNT = Math.max(os.cpus().length, 1);
      exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
        lstat: fs4.lstat,
        lstatSync: fs4.lstatSync,
        stat: fs4.stat,
        statSync: fs4.statSync,
        readdir: fs4.readdir,
        readdirSync: fs4.readdirSync
      };
      var Settings = class {
        constructor(_options = {}) {
          this._options = _options;
          this.absolute = this._getValue(this._options.absolute, false);
          this.baseNameMatch = this._getValue(this._options.baseNameMatch, false);
          this.braceExpansion = this._getValue(this._options.braceExpansion, true);
          this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true);
          this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT);
          this.cwd = this._getValue(this._options.cwd, process.cwd());
          this.deep = this._getValue(this._options.deep, Infinity);
          this.dot = this._getValue(this._options.dot, false);
          this.extglob = this._getValue(this._options.extglob, true);
          this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true);
          this.fs = this._getFileSystemMethods(this._options.fs);
          this.globstar = this._getValue(this._options.globstar, true);
          this.ignore = this._getValue(this._options.ignore, []);
          this.markDirectories = this._getValue(this._options.markDirectories, false);
          this.objectMode = this._getValue(this._options.objectMode, false);
          this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
          this.onlyFiles = this._getValue(this._options.onlyFiles, true);
          this.stats = this._getValue(this._options.stats, false);
          this.suppressErrors = this._getValue(this._options.suppressErrors, false);
          this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false);
          this.unique = this._getValue(this._options.unique, true);
          if (this.onlyDirectories) {
            this.onlyFiles = false;
          }
          if (this.stats) {
            this.objectMode = true;
          }
          this.ignore = [].concat(this.ignore);
        }
        _getValue(option, value) {
          return option === void 0 ? value : option;
        }
        _getFileSystemMethods(methods = {}) {
          return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
        }
      };
      exports.default = Settings;
    }
  });

  // ../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/index.js
  var require_out4 = __commonJS({
    "../../../.yarn/cache/fast-glob-npm-3.3.2-0a8cb4f2ca-42baad7b9c.zip/node_modules/fast-glob/out/index.js"(exports, module) {
      "use strict";
      var taskManager = require_tasks();
      var async_1 = require_async6();
      var stream_1 = require_stream4();
      var sync_1 = require_sync6();
      var settings_1 = require_settings4();
      var utils = require_utils3();
      async function FastGlob(source, options) {
        assertPatternsInput2(source);
        const works = getWorks(source, async_1.default, options);
        const result = await Promise.all(works);
        return utils.array.flatten(result);
      }
      (function(FastGlob2) {
        FastGlob2.glob = FastGlob2;
        FastGlob2.globSync = sync;
        FastGlob2.globStream = stream;
        FastGlob2.async = FastGlob2;
        function sync(source, options) {
          assertPatternsInput2(source);
          const works = getWorks(source, sync_1.default, options);
          return utils.array.flatten(works);
        }
        FastGlob2.sync = sync;
        function stream(source, options) {
          assertPatternsInput2(source);
          const works = getWorks(source, stream_1.default, options);
          return utils.stream.merge(works);
        }
        FastGlob2.stream = stream;
        function generateTasks2(source, options) {
          assertPatternsInput2(source);
          const patterns = [].concat(source);
          const settings = new settings_1.default(options);
          return taskManager.generate(patterns, settings);
        }
        FastGlob2.generateTasks = generateTasks2;
        function isDynamicPattern2(source, options) {
          assertPatternsInput2(source);
          const settings = new settings_1.default(options);
          return utils.pattern.isDynamicPattern(source, settings);
        }
        FastGlob2.isDynamicPattern = isDynamicPattern2;
        function escapePath(source) {
          assertPatternsInput2(source);
          return utils.path.escape(source);
        }
        FastGlob2.escapePath = escapePath;
        function convertPathToPattern2(source) {
          assertPatternsInput2(source);
          return utils.path.convertPathToPattern(source);
        }
        FastGlob2.convertPathToPattern = convertPathToPattern2;
        let posix;
        (function(posix2) {
          function escapePath2(source) {
            assertPatternsInput2(source);
            return utils.path.escapePosixPath(source);
          }
          posix2.escapePath = escapePath2;
          function convertPathToPattern3(source) {
            assertPatternsInput2(source);
            return utils.path.convertPosixPathToPattern(source);
          }
          posix2.convertPathToPattern = convertPathToPattern3;
        })(posix = FastGlob2.posix || (FastGlob2.posix = {}));
        let win32;
        (function(win322) {
          function escapePath2(source) {
            assertPatternsInput2(source);
            return utils.path.escapeWindowsPath(source);
          }
          win322.escapePath = escapePath2;
          function convertPathToPattern3(source) {
            assertPatternsInput2(source);
            return utils.path.convertWindowsPathToPattern(source);
          }
          win322.convertPathToPattern = convertPathToPattern3;
        })(win32 = FastGlob2.win32 || (FastGlob2.win32 = {}));
      })(FastGlob || (FastGlob = {}));
      function getWorks(source, _Provider, options) {
        const patterns = [].concat(source);
        const settings = new settings_1.default(options);
        const tasks = taskManager.generate(patterns, settings);
        const provider = new _Provider(settings);
        return tasks.map(provider.read, provider);
      }
      function assertPatternsInput2(input) {
        const source = [].concat(input);
        const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item));
        if (!isValidSource) {
          throw new TypeError("Patterns must be a string (non empty) or an array of strings");
        }
      }
      module.exports = FastGlob;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/platform/node/globalThis.js
  var require_globalThis = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/platform/node/globalThis.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports._globalThis = void 0;
      exports._globalThis = typeof globalThis === "object" ? globalThis : global;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/platform/node/index.js
  var require_node = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/platform/node/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_globalThis(), exports);
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/platform/index.js
  var require_platform = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/platform/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_node(), exports);
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/version.js
  var require_version = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.VERSION = void 0;
      exports.VERSION = "1.7.0";
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/internal/semver.js
  var require_semver = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/internal/semver.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isCompatible = exports._makeCompatibilityCheck = void 0;
      var version_1 = require_version();
      var re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
      function _makeCompatibilityCheck(ownVersion) {
        const acceptedVersions = /* @__PURE__ */ new Set([ownVersion]);
        const rejectedVersions = /* @__PURE__ */ new Set();
        const myVersionMatch = ownVersion.match(re);
        if (!myVersionMatch) {
          return () => false;
        }
        const ownVersionParsed = {
          major: +myVersionMatch[1],
          minor: +myVersionMatch[2],
          patch: +myVersionMatch[3],
          prerelease: myVersionMatch[4]
        };
        if (ownVersionParsed.prerelease != null) {
          return function isExactmatch(globalVersion) {
            return globalVersion === ownVersion;
          };
        }
        function _reject(v) {
          rejectedVersions.add(v);
          return false;
        }
        function _accept(v) {
          acceptedVersions.add(v);
          return true;
        }
        return function isCompatible(globalVersion) {
          if (acceptedVersions.has(globalVersion)) {
            return true;
          }
          if (rejectedVersions.has(globalVersion)) {
            return false;
          }
          const globalVersionMatch = globalVersion.match(re);
          if (!globalVersionMatch) {
            return _reject(globalVersion);
          }
          const globalVersionParsed = {
            major: +globalVersionMatch[1],
            minor: +globalVersionMatch[2],
            patch: +globalVersionMatch[3],
            prerelease: globalVersionMatch[4]
          };
          if (globalVersionParsed.prerelease != null) {
            return _reject(globalVersion);
          }
          if (ownVersionParsed.major !== globalVersionParsed.major) {
            return _reject(globalVersion);
          }
          if (ownVersionParsed.major === 0) {
            if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
              return _accept(globalVersion);
            }
            return _reject(globalVersion);
          }
          if (ownVersionParsed.minor <= globalVersionParsed.minor) {
            return _accept(globalVersion);
          }
          return _reject(globalVersion);
        };
      }
      exports._makeCompatibilityCheck = _makeCompatibilityCheck;
      exports.isCompatible = _makeCompatibilityCheck(version_1.VERSION);
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/internal/global-utils.js
  var require_global_utils = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/internal/global-utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.unregisterGlobal = exports.getGlobal = exports.registerGlobal = void 0;
      var platform_1 = require_platform();
      var version_1 = require_version();
      var semver_1 = require_semver();
      var major = version_1.VERSION.split(".")[0];
      var GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for(`opentelemetry.js.api.${major}`);
      var _global = platform_1._globalThis;
      function registerGlobal(type2, instance, diag, allowOverride = false) {
        var _a;
        const api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a !== void 0 ? _a : {
          version: version_1.VERSION
        };
        if (!allowOverride && api[type2]) {
          const err = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${type2}`);
          diag.error(err.stack || err.message);
          return false;
        }
        if (api.version !== version_1.VERSION) {
          const err = new Error(`@opentelemetry/api: Registration of version v${api.version} for ${type2} does not match previously registered API v${version_1.VERSION}`);
          diag.error(err.stack || err.message);
          return false;
        }
        api[type2] = instance;
        diag.debug(`@opentelemetry/api: Registered a global for ${type2} v${version_1.VERSION}.`);
        return true;
      }
      exports.registerGlobal = registerGlobal;
      function getGlobal(type2) {
        var _a, _b;
        const globalVersion = (_a = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a === void 0 ? void 0 : _a.version;
        if (!globalVersion || !(0, semver_1.isCompatible)(globalVersion)) {
          return;
        }
        return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type2];
      }
      exports.getGlobal = getGlobal;
      function unregisterGlobal(type2, diag) {
        diag.debug(`@opentelemetry/api: Unregistering a global for ${type2} v${version_1.VERSION}.`);
        const api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
        if (api) {
          delete api[type2];
        }
      }
      exports.unregisterGlobal = unregisterGlobal;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/diag/ComponentLogger.js
  var require_ComponentLogger = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/diag/ComponentLogger.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DiagComponentLogger = void 0;
      var global_utils_1 = require_global_utils();
      var DiagComponentLogger = class {
        constructor(props) {
          this._namespace = props.namespace || "DiagComponentLogger";
        }
        debug(...args) {
          return logProxy("debug", this._namespace, args);
        }
        error(...args) {
          return logProxy("error", this._namespace, args);
        }
        info(...args) {
          return logProxy("info", this._namespace, args);
        }
        warn(...args) {
          return logProxy("warn", this._namespace, args);
        }
        verbose(...args) {
          return logProxy("verbose", this._namespace, args);
        }
      };
      exports.DiagComponentLogger = DiagComponentLogger;
      function logProxy(funcName, namespace, args) {
        const logger = (0, global_utils_1.getGlobal)("diag");
        if (!logger) {
          return;
        }
        args.unshift(namespace);
        return logger[funcName](...args);
      }
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/diag/types.js
  var require_types = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/diag/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DiagLogLevel = void 0;
      var DiagLogLevel;
      (function(DiagLogLevel2) {
        DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
        DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
        DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
        DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
        DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
        DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
        DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
      })(DiagLogLevel = exports.DiagLogLevel || (exports.DiagLogLevel = {}));
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/diag/internal/logLevelLogger.js
  var require_logLevelLogger = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/diag/internal/logLevelLogger.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createLogLevelDiagLogger = void 0;
      var types_1 = require_types();
      function createLogLevelDiagLogger(maxLevel, logger) {
        if (maxLevel < types_1.DiagLogLevel.NONE) {
          maxLevel = types_1.DiagLogLevel.NONE;
        } else if (maxLevel > types_1.DiagLogLevel.ALL) {
          maxLevel = types_1.DiagLogLevel.ALL;
        }
        logger = logger || {};
        function _filterFunc(funcName, theLevel) {
          const theFunc = logger[funcName];
          if (typeof theFunc === "function" && maxLevel >= theLevel) {
            return theFunc.bind(logger);
          }
          return function() {
          };
        }
        return {
          error: _filterFunc("error", types_1.DiagLogLevel.ERROR),
          warn: _filterFunc("warn", types_1.DiagLogLevel.WARN),
          info: _filterFunc("info", types_1.DiagLogLevel.INFO),
          debug: _filterFunc("debug", types_1.DiagLogLevel.DEBUG),
          verbose: _filterFunc("verbose", types_1.DiagLogLevel.VERBOSE)
        };
      }
      exports.createLogLevelDiagLogger = createLogLevelDiagLogger;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/api/diag.js
  var require_diag = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/api/diag.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DiagAPI = void 0;
      var ComponentLogger_1 = require_ComponentLogger();
      var logLevelLogger_1 = require_logLevelLogger();
      var types_1 = require_types();
      var global_utils_1 = require_global_utils();
      var API_NAME = "diag";
      var DiagAPI = class _DiagAPI {
        /**
         * Private internal constructor
         * @private
         */
        constructor() {
          function _logProxy(funcName) {
            return function(...args) {
              const logger = (0, global_utils_1.getGlobal)("diag");
              if (!logger)
                return;
              return logger[funcName](...args);
            };
          }
          const self2 = this;
          const setLogger = (logger, optionsOrLogLevel = { logLevel: types_1.DiagLogLevel.INFO }) => {
            var _a, _b, _c;
            if (logger === self2) {
              const err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
              self2.error((_a = err.stack) !== null && _a !== void 0 ? _a : err.message);
              return false;
            }
            if (typeof optionsOrLogLevel === "number") {
              optionsOrLogLevel = {
                logLevel: optionsOrLogLevel
              };
            }
            const oldLogger = (0, global_utils_1.getGlobal)("diag");
            const newLogger = (0, logLevelLogger_1.createLogLevelDiagLogger)((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : types_1.DiagLogLevel.INFO, logger);
            if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
              const stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
              oldLogger.warn(`Current logger will be overwritten from ${stack}`);
              newLogger.warn(`Current logger will overwrite one already registered from ${stack}`);
            }
            return (0, global_utils_1.registerGlobal)("diag", newLogger, self2, true);
          };
          self2.setLogger = setLogger;
          self2.disable = () => {
            (0, global_utils_1.unregisterGlobal)(API_NAME, self2);
          };
          self2.createComponentLogger = (options) => {
            return new ComponentLogger_1.DiagComponentLogger(options);
          };
          self2.verbose = _logProxy("verbose");
          self2.debug = _logProxy("debug");
          self2.info = _logProxy("info");
          self2.warn = _logProxy("warn");
          self2.error = _logProxy("error");
        }
        /** Get the singleton instance of the DiagAPI API */
        static instance() {
          if (!this._instance) {
            this._instance = new _DiagAPI();
          }
          return this._instance;
        }
      };
      exports.DiagAPI = DiagAPI;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/baggage/internal/baggage-impl.js
  var require_baggage_impl = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/baggage/internal/baggage-impl.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BaggageImpl = void 0;
      var BaggageImpl = class _BaggageImpl {
        constructor(entries) {
          this._entries = entries ? new Map(entries) : /* @__PURE__ */ new Map();
        }
        getEntry(key) {
          const entry = this._entries.get(key);
          if (!entry) {
            return void 0;
          }
          return Object.assign({}, entry);
        }
        getAllEntries() {
          return Array.from(this._entries.entries()).map(([k, v]) => [k, v]);
        }
        setEntry(key, entry) {
          const newBaggage = new _BaggageImpl(this._entries);
          newBaggage._entries.set(key, entry);
          return newBaggage;
        }
        removeEntry(key) {
          const newBaggage = new _BaggageImpl(this._entries);
          newBaggage._entries.delete(key);
          return newBaggage;
        }
        removeEntries(...keys) {
          const newBaggage = new _BaggageImpl(this._entries);
          for (const key of keys) {
            newBaggage._entries.delete(key);
          }
          return newBaggage;
        }
        clear() {
          return new _BaggageImpl();
        }
      };
      exports.BaggageImpl = BaggageImpl;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/baggage/internal/symbol.js
  var require_symbol = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/baggage/internal/symbol.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.baggageEntryMetadataSymbol = void 0;
      exports.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/baggage/utils.js
  var require_utils5 = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/baggage/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.baggageEntryMetadataFromString = exports.createBaggage = void 0;
      var diag_1 = require_diag();
      var baggage_impl_1 = require_baggage_impl();
      var symbol_1 = require_symbol();
      var diag = diag_1.DiagAPI.instance();
      function createBaggage(entries = {}) {
        return new baggage_impl_1.BaggageImpl(new Map(Object.entries(entries)));
      }
      exports.createBaggage = createBaggage;
      function baggageEntryMetadataFromString(str2) {
        if (typeof str2 !== "string") {
          diag.error(`Cannot create baggage metadata from unknown type: ${typeof str2}`);
          str2 = "";
        }
        return {
          __TYPE__: symbol_1.baggageEntryMetadataSymbol,
          toString() {
            return str2;
          }
        };
      }
      exports.baggageEntryMetadataFromString = baggageEntryMetadataFromString;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/context/context.js
  var require_context = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/context/context.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ROOT_CONTEXT = exports.createContextKey = void 0;
      function createContextKey(description) {
        return Symbol.for(description);
      }
      exports.createContextKey = createContextKey;
      var BaseContext = class _BaseContext {
        /**
         * Construct a new context which inherits values from an optional parent context.
         *
         * @param parentContext a context from which to inherit values
         */
        constructor(parentContext) {
          const self2 = this;
          self2._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
          self2.getValue = (key) => self2._currentContext.get(key);
          self2.setValue = (key, value) => {
            const context2 = new _BaseContext(self2._currentContext);
            context2._currentContext.set(key, value);
            return context2;
          };
          self2.deleteValue = (key) => {
            const context2 = new _BaseContext(self2._currentContext);
            context2._currentContext.delete(key);
            return context2;
          };
        }
      };
      exports.ROOT_CONTEXT = new BaseContext();
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/diag/consoleLogger.js
  var require_consoleLogger = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/diag/consoleLogger.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DiagConsoleLogger = void 0;
      var consoleMap = [
        { n: "error", c: "error" },
        { n: "warn", c: "warn" },
        { n: "info", c: "info" },
        { n: "debug", c: "debug" },
        { n: "verbose", c: "trace" }
      ];
      var DiagConsoleLogger = class {
        constructor() {
          function _consoleFunc(funcName) {
            return function(...args) {
              if (console) {
                let theFunc = console[funcName];
                if (typeof theFunc !== "function") {
                  theFunc = console.log;
                }
                if (typeof theFunc === "function") {
                  return theFunc.apply(console, args);
                }
              }
            };
          }
          for (let i = 0; i < consoleMap.length; i++) {
            this[consoleMap[i].n] = _consoleFunc(consoleMap[i].c);
          }
        }
      };
      exports.DiagConsoleLogger = DiagConsoleLogger;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/metrics/NoopMeter.js
  var require_NoopMeter = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/metrics/NoopMeter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createNoopMeter = exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = exports.NOOP_OBSERVABLE_GAUGE_METRIC = exports.NOOP_OBSERVABLE_COUNTER_METRIC = exports.NOOP_UP_DOWN_COUNTER_METRIC = exports.NOOP_HISTOGRAM_METRIC = exports.NOOP_COUNTER_METRIC = exports.NOOP_METER = exports.NoopObservableUpDownCounterMetric = exports.NoopObservableGaugeMetric = exports.NoopObservableCounterMetric = exports.NoopObservableMetric = exports.NoopHistogramMetric = exports.NoopUpDownCounterMetric = exports.NoopCounterMetric = exports.NoopMetric = exports.NoopMeter = void 0;
      var NoopMeter = class {
        constructor() {
        }
        /**
         * @see {@link Meter.createHistogram}
         */
        createHistogram(_name, _options) {
          return exports.NOOP_HISTOGRAM_METRIC;
        }
        /**
         * @see {@link Meter.createCounter}
         */
        createCounter(_name, _options) {
          return exports.NOOP_COUNTER_METRIC;
        }
        /**
         * @see {@link Meter.createUpDownCounter}
         */
        createUpDownCounter(_name, _options) {
          return exports.NOOP_UP_DOWN_COUNTER_METRIC;
        }
        /**
         * @see {@link Meter.createObservableGauge}
         */
        createObservableGauge(_name, _options) {
          return exports.NOOP_OBSERVABLE_GAUGE_METRIC;
        }
        /**
         * @see {@link Meter.createObservableCounter}
         */
        createObservableCounter(_name, _options) {
          return exports.NOOP_OBSERVABLE_COUNTER_METRIC;
        }
        /**
         * @see {@link Meter.createObservableUpDownCounter}
         */
        createObservableUpDownCounter(_name, _options) {
          return exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
        }
        /**
         * @see {@link Meter.addBatchObservableCallback}
         */
        addBatchObservableCallback(_callback, _observables) {
        }
        /**
         * @see {@link Meter.removeBatchObservableCallback}
         */
        removeBatchObservableCallback(_callback) {
        }
      };
      exports.NoopMeter = NoopMeter;
      var NoopMetric = class {
      };
      exports.NoopMetric = NoopMetric;
      var NoopCounterMetric = class extends NoopMetric {
        add(_value, _attributes) {
        }
      };
      exports.NoopCounterMetric = NoopCounterMetric;
      var NoopUpDownCounterMetric = class extends NoopMetric {
        add(_value, _attributes) {
        }
      };
      exports.NoopUpDownCounterMetric = NoopUpDownCounterMetric;
      var NoopHistogramMetric = class extends NoopMetric {
        record(_value, _attributes) {
        }
      };
      exports.NoopHistogramMetric = NoopHistogramMetric;
      var NoopObservableMetric = class {
        addCallback(_callback) {
        }
        removeCallback(_callback) {
        }
      };
      exports.NoopObservableMetric = NoopObservableMetric;
      var NoopObservableCounterMetric = class extends NoopObservableMetric {
      };
      exports.NoopObservableCounterMetric = NoopObservableCounterMetric;
      var NoopObservableGaugeMetric = class extends NoopObservableMetric {
      };
      exports.NoopObservableGaugeMetric = NoopObservableGaugeMetric;
      var NoopObservableUpDownCounterMetric = class extends NoopObservableMetric {
      };
      exports.NoopObservableUpDownCounterMetric = NoopObservableUpDownCounterMetric;
      exports.NOOP_METER = new NoopMeter();
      exports.NOOP_COUNTER_METRIC = new NoopCounterMetric();
      exports.NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
      exports.NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
      exports.NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
      exports.NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
      exports.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();
      function createNoopMeter() {
        return exports.NOOP_METER;
      }
      exports.createNoopMeter = createNoopMeter;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/metrics/Metric.js
  var require_Metric = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/metrics/Metric.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ValueType = void 0;
      var ValueType;
      (function(ValueType2) {
        ValueType2[ValueType2["INT"] = 0] = "INT";
        ValueType2[ValueType2["DOUBLE"] = 1] = "DOUBLE";
      })(ValueType = exports.ValueType || (exports.ValueType = {}));
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/propagation/TextMapPropagator.js
  var require_TextMapPropagator = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/propagation/TextMapPropagator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.defaultTextMapSetter = exports.defaultTextMapGetter = void 0;
      exports.defaultTextMapGetter = {
        get(carrier, key) {
          if (carrier == null) {
            return void 0;
          }
          return carrier[key];
        },
        keys(carrier) {
          if (carrier == null) {
            return [];
          }
          return Object.keys(carrier);
        }
      };
      exports.defaultTextMapSetter = {
        set(carrier, key, value) {
          if (carrier == null) {
            return;
          }
          carrier[key] = value;
        }
      };
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/context/NoopContextManager.js
  var require_NoopContextManager = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/context/NoopContextManager.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NoopContextManager = void 0;
      var context_1 = require_context();
      var NoopContextManager = class {
        active() {
          return context_1.ROOT_CONTEXT;
        }
        with(_context, fn, thisArg, ...args) {
          return fn.call(thisArg, ...args);
        }
        bind(_context, target) {
          return target;
        }
        enable() {
          return this;
        }
        disable() {
          return this;
        }
      };
      exports.NoopContextManager = NoopContextManager;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/api/context.js
  var require_context2 = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/api/context.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ContextAPI = void 0;
      var NoopContextManager_1 = require_NoopContextManager();
      var global_utils_1 = require_global_utils();
      var diag_1 = require_diag();
      var API_NAME = "context";
      var NOOP_CONTEXT_MANAGER = new NoopContextManager_1.NoopContextManager();
      var ContextAPI = class _ContextAPI {
        /** Empty private constructor prevents end users from constructing a new instance of the API */
        constructor() {
        }
        /** Get the singleton instance of the Context API */
        static getInstance() {
          if (!this._instance) {
            this._instance = new _ContextAPI();
          }
          return this._instance;
        }
        /**
         * Set the current context manager.
         *
         * @returns true if the context manager was successfully registered, else false
         */
        setGlobalContextManager(contextManager) {
          return (0, global_utils_1.registerGlobal)(API_NAME, contextManager, diag_1.DiagAPI.instance());
        }
        /**
         * Get the currently active context
         */
        active() {
          return this._getContextManager().active();
        }
        /**
         * Execute a function with an active context
         *
         * @param context context to be active during function execution
         * @param fn function to execute in a context
         * @param thisArg optional receiver to be used for calling fn
         * @param args optional arguments forwarded to fn
         */
        with(context2, fn, thisArg, ...args) {
          return this._getContextManager().with(context2, fn, thisArg, ...args);
        }
        /**
         * Bind a context to a target function or event emitter
         *
         * @param context context to bind to the event emitter or function. Defaults to the currently active context
         * @param target function or event emitter to bind
         */
        bind(context2, target) {
          return this._getContextManager().bind(context2, target);
        }
        _getContextManager() {
          return (0, global_utils_1.getGlobal)(API_NAME) || NOOP_CONTEXT_MANAGER;
        }
        /** Disable and remove the global context manager */
        disable() {
          this._getContextManager().disable();
          (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
        }
      };
      exports.ContextAPI = ContextAPI;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/trace_flags.js
  var require_trace_flags = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/trace_flags.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TraceFlags = void 0;
      var TraceFlags;
      (function(TraceFlags2) {
        TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
        TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
      })(TraceFlags = exports.TraceFlags || (exports.TraceFlags = {}));
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/invalid-span-constants.js
  var require_invalid_span_constants = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/invalid-span-constants.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.INVALID_SPAN_CONTEXT = exports.INVALID_TRACEID = exports.INVALID_SPANID = void 0;
      var trace_flags_1 = require_trace_flags();
      exports.INVALID_SPANID = "0000000000000000";
      exports.INVALID_TRACEID = "00000000000000000000000000000000";
      exports.INVALID_SPAN_CONTEXT = {
        traceId: exports.INVALID_TRACEID,
        spanId: exports.INVALID_SPANID,
        traceFlags: trace_flags_1.TraceFlags.NONE
      };
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/NonRecordingSpan.js
  var require_NonRecordingSpan = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/NonRecordingSpan.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NonRecordingSpan = void 0;
      var invalid_span_constants_1 = require_invalid_span_constants();
      var NonRecordingSpan = class {
        constructor(_spanContext = invalid_span_constants_1.INVALID_SPAN_CONTEXT) {
          this._spanContext = _spanContext;
        }
        // Returns a SpanContext.
        spanContext() {
          return this._spanContext;
        }
        // By default does nothing
        setAttribute(_key, _value) {
          return this;
        }
        // By default does nothing
        setAttributes(_attributes) {
          return this;
        }
        // By default does nothing
        addEvent(_name, _attributes) {
          return this;
        }
        // By default does nothing
        setStatus(_status) {
          return this;
        }
        // By default does nothing
        updateName(_name) {
          return this;
        }
        // By default does nothing
        end(_endTime) {
        }
        // isRecording always returns false for NonRecordingSpan.
        isRecording() {
          return false;
        }
        // By default does nothing
        recordException(_exception, _time) {
        }
      };
      exports.NonRecordingSpan = NonRecordingSpan;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/context-utils.js
  var require_context_utils = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/context-utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getSpanContext = exports.setSpanContext = exports.deleteSpan = exports.setSpan = exports.getActiveSpan = exports.getSpan = void 0;
      var context_1 = require_context();
      var NonRecordingSpan_1 = require_NonRecordingSpan();
      var context_2 = require_context2();
      var SPAN_KEY = (0, context_1.createContextKey)("OpenTelemetry Context Key SPAN");
      function getSpan(context2) {
        return context2.getValue(SPAN_KEY) || void 0;
      }
      exports.getSpan = getSpan;
      function getActiveSpan() {
        return getSpan(context_2.ContextAPI.getInstance().active());
      }
      exports.getActiveSpan = getActiveSpan;
      function setSpan(context2, span) {
        return context2.setValue(SPAN_KEY, span);
      }
      exports.setSpan = setSpan;
      function deleteSpan(context2) {
        return context2.deleteValue(SPAN_KEY);
      }
      exports.deleteSpan = deleteSpan;
      function setSpanContext(context2, spanContext) {
        return setSpan(context2, new NonRecordingSpan_1.NonRecordingSpan(spanContext));
      }
      exports.setSpanContext = setSpanContext;
      function getSpanContext(context2) {
        var _a;
        return (_a = getSpan(context2)) === null || _a === void 0 ? void 0 : _a.spanContext();
      }
      exports.getSpanContext = getSpanContext;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/spancontext-utils.js
  var require_spancontext_utils = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/spancontext-utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapSpanContext = exports.isSpanContextValid = exports.isValidSpanId = exports.isValidTraceId = void 0;
      var invalid_span_constants_1 = require_invalid_span_constants();
      var NonRecordingSpan_1 = require_NonRecordingSpan();
      var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
      var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
      function isValidTraceId(traceId) {
        return VALID_TRACEID_REGEX.test(traceId) && traceId !== invalid_span_constants_1.INVALID_TRACEID;
      }
      exports.isValidTraceId = isValidTraceId;
      function isValidSpanId(spanId) {
        return VALID_SPANID_REGEX.test(spanId) && spanId !== invalid_span_constants_1.INVALID_SPANID;
      }
      exports.isValidSpanId = isValidSpanId;
      function isSpanContextValid(spanContext) {
        return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
      }
      exports.isSpanContextValid = isSpanContextValid;
      function wrapSpanContext(spanContext) {
        return new NonRecordingSpan_1.NonRecordingSpan(spanContext);
      }
      exports.wrapSpanContext = wrapSpanContext;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/NoopTracer.js
  var require_NoopTracer = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/NoopTracer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NoopTracer = void 0;
      var context_1 = require_context2();
      var context_utils_1 = require_context_utils();
      var NonRecordingSpan_1 = require_NonRecordingSpan();
      var spancontext_utils_1 = require_spancontext_utils();
      var contextApi = context_1.ContextAPI.getInstance();
      var NoopTracer = class {
        // startSpan starts a noop span.
        startSpan(name, options, context2 = contextApi.active()) {
          const root = Boolean(options === null || options === void 0 ? void 0 : options.root);
          if (root) {
            return new NonRecordingSpan_1.NonRecordingSpan();
          }
          const parentFromContext = context2 && (0, context_utils_1.getSpanContext)(context2);
          if (isSpanContext(parentFromContext) && (0, spancontext_utils_1.isSpanContextValid)(parentFromContext)) {
            return new NonRecordingSpan_1.NonRecordingSpan(parentFromContext);
          } else {
            return new NonRecordingSpan_1.NonRecordingSpan();
          }
        }
        startActiveSpan(name, arg2, arg3, arg4) {
          let opts;
          let ctx;
          let fn;
          if (arguments.length < 2) {
            return;
          } else if (arguments.length === 2) {
            fn = arg2;
          } else if (arguments.length === 3) {
            opts = arg2;
            fn = arg3;
          } else {
            opts = arg2;
            ctx = arg3;
            fn = arg4;
          }
          const parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
          const span = this.startSpan(name, opts, parentContext);
          const contextWithSpanSet = (0, context_utils_1.setSpan)(parentContext, span);
          return contextApi.with(contextWithSpanSet, fn, void 0, span);
        }
      };
      exports.NoopTracer = NoopTracer;
      function isSpanContext(spanContext) {
        return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
      }
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/ProxyTracer.js
  var require_ProxyTracer = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/ProxyTracer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ProxyTracer = void 0;
      var NoopTracer_1 = require_NoopTracer();
      var NOOP_TRACER = new NoopTracer_1.NoopTracer();
      var ProxyTracer = class {
        constructor(_provider, name, version, options) {
          this._provider = _provider;
          this.name = name;
          this.version = version;
          this.options = options;
        }
        startSpan(name, options, context2) {
          return this._getTracer().startSpan(name, options, context2);
        }
        startActiveSpan(_name, _options, _context, _fn) {
          const tracer = this._getTracer();
          return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
        }
        /**
         * Try to get a tracer from the proxy tracer provider.
         * If the proxy tracer provider has no delegate, return a noop tracer.
         */
        _getTracer() {
          if (this._delegate) {
            return this._delegate;
          }
          const tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
          if (!tracer) {
            return NOOP_TRACER;
          }
          this._delegate = tracer;
          return this._delegate;
        }
      };
      exports.ProxyTracer = ProxyTracer;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/NoopTracerProvider.js
  var require_NoopTracerProvider = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/NoopTracerProvider.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NoopTracerProvider = void 0;
      var NoopTracer_1 = require_NoopTracer();
      var NoopTracerProvider = class {
        getTracer(_name, _version, _options) {
          return new NoopTracer_1.NoopTracer();
        }
      };
      exports.NoopTracerProvider = NoopTracerProvider;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/ProxyTracerProvider.js
  var require_ProxyTracerProvider = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/ProxyTracerProvider.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ProxyTracerProvider = void 0;
      var ProxyTracer_1 = require_ProxyTracer();
      var NoopTracerProvider_1 = require_NoopTracerProvider();
      var NOOP_TRACER_PROVIDER = new NoopTracerProvider_1.NoopTracerProvider();
      var ProxyTracerProvider = class {
        /**
         * Get a {@link ProxyTracer}
         */
        getTracer(name, version, options) {
          var _a;
          return (_a = this.getDelegateTracer(name, version, options)) !== null && _a !== void 0 ? _a : new ProxyTracer_1.ProxyTracer(this, name, version, options);
        }
        getDelegate() {
          var _a;
          return (_a = this._delegate) !== null && _a !== void 0 ? _a : NOOP_TRACER_PROVIDER;
        }
        /**
         * Set the delegate tracer provider
         */
        setDelegate(delegate) {
          this._delegate = delegate;
        }
        getDelegateTracer(name, version, options) {
          var _a;
          return (_a = this._delegate) === null || _a === void 0 ? void 0 : _a.getTracer(name, version, options);
        }
      };
      exports.ProxyTracerProvider = ProxyTracerProvider;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/SamplingResult.js
  var require_SamplingResult = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/SamplingResult.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SamplingDecision = void 0;
      var SamplingDecision;
      (function(SamplingDecision2) {
        SamplingDecision2[SamplingDecision2["NOT_RECORD"] = 0] = "NOT_RECORD";
        SamplingDecision2[SamplingDecision2["RECORD"] = 1] = "RECORD";
        SamplingDecision2[SamplingDecision2["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
      })(SamplingDecision = exports.SamplingDecision || (exports.SamplingDecision = {}));
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/span_kind.js
  var require_span_kind = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/span_kind.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SpanKind = void 0;
      var SpanKind;
      (function(SpanKind2) {
        SpanKind2[SpanKind2["INTERNAL"] = 0] = "INTERNAL";
        SpanKind2[SpanKind2["SERVER"] = 1] = "SERVER";
        SpanKind2[SpanKind2["CLIENT"] = 2] = "CLIENT";
        SpanKind2[SpanKind2["PRODUCER"] = 3] = "PRODUCER";
        SpanKind2[SpanKind2["CONSUMER"] = 4] = "CONSUMER";
      })(SpanKind = exports.SpanKind || (exports.SpanKind = {}));
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/status.js
  var require_status = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/status.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SpanStatusCode = void 0;
      var SpanStatusCode2;
      (function(SpanStatusCode3) {
        SpanStatusCode3[SpanStatusCode3["UNSET"] = 0] = "UNSET";
        SpanStatusCode3[SpanStatusCode3["OK"] = 1] = "OK";
        SpanStatusCode3[SpanStatusCode3["ERROR"] = 2] = "ERROR";
      })(SpanStatusCode2 = exports.SpanStatusCode || (exports.SpanStatusCode = {}));
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-validators.js
  var require_tracestate_validators = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-validators.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateValue = exports.validateKey = void 0;
      var VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
      var VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
      var VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
      var VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
      var VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
      var INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
      function validateKey(key) {
        return VALID_KEY_REGEX.test(key);
      }
      exports.validateKey = validateKey;
      function validateValue(value) {
        return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
      }
      exports.validateValue = validateValue;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-impl.js
  var require_tracestate_impl = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/internal/tracestate-impl.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TraceStateImpl = void 0;
      var tracestate_validators_1 = require_tracestate_validators();
      var MAX_TRACE_STATE_ITEMS = 32;
      var MAX_TRACE_STATE_LEN = 512;
      var LIST_MEMBERS_SEPARATOR = ",";
      var LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
      var TraceStateImpl = class _TraceStateImpl {
        constructor(rawTraceState) {
          this._internalState = /* @__PURE__ */ new Map();
          if (rawTraceState)
            this._parse(rawTraceState);
        }
        set(key, value) {
          const traceState = this._clone();
          if (traceState._internalState.has(key)) {
            traceState._internalState.delete(key);
          }
          traceState._internalState.set(key, value);
          return traceState;
        }
        unset(key) {
          const traceState = this._clone();
          traceState._internalState.delete(key);
          return traceState;
        }
        get(key) {
          return this._internalState.get(key);
        }
        serialize() {
          return this._keys().reduce((agg, key) => {
            agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
            return agg;
          }, []).join(LIST_MEMBERS_SEPARATOR);
        }
        _parse(rawTraceState) {
          if (rawTraceState.length > MAX_TRACE_STATE_LEN)
            return;
          this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce((agg, part) => {
            const listMember = part.trim();
            const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
            if (i !== -1) {
              const key = listMember.slice(0, i);
              const value = listMember.slice(i + 1, part.length);
              if ((0, tracestate_validators_1.validateKey)(key) && (0, tracestate_validators_1.validateValue)(value)) {
                agg.set(key, value);
              } else {
              }
            }
            return agg;
          }, /* @__PURE__ */ new Map());
          if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
            this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
          }
        }
        _keys() {
          return Array.from(this._internalState.keys()).reverse();
        }
        _clone() {
          const traceState = new _TraceStateImpl();
          traceState._internalState = new Map(this._internalState);
          return traceState;
        }
      };
      exports.TraceStateImpl = TraceStateImpl;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/internal/utils.js
  var require_utils6 = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace/internal/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createTraceState = void 0;
      var tracestate_impl_1 = require_tracestate_impl();
      function createTraceState(rawTraceState) {
        return new tracestate_impl_1.TraceStateImpl(rawTraceState);
      }
      exports.createTraceState = createTraceState;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/context-api.js
  var require_context_api = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/context-api.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.context = void 0;
      var context_1 = require_context2();
      exports.context = context_1.ContextAPI.getInstance();
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/diag-api.js
  var require_diag_api = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/diag-api.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.diag = void 0;
      var diag_1 = require_diag();
      exports.diag = diag_1.DiagAPI.instance();
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/metrics/NoopMeterProvider.js
  var require_NoopMeterProvider = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/metrics/NoopMeterProvider.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NOOP_METER_PROVIDER = exports.NoopMeterProvider = void 0;
      var NoopMeter_1 = require_NoopMeter();
      var NoopMeterProvider = class {
        getMeter(_name, _version, _options) {
          return NoopMeter_1.NOOP_METER;
        }
      };
      exports.NoopMeterProvider = NoopMeterProvider;
      exports.NOOP_METER_PROVIDER = new NoopMeterProvider();
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/api/metrics.js
  var require_metrics = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/api/metrics.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MetricsAPI = void 0;
      var NoopMeterProvider_1 = require_NoopMeterProvider();
      var global_utils_1 = require_global_utils();
      var diag_1 = require_diag();
      var API_NAME = "metrics";
      var MetricsAPI = class _MetricsAPI {
        /** Empty private constructor prevents end users from constructing a new instance of the API */
        constructor() {
        }
        /** Get the singleton instance of the Metrics API */
        static getInstance() {
          if (!this._instance) {
            this._instance = new _MetricsAPI();
          }
          return this._instance;
        }
        /**
         * Set the current global meter provider.
         * Returns true if the meter provider was successfully registered, else false.
         */
        setGlobalMeterProvider(provider) {
          return (0, global_utils_1.registerGlobal)(API_NAME, provider, diag_1.DiagAPI.instance());
        }
        /**
         * Returns the global meter provider.
         */
        getMeterProvider() {
          return (0, global_utils_1.getGlobal)(API_NAME) || NoopMeterProvider_1.NOOP_METER_PROVIDER;
        }
        /**
         * Returns a meter from the global meter provider.
         */
        getMeter(name, version, options) {
          return this.getMeterProvider().getMeter(name, version, options);
        }
        /** Remove the global meter provider */
        disable() {
          (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
        }
      };
      exports.MetricsAPI = MetricsAPI;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/metrics-api.js
  var require_metrics_api = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/metrics-api.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.metrics = void 0;
      var metrics_1 = require_metrics();
      exports.metrics = metrics_1.MetricsAPI.getInstance();
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/propagation/NoopTextMapPropagator.js
  var require_NoopTextMapPropagator = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/propagation/NoopTextMapPropagator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NoopTextMapPropagator = void 0;
      var NoopTextMapPropagator = class {
        /** Noop inject function does nothing */
        inject(_context, _carrier) {
        }
        /** Noop extract function does nothing and returns the input context */
        extract(context2, _carrier) {
          return context2;
        }
        fields() {
          return [];
        }
      };
      exports.NoopTextMapPropagator = NoopTextMapPropagator;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/baggage/context-helpers.js
  var require_context_helpers = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/baggage/context-helpers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.deleteBaggage = exports.setBaggage = exports.getActiveBaggage = exports.getBaggage = void 0;
      var context_1 = require_context2();
      var context_2 = require_context();
      var BAGGAGE_KEY = (0, context_2.createContextKey)("OpenTelemetry Baggage Key");
      function getBaggage(context2) {
        return context2.getValue(BAGGAGE_KEY) || void 0;
      }
      exports.getBaggage = getBaggage;
      function getActiveBaggage() {
        return getBaggage(context_1.ContextAPI.getInstance().active());
      }
      exports.getActiveBaggage = getActiveBaggage;
      function setBaggage(context2, baggage) {
        return context2.setValue(BAGGAGE_KEY, baggage);
      }
      exports.setBaggage = setBaggage;
      function deleteBaggage(context2) {
        return context2.deleteValue(BAGGAGE_KEY);
      }
      exports.deleteBaggage = deleteBaggage;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/api/propagation.js
  var require_propagation = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/api/propagation.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PropagationAPI = void 0;
      var global_utils_1 = require_global_utils();
      var NoopTextMapPropagator_1 = require_NoopTextMapPropagator();
      var TextMapPropagator_1 = require_TextMapPropagator();
      var context_helpers_1 = require_context_helpers();
      var utils_1 = require_utils5();
      var diag_1 = require_diag();
      var API_NAME = "propagation";
      var NOOP_TEXT_MAP_PROPAGATOR = new NoopTextMapPropagator_1.NoopTextMapPropagator();
      var PropagationAPI = class _PropagationAPI {
        /** Empty private constructor prevents end users from constructing a new instance of the API */
        constructor() {
          this.createBaggage = utils_1.createBaggage;
          this.getBaggage = context_helpers_1.getBaggage;
          this.getActiveBaggage = context_helpers_1.getActiveBaggage;
          this.setBaggage = context_helpers_1.setBaggage;
          this.deleteBaggage = context_helpers_1.deleteBaggage;
        }
        /** Get the singleton instance of the Propagator API */
        static getInstance() {
          if (!this._instance) {
            this._instance = new _PropagationAPI();
          }
          return this._instance;
        }
        /**
         * Set the current propagator.
         *
         * @returns true if the propagator was successfully registered, else false
         */
        setGlobalPropagator(propagator) {
          return (0, global_utils_1.registerGlobal)(API_NAME, propagator, diag_1.DiagAPI.instance());
        }
        /**
         * Inject context into a carrier to be propagated inter-process
         *
         * @param context Context carrying tracing data to inject
         * @param carrier carrier to inject context into
         * @param setter Function used to set values on the carrier
         */
        inject(context2, carrier, setter = TextMapPropagator_1.defaultTextMapSetter) {
          return this._getGlobalPropagator().inject(context2, carrier, setter);
        }
        /**
         * Extract context from a carrier
         *
         * @param context Context which the newly created context will inherit from
         * @param carrier Carrier to extract context from
         * @param getter Function used to extract keys from a carrier
         */
        extract(context2, carrier, getter = TextMapPropagator_1.defaultTextMapGetter) {
          return this._getGlobalPropagator().extract(context2, carrier, getter);
        }
        /**
         * Return a list of all fields which may be used by the propagator.
         */
        fields() {
          return this._getGlobalPropagator().fields();
        }
        /** Remove the global propagator */
        disable() {
          (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
        }
        _getGlobalPropagator() {
          return (0, global_utils_1.getGlobal)(API_NAME) || NOOP_TEXT_MAP_PROPAGATOR;
        }
      };
      exports.PropagationAPI = PropagationAPI;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/propagation-api.js
  var require_propagation_api = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/propagation-api.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.propagation = void 0;
      var propagation_1 = require_propagation();
      exports.propagation = propagation_1.PropagationAPI.getInstance();
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/api/trace.js
  var require_trace = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/api/trace.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TraceAPI = void 0;
      var global_utils_1 = require_global_utils();
      var ProxyTracerProvider_1 = require_ProxyTracerProvider();
      var spancontext_utils_1 = require_spancontext_utils();
      var context_utils_1 = require_context_utils();
      var diag_1 = require_diag();
      var API_NAME = "trace";
      var TraceAPI = class _TraceAPI {
        /** Empty private constructor prevents end users from constructing a new instance of the API */
        constructor() {
          this._proxyTracerProvider = new ProxyTracerProvider_1.ProxyTracerProvider();
          this.wrapSpanContext = spancontext_utils_1.wrapSpanContext;
          this.isSpanContextValid = spancontext_utils_1.isSpanContextValid;
          this.deleteSpan = context_utils_1.deleteSpan;
          this.getSpan = context_utils_1.getSpan;
          this.getActiveSpan = context_utils_1.getActiveSpan;
          this.getSpanContext = context_utils_1.getSpanContext;
          this.setSpan = context_utils_1.setSpan;
          this.setSpanContext = context_utils_1.setSpanContext;
        }
        /** Get the singleton instance of the Trace API */
        static getInstance() {
          if (!this._instance) {
            this._instance = new _TraceAPI();
          }
          return this._instance;
        }
        /**
         * Set the current global tracer.
         *
         * @returns true if the tracer provider was successfully registered, else false
         */
        setGlobalTracerProvider(provider) {
          const success = (0, global_utils_1.registerGlobal)(API_NAME, this._proxyTracerProvider, diag_1.DiagAPI.instance());
          if (success) {
            this._proxyTracerProvider.setDelegate(provider);
          }
          return success;
        }
        /**
         * Returns the global tracer provider.
         */
        getTracerProvider() {
          return (0, global_utils_1.getGlobal)(API_NAME) || this._proxyTracerProvider;
        }
        /**
         * Returns a tracer from the global tracer provider.
         */
        getTracer(name, version) {
          return this.getTracerProvider().getTracer(name, version);
        }
        /** Remove the global tracer provider */
        disable() {
          (0, global_utils_1.unregisterGlobal)(API_NAME, diag_1.DiagAPI.instance());
          this._proxyTracerProvider = new ProxyTracerProvider_1.ProxyTracerProvider();
        }
      };
      exports.TraceAPI = TraceAPI;
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace-api.js
  var require_trace_api = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/trace-api.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.trace = void 0;
      var trace_1 = require_trace();
      exports.trace = trace_1.TraceAPI.getInstance();
    }
  });

  // ../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/index.js
  var require_src = __commonJS({
    "../../../.yarn/cache/@opentelemetry-api-npm-1.7.0-6263fad98a-b5468115d1.zip/node_modules/@opentelemetry/api/build/src/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.trace = exports.propagation = exports.metrics = exports.diag = exports.context = exports.INVALID_SPAN_CONTEXT = exports.INVALID_TRACEID = exports.INVALID_SPANID = exports.isValidSpanId = exports.isValidTraceId = exports.isSpanContextValid = exports.createTraceState = exports.TraceFlags = exports.SpanStatusCode = exports.SpanKind = exports.SamplingDecision = exports.ProxyTracerProvider = exports.ProxyTracer = exports.defaultTextMapSetter = exports.defaultTextMapGetter = exports.ValueType = exports.createNoopMeter = exports.DiagLogLevel = exports.DiagConsoleLogger = exports.ROOT_CONTEXT = exports.createContextKey = exports.baggageEntryMetadataFromString = void 0;
      var utils_1 = require_utils5();
      Object.defineProperty(exports, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
        return utils_1.baggageEntryMetadataFromString;
      } });
      var context_1 = require_context();
      Object.defineProperty(exports, "createContextKey", { enumerable: true, get: function() {
        return context_1.createContextKey;
      } });
      Object.defineProperty(exports, "ROOT_CONTEXT", { enumerable: true, get: function() {
        return context_1.ROOT_CONTEXT;
      } });
      var consoleLogger_1 = require_consoleLogger();
      Object.defineProperty(exports, "DiagConsoleLogger", { enumerable: true, get: function() {
        return consoleLogger_1.DiagConsoleLogger;
      } });
      var types_1 = require_types();
      Object.defineProperty(exports, "DiagLogLevel", { enumerable: true, get: function() {
        return types_1.DiagLogLevel;
      } });
      var NoopMeter_1 = require_NoopMeter();
      Object.defineProperty(exports, "createNoopMeter", { enumerable: true, get: function() {
        return NoopMeter_1.createNoopMeter;
      } });
      var Metric_1 = require_Metric();
      Object.defineProperty(exports, "ValueType", { enumerable: true, get: function() {
        return Metric_1.ValueType;
      } });
      var TextMapPropagator_1 = require_TextMapPropagator();
      Object.defineProperty(exports, "defaultTextMapGetter", { enumerable: true, get: function() {
        return TextMapPropagator_1.defaultTextMapGetter;
      } });
      Object.defineProperty(exports, "defaultTextMapSetter", { enumerable: true, get: function() {
        return TextMapPropagator_1.defaultTextMapSetter;
      } });
      var ProxyTracer_1 = require_ProxyTracer();
      Object.defineProperty(exports, "ProxyTracer", { enumerable: true, get: function() {
        return ProxyTracer_1.ProxyTracer;
      } });
      var ProxyTracerProvider_1 = require_ProxyTracerProvider();
      Object.defineProperty(exports, "ProxyTracerProvider", { enumerable: true, get: function() {
        return ProxyTracerProvider_1.ProxyTracerProvider;
      } });
      var SamplingResult_1 = require_SamplingResult();
      Object.defineProperty(exports, "SamplingDecision", { enumerable: true, get: function() {
        return SamplingResult_1.SamplingDecision;
      } });
      var span_kind_1 = require_span_kind();
      Object.defineProperty(exports, "SpanKind", { enumerable: true, get: function() {
        return span_kind_1.SpanKind;
      } });
      var status_1 = require_status();
      Object.defineProperty(exports, "SpanStatusCode", { enumerable: true, get: function() {
        return status_1.SpanStatusCode;
      } });
      var trace_flags_1 = require_trace_flags();
      Object.defineProperty(exports, "TraceFlags", { enumerable: true, get: function() {
        return trace_flags_1.TraceFlags;
      } });
      var utils_2 = require_utils6();
      Object.defineProperty(exports, "createTraceState", { enumerable: true, get: function() {
        return utils_2.createTraceState;
      } });
      var spancontext_utils_1 = require_spancontext_utils();
      Object.defineProperty(exports, "isSpanContextValid", { enumerable: true, get: function() {
        return spancontext_utils_1.isSpanContextValid;
      } });
      Object.defineProperty(exports, "isValidTraceId", { enumerable: true, get: function() {
        return spancontext_utils_1.isValidTraceId;
      } });
      Object.defineProperty(exports, "isValidSpanId", { enumerable: true, get: function() {
        return spancontext_utils_1.isValidSpanId;
      } });
      var invalid_span_constants_1 = require_invalid_span_constants();
      Object.defineProperty(exports, "INVALID_SPANID", { enumerable: true, get: function() {
        return invalid_span_constants_1.INVALID_SPANID;
      } });
      Object.defineProperty(exports, "INVALID_TRACEID", { enumerable: true, get: function() {
        return invalid_span_constants_1.INVALID_TRACEID;
      } });
      Object.defineProperty(exports, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
        return invalid_span_constants_1.INVALID_SPAN_CONTEXT;
      } });
      var context_api_1 = require_context_api();
      Object.defineProperty(exports, "context", { enumerable: true, get: function() {
        return context_api_1.context;
      } });
      var diag_api_1 = require_diag_api();
      Object.defineProperty(exports, "diag", { enumerable: true, get: function() {
        return diag_api_1.diag;
      } });
      var metrics_api_1 = require_metrics_api();
      Object.defineProperty(exports, "metrics", { enumerable: true, get: function() {
        return metrics_api_1.metrics;
      } });
      var propagation_api_1 = require_propagation_api();
      Object.defineProperty(exports, "propagation", { enumerable: true, get: function() {
        return propagation_api_1.propagation;
      } });
      var trace_api_1 = require_trace_api();
      Object.defineProperty(exports, "trace", { enumerable: true, get: function() {
        return trace_api_1.trace;
      } });
      exports.default = {
        context: context_api_1.context,
        diag: diag_api_1.diag,
        metrics: metrics_api_1.metrics,
        propagation: propagation_api_1.propagation,
        trace: trace_api_1.trace
      };
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.js
  var require_suppress_tracing = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isTracingSuppressed = exports.unsuppressTracing = exports.suppressTracing = void 0;
      var api_1 = require_src();
      var SUPPRESS_TRACING_KEY = (0, api_1.createContextKey)("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
      function suppressTracing(context2) {
        return context2.setValue(SUPPRESS_TRACING_KEY, true);
      }
      exports.suppressTracing = suppressTracing;
      function unsuppressTracing(context2) {
        return context2.deleteValue(SUPPRESS_TRACING_KEY);
      }
      exports.unsuppressTracing = unsuppressTracing;
      function isTracingSuppressed(context2) {
        return context2.getValue(SUPPRESS_TRACING_KEY) === true;
      }
      exports.isTracingSuppressed = isTracingSuppressed;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/baggage/constants.js
  var require_constants4 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/baggage/constants.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BAGGAGE_MAX_TOTAL_LENGTH = exports.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = exports.BAGGAGE_MAX_NAME_VALUE_PAIRS = exports.BAGGAGE_HEADER = exports.BAGGAGE_ITEMS_SEPARATOR = exports.BAGGAGE_PROPERTIES_SEPARATOR = exports.BAGGAGE_KEY_PAIR_SEPARATOR = void 0;
      exports.BAGGAGE_KEY_PAIR_SEPARATOR = "=";
      exports.BAGGAGE_PROPERTIES_SEPARATOR = ";";
      exports.BAGGAGE_ITEMS_SEPARATOR = ",";
      exports.BAGGAGE_HEADER = "baggage";
      exports.BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
      exports.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
      exports.BAGGAGE_MAX_TOTAL_LENGTH = 8192;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/baggage/utils.js
  var require_utils7 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/baggage/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseKeyPairsIntoRecord = exports.parsePairKeyValue = exports.getKeyPairs = exports.serializeKeyPairs = void 0;
      var api_1 = require_src();
      var constants_1 = require_constants4();
      function serializeKeyPairs(keyPairs) {
        return keyPairs.reduce((hValue, current) => {
          const value = `${hValue}${hValue !== "" ? constants_1.BAGGAGE_ITEMS_SEPARATOR : ""}${current}`;
          return value.length > constants_1.BAGGAGE_MAX_TOTAL_LENGTH ? hValue : value;
        }, "");
      }
      exports.serializeKeyPairs = serializeKeyPairs;
      function getKeyPairs(baggage) {
        return baggage.getAllEntries().map(([key, value]) => {
          let entry = `${encodeURIComponent(key)}=${encodeURIComponent(value.value)}`;
          if (value.metadata !== void 0) {
            entry += constants_1.BAGGAGE_PROPERTIES_SEPARATOR + value.metadata.toString();
          }
          return entry;
        });
      }
      exports.getKeyPairs = getKeyPairs;
      function parsePairKeyValue(entry) {
        const valueProps = entry.split(constants_1.BAGGAGE_PROPERTIES_SEPARATOR);
        if (valueProps.length <= 0)
          return;
        const keyPairPart = valueProps.shift();
        if (!keyPairPart)
          return;
        const separatorIndex = keyPairPart.indexOf(constants_1.BAGGAGE_KEY_PAIR_SEPARATOR);
        if (separatorIndex <= 0)
          return;
        const key = decodeURIComponent(keyPairPart.substring(0, separatorIndex).trim());
        const value = decodeURIComponent(keyPairPart.substring(separatorIndex + 1).trim());
        let metadata;
        if (valueProps.length > 0) {
          metadata = (0, api_1.baggageEntryMetadataFromString)(valueProps.join(constants_1.BAGGAGE_PROPERTIES_SEPARATOR));
        }
        return { key, value, metadata };
      }
      exports.parsePairKeyValue = parsePairKeyValue;
      function parseKeyPairsIntoRecord(value) {
        if (typeof value !== "string" || value.length === 0)
          return {};
        return value.split(constants_1.BAGGAGE_ITEMS_SEPARATOR).map((entry) => {
          return parsePairKeyValue(entry);
        }).filter((keyPair) => keyPair !== void 0 && keyPair.value.length > 0).reduce((headers, keyPair) => {
          headers[keyPair.key] = keyPair.value;
          return headers;
        }, {});
      }
      exports.parseKeyPairsIntoRecord = parseKeyPairsIntoRecord;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/baggage/propagation/W3CBaggagePropagator.js
  var require_W3CBaggagePropagator = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/baggage/propagation/W3CBaggagePropagator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.W3CBaggagePropagator = void 0;
      var api_1 = require_src();
      var suppress_tracing_1 = require_suppress_tracing();
      var constants_1 = require_constants4();
      var utils_1 = require_utils7();
      var W3CBaggagePropagator = class {
        inject(context2, carrier, setter) {
          const baggage = api_1.propagation.getBaggage(context2);
          if (!baggage || (0, suppress_tracing_1.isTracingSuppressed)(context2))
            return;
          const keyPairs = (0, utils_1.getKeyPairs)(baggage).filter((pair) => {
            return pair.length <= constants_1.BAGGAGE_MAX_PER_NAME_VALUE_PAIRS;
          }).slice(0, constants_1.BAGGAGE_MAX_NAME_VALUE_PAIRS);
          const headerValue = (0, utils_1.serializeKeyPairs)(keyPairs);
          if (headerValue.length > 0) {
            setter.set(carrier, constants_1.BAGGAGE_HEADER, headerValue);
          }
        }
        extract(context2, carrier, getter) {
          const headerValue = getter.get(carrier, constants_1.BAGGAGE_HEADER);
          const baggageString = Array.isArray(headerValue) ? headerValue.join(constants_1.BAGGAGE_ITEMS_SEPARATOR) : headerValue;
          if (!baggageString)
            return context2;
          const baggage = {};
          if (baggageString.length === 0) {
            return context2;
          }
          const pairs2 = baggageString.split(constants_1.BAGGAGE_ITEMS_SEPARATOR);
          pairs2.forEach((entry) => {
            const keyPair = (0, utils_1.parsePairKeyValue)(entry);
            if (keyPair) {
              const baggageEntry = { value: keyPair.value };
              if (keyPair.metadata) {
                baggageEntry.metadata = keyPair.metadata;
              }
              baggage[keyPair.key] = baggageEntry;
            }
          });
          if (Object.entries(baggage).length === 0) {
            return context2;
          }
          return api_1.propagation.setBaggage(context2, api_1.propagation.createBaggage(baggage));
        }
        fields() {
          return [constants_1.BAGGAGE_HEADER];
        }
      };
      exports.W3CBaggagePropagator = W3CBaggagePropagator;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/anchored-clock.js
  var require_anchored_clock = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/anchored-clock.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AnchoredClock = void 0;
      var AnchoredClock = class {
        /**
         * Create a new AnchoredClock anchored to the current time returned by systemClock.
         *
         * @param systemClock should be a clock that returns the number of milliseconds since January 1 1970 such as Date
         * @param monotonicClock should be a clock that counts milliseconds monotonically such as window.performance or perf_hooks.performance
         */
        constructor(systemClock, monotonicClock) {
          this._monotonicClock = monotonicClock;
          this._epochMillis = systemClock.now();
          this._performanceMillis = monotonicClock.now();
        }
        /**
         * Returns the current time by adding the number of milliseconds since the
         * AnchoredClock was created to the creation epoch time
         */
        now() {
          const delta = this._monotonicClock.now() - this._performanceMillis;
          return this._epochMillis + delta;
        }
      };
      exports.AnchoredClock = AnchoredClock;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/attributes.js
  var require_attributes = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/attributes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isAttributeValue = exports.isAttributeKey = exports.sanitizeAttributes = void 0;
      var api_1 = require_src();
      function sanitizeAttributes(attributes) {
        const out = {};
        if (typeof attributes !== "object" || attributes == null) {
          return out;
        }
        for (const [key, val] of Object.entries(attributes)) {
          if (!isAttributeKey(key)) {
            api_1.diag.warn(`Invalid attribute key: ${key}`);
            continue;
          }
          if (!isAttributeValue(val)) {
            api_1.diag.warn(`Invalid attribute value set for key: ${key}`);
            continue;
          }
          if (Array.isArray(val)) {
            out[key] = val.slice();
          } else {
            out[key] = val;
          }
        }
        return out;
      }
      exports.sanitizeAttributes = sanitizeAttributes;
      function isAttributeKey(key) {
        return typeof key === "string" && key.length > 0;
      }
      exports.isAttributeKey = isAttributeKey;
      function isAttributeValue(val) {
        if (val == null) {
          return true;
        }
        if (Array.isArray(val)) {
          return isHomogeneousAttributeValueArray(val);
        }
        return isValidPrimitiveAttributeValue(val);
      }
      exports.isAttributeValue = isAttributeValue;
      function isHomogeneousAttributeValueArray(arr) {
        let type2;
        for (const element of arr) {
          if (element == null)
            continue;
          if (!type2) {
            if (isValidPrimitiveAttributeValue(element)) {
              type2 = typeof element;
              continue;
            }
            return false;
          }
          if (typeof element === type2) {
            continue;
          }
          return false;
        }
        return true;
      }
      function isValidPrimitiveAttributeValue(val) {
        switch (typeof val) {
          case "number":
          case "boolean":
          case "string":
            return true;
        }
        return false;
      }
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/logging-error-handler.js
  var require_logging_error_handler = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/logging-error-handler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.loggingErrorHandler = void 0;
      var api_1 = require_src();
      function loggingErrorHandler() {
        return (ex) => {
          api_1.diag.error(stringifyException(ex));
        };
      }
      exports.loggingErrorHandler = loggingErrorHandler;
      function stringifyException(ex) {
        if (typeof ex === "string") {
          return ex;
        } else {
          return JSON.stringify(flattenException(ex));
        }
      }
      function flattenException(ex) {
        const result = {};
        let current = ex;
        while (current !== null) {
          Object.getOwnPropertyNames(current).forEach((propertyName) => {
            if (result[propertyName])
              return;
            const value = current[propertyName];
            if (value) {
              result[propertyName] = String(value);
            }
          });
          current = Object.getPrototypeOf(current);
        }
        return result;
      }
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/global-error-handler.js
  var require_global_error_handler = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/global-error-handler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.globalErrorHandler = exports.setGlobalErrorHandler = void 0;
      var logging_error_handler_1 = require_logging_error_handler();
      var delegateHandler = (0, logging_error_handler_1.loggingErrorHandler)();
      function setGlobalErrorHandler(handler) {
        delegateHandler = handler;
      }
      exports.setGlobalErrorHandler = setGlobalErrorHandler;
      function globalErrorHandler(ex) {
        try {
          delegateHandler(ex);
        } catch (_a) {
        }
      }
      exports.globalErrorHandler = globalErrorHandler;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/sampling.js
  var require_sampling = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/sampling.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TracesSamplerValues = void 0;
      var TracesSamplerValues;
      (function(TracesSamplerValues2) {
        TracesSamplerValues2["AlwaysOff"] = "always_off";
        TracesSamplerValues2["AlwaysOn"] = "always_on";
        TracesSamplerValues2["ParentBasedAlwaysOff"] = "parentbased_always_off";
        TracesSamplerValues2["ParentBasedAlwaysOn"] = "parentbased_always_on";
        TracesSamplerValues2["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
        TracesSamplerValues2["TraceIdRatio"] = "traceidratio";
      })(TracesSamplerValues = exports.TracesSamplerValues || (exports.TracesSamplerValues = {}));
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/browser/globalThis.js
  var require_globalThis2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/browser/globalThis.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports._globalThis = void 0;
      exports._globalThis = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/environment.js
  var require_environment = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/environment.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getEnvWithoutDefaults = exports.parseEnvironment = exports.DEFAULT_ENVIRONMENT = exports.DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT = exports.DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT = exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = void 0;
      var api_1 = require_src();
      var sampling_1 = require_sampling();
      var globalThis_1 = require_globalThis2();
      var DEFAULT_LIST_SEPARATOR = ",";
      var ENVIRONMENT_BOOLEAN_KEYS = ["OTEL_SDK_DISABLED"];
      function isEnvVarABoolean(key) {
        return ENVIRONMENT_BOOLEAN_KEYS.indexOf(key) > -1;
      }
      var ENVIRONMENT_NUMBERS_KEYS = [
        "OTEL_BSP_EXPORT_TIMEOUT",
        "OTEL_BSP_MAX_EXPORT_BATCH_SIZE",
        "OTEL_BSP_MAX_QUEUE_SIZE",
        "OTEL_BSP_SCHEDULE_DELAY",
        "OTEL_BLRP_EXPORT_TIMEOUT",
        "OTEL_BLRP_MAX_EXPORT_BATCH_SIZE",
        "OTEL_BLRP_MAX_QUEUE_SIZE",
        "OTEL_BLRP_SCHEDULE_DELAY",
        "OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT",
        "OTEL_ATTRIBUTE_COUNT_LIMIT",
        "OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT",
        "OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT",
        "OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT",
        "OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT",
        "OTEL_SPAN_EVENT_COUNT_LIMIT",
        "OTEL_SPAN_LINK_COUNT_LIMIT",
        "OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT",
        "OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT",
        "OTEL_EXPORTER_OTLP_TIMEOUT",
        "OTEL_EXPORTER_OTLP_TRACES_TIMEOUT",
        "OTEL_EXPORTER_OTLP_METRICS_TIMEOUT",
        "OTEL_EXPORTER_OTLP_LOGS_TIMEOUT",
        "OTEL_EXPORTER_JAEGER_AGENT_PORT"
      ];
      function isEnvVarANumber(key) {
        return ENVIRONMENT_NUMBERS_KEYS.indexOf(key) > -1;
      }
      var ENVIRONMENT_LISTS_KEYS = [
        "OTEL_NO_PATCH_MODULES",
        "OTEL_PROPAGATORS"
      ];
      function isEnvVarAList(key) {
        return ENVIRONMENT_LISTS_KEYS.indexOf(key) > -1;
      }
      exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = Infinity;
      exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
      exports.DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = 128;
      exports.DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT = 128;
      exports.DEFAULT_ENVIRONMENT = {
        OTEL_SDK_DISABLED: false,
        CONTAINER_NAME: "",
        ECS_CONTAINER_METADATA_URI_V4: "",
        ECS_CONTAINER_METADATA_URI: "",
        HOSTNAME: "",
        KUBERNETES_SERVICE_HOST: "",
        NAMESPACE: "",
        OTEL_BSP_EXPORT_TIMEOUT: 3e4,
        OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
        OTEL_BSP_MAX_QUEUE_SIZE: 2048,
        OTEL_BSP_SCHEDULE_DELAY: 5e3,
        OTEL_BLRP_EXPORT_TIMEOUT: 3e4,
        OTEL_BLRP_MAX_EXPORT_BATCH_SIZE: 512,
        OTEL_BLRP_MAX_QUEUE_SIZE: 2048,
        OTEL_BLRP_SCHEDULE_DELAY: 5e3,
        OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
        OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
        OTEL_EXPORTER_JAEGER_ENDPOINT: "",
        OTEL_EXPORTER_JAEGER_PASSWORD: "",
        OTEL_EXPORTER_JAEGER_USER: "",
        OTEL_EXPORTER_OTLP_ENDPOINT: "",
        OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
        OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
        OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: "",
        OTEL_EXPORTER_OTLP_HEADERS: "",
        OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
        OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
        OTEL_EXPORTER_OTLP_LOGS_HEADERS: "",
        OTEL_EXPORTER_OTLP_TIMEOUT: 1e4,
        OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 1e4,
        OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 1e4,
        OTEL_EXPORTER_OTLP_LOGS_TIMEOUT: 1e4,
        OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
        OTEL_LOG_LEVEL: api_1.DiagLogLevel.INFO,
        OTEL_NO_PATCH_MODULES: [],
        OTEL_PROPAGATORS: ["tracecontext", "baggage"],
        OTEL_RESOURCE_ATTRIBUTES: "",
        OTEL_SERVICE_NAME: "",
        OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        OTEL_ATTRIBUTE_COUNT_LIMIT: exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
        OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
        OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: exports.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT: exports.DEFAULT_ATTRIBUTE_COUNT_LIMIT,
        OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
        OTEL_SPAN_LINK_COUNT_LIMIT: 128,
        OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: exports.DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
        OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: exports.DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT,
        OTEL_TRACES_EXPORTER: "",
        OTEL_TRACES_SAMPLER: sampling_1.TracesSamplerValues.ParentBasedAlwaysOn,
        OTEL_TRACES_SAMPLER_ARG: "",
        OTEL_LOGS_EXPORTER: "",
        OTEL_EXPORTER_OTLP_INSECURE: "",
        OTEL_EXPORTER_OTLP_TRACES_INSECURE: "",
        OTEL_EXPORTER_OTLP_METRICS_INSECURE: "",
        OTEL_EXPORTER_OTLP_LOGS_INSECURE: "",
        OTEL_EXPORTER_OTLP_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_LOGS_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_COMPRESSION: "",
        OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: "",
        OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: "",
        OTEL_EXPORTER_OTLP_LOGS_COMPRESSION: "",
        OTEL_EXPORTER_OTLP_CLIENT_KEY: "",
        OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: "",
        OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: "",
        OTEL_EXPORTER_OTLP_LOGS_CLIENT_KEY: "",
        OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_LOGS_CLIENT_CERTIFICATE: "",
        OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
        OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: "http/protobuf",
        OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: "http/protobuf",
        OTEL_EXPORTER_OTLP_LOGS_PROTOCOL: "http/protobuf",
        OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: "cumulative"
      };
      function parseBoolean(key, environment, values) {
        if (typeof values[key] === "undefined") {
          return;
        }
        const value = String(values[key]);
        environment[key] = value.toLowerCase() === "true";
      }
      function parseNumber(name, environment, values, min = -Infinity, max = Infinity) {
        if (typeof values[name] !== "undefined") {
          const value = Number(values[name]);
          if (!isNaN(value)) {
            if (value < min) {
              environment[name] = min;
            } else if (value > max) {
              environment[name] = max;
            } else {
              environment[name] = value;
            }
          }
        }
      }
      function parseStringList(name, output, input, separator = DEFAULT_LIST_SEPARATOR) {
        const givenValue = input[name];
        if (typeof givenValue === "string") {
          output[name] = givenValue.split(separator).map((v) => v.trim());
        }
      }
      var logLevelMap = {
        ALL: api_1.DiagLogLevel.ALL,
        VERBOSE: api_1.DiagLogLevel.VERBOSE,
        DEBUG: api_1.DiagLogLevel.DEBUG,
        INFO: api_1.DiagLogLevel.INFO,
        WARN: api_1.DiagLogLevel.WARN,
        ERROR: api_1.DiagLogLevel.ERROR,
        NONE: api_1.DiagLogLevel.NONE
      };
      function setLogLevelFromEnv(key, environment, values) {
        const value = values[key];
        if (typeof value === "string") {
          const theLevel = logLevelMap[value.toUpperCase()];
          if (theLevel != null) {
            environment[key] = theLevel;
          }
        }
      }
      function parseEnvironment(values) {
        const environment = {};
        for (const env in exports.DEFAULT_ENVIRONMENT) {
          const key = env;
          switch (key) {
            case "OTEL_LOG_LEVEL":
              setLogLevelFromEnv(key, environment, values);
              break;
            default:
              if (isEnvVarABoolean(key)) {
                parseBoolean(key, environment, values);
              } else if (isEnvVarANumber(key)) {
                parseNumber(key, environment, values);
              } else if (isEnvVarAList(key)) {
                parseStringList(key, environment, values);
              } else {
                const value = values[key];
                if (typeof value !== "undefined" && value !== null) {
                  environment[key] = String(value);
                }
              }
          }
        }
        return environment;
      }
      exports.parseEnvironment = parseEnvironment;
      function getEnvWithoutDefaults() {
        return typeof process !== "undefined" && process && process.env ? parseEnvironment(process.env) : parseEnvironment(globalThis_1._globalThis);
      }
      exports.getEnvWithoutDefaults = getEnvWithoutDefaults;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/environment.js
  var require_environment2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/environment.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getEnv = void 0;
      var environment_1 = require_environment();
      function getEnv() {
        const processEnv = (0, environment_1.parseEnvironment)(process.env);
        return Object.assign({}, environment_1.DEFAULT_ENVIRONMENT, processEnv);
      }
      exports.getEnv = getEnv;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/globalThis.js
  var require_globalThis3 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/globalThis.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports._globalThis = void 0;
      exports._globalThis = typeof globalThis === "object" ? globalThis : global;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/hex-to-binary.js
  var require_hex_to_binary = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/hex-to-binary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hexToBinary = void 0;
      function intValue(charCode) {
        if (charCode >= 48 && charCode <= 57) {
          return charCode - 48;
        }
        if (charCode >= 97 && charCode <= 102) {
          return charCode - 87;
        }
        return charCode - 55;
      }
      function hexToBinary(hexStr) {
        const buf = new Uint8Array(hexStr.length / 2);
        let offset = 0;
        for (let i = 0; i < hexStr.length; i += 2) {
          const hi = intValue(hexStr.charCodeAt(i));
          const lo = intValue(hexStr.charCodeAt(i + 1));
          buf[offset++] = hi << 4 | lo;
        }
        return buf;
      }
      exports.hexToBinary = hexToBinary;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/hex-to-base64.js
  var require_hex_to_base64 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/hex-to-base64.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hexToBase64 = void 0;
      var hex_to_binary_1 = require_hex_to_binary();
      function hexToBase64(hexStr) {
        return Buffer.from((0, hex_to_binary_1.hexToBinary)(hexStr)).toString("base64");
      }
      exports.hexToBase64 = hexToBase64;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/RandomIdGenerator.js
  var require_RandomIdGenerator = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/RandomIdGenerator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RandomIdGenerator = void 0;
      var SPAN_ID_BYTES = 8;
      var TRACE_ID_BYTES = 16;
      var RandomIdGenerator = class {
        constructor() {
          this.generateTraceId = getIdGenerator(TRACE_ID_BYTES);
          this.generateSpanId = getIdGenerator(SPAN_ID_BYTES);
        }
      };
      exports.RandomIdGenerator = RandomIdGenerator;
      var SHARED_BUFFER = Buffer.allocUnsafe(TRACE_ID_BYTES);
      function getIdGenerator(bytes) {
        return function generateId() {
          for (let i = 0; i < bytes / 4; i++) {
            SHARED_BUFFER.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, i * 4);
          }
          for (let i = 0; i < bytes; i++) {
            if (SHARED_BUFFER[i] > 0) {
              break;
            } else if (i === bytes - 1) {
              SHARED_BUFFER[bytes - 1] = 1;
            }
          }
          return SHARED_BUFFER.toString("hex", 0, bytes);
        };
      }
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/performance.js
  var require_performance = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/performance.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.otperformance = void 0;
      var perf_hooks_1 = __require("perf_hooks");
      exports.otperformance = perf_hooks_1.performance;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/version.js
  var require_version2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.VERSION = void 0;
      exports.VERSION = "1.21.0";
    }
  });

  // ../../../.yarn/cache/@opentelemetry-semantic-conventions-npm-1.21.0-c8acc602bb-ba1eabdbe5.zip/node_modules/@opentelemetry/semantic-conventions/build/src/trace/SemanticAttributes.js
  var require_SemanticAttributes = __commonJS({
    "../../../.yarn/cache/@opentelemetry-semantic-conventions-npm-1.21.0-c8acc602bb-ba1eabdbe5.zip/node_modules/@opentelemetry/semantic-conventions/build/src/trace/SemanticAttributes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MessageTypeValues = exports.RpcGrpcStatusCodeValues = exports.MessagingOperationValues = exports.MessagingDestinationKindValues = exports.HttpFlavorValues = exports.NetHostConnectionSubtypeValues = exports.NetHostConnectionTypeValues = exports.NetTransportValues = exports.FaasInvokedProviderValues = exports.FaasDocumentOperationValues = exports.FaasTriggerValues = exports.DbCassandraConsistencyLevelValues = exports.DbSystemValues = exports.SemanticAttributes = void 0;
      exports.SemanticAttributes = {
        /**
         * The full invoked ARN as provided on the `Context` passed to the function (`Lambda-Runtime-Invoked-Function-Arn` header on the `/runtime/invocation/next` applicable).
         *
         * Note: This may be different from `faas.id` if an alias is involved.
         */
        AWS_LAMBDA_INVOKED_ARN: "aws.lambda.invoked_arn",
        /**
         * An identifier for the database management system (DBMS) product being used. See below for a list of well-known identifiers.
         */
        DB_SYSTEM: "db.system",
        /**
         * The connection string used to connect to the database. It is recommended to remove embedded credentials.
         */
        DB_CONNECTION_STRING: "db.connection_string",
        /**
         * Username for accessing the database.
         */
        DB_USER: "db.user",
        /**
         * The fully-qualified class name of the [Java Database Connectivity (JDBC)](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) driver used to connect.
         */
        DB_JDBC_DRIVER_CLASSNAME: "db.jdbc.driver_classname",
        /**
         * If no [tech-specific attribute](#call-level-attributes-for-specific-technologies) is defined, this attribute is used to report the name of the database being accessed. For commands that switch the database, this should be set to the target database (even if the command fails).
         *
         * Note: In some SQL databases, the database name to be used is called &#34;schema name&#34;.
         */
        DB_NAME: "db.name",
        /**
         * The database statement being executed.
         *
         * Note: The value may be sanitized to exclude sensitive information.
         */
        DB_STATEMENT: "db.statement",
        /**
         * The name of the operation being executed, e.g. the [MongoDB command name](https://docs.mongodb.com/manual/reference/command/#database-operations) such as `findAndModify`, or the SQL keyword.
         *
         * Note: When setting this to an SQL keyword, it is not recommended to attempt any client-side parsing of `db.statement` just to get this property, but it should be set if the operation name is provided by the library being instrumented. If the SQL statement has an ambiguous operation, or performs more than one operation, this value may be omitted.
         */
        DB_OPERATION: "db.operation",
        /**
         * The Microsoft SQL Server [instance name](https://docs.microsoft.com/en-us/sql/connect/jdbc/building-the-connection-url?view=sql-server-ver15) connecting to. This name is used to determine the port of a named instance.
         *
         * Note: If setting a `db.mssql.instance_name`, `net.peer.port` is no longer required (but still recommended if non-standard).
         */
        DB_MSSQL_INSTANCE_NAME: "db.mssql.instance_name",
        /**
         * The name of the keyspace being accessed. To be used instead of the generic `db.name` attribute.
         */
        DB_CASSANDRA_KEYSPACE: "db.cassandra.keyspace",
        /**
         * The fetch size used for paging, i.e. how many rows will be returned at once.
         */
        DB_CASSANDRA_PAGE_SIZE: "db.cassandra.page_size",
        /**
         * The consistency level of the query. Based on consistency values from [CQL](https://docs.datastax.com/en/cassandra-oss/3.0/cassandra/dml/dmlConfigConsistency.html).
         */
        DB_CASSANDRA_CONSISTENCY_LEVEL: "db.cassandra.consistency_level",
        /**
         * The name of the primary table that the operation is acting upon, including the schema name (if applicable).
         *
         * Note: This mirrors the db.sql.table attribute but references cassandra rather than sql. It is not recommended to attempt any client-side parsing of `db.statement` just to get this property, but it should be set if it is provided by the library being instrumented. If the operation is acting upon an anonymous table, or more than one table, this value MUST NOT be set.
         */
        DB_CASSANDRA_TABLE: "db.cassandra.table",
        /**
         * Whether or not the query is idempotent.
         */
        DB_CASSANDRA_IDEMPOTENCE: "db.cassandra.idempotence",
        /**
         * The number of times a query was speculatively executed. Not set or `0` if the query was not executed speculatively.
         */
        DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT: "db.cassandra.speculative_execution_count",
        /**
         * The ID of the coordinating node for a query.
         */
        DB_CASSANDRA_COORDINATOR_ID: "db.cassandra.coordinator.id",
        /**
         * The data center of the coordinating node for a query.
         */
        DB_CASSANDRA_COORDINATOR_DC: "db.cassandra.coordinator.dc",
        /**
         * The [HBase namespace](https://hbase.apache.org/book.html#_namespace) being accessed. To be used instead of the generic `db.name` attribute.
         */
        DB_HBASE_NAMESPACE: "db.hbase.namespace",
        /**
         * The index of the database being accessed as used in the [`SELECT` command](https://redis.io/commands/select), provided as an integer. To be used instead of the generic `db.name` attribute.
         */
        DB_REDIS_DATABASE_INDEX: "db.redis.database_index",
        /**
         * The collection being accessed within the database stated in `db.name`.
         */
        DB_MONGODB_COLLECTION: "db.mongodb.collection",
        /**
         * The name of the primary table that the operation is acting upon, including the schema name (if applicable).
         *
         * Note: It is not recommended to attempt any client-side parsing of `db.statement` just to get this property, but it should be set if it is provided by the library being instrumented. If the operation is acting upon an anonymous table, or more than one table, this value MUST NOT be set.
         */
        DB_SQL_TABLE: "db.sql.table",
        /**
         * The type of the exception (its fully-qualified class name, if applicable). The dynamic type of the exception should be preferred over the static type in languages that support it.
         */
        EXCEPTION_TYPE: "exception.type",
        /**
         * The exception message.
         */
        EXCEPTION_MESSAGE: "exception.message",
        /**
         * A stacktrace as a string in the natural representation for the language runtime. The representation is to be determined and documented by each language SIG.
         */
        EXCEPTION_STACKTRACE: "exception.stacktrace",
        /**
          * SHOULD be set to true if the exception event is recorded at a point where it is known that the exception is escaping the scope of the span.
          *
          * Note: An exception is considered to have escaped (or left) the scope of a span,
        if that span is ended while the exception is still logically &#34;in flight&#34;.
        This may be actually &#34;in flight&#34; in some languages (e.g. if the exception
        is passed to a Context manager&#39;s `__exit__` method in Python) but will
        usually be caught at the point of recording the exception in most languages.
        
        It is usually not possible to determine at the point where an exception is thrown
        whether it will escape the scope of a span.
        However, it is trivial to know that an exception
        will escape, if one checks for an active exception just before ending the span,
        as done in the [example above](#exception-end-example).
        
        It follows that an exception may still escape the scope of the span
        even if the `exception.escaped` attribute was not set or set to false,
        since the event might have been recorded at a time where it was not
        clear whether the exception will escape.
          */
        EXCEPTION_ESCAPED: "exception.escaped",
        /**
         * Type of the trigger on which the function is executed.
         */
        FAAS_TRIGGER: "faas.trigger",
        /**
         * The execution ID of the current function execution.
         */
        FAAS_EXECUTION: "faas.execution",
        /**
         * The name of the source on which the triggering operation was performed. For example, in Cloud Storage or S3 corresponds to the bucket name, and in Cosmos DB to the database name.
         */
        FAAS_DOCUMENT_COLLECTION: "faas.document.collection",
        /**
         * Describes the type of the operation that was performed on the data.
         */
        FAAS_DOCUMENT_OPERATION: "faas.document.operation",
        /**
         * A string containing the time when the data was accessed in the [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format expressed in [UTC](https://www.w3.org/TR/NOTE-datetime).
         */
        FAAS_DOCUMENT_TIME: "faas.document.time",
        /**
         * The document name/table subjected to the operation. For example, in Cloud Storage or S3 is the name of the file, and in Cosmos DB the table name.
         */
        FAAS_DOCUMENT_NAME: "faas.document.name",
        /**
         * A string containing the function invocation time in the [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format expressed in [UTC](https://www.w3.org/TR/NOTE-datetime).
         */
        FAAS_TIME: "faas.time",
        /**
         * A string containing the schedule period as [Cron Expression](https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm).
         */
        FAAS_CRON: "faas.cron",
        /**
         * A boolean that is true if the serverless function is executed for the first time (aka cold-start).
         */
        FAAS_COLDSTART: "faas.coldstart",
        /**
         * The name of the invoked function.
         *
         * Note: SHOULD be equal to the `faas.name` resource attribute of the invoked function.
         */
        FAAS_INVOKED_NAME: "faas.invoked_name",
        /**
         * The cloud provider of the invoked function.
         *
         * Note: SHOULD be equal to the `cloud.provider` resource attribute of the invoked function.
         */
        FAAS_INVOKED_PROVIDER: "faas.invoked_provider",
        /**
         * The cloud region of the invoked function.
         *
         * Note: SHOULD be equal to the `cloud.region` resource attribute of the invoked function.
         */
        FAAS_INVOKED_REGION: "faas.invoked_region",
        /**
         * Transport protocol used. See note below.
         */
        NET_TRANSPORT: "net.transport",
        /**
         * Remote address of the peer (dotted decimal for IPv4 or [RFC5952](https://tools.ietf.org/html/rfc5952) for IPv6).
         */
        NET_PEER_IP: "net.peer.ip",
        /**
         * Remote port number.
         */
        NET_PEER_PORT: "net.peer.port",
        /**
         * Remote hostname or similar, see note below.
         */
        NET_PEER_NAME: "net.peer.name",
        /**
         * Like `net.peer.ip` but for the host IP. Useful in case of a multi-IP host.
         */
        NET_HOST_IP: "net.host.ip",
        /**
         * Like `net.peer.port` but for the host port.
         */
        NET_HOST_PORT: "net.host.port",
        /**
         * Local hostname or similar, see note below.
         */
        NET_HOST_NAME: "net.host.name",
        /**
         * The internet connection type currently being used by the host.
         */
        NET_HOST_CONNECTION_TYPE: "net.host.connection.type",
        /**
         * This describes more details regarding the connection.type. It may be the type of cell technology connection, but it could be used for describing details about a wifi connection.
         */
        NET_HOST_CONNECTION_SUBTYPE: "net.host.connection.subtype",
        /**
         * The name of the mobile carrier.
         */
        NET_HOST_CARRIER_NAME: "net.host.carrier.name",
        /**
         * The mobile carrier country code.
         */
        NET_HOST_CARRIER_MCC: "net.host.carrier.mcc",
        /**
         * The mobile carrier network code.
         */
        NET_HOST_CARRIER_MNC: "net.host.carrier.mnc",
        /**
         * The ISO 3166-1 alpha-2 2-character country code associated with the mobile carrier network.
         */
        NET_HOST_CARRIER_ICC: "net.host.carrier.icc",
        /**
         * The [`service.name`](../../resource/semantic_conventions/README.md#service) of the remote service. SHOULD be equal to the actual `service.name` resource attribute of the remote service if any.
         */
        PEER_SERVICE: "peer.service",
        /**
         * Username or client_id extracted from the access token or [Authorization](https://tools.ietf.org/html/rfc7235#section-4.2) header in the inbound request from outside the system.
         */
        ENDUSER_ID: "enduser.id",
        /**
         * Actual/assumed role the client is making the request under extracted from token or application security context.
         */
        ENDUSER_ROLE: "enduser.role",
        /**
         * Scopes or granted authorities the client currently possesses extracted from token or application security context. The value would come from the scope associated with an [OAuth 2.0 Access Token](https://tools.ietf.org/html/rfc6749#section-3.3) or an attribute value in a [SAML 2.0 Assertion](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html).
         */
        ENDUSER_SCOPE: "enduser.scope",
        /**
         * Current &#34;managed&#34; thread ID (as opposed to OS thread ID).
         */
        THREAD_ID: "thread.id",
        /**
         * Current thread name.
         */
        THREAD_NAME: "thread.name",
        /**
         * The method or function name, or equivalent (usually rightmost part of the code unit&#39;s name).
         */
        CODE_FUNCTION: "code.function",
        /**
         * The &#34;namespace&#34; within which `code.function` is defined. Usually the qualified class or module name, such that `code.namespace` + some separator + `code.function` form a unique identifier for the code unit.
         */
        CODE_NAMESPACE: "code.namespace",
        /**
         * The source code file name that identifies the code unit as uniquely as possible (preferably an absolute file path).
         */
        CODE_FILEPATH: "code.filepath",
        /**
         * The line number in `code.filepath` best representing the operation. It SHOULD point within the code unit named in `code.function`.
         */
        CODE_LINENO: "code.lineno",
        /**
         * HTTP request method.
         */
        HTTP_METHOD: "http.method",
        /**
         * Full HTTP request URL in the form `scheme://host[:port]/path?query[#fragment]`. Usually the fragment is not transmitted over HTTP, but if it is known, it should be included nevertheless.
         *
         * Note: `http.url` MUST NOT contain credentials passed via URL in form of `https://username:password@www.example.com/`. In such case the attribute&#39;s value should be `https://www.example.com/`.
         */
        HTTP_URL: "http.url",
        /**
         * The full request target as passed in a HTTP request line or equivalent.
         */
        HTTP_TARGET: "http.target",
        /**
         * The value of the [HTTP host header](https://tools.ietf.org/html/rfc7230#section-5.4). An empty Host header should also be reported, see note.
         *
         * Note: When the header is present but empty the attribute SHOULD be set to the empty string. Note that this is a valid situation that is expected in certain cases, according the aforementioned [section of RFC 7230](https://tools.ietf.org/html/rfc7230#section-5.4). When the header is not set the attribute MUST NOT be set.
         */
        HTTP_HOST: "http.host",
        /**
         * The URI scheme identifying the used protocol.
         */
        HTTP_SCHEME: "http.scheme",
        /**
         * [HTTP response status code](https://tools.ietf.org/html/rfc7231#section-6).
         */
        HTTP_STATUS_CODE: "http.status_code",
        /**
         * Kind of HTTP protocol used.
         *
         * Note: If `net.transport` is not specified, it can be assumed to be `IP.TCP` except if `http.flavor` is `QUIC`, in which case `IP.UDP` is assumed.
         */
        HTTP_FLAVOR: "http.flavor",
        /**
         * Value of the [HTTP User-Agent](https://tools.ietf.org/html/rfc7231#section-5.5.3) header sent by the client.
         */
        HTTP_USER_AGENT: "http.user_agent",
        /**
         * The size of the request payload body in bytes. This is the number of bytes transferred excluding headers and is often, but not always, present as the [Content-Length](https://tools.ietf.org/html/rfc7230#section-3.3.2) header. For requests using transport encoding, this should be the compressed size.
         */
        HTTP_REQUEST_CONTENT_LENGTH: "http.request_content_length",
        /**
         * The size of the uncompressed request payload body after transport decoding. Not set if transport encoding not used.
         */
        HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED: "http.request_content_length_uncompressed",
        /**
         * The size of the response payload body in bytes. This is the number of bytes transferred excluding headers and is often, but not always, present as the [Content-Length](https://tools.ietf.org/html/rfc7230#section-3.3.2) header. For requests using transport encoding, this should be the compressed size.
         */
        HTTP_RESPONSE_CONTENT_LENGTH: "http.response_content_length",
        /**
         * The size of the uncompressed response payload body after transport decoding. Not set if transport encoding not used.
         */
        HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED: "http.response_content_length_uncompressed",
        /**
         * The primary server name of the matched virtual host. This should be obtained via configuration. If no such configuration can be obtained, this attribute MUST NOT be set ( `net.host.name` should be used instead).
         *
         * Note: `http.url` is usually not readily available on the server side but would have to be assembled in a cumbersome and sometimes lossy process from other information (see e.g. open-telemetry/opentelemetry-python/pull/148). It is thus preferred to supply the raw data that is available.
         */
        HTTP_SERVER_NAME: "http.server_name",
        /**
         * The matched route (path template).
         */
        HTTP_ROUTE: "http.route",
        /**
          * The IP address of the original client behind all proxies, if known (e.g. from [X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)).
          *
          * Note: This is not necessarily the same as `net.peer.ip`, which would
        identify the network-level peer, which may be a proxy.
        
        This attribute should be set when a source of information different
        from the one used for `net.peer.ip`, is available even if that other
        source just confirms the same value as `net.peer.ip`.
        Rationale: For `net.peer.ip`, one typically does not know if it
        comes from a proxy, reverse proxy, or the actual client. Setting
        `http.client_ip` when it&#39;s the same as `net.peer.ip` means that
        one is at least somewhat confident that the address is not that of
        the closest proxy.
          */
        HTTP_CLIENT_IP: "http.client_ip",
        /**
         * The keys in the `RequestItems` object field.
         */
        AWS_DYNAMODB_TABLE_NAMES: "aws.dynamodb.table_names",
        /**
         * The JSON-serialized value of each item in the `ConsumedCapacity` response field.
         */
        AWS_DYNAMODB_CONSUMED_CAPACITY: "aws.dynamodb.consumed_capacity",
        /**
         * The JSON-serialized value of the `ItemCollectionMetrics` response field.
         */
        AWS_DYNAMODB_ITEM_COLLECTION_METRICS: "aws.dynamodb.item_collection_metrics",
        /**
         * The value of the `ProvisionedThroughput.ReadCapacityUnits` request parameter.
         */
        AWS_DYNAMODB_PROVISIONED_READ_CAPACITY: "aws.dynamodb.provisioned_read_capacity",
        /**
         * The value of the `ProvisionedThroughput.WriteCapacityUnits` request parameter.
         */
        AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY: "aws.dynamodb.provisioned_write_capacity",
        /**
         * The value of the `ConsistentRead` request parameter.
         */
        AWS_DYNAMODB_CONSISTENT_READ: "aws.dynamodb.consistent_read",
        /**
         * The value of the `ProjectionExpression` request parameter.
         */
        AWS_DYNAMODB_PROJECTION: "aws.dynamodb.projection",
        /**
         * The value of the `Limit` request parameter.
         */
        AWS_DYNAMODB_LIMIT: "aws.dynamodb.limit",
        /**
         * The value of the `AttributesToGet` request parameter.
         */
        AWS_DYNAMODB_ATTRIBUTES_TO_GET: "aws.dynamodb.attributes_to_get",
        /**
         * The value of the `IndexName` request parameter.
         */
        AWS_DYNAMODB_INDEX_NAME: "aws.dynamodb.index_name",
        /**
         * The value of the `Select` request parameter.
         */
        AWS_DYNAMODB_SELECT: "aws.dynamodb.select",
        /**
         * The JSON-serialized value of each item of the `GlobalSecondaryIndexes` request field.
         */
        AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES: "aws.dynamodb.global_secondary_indexes",
        /**
         * The JSON-serialized value of each item of the `LocalSecondaryIndexes` request field.
         */
        AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES: "aws.dynamodb.local_secondary_indexes",
        /**
         * The value of the `ExclusiveStartTableName` request parameter.
         */
        AWS_DYNAMODB_EXCLUSIVE_START_TABLE: "aws.dynamodb.exclusive_start_table",
        /**
         * The the number of items in the `TableNames` response parameter.
         */
        AWS_DYNAMODB_TABLE_COUNT: "aws.dynamodb.table_count",
        /**
         * The value of the `ScanIndexForward` request parameter.
         */
        AWS_DYNAMODB_SCAN_FORWARD: "aws.dynamodb.scan_forward",
        /**
         * The value of the `Segment` request parameter.
         */
        AWS_DYNAMODB_SEGMENT: "aws.dynamodb.segment",
        /**
         * The value of the `TotalSegments` request parameter.
         */
        AWS_DYNAMODB_TOTAL_SEGMENTS: "aws.dynamodb.total_segments",
        /**
         * The value of the `Count` response parameter.
         */
        AWS_DYNAMODB_COUNT: "aws.dynamodb.count",
        /**
         * The value of the `ScannedCount` response parameter.
         */
        AWS_DYNAMODB_SCANNED_COUNT: "aws.dynamodb.scanned_count",
        /**
         * The JSON-serialized value of each item in the `AttributeDefinitions` request field.
         */
        AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS: "aws.dynamodb.attribute_definitions",
        /**
         * The JSON-serialized value of each item in the the `GlobalSecondaryIndexUpdates` request field.
         */
        AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES: "aws.dynamodb.global_secondary_index_updates",
        /**
         * A string identifying the messaging system.
         */
        MESSAGING_SYSTEM: "messaging.system",
        /**
         * The message destination name. This might be equal to the span name but is required nevertheless.
         */
        MESSAGING_DESTINATION: "messaging.destination",
        /**
         * The kind of message destination.
         */
        MESSAGING_DESTINATION_KIND: "messaging.destination_kind",
        /**
         * A boolean that is true if the message destination is temporary.
         */
        MESSAGING_TEMP_DESTINATION: "messaging.temp_destination",
        /**
         * The name of the transport protocol.
         */
        MESSAGING_PROTOCOL: "messaging.protocol",
        /**
         * The version of the transport protocol.
         */
        MESSAGING_PROTOCOL_VERSION: "messaging.protocol_version",
        /**
         * Connection string.
         */
        MESSAGING_URL: "messaging.url",
        /**
         * A value used by the messaging system as an identifier for the message, represented as a string.
         */
        MESSAGING_MESSAGE_ID: "messaging.message_id",
        /**
         * The [conversation ID](#conversations) identifying the conversation to which the message belongs, represented as a string. Sometimes called &#34;Correlation ID&#34;.
         */
        MESSAGING_CONVERSATION_ID: "messaging.conversation_id",
        /**
         * The (uncompressed) size of the message payload in bytes. Also use this attribute if it is unknown whether the compressed or uncompressed payload size is reported.
         */
        MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES: "messaging.message_payload_size_bytes",
        /**
         * The compressed size of the message payload in bytes.
         */
        MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES: "messaging.message_payload_compressed_size_bytes",
        /**
         * A string identifying the kind of message consumption as defined in the [Operation names](#operation-names) section above. If the operation is &#34;send&#34;, this attribute MUST NOT be set, since the operation can be inferred from the span kind in that case.
         */
        MESSAGING_OPERATION: "messaging.operation",
        /**
         * The identifier for the consumer receiving a message. For Kafka, set it to `{messaging.kafka.consumer_group} - {messaging.kafka.client_id}`, if both are present, or only `messaging.kafka.consumer_group`. For brokers, such as RabbitMQ and Artemis, set it to the `client_id` of the client consuming the message.
         */
        MESSAGING_CONSUMER_ID: "messaging.consumer_id",
        /**
         * RabbitMQ message routing key.
         */
        MESSAGING_RABBITMQ_ROUTING_KEY: "messaging.rabbitmq.routing_key",
        /**
         * Message keys in Kafka are used for grouping alike messages to ensure they&#39;re processed on the same partition. They differ from `messaging.message_id` in that they&#39;re not unique. If the key is `null`, the attribute MUST NOT be set.
         *
         * Note: If the key type is not string, it&#39;s string representation has to be supplied for the attribute. If the key has no unambiguous, canonical string form, don&#39;t include its value.
         */
        MESSAGING_KAFKA_MESSAGE_KEY: "messaging.kafka.message_key",
        /**
         * Name of the Kafka Consumer Group that is handling the message. Only applies to consumers, not producers.
         */
        MESSAGING_KAFKA_CONSUMER_GROUP: "messaging.kafka.consumer_group",
        /**
         * Client Id for the Consumer or Producer that is handling the message.
         */
        MESSAGING_KAFKA_CLIENT_ID: "messaging.kafka.client_id",
        /**
         * Partition the message is sent to.
         */
        MESSAGING_KAFKA_PARTITION: "messaging.kafka.partition",
        /**
         * A boolean that is true if the message is a tombstone.
         */
        MESSAGING_KAFKA_TOMBSTONE: "messaging.kafka.tombstone",
        /**
         * A string identifying the remoting system.
         */
        RPC_SYSTEM: "rpc.system",
        /**
         * The full (logical) name of the service being called, including its package name, if applicable.
         *
         * Note: This is the logical name of the service from the RPC interface perspective, which can be different from the name of any implementing class. The `code.namespace` attribute may be used to store the latter (despite the attribute name, it may include a class name; e.g., class with method actually executing the call on the server side, RPC client stub class on the client side).
         */
        RPC_SERVICE: "rpc.service",
        /**
         * The name of the (logical) method being called, must be equal to the $method part in the span name.
         *
         * Note: This is the logical name of the method from the RPC interface perspective, which can be different from the name of any implementing method/function. The `code.function` attribute may be used to store the latter (e.g., method actually executing the call on the server side, RPC client stub method on the client side).
         */
        RPC_METHOD: "rpc.method",
        /**
         * The [numeric status code](https://github.com/grpc/grpc/blob/v1.33.2/doc/statuscodes.md) of the gRPC request.
         */
        RPC_GRPC_STATUS_CODE: "rpc.grpc.status_code",
        /**
         * Protocol version as in `jsonrpc` property of request/response. Since JSON-RPC 1.0 does not specify this, the value can be omitted.
         */
        RPC_JSONRPC_VERSION: "rpc.jsonrpc.version",
        /**
         * `id` property of request or response. Since protocol allows id to be int, string, `null` or missing (for notifications), value is expected to be cast to string for simplicity. Use empty string in case of `null` value. Omit entirely if this is a notification.
         */
        RPC_JSONRPC_REQUEST_ID: "rpc.jsonrpc.request_id",
        /**
         * `error.code` property of response if it is an error response.
         */
        RPC_JSONRPC_ERROR_CODE: "rpc.jsonrpc.error_code",
        /**
         * `error.message` property of response if it is an error response.
         */
        RPC_JSONRPC_ERROR_MESSAGE: "rpc.jsonrpc.error_message",
        /**
         * Whether this is a received or sent message.
         */
        MESSAGE_TYPE: "message.type",
        /**
         * MUST be calculated as two different counters starting from `1` one for sent messages and one for received message.
         *
         * Note: This way we guarantee that the values will be consistent between different implementations.
         */
        MESSAGE_ID: "message.id",
        /**
         * Compressed size of the message in bytes.
         */
        MESSAGE_COMPRESSED_SIZE: "message.compressed_size",
        /**
         * Uncompressed size of the message in bytes.
         */
        MESSAGE_UNCOMPRESSED_SIZE: "message.uncompressed_size"
      };
      exports.DbSystemValues = {
        /** Some other SQL database. Fallback only. See notes. */
        OTHER_SQL: "other_sql",
        /** Microsoft SQL Server. */
        MSSQL: "mssql",
        /** MySQL. */
        MYSQL: "mysql",
        /** Oracle Database. */
        ORACLE: "oracle",
        /** IBM Db2. */
        DB2: "db2",
        /** PostgreSQL. */
        POSTGRESQL: "postgresql",
        /** Amazon Redshift. */
        REDSHIFT: "redshift",
        /** Apache Hive. */
        HIVE: "hive",
        /** Cloudscape. */
        CLOUDSCAPE: "cloudscape",
        /** HyperSQL DataBase. */
        HSQLDB: "hsqldb",
        /** Progress Database. */
        PROGRESS: "progress",
        /** SAP MaxDB. */
        MAXDB: "maxdb",
        /** SAP HANA. */
        HANADB: "hanadb",
        /** Ingres. */
        INGRES: "ingres",
        /** FirstSQL. */
        FIRSTSQL: "firstsql",
        /** EnterpriseDB. */
        EDB: "edb",
        /** InterSystems Caché. */
        CACHE: "cache",
        /** Adabas (Adaptable Database System). */
        ADABAS: "adabas",
        /** Firebird. */
        FIREBIRD: "firebird",
        /** Apache Derby. */
        DERBY: "derby",
        /** FileMaker. */
        FILEMAKER: "filemaker",
        /** Informix. */
        INFORMIX: "informix",
        /** InstantDB. */
        INSTANTDB: "instantdb",
        /** InterBase. */
        INTERBASE: "interbase",
        /** MariaDB. */
        MARIADB: "mariadb",
        /** Netezza. */
        NETEZZA: "netezza",
        /** Pervasive PSQL. */
        PERVASIVE: "pervasive",
        /** PointBase. */
        POINTBASE: "pointbase",
        /** SQLite. */
        SQLITE: "sqlite",
        /** Sybase. */
        SYBASE: "sybase",
        /** Teradata. */
        TERADATA: "teradata",
        /** Vertica. */
        VERTICA: "vertica",
        /** H2. */
        H2: "h2",
        /** ColdFusion IMQ. */
        COLDFUSION: "coldfusion",
        /** Apache Cassandra. */
        CASSANDRA: "cassandra",
        /** Apache HBase. */
        HBASE: "hbase",
        /** MongoDB. */
        MONGODB: "mongodb",
        /** Redis. */
        REDIS: "redis",
        /** Couchbase. */
        COUCHBASE: "couchbase",
        /** CouchDB. */
        COUCHDB: "couchdb",
        /** Microsoft Azure Cosmos DB. */
        COSMOSDB: "cosmosdb",
        /** Amazon DynamoDB. */
        DYNAMODB: "dynamodb",
        /** Neo4j. */
        NEO4J: "neo4j",
        /** Apache Geode. */
        GEODE: "geode",
        /** Elasticsearch. */
        ELASTICSEARCH: "elasticsearch",
        /** Memcached. */
        MEMCACHED: "memcached",
        /** CockroachDB. */
        COCKROACHDB: "cockroachdb"
      };
      exports.DbCassandraConsistencyLevelValues = {
        /** all. */
        ALL: "all",
        /** each_quorum. */
        EACH_QUORUM: "each_quorum",
        /** quorum. */
        QUORUM: "quorum",
        /** local_quorum. */
        LOCAL_QUORUM: "local_quorum",
        /** one. */
        ONE: "one",
        /** two. */
        TWO: "two",
        /** three. */
        THREE: "three",
        /** local_one. */
        LOCAL_ONE: "local_one",
        /** any. */
        ANY: "any",
        /** serial. */
        SERIAL: "serial",
        /** local_serial. */
        LOCAL_SERIAL: "local_serial"
      };
      exports.FaasTriggerValues = {
        /** A response to some data source operation such as a database or filesystem read/write. */
        DATASOURCE: "datasource",
        /** To provide an answer to an inbound HTTP request. */
        HTTP: "http",
        /** A function is set to be executed when messages are sent to a messaging system. */
        PUBSUB: "pubsub",
        /** A function is scheduled to be executed regularly. */
        TIMER: "timer",
        /** If none of the others apply. */
        OTHER: "other"
      };
      exports.FaasDocumentOperationValues = {
        /** When a new object is created. */
        INSERT: "insert",
        /** When an object is modified. */
        EDIT: "edit",
        /** When an object is deleted. */
        DELETE: "delete"
      };
      exports.FaasInvokedProviderValues = {
        /** Alibaba Cloud. */
        ALIBABA_CLOUD: "alibaba_cloud",
        /** Amazon Web Services. */
        AWS: "aws",
        /** Microsoft Azure. */
        AZURE: "azure",
        /** Google Cloud Platform. */
        GCP: "gcp"
      };
      exports.NetTransportValues = {
        /** ip_tcp. */
        IP_TCP: "ip_tcp",
        /** ip_udp. */
        IP_UDP: "ip_udp",
        /** Another IP-based protocol. */
        IP: "ip",
        /** Unix Domain socket. See below. */
        UNIX: "unix",
        /** Named or anonymous pipe. See note below. */
        PIPE: "pipe",
        /** In-process communication. */
        INPROC: "inproc",
        /** Something else (non IP-based). */
        OTHER: "other"
      };
      exports.NetHostConnectionTypeValues = {
        /** wifi. */
        WIFI: "wifi",
        /** wired. */
        WIRED: "wired",
        /** cell. */
        CELL: "cell",
        /** unavailable. */
        UNAVAILABLE: "unavailable",
        /** unknown. */
        UNKNOWN: "unknown"
      };
      exports.NetHostConnectionSubtypeValues = {
        /** GPRS. */
        GPRS: "gprs",
        /** EDGE. */
        EDGE: "edge",
        /** UMTS. */
        UMTS: "umts",
        /** CDMA. */
        CDMA: "cdma",
        /** EVDO Rel. 0. */
        EVDO_0: "evdo_0",
        /** EVDO Rev. A. */
        EVDO_A: "evdo_a",
        /** CDMA2000 1XRTT. */
        CDMA2000_1XRTT: "cdma2000_1xrtt",
        /** HSDPA. */
        HSDPA: "hsdpa",
        /** HSUPA. */
        HSUPA: "hsupa",
        /** HSPA. */
        HSPA: "hspa",
        /** IDEN. */
        IDEN: "iden",
        /** EVDO Rev. B. */
        EVDO_B: "evdo_b",
        /** LTE. */
        LTE: "lte",
        /** EHRPD. */
        EHRPD: "ehrpd",
        /** HSPAP. */
        HSPAP: "hspap",
        /** GSM. */
        GSM: "gsm",
        /** TD-SCDMA. */
        TD_SCDMA: "td_scdma",
        /** IWLAN. */
        IWLAN: "iwlan",
        /** 5G NR (New Radio). */
        NR: "nr",
        /** 5G NRNSA (New Radio Non-Standalone). */
        NRNSA: "nrnsa",
        /** LTE CA. */
        LTE_CA: "lte_ca"
      };
      exports.HttpFlavorValues = {
        /** HTTP 1.0. */
        HTTP_1_0: "1.0",
        /** HTTP 1.1. */
        HTTP_1_1: "1.1",
        /** HTTP 2. */
        HTTP_2_0: "2.0",
        /** SPDY protocol. */
        SPDY: "SPDY",
        /** QUIC protocol. */
        QUIC: "QUIC"
      };
      exports.MessagingDestinationKindValues = {
        /** A message sent to a queue. */
        QUEUE: "queue",
        /** A message sent to a topic. */
        TOPIC: "topic"
      };
      exports.MessagingOperationValues = {
        /** receive. */
        RECEIVE: "receive",
        /** process. */
        PROCESS: "process"
      };
      exports.RpcGrpcStatusCodeValues = {
        /** OK. */
        OK: 0,
        /** CANCELLED. */
        CANCELLED: 1,
        /** UNKNOWN. */
        UNKNOWN: 2,
        /** INVALID_ARGUMENT. */
        INVALID_ARGUMENT: 3,
        /** DEADLINE_EXCEEDED. */
        DEADLINE_EXCEEDED: 4,
        /** NOT_FOUND. */
        NOT_FOUND: 5,
        /** ALREADY_EXISTS. */
        ALREADY_EXISTS: 6,
        /** PERMISSION_DENIED. */
        PERMISSION_DENIED: 7,
        /** RESOURCE_EXHAUSTED. */
        RESOURCE_EXHAUSTED: 8,
        /** FAILED_PRECONDITION. */
        FAILED_PRECONDITION: 9,
        /** ABORTED. */
        ABORTED: 10,
        /** OUT_OF_RANGE. */
        OUT_OF_RANGE: 11,
        /** UNIMPLEMENTED. */
        UNIMPLEMENTED: 12,
        /** INTERNAL. */
        INTERNAL: 13,
        /** UNAVAILABLE. */
        UNAVAILABLE: 14,
        /** DATA_LOSS. */
        DATA_LOSS: 15,
        /** UNAUTHENTICATED. */
        UNAUTHENTICATED: 16
      };
      exports.MessageTypeValues = {
        /** sent. */
        SENT: "SENT",
        /** received. */
        RECEIVED: "RECEIVED"
      };
    }
  });

  // ../../../.yarn/cache/@opentelemetry-semantic-conventions-npm-1.21.0-c8acc602bb-ba1eabdbe5.zip/node_modules/@opentelemetry/semantic-conventions/build/src/trace/index.js
  var require_trace2 = __commonJS({
    "../../../.yarn/cache/@opentelemetry-semantic-conventions-npm-1.21.0-c8acc602bb-ba1eabdbe5.zip/node_modules/@opentelemetry/semantic-conventions/build/src/trace/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_SemanticAttributes(), exports);
    }
  });

  // ../../../.yarn/cache/@opentelemetry-semantic-conventions-npm-1.21.0-c8acc602bb-ba1eabdbe5.zip/node_modules/@opentelemetry/semantic-conventions/build/src/resource/SemanticResourceAttributes.js
  var require_SemanticResourceAttributes = __commonJS({
    "../../../.yarn/cache/@opentelemetry-semantic-conventions-npm-1.21.0-c8acc602bb-ba1eabdbe5.zip/node_modules/@opentelemetry/semantic-conventions/build/src/resource/SemanticResourceAttributes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TelemetrySdkLanguageValues = exports.OsTypeValues = exports.HostArchValues = exports.AwsEcsLaunchtypeValues = exports.CloudPlatformValues = exports.CloudProviderValues = exports.SemanticResourceAttributes = void 0;
      exports.SemanticResourceAttributes = {
        /**
         * Name of the cloud provider.
         */
        CLOUD_PROVIDER: "cloud.provider",
        /**
         * The cloud account ID the resource is assigned to.
         */
        CLOUD_ACCOUNT_ID: "cloud.account.id",
        /**
         * The geographical region the resource is running. Refer to your provider&#39;s docs to see the available regions, for example [Alibaba Cloud regions](https://www.alibabacloud.com/help/doc-detail/40654.htm), [AWS regions](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/), [Azure regions](https://azure.microsoft.com/en-us/global-infrastructure/geographies/), or [Google Cloud regions](https://cloud.google.com/about/locations).
         */
        CLOUD_REGION: "cloud.region",
        /**
         * Cloud regions often have multiple, isolated locations known as zones to increase availability. Availability zone represents the zone where the resource is running.
         *
         * Note: Availability zones are called &#34;zones&#34; on Alibaba Cloud and Google Cloud.
         */
        CLOUD_AVAILABILITY_ZONE: "cloud.availability_zone",
        /**
         * The cloud platform in use.
         *
         * Note: The prefix of the service SHOULD match the one specified in `cloud.provider`.
         */
        CLOUD_PLATFORM: "cloud.platform",
        /**
         * The Amazon Resource Name (ARN) of an [ECS container instance](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html).
         */
        AWS_ECS_CONTAINER_ARN: "aws.ecs.container.arn",
        /**
         * The ARN of an [ECS cluster](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/clusters.html).
         */
        AWS_ECS_CLUSTER_ARN: "aws.ecs.cluster.arn",
        /**
         * The [launch type](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html) for an ECS task.
         */
        AWS_ECS_LAUNCHTYPE: "aws.ecs.launchtype",
        /**
         * The ARN of an [ECS task definition](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html).
         */
        AWS_ECS_TASK_ARN: "aws.ecs.task.arn",
        /**
         * The task definition family this task definition is a member of.
         */
        AWS_ECS_TASK_FAMILY: "aws.ecs.task.family",
        /**
         * The revision for this task definition.
         */
        AWS_ECS_TASK_REVISION: "aws.ecs.task.revision",
        /**
         * The ARN of an EKS cluster.
         */
        AWS_EKS_CLUSTER_ARN: "aws.eks.cluster.arn",
        /**
         * The name(s) of the AWS log group(s) an application is writing to.
         *
         * Note: Multiple log groups must be supported for cases like multi-container applications, where a single application has sidecar containers, and each write to their own log group.
         */
        AWS_LOG_GROUP_NAMES: "aws.log.group.names",
        /**
         * The Amazon Resource Name(s) (ARN) of the AWS log group(s).
         *
         * Note: See the [log group ARN format documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/iam-access-control-overview-cwl.html#CWL_ARN_Format).
         */
        AWS_LOG_GROUP_ARNS: "aws.log.group.arns",
        /**
         * The name(s) of the AWS log stream(s) an application is writing to.
         */
        AWS_LOG_STREAM_NAMES: "aws.log.stream.names",
        /**
         * The ARN(s) of the AWS log stream(s).
         *
         * Note: See the [log stream ARN format documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/iam-access-control-overview-cwl.html#CWL_ARN_Format). One log group can contain several log streams, so these ARNs necessarily identify both a log group and a log stream.
         */
        AWS_LOG_STREAM_ARNS: "aws.log.stream.arns",
        /**
         * Container name.
         */
        CONTAINER_NAME: "container.name",
        /**
         * Container ID. Usually a UUID, as for example used to [identify Docker containers](https://docs.docker.com/engine/reference/run/#container-identification). The UUID might be abbreviated.
         */
        CONTAINER_ID: "container.id",
        /**
         * The container runtime managing this container.
         */
        CONTAINER_RUNTIME: "container.runtime",
        /**
         * Name of the image the container was built on.
         */
        CONTAINER_IMAGE_NAME: "container.image.name",
        /**
         * Container image tag.
         */
        CONTAINER_IMAGE_TAG: "container.image.tag",
        /**
         * Name of the [deployment environment](https://en.wikipedia.org/wiki/Deployment_environment) (aka deployment tier).
         */
        DEPLOYMENT_ENVIRONMENT: "deployment.environment",
        /**
         * A unique identifier representing the device.
         *
         * Note: The device identifier MUST only be defined using the values outlined below. This value is not an advertising identifier and MUST NOT be used as such. On iOS (Swift or Objective-C), this value MUST be equal to the [vendor identifier](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor). On Android (Java or Kotlin), this value MUST be equal to the Firebase Installation ID or a globally unique UUID which is persisted across sessions in your application. More information can be found [here](https://developer.android.com/training/articles/user-data-ids) on best practices and exact implementation details. Caution should be taken when storing personal data or anything which can identify a user. GDPR and data protection laws may apply, ensure you do your own due diligence.
         */
        DEVICE_ID: "device.id",
        /**
         * The model identifier for the device.
         *
         * Note: It&#39;s recommended this value represents a machine readable version of the model identifier rather than the market or consumer-friendly name of the device.
         */
        DEVICE_MODEL_IDENTIFIER: "device.model.identifier",
        /**
         * The marketing name for the device model.
         *
         * Note: It&#39;s recommended this value represents a human readable version of the device model rather than a machine readable alternative.
         */
        DEVICE_MODEL_NAME: "device.model.name",
        /**
         * The name of the single function that this runtime instance executes.
         *
         * Note: This is the name of the function as configured/deployed on the FaaS platform and is usually different from the name of the callback function (which may be stored in the [`code.namespace`/`code.function`](../../trace/semantic_conventions/span-general.md#source-code-attributes) span attributes).
         */
        FAAS_NAME: "faas.name",
        /**
          * The unique ID of the single function that this runtime instance executes.
          *
          * Note: Depending on the cloud provider, use:
        
        * **AWS Lambda:** The function [ARN](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
        Take care not to use the &#34;invoked ARN&#34; directly but replace any
        [alias suffix](https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html) with the resolved function version, as the same runtime instance may be invokable with multiple
        different aliases.
        * **GCP:** The [URI of the resource](https://cloud.google.com/iam/docs/full-resource-names)
        * **Azure:** The [Fully Qualified Resource ID](https://docs.microsoft.com/en-us/rest/api/resources/resources/get-by-id).
        
        On some providers, it may not be possible to determine the full ID at startup,
        which is why this field cannot be made required. For example, on AWS the account ID
        part of the ARN is not available without calling another AWS API
        which may be deemed too slow for a short-running lambda function.
        As an alternative, consider setting `faas.id` as a span attribute instead.
          */
        FAAS_ID: "faas.id",
        /**
          * The immutable version of the function being executed.
          *
          * Note: Depending on the cloud provider and platform, use:
        
        * **AWS Lambda:** The [function version](https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html)
          (an integer represented as a decimal string).
        * **Google Cloud Run:** The [revision](https://cloud.google.com/run/docs/managing/revisions)
          (i.e., the function name plus the revision suffix).
        * **Google Cloud Functions:** The value of the
          [`K_REVISION` environment variable](https://cloud.google.com/functions/docs/env-var#runtime_environment_variables_set_automatically).
        * **Azure Functions:** Not applicable. Do not set this attribute.
          */
        FAAS_VERSION: "faas.version",
        /**
         * The execution environment ID as a string, that will be potentially reused for other invocations to the same function/function version.
         *
         * Note: * **AWS Lambda:** Use the (full) log stream name.
         */
        FAAS_INSTANCE: "faas.instance",
        /**
         * The amount of memory available to the serverless function in MiB.
         *
         * Note: It&#39;s recommended to set this attribute since e.g. too little memory can easily stop a Java AWS Lambda function from working correctly. On AWS Lambda, the environment variable `AWS_LAMBDA_FUNCTION_MEMORY_SIZE` provides this information.
         */
        FAAS_MAX_MEMORY: "faas.max_memory",
        /**
         * Unique host ID. For Cloud, this must be the instance_id assigned by the cloud provider.
         */
        HOST_ID: "host.id",
        /**
         * Name of the host. On Unix systems, it may contain what the hostname command returns, or the fully qualified hostname, or another name specified by the user.
         */
        HOST_NAME: "host.name",
        /**
         * Type of host. For Cloud, this must be the machine type.
         */
        HOST_TYPE: "host.type",
        /**
         * The CPU architecture the host system is running on.
         */
        HOST_ARCH: "host.arch",
        /**
         * Name of the VM image or OS install the host was instantiated from.
         */
        HOST_IMAGE_NAME: "host.image.name",
        /**
         * VM image ID. For Cloud, this value is from the provider.
         */
        HOST_IMAGE_ID: "host.image.id",
        /**
         * The version string of the VM image as defined in [Version SpanAttributes](README.md#version-attributes).
         */
        HOST_IMAGE_VERSION: "host.image.version",
        /**
         * The name of the cluster.
         */
        K8S_CLUSTER_NAME: "k8s.cluster.name",
        /**
         * The name of the Node.
         */
        K8S_NODE_NAME: "k8s.node.name",
        /**
         * The UID of the Node.
         */
        K8S_NODE_UID: "k8s.node.uid",
        /**
         * The name of the namespace that the pod is running in.
         */
        K8S_NAMESPACE_NAME: "k8s.namespace.name",
        /**
         * The UID of the Pod.
         */
        K8S_POD_UID: "k8s.pod.uid",
        /**
         * The name of the Pod.
         */
        K8S_POD_NAME: "k8s.pod.name",
        /**
         * The name of the Container in a Pod template.
         */
        K8S_CONTAINER_NAME: "k8s.container.name",
        /**
         * The UID of the ReplicaSet.
         */
        K8S_REPLICASET_UID: "k8s.replicaset.uid",
        /**
         * The name of the ReplicaSet.
         */
        K8S_REPLICASET_NAME: "k8s.replicaset.name",
        /**
         * The UID of the Deployment.
         */
        K8S_DEPLOYMENT_UID: "k8s.deployment.uid",
        /**
         * The name of the Deployment.
         */
        K8S_DEPLOYMENT_NAME: "k8s.deployment.name",
        /**
         * The UID of the StatefulSet.
         */
        K8S_STATEFULSET_UID: "k8s.statefulset.uid",
        /**
         * The name of the StatefulSet.
         */
        K8S_STATEFULSET_NAME: "k8s.statefulset.name",
        /**
         * The UID of the DaemonSet.
         */
        K8S_DAEMONSET_UID: "k8s.daemonset.uid",
        /**
         * The name of the DaemonSet.
         */
        K8S_DAEMONSET_NAME: "k8s.daemonset.name",
        /**
         * The UID of the Job.
         */
        K8S_JOB_UID: "k8s.job.uid",
        /**
         * The name of the Job.
         */
        K8S_JOB_NAME: "k8s.job.name",
        /**
         * The UID of the CronJob.
         */
        K8S_CRONJOB_UID: "k8s.cronjob.uid",
        /**
         * The name of the CronJob.
         */
        K8S_CRONJOB_NAME: "k8s.cronjob.name",
        /**
         * The operating system type.
         */
        OS_TYPE: "os.type",
        /**
         * Human readable (not intended to be parsed) OS version information, like e.g. reported by `ver` or `lsb_release -a` commands.
         */
        OS_DESCRIPTION: "os.description",
        /**
         * Human readable operating system name.
         */
        OS_NAME: "os.name",
        /**
         * The version string of the operating system as defined in [Version SpanAttributes](../../resource/semantic_conventions/README.md#version-attributes).
         */
        OS_VERSION: "os.version",
        /**
         * Process identifier (PID).
         */
        PROCESS_PID: "process.pid",
        /**
         * The name of the process executable. On Linux based systems, can be set to the `Name` in `proc/[pid]/status`. On Windows, can be set to the base name of `GetProcessImageFileNameW`.
         */
        PROCESS_EXECUTABLE_NAME: "process.executable.name",
        /**
         * The full path to the process executable. On Linux based systems, can be set to the target of `proc/[pid]/exe`. On Windows, can be set to the result of `GetProcessImageFileNameW`.
         */
        PROCESS_EXECUTABLE_PATH: "process.executable.path",
        /**
         * The command used to launch the process (i.e. the command name). On Linux based systems, can be set to the zeroth string in `proc/[pid]/cmdline`. On Windows, can be set to the first parameter extracted from `GetCommandLineW`.
         */
        PROCESS_COMMAND: "process.command",
        /**
         * The full command used to launch the process as a single string representing the full command. On Windows, can be set to the result of `GetCommandLineW`. Do not set this if you have to assemble it just for monitoring; use `process.command_args` instead.
         */
        PROCESS_COMMAND_LINE: "process.command_line",
        /**
         * All the command arguments (including the command/executable itself) as received by the process. On Linux-based systems (and some other Unixoid systems supporting procfs), can be set according to the list of null-delimited strings extracted from `proc/[pid]/cmdline`. For libc-based executables, this would be the full argv vector passed to `main`.
         */
        PROCESS_COMMAND_ARGS: "process.command_args",
        /**
         * The username of the user that owns the process.
         */
        PROCESS_OWNER: "process.owner",
        /**
         * The name of the runtime of this process. For compiled native binaries, this SHOULD be the name of the compiler.
         */
        PROCESS_RUNTIME_NAME: "process.runtime.name",
        /**
         * The version of the runtime of this process, as returned by the runtime without modification.
         */
        PROCESS_RUNTIME_VERSION: "process.runtime.version",
        /**
         * An additional description about the runtime of the process, for example a specific vendor customization of the runtime environment.
         */
        PROCESS_RUNTIME_DESCRIPTION: "process.runtime.description",
        /**
         * Logical name of the service.
         *
         * Note: MUST be the same for all instances of horizontally scaled services. If the value was not specified, SDKs MUST fallback to `unknown_service:` concatenated with [`process.executable.name`](process.md#process), e.g. `unknown_service:bash`. If `process.executable.name` is not available, the value MUST be set to `unknown_service`.
         */
        SERVICE_NAME: "service.name",
        /**
         * A namespace for `service.name`.
         *
         * Note: A string value having a meaning that helps to distinguish a group of services, for example the team name that owns a group of services. `service.name` is expected to be unique within the same namespace. If `service.namespace` is not specified in the Resource then `service.name` is expected to be unique for all services that have no explicit namespace defined (so the empty/unspecified namespace is simply one more valid namespace). Zero-length namespace string is assumed equal to unspecified namespace.
         */
        SERVICE_NAMESPACE: "service.namespace",
        /**
         * The string ID of the service instance.
         *
         * Note: MUST be unique for each instance of the same `service.namespace,service.name` pair (in other words `service.namespace,service.name,service.instance.id` triplet MUST be globally unique). The ID helps to distinguish instances of the same service that exist at the same time (e.g. instances of a horizontally scaled service). It is preferable for the ID to be persistent and stay the same for the lifetime of the service instance, however it is acceptable that the ID is ephemeral and changes during important lifetime events for the service (e.g. service restarts). If the service has no inherent unique ID that can be used as the value of this attribute it is recommended to generate a random Version 1 or Version 4 RFC 4122 UUID (services aiming for reproducible UUIDs may also use Version 5, see RFC 4122 for more recommendations).
         */
        SERVICE_INSTANCE_ID: "service.instance.id",
        /**
         * The version string of the service API or implementation.
         */
        SERVICE_VERSION: "service.version",
        /**
         * The name of the telemetry SDK as defined above.
         */
        TELEMETRY_SDK_NAME: "telemetry.sdk.name",
        /**
         * The language of the telemetry SDK.
         */
        TELEMETRY_SDK_LANGUAGE: "telemetry.sdk.language",
        /**
         * The version string of the telemetry SDK.
         */
        TELEMETRY_SDK_VERSION: "telemetry.sdk.version",
        /**
         * The version string of the auto instrumentation agent, if used.
         */
        TELEMETRY_AUTO_VERSION: "telemetry.auto.version",
        /**
         * The name of the web engine.
         */
        WEBENGINE_NAME: "webengine.name",
        /**
         * The version of the web engine.
         */
        WEBENGINE_VERSION: "webengine.version",
        /**
         * Additional description of the web engine (e.g. detailed version and edition information).
         */
        WEBENGINE_DESCRIPTION: "webengine.description"
      };
      exports.CloudProviderValues = {
        /** Alibaba Cloud. */
        ALIBABA_CLOUD: "alibaba_cloud",
        /** Amazon Web Services. */
        AWS: "aws",
        /** Microsoft Azure. */
        AZURE: "azure",
        /** Google Cloud Platform. */
        GCP: "gcp"
      };
      exports.CloudPlatformValues = {
        /** Alibaba Cloud Elastic Compute Service. */
        ALIBABA_CLOUD_ECS: "alibaba_cloud_ecs",
        /** Alibaba Cloud Function Compute. */
        ALIBABA_CLOUD_FC: "alibaba_cloud_fc",
        /** AWS Elastic Compute Cloud. */
        AWS_EC2: "aws_ec2",
        /** AWS Elastic Container Service. */
        AWS_ECS: "aws_ecs",
        /** AWS Elastic Kubernetes Service. */
        AWS_EKS: "aws_eks",
        /** AWS Lambda. */
        AWS_LAMBDA: "aws_lambda",
        /** AWS Elastic Beanstalk. */
        AWS_ELASTIC_BEANSTALK: "aws_elastic_beanstalk",
        /** Azure Virtual Machines. */
        AZURE_VM: "azure_vm",
        /** Azure Container Instances. */
        AZURE_CONTAINER_INSTANCES: "azure_container_instances",
        /** Azure Kubernetes Service. */
        AZURE_AKS: "azure_aks",
        /** Azure Functions. */
        AZURE_FUNCTIONS: "azure_functions",
        /** Azure App Service. */
        AZURE_APP_SERVICE: "azure_app_service",
        /** Google Cloud Compute Engine (GCE). */
        GCP_COMPUTE_ENGINE: "gcp_compute_engine",
        /** Google Cloud Run. */
        GCP_CLOUD_RUN: "gcp_cloud_run",
        /** Google Cloud Kubernetes Engine (GKE). */
        GCP_KUBERNETES_ENGINE: "gcp_kubernetes_engine",
        /** Google Cloud Functions (GCF). */
        GCP_CLOUD_FUNCTIONS: "gcp_cloud_functions",
        /** Google Cloud App Engine (GAE). */
        GCP_APP_ENGINE: "gcp_app_engine"
      };
      exports.AwsEcsLaunchtypeValues = {
        /** ec2. */
        EC2: "ec2",
        /** fargate. */
        FARGATE: "fargate"
      };
      exports.HostArchValues = {
        /** AMD64. */
        AMD64: "amd64",
        /** ARM32. */
        ARM32: "arm32",
        /** ARM64. */
        ARM64: "arm64",
        /** Itanium. */
        IA64: "ia64",
        /** 32-bit PowerPC. */
        PPC32: "ppc32",
        /** 64-bit PowerPC. */
        PPC64: "ppc64",
        /** 32-bit x86. */
        X86: "x86"
      };
      exports.OsTypeValues = {
        /** Microsoft Windows. */
        WINDOWS: "windows",
        /** Linux. */
        LINUX: "linux",
        /** Apple Darwin. */
        DARWIN: "darwin",
        /** FreeBSD. */
        FREEBSD: "freebsd",
        /** NetBSD. */
        NETBSD: "netbsd",
        /** OpenBSD. */
        OPENBSD: "openbsd",
        /** DragonFly BSD. */
        DRAGONFLYBSD: "dragonflybsd",
        /** HP-UX (Hewlett Packard Unix). */
        HPUX: "hpux",
        /** AIX (Advanced Interactive eXecutive). */
        AIX: "aix",
        /** Oracle Solaris. */
        SOLARIS: "solaris",
        /** IBM z/OS. */
        Z_OS: "z_os"
      };
      exports.TelemetrySdkLanguageValues = {
        /** cpp. */
        CPP: "cpp",
        /** dotnet. */
        DOTNET: "dotnet",
        /** erlang. */
        ERLANG: "erlang",
        /** go. */
        GO: "go",
        /** java. */
        JAVA: "java",
        /** nodejs. */
        NODEJS: "nodejs",
        /** php. */
        PHP: "php",
        /** python. */
        PYTHON: "python",
        /** ruby. */
        RUBY: "ruby",
        /** webjs. */
        WEBJS: "webjs"
      };
    }
  });

  // ../../../.yarn/cache/@opentelemetry-semantic-conventions-npm-1.21.0-c8acc602bb-ba1eabdbe5.zip/node_modules/@opentelemetry/semantic-conventions/build/src/resource/index.js
  var require_resource = __commonJS({
    "../../../.yarn/cache/@opentelemetry-semantic-conventions-npm-1.21.0-c8acc602bb-ba1eabdbe5.zip/node_modules/@opentelemetry/semantic-conventions/build/src/resource/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_SemanticResourceAttributes(), exports);
    }
  });

  // ../../../.yarn/cache/@opentelemetry-semantic-conventions-npm-1.21.0-c8acc602bb-ba1eabdbe5.zip/node_modules/@opentelemetry/semantic-conventions/build/src/index.js
  var require_src2 = __commonJS({
    "../../../.yarn/cache/@opentelemetry-semantic-conventions-npm-1.21.0-c8acc602bb-ba1eabdbe5.zip/node_modules/@opentelemetry/semantic-conventions/build/src/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_trace2(), exports);
      __exportStar(require_resource(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/sdk-info.js
  var require_sdk_info = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/sdk-info.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SDK_INFO = void 0;
      var version_1 = require_version2();
      var semantic_conventions_1 = require_src2();
      exports.SDK_INFO = {
        [semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_NAME]: "opentelemetry",
        [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: "node",
        [semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE]: semantic_conventions_1.TelemetrySdkLanguageValues.NODEJS,
        [semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]: version_1.VERSION
      };
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/timer-util.js
  var require_timer_util = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/timer-util.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.unrefTimer = void 0;
      function unrefTimer(timer) {
        timer.unref();
      }
      exports.unrefTimer = unrefTimer;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/index.js
  var require_node2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/node/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_environment2(), exports);
      __exportStar(require_globalThis3(), exports);
      __exportStar(require_hex_to_base64(), exports);
      __exportStar(require_RandomIdGenerator(), exports);
      __exportStar(require_performance(), exports);
      __exportStar(require_sdk_info(), exports);
      __exportStar(require_timer_util(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/index.js
  var require_platform2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/platform/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_node2(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/time.js
  var require_time = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/time.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.addHrTimes = exports.isTimeInput = exports.isTimeInputHrTime = exports.hrTimeToMicroseconds = exports.hrTimeToMilliseconds = exports.hrTimeToNanoseconds = exports.hrTimeToTimeStamp = exports.hrTimeDuration = exports.timeInputToHrTime = exports.hrTime = exports.getTimeOrigin = exports.millisToHrTime = void 0;
      var platform_1 = require_platform2();
      var NANOSECOND_DIGITS = 9;
      var NANOSECOND_DIGITS_IN_MILLIS = 6;
      var MILLISECONDS_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS_IN_MILLIS);
      var SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
      function millisToHrTime(epochMillis) {
        const epochSeconds = epochMillis / 1e3;
        const seconds = Math.trunc(epochSeconds);
        const nanos = Math.round(epochMillis % 1e3 * MILLISECONDS_TO_NANOSECONDS);
        return [seconds, nanos];
      }
      exports.millisToHrTime = millisToHrTime;
      function getTimeOrigin() {
        let timeOrigin = platform_1.otperformance.timeOrigin;
        if (typeof timeOrigin !== "number") {
          const perf = platform_1.otperformance;
          timeOrigin = perf.timing && perf.timing.fetchStart;
        }
        return timeOrigin;
      }
      exports.getTimeOrigin = getTimeOrigin;
      function hrTime(performanceNow) {
        const timeOrigin = millisToHrTime(getTimeOrigin());
        const now = millisToHrTime(typeof performanceNow === "number" ? performanceNow : platform_1.otperformance.now());
        return addHrTimes(timeOrigin, now);
      }
      exports.hrTime = hrTime;
      function timeInputToHrTime(time) {
        if (isTimeInputHrTime(time)) {
          return time;
        } else if (typeof time === "number") {
          if (time < getTimeOrigin()) {
            return hrTime(time);
          } else {
            return millisToHrTime(time);
          }
        } else if (time instanceof Date) {
          return millisToHrTime(time.getTime());
        } else {
          throw TypeError("Invalid input type");
        }
      }
      exports.timeInputToHrTime = timeInputToHrTime;
      function hrTimeDuration(startTime, endTime) {
        let seconds = endTime[0] - startTime[0];
        let nanos = endTime[1] - startTime[1];
        if (nanos < 0) {
          seconds -= 1;
          nanos += SECOND_TO_NANOSECONDS;
        }
        return [seconds, nanos];
      }
      exports.hrTimeDuration = hrTimeDuration;
      function hrTimeToTimeStamp(time) {
        const precision = NANOSECOND_DIGITS;
        const tmp = `${"0".repeat(precision)}${time[1]}Z`;
        const nanoString = tmp.substr(tmp.length - precision - 1);
        const date = new Date(time[0] * 1e3).toISOString();
        return date.replace("000Z", nanoString);
      }
      exports.hrTimeToTimeStamp = hrTimeToTimeStamp;
      function hrTimeToNanoseconds(time) {
        return time[0] * SECOND_TO_NANOSECONDS + time[1];
      }
      exports.hrTimeToNanoseconds = hrTimeToNanoseconds;
      function hrTimeToMilliseconds(time) {
        return time[0] * 1e3 + time[1] / 1e6;
      }
      exports.hrTimeToMilliseconds = hrTimeToMilliseconds;
      function hrTimeToMicroseconds(time) {
        return time[0] * 1e6 + time[1] / 1e3;
      }
      exports.hrTimeToMicroseconds = hrTimeToMicroseconds;
      function isTimeInputHrTime(value) {
        return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
      }
      exports.isTimeInputHrTime = isTimeInputHrTime;
      function isTimeInput(value) {
        return isTimeInputHrTime(value) || typeof value === "number" || value instanceof Date;
      }
      exports.isTimeInput = isTimeInput;
      function addHrTimes(time1, time2) {
        const out = [time1[0] + time2[0], time1[1] + time2[1]];
        if (out[1] >= SECOND_TO_NANOSECONDS) {
          out[1] -= SECOND_TO_NANOSECONDS;
          out[0] += 1;
        }
        return out;
      }
      exports.addHrTimes = addHrTimes;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/types.js
  var require_types2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/common/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/ExportResult.js
  var require_ExportResult = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/ExportResult.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ExportResultCode = void 0;
      var ExportResultCode;
      (function(ExportResultCode2) {
        ExportResultCode2[ExportResultCode2["SUCCESS"] = 0] = "SUCCESS";
        ExportResultCode2[ExportResultCode2["FAILED"] = 1] = "FAILED";
      })(ExportResultCode = exports.ExportResultCode || (exports.ExportResultCode = {}));
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/propagation/composite.js
  var require_composite = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/propagation/composite.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CompositePropagator = void 0;
      var api_1 = require_src();
      var CompositePropagator = class {
        /**
         * Construct a composite propagator from a list of propagators.
         *
         * @param [config] Configuration object for composite propagator
         */
        constructor(config = {}) {
          var _a;
          this._propagators = (_a = config.propagators) !== null && _a !== void 0 ? _a : [];
          this._fields = Array.from(new Set(this._propagators.map((p) => typeof p.fields === "function" ? p.fields() : []).reduce((x, y) => x.concat(y), [])));
        }
        /**
         * Run each of the configured propagators with the given context and carrier.
         * Propagators are run in the order they are configured, so if multiple
         * propagators write the same carrier key, the propagator later in the list
         * will "win".
         *
         * @param context Context to inject
         * @param carrier Carrier into which context will be injected
         */
        inject(context2, carrier, setter) {
          for (const propagator of this._propagators) {
            try {
              propagator.inject(context2, carrier, setter);
            } catch (err) {
              api_1.diag.warn(`Failed to inject with ${propagator.constructor.name}. Err: ${err.message}`);
            }
          }
        }
        /**
         * Run each of the configured propagators with the given context and carrier.
         * Propagators are run in the order they are configured, so if multiple
         * propagators write the same context key, the propagator later in the list
         * will "win".
         *
         * @param context Context to add values to
         * @param carrier Carrier from which to extract context
         */
        extract(context2, carrier, getter) {
          return this._propagators.reduce((ctx, propagator) => {
            try {
              return propagator.extract(ctx, carrier, getter);
            } catch (err) {
              api_1.diag.warn(`Failed to inject with ${propagator.constructor.name}. Err: ${err.message}`);
            }
            return ctx;
          }, context2);
        }
        fields() {
          return this._fields.slice();
        }
      };
      exports.CompositePropagator = CompositePropagator;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/internal/validators.js
  var require_validators = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/internal/validators.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.validateValue = exports.validateKey = void 0;
      var VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
      var VALID_KEY = `[a-z]${VALID_KEY_CHAR_RANGE}{0,255}`;
      var VALID_VENDOR_KEY = `[a-z0-9]${VALID_KEY_CHAR_RANGE}{0,240}@[a-z]${VALID_KEY_CHAR_RANGE}{0,13}`;
      var VALID_KEY_REGEX = new RegExp(`^(?:${VALID_KEY}|${VALID_VENDOR_KEY})$`);
      var VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
      var INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
      function validateKey(key) {
        return VALID_KEY_REGEX.test(key);
      }
      exports.validateKey = validateKey;
      function validateValue(value) {
        return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
      }
      exports.validateValue = validateValue;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/TraceState.js
  var require_TraceState = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/TraceState.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TraceState = void 0;
      var validators_1 = require_validators();
      var MAX_TRACE_STATE_ITEMS = 32;
      var MAX_TRACE_STATE_LEN = 512;
      var LIST_MEMBERS_SEPARATOR = ",";
      var LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
      var TraceState = class _TraceState {
        constructor(rawTraceState) {
          this._internalState = /* @__PURE__ */ new Map();
          if (rawTraceState)
            this._parse(rawTraceState);
        }
        set(key, value) {
          const traceState = this._clone();
          if (traceState._internalState.has(key)) {
            traceState._internalState.delete(key);
          }
          traceState._internalState.set(key, value);
          return traceState;
        }
        unset(key) {
          const traceState = this._clone();
          traceState._internalState.delete(key);
          return traceState;
        }
        get(key) {
          return this._internalState.get(key);
        }
        serialize() {
          return this._keys().reduce((agg, key) => {
            agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + this.get(key));
            return agg;
          }, []).join(LIST_MEMBERS_SEPARATOR);
        }
        _parse(rawTraceState) {
          if (rawTraceState.length > MAX_TRACE_STATE_LEN)
            return;
          this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce((agg, part) => {
            const listMember = part.trim();
            const i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
            if (i !== -1) {
              const key = listMember.slice(0, i);
              const value = listMember.slice(i + 1, part.length);
              if ((0, validators_1.validateKey)(key) && (0, validators_1.validateValue)(value)) {
                agg.set(key, value);
              } else {
              }
            }
            return agg;
          }, /* @__PURE__ */ new Map());
          if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
            this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
          }
        }
        _keys() {
          return Array.from(this._internalState.keys()).reverse();
        }
        _clone() {
          const traceState = new _TraceState();
          traceState._internalState = new Map(this._internalState);
          return traceState;
        }
      };
      exports.TraceState = TraceState;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/W3CTraceContextPropagator.js
  var require_W3CTraceContextPropagator = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/W3CTraceContextPropagator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.W3CTraceContextPropagator = exports.parseTraceParent = exports.TRACE_STATE_HEADER = exports.TRACE_PARENT_HEADER = void 0;
      var api_1 = require_src();
      var suppress_tracing_1 = require_suppress_tracing();
      var TraceState_1 = require_TraceState();
      exports.TRACE_PARENT_HEADER = "traceparent";
      exports.TRACE_STATE_HEADER = "tracestate";
      var VERSION = "00";
      var VERSION_PART = "(?!ff)[\\da-f]{2}";
      var TRACE_ID_PART = "(?![0]{32})[\\da-f]{32}";
      var PARENT_ID_PART = "(?![0]{16})[\\da-f]{16}";
      var FLAGS_PART = "[\\da-f]{2}";
      var TRACE_PARENT_REGEX = new RegExp(`^\\s?(${VERSION_PART})-(${TRACE_ID_PART})-(${PARENT_ID_PART})-(${FLAGS_PART})(-.*)?\\s?$`);
      function parseTraceParent2(traceParent) {
        const match = TRACE_PARENT_REGEX.exec(traceParent);
        if (!match)
          return null;
        if (match[1] === "00" && match[5])
          return null;
        return {
          traceId: match[2],
          spanId: match[3],
          traceFlags: parseInt(match[4], 16)
        };
      }
      exports.parseTraceParent = parseTraceParent2;
      var W3CTraceContextPropagator = class {
        inject(context2, carrier, setter) {
          const spanContext = api_1.trace.getSpanContext(context2);
          if (!spanContext || (0, suppress_tracing_1.isTracingSuppressed)(context2) || !(0, api_1.isSpanContextValid)(spanContext))
            return;
          const traceParent = `${VERSION}-${spanContext.traceId}-${spanContext.spanId}-0${Number(spanContext.traceFlags || api_1.TraceFlags.NONE).toString(16)}`;
          setter.set(carrier, exports.TRACE_PARENT_HEADER, traceParent);
          if (spanContext.traceState) {
            setter.set(carrier, exports.TRACE_STATE_HEADER, spanContext.traceState.serialize());
          }
        }
        extract(context2, carrier, getter) {
          const traceParentHeader = getter.get(carrier, exports.TRACE_PARENT_HEADER);
          if (!traceParentHeader)
            return context2;
          const traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
          if (typeof traceParent !== "string")
            return context2;
          const spanContext = parseTraceParent2(traceParent);
          if (!spanContext)
            return context2;
          spanContext.isRemote = true;
          const traceStateHeader = getter.get(carrier, exports.TRACE_STATE_HEADER);
          if (traceStateHeader) {
            const state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
            spanContext.traceState = new TraceState_1.TraceState(typeof state === "string" ? state : void 0);
          }
          return api_1.trace.setSpanContext(context2, spanContext);
        }
        fields() {
          return [exports.TRACE_PARENT_HEADER, exports.TRACE_STATE_HEADER];
        }
      };
      exports.W3CTraceContextPropagator = W3CTraceContextPropagator;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/IdGenerator.js
  var require_IdGenerator = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/IdGenerator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.js
  var require_rpc_metadata = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getRPCMetadata = exports.deleteRPCMetadata = exports.setRPCMetadata = exports.RPCType = void 0;
      var api_1 = require_src();
      var RPC_METADATA_KEY = (0, api_1.createContextKey)("OpenTelemetry SDK Context Key RPC_METADATA");
      var RPCType;
      (function(RPCType2) {
        RPCType2["HTTP"] = "http";
      })(RPCType = exports.RPCType || (exports.RPCType = {}));
      function setRPCMetadata(context2, meta) {
        return context2.setValue(RPC_METADATA_KEY, meta);
      }
      exports.setRPCMetadata = setRPCMetadata;
      function deleteRPCMetadata(context2) {
        return context2.deleteValue(RPC_METADATA_KEY);
      }
      exports.deleteRPCMetadata = deleteRPCMetadata;
      function getRPCMetadata(context2) {
        return context2.getValue(RPC_METADATA_KEY);
      }
      exports.getRPCMetadata = getRPCMetadata;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOffSampler.js
  var require_AlwaysOffSampler = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOffSampler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AlwaysOffSampler = void 0;
      var api_1 = require_src();
      var AlwaysOffSampler = class {
        shouldSample() {
          return {
            decision: api_1.SamplingDecision.NOT_RECORD
          };
        }
        toString() {
          return "AlwaysOffSampler";
        }
      };
      exports.AlwaysOffSampler = AlwaysOffSampler;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOnSampler.js
  var require_AlwaysOnSampler = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOnSampler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AlwaysOnSampler = void 0;
      var api_1 = require_src();
      var AlwaysOnSampler = class {
        shouldSample() {
          return {
            decision: api_1.SamplingDecision.RECORD_AND_SAMPLED
          };
        }
        toString() {
          return "AlwaysOnSampler";
        }
      };
      exports.AlwaysOnSampler = AlwaysOnSampler;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/sampler/ParentBasedSampler.js
  var require_ParentBasedSampler = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/sampler/ParentBasedSampler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ParentBasedSampler = void 0;
      var api_1 = require_src();
      var global_error_handler_1 = require_global_error_handler();
      var AlwaysOffSampler_1 = require_AlwaysOffSampler();
      var AlwaysOnSampler_1 = require_AlwaysOnSampler();
      var ParentBasedSampler = class {
        constructor(config) {
          var _a, _b, _c, _d;
          this._root = config.root;
          if (!this._root) {
            (0, global_error_handler_1.globalErrorHandler)(new Error("ParentBasedSampler must have a root sampler configured"));
            this._root = new AlwaysOnSampler_1.AlwaysOnSampler();
          }
          this._remoteParentSampled = (_a = config.remoteParentSampled) !== null && _a !== void 0 ? _a : new AlwaysOnSampler_1.AlwaysOnSampler();
          this._remoteParentNotSampled = (_b = config.remoteParentNotSampled) !== null && _b !== void 0 ? _b : new AlwaysOffSampler_1.AlwaysOffSampler();
          this._localParentSampled = (_c = config.localParentSampled) !== null && _c !== void 0 ? _c : new AlwaysOnSampler_1.AlwaysOnSampler();
          this._localParentNotSampled = (_d = config.localParentNotSampled) !== null && _d !== void 0 ? _d : new AlwaysOffSampler_1.AlwaysOffSampler();
        }
        shouldSample(context2, traceId, spanName, spanKind, attributes, links) {
          const parentContext = api_1.trace.getSpanContext(context2);
          if (!parentContext || !(0, api_1.isSpanContextValid)(parentContext)) {
            return this._root.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
          }
          if (parentContext.isRemote) {
            if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
              return this._remoteParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
            }
            return this._remoteParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
          }
          if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
            return this._localParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
          }
          return this._localParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
        }
        toString() {
          return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
        }
      };
      exports.ParentBasedSampler = ParentBasedSampler;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/sampler/TraceIdRatioBasedSampler.js
  var require_TraceIdRatioBasedSampler = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/trace/sampler/TraceIdRatioBasedSampler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TraceIdRatioBasedSampler = void 0;
      var api_1 = require_src();
      var TraceIdRatioBasedSampler = class {
        constructor(_ratio = 0) {
          this._ratio = _ratio;
          this._ratio = this._normalize(_ratio);
          this._upperBound = Math.floor(this._ratio * 4294967295);
        }
        shouldSample(context2, traceId) {
          return {
            decision: (0, api_1.isValidTraceId)(traceId) && this._accumulate(traceId) < this._upperBound ? api_1.SamplingDecision.RECORD_AND_SAMPLED : api_1.SamplingDecision.NOT_RECORD
          };
        }
        toString() {
          return `TraceIdRatioBased{${this._ratio}}`;
        }
        _normalize(ratio) {
          if (typeof ratio !== "number" || isNaN(ratio))
            return 0;
          return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
        }
        _accumulate(traceId) {
          let accumulation = 0;
          for (let i = 0; i < traceId.length / 8; i++) {
            const pos = i * 8;
            const part = parseInt(traceId.slice(pos, pos + 8), 16);
            accumulation = (accumulation ^ part) >>> 0;
          }
          return accumulation;
        }
      };
      exports.TraceIdRatioBasedSampler = TraceIdRatioBasedSampler;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/lodash.merge.js
  var require_lodash_merge = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/lodash.merge.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isPlainObject = void 0;
      var objectTag = "[object Object]";
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var funcProto = Function.prototype;
      var funcToString = funcProto.toString;
      var objectCtorString = funcToString.call(Object);
      var getPrototype = overArg(Object.getPrototypeOf, Object);
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
      var nativeObjectToString = objectProto.toString;
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      function isPlainObject(value) {
        if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
          return false;
        }
        const proto = getPrototype(value);
        if (proto === null) {
          return true;
        }
        const Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
        return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
      }
      exports.isPlainObject = isPlainObject;
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      function getRawTag(value) {
        const isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        let unmasked = false;
        try {
          value[symToStringTag] = void 0;
          unmasked = true;
        } catch (e) {
        }
        const result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/merge.js
  var require_merge = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/merge.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.merge = void 0;
      var lodash_merge_1 = require_lodash_merge();
      var MAX_LEVEL = 20;
      function merge2(...args) {
        let result = args.shift();
        const objects = /* @__PURE__ */ new WeakMap();
        while (args.length > 0) {
          result = mergeTwoObjects(result, args.shift(), 0, objects);
        }
        return result;
      }
      exports.merge = merge2;
      function takeValue(value) {
        if (isArray2(value)) {
          return value.slice();
        }
        return value;
      }
      function mergeTwoObjects(one, two, level = 0, objects) {
        let result;
        if (level > MAX_LEVEL) {
          return void 0;
        }
        level++;
        if (isPrimitive(one) || isPrimitive(two) || isFunction(two)) {
          result = takeValue(two);
        } else if (isArray2(one)) {
          result = one.slice();
          if (isArray2(two)) {
            for (let i = 0, j = two.length; i < j; i++) {
              result.push(takeValue(two[i]));
            }
          } else if (isObject3(two)) {
            const keys = Object.keys(two);
            for (let i = 0, j = keys.length; i < j; i++) {
              const key = keys[i];
              result[key] = takeValue(two[key]);
            }
          }
        } else if (isObject3(one)) {
          if (isObject3(two)) {
            if (!shouldMerge(one, two)) {
              return two;
            }
            result = Object.assign({}, one);
            const keys = Object.keys(two);
            for (let i = 0, j = keys.length; i < j; i++) {
              const key = keys[i];
              const twoValue = two[key];
              if (isPrimitive(twoValue)) {
                if (typeof twoValue === "undefined") {
                  delete result[key];
                } else {
                  result[key] = twoValue;
                }
              } else {
                const obj1 = result[key];
                const obj2 = twoValue;
                if (wasObjectReferenced(one, key, objects) || wasObjectReferenced(two, key, objects)) {
                  delete result[key];
                } else {
                  if (isObject3(obj1) && isObject3(obj2)) {
                    const arr1 = objects.get(obj1) || [];
                    const arr2 = objects.get(obj2) || [];
                    arr1.push({ obj: one, key });
                    arr2.push({ obj: two, key });
                    objects.set(obj1, arr1);
                    objects.set(obj2, arr2);
                  }
                  result[key] = mergeTwoObjects(result[key], twoValue, level, objects);
                }
              }
            }
          } else {
            result = two;
          }
        }
        return result;
      }
      function wasObjectReferenced(obj, key, objects) {
        const arr = objects.get(obj[key]) || [];
        for (let i = 0, j = arr.length; i < j; i++) {
          const info = arr[i];
          if (info.key === key && info.obj === obj) {
            return true;
          }
        }
        return false;
      }
      function isArray2(value) {
        return Array.isArray(value);
      }
      function isFunction(value) {
        return typeof value === "function";
      }
      function isObject3(value) {
        return !isPrimitive(value) && !isArray2(value) && !isFunction(value) && typeof value === "object";
      }
      function isPrimitive(value) {
        return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined" || value instanceof Date || value instanceof RegExp || value === null;
      }
      function shouldMerge(one, two) {
        if (!(0, lodash_merge_1.isPlainObject)(one) || !(0, lodash_merge_1.isPlainObject)(two)) {
          return false;
        }
        return true;
      }
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/timeout.js
  var require_timeout = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/timeout.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.callWithTimeout = exports.TimeoutError = void 0;
      var TimeoutError = class _TimeoutError extends Error {
        constructor(message) {
          super(message);
          Object.setPrototypeOf(this, _TimeoutError.prototype);
        }
      };
      exports.TimeoutError = TimeoutError;
      function callWithTimeout(promise, timeout) {
        let timeoutHandle;
        const timeoutPromise = new Promise(function timeoutFunction(_resolve, reject) {
          timeoutHandle = setTimeout(function timeoutHandler() {
            reject(new TimeoutError("Operation timed out."));
          }, timeout);
        });
        return Promise.race([promise, timeoutPromise]).then((result) => {
          clearTimeout(timeoutHandle);
          return result;
        }, (reason) => {
          clearTimeout(timeoutHandle);
          throw reason;
        });
      }
      exports.callWithTimeout = callWithTimeout;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/url.js
  var require_url = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/url.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isUrlIgnored = exports.urlMatches = void 0;
      function urlMatches(url, urlToMatch) {
        if (typeof urlToMatch === "string") {
          return url === urlToMatch;
        } else {
          return !!url.match(urlToMatch);
        }
      }
      exports.urlMatches = urlMatches;
      function isUrlIgnored(url, ignoredUrls) {
        if (!ignoredUrls) {
          return false;
        }
        for (const ignoreUrl of ignoredUrls) {
          if (urlMatches(url, ignoreUrl)) {
            return true;
          }
        }
        return false;
      }
      exports.isUrlIgnored = isUrlIgnored;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/wrap.js
  var require_wrap = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/wrap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isWrapped = void 0;
      function isWrapped(func) {
        return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
      }
      exports.isWrapped = isWrapped;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/promise.js
  var require_promise = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/promise.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Deferred = void 0;
      var Deferred = class {
        constructor() {
          this._promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
          });
        }
        get promise() {
          return this._promise;
        }
        resolve(val) {
          this._resolve(val);
        }
        reject(err) {
          this._reject(err);
        }
      };
      exports.Deferred = Deferred;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/callback.js
  var require_callback = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/utils/callback.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BindOnceFuture = void 0;
      var promise_1 = require_promise();
      var BindOnceFuture = class {
        constructor(_callback, _that) {
          this._callback = _callback;
          this._that = _that;
          this._isCalled = false;
          this._deferred = new promise_1.Deferred();
        }
        get isCalled() {
          return this._isCalled;
        }
        get promise() {
          return this._deferred.promise;
        }
        call(...args) {
          if (!this._isCalled) {
            this._isCalled = true;
            try {
              Promise.resolve(this._callback.call(this._that, ...args)).then((val) => this._deferred.resolve(val), (err) => this._deferred.reject(err));
            } catch (err) {
              this._deferred.reject(err);
            }
          }
          return this._deferred.promise;
        }
      };
      exports.BindOnceFuture = BindOnceFuture;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/internal/exporter.js
  var require_exporter = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/internal/exporter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports._export = void 0;
      var api_1 = require_src();
      var suppress_tracing_1 = require_suppress_tracing();
      function _export(exporter, arg) {
        return new Promise((resolve) => {
          api_1.context.with((0, suppress_tracing_1.suppressTracing)(api_1.context.active()), () => {
            exporter.export(arg, (result) => {
              resolve(result);
            });
          });
        });
      }
      exports._export = _export;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/index.js
  var require_src3 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-core-virtual-495f76d257/0/cache/@opentelemetry-core-npm-1.21.0-39779b32e4-e6f1adcd22.zip/node_modules/@opentelemetry/core/build/src/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.internal = exports.baggageUtils = void 0;
      __exportStar(require_W3CBaggagePropagator(), exports);
      __exportStar(require_anchored_clock(), exports);
      __exportStar(require_attributes(), exports);
      __exportStar(require_global_error_handler(), exports);
      __exportStar(require_logging_error_handler(), exports);
      __exportStar(require_time(), exports);
      __exportStar(require_types2(), exports);
      __exportStar(require_hex_to_binary(), exports);
      __exportStar(require_ExportResult(), exports);
      exports.baggageUtils = require_utils7();
      __exportStar(require_platform2(), exports);
      __exportStar(require_composite(), exports);
      __exportStar(require_W3CTraceContextPropagator(), exports);
      __exportStar(require_IdGenerator(), exports);
      __exportStar(require_rpc_metadata(), exports);
      __exportStar(require_AlwaysOffSampler(), exports);
      __exportStar(require_AlwaysOnSampler(), exports);
      __exportStar(require_ParentBasedSampler(), exports);
      __exportStar(require_TraceIdRatioBasedSampler(), exports);
      __exportStar(require_suppress_tracing(), exports);
      __exportStar(require_TraceState(), exports);
      __exportStar(require_environment(), exports);
      __exportStar(require_merge(), exports);
      __exportStar(require_sampling(), exports);
      __exportStar(require_timeout(), exports);
      __exportStar(require_url(), exports);
      __exportStar(require_wrap(), exports);
      __exportStar(require_callback(), exports);
      __exportStar(require_version2(), exports);
      var exporter_1 = require_exporter();
      exports.internal = {
        _export: exporter_1._export
      };
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/enums.js
  var require_enums = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/enums.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ExceptionEventName = void 0;
      exports.ExceptionEventName = "exception";
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/Span.js
  var require_Span = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/Span.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Span = void 0;
      var api_1 = require_src();
      var core_1 = require_src3();
      var semantic_conventions_1 = require_src2();
      var enums_1 = require_enums();
      var Span3 = class {
        /**
         * Constructs a new Span instance.
         *
         * @deprecated calling Span constructor directly is not supported. Please use tracer.startSpan.
         * */
        constructor(parentTracer, context2, spanName, spanContext, kind, parentSpanId, links = [], startTime, _deprecatedClock, attributes) {
          this.attributes = {};
          this.links = [];
          this.events = [];
          this._droppedAttributesCount = 0;
          this._droppedEventsCount = 0;
          this._droppedLinksCount = 0;
          this.status = {
            code: api_1.SpanStatusCode.UNSET
          };
          this.endTime = [0, 0];
          this._ended = false;
          this._duration = [-1, -1];
          this.name = spanName;
          this._spanContext = spanContext;
          this.parentSpanId = parentSpanId;
          this.kind = kind;
          this.links = links;
          const now = Date.now();
          this._performanceStartTime = core_1.otperformance.now();
          this._performanceOffset = now - (this._performanceStartTime + (0, core_1.getTimeOrigin)());
          this._startTimeProvided = startTime != null;
          this.startTime = this._getTime(startTime !== null && startTime !== void 0 ? startTime : now);
          this.resource = parentTracer.resource;
          this.instrumentationLibrary = parentTracer.instrumentationLibrary;
          this._spanLimits = parentTracer.getSpanLimits();
          this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0;
          if (attributes != null) {
            this.setAttributes(attributes);
          }
          this._spanProcessor = parentTracer.getActiveSpanProcessor();
          this._spanProcessor.onStart(this, context2);
        }
        spanContext() {
          return this._spanContext;
        }
        setAttribute(key, value) {
          if (value == null || this._isSpanEnded())
            return this;
          if (key.length === 0) {
            api_1.diag.warn(`Invalid attribute key: ${key}`);
            return this;
          }
          if (!(0, core_1.isAttributeValue)(value)) {
            api_1.diag.warn(`Invalid attribute value set for key: ${key}`);
            return this;
          }
          if (Object.keys(this.attributes).length >= this._spanLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, key)) {
            this._droppedAttributesCount++;
            return this;
          }
          this.attributes[key] = this._truncateToSize(value);
          return this;
        }
        setAttributes(attributes) {
          for (const [k, v] of Object.entries(attributes)) {
            this.setAttribute(k, v);
          }
          return this;
        }
        /**
         *
         * @param name Span Name
         * @param [attributesOrStartTime] Span attributes or start time
         *     if type is {@type TimeInput} and 3rd param is undefined
         * @param [timeStamp] Specified time stamp for the event
         */
        addEvent(name, attributesOrStartTime, timeStamp) {
          if (this._isSpanEnded())
            return this;
          if (this._spanLimits.eventCountLimit === 0) {
            api_1.diag.warn("No events allowed.");
            this._droppedEventsCount++;
            return this;
          }
          if (this.events.length >= this._spanLimits.eventCountLimit) {
            if (this._droppedEventsCount === 0) {
              api_1.diag.debug("Dropping extra events.");
            }
            this.events.shift();
            this._droppedEventsCount++;
          }
          if ((0, core_1.isTimeInput)(attributesOrStartTime)) {
            if (!(0, core_1.isTimeInput)(timeStamp)) {
              timeStamp = attributesOrStartTime;
            }
            attributesOrStartTime = void 0;
          }
          const attributes = (0, core_1.sanitizeAttributes)(attributesOrStartTime);
          this.events.push({
            name,
            attributes,
            time: this._getTime(timeStamp),
            droppedAttributesCount: 0
          });
          return this;
        }
        setStatus(status) {
          if (this._isSpanEnded())
            return this;
          this.status = status;
          return this;
        }
        updateName(name) {
          if (this._isSpanEnded())
            return this;
          this.name = name;
          return this;
        }
        end(endTime) {
          if (this._isSpanEnded()) {
            api_1.diag.error(`${this.name} ${this._spanContext.traceId}-${this._spanContext.spanId} - You can only call end() on a span once.`);
            return;
          }
          this._ended = true;
          this.endTime = this._getTime(endTime);
          this._duration = (0, core_1.hrTimeDuration)(this.startTime, this.endTime);
          if (this._duration[0] < 0) {
            api_1.diag.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime);
            this.endTime = this.startTime.slice();
            this._duration = [0, 0];
          }
          if (this._droppedEventsCount > 0) {
            api_1.diag.warn(`Dropped ${this._droppedEventsCount} events because eventCountLimit reached`);
          }
          this._spanProcessor.onEnd(this);
        }
        _getTime(inp) {
          if (typeof inp === "number" && inp < core_1.otperformance.now()) {
            return (0, core_1.hrTime)(inp + this._performanceOffset);
          }
          if (typeof inp === "number") {
            return (0, core_1.millisToHrTime)(inp);
          }
          if (inp instanceof Date) {
            return (0, core_1.millisToHrTime)(inp.getTime());
          }
          if ((0, core_1.isTimeInputHrTime)(inp)) {
            return inp;
          }
          if (this._startTimeProvided) {
            return (0, core_1.millisToHrTime)(Date.now());
          }
          const msDuration = core_1.otperformance.now() - this._performanceStartTime;
          return (0, core_1.addHrTimes)(this.startTime, (0, core_1.millisToHrTime)(msDuration));
        }
        isRecording() {
          return this._ended === false;
        }
        recordException(exception2, time) {
          const attributes = {};
          if (typeof exception2 === "string") {
            attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_MESSAGE] = exception2;
          } else if (exception2) {
            if (exception2.code) {
              attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_TYPE] = exception2.code.toString();
            } else if (exception2.name) {
              attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_TYPE] = exception2.name;
            }
            if (exception2.message) {
              attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_MESSAGE] = exception2.message;
            }
            if (exception2.stack) {
              attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_STACKTRACE] = exception2.stack;
            }
          }
          if (attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_TYPE] || attributes[semantic_conventions_1.SemanticAttributes.EXCEPTION_MESSAGE]) {
            this.addEvent(enums_1.ExceptionEventName, attributes, time);
          } else {
            api_1.diag.warn(`Failed to record an exception ${exception2}`);
          }
        }
        get duration() {
          return this._duration;
        }
        get ended() {
          return this._ended;
        }
        get droppedAttributesCount() {
          return this._droppedAttributesCount;
        }
        get droppedEventsCount() {
          return this._droppedEventsCount;
        }
        get droppedLinksCount() {
          return this._droppedLinksCount;
        }
        _isSpanEnded() {
          if (this._ended) {
            api_1.diag.warn(`Can not execute the operation on ended Span {traceId: ${this._spanContext.traceId}, spanId: ${this._spanContext.spanId}}`);
          }
          return this._ended;
        }
        // Utility function to truncate given value within size
        // for value type of string, will truncate to given limit
        // for type of non-string, will return same value
        _truncateToLimitUtil(value, limit) {
          if (value.length <= limit) {
            return value;
          }
          return value.substr(0, limit);
        }
        /**
         * If the given attribute value is of type string and has more characters than given {@code attributeValueLengthLimit} then
         * return string with trucated to {@code attributeValueLengthLimit} characters
         *
         * If the given attribute value is array of strings then
         * return new array of strings with each element truncated to {@code attributeValueLengthLimit} characters
         *
         * Otherwise return same Attribute {@code value}
         *
         * @param value Attribute value
         * @returns truncated attribute value if required, otherwise same value
         */
        _truncateToSize(value) {
          const limit = this._attributeValueLengthLimit;
          if (limit <= 0) {
            api_1.diag.warn(`Attribute value limit must be positive, got ${limit}`);
            return value;
          }
          if (typeof value === "string") {
            return this._truncateToLimitUtil(value, limit);
          }
          if (Array.isArray(value)) {
            return value.map((val) => typeof val === "string" ? this._truncateToLimitUtil(val, limit) : val);
          }
          return value;
        }
      };
      exports.Span = Span3;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/Sampler.js
  var require_Sampler = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/Sampler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SamplingDecision = void 0;
      var SamplingDecision;
      (function(SamplingDecision2) {
        SamplingDecision2[SamplingDecision2["NOT_RECORD"] = 0] = "NOT_RECORD";
        SamplingDecision2[SamplingDecision2["RECORD"] = 1] = "RECORD";
        SamplingDecision2[SamplingDecision2["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
      })(SamplingDecision = exports.SamplingDecision || (exports.SamplingDecision = {}));
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOffSampler.js
  var require_AlwaysOffSampler2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOffSampler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AlwaysOffSampler = void 0;
      var Sampler_1 = require_Sampler();
      var AlwaysOffSampler = class {
        shouldSample() {
          return {
            decision: Sampler_1.SamplingDecision.NOT_RECORD
          };
        }
        toString() {
          return "AlwaysOffSampler";
        }
      };
      exports.AlwaysOffSampler = AlwaysOffSampler;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOnSampler.js
  var require_AlwaysOnSampler2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOnSampler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AlwaysOnSampler = void 0;
      var Sampler_1 = require_Sampler();
      var AlwaysOnSampler = class {
        shouldSample() {
          return {
            decision: Sampler_1.SamplingDecision.RECORD_AND_SAMPLED
          };
        }
        toString() {
          return "AlwaysOnSampler";
        }
      };
      exports.AlwaysOnSampler = AlwaysOnSampler;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/ParentBasedSampler.js
  var require_ParentBasedSampler2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/ParentBasedSampler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ParentBasedSampler = void 0;
      var api_1 = require_src();
      var core_1 = require_src3();
      var AlwaysOffSampler_1 = require_AlwaysOffSampler2();
      var AlwaysOnSampler_1 = require_AlwaysOnSampler2();
      var ParentBasedSampler = class {
        constructor(config) {
          var _a, _b, _c, _d;
          this._root = config.root;
          if (!this._root) {
            (0, core_1.globalErrorHandler)(new Error("ParentBasedSampler must have a root sampler configured"));
            this._root = new AlwaysOnSampler_1.AlwaysOnSampler();
          }
          this._remoteParentSampled = (_a = config.remoteParentSampled) !== null && _a !== void 0 ? _a : new AlwaysOnSampler_1.AlwaysOnSampler();
          this._remoteParentNotSampled = (_b = config.remoteParentNotSampled) !== null && _b !== void 0 ? _b : new AlwaysOffSampler_1.AlwaysOffSampler();
          this._localParentSampled = (_c = config.localParentSampled) !== null && _c !== void 0 ? _c : new AlwaysOnSampler_1.AlwaysOnSampler();
          this._localParentNotSampled = (_d = config.localParentNotSampled) !== null && _d !== void 0 ? _d : new AlwaysOffSampler_1.AlwaysOffSampler();
        }
        shouldSample(context2, traceId, spanName, spanKind, attributes, links) {
          const parentContext = api_1.trace.getSpanContext(context2);
          if (!parentContext || !(0, api_1.isSpanContextValid)(parentContext)) {
            return this._root.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
          }
          if (parentContext.isRemote) {
            if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
              return this._remoteParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
            }
            return this._remoteParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
          }
          if (parentContext.traceFlags & api_1.TraceFlags.SAMPLED) {
            return this._localParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
          }
          return this._localParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
        }
        toString() {
          return `ParentBased{root=${this._root.toString()}, remoteParentSampled=${this._remoteParentSampled.toString()}, remoteParentNotSampled=${this._remoteParentNotSampled.toString()}, localParentSampled=${this._localParentSampled.toString()}, localParentNotSampled=${this._localParentNotSampled.toString()}}`;
        }
      };
      exports.ParentBasedSampler = ParentBasedSampler;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/TraceIdRatioBasedSampler.js
  var require_TraceIdRatioBasedSampler2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/TraceIdRatioBasedSampler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TraceIdRatioBasedSampler = void 0;
      var api_1 = require_src();
      var Sampler_1 = require_Sampler();
      var TraceIdRatioBasedSampler = class {
        constructor(_ratio = 0) {
          this._ratio = _ratio;
          this._ratio = this._normalize(_ratio);
          this._upperBound = Math.floor(this._ratio * 4294967295);
        }
        shouldSample(context2, traceId) {
          return {
            decision: (0, api_1.isValidTraceId)(traceId) && this._accumulate(traceId) < this._upperBound ? Sampler_1.SamplingDecision.RECORD_AND_SAMPLED : Sampler_1.SamplingDecision.NOT_RECORD
          };
        }
        toString() {
          return `TraceIdRatioBased{${this._ratio}}`;
        }
        _normalize(ratio) {
          if (typeof ratio !== "number" || isNaN(ratio))
            return 0;
          return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
        }
        _accumulate(traceId) {
          let accumulation = 0;
          for (let i = 0; i < traceId.length / 8; i++) {
            const pos = i * 8;
            const part = parseInt(traceId.slice(pos, pos + 8), 16);
            accumulation = (accumulation ^ part) >>> 0;
          }
          return accumulation;
        }
      };
      exports.TraceIdRatioBasedSampler = TraceIdRatioBasedSampler;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/config.js
  var require_config = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.buildSamplerFromEnv = exports.loadDefaultConfig = void 0;
      var api_1 = require_src();
      var core_1 = require_src3();
      var AlwaysOffSampler_1 = require_AlwaysOffSampler2();
      var AlwaysOnSampler_1 = require_AlwaysOnSampler2();
      var ParentBasedSampler_1 = require_ParentBasedSampler2();
      var TraceIdRatioBasedSampler_1 = require_TraceIdRatioBasedSampler2();
      var env = (0, core_1.getEnv)();
      var FALLBACK_OTEL_TRACES_SAMPLER = core_1.TracesSamplerValues.AlwaysOn;
      var DEFAULT_RATIO = 1;
      function loadDefaultConfig() {
        return {
          sampler: buildSamplerFromEnv(env),
          forceFlushTimeoutMillis: 3e4,
          generalLimits: {
            attributeValueLengthLimit: (0, core_1.getEnv)().OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            attributeCountLimit: (0, core_1.getEnv)().OTEL_ATTRIBUTE_COUNT_LIMIT
          },
          spanLimits: {
            attributeValueLengthLimit: (0, core_1.getEnv)().OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT,
            attributeCountLimit: (0, core_1.getEnv)().OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT,
            linkCountLimit: (0, core_1.getEnv)().OTEL_SPAN_LINK_COUNT_LIMIT,
            eventCountLimit: (0, core_1.getEnv)().OTEL_SPAN_EVENT_COUNT_LIMIT,
            attributePerEventCountLimit: (0, core_1.getEnv)().OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
            attributePerLinkCountLimit: (0, core_1.getEnv)().OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT
          }
        };
      }
      exports.loadDefaultConfig = loadDefaultConfig;
      function buildSamplerFromEnv(environment = (0, core_1.getEnv)()) {
        switch (environment.OTEL_TRACES_SAMPLER) {
          case core_1.TracesSamplerValues.AlwaysOn:
            return new AlwaysOnSampler_1.AlwaysOnSampler();
          case core_1.TracesSamplerValues.AlwaysOff:
            return new AlwaysOffSampler_1.AlwaysOffSampler();
          case core_1.TracesSamplerValues.ParentBasedAlwaysOn:
            return new ParentBasedSampler_1.ParentBasedSampler({
              root: new AlwaysOnSampler_1.AlwaysOnSampler()
            });
          case core_1.TracesSamplerValues.ParentBasedAlwaysOff:
            return new ParentBasedSampler_1.ParentBasedSampler({
              root: new AlwaysOffSampler_1.AlwaysOffSampler()
            });
          case core_1.TracesSamplerValues.TraceIdRatio:
            return new TraceIdRatioBasedSampler_1.TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv(environment));
          case core_1.TracesSamplerValues.ParentBasedTraceIdRatio:
            return new ParentBasedSampler_1.ParentBasedSampler({
              root: new TraceIdRatioBasedSampler_1.TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv(environment))
            });
          default:
            api_1.diag.error(`OTEL_TRACES_SAMPLER value "${environment.OTEL_TRACES_SAMPLER} invalid, defaulting to ${FALLBACK_OTEL_TRACES_SAMPLER}".`);
            return new AlwaysOnSampler_1.AlwaysOnSampler();
        }
      }
      exports.buildSamplerFromEnv = buildSamplerFromEnv;
      function getSamplerProbabilityFromEnv(environment) {
        if (environment.OTEL_TRACES_SAMPLER_ARG === void 0 || environment.OTEL_TRACES_SAMPLER_ARG === "") {
          api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG is blank, defaulting to ${DEFAULT_RATIO}.`);
          return DEFAULT_RATIO;
        }
        const probability = Number(environment.OTEL_TRACES_SAMPLER_ARG);
        if (isNaN(probability)) {
          api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG=${environment.OTEL_TRACES_SAMPLER_ARG} was given, but it is invalid, defaulting to ${DEFAULT_RATIO}.`);
          return DEFAULT_RATIO;
        }
        if (probability < 0 || probability > 1) {
          api_1.diag.error(`OTEL_TRACES_SAMPLER_ARG=${environment.OTEL_TRACES_SAMPLER_ARG} was given, but it is out of range ([0..1]), defaulting to ${DEFAULT_RATIO}.`);
          return DEFAULT_RATIO;
        }
        return probability;
      }
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/utility.js
  var require_utility = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/utility.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.reconfigureLimits = exports.mergeConfig = void 0;
      var config_1 = require_config();
      var core_1 = require_src3();
      function mergeConfig(userConfig) {
        const perInstanceDefaults = {
          sampler: (0, config_1.buildSamplerFromEnv)()
        };
        const DEFAULT_CONFIG2 = (0, config_1.loadDefaultConfig)();
        const target = Object.assign({}, DEFAULT_CONFIG2, perInstanceDefaults, userConfig);
        target.generalLimits = Object.assign({}, DEFAULT_CONFIG2.generalLimits, userConfig.generalLimits || {});
        target.spanLimits = Object.assign({}, DEFAULT_CONFIG2.spanLimits, userConfig.spanLimits || {});
        return target;
      }
      exports.mergeConfig = mergeConfig;
      function reconfigureLimits(userConfig) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const spanLimits = Object.assign({}, userConfig.spanLimits);
        const parsedEnvConfig = (0, core_1.getEnvWithoutDefaults)();
        spanLimits.attributeCountLimit = (_f = (_e = (_d = (_b = (_a = userConfig.spanLimits) === null || _a === void 0 ? void 0 : _a.attributeCountLimit) !== null && _b !== void 0 ? _b : (_c = userConfig.generalLimits) === null || _c === void 0 ? void 0 : _c.attributeCountLimit) !== null && _d !== void 0 ? _d : parsedEnvConfig.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT) !== null && _e !== void 0 ? _e : parsedEnvConfig.OTEL_ATTRIBUTE_COUNT_LIMIT) !== null && _f !== void 0 ? _f : core_1.DEFAULT_ATTRIBUTE_COUNT_LIMIT;
        spanLimits.attributeValueLengthLimit = (_m = (_l = (_k = (_h = (_g = userConfig.spanLimits) === null || _g === void 0 ? void 0 : _g.attributeValueLengthLimit) !== null && _h !== void 0 ? _h : (_j = userConfig.generalLimits) === null || _j === void 0 ? void 0 : _j.attributeValueLengthLimit) !== null && _k !== void 0 ? _k : parsedEnvConfig.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _l !== void 0 ? _l : parsedEnvConfig.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _m !== void 0 ? _m : core_1.DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT;
        return Object.assign({}, userConfig, { spanLimits });
      }
      exports.reconfigureLimits = reconfigureLimits;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/BatchSpanProcessorBase.js
  var require_BatchSpanProcessorBase = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/BatchSpanProcessorBase.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BatchSpanProcessorBase = void 0;
      var api_1 = require_src();
      var core_1 = require_src3();
      var BatchSpanProcessorBase = class {
        constructor(_exporter, config) {
          this._exporter = _exporter;
          this._isExporting = false;
          this._finishedSpans = [];
          this._droppedSpansCount = 0;
          const env = (0, core_1.getEnv)();
          this._maxExportBatchSize = typeof (config === null || config === void 0 ? void 0 : config.maxExportBatchSize) === "number" ? config.maxExportBatchSize : env.OTEL_BSP_MAX_EXPORT_BATCH_SIZE;
          this._maxQueueSize = typeof (config === null || config === void 0 ? void 0 : config.maxQueueSize) === "number" ? config.maxQueueSize : env.OTEL_BSP_MAX_QUEUE_SIZE;
          this._scheduledDelayMillis = typeof (config === null || config === void 0 ? void 0 : config.scheduledDelayMillis) === "number" ? config.scheduledDelayMillis : env.OTEL_BSP_SCHEDULE_DELAY;
          this._exportTimeoutMillis = typeof (config === null || config === void 0 ? void 0 : config.exportTimeoutMillis) === "number" ? config.exportTimeoutMillis : env.OTEL_BSP_EXPORT_TIMEOUT;
          this._shutdownOnce = new core_1.BindOnceFuture(this._shutdown, this);
          if (this._maxExportBatchSize > this._maxQueueSize) {
            api_1.diag.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize");
            this._maxExportBatchSize = this._maxQueueSize;
          }
        }
        forceFlush() {
          if (this._shutdownOnce.isCalled) {
            return this._shutdownOnce.promise;
          }
          return this._flushAll();
        }
        // does nothing.
        onStart(_span, _parentContext) {
        }
        onEnd(span) {
          if (this._shutdownOnce.isCalled) {
            return;
          }
          if ((span.spanContext().traceFlags & api_1.TraceFlags.SAMPLED) === 0) {
            return;
          }
          this._addToBuffer(span);
        }
        shutdown() {
          return this._shutdownOnce.call();
        }
        _shutdown() {
          return Promise.resolve().then(() => {
            return this.onShutdown();
          }).then(() => {
            return this._flushAll();
          }).then(() => {
            return this._exporter.shutdown();
          });
        }
        /** Add a span in the buffer. */
        _addToBuffer(span) {
          if (this._finishedSpans.length >= this._maxQueueSize) {
            if (this._droppedSpansCount === 0) {
              api_1.diag.debug("maxQueueSize reached, dropping spans");
            }
            this._droppedSpansCount++;
            return;
          }
          if (this._droppedSpansCount > 0) {
            api_1.diag.warn(`Dropped ${this._droppedSpansCount} spans because maxQueueSize reached`);
            this._droppedSpansCount = 0;
          }
          this._finishedSpans.push(span);
          this._maybeStartTimer();
        }
        /**
         * Send all spans to the exporter respecting the batch size limit
         * This function is used only on forceFlush or shutdown,
         * for all other cases _flush should be used
         * */
        _flushAll() {
          return new Promise((resolve, reject) => {
            const promises = [];
            const count = Math.ceil(this._finishedSpans.length / this._maxExportBatchSize);
            for (let i = 0, j = count; i < j; i++) {
              promises.push(this._flushOneBatch());
            }
            Promise.all(promises).then(() => {
              resolve();
            }).catch(reject);
          });
        }
        _flushOneBatch() {
          this._clearTimer();
          if (this._finishedSpans.length === 0) {
            return Promise.resolve();
          }
          return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
              reject(new Error("Timeout"));
            }, this._exportTimeoutMillis);
            api_1.context.with((0, core_1.suppressTracing)(api_1.context.active()), () => {
              const spans = this._finishedSpans.splice(0, this._maxExportBatchSize);
              const doExport = () => this._exporter.export(spans, (result) => {
                var _a;
                clearTimeout(timer);
                if (result.code === core_1.ExportResultCode.SUCCESS) {
                  resolve();
                } else {
                  reject((_a = result.error) !== null && _a !== void 0 ? _a : new Error("BatchSpanProcessor: span export failed"));
                }
              });
              const pendingResources = spans.map((span) => span.resource).filter((resource) => resource.asyncAttributesPending);
              if (pendingResources.length === 0) {
                doExport();
              } else {
                Promise.all(pendingResources.map((resource) => {
                  var _a;
                  return (_a = resource.waitForAsyncAttributes) === null || _a === void 0 ? void 0 : _a.call(resource);
                })).then(doExport, (err) => {
                  (0, core_1.globalErrorHandler)(err);
                  reject(err);
                });
              }
            });
          });
        }
        _maybeStartTimer() {
          if (this._isExporting)
            return;
          const flush = () => {
            this._isExporting = true;
            this._flushOneBatch().finally(() => {
              this._isExporting = false;
              if (this._finishedSpans.length > 0) {
                this._clearTimer();
                this._maybeStartTimer();
              }
            }).catch((e) => {
              this._isExporting = false;
              (0, core_1.globalErrorHandler)(e);
            });
          };
          if (this._finishedSpans.length >= this._maxExportBatchSize) {
            return flush();
          }
          if (this._timer !== void 0)
            return;
          this._timer = setTimeout(() => flush(), this._scheduledDelayMillis);
          (0, core_1.unrefTimer)(this._timer);
        }
        _clearTimer() {
          if (this._timer !== void 0) {
            clearTimeout(this._timer);
            this._timer = void 0;
          }
        }
      };
      exports.BatchSpanProcessorBase = BatchSpanProcessorBase;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/export/BatchSpanProcessor.js
  var require_BatchSpanProcessor = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/export/BatchSpanProcessor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BatchSpanProcessor = void 0;
      var BatchSpanProcessorBase_1 = require_BatchSpanProcessorBase();
      var BatchSpanProcessor2 = class extends BatchSpanProcessorBase_1.BatchSpanProcessorBase {
        onShutdown() {
        }
      };
      exports.BatchSpanProcessor = BatchSpanProcessor2;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/RandomIdGenerator.js
  var require_RandomIdGenerator2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/RandomIdGenerator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RandomIdGenerator = void 0;
      var SPAN_ID_BYTES = 8;
      var TRACE_ID_BYTES = 16;
      var RandomIdGenerator = class {
        constructor() {
          this.generateTraceId = getIdGenerator(TRACE_ID_BYTES);
          this.generateSpanId = getIdGenerator(SPAN_ID_BYTES);
        }
      };
      exports.RandomIdGenerator = RandomIdGenerator;
      var SHARED_BUFFER = Buffer.allocUnsafe(TRACE_ID_BYTES);
      function getIdGenerator(bytes) {
        return function generateId() {
          for (let i = 0; i < bytes / 4; i++) {
            SHARED_BUFFER.writeUInt32BE(Math.random() * 2 ** 32 >>> 0, i * 4);
          }
          for (let i = 0; i < bytes; i++) {
            if (SHARED_BUFFER[i] > 0) {
              break;
            } else if (i === bytes - 1) {
              SHARED_BUFFER[bytes - 1] = 1;
            }
          }
          return SHARED_BUFFER.toString("hex", 0, bytes);
        };
      }
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/index.js
  var require_node3 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_BatchSpanProcessor(), exports);
      __exportStar(require_RandomIdGenerator2(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/index.js
  var require_platform3 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/platform/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_node3(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/Tracer.js
  var require_Tracer = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/Tracer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Tracer = void 0;
      var api = require_src();
      var core_1 = require_src3();
      var Span_1 = require_Span();
      var utility_1 = require_utility();
      var platform_1 = require_platform3();
      var Tracer2 = class {
        /**
         * Constructs a new Tracer instance.
         */
        constructor(instrumentationLibrary, config, _tracerProvider) {
          this._tracerProvider = _tracerProvider;
          const localConfig = (0, utility_1.mergeConfig)(config);
          this._sampler = localConfig.sampler;
          this._generalLimits = localConfig.generalLimits;
          this._spanLimits = localConfig.spanLimits;
          this._idGenerator = config.idGenerator || new platform_1.RandomIdGenerator();
          this.resource = _tracerProvider.resource;
          this.instrumentationLibrary = instrumentationLibrary;
        }
        /**
         * Starts a new Span or returns the default NoopSpan based on the sampling
         * decision.
         */
        startSpan(name, options = {}, context2 = api.context.active()) {
          var _a, _b, _c;
          if (options.root) {
            context2 = api.trace.deleteSpan(context2);
          }
          const parentSpan = api.trace.getSpan(context2);
          if ((0, core_1.isTracingSuppressed)(context2)) {
            api.diag.debug("Instrumentation suppressed, returning Noop Span");
            const nonRecordingSpan = api.trace.wrapSpanContext(api.INVALID_SPAN_CONTEXT);
            return nonRecordingSpan;
          }
          const parentSpanContext = parentSpan === null || parentSpan === void 0 ? void 0 : parentSpan.spanContext();
          const spanId = this._idGenerator.generateSpanId();
          let traceId;
          let traceState;
          let parentSpanId;
          if (!parentSpanContext || !api.trace.isSpanContextValid(parentSpanContext)) {
            traceId = this._idGenerator.generateTraceId();
          } else {
            traceId = parentSpanContext.traceId;
            traceState = parentSpanContext.traceState;
            parentSpanId = parentSpanContext.spanId;
          }
          const spanKind = (_a = options.kind) !== null && _a !== void 0 ? _a : api.SpanKind.INTERNAL;
          const links = ((_b = options.links) !== null && _b !== void 0 ? _b : []).map((link) => {
            return {
              context: link.context,
              attributes: (0, core_1.sanitizeAttributes)(link.attributes)
            };
          });
          const attributes = (0, core_1.sanitizeAttributes)(options.attributes);
          const samplingResult = this._sampler.shouldSample(context2, traceId, name, spanKind, attributes, links);
          traceState = (_c = samplingResult.traceState) !== null && _c !== void 0 ? _c : traceState;
          const traceFlags = samplingResult.decision === api.SamplingDecision.RECORD_AND_SAMPLED ? api.TraceFlags.SAMPLED : api.TraceFlags.NONE;
          const spanContext = { traceId, spanId, traceFlags, traceState };
          if (samplingResult.decision === api.SamplingDecision.NOT_RECORD) {
            api.diag.debug("Recording is off, propagating context in a non-recording span");
            const nonRecordingSpan = api.trace.wrapSpanContext(spanContext);
            return nonRecordingSpan;
          }
          const initAttributes = (0, core_1.sanitizeAttributes)(Object.assign(attributes, samplingResult.attributes));
          const span = new Span_1.Span(this, context2, name, spanContext, spanKind, parentSpanId, links, options.startTime, void 0, initAttributes);
          return span;
        }
        startActiveSpan(name, arg2, arg3, arg4) {
          let opts;
          let ctx;
          let fn;
          if (arguments.length < 2) {
            return;
          } else if (arguments.length === 2) {
            fn = arg2;
          } else if (arguments.length === 3) {
            opts = arg2;
            fn = arg3;
          } else {
            opts = arg2;
            ctx = arg3;
            fn = arg4;
          }
          const parentContext = ctx !== null && ctx !== void 0 ? ctx : api.context.active();
          const span = this.startSpan(name, opts, parentContext);
          const contextWithSpanSet = api.trace.setSpan(parentContext, span);
          return api.context.with(contextWithSpanSet, fn, void 0, span);
        }
        /** Returns the active {@link GeneralLimits}. */
        getGeneralLimits() {
          return this._generalLimits;
        }
        /** Returns the active {@link SpanLimits}. */
        getSpanLimits() {
          return this._spanLimits;
        }
        getActiveSpanProcessor() {
          return this._tracerProvider.getActiveSpanProcessor();
        }
      };
      exports.Tracer = Tracer2;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/default-service-name.js
  var require_default_service_name = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/default-service-name.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.defaultServiceName = void 0;
      function defaultServiceName() {
        return `unknown_service:${process.argv0}`;
      }
      exports.defaultServiceName = defaultServiceName;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/utils.js
  var require_utils8 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.normalizeType = exports.normalizeArch = void 0;
      var normalizeArch = (nodeArchString) => {
        switch (nodeArchString) {
          case "arm":
            return "arm32";
          case "ppc":
            return "ppc32";
          case "x64":
            return "amd64";
          default:
            return nodeArchString;
        }
      };
      exports.normalizeArch = normalizeArch;
      var normalizeType = (nodePlatform) => {
        switch (nodePlatform) {
          case "sunos":
            return "solaris";
          case "win32":
            return "windows";
          default:
            return nodePlatform;
        }
      };
      exports.normalizeType = normalizeType;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/execAsync.js
  var require_execAsync = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/execAsync.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.execAsync = void 0;
      var child_process = __require("child_process");
      var util = __require("util");
      exports.execAsync = util.promisify(child_process.exec);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/getMachineId-darwin.js
  var require_getMachineId_darwin = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/getMachineId-darwin.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getMachineId = void 0;
      var execAsync_1 = require_execAsync();
      var api_1 = require_src();
      async function getMachineId() {
        try {
          const result = await (0, execAsync_1.execAsync)('ioreg -rd1 -c "IOPlatformExpertDevice"');
          const idLine = result.stdout.split("\n").find((line) => line.includes("IOPlatformUUID"));
          if (!idLine) {
            return "";
          }
          const parts = idLine.split('" = "');
          if (parts.length === 2) {
            return parts[1].slice(0, -1);
          }
        } catch (e) {
          api_1.diag.debug(`error reading machine id: ${e}`);
        }
        return "";
      }
      exports.getMachineId = getMachineId;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/getMachineId-linux.js
  var require_getMachineId_linux = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/getMachineId-linux.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getMachineId = void 0;
      var fs_1 = __require("fs");
      var api_1 = require_src();
      async function getMachineId() {
        const paths = ["/etc/machine-id", "/var/lib/dbus/machine-id"];
        for (const path3 of paths) {
          try {
            const result = await fs_1.promises.readFile(path3, { encoding: "utf8" });
            return result.trim();
          } catch (e) {
            api_1.diag.debug(`error reading machine id: ${e}`);
          }
        }
        return "";
      }
      exports.getMachineId = getMachineId;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/getMachineId-bsd.js
  var require_getMachineId_bsd = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/getMachineId-bsd.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getMachineId = void 0;
      var fs_1 = __require("fs");
      var execAsync_1 = require_execAsync();
      var api_1 = require_src();
      async function getMachineId() {
        try {
          const result = await fs_1.promises.readFile("/etc/hostid", { encoding: "utf8" });
          return result.trim();
        } catch (e) {
          api_1.diag.debug(`error reading machine id: ${e}`);
        }
        try {
          const result = await (0, execAsync_1.execAsync)("kenv -q smbios.system.uuid");
          return result.stdout.trim();
        } catch (e) {
          api_1.diag.debug(`error reading machine id: ${e}`);
        }
        return "";
      }
      exports.getMachineId = getMachineId;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/getMachineId-win.js
  var require_getMachineId_win = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/getMachineId-win.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getMachineId = void 0;
      var process4 = __require("process");
      var execAsync_1 = require_execAsync();
      var api_1 = require_src();
      async function getMachineId() {
        const args = "QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid";
        let command = "%windir%\\System32\\REG.exe";
        if (process4.arch === "ia32" && "PROCESSOR_ARCHITEW6432" in process4.env) {
          command = "%windir%\\sysnative\\cmd.exe /c " + command;
        }
        try {
          const result = await (0, execAsync_1.execAsync)(`${command} ${args}`);
          const parts = result.stdout.split("REG_SZ");
          if (parts.length === 2) {
            return parts[1].trim();
          }
        } catch (e) {
          api_1.diag.debug(`error reading machine id: ${e}`);
        }
        return "";
      }
      exports.getMachineId = getMachineId;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/getMachineId-unsupported.js
  var require_getMachineId_unsupported = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/getMachineId-unsupported.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getMachineId = void 0;
      var api_1 = require_src();
      async function getMachineId() {
        api_1.diag.debug("could not read machine-id: unsupported platform");
        return "";
      }
      exports.getMachineId = getMachineId;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/getMachineId.js
  var require_getMachineId = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/machine-id/getMachineId.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getMachineId = void 0;
      var process4 = __require("process");
      var getMachineId;
      exports.getMachineId = getMachineId;
      switch (process4.platform) {
        case "darwin":
          exports.getMachineId = getMachineId = require_getMachineId_darwin().getMachineId;
          break;
        case "linux":
          exports.getMachineId = getMachineId = require_getMachineId_linux().getMachineId;
          break;
        case "freebsd":
          exports.getMachineId = getMachineId = require_getMachineId_bsd().getMachineId;
          break;
        case "win32":
          exports.getMachineId = getMachineId = require_getMachineId_win().getMachineId;
          break;
        default:
          exports.getMachineId = getMachineId = require_getMachineId_unsupported().getMachineId;
      }
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/HostDetectorSync.js
  var require_HostDetectorSync = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/HostDetectorSync.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hostDetectorSync = void 0;
      var semantic_conventions_1 = require_src2();
      var Resource_1 = require_Resource();
      var os_1 = __require("os");
      var utils_1 = require_utils8();
      var getMachineId_1 = require_getMachineId();
      var HostDetectorSync = class {
        detect(_config) {
          const attributes = {
            [semantic_conventions_1.SemanticResourceAttributes.HOST_NAME]: (0, os_1.hostname)(),
            [semantic_conventions_1.SemanticResourceAttributes.HOST_ARCH]: (0, utils_1.normalizeArch)((0, os_1.arch)())
          };
          return new Resource_1.Resource(attributes, this._getAsyncAttributes());
        }
        _getAsyncAttributes() {
          return (0, getMachineId_1.getMachineId)().then((machineId) => {
            const attributes = {};
            if (machineId) {
              attributes[semantic_conventions_1.SemanticResourceAttributes.HOST_ID] = machineId;
            }
            return attributes;
          });
        }
      };
      exports.hostDetectorSync = new HostDetectorSync();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/HostDetector.js
  var require_HostDetector = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/HostDetector.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hostDetector = void 0;
      var HostDetectorSync_1 = require_HostDetectorSync();
      var HostDetector = class {
        detect(_config) {
          return Promise.resolve(HostDetectorSync_1.hostDetectorSync.detect(_config));
        }
      };
      exports.hostDetector = new HostDetector();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/OSDetectorSync.js
  var require_OSDetectorSync = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/OSDetectorSync.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.osDetectorSync = void 0;
      var semantic_conventions_1 = require_src2();
      var Resource_1 = require_Resource();
      var os_1 = __require("os");
      var utils_1 = require_utils8();
      var OSDetectorSync = class {
        detect(_config) {
          const attributes = {
            [semantic_conventions_1.SemanticResourceAttributes.OS_TYPE]: (0, utils_1.normalizeType)((0, os_1.platform)()),
            [semantic_conventions_1.SemanticResourceAttributes.OS_VERSION]: (0, os_1.release)()
          };
          return new Resource_1.Resource(attributes);
        }
      };
      exports.osDetectorSync = new OSDetectorSync();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/OSDetector.js
  var require_OSDetector = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/OSDetector.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.osDetector = void 0;
      var OSDetectorSync_1 = require_OSDetectorSync();
      var OSDetector = class {
        detect(_config) {
          return Promise.resolve(OSDetectorSync_1.osDetectorSync.detect(_config));
        }
      };
      exports.osDetector = new OSDetector();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/ProcessDetectorSync.js
  var require_ProcessDetectorSync = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/ProcessDetectorSync.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.processDetectorSync = void 0;
      var api_1 = require_src();
      var semantic_conventions_1 = require_src2();
      var Resource_1 = require_Resource();
      var os = __require("os");
      var ProcessDetectorSync = class {
        detect(_config) {
          const attributes = {
            [semantic_conventions_1.SemanticResourceAttributes.PROCESS_PID]: process.pid,
            [semantic_conventions_1.SemanticResourceAttributes.PROCESS_EXECUTABLE_NAME]: process.title,
            [semantic_conventions_1.SemanticResourceAttributes.PROCESS_EXECUTABLE_PATH]: process.execPath,
            [semantic_conventions_1.SemanticResourceAttributes.PROCESS_COMMAND_ARGS]: [
              process.argv[0],
              ...process.execArgv,
              ...process.argv.slice(1)
            ],
            [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_VERSION]: process.versions.node,
            [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: "nodejs",
            [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_DESCRIPTION]: "Node.js"
          };
          if (process.argv.length > 1) {
            attributes[semantic_conventions_1.SemanticResourceAttributes.PROCESS_COMMAND] = process.argv[1];
          }
          try {
            const userInfo = os.userInfo();
            attributes[semantic_conventions_1.SemanticResourceAttributes.PROCESS_OWNER] = userInfo.username;
          } catch (e) {
            api_1.diag.debug(`error obtaining process owner: ${e}`);
          }
          return new Resource_1.Resource(attributes);
        }
      };
      exports.processDetectorSync = new ProcessDetectorSync();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/ProcessDetector.js
  var require_ProcessDetector = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/ProcessDetector.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.processDetector = void 0;
      var ProcessDetectorSync_1 = require_ProcessDetectorSync();
      var ProcessDetector = class {
        detect(config) {
          return Promise.resolve(ProcessDetectorSync_1.processDetectorSync.detect(config));
        }
      };
      exports.processDetector = new ProcessDetector();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/index.js
  var require_node4 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/node/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_default_service_name(), exports);
      __exportStar(require_HostDetector(), exports);
      __exportStar(require_OSDetector(), exports);
      __exportStar(require_HostDetectorSync(), exports);
      __exportStar(require_OSDetectorSync(), exports);
      __exportStar(require_ProcessDetector(), exports);
      __exportStar(require_ProcessDetectorSync(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/index.js
  var require_platform4 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/platform/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_node4(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/Resource.js
  var require_Resource = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/Resource.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Resource = void 0;
      var api_1 = require_src();
      var semantic_conventions_1 = require_src2();
      var core_1 = require_src3();
      var platform_1 = require_platform4();
      var Resource2 = class _Resource {
        constructor(attributes, asyncAttributesPromise) {
          var _a;
          this._attributes = attributes;
          this.asyncAttributesPending = asyncAttributesPromise != null;
          this._syncAttributes = (_a = this._attributes) !== null && _a !== void 0 ? _a : {};
          this._asyncAttributesPromise = asyncAttributesPromise === null || asyncAttributesPromise === void 0 ? void 0 : asyncAttributesPromise.then((asyncAttributes) => {
            this._attributes = Object.assign({}, this._attributes, asyncAttributes);
            this.asyncAttributesPending = false;
            return asyncAttributes;
          }, (err) => {
            api_1.diag.debug("a resource's async attributes promise rejected: %s", err);
            this.asyncAttributesPending = false;
            return {};
          });
        }
        /**
         * Returns an empty Resource
         */
        static empty() {
          return _Resource.EMPTY;
        }
        /**
         * Returns a Resource that identifies the SDK in use.
         */
        static default() {
          return new _Resource({
            [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: (0, platform_1.defaultServiceName)(),
            [semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE]: core_1.SDK_INFO[semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE],
            [semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_NAME]: core_1.SDK_INFO[semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_NAME],
            [semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]: core_1.SDK_INFO[semantic_conventions_1.SemanticResourceAttributes.TELEMETRY_SDK_VERSION]
          });
        }
        get attributes() {
          var _a;
          if (this.asyncAttributesPending) {
            api_1.diag.error("Accessing resource attributes before async attributes settled");
          }
          return (_a = this._attributes) !== null && _a !== void 0 ? _a : {};
        }
        /**
         * Returns a promise that will never be rejected. Resolves when all async attributes have finished being added to
         * this Resource's attributes. This is useful in exporters to block until resource detection
         * has finished.
         */
        async waitForAsyncAttributes() {
          if (this.asyncAttributesPending) {
            await this._asyncAttributesPromise;
          }
        }
        /**
         * Returns a new, merged {@link Resource} by merging the current Resource
         * with the other Resource. In case of a collision, other Resource takes
         * precedence.
         *
         * @param other the Resource that will be merged with this.
         * @returns the newly merged Resource.
         */
        merge(other) {
          var _a;
          if (!other)
            return this;
          const mergedSyncAttributes = Object.assign(Object.assign({}, this._syncAttributes), (_a = other._syncAttributes) !== null && _a !== void 0 ? _a : other.attributes);
          if (!this._asyncAttributesPromise && !other._asyncAttributesPromise) {
            return new _Resource(mergedSyncAttributes);
          }
          const mergedAttributesPromise = Promise.all([
            this._asyncAttributesPromise,
            other._asyncAttributesPromise
          ]).then(([thisAsyncAttributes, otherAsyncAttributes]) => {
            var _a2;
            return Object.assign(Object.assign(Object.assign(Object.assign({}, this._syncAttributes), thisAsyncAttributes), (_a2 = other._syncAttributes) !== null && _a2 !== void 0 ? _a2 : other.attributes), otherAsyncAttributes);
          });
          return new _Resource(mergedSyncAttributes, mergedAttributesPromise);
        }
      };
      exports.Resource = Resource2;
      Resource2.EMPTY = new Resource2({});
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/IResource.js
  var require_IResource = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/IResource.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/types.js
  var require_types3 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/config.js
  var require_config2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/detectors/BrowserDetector.js
  var require_BrowserDetector = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/detectors/BrowserDetector.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.browserDetector = void 0;
      var __1 = require_src4();
      var BrowserDetector = class {
        detect(config) {
          return Promise.resolve(__1.browserDetectorSync.detect(config));
        }
      };
      exports.browserDetector = new BrowserDetector();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/detectors/EnvDetectorSync.js
  var require_EnvDetectorSync = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/detectors/EnvDetectorSync.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.envDetectorSync = void 0;
      var api_1 = require_src();
      var core_1 = require_src3();
      var semantic_conventions_1 = require_src2();
      var Resource_1 = require_Resource();
      var EnvDetectorSync = class {
        constructor() {
          this._MAX_LENGTH = 255;
          this._COMMA_SEPARATOR = ",";
          this._LABEL_KEY_VALUE_SPLITTER = "=";
          this._ERROR_MESSAGE_INVALID_CHARS = "should be a ASCII string with a length greater than 0 and not exceed " + this._MAX_LENGTH + " characters.";
          this._ERROR_MESSAGE_INVALID_VALUE = "should be a ASCII string with a length not exceed " + this._MAX_LENGTH + " characters.";
        }
        /**
         * Returns a {@link Resource} populated with attributes from the
         * OTEL_RESOURCE_ATTRIBUTES environment variable. Note this is an async
         * function to conform to the Detector interface.
         *
         * @param config The resource detection config
         */
        detect(_config) {
          const attributes = {};
          const env = (0, core_1.getEnv)();
          const rawAttributes = env.OTEL_RESOURCE_ATTRIBUTES;
          const serviceName = env.OTEL_SERVICE_NAME;
          if (rawAttributes) {
            try {
              const parsedAttributes = this._parseResourceAttributes(rawAttributes);
              Object.assign(attributes, parsedAttributes);
            } catch (e) {
              api_1.diag.debug(`EnvDetector failed: ${e.message}`);
            }
          }
          if (serviceName) {
            attributes[semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME] = serviceName;
          }
          return new Resource_1.Resource(attributes);
        }
        /**
         * Creates an attribute map from the OTEL_RESOURCE_ATTRIBUTES environment
         * variable.
         *
         * OTEL_RESOURCE_ATTRIBUTES: A comma-separated list of attributes describing
         * the source in more detail, e.g. “key1=val1,key2=val2”. Domain names and
         * paths are accepted as attribute keys. Values may be quoted or unquoted in
         * general. If a value contains whitespaces, =, or " characters, it must
         * always be quoted.
         *
         * @param rawEnvAttributes The resource attributes as a comma-seperated list
         * of key/value pairs.
         * @returns The sanitized resource attributes.
         */
        _parseResourceAttributes(rawEnvAttributes) {
          if (!rawEnvAttributes)
            return {};
          const attributes = {};
          const rawAttributes = rawEnvAttributes.split(this._COMMA_SEPARATOR, -1);
          for (const rawAttribute of rawAttributes) {
            const keyValuePair = rawAttribute.split(this._LABEL_KEY_VALUE_SPLITTER, -1);
            if (keyValuePair.length !== 2) {
              continue;
            }
            let [key, value] = keyValuePair;
            key = key.trim();
            value = value.trim().split(/^"|"$/).join("");
            if (!this._isValidAndNotEmpty(key)) {
              throw new Error(`Attribute key ${this._ERROR_MESSAGE_INVALID_CHARS}`);
            }
            if (!this._isValid(value)) {
              throw new Error(`Attribute value ${this._ERROR_MESSAGE_INVALID_VALUE}`);
            }
            attributes[key] = decodeURIComponent(value);
          }
          return attributes;
        }
        /**
         * Determines whether the given String is a valid printable ASCII string with
         * a length not exceed _MAX_LENGTH characters.
         *
         * @param str The String to be validated.
         * @returns Whether the String is valid.
         */
        _isValid(name) {
          return name.length <= this._MAX_LENGTH && this._isBaggageOctetString(name);
        }
        // https://www.w3.org/TR/baggage/#definition
        _isBaggageOctetString(str2) {
          for (let i = 0; i < str2.length; i++) {
            const ch = str2.charCodeAt(i);
            if (ch < 33 || ch === 44 || ch === 59 || ch === 92 || ch > 126) {
              return false;
            }
          }
          return true;
        }
        /**
         * Determines whether the given String is a valid printable ASCII string with
         * a length greater than 0 and not exceed _MAX_LENGTH characters.
         *
         * @param str The String to be validated.
         * @returns Whether the String is valid and not empty.
         */
        _isValidAndNotEmpty(str2) {
          return str2.length > 0 && this._isValid(str2);
        }
      };
      exports.envDetectorSync = new EnvDetectorSync();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/detectors/EnvDetector.js
  var require_EnvDetector = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/detectors/EnvDetector.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.envDetector = void 0;
      var EnvDetectorSync_1 = require_EnvDetectorSync();
      var EnvDetector = class {
        /**
         * Returns a {@link Resource} populated with attributes from the
         * OTEL_RESOURCE_ATTRIBUTES environment variable. Note this is an async
         * function to conform to the Detector interface.
         *
         * @param config The resource detection config
         */
        detect(config) {
          return Promise.resolve(EnvDetectorSync_1.envDetectorSync.detect(config));
        }
      };
      exports.envDetector = new EnvDetector();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/detectors/BrowserDetectorSync.js
  var require_BrowserDetectorSync = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/detectors/BrowserDetectorSync.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.browserDetectorSync = void 0;
      var semantic_conventions_1 = require_src2();
      var __1 = require_src4();
      var api_1 = require_src();
      var BrowserDetectorSync = class {
        detect(config) {
          const isBrowser = typeof navigator !== "undefined";
          if (!isBrowser) {
            return __1.Resource.empty();
          }
          const browserResource = {
            [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_NAME]: "browser",
            [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_DESCRIPTION]: "Web Browser",
            [semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_VERSION]: navigator.userAgent
          };
          return this._getResourceAttributes(browserResource, config);
        }
        /**
         * Validates process resource attribute map from process variables
         *
         * @param browserResource The un-sanitized resource attributes from process as key/value pairs.
         * @param config: Config
         * @returns The sanitized resource attributes.
         */
        _getResourceAttributes(browserResource, _config) {
          if (browserResource[semantic_conventions_1.SemanticResourceAttributes.PROCESS_RUNTIME_VERSION] === "") {
            api_1.diag.debug("BrowserDetector failed: Unable to find required browser resources. ");
            return __1.Resource.empty();
          } else {
            return new __1.Resource(Object.assign({}, browserResource));
          }
        }
      };
      exports.browserDetectorSync = new BrowserDetectorSync();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/detectors/index.js
  var require_detectors = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/detectors/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_BrowserDetector(), exports);
      __exportStar(require_EnvDetector(), exports);
      __exportStar(require_BrowserDetectorSync(), exports);
      __exportStar(require_EnvDetectorSync(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/utils.js
  var require_utils9 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isPromiseLike = void 0;
      var isPromiseLike = (val) => {
        return val !== null && typeof val === "object" && typeof val.then === "function";
      };
      exports.isPromiseLike = isPromiseLike;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/detect-resources.js
  var require_detect_resources = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/detect-resources.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.detectResourcesSync = exports.detectResources = void 0;
      var Resource_1 = require_Resource();
      var api_1 = require_src();
      var utils_1 = require_utils9();
      var detectResources = async (config = {}) => {
        const resources = await Promise.all((config.detectors || []).map(async (d) => {
          try {
            const resource = await d.detect(config);
            api_1.diag.debug(`${d.constructor.name} found resource.`, resource);
            return resource;
          } catch (e) {
            api_1.diag.debug(`${d.constructor.name} failed: ${e.message}`);
            return Resource_1.Resource.empty();
          }
        }));
        logResources(resources);
        return resources.reduce((acc, resource) => acc.merge(resource), Resource_1.Resource.empty());
      };
      exports.detectResources = detectResources;
      var detectResourcesSync = (config = {}) => {
        var _a;
        const resources = ((_a = config.detectors) !== null && _a !== void 0 ? _a : []).map((d) => {
          try {
            const resourceOrPromise = d.detect(config);
            let resource;
            if ((0, utils_1.isPromiseLike)(resourceOrPromise)) {
              const createPromise = async () => {
                const resolvedResource = await resourceOrPromise;
                return resolvedResource.attributes;
              };
              resource = new Resource_1.Resource({}, createPromise());
            } else {
              resource = resourceOrPromise;
            }
            if (resource.waitForAsyncAttributes) {
              void resource.waitForAsyncAttributes().then(() => api_1.diag.debug(`${d.constructor.name} found resource.`, resource));
            } else {
              api_1.diag.debug(`${d.constructor.name} found resource.`, resource);
            }
            return resource;
          } catch (e) {
            api_1.diag.error(`${d.constructor.name} failed: ${e.message}`);
            return Resource_1.Resource.empty();
          }
        });
        const mergedResources = resources.reduce((acc, resource) => acc.merge(resource), Resource_1.Resource.empty());
        if (mergedResources.waitForAsyncAttributes) {
          void mergedResources.waitForAsyncAttributes().then(() => {
            logResources(resources);
          });
        }
        return mergedResources;
      };
      exports.detectResourcesSync = detectResourcesSync;
      var logResources = (resources) => {
        resources.forEach((resource) => {
          if (Object.keys(resource.attributes).length > 0) {
            const resourceDebugString = JSON.stringify(resource.attributes, null, 4);
            api_1.diag.verbose(resourceDebugString);
          }
        });
      };
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/index.js
  var require_src4 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-resources-virtual-5e50e4722b/0/cache/@opentelemetry-resources-npm-1.21.0-7aa4e9f723-0ac61b835e.zip/node_modules/@opentelemetry/resources/build/src/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_Resource(), exports);
      __exportStar(require_IResource(), exports);
      __exportStar(require_platform4(), exports);
      __exportStar(require_types3(), exports);
      __exportStar(require_config2(), exports);
      __exportStar(require_detectors(), exports);
      __exportStar(require_detect_resources(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/MultiSpanProcessor.js
  var require_MultiSpanProcessor = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/MultiSpanProcessor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MultiSpanProcessor = void 0;
      var core_1 = require_src3();
      var MultiSpanProcessor = class {
        constructor(_spanProcessors) {
          this._spanProcessors = _spanProcessors;
        }
        forceFlush() {
          const promises = [];
          for (const spanProcessor of this._spanProcessors) {
            promises.push(spanProcessor.forceFlush());
          }
          return new Promise((resolve) => {
            Promise.all(promises).then(() => {
              resolve();
            }).catch((error) => {
              (0, core_1.globalErrorHandler)(error || new Error("MultiSpanProcessor: forceFlush failed"));
              resolve();
            });
          });
        }
        onStart(span, context2) {
          for (const spanProcessor of this._spanProcessors) {
            spanProcessor.onStart(span, context2);
          }
        }
        onEnd(span) {
          for (const spanProcessor of this._spanProcessors) {
            spanProcessor.onEnd(span);
          }
        }
        shutdown() {
          const promises = [];
          for (const spanProcessor of this._spanProcessors) {
            promises.push(spanProcessor.shutdown());
          }
          return new Promise((resolve, reject) => {
            Promise.all(promises).then(() => {
              resolve();
            }, reject);
          });
        }
      };
      exports.MultiSpanProcessor = MultiSpanProcessor;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/NoopSpanProcessor.js
  var require_NoopSpanProcessor = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/NoopSpanProcessor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NoopSpanProcessor = void 0;
      var NoopSpanProcessor = class {
        onStart(_span, _context) {
        }
        onEnd(_span) {
        }
        shutdown() {
          return Promise.resolve();
        }
        forceFlush() {
          return Promise.resolve();
        }
      };
      exports.NoopSpanProcessor = NoopSpanProcessor;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/BasicTracerProvider.js
  var require_BasicTracerProvider = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/BasicTracerProvider.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BasicTracerProvider = exports.ForceFlushState = void 0;
      var api_1 = require_src();
      var core_1 = require_src3();
      var resources_1 = require_src4();
      var _1 = require_src5();
      var config_1 = require_config();
      var MultiSpanProcessor_1 = require_MultiSpanProcessor();
      var NoopSpanProcessor_1 = require_NoopSpanProcessor();
      var platform_1 = require_platform3();
      var utility_1 = require_utility();
      var ForceFlushState;
      (function(ForceFlushState2) {
        ForceFlushState2[ForceFlushState2["resolved"] = 0] = "resolved";
        ForceFlushState2[ForceFlushState2["timeout"] = 1] = "timeout";
        ForceFlushState2[ForceFlushState2["error"] = 2] = "error";
        ForceFlushState2[ForceFlushState2["unresolved"] = 3] = "unresolved";
      })(ForceFlushState = exports.ForceFlushState || (exports.ForceFlushState = {}));
      var BasicTracerProvider2 = class {
        constructor(config = {}) {
          var _a;
          this._registeredSpanProcessors = [];
          this._tracers = /* @__PURE__ */ new Map();
          const mergedConfig = (0, core_1.merge)({}, (0, config_1.loadDefaultConfig)(), (0, utility_1.reconfigureLimits)(config));
          this.resource = (_a = mergedConfig.resource) !== null && _a !== void 0 ? _a : resources_1.Resource.empty();
          this.resource = resources_1.Resource.default().merge(this.resource);
          this._config = Object.assign({}, mergedConfig, {
            resource: this.resource
          });
          const defaultExporter = this._buildExporterFromEnv();
          if (defaultExporter !== void 0) {
            const batchProcessor = new platform_1.BatchSpanProcessor(defaultExporter);
            this.activeSpanProcessor = batchProcessor;
          } else {
            this.activeSpanProcessor = new NoopSpanProcessor_1.NoopSpanProcessor();
          }
        }
        getTracer(name, version, options) {
          const key = `${name}@${version || ""}:${(options === null || options === void 0 ? void 0 : options.schemaUrl) || ""}`;
          if (!this._tracers.has(key)) {
            this._tracers.set(key, new _1.Tracer({ name, version, schemaUrl: options === null || options === void 0 ? void 0 : options.schemaUrl }, this._config, this));
          }
          return this._tracers.get(key);
        }
        /**
         * Adds a new {@link SpanProcessor} to this tracer.
         * @param spanProcessor the new SpanProcessor to be added.
         */
        addSpanProcessor(spanProcessor) {
          if (this._registeredSpanProcessors.length === 0) {
            this.activeSpanProcessor.shutdown().catch((err) => api_1.diag.error("Error while trying to shutdown current span processor", err));
          }
          this._registeredSpanProcessors.push(spanProcessor);
          this.activeSpanProcessor = new MultiSpanProcessor_1.MultiSpanProcessor(this._registeredSpanProcessors);
        }
        getActiveSpanProcessor() {
          return this.activeSpanProcessor;
        }
        /**
         * Register this TracerProvider for use with the OpenTelemetry API.
         * Undefined values may be replaced with defaults, and
         * null values will be skipped.
         *
         * @param config Configuration object for SDK registration
         */
        register(config = {}) {
          api_1.trace.setGlobalTracerProvider(this);
          if (config.propagator === void 0) {
            config.propagator = this._buildPropagatorFromEnv();
          }
          if (config.contextManager) {
            api_1.context.setGlobalContextManager(config.contextManager);
          }
          if (config.propagator) {
            api_1.propagation.setGlobalPropagator(config.propagator);
          }
        }
        forceFlush() {
          const timeout = this._config.forceFlushTimeoutMillis;
          const promises = this._registeredSpanProcessors.map((spanProcessor) => {
            return new Promise((resolve) => {
              let state;
              const timeoutInterval = setTimeout(() => {
                resolve(new Error(`Span processor did not completed within timeout period of ${timeout} ms`));
                state = ForceFlushState.timeout;
              }, timeout);
              spanProcessor.forceFlush().then(() => {
                clearTimeout(timeoutInterval);
                if (state !== ForceFlushState.timeout) {
                  state = ForceFlushState.resolved;
                  resolve(state);
                }
              }).catch((error) => {
                clearTimeout(timeoutInterval);
                state = ForceFlushState.error;
                resolve(error);
              });
            });
          });
          return new Promise((resolve, reject) => {
            Promise.all(promises).then((results) => {
              const errors = results.filter((result) => result !== ForceFlushState.resolved);
              if (errors.length > 0) {
                reject(errors);
              } else {
                resolve();
              }
            }).catch((error) => reject([error]));
          });
        }
        shutdown() {
          return this.activeSpanProcessor.shutdown();
        }
        /**
         * TS cannot yet infer the type of this.constructor:
         * https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-337560146
         * There is no need to override either of the getters in your child class.
         * The type of the registered component maps should be the same across all
         * classes in the inheritance tree.
         */
        _getPropagator(name) {
          var _a;
          return (_a = this.constructor._registeredPropagators.get(name)) === null || _a === void 0 ? void 0 : _a();
        }
        _getSpanExporter(name) {
          var _a;
          return (_a = this.constructor._registeredExporters.get(name)) === null || _a === void 0 ? void 0 : _a();
        }
        _buildPropagatorFromEnv() {
          const uniquePropagatorNames = Array.from(new Set((0, core_1.getEnv)().OTEL_PROPAGATORS));
          const propagators = uniquePropagatorNames.map((name) => {
            const propagator = this._getPropagator(name);
            if (!propagator) {
              api_1.diag.warn(`Propagator "${name}" requested through environment variable is unavailable.`);
            }
            return propagator;
          });
          const validPropagators = propagators.reduce((list, item) => {
            if (item) {
              list.push(item);
            }
            return list;
          }, []);
          if (validPropagators.length === 0) {
            return;
          } else if (uniquePropagatorNames.length === 1) {
            return validPropagators[0];
          } else {
            return new core_1.CompositePropagator({
              propagators: validPropagators
            });
          }
        }
        _buildExporterFromEnv() {
          const exporterName = (0, core_1.getEnv)().OTEL_TRACES_EXPORTER;
          if (exporterName === "none" || exporterName === "")
            return;
          const exporter = this._getSpanExporter(exporterName);
          if (!exporter) {
            api_1.diag.error(`Exporter "${exporterName}" requested through environment variable is unavailable.`);
          }
          return exporter;
        }
      };
      exports.BasicTracerProvider = BasicTracerProvider2;
      BasicTracerProvider2._registeredPropagators = /* @__PURE__ */ new Map([
        ["tracecontext", () => new core_1.W3CTraceContextPropagator()],
        ["baggage", () => new core_1.W3CBaggagePropagator()]
      ]);
      BasicTracerProvider2._registeredExporters = /* @__PURE__ */ new Map();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/ConsoleSpanExporter.js
  var require_ConsoleSpanExporter = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/ConsoleSpanExporter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ConsoleSpanExporter = void 0;
      var core_1 = require_src3();
      var ConsoleSpanExporter = class {
        /**
         * Export spans.
         * @param spans
         * @param resultCallback
         */
        export(spans, resultCallback) {
          return this._sendSpans(spans, resultCallback);
        }
        /**
         * Shutdown the exporter.
         */
        shutdown() {
          this._sendSpans([]);
          return this.forceFlush();
        }
        /**
         * Exports any pending spans in exporter
         */
        forceFlush() {
          return Promise.resolve();
        }
        /**
         * converts span info into more readable format
         * @param span
         */
        _exportInfo(span) {
          var _a;
          return {
            traceId: span.spanContext().traceId,
            parentId: span.parentSpanId,
            traceState: (_a = span.spanContext().traceState) === null || _a === void 0 ? void 0 : _a.serialize(),
            name: span.name,
            id: span.spanContext().spanId,
            kind: span.kind,
            timestamp: (0, core_1.hrTimeToMicroseconds)(span.startTime),
            duration: (0, core_1.hrTimeToMicroseconds)(span.duration),
            attributes: span.attributes,
            status: span.status,
            events: span.events,
            links: span.links
          };
        }
        /**
         * Showing spans in console
         * @param spans
         * @param done
         */
        _sendSpans(spans, done) {
          for (const span of spans) {
            console.dir(this._exportInfo(span), { depth: 3 });
          }
          if (done) {
            return done({ code: core_1.ExportResultCode.SUCCESS });
          }
        }
      };
      exports.ConsoleSpanExporter = ConsoleSpanExporter;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/InMemorySpanExporter.js
  var require_InMemorySpanExporter = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/InMemorySpanExporter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InMemorySpanExporter = void 0;
      var core_1 = require_src3();
      var InMemorySpanExporter = class {
        constructor() {
          this._finishedSpans = [];
          this._stopped = false;
        }
        export(spans, resultCallback) {
          if (this._stopped)
            return resultCallback({
              code: core_1.ExportResultCode.FAILED,
              error: new Error("Exporter has been stopped")
            });
          this._finishedSpans.push(...spans);
          setTimeout(() => resultCallback({ code: core_1.ExportResultCode.SUCCESS }), 0);
        }
        shutdown() {
          this._stopped = true;
          this._finishedSpans = [];
          return this.forceFlush();
        }
        /**
         * Exports any pending spans in the exporter
         */
        forceFlush() {
          return Promise.resolve();
        }
        reset() {
          this._finishedSpans = [];
        }
        getFinishedSpans() {
          return this._finishedSpans;
        }
      };
      exports.InMemorySpanExporter = InMemorySpanExporter;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/ReadableSpan.js
  var require_ReadableSpan = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/ReadableSpan.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/SimpleSpanProcessor.js
  var require_SimpleSpanProcessor = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/SimpleSpanProcessor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SimpleSpanProcessor = void 0;
      var api_1 = require_src();
      var core_1 = require_src3();
      var SimpleSpanProcessor = class {
        constructor(_exporter) {
          this._exporter = _exporter;
          this._shutdownOnce = new core_1.BindOnceFuture(this._shutdown, this);
          this._unresolvedExports = /* @__PURE__ */ new Set();
        }
        async forceFlush() {
          await Promise.all(Array.from(this._unresolvedExports));
          if (this._exporter.forceFlush) {
            await this._exporter.forceFlush();
          }
        }
        onStart(_span, _parentContext) {
        }
        onEnd(span) {
          var _a, _b;
          if (this._shutdownOnce.isCalled) {
            return;
          }
          if ((span.spanContext().traceFlags & api_1.TraceFlags.SAMPLED) === 0) {
            return;
          }
          const doExport = () => core_1.internal._export(this._exporter, [span]).then((result) => {
            var _a2;
            if (result.code !== core_1.ExportResultCode.SUCCESS) {
              (0, core_1.globalErrorHandler)((_a2 = result.error) !== null && _a2 !== void 0 ? _a2 : new Error(`SimpleSpanProcessor: span export failed (status ${result})`));
            }
          }).catch((error) => {
            (0, core_1.globalErrorHandler)(error);
          });
          if (span.resource.asyncAttributesPending) {
            const exportPromise = (_b = (_a = span.resource).waitForAsyncAttributes) === null || _b === void 0 ? void 0 : _b.call(_a).then(() => {
              if (exportPromise != null) {
                this._unresolvedExports.delete(exportPromise);
              }
              return doExport();
            }, (err) => (0, core_1.globalErrorHandler)(err));
            if (exportPromise != null) {
              this._unresolvedExports.add(exportPromise);
            }
          } else {
            void doExport();
          }
        }
        shutdown() {
          return this._shutdownOnce.call();
        }
        _shutdown() {
          return this._exporter.shutdown();
        }
      };
      exports.SimpleSpanProcessor = SimpleSpanProcessor;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/SpanExporter.js
  var require_SpanExporter = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/export/SpanExporter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/SpanProcessor.js
  var require_SpanProcessor = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/SpanProcessor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/TimedEvent.js
  var require_TimedEvent = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/TimedEvent.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/types.js
  var require_types4 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/IdGenerator.js
  var require_IdGenerator2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/IdGenerator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/index.js
  var require_src5 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-trace-base-virtual-c8f5729c23/0/cache/@opentelemetry-sdk-trace-base-npm-1.21.0-e591753177-0d68bfb614.zip/node_modules/@opentelemetry/sdk-trace-base/build/src/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_Tracer(), exports);
      __exportStar(require_BasicTracerProvider(), exports);
      __exportStar(require_platform3(), exports);
      __exportStar(require_ConsoleSpanExporter(), exports);
      __exportStar(require_InMemorySpanExporter(), exports);
      __exportStar(require_ReadableSpan(), exports);
      __exportStar(require_SimpleSpanProcessor(), exports);
      __exportStar(require_SpanExporter(), exports);
      __exportStar(require_NoopSpanProcessor(), exports);
      __exportStar(require_AlwaysOffSampler2(), exports);
      __exportStar(require_AlwaysOnSampler2(), exports);
      __exportStar(require_ParentBasedSampler2(), exports);
      __exportStar(require_TraceIdRatioBasedSampler2(), exports);
      __exportStar(require_Sampler(), exports);
      __exportStar(require_Span(), exports);
      __exportStar(require_SpanProcessor(), exports);
      __exportStar(require_TimedEvent(), exports);
      __exportStar(require_types4(), exports);
      __exportStar(require_IdGenerator2(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/util.js
  var require_util = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/util.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseRetryAfterToMills = exports.isExportRetryable = exports.invalidTimeout = exports.configureExporterTimeout = exports.appendRootPathToUrlIfNeeded = exports.appendResourcePathToUrl = exports.parseHeaders = exports.DEFAULT_EXPORT_BACKOFF_MULTIPLIER = exports.DEFAULT_EXPORT_MAX_BACKOFF = exports.DEFAULT_EXPORT_INITIAL_BACKOFF = exports.DEFAULT_EXPORT_MAX_ATTEMPTS = void 0;
      var api_1 = require_src();
      var core_1 = require_src3();
      var DEFAULT_TRACE_TIMEOUT = 1e4;
      exports.DEFAULT_EXPORT_MAX_ATTEMPTS = 5;
      exports.DEFAULT_EXPORT_INITIAL_BACKOFF = 1e3;
      exports.DEFAULT_EXPORT_MAX_BACKOFF = 5e3;
      exports.DEFAULT_EXPORT_BACKOFF_MULTIPLIER = 1.5;
      function parseHeaders(partialHeaders = {}) {
        const headers = {};
        Object.entries(partialHeaders).forEach(([key, value]) => {
          if (typeof value !== "undefined") {
            headers[key] = String(value);
          } else {
            api_1.diag.warn(`Header "${key}" has wrong value and will be ignored`);
          }
        });
        return headers;
      }
      exports.parseHeaders = parseHeaders;
      function appendResourcePathToUrl(url, path3) {
        if (!url.endsWith("/")) {
          url = url + "/";
        }
        return url + path3;
      }
      exports.appendResourcePathToUrl = appendResourcePathToUrl;
      function appendRootPathToUrlIfNeeded(url) {
        try {
          const parsedUrl = new URL(url);
          if (parsedUrl.pathname === "") {
            parsedUrl.pathname = parsedUrl.pathname + "/";
          }
          return parsedUrl.toString();
        } catch (_a) {
          api_1.diag.warn(`Could not parse export URL: '${url}'`);
          return url;
        }
      }
      exports.appendRootPathToUrlIfNeeded = appendRootPathToUrlIfNeeded;
      function configureExporterTimeout(timeoutMillis) {
        if (typeof timeoutMillis === "number") {
          if (timeoutMillis <= 0) {
            return invalidTimeout(timeoutMillis, DEFAULT_TRACE_TIMEOUT);
          }
          return timeoutMillis;
        } else {
          return getExporterTimeoutFromEnv();
        }
      }
      exports.configureExporterTimeout = configureExporterTimeout;
      function getExporterTimeoutFromEnv() {
        var _a;
        const definedTimeout = Number((_a = (0, core_1.getEnv)().OTEL_EXPORTER_OTLP_TRACES_TIMEOUT) !== null && _a !== void 0 ? _a : (0, core_1.getEnv)().OTEL_EXPORTER_OTLP_TIMEOUT);
        if (definedTimeout <= 0) {
          return invalidTimeout(definedTimeout, DEFAULT_TRACE_TIMEOUT);
        } else {
          return definedTimeout;
        }
      }
      function invalidTimeout(timeout, defaultTimeout) {
        api_1.diag.warn("Timeout must be greater than 0", timeout);
        return defaultTimeout;
      }
      exports.invalidTimeout = invalidTimeout;
      function isExportRetryable(statusCode) {
        const retryCodes = [429, 502, 503, 504];
        return retryCodes.includes(statusCode);
      }
      exports.isExportRetryable = isExportRetryable;
      function parseRetryAfterToMills(retryAfter) {
        if (retryAfter == null) {
          return -1;
        }
        const seconds = Number.parseInt(retryAfter, 10);
        if (Number.isInteger(seconds)) {
          return seconds > 0 ? seconds * 1e3 : -1;
        }
        const delay = new Date(retryAfter).getTime() - Date.now();
        if (delay >= 0) {
          return delay;
        }
        return 0;
      }
      exports.parseRetryAfterToMills = parseRetryAfterToMills;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/OTLPExporterBase.js
  var require_OTLPExporterBase = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/OTLPExporterBase.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OTLPExporterBase = void 0;
      var api_1 = require_src();
      var core_1 = require_src3();
      var util_1 = require_util();
      var OTLPExporterBase = class {
        /**
         * @param config
         */
        constructor(config = {}) {
          this._sendingPromises = [];
          this.url = this.getDefaultUrl(config);
          if (typeof config.hostname === "string") {
            this.hostname = config.hostname;
          }
          this.shutdown = this.shutdown.bind(this);
          this._shutdownOnce = new core_1.BindOnceFuture(this._shutdown, this);
          this._concurrencyLimit = typeof config.concurrencyLimit === "number" ? config.concurrencyLimit : 30;
          this.timeoutMillis = (0, util_1.configureExporterTimeout)(config.timeoutMillis);
          this.onInit(config);
        }
        /**
         * Export items.
         * @param items
         * @param resultCallback
         */
        export(items, resultCallback) {
          if (this._shutdownOnce.isCalled) {
            resultCallback({
              code: core_1.ExportResultCode.FAILED,
              error: new Error("Exporter has been shutdown")
            });
            return;
          }
          if (this._sendingPromises.length >= this._concurrencyLimit) {
            resultCallback({
              code: core_1.ExportResultCode.FAILED,
              error: new Error("Concurrent export limit reached")
            });
            return;
          }
          this._export(items).then(() => {
            resultCallback({ code: core_1.ExportResultCode.SUCCESS });
          }).catch((error) => {
            resultCallback({ code: core_1.ExportResultCode.FAILED, error });
          });
        }
        _export(items) {
          return new Promise((resolve, reject) => {
            try {
              api_1.diag.debug("items to be sent", items);
              this.send(items, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        }
        /**
         * Shutdown the exporter.
         */
        shutdown() {
          return this._shutdownOnce.call();
        }
        /**
         * Exports any pending spans in the exporter
         */
        forceFlush() {
          return Promise.all(this._sendingPromises).then(() => {
          });
        }
        /**
         * Called by _shutdownOnce with BindOnceFuture
         */
        _shutdown() {
          api_1.diag.debug("shutdown started");
          this.onShutdown();
          return this.forceFlush();
        }
      };
      exports.OTLPExporterBase = OTLPExporterBase;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/types.js
  var require_types5 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CompressionAlgorithm = void 0;
      var CompressionAlgorithm;
      (function(CompressionAlgorithm2) {
        CompressionAlgorithm2["NONE"] = "none";
        CompressionAlgorithm2["GZIP"] = "gzip";
      })(CompressionAlgorithm = exports.CompressionAlgorithm || (exports.CompressionAlgorithm = {}));
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/types.js
  var require_types6 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OTLPExporterError = void 0;
      var OTLPExporterError = class extends Error {
        constructor(message, code, data) {
          super(message);
          this.name = "OTLPExporterError";
          this.data = data;
          this.code = code;
        }
      };
      exports.OTLPExporterError = OTLPExporterError;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/util.js
  var require_util2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/util.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.configureCompression = exports.createHttpAgent = exports.sendWithHttp = void 0;
      var url = __require("url");
      var http = __require("http");
      var https = __require("https");
      var zlib = __require("zlib");
      var stream_1 = __require("stream");
      var api_1 = require_src();
      var types_1 = require_types5();
      var core_1 = require_src3();
      var types_2 = require_types6();
      var util_1 = require_util();
      function sendWithHttp(collector, data, contentType, onSuccess, onError) {
        const exporterTimeout = collector.timeoutMillis;
        const parsedUrl = new url.URL(collector.url);
        const nodeVersion = Number(process.versions.node.split(".")[0]);
        let retryTimer;
        let req;
        let reqIsDestroyed = false;
        const exporterTimer = setTimeout(() => {
          clearTimeout(retryTimer);
          reqIsDestroyed = true;
          if (req.destroyed) {
            const err = new types_2.OTLPExporterError("Request Timeout");
            onError(err);
          } else {
            nodeVersion >= 14 ? req.destroy() : req.abort();
          }
        }, exporterTimeout);
        const options = {
          hostname: parsedUrl.hostname,
          port: parsedUrl.port,
          path: parsedUrl.pathname,
          method: "POST",
          headers: Object.assign({ "Content-Type": contentType }, collector.headers),
          agent: collector.agent
        };
        const request = parsedUrl.protocol === "http:" ? http.request : https.request;
        const sendWithRetry = (retries = util_1.DEFAULT_EXPORT_MAX_ATTEMPTS, minDelay = util_1.DEFAULT_EXPORT_INITIAL_BACKOFF) => {
          req = request(options, (res) => {
            let responseData = "";
            res.on("data", (chunk) => responseData += chunk);
            res.on("aborted", () => {
              if (reqIsDestroyed) {
                const err = new types_2.OTLPExporterError("Request Timeout");
                onError(err);
              }
            });
            res.on("end", () => {
              if (reqIsDestroyed === false) {
                if (res.statusCode && res.statusCode < 299) {
                  api_1.diag.debug(`statusCode: ${res.statusCode}`, responseData);
                  onSuccess();
                  clearTimeout(exporterTimer);
                  clearTimeout(retryTimer);
                } else if (res.statusCode && (0, util_1.isExportRetryable)(res.statusCode) && retries > 0) {
                  let retryTime;
                  minDelay = util_1.DEFAULT_EXPORT_BACKOFF_MULTIPLIER * minDelay;
                  if (res.headers["retry-after"]) {
                    retryTime = (0, util_1.parseRetryAfterToMills)(res.headers["retry-after"]);
                  } else {
                    retryTime = Math.round(Math.random() * (util_1.DEFAULT_EXPORT_MAX_BACKOFF - minDelay) + minDelay);
                  }
                  retryTimer = setTimeout(() => {
                    sendWithRetry(retries - 1, minDelay);
                  }, retryTime);
                } else {
                  const error = new types_2.OTLPExporterError(res.statusMessage, res.statusCode, responseData);
                  onError(error);
                  clearTimeout(exporterTimer);
                  clearTimeout(retryTimer);
                }
              }
            });
          });
          req.on("error", (error) => {
            if (reqIsDestroyed) {
              const err = new types_2.OTLPExporterError("Request Timeout", error.code);
              onError(err);
            } else {
              onError(error);
            }
            clearTimeout(exporterTimer);
            clearTimeout(retryTimer);
          });
          req.on("abort", () => {
            if (reqIsDestroyed) {
              const err = new types_2.OTLPExporterError("Request Timeout");
              onError(err);
            }
            clearTimeout(exporterTimer);
            clearTimeout(retryTimer);
          });
          switch (collector.compression) {
            case types_1.CompressionAlgorithm.GZIP: {
              req.setHeader("Content-Encoding", "gzip");
              const dataStream = readableFromBuffer(data);
              dataStream.on("error", onError).pipe(zlib.createGzip()).on("error", onError).pipe(req);
              break;
            }
            default:
              req.end(data);
              break;
          }
        };
        sendWithRetry();
      }
      exports.sendWithHttp = sendWithHttp;
      function readableFromBuffer(buff) {
        const readable = new stream_1.Readable();
        readable.push(buff);
        readable.push(null);
        return readable;
      }
      function createHttpAgent(config) {
        if (config.httpAgentOptions && config.keepAlive === false) {
          api_1.diag.warn("httpAgentOptions is used only when keepAlive is true");
          return void 0;
        }
        if (config.keepAlive === false || !config.url)
          return void 0;
        try {
          const parsedUrl = new url.URL(config.url);
          const Agent = parsedUrl.protocol === "http:" ? http.Agent : https.Agent;
          return new Agent(Object.assign({ keepAlive: true }, config.httpAgentOptions));
        } catch (err) {
          api_1.diag.error(`collector exporter failed to create http agent. err: ${err.message}`);
          return void 0;
        }
      }
      exports.createHttpAgent = createHttpAgent;
      function configureCompression(compression) {
        if (compression) {
          return compression;
        } else {
          const definedCompression = (0, core_1.getEnv)().OTEL_EXPORTER_OTLP_TRACES_COMPRESSION || (0, core_1.getEnv)().OTEL_EXPORTER_OTLP_COMPRESSION;
          return definedCompression === types_1.CompressionAlgorithm.GZIP ? types_1.CompressionAlgorithm.GZIP : types_1.CompressionAlgorithm.NONE;
        }
      }
      exports.configureCompression = configureCompression;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/OTLPExporterNodeBase.js
  var require_OTLPExporterNodeBase = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/OTLPExporterNodeBase.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OTLPExporterNodeBase = void 0;
      var OTLPExporterBase_1 = require_OTLPExporterBase();
      var util_1 = require_util();
      var util_2 = require_util2();
      var api_1 = require_src();
      var core_1 = require_src3();
      var OTLPExporterNodeBase = class extends OTLPExporterBase_1.OTLPExporterBase {
        constructor(config = {}) {
          super(config);
          this.DEFAULT_HEADERS = {};
          if (config.metadata) {
            api_1.diag.warn("Metadata cannot be set when using http");
          }
          this.headers = Object.assign(this.DEFAULT_HEADERS, (0, util_1.parseHeaders)(config.headers), core_1.baggageUtils.parseKeyPairsIntoRecord((0, core_1.getEnv)().OTEL_EXPORTER_OTLP_HEADERS));
          this.agent = (0, util_2.createHttpAgent)(config);
          this.compression = (0, util_2.configureCompression)(config.compression);
        }
        onInit(_config) {
        }
        send(objects, onSuccess, onError) {
          if (this._shutdownOnce.isCalled) {
            api_1.diag.debug("Shutdown already started. Cannot send objects");
            return;
          }
          const serviceRequest = this.convert(objects);
          const promise = new Promise((resolve, reject) => {
            (0, util_2.sendWithHttp)(this, JSON.stringify(serviceRequest), "application/json", resolve, reject);
          }).then(onSuccess, onError);
          this._sendingPromises.push(promise);
          const popPromise = () => {
            const index = this._sendingPromises.indexOf(promise);
            this._sendingPromises.splice(index, 1);
          };
          promise.then(popPromise, popPromise);
        }
        onShutdown() {
        }
      };
      exports.OTLPExporterNodeBase = OTLPExporterNodeBase;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/index.js
  var require_node5 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/node/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CompressionAlgorithm = exports.configureCompression = exports.createHttpAgent = exports.sendWithHttp = exports.OTLPExporterNodeBase = void 0;
      var OTLPExporterNodeBase_1 = require_OTLPExporterNodeBase();
      Object.defineProperty(exports, "OTLPExporterNodeBase", { enumerable: true, get: function() {
        return OTLPExporterNodeBase_1.OTLPExporterNodeBase;
      } });
      var util_1 = require_util2();
      Object.defineProperty(exports, "sendWithHttp", { enumerable: true, get: function() {
        return util_1.sendWithHttp;
      } });
      Object.defineProperty(exports, "createHttpAgent", { enumerable: true, get: function() {
        return util_1.createHttpAgent;
      } });
      Object.defineProperty(exports, "configureCompression", { enumerable: true, get: function() {
        return util_1.configureCompression;
      } });
      var types_1 = require_types5();
      Object.defineProperty(exports, "CompressionAlgorithm", { enumerable: true, get: function() {
        return types_1.CompressionAlgorithm;
      } });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/browser/util.js
  var require_util3 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/browser/util.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sendWithXhr = exports.sendWithBeacon = void 0;
      var api_1 = require_src();
      var types_1 = require_types6();
      var util_1 = require_util();
      function sendWithBeacon(body, url, blobPropertyBag, onSuccess, onError) {
        if (navigator.sendBeacon(url, new Blob([body], blobPropertyBag))) {
          api_1.diag.debug("sendBeacon - can send", body);
          onSuccess();
        } else {
          const error = new types_1.OTLPExporterError(`sendBeacon - cannot send ${body}`);
          onError(error);
        }
      }
      exports.sendWithBeacon = sendWithBeacon;
      function sendWithXhr(body, url, headers, exporterTimeout, onSuccess, onError) {
        let retryTimer;
        let xhr;
        let reqIsDestroyed = false;
        const exporterTimer = setTimeout(() => {
          clearTimeout(retryTimer);
          reqIsDestroyed = true;
          if (xhr.readyState === XMLHttpRequest.DONE) {
            const err = new types_1.OTLPExporterError("Request Timeout");
            onError(err);
          } else {
            xhr.abort();
          }
        }, exporterTimeout);
        const sendWithRetry = (retries = util_1.DEFAULT_EXPORT_MAX_ATTEMPTS, minDelay = util_1.DEFAULT_EXPORT_INITIAL_BACKOFF) => {
          xhr = new XMLHttpRequest();
          xhr.open("POST", url);
          const defaultHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json"
          };
          Object.entries(Object.assign(Object.assign({}, defaultHeaders), headers)).forEach(([k, v]) => {
            xhr.setRequestHeader(k, v);
          });
          xhr.send(body);
          xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && reqIsDestroyed === false) {
              if (xhr.status >= 200 && xhr.status <= 299) {
                api_1.diag.debug("xhr success", body);
                onSuccess();
                clearTimeout(exporterTimer);
                clearTimeout(retryTimer);
              } else if (xhr.status && (0, util_1.isExportRetryable)(xhr.status) && retries > 0) {
                let retryTime;
                minDelay = util_1.DEFAULT_EXPORT_BACKOFF_MULTIPLIER * minDelay;
                if (xhr.getResponseHeader("Retry-After")) {
                  retryTime = (0, util_1.parseRetryAfterToMills)(xhr.getResponseHeader("Retry-After"));
                } else {
                  retryTime = Math.round(Math.random() * (util_1.DEFAULT_EXPORT_MAX_BACKOFF - minDelay) + minDelay);
                }
                retryTimer = setTimeout(() => {
                  sendWithRetry(retries - 1, minDelay);
                }, retryTime);
              } else {
                const error = new types_1.OTLPExporterError(`Failed to export with XHR (status: ${xhr.status})`, xhr.status);
                onError(error);
                clearTimeout(exporterTimer);
                clearTimeout(retryTimer);
              }
            }
          };
          xhr.onabort = () => {
            if (reqIsDestroyed) {
              const err = new types_1.OTLPExporterError("Request Timeout");
              onError(err);
            }
            clearTimeout(exporterTimer);
            clearTimeout(retryTimer);
          };
          xhr.onerror = () => {
            if (reqIsDestroyed) {
              const err = new types_1.OTLPExporterError("Request Timeout");
              onError(err);
            }
            clearTimeout(exporterTimer);
            clearTimeout(retryTimer);
          };
        };
        sendWithRetry();
      }
      exports.sendWithXhr = sendWithXhr;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/browser/OTLPExporterBrowserBase.js
  var require_OTLPExporterBrowserBase = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/browser/OTLPExporterBrowserBase.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OTLPExporterBrowserBase = void 0;
      var OTLPExporterBase_1 = require_OTLPExporterBase();
      var util_1 = require_util();
      var util_2 = require_util3();
      var api_1 = require_src();
      var core_1 = require_src3();
      var OTLPExporterBrowserBase = class extends OTLPExporterBase_1.OTLPExporterBase {
        /**
         * @param config
         */
        constructor(config = {}) {
          super(config);
          this._useXHR = false;
          this._useXHR = !!config.headers || typeof navigator.sendBeacon !== "function";
          if (this._useXHR) {
            this._headers = Object.assign({}, (0, util_1.parseHeaders)(config.headers), core_1.baggageUtils.parseKeyPairsIntoRecord((0, core_1.getEnv)().OTEL_EXPORTER_OTLP_HEADERS));
          } else {
            this._headers = {};
          }
        }
        onInit() {
          core_1._globalThis.addEventListener("unload", this.shutdown);
        }
        onShutdown() {
          core_1._globalThis.removeEventListener("unload", this.shutdown);
        }
        send(items, onSuccess, onError) {
          if (this._shutdownOnce.isCalled) {
            api_1.diag.debug("Shutdown already started. Cannot send objects");
            return;
          }
          const serviceRequest = this.convert(items);
          const body = JSON.stringify(serviceRequest);
          const promise = new Promise((resolve, reject) => {
            if (this._useXHR) {
              (0, util_2.sendWithXhr)(body, this.url, this._headers, this.timeoutMillis, resolve, reject);
            } else {
              (0, util_2.sendWithBeacon)(body, this.url, { type: "application/json" }, resolve, reject);
            }
          }).then(onSuccess, onError);
          this._sendingPromises.push(promise);
          const popPromise = () => {
            const index = this._sendingPromises.indexOf(promise);
            this._sendingPromises.splice(index, 1);
          };
          promise.then(popPromise, popPromise);
        }
      };
      exports.OTLPExporterBrowserBase = OTLPExporterBrowserBase;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/browser/index.js
  var require_browser = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/browser/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sendWithXhr = exports.OTLPExporterBrowserBase = void 0;
      var OTLPExporterBrowserBase_1 = require_OTLPExporterBrowserBase();
      Object.defineProperty(exports, "OTLPExporterBrowserBase", { enumerable: true, get: function() {
        return OTLPExporterBrowserBase_1.OTLPExporterBrowserBase;
      } });
      var util_1 = require_util3();
      Object.defineProperty(exports, "sendWithXhr", { enumerable: true, get: function() {
        return util_1.sendWithXhr;
      } });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/index.js
  var require_platform5 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/platform/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sendWithXhr = exports.OTLPExporterBrowserBase = exports.CompressionAlgorithm = exports.configureCompression = exports.createHttpAgent = exports.sendWithHttp = exports.OTLPExporterNodeBase = void 0;
      var node_1 = require_node5();
      Object.defineProperty(exports, "OTLPExporterNodeBase", { enumerable: true, get: function() {
        return node_1.OTLPExporterNodeBase;
      } });
      Object.defineProperty(exports, "sendWithHttp", { enumerable: true, get: function() {
        return node_1.sendWithHttp;
      } });
      Object.defineProperty(exports, "createHttpAgent", { enumerable: true, get: function() {
        return node_1.createHttpAgent;
      } });
      Object.defineProperty(exports, "configureCompression", { enumerable: true, get: function() {
        return node_1.configureCompression;
      } });
      Object.defineProperty(exports, "CompressionAlgorithm", { enumerable: true, get: function() {
        return node_1.CompressionAlgorithm;
      } });
      var browser_1 = require_browser();
      Object.defineProperty(exports, "OTLPExporterBrowserBase", { enumerable: true, get: function() {
        return browser_1.OTLPExporterBrowserBase;
      } });
      Object.defineProperty(exports, "sendWithXhr", { enumerable: true, get: function() {
        return browser_1.sendWithXhr;
      } });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/index.js
  var require_src6 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-exporter-base-virtual-c764f1f165/0/cache/@opentelemetry-otlp-exporter-base-npm-0.48.0-41258b0b20-747d372471.zip/node_modules/@opentelemetry/otlp-exporter-base/build/src/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.invalidTimeout = exports.configureExporterTimeout = exports.appendRootPathToUrlIfNeeded = exports.appendResourcePathToUrl = exports.parseHeaders = exports.OTLPExporterError = exports.OTLPExporterBase = void 0;
      __exportStar(require_platform5(), exports);
      var OTLPExporterBase_1 = require_OTLPExporterBase();
      Object.defineProperty(exports, "OTLPExporterBase", { enumerable: true, get: function() {
        return OTLPExporterBase_1.OTLPExporterBase;
      } });
      var types_1 = require_types6();
      Object.defineProperty(exports, "OTLPExporterError", { enumerable: true, get: function() {
        return types_1.OTLPExporterError;
      } });
      var util_1 = require_util();
      Object.defineProperty(exports, "parseHeaders", { enumerable: true, get: function() {
        return util_1.parseHeaders;
      } });
      Object.defineProperty(exports, "appendResourcePathToUrl", { enumerable: true, get: function() {
        return util_1.appendResourcePathToUrl;
      } });
      Object.defineProperty(exports, "appendRootPathToUrlIfNeeded", { enumerable: true, get: function() {
        return util_1.appendRootPathToUrlIfNeeded;
      } });
      Object.defineProperty(exports, "configureExporterTimeout", { enumerable: true, get: function() {
        return util_1.configureExporterTimeout;
      } });
      Object.defineProperty(exports, "invalidTimeout", { enumerable: true, get: function() {
        return util_1.invalidTimeout;
      } });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/common/types.js
  var require_types7 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/common/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/common/index.js
  var require_common3 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/common/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getOtlpEncoder = exports.encodeAsString = exports.encodeAsLongBits = exports.toLongBits = exports.hrTimeToNanos = void 0;
      var core_1 = require_src3();
      var NANOSECONDS = BigInt(1e9);
      function hrTimeToNanos(hrTime) {
        return BigInt(hrTime[0]) * NANOSECONDS + BigInt(hrTime[1]);
      }
      exports.hrTimeToNanos = hrTimeToNanos;
      function toLongBits(value) {
        const low = Number(BigInt.asUintN(32, value));
        const high = Number(BigInt.asUintN(32, value >> BigInt(32)));
        return { low, high };
      }
      exports.toLongBits = toLongBits;
      function encodeAsLongBits(hrTime) {
        const nanos = hrTimeToNanos(hrTime);
        return toLongBits(nanos);
      }
      exports.encodeAsLongBits = encodeAsLongBits;
      function encodeAsString(hrTime) {
        const nanos = hrTimeToNanos(hrTime);
        return nanos.toString();
      }
      exports.encodeAsString = encodeAsString;
      var encodeTimestamp = typeof BigInt !== "undefined" ? encodeAsString : core_1.hrTimeToNanoseconds;
      function identity(value) {
        return value;
      }
      function optionalHexToBinary(str2) {
        if (str2 === void 0)
          return void 0;
        return (0, core_1.hexToBinary)(str2);
      }
      var DEFAULT_ENCODER = {
        encodeHrTime: encodeAsLongBits,
        encodeSpanContext: core_1.hexToBinary,
        encodeOptionalSpanContext: optionalHexToBinary
      };
      function getOtlpEncoder(options) {
        var _a, _b;
        if (options === void 0) {
          return DEFAULT_ENCODER;
        }
        const useLongBits = (_a = options.useLongBits) !== null && _a !== void 0 ? _a : true;
        const useHex = (_b = options.useHex) !== null && _b !== void 0 ? _b : false;
        return {
          encodeHrTime: useLongBits ? encodeAsLongBits : encodeTimestamp,
          encodeSpanContext: useHex ? identity : core_1.hexToBinary,
          encodeOptionalSpanContext: useHex ? identity : optionalHexToBinary
        };
      }
      exports.getOtlpEncoder = getOtlpEncoder;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/metrics/types.js
  var require_types8 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/metrics/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/resource/types.js
  var require_types9 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/resource/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/trace/types.js
  var require_types10 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/trace/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ESpanKind = void 0;
      var ESpanKind;
      (function(ESpanKind2) {
        ESpanKind2[ESpanKind2["SPAN_KIND_UNSPECIFIED"] = 0] = "SPAN_KIND_UNSPECIFIED";
        ESpanKind2[ESpanKind2["SPAN_KIND_INTERNAL"] = 1] = "SPAN_KIND_INTERNAL";
        ESpanKind2[ESpanKind2["SPAN_KIND_SERVER"] = 2] = "SPAN_KIND_SERVER";
        ESpanKind2[ESpanKind2["SPAN_KIND_CLIENT"] = 3] = "SPAN_KIND_CLIENT";
        ESpanKind2[ESpanKind2["SPAN_KIND_PRODUCER"] = 4] = "SPAN_KIND_PRODUCER";
        ESpanKind2[ESpanKind2["SPAN_KIND_CONSUMER"] = 5] = "SPAN_KIND_CONSUMER";
      })(ESpanKind = exports.ESpanKind || (exports.ESpanKind = {}));
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/logs/types.js
  var require_types11 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/logs/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/common/internal.js
  var require_internal = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/common/internal.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.toAnyValue = exports.toKeyValue = exports.toAttributes = void 0;
      function toAttributes(attributes) {
        return Object.keys(attributes).map((key) => toKeyValue(key, attributes[key]));
      }
      exports.toAttributes = toAttributes;
      function toKeyValue(key, value) {
        return {
          key,
          value: toAnyValue(value)
        };
      }
      exports.toKeyValue = toKeyValue;
      function toAnyValue(value) {
        const t2 = typeof value;
        if (t2 === "string")
          return { stringValue: value };
        if (t2 === "number") {
          if (!Number.isInteger(value))
            return { doubleValue: value };
          return { intValue: value };
        }
        if (t2 === "boolean")
          return { boolValue: value };
        if (value instanceof Uint8Array)
          return { bytesValue: value };
        if (Array.isArray(value))
          return { arrayValue: { values: value.map(toAnyValue) } };
        if (t2 === "object" && value != null)
          return {
            kvlistValue: {
              values: Object.entries(value).map(([k, v]) => toKeyValue(k, v))
            }
          };
        return {};
      }
      exports.toAnyValue = toAnyValue;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/trace/internal.js
  var require_internal2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/trace/internal.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.toOtlpSpanEvent = exports.toOtlpLink = exports.sdkSpanToOtlpSpan = void 0;
      var internal_1 = require_internal();
      function sdkSpanToOtlpSpan(span, encoder) {
        var _a;
        const ctx = span.spanContext();
        const status = span.status;
        return {
          traceId: encoder.encodeSpanContext(ctx.traceId),
          spanId: encoder.encodeSpanContext(ctx.spanId),
          parentSpanId: encoder.encodeOptionalSpanContext(span.parentSpanId),
          traceState: (_a = ctx.traceState) === null || _a === void 0 ? void 0 : _a.serialize(),
          name: span.name,
          // Span kind is offset by 1 because the API does not define a value for unset
          kind: span.kind == null ? 0 : span.kind + 1,
          startTimeUnixNano: encoder.encodeHrTime(span.startTime),
          endTimeUnixNano: encoder.encodeHrTime(span.endTime),
          attributes: (0, internal_1.toAttributes)(span.attributes),
          droppedAttributesCount: span.droppedAttributesCount,
          events: span.events.map((event) => toOtlpSpanEvent(event, encoder)),
          droppedEventsCount: span.droppedEventsCount,
          status: {
            // API and proto enums share the same values
            code: status.code,
            message: status.message
          },
          links: span.links.map((link) => toOtlpLink(link, encoder)),
          droppedLinksCount: span.droppedLinksCount
        };
      }
      exports.sdkSpanToOtlpSpan = sdkSpanToOtlpSpan;
      function toOtlpLink(link, encoder) {
        var _a;
        return {
          attributes: link.attributes ? (0, internal_1.toAttributes)(link.attributes) : [],
          spanId: encoder.encodeSpanContext(link.context.spanId),
          traceId: encoder.encodeSpanContext(link.context.traceId),
          traceState: (_a = link.context.traceState) === null || _a === void 0 ? void 0 : _a.serialize(),
          droppedAttributesCount: link.droppedAttributesCount || 0
        };
      }
      exports.toOtlpLink = toOtlpLink;
      function toOtlpSpanEvent(timedEvent, encoder) {
        return {
          attributes: timedEvent.attributes ? (0, internal_1.toAttributes)(timedEvent.attributes) : [],
          name: timedEvent.name,
          timeUnixNano: encoder.encodeHrTime(timedEvent.time),
          droppedAttributesCount: timedEvent.droppedAttributesCount || 0
        };
      }
      exports.toOtlpSpanEvent = toOtlpSpanEvent;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/trace/index.js
  var require_trace3 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/trace/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createExportTraceServiceRequest = void 0;
      var internal_1 = require_internal();
      var internal_2 = require_internal2();
      var common_1 = require_common3();
      function createExportTraceServiceRequest(spans, options) {
        const encoder = (0, common_1.getOtlpEncoder)(options);
        return {
          resourceSpans: spanRecordsToResourceSpans(spans, encoder)
        };
      }
      exports.createExportTraceServiceRequest = createExportTraceServiceRequest;
      function createResourceMap(readableSpans) {
        const resourceMap = /* @__PURE__ */ new Map();
        for (const record of readableSpans) {
          let ilmMap = resourceMap.get(record.resource);
          if (!ilmMap) {
            ilmMap = /* @__PURE__ */ new Map();
            resourceMap.set(record.resource, ilmMap);
          }
          const instrumentationLibraryKey = `${record.instrumentationLibrary.name}@${record.instrumentationLibrary.version || ""}:${record.instrumentationLibrary.schemaUrl || ""}`;
          let records = ilmMap.get(instrumentationLibraryKey);
          if (!records) {
            records = [];
            ilmMap.set(instrumentationLibraryKey, records);
          }
          records.push(record);
        }
        return resourceMap;
      }
      function spanRecordsToResourceSpans(readableSpans, encoder) {
        const resourceMap = createResourceMap(readableSpans);
        const out = [];
        const entryIterator = resourceMap.entries();
        let entry = entryIterator.next();
        while (!entry.done) {
          const [resource, ilmMap] = entry.value;
          const scopeResourceSpans = [];
          const ilmIterator = ilmMap.values();
          let ilmEntry = ilmIterator.next();
          while (!ilmEntry.done) {
            const scopeSpans = ilmEntry.value;
            if (scopeSpans.length > 0) {
              const { name, version, schemaUrl } = scopeSpans[0].instrumentationLibrary;
              const spans = scopeSpans.map((readableSpan) => (0, internal_2.sdkSpanToOtlpSpan)(readableSpan, encoder));
              scopeResourceSpans.push({
                scope: { name, version },
                spans,
                schemaUrl
              });
            }
            ilmEntry = ilmIterator.next();
          }
          const transformedSpans = {
            resource: {
              attributes: (0, internal_1.toAttributes)(resource.attributes),
              droppedAttributesCount: 0
            },
            scopeSpans: scopeResourceSpans,
            schemaUrl: void 0
          };
          out.push(transformedSpans);
          entry = entryIterator.next();
        }
        return out;
      }
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/AggregationTemporality.js
  var require_AggregationTemporality = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/AggregationTemporality.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AggregationTemporality = void 0;
      var AggregationTemporality;
      (function(AggregationTemporality2) {
        AggregationTemporality2[AggregationTemporality2["DELTA"] = 0] = "DELTA";
        AggregationTemporality2[AggregationTemporality2["CUMULATIVE"] = 1] = "CUMULATIVE";
      })(AggregationTemporality = exports.AggregationTemporality || (exports.AggregationTemporality = {}));
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/MetricData.js
  var require_MetricData = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/MetricData.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DataPointType = void 0;
      var DataPointType;
      (function(DataPointType2) {
        DataPointType2[DataPointType2["HISTOGRAM"] = 0] = "HISTOGRAM";
        DataPointType2[DataPointType2["EXPONENTIAL_HISTOGRAM"] = 1] = "EXPONENTIAL_HISTOGRAM";
        DataPointType2[DataPointType2["GAUGE"] = 2] = "GAUGE";
        DataPointType2[DataPointType2["SUM"] = 3] = "SUM";
      })(DataPointType = exports.DataPointType || (exports.DataPointType = {}));
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/utils.js
  var require_utils10 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.equalsCaseInsensitive = exports.binarySearchLB = exports.setEquals = exports.FlatMap = exports.isPromiseAllSettledRejectionResult = exports.PromiseAllSettled = exports.callWithTimeout = exports.TimeoutError = exports.instrumentationScopeId = exports.hashAttributes = exports.isNotNullish = void 0;
      function isNotNullish(item) {
        return item !== void 0 && item !== null;
      }
      exports.isNotNullish = isNotNullish;
      function hashAttributes(attributes) {
        let keys = Object.keys(attributes);
        if (keys.length === 0)
          return "";
        keys = keys.sort();
        return JSON.stringify(keys.map((key) => [key, attributes[key]]));
      }
      exports.hashAttributes = hashAttributes;
      function instrumentationScopeId(instrumentationScope) {
        var _a, _b;
        return `${instrumentationScope.name}:${(_a = instrumentationScope.version) !== null && _a !== void 0 ? _a : ""}:${(_b = instrumentationScope.schemaUrl) !== null && _b !== void 0 ? _b : ""}`;
      }
      exports.instrumentationScopeId = instrumentationScopeId;
      var TimeoutError = class _TimeoutError extends Error {
        constructor(message) {
          super(message);
          Object.setPrototypeOf(this, _TimeoutError.prototype);
        }
      };
      exports.TimeoutError = TimeoutError;
      function callWithTimeout(promise, timeout) {
        let timeoutHandle;
        const timeoutPromise = new Promise(function timeoutFunction(_resolve, reject) {
          timeoutHandle = setTimeout(function timeoutHandler() {
            reject(new TimeoutError("Operation timed out."));
          }, timeout);
        });
        return Promise.race([promise, timeoutPromise]).then((result) => {
          clearTimeout(timeoutHandle);
          return result;
        }, (reason) => {
          clearTimeout(timeoutHandle);
          throw reason;
        });
      }
      exports.callWithTimeout = callWithTimeout;
      async function PromiseAllSettled(promises) {
        return Promise.all(promises.map(async (p) => {
          try {
            const ret = await p;
            return {
              status: "fulfilled",
              value: ret
            };
          } catch (e) {
            return {
              status: "rejected",
              reason: e
            };
          }
        }));
      }
      exports.PromiseAllSettled = PromiseAllSettled;
      function isPromiseAllSettledRejectionResult(it) {
        return it.status === "rejected";
      }
      exports.isPromiseAllSettledRejectionResult = isPromiseAllSettledRejectionResult;
      function FlatMap(arr, fn) {
        const result = [];
        arr.forEach((it) => {
          result.push(...fn(it));
        });
        return result;
      }
      exports.FlatMap = FlatMap;
      function setEquals(lhs, rhs) {
        if (lhs.size !== rhs.size) {
          return false;
        }
        for (const item of lhs) {
          if (!rhs.has(item)) {
            return false;
          }
        }
        return true;
      }
      exports.setEquals = setEquals;
      function binarySearchLB(arr, value) {
        let lo = 0;
        let hi = arr.length - 1;
        while (hi - lo > 1) {
          const mid = Math.trunc((hi + lo) / 2);
          if (arr[mid] <= value) {
            lo = mid;
          } else {
            hi = mid - 1;
          }
        }
        if (arr[hi] <= value) {
          return hi;
        } else if (arr[lo] <= value) {
          return lo;
        }
        return -1;
      }
      exports.binarySearchLB = binarySearchLB;
      function equalsCaseInsensitive(lhs, rhs) {
        return lhs.toLowerCase() === rhs.toLowerCase();
      }
      exports.equalsCaseInsensitive = equalsCaseInsensitive;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/types.js
  var require_types12 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AggregatorKind = void 0;
      var AggregatorKind;
      (function(AggregatorKind2) {
        AggregatorKind2[AggregatorKind2["DROP"] = 0] = "DROP";
        AggregatorKind2[AggregatorKind2["SUM"] = 1] = "SUM";
        AggregatorKind2[AggregatorKind2["LAST_VALUE"] = 2] = "LAST_VALUE";
        AggregatorKind2[AggregatorKind2["HISTOGRAM"] = 3] = "HISTOGRAM";
        AggregatorKind2[AggregatorKind2["EXPONENTIAL_HISTOGRAM"] = 4] = "EXPONENTIAL_HISTOGRAM";
      })(AggregatorKind = exports.AggregatorKind || (exports.AggregatorKind = {}));
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Drop.js
  var require_Drop = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Drop.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DropAggregator = void 0;
      var types_1 = require_types12();
      var DropAggregator = class {
        constructor() {
          this.kind = types_1.AggregatorKind.DROP;
        }
        createAccumulation() {
          return void 0;
        }
        merge(_previous, _delta) {
          return void 0;
        }
        diff(_previous, _current) {
          return void 0;
        }
        toMetricData(_descriptor, _aggregationTemporality, _accumulationByAttributes, _endTime) {
          return void 0;
        }
      };
      exports.DropAggregator = DropAggregator;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/InstrumentDescriptor.js
  var require_InstrumentDescriptor = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/InstrumentDescriptor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isValidName = exports.isDescriptorCompatibleWith = exports.createInstrumentDescriptorWithView = exports.createInstrumentDescriptor = exports.InstrumentType = void 0;
      var api_1 = require_src();
      var utils_1 = require_utils10();
      var InstrumentType;
      (function(InstrumentType2) {
        InstrumentType2["COUNTER"] = "COUNTER";
        InstrumentType2["HISTOGRAM"] = "HISTOGRAM";
        InstrumentType2["UP_DOWN_COUNTER"] = "UP_DOWN_COUNTER";
        InstrumentType2["OBSERVABLE_COUNTER"] = "OBSERVABLE_COUNTER";
        InstrumentType2["OBSERVABLE_GAUGE"] = "OBSERVABLE_GAUGE";
        InstrumentType2["OBSERVABLE_UP_DOWN_COUNTER"] = "OBSERVABLE_UP_DOWN_COUNTER";
      })(InstrumentType = exports.InstrumentType || (exports.InstrumentType = {}));
      function createInstrumentDescriptor(name, type2, options) {
        var _a, _b, _c, _d;
        if (!isValidName(name)) {
          api_1.diag.warn(`Invalid metric name: "${name}". The metric name should be a ASCII string with a length no greater than 255 characters.`);
        }
        return {
          name,
          type: type2,
          description: (_a = options === null || options === void 0 ? void 0 : options.description) !== null && _a !== void 0 ? _a : "",
          unit: (_b = options === null || options === void 0 ? void 0 : options.unit) !== null && _b !== void 0 ? _b : "",
          valueType: (_c = options === null || options === void 0 ? void 0 : options.valueType) !== null && _c !== void 0 ? _c : api_1.ValueType.DOUBLE,
          advice: (_d = options === null || options === void 0 ? void 0 : options.advice) !== null && _d !== void 0 ? _d : {}
        };
      }
      exports.createInstrumentDescriptor = createInstrumentDescriptor;
      function createInstrumentDescriptorWithView(view, instrument) {
        var _a, _b;
        return {
          name: (_a = view.name) !== null && _a !== void 0 ? _a : instrument.name,
          description: (_b = view.description) !== null && _b !== void 0 ? _b : instrument.description,
          type: instrument.type,
          unit: instrument.unit,
          valueType: instrument.valueType,
          advice: instrument.advice
        };
      }
      exports.createInstrumentDescriptorWithView = createInstrumentDescriptorWithView;
      function isDescriptorCompatibleWith(descriptor, otherDescriptor) {
        return (0, utils_1.equalsCaseInsensitive)(descriptor.name, otherDescriptor.name) && descriptor.unit === otherDescriptor.unit && descriptor.type === otherDescriptor.type && descriptor.valueType === otherDescriptor.valueType;
      }
      exports.isDescriptorCompatibleWith = isDescriptorCompatibleWith;
      var NAME_REGEXP = /^[a-z][a-z0-9_.\-/]{0,254}$/i;
      function isValidName(name) {
        return name.match(NAME_REGEXP) != null;
      }
      exports.isValidName = isValidName;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Histogram.js
  var require_Histogram = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Histogram.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.HistogramAggregator = exports.HistogramAccumulation = void 0;
      var types_1 = require_types12();
      var MetricData_1 = require_MetricData();
      var InstrumentDescriptor_1 = require_InstrumentDescriptor();
      var utils_1 = require_utils10();
      function createNewEmptyCheckpoint(boundaries) {
        const counts = boundaries.map(() => 0);
        counts.push(0);
        return {
          buckets: {
            boundaries,
            counts
          },
          sum: 0,
          count: 0,
          hasMinMax: false,
          min: Infinity,
          max: -Infinity
        };
      }
      var HistogramAccumulation = class {
        constructor(startTime, _boundaries, _recordMinMax = true, _current = createNewEmptyCheckpoint(_boundaries)) {
          this.startTime = startTime;
          this._boundaries = _boundaries;
          this._recordMinMax = _recordMinMax;
          this._current = _current;
        }
        record(value) {
          this._current.count += 1;
          this._current.sum += value;
          if (this._recordMinMax) {
            this._current.min = Math.min(value, this._current.min);
            this._current.max = Math.max(value, this._current.max);
            this._current.hasMinMax = true;
          }
          const idx = (0, utils_1.binarySearchLB)(this._boundaries, value);
          this._current.buckets.counts[idx + 1] += 1;
        }
        setStartTime(startTime) {
          this.startTime = startTime;
        }
        toPointValue() {
          return this._current;
        }
      };
      exports.HistogramAccumulation = HistogramAccumulation;
      var HistogramAggregator = class {
        /**
         * @param _boundaries sorted upper bounds of recorded values.
         * @param _recordMinMax If set to true, min and max will be recorded. Otherwise, min and max will not be recorded.
         */
        constructor(_boundaries, _recordMinMax) {
          this._boundaries = _boundaries;
          this._recordMinMax = _recordMinMax;
          this.kind = types_1.AggregatorKind.HISTOGRAM;
        }
        createAccumulation(startTime) {
          return new HistogramAccumulation(startTime, this._boundaries, this._recordMinMax);
        }
        /**
         * Return the result of the merge of two histogram accumulations. As long as one Aggregator
         * instance produces all Accumulations with constant boundaries we don't need to worry about
         * merging accumulations with different boundaries.
         */
        merge(previous, delta) {
          const previousValue = previous.toPointValue();
          const deltaValue = delta.toPointValue();
          const previousCounts = previousValue.buckets.counts;
          const deltaCounts = deltaValue.buckets.counts;
          const mergedCounts = new Array(previousCounts.length);
          for (let idx = 0; idx < previousCounts.length; idx++) {
            mergedCounts[idx] = previousCounts[idx] + deltaCounts[idx];
          }
          let min = Infinity;
          let max = -Infinity;
          if (this._recordMinMax) {
            if (previousValue.hasMinMax && deltaValue.hasMinMax) {
              min = Math.min(previousValue.min, deltaValue.min);
              max = Math.max(previousValue.max, deltaValue.max);
            } else if (previousValue.hasMinMax) {
              min = previousValue.min;
              max = previousValue.max;
            } else if (deltaValue.hasMinMax) {
              min = deltaValue.min;
              max = deltaValue.max;
            }
          }
          return new HistogramAccumulation(previous.startTime, previousValue.buckets.boundaries, this._recordMinMax, {
            buckets: {
              boundaries: previousValue.buckets.boundaries,
              counts: mergedCounts
            },
            count: previousValue.count + deltaValue.count,
            sum: previousValue.sum + deltaValue.sum,
            hasMinMax: this._recordMinMax && (previousValue.hasMinMax || deltaValue.hasMinMax),
            min,
            max
          });
        }
        /**
         * Returns a new DELTA aggregation by comparing two cumulative measurements.
         */
        diff(previous, current) {
          const previousValue = previous.toPointValue();
          const currentValue = current.toPointValue();
          const previousCounts = previousValue.buckets.counts;
          const currentCounts = currentValue.buckets.counts;
          const diffedCounts = new Array(previousCounts.length);
          for (let idx = 0; idx < previousCounts.length; idx++) {
            diffedCounts[idx] = currentCounts[idx] - previousCounts[idx];
          }
          return new HistogramAccumulation(current.startTime, previousValue.buckets.boundaries, this._recordMinMax, {
            buckets: {
              boundaries: previousValue.buckets.boundaries,
              counts: diffedCounts
            },
            count: currentValue.count - previousValue.count,
            sum: currentValue.sum - previousValue.sum,
            hasMinMax: false,
            min: Infinity,
            max: -Infinity
          });
        }
        toMetricData(descriptor, aggregationTemporality, accumulationByAttributes, endTime) {
          return {
            descriptor,
            aggregationTemporality,
            dataPointType: MetricData_1.DataPointType.HISTOGRAM,
            dataPoints: accumulationByAttributes.map(([attributes, accumulation]) => {
              const pointValue = accumulation.toPointValue();
              const allowsNegativeValues = descriptor.type === InstrumentDescriptor_1.InstrumentType.UP_DOWN_COUNTER || descriptor.type === InstrumentDescriptor_1.InstrumentType.OBSERVABLE_GAUGE || descriptor.type === InstrumentDescriptor_1.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER;
              return {
                attributes,
                startTime: accumulation.startTime,
                endTime,
                value: {
                  min: pointValue.hasMinMax ? pointValue.min : void 0,
                  max: pointValue.hasMinMax ? pointValue.max : void 0,
                  sum: !allowsNegativeValues ? pointValue.sum : void 0,
                  buckets: pointValue.buckets,
                  count: pointValue.count
                }
              };
            })
          };
        }
      };
      exports.HistogramAggregator = HistogramAggregator;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/Buckets.js
  var require_Buckets = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/Buckets.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Buckets = void 0;
      var Buckets = class _Buckets {
        /**
         * The term index refers to the number of the exponential histogram bucket
         * used to determine its boundaries. The lower boundary of a bucket is
         * determined by base ** index and the upper boundary of a bucket is
         * determined by base ** (index + 1). index values are signed to account
         * for values less than or equal to 1.
         *
         * indexBase is the index of the 0th position in the
         * backing array, i.e., backing[0] is the count
         * in the bucket with index `indexBase`.
         *
         * indexStart is the smallest index value represented
         * in the backing array.
         *
         * indexEnd is the largest index value represented in
         * the backing array.
         */
        constructor(backing = new BucketsBacking(), indexBase = 0, indexStart = 0, indexEnd = 0) {
          this.backing = backing;
          this.indexBase = indexBase;
          this.indexStart = indexStart;
          this.indexEnd = indexEnd;
        }
        /**
         * Offset is the bucket index of the smallest entry in the counts array
         * @returns {number}
         */
        get offset() {
          return this.indexStart;
        }
        /**
         * Buckets is a view into the backing array.
         * @returns {number}
         */
        get length() {
          if (this.backing.length === 0) {
            return 0;
          }
          if (this.indexEnd === this.indexStart && this.at(0) === 0) {
            return 0;
          }
          return this.indexEnd - this.indexStart + 1;
        }
        /**
         * An array of counts, where count[i] carries the count
         * of the bucket at index (offset+i).  count[i] is the count of
         * values greater than base^(offset+i) and less than or equal to
         * base^(offset+i+1).
         * @returns {number} The logical counts based on the backing array
         */
        counts() {
          return Array.from({ length: this.length }, (_, i) => this.at(i));
        }
        /**
         * At returns the count of the bucket at a position in the logical
         * array of counts.
         * @param position
         * @returns {number}
         */
        at(position) {
          const bias = this.indexBase - this.indexStart;
          if (position < bias) {
            position += this.backing.length;
          }
          position -= bias;
          return this.backing.countAt(position);
        }
        /**
         * incrementBucket increments the backing array index by `increment`
         * @param bucketIndex
         * @param increment
         */
        incrementBucket(bucketIndex, increment) {
          this.backing.increment(bucketIndex, increment);
        }
        /**
         * decrementBucket decrements the backing array index by `decrement`
         * if decrement is greater than the current value, it's set to 0.
         * @param bucketIndex
         * @param decrement
         */
        decrementBucket(bucketIndex, decrement) {
          this.backing.decrement(bucketIndex, decrement);
        }
        /**
         * trim removes leading and / or trailing zero buckets (which can occur
         * after diffing two histos) and rotates the backing array so that the
         * smallest non-zero index is in the 0th position of the backing array
         */
        trim() {
          for (let i = 0; i < this.length; i++) {
            if (this.at(i) !== 0) {
              this.indexStart += i;
              break;
            } else if (i === this.length - 1) {
              this.indexStart = this.indexEnd = this.indexBase = 0;
              return;
            }
          }
          for (let i = this.length - 1; i >= 0; i--) {
            if (this.at(i) !== 0) {
              this.indexEnd -= this.length - i - 1;
              break;
            }
          }
          this._rotate();
        }
        /**
         * downscale first rotates, then collapses 2**`by`-to-1 buckets.
         * @param by
         */
        downscale(by) {
          this._rotate();
          const size = 1 + this.indexEnd - this.indexStart;
          const each = 1 << by;
          let inpos = 0;
          let outpos = 0;
          for (let pos = this.indexStart; pos <= this.indexEnd; ) {
            let mod = pos % each;
            if (mod < 0) {
              mod += each;
            }
            for (let i = mod; i < each && inpos < size; i++) {
              this._relocateBucket(outpos, inpos);
              inpos++;
              pos++;
            }
            outpos++;
          }
          this.indexStart >>= by;
          this.indexEnd >>= by;
          this.indexBase = this.indexStart;
        }
        /**
         * Clone returns a deep copy of Buckets
         * @returns {Buckets}
         */
        clone() {
          return new _Buckets(this.backing.clone(), this.indexBase, this.indexStart, this.indexEnd);
        }
        /**
         * _rotate shifts the backing array contents so that indexStart ==
         * indexBase to simplify the downscale logic.
         */
        _rotate() {
          const bias = this.indexBase - this.indexStart;
          if (bias === 0) {
            return;
          } else if (bias > 0) {
            this.backing.reverse(0, this.backing.length);
            this.backing.reverse(0, bias);
            this.backing.reverse(bias, this.backing.length);
          } else {
            this.backing.reverse(0, this.backing.length);
            this.backing.reverse(0, this.backing.length + bias);
          }
          this.indexBase = this.indexStart;
        }
        /**
         * _relocateBucket adds the count in counts[src] to counts[dest] and
         * resets count[src] to zero.
         */
        _relocateBucket(dest, src) {
          if (dest === src) {
            return;
          }
          this.incrementBucket(dest, this.backing.emptyBucket(src));
        }
      };
      exports.Buckets = Buckets;
      var BucketsBacking = class _BucketsBacking {
        constructor(_counts = [0]) {
          this._counts = _counts;
        }
        /**
         * length returns the physical size of the backing array, which
         * is >= buckets.length()
         */
        get length() {
          return this._counts.length;
        }
        /**
         * countAt returns the count in a specific bucket
         */
        countAt(pos) {
          return this._counts[pos];
        }
        /**
         * growTo grows a backing array and copies old entries
         * into their correct new positions.
         */
        growTo(newSize, oldPositiveLimit, newPositiveLimit) {
          const tmp = new Array(newSize).fill(0);
          tmp.splice(newPositiveLimit, this._counts.length - oldPositiveLimit, ...this._counts.slice(oldPositiveLimit));
          tmp.splice(0, oldPositiveLimit, ...this._counts.slice(0, oldPositiveLimit));
          this._counts = tmp;
        }
        /**
         * reverse the items in the backing array in the range [from, limit).
         */
        reverse(from, limit) {
          const num = Math.floor((from + limit) / 2) - from;
          for (let i = 0; i < num; i++) {
            const tmp = this._counts[from + i];
            this._counts[from + i] = this._counts[limit - i - 1];
            this._counts[limit - i - 1] = tmp;
          }
        }
        /**
         * emptyBucket empties the count from a bucket, for
         * moving into another.
         */
        emptyBucket(src) {
          const tmp = this._counts[src];
          this._counts[src] = 0;
          return tmp;
        }
        /**
         * increments a bucket by `increment`
         */
        increment(bucketIndex, increment) {
          this._counts[bucketIndex] += increment;
        }
        /**
         * decrements a bucket by `decrement`
         */
        decrement(bucketIndex, decrement) {
          if (this._counts[bucketIndex] >= decrement) {
            this._counts[bucketIndex] -= decrement;
          } else {
            this._counts[bucketIndex] = 0;
          }
        }
        /**
         * clone returns a deep copy of BucketsBacking
         */
        clone() {
          return new _BucketsBacking([...this._counts]);
        }
      };
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/mapping/ieee754.js
  var require_ieee754 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/mapping/ieee754.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getSignificand = exports.getNormalBase2 = exports.MIN_VALUE = exports.MAX_NORMAL_EXPONENT = exports.MIN_NORMAL_EXPONENT = exports.SIGNIFICAND_WIDTH = void 0;
      exports.SIGNIFICAND_WIDTH = 52;
      var EXPONENT_MASK = 2146435072;
      var SIGNIFICAND_MASK = 1048575;
      var EXPONENT_BIAS = 1023;
      exports.MIN_NORMAL_EXPONENT = -EXPONENT_BIAS + 1;
      exports.MAX_NORMAL_EXPONENT = EXPONENT_BIAS;
      exports.MIN_VALUE = Math.pow(2, -1022);
      function getNormalBase2(value) {
        const dv = new DataView(new ArrayBuffer(8));
        dv.setFloat64(0, value);
        const hiBits = dv.getUint32(0);
        const expBits = (hiBits & EXPONENT_MASK) >> 20;
        return expBits - EXPONENT_BIAS;
      }
      exports.getNormalBase2 = getNormalBase2;
      function getSignificand(value) {
        const dv = new DataView(new ArrayBuffer(8));
        dv.setFloat64(0, value);
        const hiBits = dv.getUint32(0);
        const loBits = dv.getUint32(4);
        const significandHiBits = (hiBits & SIGNIFICAND_MASK) * Math.pow(2, 32);
        return significandHiBits + loBits;
      }
      exports.getSignificand = getSignificand;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/util.js
  var require_util4 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/util.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.nextGreaterSquare = exports.ldexp = void 0;
      function ldexp(frac, exp) {
        if (frac === 0 || frac === Number.POSITIVE_INFINITY || frac === Number.NEGATIVE_INFINITY || Number.isNaN(frac)) {
          return frac;
        }
        return frac * Math.pow(2, exp);
      }
      exports.ldexp = ldexp;
      function nextGreaterSquare(v) {
        v--;
        v |= v >> 1;
        v |= v >> 2;
        v |= v >> 4;
        v |= v >> 8;
        v |= v >> 16;
        v++;
        return v;
      }
      exports.nextGreaterSquare = nextGreaterSquare;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/mapping/types.js
  var require_types13 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/mapping/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MappingError = void 0;
      var MappingError = class extends Error {
      };
      exports.MappingError = MappingError;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/mapping/ExponentMapping.js
  var require_ExponentMapping = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/mapping/ExponentMapping.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ExponentMapping = void 0;
      var ieee754 = require_ieee754();
      var util = require_util4();
      var types_1 = require_types13();
      var ExponentMapping = class {
        constructor(scale) {
          this._shift = -scale;
        }
        /**
         * Maps positive floating point values to indexes corresponding to scale
         * @param value
         * @returns {number} index for provided value at the current scale
         */
        mapToIndex(value) {
          if (value < ieee754.MIN_VALUE) {
            return this._minNormalLowerBoundaryIndex();
          }
          const exp = ieee754.getNormalBase2(value);
          const correction = this._rightShift(ieee754.getSignificand(value) - 1, ieee754.SIGNIFICAND_WIDTH);
          return exp + correction >> this._shift;
        }
        /**
         * Returns the lower bucket boundary for the given index for scale
         *
         * @param index
         * @returns {number}
         */
        lowerBoundary(index) {
          const minIndex = this._minNormalLowerBoundaryIndex();
          if (index < minIndex) {
            throw new types_1.MappingError(`underflow: ${index} is < minimum lower boundary: ${minIndex}`);
          }
          const maxIndex = this._maxNormalLowerBoundaryIndex();
          if (index > maxIndex) {
            throw new types_1.MappingError(`overflow: ${index} is > maximum lower boundary: ${maxIndex}`);
          }
          return util.ldexp(1, index << this._shift);
        }
        /**
         * The scale used by this mapping
         * @returns {number}
         */
        get scale() {
          if (this._shift === 0) {
            return 0;
          }
          return -this._shift;
        }
        _minNormalLowerBoundaryIndex() {
          let index = ieee754.MIN_NORMAL_EXPONENT >> this._shift;
          if (this._shift < 2) {
            index--;
          }
          return index;
        }
        _maxNormalLowerBoundaryIndex() {
          return ieee754.MAX_NORMAL_EXPONENT >> this._shift;
        }
        _rightShift(value, shift) {
          return Math.floor(value * Math.pow(2, -shift));
        }
      };
      exports.ExponentMapping = ExponentMapping;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/mapping/LogarithmMapping.js
  var require_LogarithmMapping = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/mapping/LogarithmMapping.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LogarithmMapping = void 0;
      var ieee754 = require_ieee754();
      var util = require_util4();
      var types_1 = require_types13();
      var LogarithmMapping = class {
        constructor(scale) {
          this._scale = scale;
          this._scaleFactor = util.ldexp(Math.LOG2E, scale);
          this._inverseFactor = util.ldexp(Math.LN2, -scale);
        }
        /**
         * Maps positive floating point values to indexes corresponding to scale
         * @param value
         * @returns {number} index for provided value at the current scale
         */
        mapToIndex(value) {
          if (value <= ieee754.MIN_VALUE) {
            return this._minNormalLowerBoundaryIndex() - 1;
          }
          if (ieee754.getSignificand(value) === 0) {
            const exp = ieee754.getNormalBase2(value);
            return (exp << this._scale) - 1;
          }
          const index = Math.floor(Math.log(value) * this._scaleFactor);
          const maxIndex = this._maxNormalLowerBoundaryIndex();
          if (index >= maxIndex) {
            return maxIndex;
          }
          return index;
        }
        /**
         * Returns the lower bucket boundary for the given index for scale
         *
         * @param index
         * @returns {number}
         */
        lowerBoundary(index) {
          const maxIndex = this._maxNormalLowerBoundaryIndex();
          if (index >= maxIndex) {
            if (index === maxIndex) {
              return 2 * Math.exp((index - (1 << this._scale)) / this._scaleFactor);
            }
            throw new types_1.MappingError(`overflow: ${index} is > maximum lower boundary: ${maxIndex}`);
          }
          const minIndex = this._minNormalLowerBoundaryIndex();
          if (index <= minIndex) {
            if (index === minIndex) {
              return ieee754.MIN_VALUE;
            } else if (index === minIndex - 1) {
              return Math.exp((index + (1 << this._scale)) / this._scaleFactor) / 2;
            }
            throw new types_1.MappingError(`overflow: ${index} is < minimum lower boundary: ${minIndex}`);
          }
          return Math.exp(index * this._inverseFactor);
        }
        /**
         * The scale used by this mapping
         * @returns {number}
         */
        get scale() {
          return this._scale;
        }
        _minNormalLowerBoundaryIndex() {
          return ieee754.MIN_NORMAL_EXPONENT << this._scale;
        }
        _maxNormalLowerBoundaryIndex() {
          return (ieee754.MAX_NORMAL_EXPONENT + 1 << this._scale) - 1;
        }
      };
      exports.LogarithmMapping = LogarithmMapping;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/mapping/getMapping.js
  var require_getMapping = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/mapping/getMapping.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getMapping = void 0;
      var ExponentMapping_1 = require_ExponentMapping();
      var LogarithmMapping_1 = require_LogarithmMapping();
      var types_1 = require_types13();
      var MIN_SCALE = -10;
      var MAX_SCALE = 20;
      var PREBUILT_MAPPINGS = Array.from({ length: 31 }, (_, i) => {
        if (i > 10) {
          return new LogarithmMapping_1.LogarithmMapping(i - 10);
        }
        return new ExponentMapping_1.ExponentMapping(i - 10);
      });
      function getMapping(scale) {
        if (scale > MAX_SCALE || scale < MIN_SCALE) {
          throw new types_1.MappingError(`expected scale >= ${MIN_SCALE} && <= ${MAX_SCALE}, got: ${scale}`);
        }
        return PREBUILT_MAPPINGS[scale + 10];
      }
      exports.getMapping = getMapping;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/ExponentialHistogram.js
  var require_ExponentialHistogram = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/ExponentialHistogram.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ExponentialHistogramAggregator = exports.ExponentialHistogramAccumulation = void 0;
      var types_1 = require_types12();
      var MetricData_1 = require_MetricData();
      var api_1 = require_src();
      var InstrumentDescriptor_1 = require_InstrumentDescriptor();
      var Buckets_1 = require_Buckets();
      var getMapping_1 = require_getMapping();
      var util_1 = require_util4();
      var HighLow = class _HighLow {
        constructor(low, high) {
          this.low = low;
          this.high = high;
        }
        static combine(h1, h2) {
          return new _HighLow(Math.min(h1.low, h2.low), Math.max(h1.high, h2.high));
        }
      };
      var MAX_SCALE = 20;
      var DEFAULT_MAX_SIZE = 160;
      var MIN_MAX_SIZE = 2;
      var ExponentialHistogramAccumulation = class _ExponentialHistogramAccumulation {
        constructor(startTime = startTime, _maxSize = DEFAULT_MAX_SIZE, _recordMinMax = true, _sum = 0, _count = 0, _zeroCount = 0, _min = Number.POSITIVE_INFINITY, _max = Number.NEGATIVE_INFINITY, _positive = new Buckets_1.Buckets(), _negative = new Buckets_1.Buckets(), _mapping = (0, getMapping_1.getMapping)(MAX_SCALE)) {
          this.startTime = startTime;
          this._maxSize = _maxSize;
          this._recordMinMax = _recordMinMax;
          this._sum = _sum;
          this._count = _count;
          this._zeroCount = _zeroCount;
          this._min = _min;
          this._max = _max;
          this._positive = _positive;
          this._negative = _negative;
          this._mapping = _mapping;
          if (this._maxSize < MIN_MAX_SIZE) {
            api_1.diag.warn(`Exponential Histogram Max Size set to ${this._maxSize},                 changing to the minimum size of: ${MIN_MAX_SIZE}`);
            this._maxSize = MIN_MAX_SIZE;
          }
        }
        /**
         * record updates a histogram with a single count
         * @param {Number} value
         */
        record(value) {
          this.updateByIncrement(value, 1);
        }
        /**
         * Sets the start time for this accumulation
         * @param {HrTime} startTime
         */
        setStartTime(startTime) {
          this.startTime = startTime;
        }
        /**
         * Returns the datapoint representation of this accumulation
         * @param {HrTime} startTime
         */
        toPointValue() {
          return {
            hasMinMax: this._recordMinMax,
            min: this.min,
            max: this.max,
            sum: this.sum,
            positive: {
              offset: this.positive.offset,
              bucketCounts: this.positive.counts()
            },
            negative: {
              offset: this.negative.offset,
              bucketCounts: this.negative.counts()
            },
            count: this.count,
            scale: this.scale,
            zeroCount: this.zeroCount
          };
        }
        /**
         * @returns {Number} The sum of values recorded by this accumulation
         */
        get sum() {
          return this._sum;
        }
        /**
         * @returns {Number} The minimum value recorded by this accumulation
         */
        get min() {
          return this._min;
        }
        /**
         * @returns {Number} The maximum value recorded by this accumulation
         */
        get max() {
          return this._max;
        }
        /**
         * @returns {Number} The count of values recorded by this accumulation
         */
        get count() {
          return this._count;
        }
        /**
         * @returns {Number} The number of 0 values recorded by this accumulation
         */
        get zeroCount() {
          return this._zeroCount;
        }
        /**
         * @returns {Number} The scale used by thie accumulation
         */
        get scale() {
          if (this._count === this._zeroCount) {
            return 0;
          }
          return this._mapping.scale;
        }
        /**
         * positive holds the postive values
         * @returns {Buckets}
         */
        get positive() {
          return this._positive;
        }
        /**
         * negative holds the negative values by their absolute value
         * @returns {Buckets}
         */
        get negative() {
          return this._negative;
        }
        /**
         * uppdateByIncr supports updating a histogram with a non-negative
         * increment.
         * @param value
         * @param increment
         */
        updateByIncrement(value, increment) {
          if (value > this._max) {
            this._max = value;
          }
          if (value < this._min) {
            this._min = value;
          }
          this._count += increment;
          if (value === 0) {
            this._zeroCount += increment;
            return;
          }
          this._sum += value * increment;
          if (value > 0) {
            this._updateBuckets(this._positive, value, increment);
          } else {
            this._updateBuckets(this._negative, -value, increment);
          }
        }
        /**
         * merge combines data from previous value into self
         * @param {ExponentialHistogramAccumulation} previous
         */
        merge(previous) {
          if (this._count === 0) {
            this._min = previous.min;
            this._max = previous.max;
          } else if (previous.count !== 0) {
            if (previous.min < this.min) {
              this._min = previous.min;
            }
            if (previous.max > this.max) {
              this._max = previous.max;
            }
          }
          this.startTime = previous.startTime;
          this._sum += previous.sum;
          this._count += previous.count;
          this._zeroCount += previous.zeroCount;
          const minScale = this._minScale(previous);
          this._downscale(this.scale - minScale);
          this._mergeBuckets(this.positive, previous, previous.positive, minScale);
          this._mergeBuckets(this.negative, previous, previous.negative, minScale);
        }
        /**
         * diff substracts other from self
         * @param {ExponentialHistogramAccumulation} other
         */
        diff(other) {
          this._min = Infinity;
          this._max = -Infinity;
          this._sum -= other.sum;
          this._count -= other.count;
          this._zeroCount -= other.zeroCount;
          const minScale = this._minScale(other);
          this._downscale(this.scale - minScale);
          this._diffBuckets(this.positive, other, other.positive, minScale);
          this._diffBuckets(this.negative, other, other.negative, minScale);
        }
        /**
         * clone returns a deep copy of self
         * @returns {ExponentialHistogramAccumulation}
         */
        clone() {
          return new _ExponentialHistogramAccumulation(this.startTime, this._maxSize, this._recordMinMax, this._sum, this._count, this._zeroCount, this._min, this._max, this.positive.clone(), this.negative.clone(), this._mapping);
        }
        /**
         * _updateBuckets maps the incoming value to a bucket index for the current
         * scale. If the bucket index is outside of the range of the backing array,
         * it will rescale the backing array and update the mapping for the new scale.
         */
        _updateBuckets(buckets, value, increment) {
          let index = this._mapping.mapToIndex(value);
          let rescalingNeeded = false;
          let high = 0;
          let low = 0;
          if (buckets.length === 0) {
            buckets.indexStart = index;
            buckets.indexEnd = buckets.indexStart;
            buckets.indexBase = buckets.indexStart;
          } else if (index < buckets.indexStart && buckets.indexEnd - index >= this._maxSize) {
            rescalingNeeded = true;
            low = index;
            high = buckets.indexEnd;
          } else if (index > buckets.indexEnd && index - buckets.indexStart >= this._maxSize) {
            rescalingNeeded = true;
            low = buckets.indexStart;
            high = index;
          }
          if (rescalingNeeded) {
            const change = this._changeScale(high, low);
            this._downscale(change);
            index = this._mapping.mapToIndex(value);
          }
          this._incrementIndexBy(buckets, index, increment);
        }
        /**
         * _incrementIndexBy increments the count of the bucket specified by `index`.
         * If the index is outside of the range [buckets.indexStart, buckets.indexEnd]
         * the boundaries of the backing array will be adjusted and more buckets will
         * be added if needed.
         */
        _incrementIndexBy(buckets, index, increment) {
          if (increment === 0) {
            return;
          }
          if (index < buckets.indexStart) {
            const span = buckets.indexEnd - index;
            if (span >= buckets.backing.length) {
              this._grow(buckets, span + 1);
            }
            buckets.indexStart = index;
          } else if (index > buckets.indexEnd) {
            const span = index - buckets.indexStart;
            if (span >= buckets.backing.length) {
              this._grow(buckets, span + 1);
            }
            buckets.indexEnd = index;
          }
          let bucketIndex = index - buckets.indexBase;
          if (bucketIndex < 0) {
            bucketIndex += buckets.backing.length;
          }
          buckets.incrementBucket(bucketIndex, increment);
        }
        /**
         * grow resizes the backing array by doubling in size up to maxSize.
         * This extends the array with a bunch of zeros and copies the
         * existing counts to the same position.
         */
        _grow(buckets, needed) {
          const size = buckets.backing.length;
          const bias = buckets.indexBase - buckets.indexStart;
          const oldPositiveLimit = size - bias;
          let newSize = (0, util_1.nextGreaterSquare)(needed);
          if (newSize > this._maxSize) {
            newSize = this._maxSize;
          }
          const newPositiveLimit = newSize - bias;
          buckets.backing.growTo(newSize, oldPositiveLimit, newPositiveLimit);
        }
        /**
         * _changeScale computes how much downscaling is needed by shifting the
         * high and low values until they are separated by no more than size.
         */
        _changeScale(high, low) {
          let change = 0;
          while (high - low >= this._maxSize) {
            high >>= 1;
            low >>= 1;
            change++;
          }
          return change;
        }
        /**
         * _downscale subtracts `change` from the current mapping scale.
         */
        _downscale(change) {
          if (change === 0) {
            return;
          }
          if (change < 0) {
            throw new Error(`impossible change of scale: ${this.scale}`);
          }
          const newScale = this._mapping.scale - change;
          this._positive.downscale(change);
          this._negative.downscale(change);
          this._mapping = (0, getMapping_1.getMapping)(newScale);
        }
        /**
         * _minScale is used by diff and merge to compute an ideal combined scale
         */
        _minScale(other) {
          const minScale = Math.min(this.scale, other.scale);
          const highLowPos = HighLow.combine(this._highLowAtScale(this.positive, this.scale, minScale), this._highLowAtScale(other.positive, other.scale, minScale));
          const highLowNeg = HighLow.combine(this._highLowAtScale(this.negative, this.scale, minScale), this._highLowAtScale(other.negative, other.scale, minScale));
          return Math.min(minScale - this._changeScale(highLowPos.high, highLowPos.low), minScale - this._changeScale(highLowNeg.high, highLowNeg.low));
        }
        /**
         * _highLowAtScale is used by diff and merge to compute an ideal combined scale.
         */
        _highLowAtScale(buckets, currentScale, newScale) {
          if (buckets.length === 0) {
            return new HighLow(0, -1);
          }
          const shift = currentScale - newScale;
          return new HighLow(buckets.indexStart >> shift, buckets.indexEnd >> shift);
        }
        /**
         * _mergeBuckets translates index values from another histogram and
         * adds the values into the corresponding buckets of this histogram.
         */
        _mergeBuckets(ours, other, theirs, scale) {
          const theirOffset = theirs.offset;
          const theirChange = other.scale - scale;
          for (let i = 0; i < theirs.length; i++) {
            this._incrementIndexBy(ours, theirOffset + i >> theirChange, theirs.at(i));
          }
        }
        /**
         * _diffBuckets translates index values from another histogram and
         * subtracts the values in the corresponding buckets of this histogram.
         */
        _diffBuckets(ours, other, theirs, scale) {
          const theirOffset = theirs.offset;
          const theirChange = other.scale - scale;
          for (let i = 0; i < theirs.length; i++) {
            const ourIndex = theirOffset + i >> theirChange;
            let bucketIndex = ourIndex - ours.indexBase;
            if (bucketIndex < 0) {
              bucketIndex += ours.backing.length;
            }
            ours.decrementBucket(bucketIndex, theirs.at(i));
          }
          ours.trim();
        }
      };
      exports.ExponentialHistogramAccumulation = ExponentialHistogramAccumulation;
      var ExponentialHistogramAggregator = class {
        /**
         * @param _maxSize Maximum number of buckets for each of the positive
         *    and negative ranges, exclusive of the zero-bucket.
         * @param _recordMinMax If set to true, min and max will be recorded.
         *    Otherwise, min and max will not be recorded.
         */
        constructor(_maxSize, _recordMinMax) {
          this._maxSize = _maxSize;
          this._recordMinMax = _recordMinMax;
          this.kind = types_1.AggregatorKind.EXPONENTIAL_HISTOGRAM;
        }
        createAccumulation(startTime) {
          return new ExponentialHistogramAccumulation(startTime, this._maxSize, this._recordMinMax);
        }
        /**
         * Return the result of the merge of two exponential histogram accumulations.
         */
        merge(previous, delta) {
          const result = delta.clone();
          result.merge(previous);
          return result;
        }
        /**
         * Returns a new DELTA aggregation by comparing two cumulative measurements.
         */
        diff(previous, current) {
          const result = current.clone();
          result.diff(previous);
          return result;
        }
        toMetricData(descriptor, aggregationTemporality, accumulationByAttributes, endTime) {
          return {
            descriptor,
            aggregationTemporality,
            dataPointType: MetricData_1.DataPointType.EXPONENTIAL_HISTOGRAM,
            dataPoints: accumulationByAttributes.map(([attributes, accumulation]) => {
              const pointValue = accumulation.toPointValue();
              const allowsNegativeValues = descriptor.type === InstrumentDescriptor_1.InstrumentType.UP_DOWN_COUNTER || descriptor.type === InstrumentDescriptor_1.InstrumentType.OBSERVABLE_GAUGE || descriptor.type === InstrumentDescriptor_1.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER;
              return {
                attributes,
                startTime: accumulation.startTime,
                endTime,
                value: {
                  min: pointValue.hasMinMax ? pointValue.min : void 0,
                  max: pointValue.hasMinMax ? pointValue.max : void 0,
                  sum: !allowsNegativeValues ? pointValue.sum : void 0,
                  positive: {
                    offset: pointValue.positive.offset,
                    bucketCounts: pointValue.positive.bucketCounts
                  },
                  negative: {
                    offset: pointValue.negative.offset,
                    bucketCounts: pointValue.negative.bucketCounts
                  },
                  count: pointValue.count,
                  scale: pointValue.scale,
                  zeroCount: pointValue.zeroCount
                }
              };
            })
          };
        }
      };
      exports.ExponentialHistogramAggregator = ExponentialHistogramAggregator;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/LastValue.js
  var require_LastValue = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/LastValue.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.LastValueAggregator = exports.LastValueAccumulation = void 0;
      var types_1 = require_types12();
      var core_1 = require_src3();
      var MetricData_1 = require_MetricData();
      var LastValueAccumulation = class {
        constructor(startTime, _current = 0, sampleTime = [0, 0]) {
          this.startTime = startTime;
          this._current = _current;
          this.sampleTime = sampleTime;
        }
        record(value) {
          this._current = value;
          this.sampleTime = (0, core_1.millisToHrTime)(Date.now());
        }
        setStartTime(startTime) {
          this.startTime = startTime;
        }
        toPointValue() {
          return this._current;
        }
      };
      exports.LastValueAccumulation = LastValueAccumulation;
      var LastValueAggregator = class {
        constructor() {
          this.kind = types_1.AggregatorKind.LAST_VALUE;
        }
        createAccumulation(startTime) {
          return new LastValueAccumulation(startTime);
        }
        /**
         * Returns the result of the merge of the given accumulations.
         *
         * Return the newly captured (delta) accumulation for LastValueAggregator.
         */
        merge(previous, delta) {
          const latestAccumulation = (0, core_1.hrTimeToMicroseconds)(delta.sampleTime) >= (0, core_1.hrTimeToMicroseconds)(previous.sampleTime) ? delta : previous;
          return new LastValueAccumulation(previous.startTime, latestAccumulation.toPointValue(), latestAccumulation.sampleTime);
        }
        /**
         * Returns a new DELTA aggregation by comparing two cumulative measurements.
         *
         * A delta aggregation is not meaningful to LastValueAggregator, just return
         * the newly captured (delta) accumulation for LastValueAggregator.
         */
        diff(previous, current) {
          const latestAccumulation = (0, core_1.hrTimeToMicroseconds)(current.sampleTime) >= (0, core_1.hrTimeToMicroseconds)(previous.sampleTime) ? current : previous;
          return new LastValueAccumulation(current.startTime, latestAccumulation.toPointValue(), latestAccumulation.sampleTime);
        }
        toMetricData(descriptor, aggregationTemporality, accumulationByAttributes, endTime) {
          return {
            descriptor,
            aggregationTemporality,
            dataPointType: MetricData_1.DataPointType.GAUGE,
            dataPoints: accumulationByAttributes.map(([attributes, accumulation]) => {
              return {
                attributes,
                startTime: accumulation.startTime,
                endTime,
                value: accumulation.toPointValue()
              };
            })
          };
        }
      };
      exports.LastValueAggregator = LastValueAggregator;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Sum.js
  var require_Sum = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Sum.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SumAggregator = exports.SumAccumulation = void 0;
      var types_1 = require_types12();
      var MetricData_1 = require_MetricData();
      var SumAccumulation = class {
        constructor(startTime, monotonic, _current = 0, reset = false) {
          this.startTime = startTime;
          this.monotonic = monotonic;
          this._current = _current;
          this.reset = reset;
        }
        record(value) {
          if (this.monotonic && value < 0) {
            return;
          }
          this._current += value;
        }
        setStartTime(startTime) {
          this.startTime = startTime;
        }
        toPointValue() {
          return this._current;
        }
      };
      exports.SumAccumulation = SumAccumulation;
      var SumAggregator = class {
        constructor(monotonic) {
          this.monotonic = monotonic;
          this.kind = types_1.AggregatorKind.SUM;
        }
        createAccumulation(startTime) {
          return new SumAccumulation(startTime, this.monotonic);
        }
        /**
         * Returns the result of the merge of the given accumulations.
         */
        merge(previous, delta) {
          const prevPv = previous.toPointValue();
          const deltaPv = delta.toPointValue();
          if (delta.reset) {
            return new SumAccumulation(delta.startTime, this.monotonic, deltaPv, delta.reset);
          }
          return new SumAccumulation(previous.startTime, this.monotonic, prevPv + deltaPv);
        }
        /**
         * Returns a new DELTA aggregation by comparing two cumulative measurements.
         */
        diff(previous, current) {
          const prevPv = previous.toPointValue();
          const currPv = current.toPointValue();
          if (this.monotonic && prevPv > currPv) {
            return new SumAccumulation(current.startTime, this.monotonic, currPv, true);
          }
          return new SumAccumulation(current.startTime, this.monotonic, currPv - prevPv);
        }
        toMetricData(descriptor, aggregationTemporality, accumulationByAttributes, endTime) {
          return {
            descriptor,
            aggregationTemporality,
            dataPointType: MetricData_1.DataPointType.SUM,
            dataPoints: accumulationByAttributes.map(([attributes, accumulation]) => {
              return {
                attributes,
                startTime: accumulation.startTime,
                endTime,
                value: accumulation.toPointValue()
              };
            }),
            isMonotonic: this.monotonic
          };
        }
      };
      exports.SumAggregator = SumAggregator;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/index.js
  var require_aggregator = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_Drop(), exports);
      __exportStar(require_Histogram(), exports);
      __exportStar(require_ExponentialHistogram(), exports);
      __exportStar(require_LastValue(), exports);
      __exportStar(require_Sum(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/Aggregation.js
  var require_Aggregation = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/Aggregation.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DefaultAggregation = exports.ExponentialHistogramAggregation = exports.ExplicitBucketHistogramAggregation = exports.HistogramAggregation = exports.LastValueAggregation = exports.SumAggregation = exports.DropAggregation = exports.Aggregation = void 0;
      var api = require_src();
      var aggregator_1 = require_aggregator();
      var InstrumentDescriptor_1 = require_InstrumentDescriptor();
      var Aggregation = class {
        static Drop() {
          return DROP_AGGREGATION;
        }
        static Sum() {
          return SUM_AGGREGATION;
        }
        static LastValue() {
          return LAST_VALUE_AGGREGATION;
        }
        static Histogram() {
          return HISTOGRAM_AGGREGATION;
        }
        static ExponentialHistogram() {
          return EXPONENTIAL_HISTOGRAM_AGGREGATION;
        }
        static Default() {
          return DEFAULT_AGGREGATION;
        }
      };
      exports.Aggregation = Aggregation;
      var DropAggregation = class _DropAggregation extends Aggregation {
        createAggregator(_instrument) {
          return _DropAggregation.DEFAULT_INSTANCE;
        }
      };
      exports.DropAggregation = DropAggregation;
      DropAggregation.DEFAULT_INSTANCE = new aggregator_1.DropAggregator();
      var SumAggregation = class _SumAggregation extends Aggregation {
        createAggregator(instrument) {
          switch (instrument.type) {
            case InstrumentDescriptor_1.InstrumentType.COUNTER:
            case InstrumentDescriptor_1.InstrumentType.OBSERVABLE_COUNTER:
            case InstrumentDescriptor_1.InstrumentType.HISTOGRAM: {
              return _SumAggregation.MONOTONIC_INSTANCE;
            }
            default: {
              return _SumAggregation.NON_MONOTONIC_INSTANCE;
            }
          }
        }
      };
      exports.SumAggregation = SumAggregation;
      SumAggregation.MONOTONIC_INSTANCE = new aggregator_1.SumAggregator(true);
      SumAggregation.NON_MONOTONIC_INSTANCE = new aggregator_1.SumAggregator(false);
      var LastValueAggregation = class _LastValueAggregation extends Aggregation {
        createAggregator(_instrument) {
          return _LastValueAggregation.DEFAULT_INSTANCE;
        }
      };
      exports.LastValueAggregation = LastValueAggregation;
      LastValueAggregation.DEFAULT_INSTANCE = new aggregator_1.LastValueAggregator();
      var HistogramAggregation = class _HistogramAggregation extends Aggregation {
        createAggregator(_instrument) {
          return _HistogramAggregation.DEFAULT_INSTANCE;
        }
      };
      exports.HistogramAggregation = HistogramAggregation;
      HistogramAggregation.DEFAULT_INSTANCE = new aggregator_1.HistogramAggregator([0, 5, 10, 25, 50, 75, 100, 250, 500, 750, 1e3, 2500, 5e3, 7500, 1e4], true);
      var ExplicitBucketHistogramAggregation = class extends Aggregation {
        /**
         * @param boundaries the bucket boundaries of the histogram aggregation
         * @param _recordMinMax If set to true, min and max will be recorded. Otherwise, min and max will not be recorded.
         */
        constructor(boundaries, _recordMinMax = true) {
          super();
          this._recordMinMax = _recordMinMax;
          if (boundaries === void 0 || boundaries.length === 0) {
            throw new Error("HistogramAggregator should be created with boundaries.");
          }
          boundaries = boundaries.concat();
          boundaries = boundaries.sort((a, b) => a - b);
          const minusInfinityIndex = boundaries.lastIndexOf(-Infinity);
          let infinityIndex = boundaries.indexOf(Infinity);
          if (infinityIndex === -1) {
            infinityIndex = void 0;
          }
          this._boundaries = boundaries.slice(minusInfinityIndex + 1, infinityIndex);
        }
        createAggregator(_instrument) {
          return new aggregator_1.HistogramAggregator(this._boundaries, this._recordMinMax);
        }
      };
      exports.ExplicitBucketHistogramAggregation = ExplicitBucketHistogramAggregation;
      var ExponentialHistogramAggregation = class extends Aggregation {
        constructor(_maxSize = 160, _recordMinMax = true) {
          super();
          this._maxSize = _maxSize;
          this._recordMinMax = _recordMinMax;
        }
        createAggregator(_instrument) {
          return new aggregator_1.ExponentialHistogramAggregator(this._maxSize, this._recordMinMax);
        }
      };
      exports.ExponentialHistogramAggregation = ExponentialHistogramAggregation;
      var DefaultAggregation = class extends Aggregation {
        _resolve(instrument) {
          switch (instrument.type) {
            case InstrumentDescriptor_1.InstrumentType.COUNTER:
            case InstrumentDescriptor_1.InstrumentType.UP_DOWN_COUNTER:
            case InstrumentDescriptor_1.InstrumentType.OBSERVABLE_COUNTER:
            case InstrumentDescriptor_1.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER: {
              return SUM_AGGREGATION;
            }
            case InstrumentDescriptor_1.InstrumentType.OBSERVABLE_GAUGE: {
              return LAST_VALUE_AGGREGATION;
            }
            case InstrumentDescriptor_1.InstrumentType.HISTOGRAM: {
              if (instrument.advice.explicitBucketBoundaries) {
                return new ExplicitBucketHistogramAggregation(instrument.advice.explicitBucketBoundaries);
              }
              return HISTOGRAM_AGGREGATION;
            }
          }
          api.diag.warn(`Unable to recognize instrument type: ${instrument.type}`);
          return DROP_AGGREGATION;
        }
        createAggregator(instrument) {
          return this._resolve(instrument).createAggregator(instrument);
        }
      };
      exports.DefaultAggregation = DefaultAggregation;
      var DROP_AGGREGATION = new DropAggregation();
      var SUM_AGGREGATION = new SumAggregation();
      var LAST_VALUE_AGGREGATION = new LastValueAggregation();
      var HISTOGRAM_AGGREGATION = new HistogramAggregation();
      var EXPONENTIAL_HISTOGRAM_AGGREGATION = new ExponentialHistogramAggregation();
      var DEFAULT_AGGREGATION = new DefaultAggregation();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/AggregationSelector.js
  var require_AggregationSelector = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/AggregationSelector.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = exports.DEFAULT_AGGREGATION_SELECTOR = void 0;
      var Aggregation_1 = require_Aggregation();
      var AggregationTemporality_1 = require_AggregationTemporality();
      var DEFAULT_AGGREGATION_SELECTOR = (_instrumentType) => Aggregation_1.Aggregation.Default();
      exports.DEFAULT_AGGREGATION_SELECTOR = DEFAULT_AGGREGATION_SELECTOR;
      var DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = (_instrumentType) => AggregationTemporality_1.AggregationTemporality.CUMULATIVE;
      exports.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR = DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/MetricReader.js
  var require_MetricReader = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/MetricReader.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MetricReader = void 0;
      var api = require_src();
      var utils_1 = require_utils10();
      var AggregationSelector_1 = require_AggregationSelector();
      var MetricReader = class {
        constructor(options) {
          var _a, _b, _c;
          this._shutdown = false;
          this._aggregationSelector = (_a = options === null || options === void 0 ? void 0 : options.aggregationSelector) !== null && _a !== void 0 ? _a : AggregationSelector_1.DEFAULT_AGGREGATION_SELECTOR;
          this._aggregationTemporalitySelector = (_b = options === null || options === void 0 ? void 0 : options.aggregationTemporalitySelector) !== null && _b !== void 0 ? _b : AggregationSelector_1.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR;
          this._metricProducers = (_c = options === null || options === void 0 ? void 0 : options.metricProducers) !== null && _c !== void 0 ? _c : [];
        }
        /**
         * Set the {@link MetricProducer} used by this instance. **This should only be called by the
         * SDK and should be considered internal.**
         *
         * To add additional {@link MetricProducer}s to a {@link MetricReader}, pass them to the
         * constructor as {@link MetricReaderOptions.metricProducers}.
         *
         * @internal
         * @param metricProducer
         */
        setMetricProducer(metricProducer) {
          if (this._sdkMetricProducer) {
            throw new Error("MetricReader can not be bound to a MeterProvider again.");
          }
          this._sdkMetricProducer = metricProducer;
          this.onInitialized();
        }
        /**
         * Select the {@link Aggregation} for the given {@link InstrumentType} for this
         * reader.
         */
        selectAggregation(instrumentType) {
          return this._aggregationSelector(instrumentType);
        }
        /**
         * Select the {@link AggregationTemporality} for the given
         * {@link InstrumentType} for this reader.
         */
        selectAggregationTemporality(instrumentType) {
          return this._aggregationTemporalitySelector(instrumentType);
        }
        /**
         * Handle once the SDK has initialized this {@link MetricReader}
         * Overriding this method is optional.
         */
        onInitialized() {
        }
        /**
         * Collect all metrics from the associated {@link MetricProducer}
         */
        async collect(options) {
          if (this._sdkMetricProducer === void 0) {
            throw new Error("MetricReader is not bound to a MetricProducer");
          }
          if (this._shutdown) {
            throw new Error("MetricReader is shutdown");
          }
          const [sdkCollectionResults, ...additionalCollectionResults] = await Promise.all([
            this._sdkMetricProducer.collect({
              timeoutMillis: options === null || options === void 0 ? void 0 : options.timeoutMillis
            }),
            ...this._metricProducers.map((producer) => producer.collect({
              timeoutMillis: options === null || options === void 0 ? void 0 : options.timeoutMillis
            }))
          ]);
          const errors = sdkCollectionResults.errors.concat((0, utils_1.FlatMap)(additionalCollectionResults, (result) => result.errors));
          const resource = sdkCollectionResults.resourceMetrics.resource;
          const scopeMetrics = sdkCollectionResults.resourceMetrics.scopeMetrics.concat((0, utils_1.FlatMap)(additionalCollectionResults, (result) => result.resourceMetrics.scopeMetrics));
          return {
            resourceMetrics: {
              resource,
              scopeMetrics
            },
            errors
          };
        }
        /**
         * Shuts down the metric reader, the promise will reject after the optional timeout or resolve after completion.
         *
         * <p> NOTE: this operation will continue even after the promise rejects due to a timeout.
         * @param options options with timeout.
         */
        async shutdown(options) {
          if (this._shutdown) {
            api.diag.error("Cannot call shutdown twice.");
            return;
          }
          if ((options === null || options === void 0 ? void 0 : options.timeoutMillis) == null) {
            await this.onShutdown();
          } else {
            await (0, utils_1.callWithTimeout)(this.onShutdown(), options.timeoutMillis);
          }
          this._shutdown = true;
        }
        /**
         * Flushes metrics read by this reader, the promise will reject after the optional timeout or resolve after completion.
         *
         * <p> NOTE: this operation will continue even after the promise rejects due to a timeout.
         * @param options options with timeout.
         */
        async forceFlush(options) {
          if (this._shutdown) {
            api.diag.warn("Cannot forceFlush on already shutdown MetricReader.");
            return;
          }
          if ((options === null || options === void 0 ? void 0 : options.timeoutMillis) == null) {
            await this.onForceFlush();
            return;
          }
          await (0, utils_1.callWithTimeout)(this.onForceFlush(), options.timeoutMillis);
        }
      };
      exports.MetricReader = MetricReader;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/PeriodicExportingMetricReader.js
  var require_PeriodicExportingMetricReader = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/PeriodicExportingMetricReader.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PeriodicExportingMetricReader = void 0;
      var api = require_src();
      var core_1 = require_src3();
      var MetricReader_1 = require_MetricReader();
      var utils_1 = require_utils10();
      var api_1 = require_src();
      var PeriodicExportingMetricReader = class extends MetricReader_1.MetricReader {
        constructor(options) {
          var _a, _b, _c, _d;
          super({
            aggregationSelector: (_a = options.exporter.selectAggregation) === null || _a === void 0 ? void 0 : _a.bind(options.exporter),
            aggregationTemporalitySelector: (_b = options.exporter.selectAggregationTemporality) === null || _b === void 0 ? void 0 : _b.bind(options.exporter),
            metricProducers: options.metricProducers
          });
          if (options.exportIntervalMillis !== void 0 && options.exportIntervalMillis <= 0) {
            throw Error("exportIntervalMillis must be greater than 0");
          }
          if (options.exportTimeoutMillis !== void 0 && options.exportTimeoutMillis <= 0) {
            throw Error("exportTimeoutMillis must be greater than 0");
          }
          if (options.exportTimeoutMillis !== void 0 && options.exportIntervalMillis !== void 0 && options.exportIntervalMillis < options.exportTimeoutMillis) {
            throw Error("exportIntervalMillis must be greater than or equal to exportTimeoutMillis");
          }
          this._exportInterval = (_c = options.exportIntervalMillis) !== null && _c !== void 0 ? _c : 6e4;
          this._exportTimeout = (_d = options.exportTimeoutMillis) !== null && _d !== void 0 ? _d : 3e4;
          this._exporter = options.exporter;
        }
        async _runOnce() {
          try {
            await (0, utils_1.callWithTimeout)(this._doRun(), this._exportTimeout);
          } catch (err) {
            if (err instanceof utils_1.TimeoutError) {
              api.diag.error("Export took longer than %s milliseconds and timed out.", this._exportTimeout);
              return;
            }
            (0, core_1.globalErrorHandler)(err);
          }
        }
        async _doRun() {
          var _a, _b;
          const { resourceMetrics, errors } = await this.collect({
            timeoutMillis: this._exportTimeout
          });
          if (errors.length > 0) {
            api.diag.error("PeriodicExportingMetricReader: metrics collection errors", ...errors);
          }
          const doExport = async () => {
            const result = await core_1.internal._export(this._exporter, resourceMetrics);
            if (result.code !== core_1.ExportResultCode.SUCCESS) {
              throw new Error(`PeriodicExportingMetricReader: metrics export failed (error ${result.error})`);
            }
          };
          if (resourceMetrics.resource.asyncAttributesPending) {
            (_b = (_a = resourceMetrics.resource).waitForAsyncAttributes) === null || _b === void 0 ? void 0 : _b.call(_a).then(doExport, (err) => api_1.diag.debug("Error while resolving async portion of resource: ", err));
          } else {
            await doExport();
          }
        }
        onInitialized() {
          this._interval = setInterval(() => {
            void this._runOnce();
          }, this._exportInterval);
          (0, core_1.unrefTimer)(this._interval);
        }
        async onForceFlush() {
          await this._runOnce();
          await this._exporter.forceFlush();
        }
        async onShutdown() {
          if (this._interval) {
            clearInterval(this._interval);
          }
          await this._exporter.shutdown();
        }
      };
      exports.PeriodicExportingMetricReader = PeriodicExportingMetricReader;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/InMemoryMetricExporter.js
  var require_InMemoryMetricExporter = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/InMemoryMetricExporter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InMemoryMetricExporter = void 0;
      var core_1 = require_src3();
      var InMemoryMetricExporter = class {
        constructor(aggregationTemporality) {
          this._shutdown = false;
          this._metrics = [];
          this._aggregationTemporality = aggregationTemporality;
        }
        /**
         * @inheritedDoc
         */
        export(metrics, resultCallback) {
          if (this._shutdown) {
            setTimeout(() => resultCallback({ code: core_1.ExportResultCode.FAILED }), 0);
            return;
          }
          this._metrics.push(metrics);
          setTimeout(() => resultCallback({ code: core_1.ExportResultCode.SUCCESS }), 0);
        }
        /**
         * Returns all the collected resource metrics
         * @returns ResourceMetrics[]
         */
        getMetrics() {
          return this._metrics;
        }
        forceFlush() {
          return Promise.resolve();
        }
        reset() {
          this._metrics = [];
        }
        selectAggregationTemporality(_instrumentType) {
          return this._aggregationTemporality;
        }
        shutdown() {
          this._shutdown = true;
          return Promise.resolve();
        }
      };
      exports.InMemoryMetricExporter = InMemoryMetricExporter;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/ConsoleMetricExporter.js
  var require_ConsoleMetricExporter = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/export/ConsoleMetricExporter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ConsoleMetricExporter = void 0;
      var core_1 = require_src3();
      var AggregationSelector_1 = require_AggregationSelector();
      var ConsoleMetricExporter = class _ConsoleMetricExporter {
        constructor(options) {
          var _a;
          this._shutdown = false;
          this._temporalitySelector = (_a = options === null || options === void 0 ? void 0 : options.temporalitySelector) !== null && _a !== void 0 ? _a : AggregationSelector_1.DEFAULT_AGGREGATION_TEMPORALITY_SELECTOR;
        }
        export(metrics, resultCallback) {
          if (this._shutdown) {
            setImmediate(resultCallback, { code: core_1.ExportResultCode.FAILED });
            return;
          }
          return _ConsoleMetricExporter._sendMetrics(metrics, resultCallback);
        }
        forceFlush() {
          return Promise.resolve();
        }
        selectAggregationTemporality(_instrumentType) {
          return this._temporalitySelector(_instrumentType);
        }
        shutdown() {
          this._shutdown = true;
          return Promise.resolve();
        }
        static _sendMetrics(metrics, done) {
          for (const scopeMetrics of metrics.scopeMetrics) {
            for (const metric of scopeMetrics.metrics) {
              console.dir({
                descriptor: metric.descriptor,
                dataPointType: metric.dataPointType,
                dataPoints: metric.dataPoints
              });
            }
          }
          done({ code: core_1.ExportResultCode.SUCCESS });
        }
      };
      exports.ConsoleMetricExporter = ConsoleMetricExporter;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/ViewRegistry.js
  var require_ViewRegistry = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/ViewRegistry.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ViewRegistry = void 0;
      var ViewRegistry = class {
        constructor() {
          this._registeredViews = [];
        }
        addView(view) {
          this._registeredViews.push(view);
        }
        findViews(instrument, meter) {
          const views = this._registeredViews.filter((registeredView) => {
            return this._matchInstrument(registeredView.instrumentSelector, instrument) && this._matchMeter(registeredView.meterSelector, meter);
          });
          return views;
        }
        _matchInstrument(selector, instrument) {
          return (selector.getType() === void 0 || instrument.type === selector.getType()) && selector.getNameFilter().match(instrument.name) && selector.getUnitFilter().match(instrument.unit);
        }
        _matchMeter(selector, meter) {
          return selector.getNameFilter().match(meter.name) && (meter.version === void 0 || selector.getVersionFilter().match(meter.version)) && (meter.schemaUrl === void 0 || selector.getSchemaUrlFilter().match(meter.schemaUrl));
        }
      };
      exports.ViewRegistry = ViewRegistry;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/Instruments.js
  var require_Instruments = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/Instruments.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isObservableInstrument = exports.ObservableUpDownCounterInstrument = exports.ObservableGaugeInstrument = exports.ObservableCounterInstrument = exports.ObservableInstrument = exports.HistogramInstrument = exports.CounterInstrument = exports.UpDownCounterInstrument = exports.SyncInstrument = void 0;
      var api_1 = require_src();
      var core_1 = require_src3();
      var SyncInstrument = class {
        constructor(_writableMetricStorage, _descriptor) {
          this._writableMetricStorage = _writableMetricStorage;
          this._descriptor = _descriptor;
        }
        _record(value, attributes = {}, context2 = api_1.context.active()) {
          if (typeof value !== "number") {
            api_1.diag.warn(`non-number value provided to metric ${this._descriptor.name}: ${value}`);
            return;
          }
          if (this._descriptor.valueType === api_1.ValueType.INT && !Number.isInteger(value)) {
            api_1.diag.warn(`INT value type cannot accept a floating-point value for ${this._descriptor.name}, ignoring the fractional digits.`);
            value = Math.trunc(value);
            if (!Number.isInteger(value)) {
              return;
            }
          }
          this._writableMetricStorage.record(value, attributes, context2, (0, core_1.millisToHrTime)(Date.now()));
        }
      };
      exports.SyncInstrument = SyncInstrument;
      var UpDownCounterInstrument = class extends SyncInstrument {
        /**
         * Increment value of counter by the input. Inputs may be negative.
         */
        add(value, attributes, ctx) {
          this._record(value, attributes, ctx);
        }
      };
      exports.UpDownCounterInstrument = UpDownCounterInstrument;
      var CounterInstrument = class extends SyncInstrument {
        /**
         * Increment value of counter by the input. Inputs may not be negative.
         */
        add(value, attributes, ctx) {
          if (value < 0) {
            api_1.diag.warn(`negative value provided to counter ${this._descriptor.name}: ${value}`);
            return;
          }
          this._record(value, attributes, ctx);
        }
      };
      exports.CounterInstrument = CounterInstrument;
      var HistogramInstrument = class extends SyncInstrument {
        /**
         * Records a measurement. Value of the measurement must not be negative.
         */
        record(value, attributes, ctx) {
          if (value < 0) {
            api_1.diag.warn(`negative value provided to histogram ${this._descriptor.name}: ${value}`);
            return;
          }
          this._record(value, attributes, ctx);
        }
      };
      exports.HistogramInstrument = HistogramInstrument;
      var ObservableInstrument = class {
        constructor(descriptor, metricStorages, _observableRegistry) {
          this._observableRegistry = _observableRegistry;
          this._descriptor = descriptor;
          this._metricStorages = metricStorages;
        }
        /**
         * @see {Observable.addCallback}
         */
        addCallback(callback) {
          this._observableRegistry.addCallback(callback, this);
        }
        /**
         * @see {Observable.removeCallback}
         */
        removeCallback(callback) {
          this._observableRegistry.removeCallback(callback, this);
        }
      };
      exports.ObservableInstrument = ObservableInstrument;
      var ObservableCounterInstrument = class extends ObservableInstrument {
      };
      exports.ObservableCounterInstrument = ObservableCounterInstrument;
      var ObservableGaugeInstrument = class extends ObservableInstrument {
      };
      exports.ObservableGaugeInstrument = ObservableGaugeInstrument;
      var ObservableUpDownCounterInstrument = class extends ObservableInstrument {
      };
      exports.ObservableUpDownCounterInstrument = ObservableUpDownCounterInstrument;
      function isObservableInstrument(it) {
        return it instanceof ObservableInstrument;
      }
      exports.isObservableInstrument = isObservableInstrument;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/Meter.js
  var require_Meter = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/Meter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Meter = void 0;
      var InstrumentDescriptor_1 = require_InstrumentDescriptor();
      var Instruments_1 = require_Instruments();
      var Meter = class {
        constructor(_meterSharedState) {
          this._meterSharedState = _meterSharedState;
        }
        /**
         * Create a {@link Histogram} instrument.
         */
        createHistogram(name, options) {
          const descriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(name, InstrumentDescriptor_1.InstrumentType.HISTOGRAM, options);
          const storage = this._meterSharedState.registerMetricStorage(descriptor);
          return new Instruments_1.HistogramInstrument(storage, descriptor);
        }
        /**
         * Create a {@link Counter} instrument.
         */
        createCounter(name, options) {
          const descriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(name, InstrumentDescriptor_1.InstrumentType.COUNTER, options);
          const storage = this._meterSharedState.registerMetricStorage(descriptor);
          return new Instruments_1.CounterInstrument(storage, descriptor);
        }
        /**
         * Create a {@link UpDownCounter} instrument.
         */
        createUpDownCounter(name, options) {
          const descriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(name, InstrumentDescriptor_1.InstrumentType.UP_DOWN_COUNTER, options);
          const storage = this._meterSharedState.registerMetricStorage(descriptor);
          return new Instruments_1.UpDownCounterInstrument(storage, descriptor);
        }
        /**
         * Create a {@link ObservableGauge} instrument.
         */
        createObservableGauge(name, options) {
          const descriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(name, InstrumentDescriptor_1.InstrumentType.OBSERVABLE_GAUGE, options);
          const storages = this._meterSharedState.registerAsyncMetricStorage(descriptor);
          return new Instruments_1.ObservableGaugeInstrument(descriptor, storages, this._meterSharedState.observableRegistry);
        }
        /**
         * Create a {@link ObservableCounter} instrument.
         */
        createObservableCounter(name, options) {
          const descriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(name, InstrumentDescriptor_1.InstrumentType.OBSERVABLE_COUNTER, options);
          const storages = this._meterSharedState.registerAsyncMetricStorage(descriptor);
          return new Instruments_1.ObservableCounterInstrument(descriptor, storages, this._meterSharedState.observableRegistry);
        }
        /**
         * Create a {@link ObservableUpDownCounter} instrument.
         */
        createObservableUpDownCounter(name, options) {
          const descriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(name, InstrumentDescriptor_1.InstrumentType.OBSERVABLE_UP_DOWN_COUNTER, options);
          const storages = this._meterSharedState.registerAsyncMetricStorage(descriptor);
          return new Instruments_1.ObservableUpDownCounterInstrument(descriptor, storages, this._meterSharedState.observableRegistry);
        }
        /**
         * @see {@link Meter.addBatchObservableCallback}
         */
        addBatchObservableCallback(callback, observables) {
          this._meterSharedState.observableRegistry.addBatchCallback(callback, observables);
        }
        /**
         * @see {@link Meter.removeBatchObservableCallback}
         */
        removeBatchObservableCallback(callback, observables) {
          this._meterSharedState.observableRegistry.removeBatchCallback(callback, observables);
        }
      };
      exports.Meter = Meter;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/MetricStorage.js
  var require_MetricStorage = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/MetricStorage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MetricStorage = void 0;
      var InstrumentDescriptor_1 = require_InstrumentDescriptor();
      var MetricStorage = class {
        constructor(_instrumentDescriptor) {
          this._instrumentDescriptor = _instrumentDescriptor;
        }
        getInstrumentDescriptor() {
          return this._instrumentDescriptor;
        }
        updateDescription(description) {
          this._instrumentDescriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptor)(this._instrumentDescriptor.name, this._instrumentDescriptor.type, {
            description,
            valueType: this._instrumentDescriptor.valueType,
            unit: this._instrumentDescriptor.unit,
            advice: this._instrumentDescriptor.advice
          });
        }
      };
      exports.MetricStorage = MetricStorage;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/HashMap.js
  var require_HashMap = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/HashMap.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AttributeHashMap = exports.HashMap = void 0;
      var utils_1 = require_utils10();
      var HashMap = class {
        constructor(_hash) {
          this._hash = _hash;
          this._valueMap = /* @__PURE__ */ new Map();
          this._keyMap = /* @__PURE__ */ new Map();
        }
        get(key, hashCode) {
          hashCode !== null && hashCode !== void 0 ? hashCode : hashCode = this._hash(key);
          return this._valueMap.get(hashCode);
        }
        getOrDefault(key, defaultFactory) {
          const hash = this._hash(key);
          if (this._valueMap.has(hash)) {
            return this._valueMap.get(hash);
          }
          const val = defaultFactory();
          if (!this._keyMap.has(hash)) {
            this._keyMap.set(hash, key);
          }
          this._valueMap.set(hash, val);
          return val;
        }
        set(key, value, hashCode) {
          hashCode !== null && hashCode !== void 0 ? hashCode : hashCode = this._hash(key);
          if (!this._keyMap.has(hashCode)) {
            this._keyMap.set(hashCode, key);
          }
          this._valueMap.set(hashCode, value);
        }
        has(key, hashCode) {
          hashCode !== null && hashCode !== void 0 ? hashCode : hashCode = this._hash(key);
          return this._valueMap.has(hashCode);
        }
        *keys() {
          const keyIterator = this._keyMap.entries();
          let next = keyIterator.next();
          while (next.done !== true) {
            yield [next.value[1], next.value[0]];
            next = keyIterator.next();
          }
        }
        *entries() {
          const valueIterator = this._valueMap.entries();
          let next = valueIterator.next();
          while (next.done !== true) {
            yield [this._keyMap.get(next.value[0]), next.value[1], next.value[0]];
            next = valueIterator.next();
          }
        }
        get size() {
          return this._valueMap.size;
        }
      };
      exports.HashMap = HashMap;
      var AttributeHashMap = class extends HashMap {
        constructor() {
          super(utils_1.hashAttributes);
        }
      };
      exports.AttributeHashMap = AttributeHashMap;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/DeltaMetricProcessor.js
  var require_DeltaMetricProcessor = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/DeltaMetricProcessor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DeltaMetricProcessor = void 0;
      var HashMap_1 = require_HashMap();
      var DeltaMetricProcessor = class {
        constructor(_aggregator) {
          this._aggregator = _aggregator;
          this._activeCollectionStorage = new HashMap_1.AttributeHashMap();
          this._cumulativeMemoStorage = new HashMap_1.AttributeHashMap();
        }
        record(value, attributes, _context, collectionTime) {
          const accumulation = this._activeCollectionStorage.getOrDefault(attributes, () => this._aggregator.createAccumulation(collectionTime));
          accumulation === null || accumulation === void 0 ? void 0 : accumulation.record(value);
        }
        batchCumulate(measurements, collectionTime) {
          Array.from(measurements.entries()).forEach(([attributes, value, hashCode]) => {
            const accumulation = this._aggregator.createAccumulation(collectionTime);
            accumulation === null || accumulation === void 0 ? void 0 : accumulation.record(value);
            let delta = accumulation;
            if (this._cumulativeMemoStorage.has(attributes, hashCode)) {
              const previous = this._cumulativeMemoStorage.get(attributes, hashCode);
              delta = this._aggregator.diff(previous, accumulation);
            }
            if (this._activeCollectionStorage.has(attributes, hashCode)) {
              const active = this._activeCollectionStorage.get(attributes, hashCode);
              delta = this._aggregator.merge(active, delta);
            }
            this._cumulativeMemoStorage.set(attributes, accumulation, hashCode);
            this._activeCollectionStorage.set(attributes, delta, hashCode);
          });
        }
        /**
         * Returns a collection of delta metrics. Start time is the when first
         * time event collected.
         */
        collect() {
          const unreportedDelta = this._activeCollectionStorage;
          this._activeCollectionStorage = new HashMap_1.AttributeHashMap();
          return unreportedDelta;
        }
      };
      exports.DeltaMetricProcessor = DeltaMetricProcessor;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/TemporalMetricProcessor.js
  var require_TemporalMetricProcessor = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/TemporalMetricProcessor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TemporalMetricProcessor = void 0;
      var AggregationTemporality_1 = require_AggregationTemporality();
      var HashMap_1 = require_HashMap();
      var TemporalMetricProcessor = class _TemporalMetricProcessor {
        constructor(_aggregator, collectorHandles) {
          this._aggregator = _aggregator;
          this._unreportedAccumulations = /* @__PURE__ */ new Map();
          this._reportHistory = /* @__PURE__ */ new Map();
          collectorHandles.forEach((handle) => {
            this._unreportedAccumulations.set(handle, []);
          });
        }
        /**
         * Builds the {@link MetricData} streams to report against a specific MetricCollector.
         * @param collector The information of the MetricCollector.
         * @param collectors The registered collectors.
         * @param instrumentDescriptor The instrumentation descriptor that these metrics generated with.
         * @param currentAccumulations The current accumulation of metric data from instruments.
         * @param collectionTime The current collection timestamp.
         * @returns The {@link MetricData} points or `null`.
         */
        buildMetrics(collector, instrumentDescriptor, currentAccumulations, collectionTime) {
          this._stashAccumulations(currentAccumulations);
          const unreportedAccumulations = this._getMergedUnreportedAccumulations(collector);
          let result = unreportedAccumulations;
          let aggregationTemporality;
          if (this._reportHistory.has(collector)) {
            const last = this._reportHistory.get(collector);
            const lastCollectionTime = last.collectionTime;
            aggregationTemporality = last.aggregationTemporality;
            if (aggregationTemporality === AggregationTemporality_1.AggregationTemporality.CUMULATIVE) {
              result = _TemporalMetricProcessor.merge(last.accumulations, unreportedAccumulations, this._aggregator);
            } else {
              result = _TemporalMetricProcessor.calibrateStartTime(last.accumulations, unreportedAccumulations, lastCollectionTime);
            }
          } else {
            aggregationTemporality = collector.selectAggregationTemporality(instrumentDescriptor.type);
          }
          this._reportHistory.set(collector, {
            accumulations: result,
            collectionTime,
            aggregationTemporality
          });
          const accumulationRecords = AttributesMapToAccumulationRecords(result);
          if (accumulationRecords.length === 0) {
            return void 0;
          }
          return this._aggregator.toMetricData(
            instrumentDescriptor,
            aggregationTemporality,
            accumulationRecords,
            /* endTime */
            collectionTime
          );
        }
        _stashAccumulations(currentAccumulation) {
          const registeredCollectors = this._unreportedAccumulations.keys();
          for (const collector of registeredCollectors) {
            let stash = this._unreportedAccumulations.get(collector);
            if (stash === void 0) {
              stash = [];
              this._unreportedAccumulations.set(collector, stash);
            }
            stash.push(currentAccumulation);
          }
        }
        _getMergedUnreportedAccumulations(collector) {
          let result = new HashMap_1.AttributeHashMap();
          const unreportedList = this._unreportedAccumulations.get(collector);
          this._unreportedAccumulations.set(collector, []);
          if (unreportedList === void 0) {
            return result;
          }
          for (const it of unreportedList) {
            result = _TemporalMetricProcessor.merge(result, it, this._aggregator);
          }
          return result;
        }
        static merge(last, current, aggregator) {
          const result = last;
          const iterator = current.entries();
          let next = iterator.next();
          while (next.done !== true) {
            const [key, record, hash] = next.value;
            if (last.has(key, hash)) {
              const lastAccumulation = last.get(key, hash);
              const accumulation = aggregator.merge(lastAccumulation, record);
              result.set(key, accumulation, hash);
            } else {
              result.set(key, record, hash);
            }
            next = iterator.next();
          }
          return result;
        }
        /**
         * Calibrate the reported metric streams' startTime to lastCollectionTime. Leaves
         * the new stream to be the initial observation time unchanged.
         */
        static calibrateStartTime(last, current, lastCollectionTime) {
          for (const [key, hash] of last.keys()) {
            const currentAccumulation = current.get(key, hash);
            currentAccumulation === null || currentAccumulation === void 0 ? void 0 : currentAccumulation.setStartTime(lastCollectionTime);
          }
          return current;
        }
      };
      exports.TemporalMetricProcessor = TemporalMetricProcessor;
      function AttributesMapToAccumulationRecords(map2) {
        return Array.from(map2.entries());
      }
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/AsyncMetricStorage.js
  var require_AsyncMetricStorage = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/AsyncMetricStorage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.AsyncMetricStorage = void 0;
      var MetricStorage_1 = require_MetricStorage();
      var DeltaMetricProcessor_1 = require_DeltaMetricProcessor();
      var TemporalMetricProcessor_1 = require_TemporalMetricProcessor();
      var HashMap_1 = require_HashMap();
      var AsyncMetricStorage = class extends MetricStorage_1.MetricStorage {
        constructor(_instrumentDescriptor, aggregator, _attributesProcessor, collectorHandles) {
          super(_instrumentDescriptor);
          this._attributesProcessor = _attributesProcessor;
          this._deltaMetricStorage = new DeltaMetricProcessor_1.DeltaMetricProcessor(aggregator);
          this._temporalMetricStorage = new TemporalMetricProcessor_1.TemporalMetricProcessor(aggregator, collectorHandles);
        }
        record(measurements, observationTime) {
          const processed = new HashMap_1.AttributeHashMap();
          Array.from(measurements.entries()).forEach(([attributes, value]) => {
            processed.set(this._attributesProcessor.process(attributes), value);
          });
          this._deltaMetricStorage.batchCumulate(processed, observationTime);
        }
        /**
         * Collects the metrics from this storage. The ObservableCallback is invoked
         * during the collection.
         *
         * Note: This is a stateful operation and may reset any interval-related
         * state for the MetricCollector.
         */
        collect(collector, collectionTime) {
          const accumulations = this._deltaMetricStorage.collect();
          return this._temporalMetricStorage.buildMetrics(collector, this._instrumentDescriptor, accumulations, collectionTime);
        }
      };
      exports.AsyncMetricStorage = AsyncMetricStorage;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/RegistrationConflicts.js
  var require_RegistrationConflicts = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/RegistrationConflicts.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getConflictResolutionRecipe = exports.getDescriptionResolutionRecipe = exports.getTypeConflictResolutionRecipe = exports.getUnitConflictResolutionRecipe = exports.getValueTypeConflictResolutionRecipe = exports.getIncompatibilityDetails = void 0;
      function getIncompatibilityDetails(existing, otherDescriptor) {
        let incompatibility = "";
        if (existing.unit !== otherDescriptor.unit) {
          incompatibility += `	- Unit '${existing.unit}' does not match '${otherDescriptor.unit}'
`;
        }
        if (existing.type !== otherDescriptor.type) {
          incompatibility += `	- Type '${existing.type}' does not match '${otherDescriptor.type}'
`;
        }
        if (existing.valueType !== otherDescriptor.valueType) {
          incompatibility += `	- Value Type '${existing.valueType}' does not match '${otherDescriptor.valueType}'
`;
        }
        if (existing.description !== otherDescriptor.description) {
          incompatibility += `	- Description '${existing.description}' does not match '${otherDescriptor.description}'
`;
        }
        return incompatibility;
      }
      exports.getIncompatibilityDetails = getIncompatibilityDetails;
      function getValueTypeConflictResolutionRecipe(existing, otherDescriptor) {
        return `	- use valueType '${existing.valueType}' on instrument creation or use an instrument name other than '${otherDescriptor.name}'`;
      }
      exports.getValueTypeConflictResolutionRecipe = getValueTypeConflictResolutionRecipe;
      function getUnitConflictResolutionRecipe(existing, otherDescriptor) {
        return `	- use unit '${existing.unit}' on instrument creation or use an instrument name other than '${otherDescriptor.name}'`;
      }
      exports.getUnitConflictResolutionRecipe = getUnitConflictResolutionRecipe;
      function getTypeConflictResolutionRecipe(existing, otherDescriptor) {
        const selector = {
          name: otherDescriptor.name,
          type: otherDescriptor.type,
          unit: otherDescriptor.unit
        };
        const selectorString = JSON.stringify(selector);
        return `	- create a new view with a name other than '${existing.name}' and InstrumentSelector '${selectorString}'`;
      }
      exports.getTypeConflictResolutionRecipe = getTypeConflictResolutionRecipe;
      function getDescriptionResolutionRecipe(existing, otherDescriptor) {
        const selector = {
          name: otherDescriptor.name,
          type: otherDescriptor.type,
          unit: otherDescriptor.unit
        };
        const selectorString = JSON.stringify(selector);
        return `	- create a new view with a name other than '${existing.name}' and InstrumentSelector '${selectorString}'
    	- OR - create a new view with the name ${existing.name} and description '${existing.description}' and InstrumentSelector ${selectorString}
    	- OR - create a new view with the name ${otherDescriptor.name} and description '${existing.description}' and InstrumentSelector ${selectorString}`;
      }
      exports.getDescriptionResolutionRecipe = getDescriptionResolutionRecipe;
      function getConflictResolutionRecipe(existing, otherDescriptor) {
        if (existing.valueType !== otherDescriptor.valueType) {
          return getValueTypeConflictResolutionRecipe(existing, otherDescriptor);
        }
        if (existing.unit !== otherDescriptor.unit) {
          return getUnitConflictResolutionRecipe(existing, otherDescriptor);
        }
        if (existing.type !== otherDescriptor.type) {
          return getTypeConflictResolutionRecipe(existing, otherDescriptor);
        }
        if (existing.description !== otherDescriptor.description) {
          return getDescriptionResolutionRecipe(existing, otherDescriptor);
        }
        return "";
      }
      exports.getConflictResolutionRecipe = getConflictResolutionRecipe;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/MetricStorageRegistry.js
  var require_MetricStorageRegistry = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/MetricStorageRegistry.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MetricStorageRegistry = void 0;
      var InstrumentDescriptor_1 = require_InstrumentDescriptor();
      var api = require_src();
      var RegistrationConflicts_1 = require_RegistrationConflicts();
      var MetricStorageRegistry = class _MetricStorageRegistry {
        constructor() {
          this._sharedRegistry = /* @__PURE__ */ new Map();
          this._perCollectorRegistry = /* @__PURE__ */ new Map();
        }
        static create() {
          return new _MetricStorageRegistry();
        }
        getStorages(collector) {
          let storages = [];
          for (const metricStorages of this._sharedRegistry.values()) {
            storages = storages.concat(metricStorages);
          }
          const perCollectorStorages = this._perCollectorRegistry.get(collector);
          if (perCollectorStorages != null) {
            for (const metricStorages of perCollectorStorages.values()) {
              storages = storages.concat(metricStorages);
            }
          }
          return storages;
        }
        register(storage) {
          this._registerStorage(storage, this._sharedRegistry);
        }
        registerForCollector(collector, storage) {
          let storageMap = this._perCollectorRegistry.get(collector);
          if (storageMap == null) {
            storageMap = /* @__PURE__ */ new Map();
            this._perCollectorRegistry.set(collector, storageMap);
          }
          this._registerStorage(storage, storageMap);
        }
        findOrUpdateCompatibleStorage(expectedDescriptor) {
          const storages = this._sharedRegistry.get(expectedDescriptor.name);
          if (storages === void 0) {
            return null;
          }
          return this._findOrUpdateCompatibleStorage(expectedDescriptor, storages);
        }
        findOrUpdateCompatibleCollectorStorage(collector, expectedDescriptor) {
          const storageMap = this._perCollectorRegistry.get(collector);
          if (storageMap === void 0) {
            return null;
          }
          const storages = storageMap.get(expectedDescriptor.name);
          if (storages === void 0) {
            return null;
          }
          return this._findOrUpdateCompatibleStorage(expectedDescriptor, storages);
        }
        _registerStorage(storage, storageMap) {
          const descriptor = storage.getInstrumentDescriptor();
          const storages = storageMap.get(descriptor.name);
          if (storages === void 0) {
            storageMap.set(descriptor.name, [storage]);
            return;
          }
          storages.push(storage);
        }
        _findOrUpdateCompatibleStorage(expectedDescriptor, existingStorages) {
          let compatibleStorage = null;
          for (const existingStorage of existingStorages) {
            const existingDescriptor = existingStorage.getInstrumentDescriptor();
            if ((0, InstrumentDescriptor_1.isDescriptorCompatibleWith)(existingDescriptor, expectedDescriptor)) {
              if (existingDescriptor.description !== expectedDescriptor.description) {
                if (expectedDescriptor.description.length > existingDescriptor.description.length) {
                  existingStorage.updateDescription(expectedDescriptor.description);
                }
                api.diag.warn("A view or instrument with the name ", expectedDescriptor.name, " has already been registered, but has a different description and is incompatible with another registered view.\n", "Details:\n", (0, RegistrationConflicts_1.getIncompatibilityDetails)(existingDescriptor, expectedDescriptor), "The longer description will be used.\nTo resolve the conflict:", (0, RegistrationConflicts_1.getConflictResolutionRecipe)(existingDescriptor, expectedDescriptor));
              }
              compatibleStorage = existingStorage;
            } else {
              api.diag.warn("A view or instrument with the name ", expectedDescriptor.name, " has already been registered and is incompatible with another registered view.\n", "Details:\n", (0, RegistrationConflicts_1.getIncompatibilityDetails)(existingDescriptor, expectedDescriptor), "To resolve the conflict:\n", (0, RegistrationConflicts_1.getConflictResolutionRecipe)(existingDescriptor, expectedDescriptor));
            }
          }
          return compatibleStorage;
        }
      };
      exports.MetricStorageRegistry = MetricStorageRegistry;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/MultiWritableMetricStorage.js
  var require_MultiWritableMetricStorage = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/MultiWritableMetricStorage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MultiMetricStorage = void 0;
      var MultiMetricStorage = class {
        constructor(_backingStorages) {
          this._backingStorages = _backingStorages;
        }
        record(value, attributes, context2, recordTime) {
          this._backingStorages.forEach((it) => {
            it.record(value, attributes, context2, recordTime);
          });
        }
      };
      exports.MultiMetricStorage = MultiMetricStorage;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/ObservableResult.js
  var require_ObservableResult = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/ObservableResult.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BatchObservableResultImpl = exports.ObservableResultImpl = void 0;
      var api_1 = require_src();
      var HashMap_1 = require_HashMap();
      var Instruments_1 = require_Instruments();
      var ObservableResultImpl = class {
        constructor(_instrumentName, _valueType) {
          this._instrumentName = _instrumentName;
          this._valueType = _valueType;
          this._buffer = new HashMap_1.AttributeHashMap();
        }
        /**
         * Observe a measurement of the value associated with the given attributes.
         */
        observe(value, attributes = {}) {
          if (typeof value !== "number") {
            api_1.diag.warn(`non-number value provided to metric ${this._instrumentName}: ${value}`);
            return;
          }
          if (this._valueType === api_1.ValueType.INT && !Number.isInteger(value)) {
            api_1.diag.warn(`INT value type cannot accept a floating-point value for ${this._instrumentName}, ignoring the fractional digits.`);
            value = Math.trunc(value);
            if (!Number.isInteger(value)) {
              return;
            }
          }
          this._buffer.set(attributes, value);
        }
      };
      exports.ObservableResultImpl = ObservableResultImpl;
      var BatchObservableResultImpl = class {
        constructor() {
          this._buffer = /* @__PURE__ */ new Map();
        }
        /**
         * Observe a measurement of the value associated with the given attributes.
         */
        observe(metric, value, attributes = {}) {
          if (!(0, Instruments_1.isObservableInstrument)(metric)) {
            return;
          }
          let map2 = this._buffer.get(metric);
          if (map2 == null) {
            map2 = new HashMap_1.AttributeHashMap();
            this._buffer.set(metric, map2);
          }
          if (typeof value !== "number") {
            api_1.diag.warn(`non-number value provided to metric ${metric._descriptor.name}: ${value}`);
            return;
          }
          if (metric._descriptor.valueType === api_1.ValueType.INT && !Number.isInteger(value)) {
            api_1.diag.warn(`INT value type cannot accept a floating-point value for ${metric._descriptor.name}, ignoring the fractional digits.`);
            value = Math.trunc(value);
            if (!Number.isInteger(value)) {
              return;
            }
          }
          map2.set(attributes, value);
        }
      };
      exports.BatchObservableResultImpl = BatchObservableResultImpl;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/ObservableRegistry.js
  var require_ObservableRegistry = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/ObservableRegistry.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ObservableRegistry = void 0;
      var api_1 = require_src();
      var Instruments_1 = require_Instruments();
      var ObservableResult_1 = require_ObservableResult();
      var utils_1 = require_utils10();
      var ObservableRegistry = class {
        constructor() {
          this._callbacks = [];
          this._batchCallbacks = [];
        }
        addCallback(callback, instrument) {
          const idx = this._findCallback(callback, instrument);
          if (idx >= 0) {
            return;
          }
          this._callbacks.push({ callback, instrument });
        }
        removeCallback(callback, instrument) {
          const idx = this._findCallback(callback, instrument);
          if (idx < 0) {
            return;
          }
          this._callbacks.splice(idx, 1);
        }
        addBatchCallback(callback, instruments) {
          const observableInstruments = new Set(instruments.filter(Instruments_1.isObservableInstrument));
          if (observableInstruments.size === 0) {
            api_1.diag.error("BatchObservableCallback is not associated with valid instruments", instruments);
            return;
          }
          const idx = this._findBatchCallback(callback, observableInstruments);
          if (idx >= 0) {
            return;
          }
          this._batchCallbacks.push({ callback, instruments: observableInstruments });
        }
        removeBatchCallback(callback, instruments) {
          const observableInstruments = new Set(instruments.filter(Instruments_1.isObservableInstrument));
          const idx = this._findBatchCallback(callback, observableInstruments);
          if (idx < 0) {
            return;
          }
          this._batchCallbacks.splice(idx, 1);
        }
        /**
         * @returns a promise of rejected reasons for invoking callbacks.
         */
        async observe(collectionTime, timeoutMillis) {
          const callbackFutures = this._observeCallbacks(collectionTime, timeoutMillis);
          const batchCallbackFutures = this._observeBatchCallbacks(collectionTime, timeoutMillis);
          const results = await (0, utils_1.PromiseAllSettled)([
            ...callbackFutures,
            ...batchCallbackFutures
          ]);
          const rejections = results.filter(utils_1.isPromiseAllSettledRejectionResult).map((it) => it.reason);
          return rejections;
        }
        _observeCallbacks(observationTime, timeoutMillis) {
          return this._callbacks.map(async ({ callback, instrument }) => {
            const observableResult = new ObservableResult_1.ObservableResultImpl(instrument._descriptor.name, instrument._descriptor.valueType);
            let callPromise = Promise.resolve(callback(observableResult));
            if (timeoutMillis != null) {
              callPromise = (0, utils_1.callWithTimeout)(callPromise, timeoutMillis);
            }
            await callPromise;
            instrument._metricStorages.forEach((metricStorage) => {
              metricStorage.record(observableResult._buffer, observationTime);
            });
          });
        }
        _observeBatchCallbacks(observationTime, timeoutMillis) {
          return this._batchCallbacks.map(async ({ callback, instruments }) => {
            const observableResult = new ObservableResult_1.BatchObservableResultImpl();
            let callPromise = Promise.resolve(callback(observableResult));
            if (timeoutMillis != null) {
              callPromise = (0, utils_1.callWithTimeout)(callPromise, timeoutMillis);
            }
            await callPromise;
            instruments.forEach((instrument) => {
              const buffer = observableResult._buffer.get(instrument);
              if (buffer == null) {
                return;
              }
              instrument._metricStorages.forEach((metricStorage) => {
                metricStorage.record(buffer, observationTime);
              });
            });
          });
        }
        _findCallback(callback, instrument) {
          return this._callbacks.findIndex((record) => {
            return record.callback === callback && record.instrument === instrument;
          });
        }
        _findBatchCallback(callback, instruments) {
          return this._batchCallbacks.findIndex((record) => {
            return record.callback === callback && (0, utils_1.setEquals)(record.instruments, instruments);
          });
        }
      };
      exports.ObservableRegistry = ObservableRegistry;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/SyncMetricStorage.js
  var require_SyncMetricStorage = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/SyncMetricStorage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SyncMetricStorage = void 0;
      var MetricStorage_1 = require_MetricStorage();
      var DeltaMetricProcessor_1 = require_DeltaMetricProcessor();
      var TemporalMetricProcessor_1 = require_TemporalMetricProcessor();
      var SyncMetricStorage = class extends MetricStorage_1.MetricStorage {
        constructor(instrumentDescriptor, aggregator, _attributesProcessor, collectorHandles) {
          super(instrumentDescriptor);
          this._attributesProcessor = _attributesProcessor;
          this._deltaMetricStorage = new DeltaMetricProcessor_1.DeltaMetricProcessor(aggregator);
          this._temporalMetricStorage = new TemporalMetricProcessor_1.TemporalMetricProcessor(aggregator, collectorHandles);
        }
        record(value, attributes, context2, recordTime) {
          attributes = this._attributesProcessor.process(attributes, context2);
          this._deltaMetricStorage.record(value, attributes, context2, recordTime);
        }
        /**
         * Collects the metrics from this storage.
         *
         * Note: This is a stateful operation and may reset any interval-related
         * state for the MetricCollector.
         */
        collect(collector, collectionTime) {
          const accumulations = this._deltaMetricStorage.collect();
          return this._temporalMetricStorage.buildMetrics(collector, this._instrumentDescriptor, accumulations, collectionTime);
        }
      };
      exports.SyncMetricStorage = SyncMetricStorage;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/AttributesProcessor.js
  var require_AttributesProcessor = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/AttributesProcessor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FilteringAttributesProcessor = exports.NoopAttributesProcessor = exports.AttributesProcessor = void 0;
      var AttributesProcessor = class {
        static Noop() {
          return NOOP;
        }
      };
      exports.AttributesProcessor = AttributesProcessor;
      var NoopAttributesProcessor = class extends AttributesProcessor {
        process(incoming, _context) {
          return incoming;
        }
      };
      exports.NoopAttributesProcessor = NoopAttributesProcessor;
      var FilteringAttributesProcessor = class extends AttributesProcessor {
        constructor(_allowedAttributeNames) {
          super();
          this._allowedAttributeNames = _allowedAttributeNames;
        }
        process(incoming, _context) {
          const filteredAttributes = {};
          Object.keys(incoming).filter((attributeName) => this._allowedAttributeNames.includes(attributeName)).forEach((attributeName) => filteredAttributes[attributeName] = incoming[attributeName]);
          return filteredAttributes;
        }
      };
      exports.FilteringAttributesProcessor = FilteringAttributesProcessor;
      var NOOP = new NoopAttributesProcessor();
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/MeterSharedState.js
  var require_MeterSharedState = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/MeterSharedState.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MeterSharedState = void 0;
      var InstrumentDescriptor_1 = require_InstrumentDescriptor();
      var Meter_1 = require_Meter();
      var utils_1 = require_utils10();
      var AsyncMetricStorage_1 = require_AsyncMetricStorage();
      var MetricStorageRegistry_1 = require_MetricStorageRegistry();
      var MultiWritableMetricStorage_1 = require_MultiWritableMetricStorage();
      var ObservableRegistry_1 = require_ObservableRegistry();
      var SyncMetricStorage_1 = require_SyncMetricStorage();
      var AttributesProcessor_1 = require_AttributesProcessor();
      var MeterSharedState = class {
        constructor(_meterProviderSharedState, _instrumentationScope) {
          this._meterProviderSharedState = _meterProviderSharedState;
          this._instrumentationScope = _instrumentationScope;
          this.metricStorageRegistry = new MetricStorageRegistry_1.MetricStorageRegistry();
          this.observableRegistry = new ObservableRegistry_1.ObservableRegistry();
          this.meter = new Meter_1.Meter(this);
        }
        registerMetricStorage(descriptor) {
          const storages = this._registerMetricStorage(descriptor, SyncMetricStorage_1.SyncMetricStorage);
          if (storages.length === 1) {
            return storages[0];
          }
          return new MultiWritableMetricStorage_1.MultiMetricStorage(storages);
        }
        registerAsyncMetricStorage(descriptor) {
          const storages = this._registerMetricStorage(descriptor, AsyncMetricStorage_1.AsyncMetricStorage);
          return storages;
        }
        /**
         * @param collector opaque handle of {@link MetricCollector} which initiated the collection.
         * @param collectionTime the HrTime at which the collection was initiated.
         * @param options options for collection.
         * @returns the list of metric data collected.
         */
        async collect(collector, collectionTime, options) {
          const errors = await this.observableRegistry.observe(collectionTime, options === null || options === void 0 ? void 0 : options.timeoutMillis);
          const storages = this.metricStorageRegistry.getStorages(collector);
          if (storages.length === 0) {
            return null;
          }
          const metricDataList = storages.map((metricStorage) => {
            return metricStorage.collect(collector, collectionTime);
          }).filter(utils_1.isNotNullish);
          if (metricDataList.length === 0) {
            return { errors };
          }
          return {
            scopeMetrics: {
              scope: this._instrumentationScope,
              metrics: metricDataList
            },
            errors
          };
        }
        _registerMetricStorage(descriptor, MetricStorageType) {
          const views = this._meterProviderSharedState.viewRegistry.findViews(descriptor, this._instrumentationScope);
          let storages = views.map((view) => {
            const viewDescriptor = (0, InstrumentDescriptor_1.createInstrumentDescriptorWithView)(view, descriptor);
            const compatibleStorage = this.metricStorageRegistry.findOrUpdateCompatibleStorage(viewDescriptor);
            if (compatibleStorage != null) {
              return compatibleStorage;
            }
            const aggregator = view.aggregation.createAggregator(viewDescriptor);
            const viewStorage = new MetricStorageType(viewDescriptor, aggregator, view.attributesProcessor, this._meterProviderSharedState.metricCollectors);
            this.metricStorageRegistry.register(viewStorage);
            return viewStorage;
          });
          if (storages.length === 0) {
            const perCollectorAggregations = this._meterProviderSharedState.selectAggregations(descriptor.type);
            const collectorStorages = perCollectorAggregations.map(([collector, aggregation]) => {
              const compatibleStorage = this.metricStorageRegistry.findOrUpdateCompatibleCollectorStorage(collector, descriptor);
              if (compatibleStorage != null) {
                return compatibleStorage;
              }
              const aggregator = aggregation.createAggregator(descriptor);
              const storage = new MetricStorageType(descriptor, aggregator, AttributesProcessor_1.AttributesProcessor.Noop(), [collector]);
              this.metricStorageRegistry.registerForCollector(collector, storage);
              return storage;
            });
            storages = storages.concat(collectorStorages);
          }
          return storages;
        }
      };
      exports.MeterSharedState = MeterSharedState;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/MeterProviderSharedState.js
  var require_MeterProviderSharedState = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/MeterProviderSharedState.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MeterProviderSharedState = void 0;
      var utils_1 = require_utils10();
      var ViewRegistry_1 = require_ViewRegistry();
      var MeterSharedState_1 = require_MeterSharedState();
      var MeterProviderSharedState = class {
        constructor(resource) {
          this.resource = resource;
          this.viewRegistry = new ViewRegistry_1.ViewRegistry();
          this.metricCollectors = [];
          this.meterSharedStates = /* @__PURE__ */ new Map();
        }
        getMeterSharedState(instrumentationScope) {
          const id = (0, utils_1.instrumentationScopeId)(instrumentationScope);
          let meterSharedState = this.meterSharedStates.get(id);
          if (meterSharedState == null) {
            meterSharedState = new MeterSharedState_1.MeterSharedState(this, instrumentationScope);
            this.meterSharedStates.set(id, meterSharedState);
          }
          return meterSharedState;
        }
        selectAggregations(instrumentType) {
          const result = [];
          for (const collector of this.metricCollectors) {
            result.push([collector, collector.selectAggregation(instrumentType)]);
          }
          return result;
        }
      };
      exports.MeterProviderSharedState = MeterProviderSharedState;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/MetricCollector.js
  var require_MetricCollector = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/state/MetricCollector.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MetricCollector = void 0;
      var core_1 = require_src3();
      var MetricCollector = class {
        constructor(_sharedState, _metricReader) {
          this._sharedState = _sharedState;
          this._metricReader = _metricReader;
        }
        async collect(options) {
          const collectionTime = (0, core_1.millisToHrTime)(Date.now());
          const scopeMetrics = [];
          const errors = [];
          const meterCollectionPromises = Array.from(this._sharedState.meterSharedStates.values()).map(async (meterSharedState) => {
            const current = await meterSharedState.collect(this, collectionTime, options);
            if ((current === null || current === void 0 ? void 0 : current.scopeMetrics) != null) {
              scopeMetrics.push(current.scopeMetrics);
            }
            if ((current === null || current === void 0 ? void 0 : current.errors) != null) {
              errors.push(...current.errors);
            }
          });
          await Promise.all(meterCollectionPromises);
          return {
            resourceMetrics: {
              resource: this._sharedState.resource,
              scopeMetrics
            },
            errors
          };
        }
        /**
         * Delegates for MetricReader.forceFlush.
         */
        async forceFlush(options) {
          await this._metricReader.forceFlush(options);
        }
        /**
         * Delegates for MetricReader.shutdown.
         */
        async shutdown(options) {
          await this._metricReader.shutdown(options);
        }
        selectAggregationTemporality(instrumentType) {
          return this._metricReader.selectAggregationTemporality(instrumentType);
        }
        selectAggregation(instrumentType) {
          return this._metricReader.selectAggregation(instrumentType);
        }
      };
      exports.MetricCollector = MetricCollector;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/MeterProvider.js
  var require_MeterProvider = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/MeterProvider.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MeterProvider = void 0;
      var api_1 = require_src();
      var resources_1 = require_src4();
      var MeterProviderSharedState_1 = require_MeterProviderSharedState();
      var MetricCollector_1 = require_MetricCollector();
      var MeterProvider = class {
        constructor(options) {
          var _a;
          this._shutdown = false;
          const resource = resources_1.Resource.default().merge((_a = options === null || options === void 0 ? void 0 : options.resource) !== null && _a !== void 0 ? _a : resources_1.Resource.empty());
          this._sharedState = new MeterProviderSharedState_1.MeterProviderSharedState(resource);
          if ((options === null || options === void 0 ? void 0 : options.views) != null && options.views.length > 0) {
            for (const view of options.views) {
              this._sharedState.viewRegistry.addView(view);
            }
          }
          if ((options === null || options === void 0 ? void 0 : options.readers) != null && options.readers.length > 0) {
            for (const metricReader of options.readers) {
              this.addMetricReader(metricReader);
            }
          }
        }
        /**
         * Get a meter with the configuration of the MeterProvider.
         */
        getMeter(name, version = "", options = {}) {
          if (this._shutdown) {
            api_1.diag.warn("A shutdown MeterProvider cannot provide a Meter");
            return (0, api_1.createNoopMeter)();
          }
          return this._sharedState.getMeterSharedState({
            name,
            version,
            schemaUrl: options.schemaUrl
          }).meter;
        }
        /**
         * Register a {@link MetricReader} to the meter provider. After the
         * registration, the MetricReader can start metrics collection.
         *
         * <p> NOTE: {@link MetricReader} instances MUST be added before creating any instruments.
         * A {@link MetricReader} instance registered later may receive no or incomplete metric data.
         *
         * @param metricReader the metric reader to be registered.
         *
         * @deprecated This method will be removed in SDK 2.0. Please use
         * {@link MeterProviderOptions.readers} via the {@link MeterProvider} constructor instead
         */
        addMetricReader(metricReader) {
          const collector = new MetricCollector_1.MetricCollector(this._sharedState, metricReader);
          metricReader.setMetricProducer(collector);
          this._sharedState.metricCollectors.push(collector);
        }
        /**
         * Flush all buffered data and shut down the MeterProvider and all registered
         * MetricReaders.
         *
         * Returns a promise which is resolved when all flushes are complete.
         */
        async shutdown(options) {
          if (this._shutdown) {
            api_1.diag.warn("shutdown may only be called once per MeterProvider");
            return;
          }
          this._shutdown = true;
          await Promise.all(this._sharedState.metricCollectors.map((collector) => {
            return collector.shutdown(options);
          }));
        }
        /**
         * Notifies all registered MetricReaders to flush any buffered data.
         *
         * Returns a promise which is resolved when all flushes are complete.
         */
        async forceFlush(options) {
          if (this._shutdown) {
            api_1.diag.warn("invalid attempt to force flush after MeterProvider shutdown");
            return;
          }
          await Promise.all(this._sharedState.metricCollectors.map((collector) => {
            return collector.forceFlush(options);
          }));
        }
      };
      exports.MeterProvider = MeterProvider;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/Predicate.js
  var require_Predicate = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/Predicate.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ExactPredicate = exports.PatternPredicate = void 0;
      var ESCAPE = /[\^$\\.+?()[\]{}|]/g;
      var PatternPredicate = class _PatternPredicate {
        constructor(pattern) {
          if (pattern === "*") {
            this._matchAll = true;
            this._regexp = /.*/;
          } else {
            this._matchAll = false;
            this._regexp = new RegExp(_PatternPredicate.escapePattern(pattern));
          }
        }
        match(str2) {
          if (this._matchAll) {
            return true;
          }
          return this._regexp.test(str2);
        }
        static escapePattern(pattern) {
          return `^${pattern.replace(ESCAPE, "\\$&").replace("*", ".*")}$`;
        }
        static hasWildcard(pattern) {
          return pattern.includes("*");
        }
      };
      exports.PatternPredicate = PatternPredicate;
      var ExactPredicate = class {
        constructor(pattern) {
          this._matchAll = pattern === void 0;
          this._pattern = pattern;
        }
        match(str2) {
          if (this._matchAll) {
            return true;
          }
          if (str2 === this._pattern) {
            return true;
          }
          return false;
        }
      };
      exports.ExactPredicate = ExactPredicate;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/InstrumentSelector.js
  var require_InstrumentSelector = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/InstrumentSelector.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.InstrumentSelector = void 0;
      var Predicate_1 = require_Predicate();
      var InstrumentSelector = class {
        constructor(criteria) {
          var _a;
          this._nameFilter = new Predicate_1.PatternPredicate((_a = criteria === null || criteria === void 0 ? void 0 : criteria.name) !== null && _a !== void 0 ? _a : "*");
          this._type = criteria === null || criteria === void 0 ? void 0 : criteria.type;
          this._unitFilter = new Predicate_1.ExactPredicate(criteria === null || criteria === void 0 ? void 0 : criteria.unit);
        }
        getType() {
          return this._type;
        }
        getNameFilter() {
          return this._nameFilter;
        }
        getUnitFilter() {
          return this._unitFilter;
        }
      };
      exports.InstrumentSelector = InstrumentSelector;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/MeterSelector.js
  var require_MeterSelector = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/MeterSelector.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MeterSelector = void 0;
      var Predicate_1 = require_Predicate();
      var MeterSelector = class {
        constructor(criteria) {
          this._nameFilter = new Predicate_1.ExactPredicate(criteria === null || criteria === void 0 ? void 0 : criteria.name);
          this._versionFilter = new Predicate_1.ExactPredicate(criteria === null || criteria === void 0 ? void 0 : criteria.version);
          this._schemaUrlFilter = new Predicate_1.ExactPredicate(criteria === null || criteria === void 0 ? void 0 : criteria.schemaUrl);
        }
        getNameFilter() {
          return this._nameFilter;
        }
        /**
         * TODO: semver filter? no spec yet.
         */
        getVersionFilter() {
          return this._versionFilter;
        }
        getSchemaUrlFilter() {
          return this._schemaUrlFilter;
        }
      };
      exports.MeterSelector = MeterSelector;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/View.js
  var require_View = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/view/View.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.View = void 0;
      var Predicate_1 = require_Predicate();
      var AttributesProcessor_1 = require_AttributesProcessor();
      var InstrumentSelector_1 = require_InstrumentSelector();
      var MeterSelector_1 = require_MeterSelector();
      var Aggregation_1 = require_Aggregation();
      function isSelectorNotProvided(options) {
        return options.instrumentName == null && options.instrumentType == null && options.instrumentUnit == null && options.meterName == null && options.meterVersion == null && options.meterSchemaUrl == null;
      }
      var View = class {
        /**
         * Create a new {@link View} instance.
         *
         * Parameters can be categorized as two types:
         *  Instrument selection criteria: Used to describe the instrument(s) this view will be applied to.
         *  Will be treated as additive (the Instrument has to meet all the provided criteria to be selected).
         *
         *  Metric stream altering: Alter the metric stream of instruments selected by instrument selection criteria.
         *
         * @param viewOptions {@link ViewOptions} for altering the metric stream and instrument selection.
         * @param viewOptions.name
         * Alters the metric stream:
         *  This will be used as the name of the metrics stream.
         *  If not provided, the original Instrument name will be used.
         * @param viewOptions.description
         * Alters the metric stream:
         *  This will be used as the description of the metrics stream.
         *  If not provided, the original Instrument description will be used by default.
         * @param viewOptions.attributeKeys
         * Alters the metric stream:
         *  If provided, the attributes that are not in the list will be ignored.
         *  If not provided, all attribute keys will be used by default.
         * @param viewOptions.aggregation
         * Alters the metric stream:
         *  Alters the {@link Aggregation} of the metric stream.
         * @param viewOptions.instrumentName
         * Instrument selection criteria:
         *  Original name of the Instrument(s) with wildcard support.
         * @param viewOptions.instrumentType
         * Instrument selection criteria:
         *  The original type of the Instrument(s).
         * @param viewOptions.instrumentUnit
         * Instrument selection criteria:
         *  The unit of the Instrument(s).
         * @param viewOptions.meterName
         * Instrument selection criteria:
         *  The name of the Meter. No wildcard support, name must match the meter exactly.
         * @param viewOptions.meterVersion
         * Instrument selection criteria:
         *  The version of the Meter. No wildcard support, version must match exactly.
         * @param viewOptions.meterSchemaUrl
         * Instrument selection criteria:
         *  The schema URL of the Meter. No wildcard support, schema URL must match exactly.
         *
         * @example
         * // Create a view that changes the Instrument 'my.instrument' to use to an
         * // ExplicitBucketHistogramAggregation with the boundaries [20, 30, 40]
         * new View({
         *   aggregation: new ExplicitBucketHistogramAggregation([20, 30, 40]),
         *   instrumentName: 'my.instrument'
         * })
         */
        constructor(viewOptions) {
          var _a;
          if (isSelectorNotProvided(viewOptions)) {
            throw new Error("Cannot create view with no selector arguments supplied");
          }
          if (viewOptions.name != null && ((viewOptions === null || viewOptions === void 0 ? void 0 : viewOptions.instrumentName) == null || Predicate_1.PatternPredicate.hasWildcard(viewOptions.instrumentName))) {
            throw new Error("Views with a specified name must be declared with an instrument selector that selects at most one instrument per meter.");
          }
          if (viewOptions.attributeKeys != null) {
            this.attributesProcessor = new AttributesProcessor_1.FilteringAttributesProcessor(viewOptions.attributeKeys);
          } else {
            this.attributesProcessor = AttributesProcessor_1.AttributesProcessor.Noop();
          }
          this.name = viewOptions.name;
          this.description = viewOptions.description;
          this.aggregation = (_a = viewOptions.aggregation) !== null && _a !== void 0 ? _a : Aggregation_1.Aggregation.Default();
          this.instrumentSelector = new InstrumentSelector_1.InstrumentSelector({
            name: viewOptions.instrumentName,
            type: viewOptions.instrumentType,
            unit: viewOptions.instrumentUnit
          });
          this.meterSelector = new MeterSelector_1.MeterSelector({
            name: viewOptions.meterName,
            version: viewOptions.meterVersion,
            schemaUrl: viewOptions.meterSchemaUrl
          });
        }
      };
      exports.View = View;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/index.js
  var require_src7 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-sdk-metrics-virtual-d71f2ee3b3/0/cache/@opentelemetry-sdk-metrics-npm-1.21.0-497de80f88-4787b58602.zip/node_modules/@opentelemetry/sdk-metrics/build/src/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TimeoutError = exports.View = exports.Aggregation = exports.SumAggregation = exports.LastValueAggregation = exports.HistogramAggregation = exports.DropAggregation = exports.ExponentialHistogramAggregation = exports.ExplicitBucketHistogramAggregation = exports.DefaultAggregation = exports.MeterProvider = exports.InstrumentType = exports.ConsoleMetricExporter = exports.InMemoryMetricExporter = exports.PeriodicExportingMetricReader = exports.MetricReader = exports.DataPointType = exports.AggregationTemporality = void 0;
      var AggregationTemporality_1 = require_AggregationTemporality();
      Object.defineProperty(exports, "AggregationTemporality", { enumerable: true, get: function() {
        return AggregationTemporality_1.AggregationTemporality;
      } });
      var MetricData_1 = require_MetricData();
      Object.defineProperty(exports, "DataPointType", { enumerable: true, get: function() {
        return MetricData_1.DataPointType;
      } });
      var MetricReader_1 = require_MetricReader();
      Object.defineProperty(exports, "MetricReader", { enumerable: true, get: function() {
        return MetricReader_1.MetricReader;
      } });
      var PeriodicExportingMetricReader_1 = require_PeriodicExportingMetricReader();
      Object.defineProperty(exports, "PeriodicExportingMetricReader", { enumerable: true, get: function() {
        return PeriodicExportingMetricReader_1.PeriodicExportingMetricReader;
      } });
      var InMemoryMetricExporter_1 = require_InMemoryMetricExporter();
      Object.defineProperty(exports, "InMemoryMetricExporter", { enumerable: true, get: function() {
        return InMemoryMetricExporter_1.InMemoryMetricExporter;
      } });
      var ConsoleMetricExporter_1 = require_ConsoleMetricExporter();
      Object.defineProperty(exports, "ConsoleMetricExporter", { enumerable: true, get: function() {
        return ConsoleMetricExporter_1.ConsoleMetricExporter;
      } });
      var InstrumentDescriptor_1 = require_InstrumentDescriptor();
      Object.defineProperty(exports, "InstrumentType", { enumerable: true, get: function() {
        return InstrumentDescriptor_1.InstrumentType;
      } });
      var MeterProvider_1 = require_MeterProvider();
      Object.defineProperty(exports, "MeterProvider", { enumerable: true, get: function() {
        return MeterProvider_1.MeterProvider;
      } });
      var Aggregation_1 = require_Aggregation();
      Object.defineProperty(exports, "DefaultAggregation", { enumerable: true, get: function() {
        return Aggregation_1.DefaultAggregation;
      } });
      Object.defineProperty(exports, "ExplicitBucketHistogramAggregation", { enumerable: true, get: function() {
        return Aggregation_1.ExplicitBucketHistogramAggregation;
      } });
      Object.defineProperty(exports, "ExponentialHistogramAggregation", { enumerable: true, get: function() {
        return Aggregation_1.ExponentialHistogramAggregation;
      } });
      Object.defineProperty(exports, "DropAggregation", { enumerable: true, get: function() {
        return Aggregation_1.DropAggregation;
      } });
      Object.defineProperty(exports, "HistogramAggregation", { enumerable: true, get: function() {
        return Aggregation_1.HistogramAggregation;
      } });
      Object.defineProperty(exports, "LastValueAggregation", { enumerable: true, get: function() {
        return Aggregation_1.LastValueAggregation;
      } });
      Object.defineProperty(exports, "SumAggregation", { enumerable: true, get: function() {
        return Aggregation_1.SumAggregation;
      } });
      Object.defineProperty(exports, "Aggregation", { enumerable: true, get: function() {
        return Aggregation_1.Aggregation;
      } });
      var View_1 = require_View();
      Object.defineProperty(exports, "View", { enumerable: true, get: function() {
        return View_1.View;
      } });
      var utils_1 = require_utils10();
      Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function() {
        return utils_1.TimeoutError;
      } });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/metrics/internal.js
  var require_internal3 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/metrics/internal.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.toMetric = exports.toScopeMetrics = exports.toResourceMetrics = void 0;
      var api_1 = require_src();
      var sdk_metrics_1 = require_src7();
      var internal_1 = require_internal();
      var common_1 = require_common3();
      function toResourceMetrics(resourceMetrics, options) {
        const encoder = (0, common_1.getOtlpEncoder)(options);
        return {
          resource: {
            attributes: (0, internal_1.toAttributes)(resourceMetrics.resource.attributes),
            droppedAttributesCount: 0
          },
          schemaUrl: void 0,
          scopeMetrics: toScopeMetrics(resourceMetrics.scopeMetrics, encoder)
        };
      }
      exports.toResourceMetrics = toResourceMetrics;
      function toScopeMetrics(scopeMetrics, encoder) {
        return Array.from(scopeMetrics.map((metrics) => ({
          scope: {
            name: metrics.scope.name,
            version: metrics.scope.version
          },
          metrics: metrics.metrics.map((metricData) => toMetric(metricData, encoder)),
          schemaUrl: metrics.scope.schemaUrl
        })));
      }
      exports.toScopeMetrics = toScopeMetrics;
      function toMetric(metricData, encoder) {
        const out = {
          name: metricData.descriptor.name,
          description: metricData.descriptor.description,
          unit: metricData.descriptor.unit
        };
        const aggregationTemporality = toAggregationTemporality(metricData.aggregationTemporality);
        switch (metricData.dataPointType) {
          case sdk_metrics_1.DataPointType.SUM:
            out.sum = {
              aggregationTemporality,
              isMonotonic: metricData.isMonotonic,
              dataPoints: toSingularDataPoints(metricData, encoder)
            };
            break;
          case sdk_metrics_1.DataPointType.GAUGE:
            out.gauge = {
              dataPoints: toSingularDataPoints(metricData, encoder)
            };
            break;
          case sdk_metrics_1.DataPointType.HISTOGRAM:
            out.histogram = {
              aggregationTemporality,
              dataPoints: toHistogramDataPoints(metricData, encoder)
            };
            break;
          case sdk_metrics_1.DataPointType.EXPONENTIAL_HISTOGRAM:
            out.exponentialHistogram = {
              aggregationTemporality,
              dataPoints: toExponentialHistogramDataPoints(metricData, encoder)
            };
            break;
        }
        return out;
      }
      exports.toMetric = toMetric;
      function toSingularDataPoint(dataPoint, valueType, encoder) {
        const out = {
          attributes: (0, internal_1.toAttributes)(dataPoint.attributes),
          startTimeUnixNano: encoder.encodeHrTime(dataPoint.startTime),
          timeUnixNano: encoder.encodeHrTime(dataPoint.endTime)
        };
        switch (valueType) {
          case api_1.ValueType.INT:
            out.asInt = dataPoint.value;
            break;
          case api_1.ValueType.DOUBLE:
            out.asDouble = dataPoint.value;
            break;
        }
        return out;
      }
      function toSingularDataPoints(metricData, encoder) {
        return metricData.dataPoints.map((dataPoint) => {
          return toSingularDataPoint(dataPoint, metricData.descriptor.valueType, encoder);
        });
      }
      function toHistogramDataPoints(metricData, encoder) {
        return metricData.dataPoints.map((dataPoint) => {
          const histogram = dataPoint.value;
          return {
            attributes: (0, internal_1.toAttributes)(dataPoint.attributes),
            bucketCounts: histogram.buckets.counts,
            explicitBounds: histogram.buckets.boundaries,
            count: histogram.count,
            sum: histogram.sum,
            min: histogram.min,
            max: histogram.max,
            startTimeUnixNano: encoder.encodeHrTime(dataPoint.startTime),
            timeUnixNano: encoder.encodeHrTime(dataPoint.endTime)
          };
        });
      }
      function toExponentialHistogramDataPoints(metricData, encoder) {
        return metricData.dataPoints.map((dataPoint) => {
          const histogram = dataPoint.value;
          return {
            attributes: (0, internal_1.toAttributes)(dataPoint.attributes),
            count: histogram.count,
            min: histogram.min,
            max: histogram.max,
            sum: histogram.sum,
            positive: {
              offset: histogram.positive.offset,
              bucketCounts: histogram.positive.bucketCounts
            },
            negative: {
              offset: histogram.negative.offset,
              bucketCounts: histogram.negative.bucketCounts
            },
            scale: histogram.scale,
            zeroCount: histogram.zeroCount,
            startTimeUnixNano: encoder.encodeHrTime(dataPoint.startTime),
            timeUnixNano: encoder.encodeHrTime(dataPoint.endTime)
          };
        });
      }
      function toAggregationTemporality(temporality) {
        switch (temporality) {
          case sdk_metrics_1.AggregationTemporality.DELTA:
            return 1;
          case sdk_metrics_1.AggregationTemporality.CUMULATIVE:
            return 2;
        }
      }
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/metrics/index.js
  var require_metrics2 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/metrics/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createExportMetricsServiceRequest = void 0;
      var internal_1 = require_internal3();
      function createExportMetricsServiceRequest(resourceMetrics, options) {
        return {
          resourceMetrics: resourceMetrics.map((metrics) => (0, internal_1.toResourceMetrics)(metrics, options))
        };
      }
      exports.createExportMetricsServiceRequest = createExportMetricsServiceRequest;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/logs/index.js
  var require_logs = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/logs/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.toLogAttributes = exports.createExportLogsServiceRequest = void 0;
      var common_1 = require_common3();
      var internal_1 = require_internal();
      function createExportLogsServiceRequest(logRecords, options) {
        const encoder = (0, common_1.getOtlpEncoder)(options);
        return {
          resourceLogs: logRecordsToResourceLogs(logRecords, encoder)
        };
      }
      exports.createExportLogsServiceRequest = createExportLogsServiceRequest;
      function createResourceMap(logRecords) {
        const resourceMap = /* @__PURE__ */ new Map();
        for (const record of logRecords) {
          const { resource, instrumentationScope: { name, version = "", schemaUrl = "" } } = record;
          let ismMap = resourceMap.get(resource);
          if (!ismMap) {
            ismMap = /* @__PURE__ */ new Map();
            resourceMap.set(resource, ismMap);
          }
          const ismKey = `${name}@${version}:${schemaUrl}`;
          let records = ismMap.get(ismKey);
          if (!records) {
            records = [];
            ismMap.set(ismKey, records);
          }
          records.push(record);
        }
        return resourceMap;
      }
      function logRecordsToResourceLogs(logRecords, encoder) {
        const resourceMap = createResourceMap(logRecords);
        return Array.from(resourceMap, ([resource, ismMap]) => ({
          resource: {
            attributes: (0, internal_1.toAttributes)(resource.attributes),
            droppedAttributesCount: 0
          },
          scopeLogs: Array.from(ismMap, ([, scopeLogs]) => {
            const { instrumentationScope: { name, version, schemaUrl } } = scopeLogs[0];
            return {
              scope: { name, version },
              logRecords: scopeLogs.map((log) => toLogRecord(log, encoder)),
              schemaUrl
            };
          }),
          schemaUrl: void 0
        }));
      }
      function toLogRecord(log, encoder) {
        var _a, _b, _c;
        return {
          timeUnixNano: encoder.encodeHrTime(log.hrTime),
          observedTimeUnixNano: encoder.encodeHrTime(log.hrTimeObserved),
          severityNumber: toSeverityNumber(log.severityNumber),
          severityText: log.severityText,
          body: (0, internal_1.toAnyValue)(log.body),
          attributes: toLogAttributes(log.attributes),
          droppedAttributesCount: log.droppedAttributesCount,
          flags: (_a = log.spanContext) === null || _a === void 0 ? void 0 : _a.traceFlags,
          traceId: encoder.encodeOptionalSpanContext((_b = log.spanContext) === null || _b === void 0 ? void 0 : _b.traceId),
          spanId: encoder.encodeOptionalSpanContext((_c = log.spanContext) === null || _c === void 0 ? void 0 : _c.spanId)
        };
      }
      function toSeverityNumber(severityNumber) {
        return severityNumber;
      }
      function toLogAttributes(attributes) {
        return Object.keys(attributes).map((key) => (0, internal_1.toKeyValue)(key, attributes[key]));
      }
      exports.toLogAttributes = toLogAttributes;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/index.js
  var require_src8 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-otlp-transformer-virtual-bee6d9db60/0/cache/@opentelemetry-otlp-transformer-npm-0.48.0-e220f7f512-9f22028320.zip/node_modules/@opentelemetry/otlp-transformer/build/src/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createExportLogsServiceRequest = exports.createExportMetricsServiceRequest = exports.createExportTraceServiceRequest = void 0;
      __exportStar(require_types7(), exports);
      __exportStar(require_common3(), exports);
      __exportStar(require_types8(), exports);
      __exportStar(require_types9(), exports);
      __exportStar(require_types10(), exports);
      __exportStar(require_types11(), exports);
      var trace_1 = require_trace3();
      Object.defineProperty(exports, "createExportTraceServiceRequest", { enumerable: true, get: function() {
        return trace_1.createExportTraceServiceRequest;
      } });
      var metrics_1 = require_metrics2();
      Object.defineProperty(exports, "createExportMetricsServiceRequest", { enumerable: true, get: function() {
        return metrics_1.createExportMetricsServiceRequest;
      } });
      var logs_1 = require_logs();
      Object.defineProperty(exports, "createExportLogsServiceRequest", { enumerable: true, get: function() {
        return logs_1.createExportLogsServiceRequest;
      } });
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-exporter-trace-otlp-http-virtual-171e9a868f/0/cache/@opentelemetry-exporter-trace-otlp-http-npm-0.48.0-226339e2b4-43443896a0.zip/node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/version.js
  var require_version3 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-exporter-trace-otlp-http-virtual-171e9a868f/0/cache/@opentelemetry-exporter-trace-otlp-http-npm-0.48.0-226339e2b4-43443896a0.zip/node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/version.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.VERSION = void 0;
      exports.VERSION = "0.48.0";
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-exporter-trace-otlp-http-virtual-171e9a868f/0/cache/@opentelemetry-exporter-trace-otlp-http-npm-0.48.0-226339e2b4-43443896a0.zip/node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/platform/node/OTLPTraceExporter.js
  var require_OTLPTraceExporter = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-exporter-trace-otlp-http-virtual-171e9a868f/0/cache/@opentelemetry-exporter-trace-otlp-http-npm-0.48.0-226339e2b4-43443896a0.zip/node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/platform/node/OTLPTraceExporter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.OTLPTraceExporter = void 0;
      var core_1 = require_src3();
      var otlp_exporter_base_1 = require_src6();
      var otlp_exporter_base_2 = require_src6();
      var otlp_transformer_1 = require_src8();
      var version_1 = require_version3();
      var DEFAULT_COLLECTOR_RESOURCE_PATH = "v1/traces";
      var DEFAULT_COLLECTOR_URL = `http://localhost:4318/${DEFAULT_COLLECTOR_RESOURCE_PATH}`;
      var USER_AGENT = {
        "User-Agent": `OTel-OTLP-Exporter-JavaScript/${version_1.VERSION}`
      };
      var OTLPTraceExporter2 = class extends otlp_exporter_base_1.OTLPExporterNodeBase {
        constructor(config = {}) {
          super(config);
          this.headers = Object.assign(Object.assign(Object.assign(Object.assign({}, this.headers), USER_AGENT), core_1.baggageUtils.parseKeyPairsIntoRecord((0, core_1.getEnv)().OTEL_EXPORTER_OTLP_TRACES_HEADERS)), config.headers);
        }
        convert(spans) {
          return (0, otlp_transformer_1.createExportTraceServiceRequest)(spans, {
            useHex: true,
            useLongBits: false
          });
        }
        getDefaultUrl(config) {
          return typeof config.url === "string" ? config.url : (0, core_1.getEnv)().OTEL_EXPORTER_OTLP_TRACES_ENDPOINT.length > 0 ? (0, otlp_exporter_base_2.appendRootPathToUrlIfNeeded)((0, core_1.getEnv)().OTEL_EXPORTER_OTLP_TRACES_ENDPOINT) : (0, core_1.getEnv)().OTEL_EXPORTER_OTLP_ENDPOINT.length > 0 ? (0, otlp_exporter_base_2.appendResourcePathToUrl)((0, core_1.getEnv)().OTEL_EXPORTER_OTLP_ENDPOINT, DEFAULT_COLLECTOR_RESOURCE_PATH) : DEFAULT_COLLECTOR_URL;
        }
      };
      exports.OTLPTraceExporter = OTLPTraceExporter2;
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-exporter-trace-otlp-http-virtual-171e9a868f/0/cache/@opentelemetry-exporter-trace-otlp-http-npm-0.48.0-226339e2b4-43443896a0.zip/node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/platform/node/index.js
  var require_node6 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-exporter-trace-otlp-http-virtual-171e9a868f/0/cache/@opentelemetry-exporter-trace-otlp-http-npm-0.48.0-226339e2b4-43443896a0.zip/node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/platform/node/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_OTLPTraceExporter(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-exporter-trace-otlp-http-virtual-171e9a868f/0/cache/@opentelemetry-exporter-trace-otlp-http-npm-0.48.0-226339e2b4-43443896a0.zip/node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/platform/index.js
  var require_platform6 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-exporter-trace-otlp-http-virtual-171e9a868f/0/cache/@opentelemetry-exporter-trace-otlp-http-npm-0.48.0-226339e2b4-43443896a0.zip/node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/platform/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_node6(), exports);
    }
  });

  // ../../../.yarn/__virtual__/@opentelemetry-exporter-trace-otlp-http-virtual-171e9a868f/0/cache/@opentelemetry-exporter-trace-otlp-http-npm-0.48.0-226339e2b4-43443896a0.zip/node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/index.js
  var require_src9 = __commonJS({
    "../../../.yarn/__virtual__/@opentelemetry-exporter-trace-otlp-http-virtual-171e9a868f/0/cache/@opentelemetry-exporter-trace-otlp-http-npm-0.48.0-226339e2b4-43443896a0.zip/node_modules/@opentelemetry/exporter-trace-otlp-http/build/src/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_platform6(), exports);
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    default: () => src_default
  });

  // src/commands/bundle/index.ts
  var import_cli = __require("@yarnpkg/cli");
  var import_core2 = __require("@yarnpkg/core");
  var import_libzip = __require("@yarnpkg/libzip");
  var import_fslib2 = __require("@yarnpkg/fslib");
  var import_clipanion = __require("clipanion");
  var import_path3 = __toESM(__require("path"));

  // src/commands/bundle/ignore/getIgnoreFile.ts
  var import_fs = __require("fs");
  var getIgnoreFile = async (fileName) => {
    try {
      const data = (0, import_fs.readFileSync)(fileName, "utf-8");
      return data.split("\n");
    } catch (_e) {
      return [];
    }
  };

  // src/commands/bundle/ignore/getIgnoreFilePath.ts
  var import_path = __require("path");
  var getIgnoreFilePath = ({
    ignoreFile,
    cwd
  }) => {
    return (0, import_path.join)(cwd, ignoreFile);
  };

  // src/commands/bundle/ignore/getExcludedFiles.ts
  var import_ignore3 = __toESM(require_ignore());

  // ../../../.yarn/cache/globby-npm-14.0.1-c639e789d7-749a6be91c.zip/node_modules/globby/index.js
  var import_node_process2 = __toESM(__require("process"), 1);
  var import_node_fs2 = __toESM(__require("fs"), 1);
  var import_node_path2 = __toESM(__require("path"), 1);

  // ../../../.yarn/cache/@sindresorhus-merge-streams-npm-2.2.1-3c2089a95f-bc22d5bf3a.zip/node_modules/@sindresorhus/merge-streams/index.js
  var import_node_events = __require("events");
  var import_node_stream = __require("stream");
  var import_promises = __require("stream/promises");
  function mergeStreams(streams) {
    if (!Array.isArray(streams)) {
      throw new TypeError(`Expected an array, got \`${typeof streams}\`.`);
    }
    for (const stream of streams) {
      validateStream(stream);
    }
    const objectMode = streams.some(({ readableObjectMode }) => readableObjectMode);
    const highWaterMark = getHighWaterMark(streams, objectMode);
    const passThroughStream = new MergedStream({
      objectMode,
      writableHighWaterMark: highWaterMark,
      readableHighWaterMark: highWaterMark
    });
    for (const stream of streams) {
      passThroughStream.add(stream);
    }
    if (streams.length === 0) {
      passThroughStream.end();
    }
    return passThroughStream;
  }
  var getHighWaterMark = (streams, objectMode) => {
    if (streams.length === 0) {
      return 16384;
    }
    const highWaterMarks = streams.filter(({ readableObjectMode }) => readableObjectMode === objectMode).map(({ readableHighWaterMark }) => readableHighWaterMark);
    return Math.max(...highWaterMarks);
  };
  var MergedStream = class extends import_node_stream.PassThrough {
    #streams = /* @__PURE__ */ new Set([]);
    #ended = /* @__PURE__ */ new Set([]);
    #onFinished;
    constructor(...args) {
      super(...args);
      this.#onFinished = onMergedStreamFinished(this, this.#streams);
    }
    add(stream) {
      if (this.#streams.has(stream)) {
        return;
      }
      validateStream(stream);
      if (!this.writable) {
        throw new TypeError("The merged stream has already ended.");
      }
      this.#streams.add(stream);
      endWhenStreamsDone({ passThroughStream: this, stream, streams: this.#streams, ended: this.#ended, onFinished: this.#onFinished });
      updateMaxListeners(this, PASSTHROUGH_LISTENERS_PER_STREAM);
      stream.pipe(this, { end: false });
    }
    remove(stream) {
      if (!this.#streams.has(stream)) {
        throw new TypeError("Stream cannot be removed because it was not piped.");
      }
      stream.unpipe(this);
    }
  };
  var onMergedStreamFinished = async (passThroughStream, streams) => {
    updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_COUNT);
    const abortController = new AbortController();
    try {
      await Promise.race([
        onMergedStreamEnd(passThroughStream, abortController),
        onInputStreamsUnpipe(passThroughStream, streams, abortController)
      ]);
    } finally {
      abortController.abort();
      updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_COUNT);
    }
  };
  var onMergedStreamEnd = async (passThroughStream, { signal }) => {
    try {
      await (0, import_promises.finished)(passThroughStream, { signal, cleanup: true });
    } catch {
    }
  };
  var onInputStreamsUnpipe = async (passThroughStream, streams, { signal }) => {
    for await (const [unpipedStream] of (0, import_node_events.on)(passThroughStream, "unpipe", { signal })) {
      if (streams.has(unpipedStream)) {
        unpipedStream.emit(unpipeEvent);
      }
    }
  };
  var validateStream = (stream) => {
    if (typeof stream?.pipe !== "function") {
      throw new TypeError(`Expected a readable stream, got: \`${typeof stream}\`.`);
    }
  };
  var endWhenStreamsDone = async ({ passThroughStream, stream, streams, ended, onFinished }) => {
    try {
      const abortController = new AbortController();
      try {
        await Promise.race([
          onFinished,
          onInputStreamEnd({ stream, streams, ended, abortController }),
          onInputStreamUnpipe({ passThroughStream, stream, streams, ended, abortController })
        ]);
      } finally {
        abortController.abort();
      }
      if (streams.size === ended.size && passThroughStream.writable) {
        passThroughStream.end();
      }
    } catch (error) {
      if (error?.code === "ERR_STREAM_PREMATURE_CLOSE") {
        passThroughStream.destroy();
      } else {
        passThroughStream.destroy(error);
      }
    }
  };
  var onInputStreamEnd = async ({ stream, streams, ended, abortController: { signal } }) => {
    await (0, import_promises.finished)(stream, { signal, cleanup: true, readable: true, writable: false });
    if (streams.has(stream)) {
      ended.add(stream);
    }
  };
  var onInputStreamUnpipe = async ({ passThroughStream, stream, streams, ended, abortController: { signal } }) => {
    await (0, import_node_events.once)(stream, unpipeEvent, { signal });
    streams.delete(stream);
    ended.delete(stream);
    updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_PER_STREAM);
  };
  var unpipeEvent = Symbol("unpipe");
  var updateMaxListeners = (passThroughStream, increment) => {
    passThroughStream.setMaxListeners(passThroughStream.getMaxListeners() + increment);
  };
  var PASSTHROUGH_LISTENERS_COUNT = 2;
  var PASSTHROUGH_LISTENERS_PER_STREAM = 1;

  // ../../../.yarn/cache/globby-npm-14.0.1-c639e789d7-749a6be91c.zip/node_modules/globby/index.js
  var import_fast_glob2 = __toESM(require_out4(), 1);

  // ../../../.yarn/cache/path-type-npm-5.0.0-205dd6bae0-e8f4b15111.zip/node_modules/path-type/index.js
  var import_fs2 = __toESM(__require("fs"), 1);
  async function isType(fsStatType, statsMethodName, filePath) {
    if (typeof filePath !== "string") {
      throw new TypeError(`Expected a string, got ${typeof filePath}`);
    }
    try {
      const stats = await import_fs2.promises[fsStatType](filePath);
      return stats[statsMethodName]();
    } catch (error) {
      if (error.code === "ENOENT") {
        return false;
      }
      throw error;
    }
  }
  function isTypeSync(fsStatType, statsMethodName, filePath) {
    if (typeof filePath !== "string") {
      throw new TypeError(`Expected a string, got ${typeof filePath}`);
    }
    try {
      return import_fs2.default[fsStatType](filePath)[statsMethodName]();
    } catch (error) {
      if (error.code === "ENOENT") {
        return false;
      }
      throw error;
    }
  }
  var isFile = isType.bind(null, "stat", "isFile");
  var isDirectory = isType.bind(null, "stat", "isDirectory");
  var isSymlink = isType.bind(null, "lstat", "isSymbolicLink");
  var isFileSync = isTypeSync.bind(null, "statSync", "isFile");
  var isDirectorySync = isTypeSync.bind(null, "statSync", "isDirectory");
  var isSymlinkSync = isTypeSync.bind(null, "lstatSync", "isSymbolicLink");

  // ../../../.yarn/cache/unicorn-magic-npm-0.1.0-12d4f6ff8b-e4ed0de05b.zip/node_modules/unicorn-magic/node.js
  var import_node_url = __require("url");
  function toPath(urlOrPath) {
    return urlOrPath instanceof URL ? (0, import_node_url.fileURLToPath)(urlOrPath) : urlOrPath;
  }

  // ../../../.yarn/cache/globby-npm-14.0.1-c639e789d7-749a6be91c.zip/node_modules/globby/ignore.js
  var import_node_process = __toESM(__require("process"), 1);
  var import_node_fs = __toESM(__require("fs"), 1);
  var import_promises2 = __toESM(__require("fs/promises"), 1);
  var import_node_path = __toESM(__require("path"), 1);
  var import_fast_glob = __toESM(require_out4(), 1);
  var import_ignore = __toESM(require_ignore(), 1);

  // ../../../.yarn/cache/slash-npm-5.1.0-718a84282e-eb48b815ca.zip/node_modules/slash/index.js
  function slash(path3) {
    const isExtendedLengthPath = path3.startsWith("\\\\?\\");
    if (isExtendedLengthPath) {
      return path3;
    }
    return path3.replace(/\\/g, "/");
  }

  // ../../../.yarn/cache/globby-npm-14.0.1-c639e789d7-749a6be91c.zip/node_modules/globby/utilities.js
  var isNegativePattern = (pattern) => pattern[0] === "!";

  // ../../../.yarn/cache/globby-npm-14.0.1-c639e789d7-749a6be91c.zip/node_modules/globby/ignore.js
  var defaultIgnoredDirectories = [
    "**/node_modules",
    "**/flow-typed",
    "**/coverage",
    "**/.git"
  ];
  var ignoreFilesGlobOptions = {
    absolute: true,
    dot: true
  };
  var GITIGNORE_FILES_PATTERN = "**/.gitignore";
  var applyBaseToPattern = (pattern, base) => isNegativePattern(pattern) ? "!" + import_node_path.default.posix.join(base, pattern.slice(1)) : import_node_path.default.posix.join(base, pattern);
  var parseIgnoreFile = (file, cwd) => {
    const base = slash(import_node_path.default.relative(cwd, import_node_path.default.dirname(file.filePath)));
    return file.content.split(/\r?\n/).filter((line) => line && !line.startsWith("#")).map((pattern) => applyBaseToPattern(pattern, base));
  };
  var toRelativePath = (fileOrDirectory, cwd) => {
    cwd = slash(cwd);
    if (import_node_path.default.isAbsolute(fileOrDirectory)) {
      if (slash(fileOrDirectory).startsWith(cwd)) {
        return import_node_path.default.relative(cwd, fileOrDirectory);
      }
      throw new Error(`Path ${fileOrDirectory} is not in cwd ${cwd}`);
    }
    return fileOrDirectory;
  };
  var getIsIgnoredPredicate = (files, cwd) => {
    const patterns = files.flatMap((file) => parseIgnoreFile(file, cwd));
    const ignores = (0, import_ignore.default)().add(patterns);
    return (fileOrDirectory) => {
      fileOrDirectory = toPath(fileOrDirectory);
      fileOrDirectory = toRelativePath(fileOrDirectory, cwd);
      return fileOrDirectory ? ignores.ignores(slash(fileOrDirectory)) : false;
    };
  };
  var normalizeOptions = (options = {}) => ({
    cwd: toPath(options.cwd) ?? import_node_process.default.cwd(),
    suppressErrors: Boolean(options.suppressErrors),
    deep: typeof options.deep === "number" ? options.deep : Number.POSITIVE_INFINITY,
    ignore: [...options.ignore ?? [], ...defaultIgnoredDirectories]
  });
  var isIgnoredByIgnoreFiles = async (patterns, options) => {
    const { cwd, suppressErrors, deep, ignore: ignore2 } = normalizeOptions(options);
    const paths = await (0, import_fast_glob.default)(patterns, {
      cwd,
      suppressErrors,
      deep,
      ignore: ignore2,
      ...ignoreFilesGlobOptions
    });
    const files = await Promise.all(
      paths.map(async (filePath) => ({
        filePath,
        content: await import_promises2.default.readFile(filePath, "utf8")
      }))
    );
    return getIsIgnoredPredicate(files, cwd);
  };
  var isIgnoredByIgnoreFilesSync = (patterns, options) => {
    const { cwd, suppressErrors, deep, ignore: ignore2 } = normalizeOptions(options);
    const paths = import_fast_glob.default.sync(patterns, {
      cwd,
      suppressErrors,
      deep,
      ignore: ignore2,
      ...ignoreFilesGlobOptions
    });
    const files = paths.map((filePath) => ({
      filePath,
      content: import_node_fs.default.readFileSync(filePath, "utf8")
    }));
    return getIsIgnoredPredicate(files, cwd);
  };

  // ../../../.yarn/cache/globby-npm-14.0.1-c639e789d7-749a6be91c.zip/node_modules/globby/index.js
  var assertPatternsInput = (patterns) => {
    if (patterns.some((pattern) => typeof pattern !== "string")) {
      throw new TypeError("Patterns must be a string or an array of strings");
    }
  };
  var normalizePathForDirectoryGlob = (filePath, cwd) => {
    const path3 = isNegativePattern(filePath) ? filePath.slice(1) : filePath;
    return import_node_path2.default.isAbsolute(path3) ? path3 : import_node_path2.default.join(cwd, path3);
  };
  var getDirectoryGlob = ({ directoryPath, files, extensions }) => {
    const extensionGlob = extensions?.length > 0 ? `.${extensions.length > 1 ? `{${extensions.join(",")}}` : extensions[0]}` : "";
    return files ? files.map((file) => import_node_path2.default.posix.join(directoryPath, `**/${import_node_path2.default.extname(file) ? file : `${file}${extensionGlob}`}`)) : [import_node_path2.default.posix.join(directoryPath, `**${extensionGlob ? `/*${extensionGlob}` : ""}`)];
  };
  var directoryToGlob = async (directoryPaths, {
    cwd = import_node_process2.default.cwd(),
    files,
    extensions
  } = {}) => {
    const globs = await Promise.all(
      directoryPaths.map(async (directoryPath) => await isDirectory(normalizePathForDirectoryGlob(directoryPath, cwd)) ? getDirectoryGlob({ directoryPath, files, extensions }) : directoryPath)
    );
    return globs.flat();
  };
  var directoryToGlobSync = (directoryPaths, {
    cwd = import_node_process2.default.cwd(),
    files,
    extensions
  } = {}) => directoryPaths.flatMap((directoryPath) => isDirectorySync(normalizePathForDirectoryGlob(directoryPath, cwd)) ? getDirectoryGlob({ directoryPath, files, extensions }) : directoryPath);
  var toPatternsArray = (patterns) => {
    patterns = [...new Set([patterns].flat())];
    assertPatternsInput(patterns);
    return patterns;
  };
  var checkCwdOption = (cwd) => {
    if (!cwd) {
      return;
    }
    let stat;
    try {
      stat = import_node_fs2.default.statSync(cwd);
    } catch {
      return;
    }
    if (!stat.isDirectory()) {
      throw new Error("The `cwd` option must be a path to a directory");
    }
  };
  var normalizeOptions2 = (options = {}) => {
    options = {
      ...options,
      ignore: options.ignore ?? [],
      expandDirectories: options.expandDirectories ?? true,
      cwd: toPath(options.cwd)
    };
    checkCwdOption(options.cwd);
    return options;
  };
  var normalizeArguments = (function_) => async (patterns, options) => function_(toPatternsArray(patterns), normalizeOptions2(options));
  var normalizeArgumentsSync = (function_) => (patterns, options) => function_(toPatternsArray(patterns), normalizeOptions2(options));
  var getIgnoreFilesPatterns = (options) => {
    const { ignoreFiles, gitignore } = options;
    const patterns = ignoreFiles ? toPatternsArray(ignoreFiles) : [];
    if (gitignore) {
      patterns.push(GITIGNORE_FILES_PATTERN);
    }
    return patterns;
  };
  var getFilter = async (options) => {
    const ignoreFilesPatterns = getIgnoreFilesPatterns(options);
    return createFilterFunction(
      ignoreFilesPatterns.length > 0 && await isIgnoredByIgnoreFiles(ignoreFilesPatterns, options)
    );
  };
  var getFilterSync = (options) => {
    const ignoreFilesPatterns = getIgnoreFilesPatterns(options);
    return createFilterFunction(
      ignoreFilesPatterns.length > 0 && isIgnoredByIgnoreFilesSync(ignoreFilesPatterns, options)
    );
  };
  var createFilterFunction = (isIgnored) => {
    const seen = /* @__PURE__ */ new Set();
    return (fastGlobResult) => {
      const pathKey = import_node_path2.default.normalize(fastGlobResult.path ?? fastGlobResult);
      if (seen.has(pathKey) || isIgnored && isIgnored(pathKey)) {
        return false;
      }
      seen.add(pathKey);
      return true;
    };
  };
  var unionFastGlobResults = (results, filter) => results.flat().filter((fastGlobResult) => filter(fastGlobResult));
  var convertNegativePatterns = (patterns, options) => {
    const tasks = [];
    while (patterns.length > 0) {
      const index = patterns.findIndex((pattern) => isNegativePattern(pattern));
      if (index === -1) {
        tasks.push({ patterns, options });
        break;
      }
      const ignorePattern = patterns[index].slice(1);
      for (const task of tasks) {
        task.options.ignore.push(ignorePattern);
      }
      if (index !== 0) {
        tasks.push({
          patterns: patterns.slice(0, index),
          options: {
            ...options,
            ignore: [
              ...options.ignore,
              ignorePattern
            ]
          }
        });
      }
      patterns = patterns.slice(index + 1);
    }
    return tasks;
  };
  var normalizeExpandDirectoriesOption = (options, cwd) => ({
    ...cwd ? { cwd } : {},
    ...Array.isArray(options) ? { files: options } : options
  });
  var generateTasks = async (patterns, options) => {
    const globTasks = convertNegativePatterns(patterns, options);
    const { cwd, expandDirectories } = options;
    if (!expandDirectories) {
      return globTasks;
    }
    const directoryToGlobOptions = normalizeExpandDirectoriesOption(expandDirectories, cwd);
    return Promise.all(
      globTasks.map(async (task) => {
        let { patterns: patterns2, options: options2 } = task;
        [
          patterns2,
          options2.ignore
        ] = await Promise.all([
          directoryToGlob(patterns2, directoryToGlobOptions),
          directoryToGlob(options2.ignore, { cwd })
        ]);
        return { patterns: patterns2, options: options2 };
      })
    );
  };
  var generateTasksSync = (patterns, options) => {
    const globTasks = convertNegativePatterns(patterns, options);
    const { cwd, expandDirectories } = options;
    if (!expandDirectories) {
      return globTasks;
    }
    const directoryToGlobSyncOptions = normalizeExpandDirectoriesOption(expandDirectories, cwd);
    return globTasks.map((task) => {
      let { patterns: patterns2, options: options2 } = task;
      patterns2 = directoryToGlobSync(patterns2, directoryToGlobSyncOptions);
      options2.ignore = directoryToGlobSync(options2.ignore, { cwd });
      return { patterns: patterns2, options: options2 };
    });
  };
  var globby = normalizeArguments(async (patterns, options) => {
    const [
      tasks,
      filter
    ] = await Promise.all([
      generateTasks(patterns, options),
      getFilter(options)
    ]);
    const results = await Promise.all(tasks.map((task) => (0, import_fast_glob2.default)(task.patterns, task.options)));
    return unionFastGlobResults(results, filter);
  });
  var globbySync = normalizeArgumentsSync((patterns, options) => {
    const tasks = generateTasksSync(patterns, options);
    const filter = getFilterSync(options);
    const results = tasks.map((task) => import_fast_glob2.default.sync(task.patterns, task.options));
    return unionFastGlobResults(results, filter);
  });
  var globbyStream = normalizeArgumentsSync((patterns, options) => {
    const tasks = generateTasksSync(patterns, options);
    const filter = getFilterSync(options);
    const streams = tasks.map((task) => import_fast_glob2.default.stream(task.patterns, task.options));
    const stream = mergeStreams(streams).filter((fastGlobResult) => filter(fastGlobResult));
    return stream;
  });
  var isDynamicPattern = normalizeArgumentsSync(
    (patterns, options) => patterns.some((pattern) => import_fast_glob2.default.isDynamicPattern(pattern, options))
  );
  var generateGlobTasks = normalizeArguments(generateTasks);
  var generateGlobTasksSync = normalizeArgumentsSync(generateTasksSync);
  var { convertPathToPattern } = import_fast_glob2.default;

  // src/commands/bundle/ignore/getAllFiles.ts
  var getAllFiles = async ({
    cwd
  }) => {
    try {
      const files = await globby(`**/*`, {
        dot: true,
        cwd,
        absolute: false
      });
      return files;
    } catch (_e) {
      return [];
    }
  };

  // src/commands/bundle/ignore/getExcludedFiles.ts
  var getExcludedFiles = async ({
    exclude,
    ignoreFile: _ignoreFile,
    cwd
  }) => {
    const ignoreFile = getIgnoreFilePath({ ignoreFile: _ignoreFile, cwd });
    const ignores = (0, import_ignore3.default)().add([
      ...exclude,
      ...await getIgnoreFile(ignoreFile)
    ]);
    const allFiles = await getAllFiles({ cwd });
    const removeFiles = allFiles.filter((fileName) => ignores.ignores(fileName)).map((fileName) => `${cwd}/${fileName}`);
    return removeFiles;
  };

  // ../shared/src/types/index.ts
  var PackageFiles = [
    "package.json",
    "package.yaml",
    "package.yml"
  ];

  // src/commands/bundle/ignore/getAllWorkspacesNonRemovables.ts
  var import_path2 = __require("path");
  var NonRemovableFiles = {
    /*
      Make sure the directory for package is not removed
      */
    directory: ({ cwd }) => [cwd],
    /*
        Make sure that parent directories are not removed, for example a workspace with path:
        /extrafolder/packages/backend
    
        both /extrafolder
        and /extrafolder/package are kept safe
        */
    parentDirectories: ({ cwd, rootDir }) => {
      if (!cwd.startsWith(rootDir)) {
        throw new Error(
          "Package directory not in rootDir. This should never happen"
        );
      }
      let currentPath = cwd;
      let paths = [];
      while (true) {
        if (currentPath === rootDir || currentPath.length < rootDir.length) {
          return paths;
        }
        currentPath = (0, import_path2.dirname)(currentPath);
        paths = [...paths, currentPath];
      }
    },
    /* Make sure that package files are kept */
    packageFiles: ({ cwd }) => PackageFiles.map((fileName) => (0, import_path2.join)(cwd, fileName))
  };
  var getAllWorkspacesNonRemovablesHelper = ({
    cwd,
    rootDir
  }) => {
    return [
      ...new Set(
        ...[
          Object.values(NonRemovableFiles).map((fn) => fn({ cwd, rootDir })).flat()
        ]
      )
    ];
  };
  var getAllWorkspacesNonRemovables = ({
    workspaces,
    rootDir
  }) => {
    return Array.from(workspaces).map(({ cwd }) => getAllWorkspacesNonRemovablesHelper({ cwd, rootDir })).flat();
  };

  // ../shared/src/config.ts
  var import_fslib = __require("@yarnpkg/fslib");
  var t = __toESM(__require("typanion"));

  // ../../../.yarn/cache/js-yaml-npm-4.1.0-3606f32312-184a24b4ea.zip/node_modules/js-yaml/dist/js-yaml.mjs
  function isNothing(subject) {
    return typeof subject === "undefined" || subject === null;
  }
  function isObject(subject) {
    return typeof subject === "object" && subject !== null;
  }
  function toArray(sequence) {
    if (Array.isArray(sequence))
      return sequence;
    else if (isNothing(sequence))
      return [];
    return [sequence];
  }
  function extend(target, source) {
    var index, length, key, sourceKeys;
    if (source) {
      sourceKeys = Object.keys(source);
      for (index = 0, length = sourceKeys.length; index < length; index += 1) {
        key = sourceKeys[index];
        target[key] = source[key];
      }
    }
    return target;
  }
  function repeat(string, count) {
    var result = "", cycle;
    for (cycle = 0; cycle < count; cycle += 1) {
      result += string;
    }
    return result;
  }
  function isNegativeZero(number) {
    return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
  }
  var isNothing_1 = isNothing;
  var isObject_1 = isObject;
  var toArray_1 = toArray;
  var repeat_1 = repeat;
  var isNegativeZero_1 = isNegativeZero;
  var extend_1 = extend;
  var common = {
    isNothing: isNothing_1,
    isObject: isObject_1,
    toArray: toArray_1,
    repeat: repeat_1,
    isNegativeZero: isNegativeZero_1,
    extend: extend_1
  };
  function formatError(exception2, compact) {
    var where = "", message = exception2.reason || "(unknown reason)";
    if (!exception2.mark)
      return message;
    if (exception2.mark.name) {
      where += 'in "' + exception2.mark.name + '" ';
    }
    where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
    if (!compact && exception2.mark.snippet) {
      where += "\n\n" + exception2.mark.snippet;
    }
    return message + " " + where;
  }
  function YAMLException$1(reason, mark) {
    Error.call(this);
    this.name = "YAMLException";
    this.reason = reason;
    this.mark = mark;
    this.message = formatError(this, false);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack || "";
    }
  }
  YAMLException$1.prototype = Object.create(Error.prototype);
  YAMLException$1.prototype.constructor = YAMLException$1;
  YAMLException$1.prototype.toString = function toString(compact) {
    return this.name + ": " + formatError(this, compact);
  };
  var exception = YAMLException$1;
  function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
    var head = "";
    var tail = "";
    var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
    if (position - lineStart > maxHalfLength) {
      head = " ... ";
      lineStart = position - maxHalfLength + head.length;
    }
    if (lineEnd - position > maxHalfLength) {
      tail = " ...";
      lineEnd = position + maxHalfLength - tail.length;
    }
    return {
      str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
      pos: position - lineStart + head.length
      // relative position
    };
  }
  function padStart(string, max) {
    return common.repeat(" ", max - string.length) + string;
  }
  function makeSnippet(mark, options) {
    options = Object.create(options || null);
    if (!mark.buffer)
      return null;
    if (!options.maxLength)
      options.maxLength = 79;
    if (typeof options.indent !== "number")
      options.indent = 1;
    if (typeof options.linesBefore !== "number")
      options.linesBefore = 3;
    if (typeof options.linesAfter !== "number")
      options.linesAfter = 2;
    var re = /\r?\n|\r|\0/g;
    var lineStarts = [0];
    var lineEnds = [];
    var match;
    var foundLineNo = -1;
    while (match = re.exec(mark.buffer)) {
      lineEnds.push(match.index);
      lineStarts.push(match.index + match[0].length);
      if (mark.position <= match.index && foundLineNo < 0) {
        foundLineNo = lineStarts.length - 2;
      }
    }
    if (foundLineNo < 0)
      foundLineNo = lineStarts.length - 1;
    var result = "", i, line;
    var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
    var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
    for (i = 1; i <= options.linesBefore; i++) {
      if (foundLineNo - i < 0)
        break;
      line = getLine(
        mark.buffer,
        lineStarts[foundLineNo - i],
        lineEnds[foundLineNo - i],
        mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
        maxLineLength
      );
      result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
    }
    line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
    result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
    for (i = 1; i <= options.linesAfter; i++) {
      if (foundLineNo + i >= lineEnds.length)
        break;
      line = getLine(
        mark.buffer,
        lineStarts[foundLineNo + i],
        lineEnds[foundLineNo + i],
        mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
        maxLineLength
      );
      result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    }
    return result.replace(/\n$/, "");
  }
  var snippet = makeSnippet;
  var TYPE_CONSTRUCTOR_OPTIONS = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ];
  var YAML_NODE_KINDS = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function compileStyleAliases(map2) {
    var result = {};
    if (map2 !== null) {
      Object.keys(map2).forEach(function(style) {
        map2[style].forEach(function(alias) {
          result[String(alias)] = style;
        });
      });
    }
    return result;
  }
  function Type$1(tag, options) {
    options = options || {};
    Object.keys(options).forEach(function(name) {
      if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
        throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
      }
    });
    this.options = options;
    this.tag = tag;
    this.kind = options["kind"] || null;
    this.resolve = options["resolve"] || function() {
      return true;
    };
    this.construct = options["construct"] || function(data) {
      return data;
    };
    this.instanceOf = options["instanceOf"] || null;
    this.predicate = options["predicate"] || null;
    this.represent = options["represent"] || null;
    this.representName = options["representName"] || null;
    this.defaultStyle = options["defaultStyle"] || null;
    this.multi = options["multi"] || false;
    this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
    if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
      throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
    }
  }
  var type = Type$1;
  function compileList(schema2, name) {
    var result = [];
    schema2[name].forEach(function(currentType) {
      var newIndex = result.length;
      result.forEach(function(previousType, previousIndex) {
        if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
          newIndex = previousIndex;
        }
      });
      result[newIndex] = currentType;
    });
    return result;
  }
  function compileMap() {
    var result = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    }, index, length;
    function collectType(type2) {
      if (type2.multi) {
        result.multi[type2.kind].push(type2);
        result.multi["fallback"].push(type2);
      } else {
        result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
      }
    }
    for (index = 0, length = arguments.length; index < length; index += 1) {
      arguments[index].forEach(collectType);
    }
    return result;
  }
  function Schema$1(definition) {
    return this.extend(definition);
  }
  Schema$1.prototype.extend = function extend2(definition) {
    var implicit = [];
    var explicit = [];
    if (definition instanceof type) {
      explicit.push(definition);
    } else if (Array.isArray(definition)) {
      explicit = explicit.concat(definition);
    } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
      if (definition.implicit)
        implicit = implicit.concat(definition.implicit);
      if (definition.explicit)
        explicit = explicit.concat(definition.explicit);
    } else {
      throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    }
    implicit.forEach(function(type$1) {
      if (!(type$1 instanceof type)) {
        throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      if (type$1.loadKind && type$1.loadKind !== "scalar") {
        throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      }
      if (type$1.multi) {
        throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
      }
    });
    explicit.forEach(function(type$1) {
      if (!(type$1 instanceof type)) {
        throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
    });
    var result = Object.create(Schema$1.prototype);
    result.implicit = (this.implicit || []).concat(implicit);
    result.explicit = (this.explicit || []).concat(explicit);
    result.compiledImplicit = compileList(result, "implicit");
    result.compiledExplicit = compileList(result, "explicit");
    result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
    return result;
  };
  var schema = Schema$1;
  var str = new type("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(data) {
      return data !== null ? data : "";
    }
  });
  var seq = new type("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(data) {
      return data !== null ? data : [];
    }
  });
  var map = new type("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(data) {
      return data !== null ? data : {};
    }
  });
  var failsafe = new schema({
    explicit: [
      str,
      seq,
      map
    ]
  });
  function resolveYamlNull(data) {
    if (data === null)
      return true;
    var max = data.length;
    return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
  }
  function constructYamlNull() {
    return null;
  }
  function isNull(object) {
    return object === null;
  }
  var _null = new type("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  });
  function resolveYamlBoolean(data) {
    if (data === null)
      return false;
    var max = data.length;
    return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
  }
  function constructYamlBoolean(data) {
    return data === "true" || data === "True" || data === "TRUE";
  }
  function isBoolean(object) {
    return Object.prototype.toString.call(object) === "[object Boolean]";
  }
  var bool = new type("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
      lowercase: function(object) {
        return object ? "true" : "false";
      },
      uppercase: function(object) {
        return object ? "TRUE" : "FALSE";
      },
      camelcase: function(object) {
        return object ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  });
  function isHexCode(c) {
    return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
  }
  function isOctCode(c) {
    return 48 <= c && c <= 55;
  }
  function isDecCode(c) {
    return 48 <= c && c <= 57;
  }
  function resolveYamlInteger(data) {
    if (data === null)
      return false;
    var max = data.length, index = 0, hasDigits = false, ch;
    if (!max)
      return false;
    ch = data[index];
    if (ch === "-" || ch === "+") {
      ch = data[++index];
    }
    if (ch === "0") {
      if (index + 1 === max)
        return true;
      ch = data[++index];
      if (ch === "b") {
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_")
            continue;
          if (ch !== "0" && ch !== "1")
            return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "x") {
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_")
            continue;
          if (!isHexCode(data.charCodeAt(index)))
            return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "o") {
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_")
            continue;
          if (!isOctCode(data.charCodeAt(index)))
            return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
    }
    if (ch === "_")
      return false;
    for (; index < max; index++) {
      ch = data[index];
      if (ch === "_")
        continue;
      if (!isDecCode(data.charCodeAt(index))) {
        return false;
      }
      hasDigits = true;
    }
    if (!hasDigits || ch === "_")
      return false;
    return true;
  }
  function constructYamlInteger(data) {
    var value = data, sign = 1, ch;
    if (value.indexOf("_") !== -1) {
      value = value.replace(/_/g, "");
    }
    ch = value[0];
    if (ch === "-" || ch === "+") {
      if (ch === "-")
        sign = -1;
      value = value.slice(1);
      ch = value[0];
    }
    if (value === "0")
      return 0;
    if (ch === "0") {
      if (value[1] === "b")
        return sign * parseInt(value.slice(2), 2);
      if (value[1] === "x")
        return sign * parseInt(value.slice(2), 16);
      if (value[1] === "o")
        return sign * parseInt(value.slice(2), 8);
    }
    return sign * parseInt(value, 10);
  }
  function isInteger(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
  }
  var int = new type("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
      binary: function(obj) {
        return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
      },
      octal: function(obj) {
        return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
      },
      decimal: function(obj) {
        return obj.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(obj) {
        return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  });
  var YAML_FLOAT_PATTERN = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function resolveYamlFloat(data) {
    if (data === null)
      return false;
    if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    data[data.length - 1] === "_") {
      return false;
    }
    return true;
  }
  function constructYamlFloat(data) {
    var value, sign;
    value = data.replace(/_/g, "").toLowerCase();
    sign = value[0] === "-" ? -1 : 1;
    if ("+-".indexOf(value[0]) >= 0) {
      value = value.slice(1);
    }
    if (value === ".inf") {
      return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    } else if (value === ".nan") {
      return NaN;
    }
    return sign * parseFloat(value, 10);
  }
  var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
  function representYamlFloat(object, style) {
    var res;
    if (isNaN(object)) {
      switch (style) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    } else if (Number.POSITIVE_INFINITY === object) {
      switch (style) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    } else if (Number.NEGATIVE_INFINITY === object) {
      switch (style) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    } else if (common.isNegativeZero(object)) {
      return "-0.0";
    }
    res = object.toString(10);
    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
  }
  function isFloat(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
  }
  var float = new type("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: "lowercase"
  });
  var json = failsafe.extend({
    implicit: [
      _null,
      bool,
      int,
      float
    ]
  });
  var core = json;
  var YAML_DATE_REGEXP = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  );
  var YAML_TIMESTAMP_REGEXP = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function resolveYamlTimestamp(data) {
    if (data === null)
      return false;
    if (YAML_DATE_REGEXP.exec(data) !== null)
      return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null)
      return true;
    return false;
  }
  function constructYamlTimestamp(data) {
    var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
    match = YAML_DATE_REGEXP.exec(data);
    if (match === null)
      match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (match === null)
      throw new Error("Date resolve error");
    year = +match[1];
    month = +match[2] - 1;
    day = +match[3];
    if (!match[4]) {
      return new Date(Date.UTC(year, month, day));
    }
    hour = +match[4];
    minute = +match[5];
    second = +match[6];
    if (match[7]) {
      fraction = match[7].slice(0, 3);
      while (fraction.length < 3) {
        fraction += "0";
      }
      fraction = +fraction;
    }
    if (match[9]) {
      tz_hour = +match[10];
      tz_minute = +(match[11] || 0);
      delta = (tz_hour * 60 + tz_minute) * 6e4;
      if (match[9] === "-")
        delta = -delta;
    }
    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta)
      date.setTime(date.getTime() - delta);
    return date;
  }
  function representYamlTimestamp(object) {
    return object.toISOString();
  }
  var timestamp = new type("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
  });
  function resolveYamlMerge(data) {
    return data === "<<" || data === null;
  }
  var merge = new type("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: resolveYamlMerge
  });
  var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
  function resolveYamlBinary(data) {
    if (data === null)
      return false;
    var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
    for (idx = 0; idx < max; idx++) {
      code = map2.indexOf(data.charAt(idx));
      if (code > 64)
        continue;
      if (code < 0)
        return false;
      bitlen += 6;
    }
    return bitlen % 8 === 0;
  }
  function constructYamlBinary(data) {
    var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
    for (idx = 0; idx < max; idx++) {
      if (idx % 4 === 0 && idx) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      }
      bits = bits << 6 | map2.indexOf(input.charAt(idx));
    }
    tailbits = max % 4 * 6;
    if (tailbits === 0) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    } else if (tailbits === 18) {
      result.push(bits >> 10 & 255);
      result.push(bits >> 2 & 255);
    } else if (tailbits === 12) {
      result.push(bits >> 4 & 255);
    }
    return new Uint8Array(result);
  }
  function representYamlBinary(object) {
    var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
    for (idx = 0; idx < max; idx++) {
      if (idx % 3 === 0 && idx) {
        result += map2[bits >> 18 & 63];
        result += map2[bits >> 12 & 63];
        result += map2[bits >> 6 & 63];
        result += map2[bits & 63];
      }
      bits = (bits << 8) + object[idx];
    }
    tail = max % 3;
    if (tail === 0) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    } else if (tail === 2) {
      result += map2[bits >> 10 & 63];
      result += map2[bits >> 4 & 63];
      result += map2[bits << 2 & 63];
      result += map2[64];
    } else if (tail === 1) {
      result += map2[bits >> 2 & 63];
      result += map2[bits << 4 & 63];
      result += map2[64];
      result += map2[64];
    }
    return result;
  }
  function isBinary(obj) {
    return Object.prototype.toString.call(obj) === "[object Uint8Array]";
  }
  var binary = new type("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
  });
  var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
  var _toString$2 = Object.prototype.toString;
  function resolveYamlOmap(data) {
    if (data === null)
      return true;
    var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      pairHasKey = false;
      if (_toString$2.call(pair) !== "[object Object]")
        return false;
      for (pairKey in pair) {
        if (_hasOwnProperty$3.call(pair, pairKey)) {
          if (!pairHasKey)
            pairHasKey = true;
          else
            return false;
        }
      }
      if (!pairHasKey)
        return false;
      if (objectKeys.indexOf(pairKey) === -1)
        objectKeys.push(pairKey);
      else
        return false;
    }
    return true;
  }
  function constructYamlOmap(data) {
    return data !== null ? data : [];
  }
  var omap = new type("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
  });
  var _toString$1 = Object.prototype.toString;
  function resolveYamlPairs(data) {
    if (data === null)
      return true;
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      if (_toString$1.call(pair) !== "[object Object]")
        return false;
      keys = Object.keys(pair);
      if (keys.length !== 1)
        return false;
      result[index] = [keys[0], pair[keys[0]]];
    }
    return true;
  }
  function constructYamlPairs(data) {
    if (data === null)
      return [];
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      keys = Object.keys(pair);
      result[index] = [keys[0], pair[keys[0]]];
    }
    return result;
  }
  var pairs = new type("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
  });
  var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
  function resolveYamlSet(data) {
    if (data === null)
      return true;
    var key, object = data;
    for (key in object) {
      if (_hasOwnProperty$2.call(object, key)) {
        if (object[key] !== null)
          return false;
      }
    }
    return true;
  }
  function constructYamlSet(data) {
    return data !== null ? data : {};
  }
  var set = new type("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: resolveYamlSet,
    construct: constructYamlSet
  });
  var _default = core.extend({
    implicit: [
      timestamp,
      merge
    ],
    explicit: [
      binary,
      omap,
      pairs,
      set
    ]
  });
  var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var CONTEXT_FLOW_IN = 1;
  var CONTEXT_FLOW_OUT = 2;
  var CONTEXT_BLOCK_IN = 3;
  var CONTEXT_BLOCK_OUT = 4;
  var CHOMPING_CLIP = 1;
  var CHOMPING_STRIP = 2;
  var CHOMPING_KEEP = 3;
  var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
  var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
  var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
  var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function _class(obj) {
    return Object.prototype.toString.call(obj);
  }
  function is_EOL(c) {
    return c === 10 || c === 13;
  }
  function is_WHITE_SPACE(c) {
    return c === 9 || c === 32;
  }
  function is_WS_OR_EOL(c) {
    return c === 9 || c === 32 || c === 10 || c === 13;
  }
  function is_FLOW_INDICATOR(c) {
    return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
  }
  function fromHexCode(c) {
    var lc;
    if (48 <= c && c <= 57) {
      return c - 48;
    }
    lc = c | 32;
    if (97 <= lc && lc <= 102) {
      return lc - 97 + 10;
    }
    return -1;
  }
  function escapedHexLen(c) {
    if (c === 120) {
      return 2;
    }
    if (c === 117) {
      return 4;
    }
    if (c === 85) {
      return 8;
    }
    return 0;
  }
  function fromDecimalCode(c) {
    if (48 <= c && c <= 57) {
      return c - 48;
    }
    return -1;
  }
  function simpleEscapeSequence(c) {
    return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
  }
  function charFromCodepoint(c) {
    if (c <= 65535) {
      return String.fromCharCode(c);
    }
    return String.fromCharCode(
      (c - 65536 >> 10) + 55296,
      (c - 65536 & 1023) + 56320
    );
  }
  var simpleEscapeCheck = new Array(256);
  var simpleEscapeMap = new Array(256);
  for (i = 0; i < 256; i++) {
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
  }
  var i;
  function State$1(input, options) {
    this.input = input;
    this.filename = options["filename"] || null;
    this.schema = options["schema"] || _default;
    this.onWarning = options["onWarning"] || null;
    this.legacy = options["legacy"] || false;
    this.json = options["json"] || false;
    this.listener = options["listener"] || null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
    this.position = 0;
    this.line = 0;
    this.lineStart = 0;
    this.lineIndent = 0;
    this.firstTabInLine = -1;
    this.documents = [];
  }
  function generateError(state, message) {
    var mark = {
      name: state.filename,
      buffer: state.input.slice(0, -1),
      // omit trailing \0
      position: state.position,
      line: state.line,
      column: state.position - state.lineStart
    };
    mark.snippet = snippet(mark);
    return new exception(message, mark);
  }
  function throwError(state, message) {
    throw generateError(state, message);
  }
  function throwWarning(state, message) {
    if (state.onWarning) {
      state.onWarning.call(null, generateError(state, message));
    }
  }
  var directiveHandlers = {
    YAML: function handleYamlDirective(state, name, args) {
      var match, major, minor;
      if (state.version !== null) {
        throwError(state, "duplication of %YAML directive");
      }
      if (args.length !== 1) {
        throwError(state, "YAML directive accepts exactly one argument");
      }
      match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
      if (match === null) {
        throwError(state, "ill-formed argument of the YAML directive");
      }
      major = parseInt(match[1], 10);
      minor = parseInt(match[2], 10);
      if (major !== 1) {
        throwError(state, "unacceptable YAML version of the document");
      }
      state.version = args[0];
      state.checkLineBreaks = minor < 2;
      if (minor !== 1 && minor !== 2) {
        throwWarning(state, "unsupported YAML version of the document");
      }
    },
    TAG: function handleTagDirective(state, name, args) {
      var handle, prefix;
      if (args.length !== 2) {
        throwError(state, "TAG directive accepts exactly two arguments");
      }
      handle = args[0];
      prefix = args[1];
      if (!PATTERN_TAG_HANDLE.test(handle)) {
        throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
      }
      if (_hasOwnProperty$1.call(state.tagMap, handle)) {
        throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
      }
      if (!PATTERN_TAG_URI.test(prefix)) {
        throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
      }
      try {
        prefix = decodeURIComponent(prefix);
      } catch (err) {
        throwError(state, "tag prefix is malformed: " + prefix);
      }
      state.tagMap[handle] = prefix;
    }
  };
  function captureSegment(state, start, end, checkJson) {
    var _position, _length, _character, _result;
    if (start < end) {
      _result = state.input.slice(start, end);
      if (checkJson) {
        for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
          _character = _result.charCodeAt(_position);
          if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
            throwError(state, "expected valid JSON character");
          }
        }
      } else if (PATTERN_NON_PRINTABLE.test(_result)) {
        throwError(state, "the stream contains non-printable characters");
      }
      state.result += _result;
    }
  }
  function mergeMappings(state, destination, source, overridableKeys) {
    var sourceKeys, key, index, quantity;
    if (!common.isObject(source)) {
      throwError(state, "cannot merge mappings; the provided source object is unacceptable");
    }
    sourceKeys = Object.keys(source);
    for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
      key = sourceKeys[index];
      if (!_hasOwnProperty$1.call(destination, key)) {
        destination[key] = source[key];
        overridableKeys[key] = true;
      }
    }
  }
  function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
    var index, quantity;
    if (Array.isArray(keyNode)) {
      keyNode = Array.prototype.slice.call(keyNode);
      for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
        if (Array.isArray(keyNode[index])) {
          throwError(state, "nested arrays are not supported inside keys");
        }
        if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
          keyNode[index] = "[object Object]";
        }
      }
    }
    if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
      keyNode = "[object Object]";
    }
    keyNode = String(keyNode);
    if (_result === null) {
      _result = {};
    }
    if (keyTag === "tag:yaml.org,2002:merge") {
      if (Array.isArray(valueNode)) {
        for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
          mergeMappings(state, _result, valueNode[index], overridableKeys);
        }
      } else {
        mergeMappings(state, _result, valueNode, overridableKeys);
      }
    } else {
      if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
        state.line = startLine || state.line;
        state.lineStart = startLineStart || state.lineStart;
        state.position = startPos || state.position;
        throwError(state, "duplicated mapping key");
      }
      if (keyNode === "__proto__") {
        Object.defineProperty(_result, keyNode, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: valueNode
        });
      } else {
        _result[keyNode] = valueNode;
      }
      delete overridableKeys[keyNode];
    }
    return _result;
  }
  function readLineBreak(state) {
    var ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 10) {
      state.position++;
    } else if (ch === 13) {
      state.position++;
      if (state.input.charCodeAt(state.position) === 10) {
        state.position++;
      }
    } else {
      throwError(state, "a line break is expected");
    }
    state.line += 1;
    state.lineStart = state.position;
    state.firstTabInLine = -1;
  }
  function skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        if (ch === 9 && state.firstTabInLine === -1) {
          state.firstTabInLine = state.position;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      if (allowComments && ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 10 && ch !== 13 && ch !== 0);
      }
      if (is_EOL(ch)) {
        readLineBreak(state);
        ch = state.input.charCodeAt(state.position);
        lineBreaks++;
        state.lineIndent = 0;
        while (ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
      } else {
        break;
      }
    }
    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
      throwWarning(state, "deficient indentation");
    }
    return lineBreaks;
  }
  function testDocumentSeparator(state) {
    var _position = state.position, ch;
    ch = state.input.charCodeAt(_position);
    if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
      _position += 3;
      ch = state.input.charCodeAt(_position);
      if (ch === 0 || is_WS_OR_EOL(ch)) {
        return true;
      }
    }
    return false;
  }
  function writeFoldedLines(state, count) {
    if (count === 1) {
      state.result += " ";
    } else if (count > 1) {
      state.result += common.repeat("\n", count - 1);
    }
  }
  function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
    ch = state.input.charCodeAt(state.position);
    if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
      return false;
    }
    if (ch === 63 || ch === 45) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        return false;
      }
    }
    state.kind = "scalar";
    state.result = "";
    captureStart = captureEnd = state.position;
    hasPendingContent = false;
    while (ch !== 0) {
      if (ch === 58) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          break;
        }
      } else if (ch === 35) {
        preceding = state.input.charCodeAt(state.position - 1);
        if (is_WS_OR_EOL(preceding)) {
          break;
        }
      } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
        break;
      } else if (is_EOL(ch)) {
        _line = state.line;
        _lineStart = state.lineStart;
        _lineIndent = state.lineIndent;
        skipSeparationSpace(state, false, -1);
        if (state.lineIndent >= nodeIndent) {
          hasPendingContent = true;
          ch = state.input.charCodeAt(state.position);
          continue;
        } else {
          state.position = captureEnd;
          state.line = _line;
          state.lineStart = _lineStart;
          state.lineIndent = _lineIndent;
          break;
        }
      }
      if (hasPendingContent) {
        captureSegment(state, captureStart, captureEnd, false);
        writeFoldedLines(state, state.line - _line);
        captureStart = captureEnd = state.position;
        hasPendingContent = false;
      }
      if (!is_WHITE_SPACE(ch)) {
        captureEnd = state.position + 1;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, captureEnd, false);
    if (state.result) {
      return true;
    }
    state.kind = _kind;
    state.result = _result;
    return false;
  }
  function readSingleQuotedScalar(state, nodeIndent) {
    var ch, captureStart, captureEnd;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 39) {
      return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 39) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);
        if (ch === 39) {
          captureStart = state.position;
          state.position++;
          captureEnd = state.position;
        } else {
          return true;
        }
      } else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;
      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, "unexpected end of the document within a single quoted scalar");
      } else {
        state.position++;
        captureEnd = state.position;
      }
    }
    throwError(state, "unexpected end of the stream within a single quoted scalar");
  }
  function readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 34) {
      return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 34) {
        captureSegment(state, captureStart, state.position, true);
        state.position++;
        return true;
      } else if (ch === 92) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);
        if (is_EOL(ch)) {
          skipSeparationSpace(state, false, nodeIndent);
        } else if (ch < 256 && simpleEscapeCheck[ch]) {
          state.result += simpleEscapeMap[ch];
          state.position++;
        } else if ((tmp = escapedHexLen(ch)) > 0) {
          hexLength = tmp;
          hexResult = 0;
          for (; hexLength > 0; hexLength--) {
            ch = state.input.charCodeAt(++state.position);
            if ((tmp = fromHexCode(ch)) >= 0) {
              hexResult = (hexResult << 4) + tmp;
            } else {
              throwError(state, "expected hexadecimal character");
            }
          }
          state.result += charFromCodepoint(hexResult);
          state.position++;
        } else {
          throwError(state, "unknown escape sequence");
        }
        captureStart = captureEnd = state.position;
      } else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;
      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, "unexpected end of the document within a double quoted scalar");
      } else {
        state.position++;
        captureEnd = state.position;
      }
    }
    throwError(state, "unexpected end of the stream within a double quoted scalar");
  }
  function readFlowCollection(state, nodeIndent) {
    var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 91) {
      terminator = 93;
      isMapping = false;
      _result = [];
    } else if (ch === 123) {
      terminator = 125;
      isMapping = true;
      _result = {};
    } else {
      return false;
    }
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(++state.position);
    while (ch !== 0) {
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if (ch === terminator) {
        state.position++;
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = isMapping ? "mapping" : "sequence";
        state.result = _result;
        return true;
      } else if (!readNext) {
        throwError(state, "missed comma between flow collection entries");
      } else if (ch === 44) {
        throwError(state, "expected the node content, but found ','");
      }
      keyTag = keyNode = valueNode = null;
      isPair = isExplicitPair = false;
      if (ch === 63) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following)) {
          isPair = isExplicitPair = true;
          state.position++;
          skipSeparationSpace(state, true, nodeIndent);
        }
      }
      _line = state.line;
      _lineStart = state.lineStart;
      _pos = state.position;
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      keyTag = state.tag;
      keyNode = state.result;
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if ((isExplicitPair || state.line === _line) && ch === 58) {
        isPair = true;
        ch = state.input.charCodeAt(++state.position);
        skipSeparationSpace(state, true, nodeIndent);
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        valueNode = state.result;
      }
      if (isMapping) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
      } else if (isPair) {
        _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
      } else {
        _result.push(keyNode);
      }
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if (ch === 44) {
        readNext = true;
        ch = state.input.charCodeAt(++state.position);
      } else {
        readNext = false;
      }
    }
    throwError(state, "unexpected end of the stream within a flow collection");
  }
  function readBlockScalar(state, nodeIndent) {
    var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 124) {
      folding = false;
    } else if (ch === 62) {
      folding = true;
    } else {
      return false;
    }
    state.kind = "scalar";
    state.result = "";
    while (ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
      if (ch === 43 || ch === 45) {
        if (CHOMPING_CLIP === chomping) {
          chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
        } else {
          throwError(state, "repeat of a chomping mode identifier");
        }
      } else if ((tmp = fromDecimalCode(ch)) >= 0) {
        if (tmp === 0) {
          throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
        } else if (!detectedIndent) {
          textIndent = nodeIndent + tmp - 1;
          detectedIndent = true;
        } else {
          throwError(state, "repeat of an indentation width identifier");
        }
      } else {
        break;
      }
    }
    if (is_WHITE_SPACE(ch)) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (is_WHITE_SPACE(ch));
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (!is_EOL(ch) && ch !== 0);
      }
    }
    while (ch !== 0) {
      readLineBreak(state);
      state.lineIndent = 0;
      ch = state.input.charCodeAt(state.position);
      while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
      if (!detectedIndent && state.lineIndent > textIndent) {
        textIndent = state.lineIndent;
      }
      if (is_EOL(ch)) {
        emptyLines++;
        continue;
      }
      if (state.lineIndent < textIndent) {
        if (chomping === CHOMPING_KEEP) {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        } else if (chomping === CHOMPING_CLIP) {
          if (didReadContent) {
            state.result += "\n";
          }
        }
        break;
      }
      if (folding) {
        if (is_WHITE_SPACE(ch)) {
          atMoreIndented = true;
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        } else if (atMoreIndented) {
          atMoreIndented = false;
          state.result += common.repeat("\n", emptyLines + 1);
        } else if (emptyLines === 0) {
          if (didReadContent) {
            state.result += " ";
          }
        } else {
          state.result += common.repeat("\n", emptyLines);
        }
      } else {
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      }
      didReadContent = true;
      detectedIndent = true;
      emptyLines = 0;
      captureStart = state.position;
      while (!is_EOL(ch) && ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, state.position, false);
    }
    return true;
  }
  function readBlockSequence(state, nodeIndent) {
    var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
    if (state.firstTabInLine !== -1)
      return false;
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      if (state.firstTabInLine !== -1) {
        state.position = state.firstTabInLine;
        throwError(state, "tab characters must not be used in indentation");
      }
      if (ch !== 45) {
        break;
      }
      following = state.input.charCodeAt(state.position + 1);
      if (!is_WS_OR_EOL(following)) {
        break;
      }
      detected = true;
      state.position++;
      if (skipSeparationSpace(state, true, -1)) {
        if (state.lineIndent <= nodeIndent) {
          _result.push(null);
          ch = state.input.charCodeAt(state.position);
          continue;
        }
      }
      _line = state.line;
      composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
      _result.push(state.result);
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
      if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
        throwError(state, "bad indentation of a sequence entry");
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = "sequence";
      state.result = _result;
      return true;
    }
    return false;
  }
  function readBlockMapping(state, nodeIndent, flowIndent) {
    var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
    if (state.firstTabInLine !== -1)
      return false;
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      if (!atExplicitKey && state.firstTabInLine !== -1) {
        state.position = state.firstTabInLine;
        throwError(state, "tab characters must not be used in indentation");
      }
      following = state.input.charCodeAt(state.position + 1);
      _line = state.line;
      if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
        if (ch === 63) {
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = true;
          allowCompact = true;
        } else if (atExplicitKey) {
          atExplicitKey = false;
          allowCompact = true;
        } else {
          throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
        }
        state.position += 1;
        ch = following;
      } else {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
        if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          break;
        }
        if (state.line === _line) {
          ch = state.input.charCodeAt(state.position);
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 58) {
            ch = state.input.charCodeAt(++state.position);
            if (!is_WS_OR_EOL(ch)) {
              throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
            }
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = false;
            allowCompact = false;
            keyTag = state.tag;
            keyNode = state.result;
          } else if (detected) {
            throwError(state, "can not read an implicit mapping pair; a colon is missed");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else if (detected) {
          throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      }
      if (state.line === _line || state.lineIndent > nodeIndent) {
        if (atExplicitKey) {
          _keyLine = state.line;
          _keyLineStart = state.lineStart;
          _keyPos = state.position;
        }
        if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
          if (atExplicitKey) {
            keyNode = state.result;
          } else {
            valueNode = state.result;
          }
        }
        if (!atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
      }
      if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
        throwError(state, "bad indentation of a mapping entry");
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }
    if (atExplicitKey) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    }
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = "mapping";
      state.result = _result;
    }
    return detected;
  }
  function readTagProperty(state) {
    var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 33)
      return false;
    if (state.tag !== null) {
      throwError(state, "duplication of a tag property");
    }
    ch = state.input.charCodeAt(++state.position);
    if (ch === 60) {
      isVerbatim = true;
      ch = state.input.charCodeAt(++state.position);
    } else if (ch === 33) {
      isNamed = true;
      tagHandle = "!!";
      ch = state.input.charCodeAt(++state.position);
    } else {
      tagHandle = "!";
    }
    _position = state.position;
    if (isVerbatim) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 0 && ch !== 62);
      if (state.position < state.length) {
        tagName = state.input.slice(_position, state.position);
        ch = state.input.charCodeAt(++state.position);
      } else {
        throwError(state, "unexpected end of the stream within a verbatim tag");
      }
    } else {
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        if (ch === 33) {
          if (!isNamed) {
            tagHandle = state.input.slice(_position - 1, state.position + 1);
            if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
              throwError(state, "named tag handle cannot contain such characters");
            }
            isNamed = true;
            _position = state.position + 1;
          } else {
            throwError(state, "tag suffix cannot contain exclamation marks");
          }
        }
        ch = state.input.charCodeAt(++state.position);
      }
      tagName = state.input.slice(_position, state.position);
      if (PATTERN_FLOW_INDICATORS.test(tagName)) {
        throwError(state, "tag suffix cannot contain flow indicator characters");
      }
    }
    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
      throwError(state, "tag name cannot contain such characters: " + tagName);
    }
    try {
      tagName = decodeURIComponent(tagName);
    } catch (err) {
      throwError(state, "tag name is malformed: " + tagName);
    }
    if (isVerbatim) {
      state.tag = tagName;
    } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
      state.tag = state.tagMap[tagHandle] + tagName;
    } else if (tagHandle === "!") {
      state.tag = "!" + tagName;
    } else if (tagHandle === "!!") {
      state.tag = "tag:yaml.org,2002:" + tagName;
    } else {
      throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }
    return true;
  }
  function readAnchorProperty(state) {
    var _position, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 38)
      return false;
    if (state.anchor !== null) {
      throwError(state, "duplication of an anchor property");
    }
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
      throwError(state, "name of an anchor node must contain at least one character");
    }
    state.anchor = state.input.slice(_position, state.position);
    return true;
  }
  function readAlias(state) {
    var _position, alias, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 42)
      return false;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
      throwError(state, "name of an alias node must contain at least one character");
    }
    alias = state.input.slice(_position, state.position);
    if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
      throwError(state, 'unidentified alias "' + alias + '"');
    }
    state.result = state.anchorMap[alias];
    skipSeparationSpace(state, true, -1);
    return true;
  }
  function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
    if (state.listener !== null) {
      state.listener("open", state);
    }
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      }
    }
    if (indentStatus === 1) {
      while (readTagProperty(state) || readAnchorProperty(state)) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          allowBlockCollections = allowBlockStyles;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        } else {
          allowBlockCollections = false;
        }
      }
    }
    if (allowBlockCollections) {
      allowBlockCollections = atNewLine || allowCompact;
    }
    if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
      if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
        flowIndent = parentIndent;
      } else {
        flowIndent = parentIndent + 1;
      }
      blockIndent = state.position - state.lineStart;
      if (indentStatus === 1) {
        if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
          hasContent = true;
        } else {
          if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
            hasContent = true;
          } else if (readAlias(state)) {
            hasContent = true;
            if (state.tag !== null || state.anchor !== null) {
              throwError(state, "alias node should not have any properties");
            }
          } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
            hasContent = true;
            if (state.tag === null) {
              state.tag = "?";
            }
          }
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
        }
      } else if (indentStatus === 0) {
        hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
      }
    }
    if (state.tag === null) {
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    } else if (state.tag === "?") {
      if (state.result !== null && state.kind !== "scalar") {
        throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
      }
      for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
        type2 = state.implicitTypes[typeIndex];
        if (type2.resolve(state.result)) {
          state.result = type2.construct(state.result);
          state.tag = type2.tag;
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
          break;
        }
      }
    } else if (state.tag !== "!") {
      if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
        type2 = state.typeMap[state.kind || "fallback"][state.tag];
      } else {
        type2 = null;
        typeList = state.typeMap.multi[state.kind || "fallback"];
        for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
          if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
            type2 = typeList[typeIndex];
            break;
          }
        }
      }
      if (!type2) {
        throwError(state, "unknown tag !<" + state.tag + ">");
      }
      if (state.result !== null && type2.kind !== state.kind) {
        throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
      }
      if (!type2.resolve(state.result, state.tag)) {
        throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
      } else {
        state.result = type2.construct(state.result, state.tag);
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    }
    if (state.listener !== null) {
      state.listener("close", state);
    }
    return state.tag !== null || state.anchor !== null || hasContent;
  }
  function readDocument(state) {
    var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = /* @__PURE__ */ Object.create(null);
    state.anchorMap = /* @__PURE__ */ Object.create(null);
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
      if (state.lineIndent > 0 || ch !== 37) {
        break;
      }
      hasDirectives = true;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveName = state.input.slice(_position, state.position);
      directiveArgs = [];
      if (directiveName.length < 1) {
        throwError(state, "directive name must not be less than one character in length");
      }
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 0 && !is_EOL(ch));
          break;
        }
        if (is_EOL(ch))
          break;
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveArgs.push(state.input.slice(_position, state.position));
      }
      if (ch !== 0)
        readLineBreak(state);
      if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
        directiveHandlers[directiveName](state, directiveName, directiveArgs);
      } else {
        throwWarning(state, 'unknown document directive "' + directiveName + '"');
      }
    }
    skipSeparationSpace(state, true, -1);
    if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    } else if (hasDirectives) {
      throwError(state, "directives end mark is expected");
    }
    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
      throwWarning(state, "non-ASCII line breaks are interpreted as content");
    }
    state.documents.push(state.result);
    if (state.position === state.lineStart && testDocumentSeparator(state)) {
      if (state.input.charCodeAt(state.position) === 46) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      }
      return;
    }
    if (state.position < state.length - 1) {
      throwError(state, "end of the stream or a document separator is expected");
    } else {
      return;
    }
  }
  function loadDocuments(input, options) {
    input = String(input);
    options = options || {};
    if (input.length !== 0) {
      if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
        input += "\n";
      }
      if (input.charCodeAt(0) === 65279) {
        input = input.slice(1);
      }
    }
    var state = new State$1(input, options);
    var nullpos = input.indexOf("\0");
    if (nullpos !== -1) {
      state.position = nullpos;
      throwError(state, "null byte is not allowed in input");
    }
    state.input += "\0";
    while (state.input.charCodeAt(state.position) === 32) {
      state.lineIndent += 1;
      state.position += 1;
    }
    while (state.position < state.length - 1) {
      readDocument(state);
    }
    return state.documents;
  }
  function loadAll$1(input, iterator, options) {
    if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
      options = iterator;
      iterator = null;
    }
    var documents = loadDocuments(input, options);
    if (typeof iterator !== "function") {
      return documents;
    }
    for (var index = 0, length = documents.length; index < length; index += 1) {
      iterator(documents[index]);
    }
  }
  function load$1(input, options) {
    var documents = loadDocuments(input, options);
    if (documents.length === 0) {
      return void 0;
    } else if (documents.length === 1) {
      return documents[0];
    }
    throw new exception("expected a single document in the stream, but found more");
  }
  var loadAll_1 = loadAll$1;
  var load_1 = load$1;
  var loader = {
    loadAll: loadAll_1,
    load: load_1
  };
  var _toString = Object.prototype.toString;
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  var CHAR_BOM = 65279;
  var CHAR_TAB = 9;
  var CHAR_LINE_FEED = 10;
  var CHAR_CARRIAGE_RETURN = 13;
  var CHAR_SPACE = 32;
  var CHAR_EXCLAMATION = 33;
  var CHAR_DOUBLE_QUOTE = 34;
  var CHAR_SHARP = 35;
  var CHAR_PERCENT = 37;
  var CHAR_AMPERSAND = 38;
  var CHAR_SINGLE_QUOTE = 39;
  var CHAR_ASTERISK = 42;
  var CHAR_COMMA = 44;
  var CHAR_MINUS = 45;
  var CHAR_COLON = 58;
  var CHAR_EQUALS = 61;
  var CHAR_GREATER_THAN = 62;
  var CHAR_QUESTION = 63;
  var CHAR_COMMERCIAL_AT = 64;
  var CHAR_LEFT_SQUARE_BRACKET = 91;
  var CHAR_RIGHT_SQUARE_BRACKET = 93;
  var CHAR_GRAVE_ACCENT = 96;
  var CHAR_LEFT_CURLY_BRACKET = 123;
  var CHAR_VERTICAL_LINE = 124;
  var CHAR_RIGHT_CURLY_BRACKET = 125;
  var ESCAPE_SEQUENCES = {};
  ESCAPE_SEQUENCES[0] = "\\0";
  ESCAPE_SEQUENCES[7] = "\\a";
  ESCAPE_SEQUENCES[8] = "\\b";
  ESCAPE_SEQUENCES[9] = "\\t";
  ESCAPE_SEQUENCES[10] = "\\n";
  ESCAPE_SEQUENCES[11] = "\\v";
  ESCAPE_SEQUENCES[12] = "\\f";
  ESCAPE_SEQUENCES[13] = "\\r";
  ESCAPE_SEQUENCES[27] = "\\e";
  ESCAPE_SEQUENCES[34] = '\\"';
  ESCAPE_SEQUENCES[92] = "\\\\";
  ESCAPE_SEQUENCES[133] = "\\N";
  ESCAPE_SEQUENCES[160] = "\\_";
  ESCAPE_SEQUENCES[8232] = "\\L";
  ESCAPE_SEQUENCES[8233] = "\\P";
  var DEPRECATED_BOOLEANS_SYNTAX = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ];
  var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function compileStyleMap(schema2, map2) {
    var result, keys, index, length, tag, style, type2;
    if (map2 === null)
      return {};
    result = {};
    keys = Object.keys(map2);
    for (index = 0, length = keys.length; index < length; index += 1) {
      tag = keys[index];
      style = String(map2[tag]);
      if (tag.slice(0, 2) === "!!") {
        tag = "tag:yaml.org,2002:" + tag.slice(2);
      }
      type2 = schema2.compiledTypeMap["fallback"][tag];
      if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
        style = type2.styleAliases[style];
      }
      result[tag] = style;
    }
    return result;
  }
  function encodeHex(character) {
    var string, handle, length;
    string = character.toString(16).toUpperCase();
    if (character <= 255) {
      handle = "x";
      length = 2;
    } else if (character <= 65535) {
      handle = "u";
      length = 4;
    } else if (character <= 4294967295) {
      handle = "U";
      length = 8;
    } else {
      throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
    }
    return "\\" + handle + common.repeat("0", length - string.length) + string;
  }
  var QUOTING_TYPE_SINGLE = 1;
  var QUOTING_TYPE_DOUBLE = 2;
  function State(options) {
    this.schema = options["schema"] || _default;
    this.indent = Math.max(1, options["indent"] || 2);
    this.noArrayIndent = options["noArrayIndent"] || false;
    this.skipInvalid = options["skipInvalid"] || false;
    this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
    this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
    this.sortKeys = options["sortKeys"] || false;
    this.lineWidth = options["lineWidth"] || 80;
    this.noRefs = options["noRefs"] || false;
    this.noCompatMode = options["noCompatMode"] || false;
    this.condenseFlow = options["condenseFlow"] || false;
    this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
    this.forceQuotes = options["forceQuotes"] || false;
    this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = "";
    this.duplicates = [];
    this.usedDuplicates = null;
  }
  function indentString(string, spaces) {
    var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
    while (position < length) {
      next = string.indexOf("\n", position);
      if (next === -1) {
        line = string.slice(position);
        position = length;
      } else {
        line = string.slice(position, next + 1);
        position = next + 1;
      }
      if (line.length && line !== "\n")
        result += ind;
      result += line;
    }
    return result;
  }
  function generateNextLine(state, level) {
    return "\n" + common.repeat(" ", state.indent * level);
  }
  function testImplicitResolving(state, str2) {
    var index, length, type2;
    for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
      type2 = state.implicitTypes[index];
      if (type2.resolve(str2)) {
        return true;
      }
    }
    return false;
  }
  function isWhitespace(c) {
    return c === CHAR_SPACE || c === CHAR_TAB;
  }
  function isPrintable(c) {
    return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
  }
  function isNsCharOrWhitespace(c) {
    return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
  }
  function isPlainSafe(c, prev, inblock) {
    var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
    var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
    return (
      // ns-plain-safe
      (inblock ? (
        // c = flow-in
        cIsNsCharOrWhitespace
      ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
    );
  }
  function isPlainSafeFirst(c) {
    return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
  }
  function isPlainSafeLast(c) {
    return !isWhitespace(c) && c !== CHAR_COLON;
  }
  function codePointAt(string, pos) {
    var first = string.charCodeAt(pos), second;
    if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
      second = string.charCodeAt(pos + 1);
      if (second >= 56320 && second <= 57343) {
        return (first - 55296) * 1024 + second - 56320 + 65536;
      }
    }
    return first;
  }
  function needIndentIndicator(string) {
    var leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
  }
  var STYLE_PLAIN = 1;
  var STYLE_SINGLE = 2;
  var STYLE_LITERAL = 3;
  var STYLE_FOLDED = 4;
  var STYLE_DOUBLE = 5;
  function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
    var i;
    var char = 0;
    var prevChar = null;
    var hasLineBreak = false;
    var hasFoldableLine = false;
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBreak = -1;
    var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
    if (singleLineOnly || forceQuotes) {
      for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
        char = codePointAt(string, i);
        if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char, prevChar, inblock);
        prevChar = char;
      }
    } else {
      for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
        char = codePointAt(string, i);
        if (char === CHAR_LINE_FEED) {
          hasLineBreak = true;
          if (shouldTrackWidth) {
            hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
            i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
            previousLineBreak = i;
          }
        } else if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char, prevChar, inblock);
        prevChar = char;
      }
      hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
    }
    if (!hasLineBreak && !hasFoldableLine) {
      if (plain && !forceQuotes && !testAmbiguousType(string)) {
        return STYLE_PLAIN;
      }
      return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    }
    if (indentPerLevel > 9 && needIndentIndicator(string)) {
      return STYLE_DOUBLE;
    }
    if (!forceQuotes) {
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  function writeScalar(state, string, level, iskey, inblock) {
    state.dump = function() {
      if (string.length === 0) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
      }
      if (!state.noCompatMode) {
        if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
          return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
        }
      }
      var indent = state.indent * Math.max(1, level);
      var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
      var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
      function testAmbiguity(string2) {
        return testImplicitResolving(state, string2);
      }
      switch (chooseScalarStyle(
        string,
        singleLineOnly,
        state.indent,
        lineWidth,
        testAmbiguity,
        state.quotingType,
        state.forceQuotes && !iskey,
        inblock
      )) {
        case STYLE_PLAIN:
          return string;
        case STYLE_SINGLE:
          return "'" + string.replace(/'/g, "''") + "'";
        case STYLE_LITERAL:
          return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
        case STYLE_FOLDED:
          return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
        case STYLE_DOUBLE:
          return '"' + escapeString(string) + '"';
        default:
          throw new exception("impossible error: invalid scalar style");
      }
    }();
  }
  function blockHeader(string, indentPerLevel) {
    var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
    var clip = string[string.length - 1] === "\n";
    var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
    var chomp = keep ? "+" : clip ? "" : "-";
    return indentIndicator + chomp + "\n";
  }
  function dropEndingNewline(string) {
    return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
  }
  function foldString(string, width) {
    var lineRe = /(\n+)([^\n]*)/g;
    var result = function() {
      var nextLF = string.indexOf("\n");
      nextLF = nextLF !== -1 ? nextLF : string.length;
      lineRe.lastIndex = nextLF;
      return foldLine(string.slice(0, nextLF), width);
    }();
    var prevMoreIndented = string[0] === "\n" || string[0] === " ";
    var moreIndented;
    var match;
    while (match = lineRe.exec(string)) {
      var prefix = match[1], line = match[2];
      moreIndented = line[0] === " ";
      result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
      prevMoreIndented = moreIndented;
    }
    return result;
  }
  function foldLine(line, width) {
    if (line === "" || line[0] === " ")
      return line;
    var breakRe = / [^ ]/g;
    var match;
    var start = 0, end, curr = 0, next = 0;
    var result = "";
    while (match = breakRe.exec(line)) {
      next = match.index;
      if (next - start > width) {
        end = curr > start ? curr : next;
        result += "\n" + line.slice(start, end);
        start = end + 1;
      }
      curr = next;
    }
    result += "\n";
    if (line.length - start > width && curr > start) {
      result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
    } else {
      result += line.slice(start);
    }
    return result.slice(1);
  }
  function escapeString(string) {
    var result = "";
    var char = 0;
    var escapeSeq;
    for (var i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      escapeSeq = ESCAPE_SEQUENCES[char];
      if (!escapeSeq && isPrintable(char)) {
        result += string[i];
        if (char >= 65536)
          result += string[i + 1];
      } else {
        result += escapeSeq || encodeHex(char);
      }
    }
    return result;
  }
  function writeFlowSequence(state, level, object) {
    var _result = "", _tag = state.tag, index, length, value;
    for (index = 0, length = object.length; index < length; index += 1) {
      value = object[index];
      if (state.replacer) {
        value = state.replacer.call(object, String(index), value);
      }
      if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
        if (_result !== "")
          _result += "," + (!state.condenseFlow ? " " : "");
        _result += state.dump;
      }
    }
    state.tag = _tag;
    state.dump = "[" + _result + "]";
  }
  function writeBlockSequence(state, level, object, compact) {
    var _result = "", _tag = state.tag, index, length, value;
    for (index = 0, length = object.length; index < length; index += 1) {
      value = object[index];
      if (state.replacer) {
        value = state.replacer.call(object, String(index), value);
      }
      if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
        if (!compact || _result !== "") {
          _result += generateNextLine(state, level);
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          _result += "-";
        } else {
          _result += "- ";
        }
        _result += state.dump;
      }
    }
    state.tag = _tag;
    state.dump = _result || "[]";
  }
  function writeFlowMapping(state, level, object) {
    var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = "";
      if (_result !== "")
        pairBuffer += ", ";
      if (state.condenseFlow)
        pairBuffer += '"';
      objectKey = objectKeyList[index];
      objectValue = object[objectKey];
      if (state.replacer) {
        objectValue = state.replacer.call(object, objectKey, objectValue);
      }
      if (!writeNode(state, level, objectKey, false, false)) {
        continue;
      }
      if (state.dump.length > 1024)
        pairBuffer += "? ";
      pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
      if (!writeNode(state, level, objectValue, false, false)) {
        continue;
      }
      pairBuffer += state.dump;
      _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = "{" + _result + "}";
  }
  function writeBlockMapping(state, level, object, compact) {
    var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
    if (state.sortKeys === true) {
      objectKeyList.sort();
    } else if (typeof state.sortKeys === "function") {
      objectKeyList.sort(state.sortKeys);
    } else if (state.sortKeys) {
      throw new exception("sortKeys must be a boolean or a function");
    }
    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = "";
      if (!compact || _result !== "") {
        pairBuffer += generateNextLine(state, level);
      }
      objectKey = objectKeyList[index];
      objectValue = object[objectKey];
      if (state.replacer) {
        objectValue = state.replacer.call(object, objectKey, objectValue);
      }
      if (!writeNode(state, level + 1, objectKey, true, true, true)) {
        continue;
      }
      explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
      if (explicitPair) {
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += "?";
        } else {
          pairBuffer += "? ";
        }
      }
      pairBuffer += state.dump;
      if (explicitPair) {
        pairBuffer += generateNextLine(state, level);
      }
      if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
        continue;
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += ":";
      } else {
        pairBuffer += ": ";
      }
      pairBuffer += state.dump;
      _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || "{}";
  }
  function detectType(state, object, explicit) {
    var _result, typeList, index, length, type2, style;
    typeList = explicit ? state.explicitTypes : state.implicitTypes;
    for (index = 0, length = typeList.length; index < length; index += 1) {
      type2 = typeList[index];
      if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
        if (explicit) {
          if (type2.multi && type2.representName) {
            state.tag = type2.representName(object);
          } else {
            state.tag = type2.tag;
          }
        } else {
          state.tag = "?";
        }
        if (type2.represent) {
          style = state.styleMap[type2.tag] || type2.defaultStyle;
          if (_toString.call(type2.represent) === "[object Function]") {
            _result = type2.represent(object, style);
          } else if (_hasOwnProperty.call(type2.represent, style)) {
            _result = type2.represent[style](object, style);
          } else {
            throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
          }
          state.dump = _result;
        }
        return true;
      }
    }
    return false;
  }
  function writeNode(state, level, object, block, compact, iskey, isblockseq) {
    state.tag = null;
    state.dump = object;
    if (!detectType(state, object, false)) {
      detectType(state, object, true);
    }
    var type2 = _toString.call(state.dump);
    var inblock = block;
    var tagStr;
    if (block) {
      block = state.flowLevel < 0 || state.flowLevel > level;
    }
    var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
    if (objectOrArray) {
      duplicateIndex = state.duplicates.indexOf(object);
      duplicate = duplicateIndex !== -1;
    }
    if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
      compact = false;
    }
    if (duplicate && state.usedDuplicates[duplicateIndex]) {
      state.dump = "*ref_" + duplicateIndex;
    } else {
      if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
        state.usedDuplicates[duplicateIndex] = true;
      }
      if (type2 === "[object Object]") {
        if (block && Object.keys(state.dump).length !== 0) {
          writeBlockMapping(state, level, state.dump, compact);
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + state.dump;
          }
        } else {
          writeFlowMapping(state, level, state.dump);
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + " " + state.dump;
          }
        }
      } else if (type2 === "[object Array]") {
        if (block && state.dump.length !== 0) {
          if (state.noArrayIndent && !isblockseq && level > 0) {
            writeBlockSequence(state, level - 1, state.dump, compact);
          } else {
            writeBlockSequence(state, level, state.dump, compact);
          }
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + state.dump;
          }
        } else {
          writeFlowSequence(state, level, state.dump);
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + " " + state.dump;
          }
        }
      } else if (type2 === "[object String]") {
        if (state.tag !== "?") {
          writeScalar(state, state.dump, level, iskey, inblock);
        }
      } else if (type2 === "[object Undefined]") {
        return false;
      } else {
        if (state.skipInvalid)
          return false;
        throw new exception("unacceptable kind of an object to dump " + type2);
      }
      if (state.tag !== null && state.tag !== "?") {
        tagStr = encodeURI(
          state.tag[0] === "!" ? state.tag.slice(1) : state.tag
        ).replace(/!/g, "%21");
        if (state.tag[0] === "!") {
          tagStr = "!" + tagStr;
        } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
          tagStr = "!!" + tagStr.slice(18);
        } else {
          tagStr = "!<" + tagStr + ">";
        }
        state.dump = tagStr + " " + state.dump;
      }
    }
    return true;
  }
  function getDuplicateReferences(object, state) {
    var objects = [], duplicatesIndexes = [], index, length;
    inspectNode(object, objects, duplicatesIndexes);
    for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
      state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
  }
  function inspectNode(object, objects, duplicatesIndexes) {
    var objectKeyList, index, length;
    if (object !== null && typeof object === "object") {
      index = objects.indexOf(object);
      if (index !== -1) {
        if (duplicatesIndexes.indexOf(index) === -1) {
          duplicatesIndexes.push(index);
        }
      } else {
        objects.push(object);
        if (Array.isArray(object)) {
          for (index = 0, length = object.length; index < length; index += 1) {
            inspectNode(object[index], objects, duplicatesIndexes);
          }
        } else {
          objectKeyList = Object.keys(object);
          for (index = 0, length = objectKeyList.length; index < length; index += 1) {
            inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
          }
        }
      }
    }
  }
  function dump$1(input, options) {
    options = options || {};
    var state = new State(options);
    if (!state.noRefs)
      getDuplicateReferences(input, state);
    var value = input;
    if (state.replacer) {
      value = state.replacer.call({ "": value }, "", value);
    }
    if (writeNode(state, 0, value, true, true))
      return state.dump + "\n";
    return "";
  }
  var dump_1 = dump$1;
  var dumper = {
    dump: dump_1
  };
  function renamed(from, to) {
    return function() {
      throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
    };
  }
  var JSON_SCHEMA = json;
  var load = loader.load;
  var loadAll = loader.loadAll;
  var dump = dumper.dump;
  var safeLoad = renamed("safeLoad", "load");
  var safeLoadAll = renamed("safeLoadAll", "loadAll");
  var safeDump = renamed("safeDump", "dump");

  // ../shared/src/config.ts
  var DEFAULT_YARN_BUILD_CONFIGRATION_FILENAME = `.yarnbuildrc.yml`;
  var DEFAULT_IGNORE_FILE = ".bundleignore";
  var isYarnBuildConfiguration = t.isObject({
    folders: t.isObject({
      input: t.isOneOf([t.isString(), t.isArray(t.isString())]),
      output: t.isNullable(t.isOneOf([t.isString(), t.isArray(t.isString())]))
    }),
    exclude: t.isArray(t.isString()),
    bail: t.isBoolean(),
    hideYarnBuildBadge: t.isBoolean(),
    ignoreFile: t.isString()
  });
  var isYarnBuildManifestConfiguration = t.isObject({
    input: t.isOptional(t.isOneOf([t.isString(), t.isArray(t.isString())])),
    output: t.isOptional(
      t.isNullable(t.isOneOf([t.isString(), t.isArray(t.isString())]))
    ),
    tsconfig: t.isOptional(t.isString())
  });
  var DEFAULT_CONFIG = {
    folders: {
      input: ".",
      output: null
    },
    exclude: [],
    bail: true,
    hideYarnBuildBadge: false,
    ignoreFile: DEFAULT_IGNORE_FILE
  };
  async function getConfiguration(configuration) {
    const rcFilename = DEFAULT_YARN_BUILD_CONFIGRATION_FILENAME;
    const rcPath = import_fslib.ppath.join(
      configuration.projectCwd || configuration.startingCwd,
      rcFilename
    );
    if (import_fslib.xfs.existsSync(rcPath)) {
      const content = await import_fslib.xfs.readFilePromise(rcPath, `utf8`);
      const errors = [];
      try {
        const configOnDisk = load(content, { schema: JSON_SCHEMA });
        if (isYarnBuildConfiguration(configOnDisk, { errors })) {
          return configOnDisk;
        }
        console.warn(errors);
      } catch (error) {
        let tip = ``;
        if (content.match(/^\s+(?!-)[^:]+\s+\S+/m))
          tip = ` (config is corrupted, please check it matches the shape in the yarn.build readme.`;
        throw new Error(
          `Parse error when loading ${rcPath}; please check it's proper Yaml${tip}`
        );
      }
    }
    return DEFAULT_CONFIG;
  }
  async function GetPartialPluginConfiguration(configuration) {
    return await getConfiguration(configuration);
  }

  // ../shared/src/tracing/attributes.ts
  var Attribute = {
    PACKAGE_NAME: "package.name",
    PACKAGE_SCOPE: "package.scope",
    PACKAGE_DIRECTORY: "package.directory",
    PACKAGE_COMMAND: "package.command",
    // VCS
    GIT_BRANCH: "git.branch",
    GIT_COMMIT: "git.commit",
    YARN_BUILD_MESSAGE_CODE: "yarn.build.message.code",
    // Yarn.build flags
    YARN_BUILD_CONFIG_FOLDERS_INPUT: "yarn.build.config.folders.input",
    YARN_BUILD_CONFIG_FOLDERS_OUTPUT: "yarn.build.config.folders.output",
    YARN_BUILD_CONFIG_EXCLUDE: "yarn.build.config.exclude",
    YARN_BUILD_CONFIG_BAIL: "yarn.build.config.bail",
    YARN_BUILD_CONFIG_HIDE_BADGE: "yarn.build.config.hide-badge",
    YARN_BUILD_CONFIG_MAX_CONCURRENCY: "yarn.build.config.max-concurrency",
    // yarn build
    YARN_BUILD_FLAGS_OUTPUT_JSON: "yarn.build.flags.output.json",
    YARN_BUILD_FLAGS_ALL: "yarn.build.flags.all",
    YARN_BUILD_FLAGS_TARGETS: "yarn.build.flags.targets",
    YARN_BUILD_FLAGS_COMMAND: "yarn.build.flags.command",
    YARN_BUILD_FLAGS_INTERLACED: "yarn.build.flags.interlaced",
    YARN_BUILD_FLAGS_VERBOSE: "yarn.build.flags.verbose",
    YARN_BUILD_FLAGS_DRY_RUN: "yarn.build.flags.dry-run",
    YARN_BUILD_FLAGS_IGNORE_CACHE: "yarn.build.flags.ignore-cache",
    YARN_BUILD_FLAGS_MAX_CONCURRENCY: "yarn.build.flags.max-concurrency",
    YARN_BUILD_FLAGS_CONTINUE_ON_ERROR: "yarn.build.flags.continue-on-error",
    YARN_BUILD_FLAGS_EXCLUDE: "yarn.build.flags.exclude",
    YARN_BUILD_FLAGS_EXCLUDE_CURRENT: "yarn.build.flags.exclude.current",
    YARN_BUILD_FLAGS_CHANGES: "yarn.build.flags.changes",
    YARN_BUILD_FLAGS_SINCE: "yarn.build.flags.since",
    YARN_BUILD_FLAGS_SINCE_BRANCH: "yarn.build.flags.since-branch",
    YARN_BUILD_FLAGS_ONLY_CURRENT: "yarn.build.flags.only-current",
    YARN_BUILD_FLAGS_IGNORE_DEPENDENCIES: "yarn.build.flags.ignore-dependencies",
    // yarn bundle
    YARN_BUILD_FLAGS_BUNDLE_QUIET: "yarn.build.flags.bundle.quiet",
    YARN_BUILD_FLAGS_BUNDLE_TEMPORARY_DIRECTORY: "yarn.build.flags.bundle.temporary-directory",
    YARN_BUILD_FLAGS_BUNDLE_OUTPUT_DIRECTORY: "yarn.build.flags.bundle.output-directory",
    YARN_BUILD_FLAGS_BUNDLE_NO_COMPRESS: "yarn.build.flags.bundle.no-compress",
    YARN_BUILD_FLAGS_BUNDLE_ARCHIVE_NAME: "yarn.build.flags.bundle.archive-name",
    YARN_BUILD_FLAGS_BUNDLE_EXCLUDE: "yarn.build.flags.bundle.exclude",
    YARN_BUILD_FLAGS_BUNDLE_IGNORE_FILE: "yarn.build.flags.bundle.ignore-file",
    // Yarn.build per package attributes
    YARN_BUILD_PACKAGE_NEEDS_RUN: "yarn.build.package.needs-run",
    YARN_BUILD_PACKAGE_RUN_COMMAND: "yarn.build.package.run.command",
    YARN_BUILD_PACKAGE_RUN_COMMAND_EXIT: "yarn.build.package.run.command.exit"
  };

  // ../shared/src/tracing/tracer.ts
  var import_api = __toESM(require_src());
  var import_core = __toESM(require_src3());

  // ../shared/src/tracing/provider.ts
  var import_sdk_trace_base = __toESM(require_src5());
  var import_resources = __toESM(require_src4());
  var import_semantic_conventions = __toESM(require_src2());
  var import_exporter_trace_otlp_http = __toESM(require_src9());
  var import_sdk_trace_base2 = __toESM(require_src5());
  var TraceProvider = class {
    // this is setup as a singleton so that it can only be instantiated once,
    // as it's called on many times, but never registed globally.
    // Because it's a plugin, the code might be evaluated but not needed to run.
    static _instance;
    static getInstance() {
      return this._instance || (this._instance = new this().start());
    }
    static provider() {
      return this._instance || (this._instance = new this().start());
    }
    start() {
      const exporter = new import_exporter_trace_otlp_http.OTLPTraceExporter();
      const provider = new import_sdk_trace_base.BasicTracerProvider({
        resource: new import_resources.Resource({
          [import_semantic_conventions.SemanticResourceAttributes.SERVICE_NAME]: "yarn.build"
        })
      });
      provider.addSpanProcessor(new import_sdk_trace_base2.BatchSpanProcessor(exporter));
      async function exitHandler(evtOrExitCodeOrError) {
        try {
          await provider.shutdown();
        } finally {
          process.exit(isNaN(+evtOrExitCodeOrError) ? 1 : +evtOrExitCodeOrError);
        }
      }
      ["beforeExit", "uncaughtException", "SIGINT", "SIGTERM"].forEach(
        (evt) => process.on(evt, exitHandler)
      );
      return provider;
    }
  };

  // ../shared/src/tracing/tracer.ts
  var import_api2 = __toESM(require_src());
  var Tracer = class {
    name;
    _tracer;
    constructor(name) {
      this.name = name;
      this._tracer = TraceProvider.getInstance().getTracer(name);
    }
    recordException(span, err) {
      if (typeof typeof err === "string" || err instanceof Error) {
        span.recordException(err);
        span.setStatus({
          code: import_api.SpanStatusCode.ERROR,
          message: err instanceof Error ? err.message : err
        });
      }
    }
    // Start a span, pass in a context to create nested spans
    //
    //   await this.tracer.startSpan(
    //    { name: "span name", ctx },
    //     async ({ span, ctx }) => {
    //       // do stuff
    //  })
    //
    async startSpan(opts, fn) {
      let ctx;
      if (typeof opts.ctx === "undefined") {
        ctx = import_api2.context.active();
      } else {
        ctx = opts.ctx;
      }
      if (!!opts.propegateFromEnv || opts?.spanOptions?.kind == 4) {
        const tp = process.env["TRACEPARENT"];
        if (typeof tp == "string") {
          const parent = (0, import_core.parseTraceParent)(tp ?? "");
          if (!!parent) {
            ctx = import_api2.trace.setSpanContext(import_api2.context.active(), parent);
          }
        }
      }
      const span = this._tracer.startSpan(opts.name, opts.spanOptions, ctx);
      const newCtx = import_api2.trace.setSpan(ctx, span);
      try {
        if (fn.constructor.name === "AsyncFunction") {
          return await fn({ span, ctx: newCtx });
        } else {
          return fn({ span, ctx: newCtx });
        }
      } catch (err) {
        if (typeof err === "string" || err instanceof Error) {
          this.recordException(span, err);
        }
        if (!opts.supressExceptions) {
          throw err;
        }
      } finally {
        span.end();
      }
      throw new Error("Unknown error");
    }
    // Wrap an inline chunk of code in a span.
    // Useful when you want to instrument something like a closure
    // that is too cumbersome to extract.
    //
    //     await tracer.wrap(
    //       "copy to tmp dir",
    //       ctx,
    //       async (cwd: PortablePath) =>
    //         xfs.copyPromise(tmpDir, cwd, {
    //           baseFs,
    //         }),
    //       sourceConfiguration.projectCwd
    //     );
    async wrap(opts, cb, ...args) {
      let ctx;
      if (typeof opts.ctx === "undefined") {
        ctx = import_api2.context.active();
      } else {
        ctx = opts.ctx;
      }
      const c = async () => await this.startSpan(
        { name: opts.name, ctx },
        async () => await cb(...args)
      );
      return await c();
    }
  };

  // src/commands/bundle/index.ts
  var import_api3 = __toESM(require_src());
  var Bundler = class extends import_cli.BaseCommand {
    static paths = [[`bundle`]];
    tracer = new Tracer("yarn.build");
    json = import_clipanion.Option.Boolean(`--json`, false, {
      description: `flag is set the output will follow a JSON-stream output also known as NDJSON (https://github.com/ndjson/ndjson-spec)`
    });
    quiet = import_clipanion.Option.Boolean(`-q,--quiet`, false, {
      description: `suppress progess messages`
    });
    temporaryDirectory = import_clipanion.Option.String(`--temporary-directory`, {
      description: "superseeds --output-directory and --no-compress, when set the temporary directory used for bundling is written to a file you pass here "
    });
    outputDirectory = import_clipanion.Option.String(`-o,--output-directory`, {
      description: "sets the output directory, this should be outside your source input directory."
    });
    noCompress = import_clipanion.Option.Boolean(`--no-compress`, false, {
      description: `set this with --output-directory to skip zipping your bundle, when this is set your output directory must be outside your project root`
    });
    archiveName = import_clipanion.Option.String(
      `-a,--archive-name`,
      `bundle.zip`,
      {
        description: `sets the name of the archive. Any files matching this, will be excluded from subsequent archives. Defaults to ./bundle.zip`
      }
    );
    exclude = import_clipanion.Option.Array(`--exclude`, [], {
      arity: 1,
      description: "Exclude specific paths from the final bundle."
    });
    ignoreFile = import_clipanion.Option.String("--ignore-file", DEFAULT_IGNORE_FILE, {
      description: "set the name of ignore file. Files matching this in workspace root and package root will be used to indicate which files will be excluded from bundle."
    });
    static usage = import_clipanion.Command.Usage({
      category: `Bundle commands`,
      description: `bundle a workspace package into a deployable archive`,
      details: `
      This command will bundle up the source of the target package along with
      its dependencies into an archive.

      This is designed to be used for deployment, not for publishing, so
      everything to run except for a runtime (ie node) is bundled into
      the archive.

      Call this after you have run your build step (if any).

      This is designed to work best with zero-install configurations. If you
      don't have that, run \`yarn install\` before this command.

      Why not just compile like we do on the front-end?
      Some dependencies may use require in interesting ways, or be or call
      binaries. It's safest not to transpile them.
    `
    });
    progress({
      code,
      group,
      msg,
      span
    }) {
      if (this.quiet !== true) {
        console.info(`\u27A4 ${code}:${group}${msg}`);
      }
      if (typeof span != "undefined") {
        span.addEvent(msg, {
          [Attribute.YARN_BUILD_MESSAGE_CODE]: code
        });
      }
    }
    async removeUnusedPackages(ctx, tmpDir, tmpPackageCwd, configuration) {
      return await this.tracer.startSpan(
        { name: `remove unused packages`, ctx },
        async ({ span }) => {
          const { project, workspace } = await import_core2.Project.find(
            configuration,
            tmpPackageCwd
          );
          if (!workspace) {
            throw new import_cli.WorkspaceRequiredError(project.cwd, tmpPackageCwd);
          }
          const root = await import_core2.Project.find(configuration, tmpDir);
          if (!root.workspace) {
            throw new import_cli.WorkspaceRequiredError(root.project.cwd, tmpDir);
          }
          const requiredWorkspaces = /* @__PURE__ */ new Set([
            workspace,
            root.workspace
          ]);
          const pluginConfiguration = await GetPartialPluginConfiguration(configuration);
          this.exclude = pluginConfiguration.exclude ? [...this.exclude, ...pluginConfiguration.exclude] : this.exclude;
          this.ignoreFile = pluginConfiguration?.ignoreFile ?? this.ignoreFile;
          for (const workspace2 of requiredWorkspaces) {
            for (const dependencyType of import_core2.Manifest.allDependencies) {
              for (const descriptor of workspace2.manifest.getForScope(dependencyType).values()) {
                const matchingWorkspace = project.tryWorkspaceByDescriptor(descriptor);
                if (matchingWorkspace === null)
                  continue;
                requiredWorkspaces.add(matchingWorkspace);
                this.progress({
                  code: "YB1001" /* RemoveUnusedPackages */,
                  group: " \u2502 " /* Progress */,
                  msg: `required:	${matchingWorkspace.relativeCwd}`,
                  span
                });
              }
            }
          }
          for (const workspace2 of project.workspaces) {
            if (requiredWorkspaces.has(workspace2))
              continue;
            if (workspace2.cwd !== tmpDir) {
              await import_fslib2.xfs.removePromise(workspace2.cwd);
              this.progress({
                code: "YB1001" /* RemoveUnusedPackages */,
                group: " \u2502 " /* Progress */,
                msg: `unused:	${workspace2.relativeCwd}`,
                span
              });
            }
          }
        }
      );
    }
    async removeEmptyDirectories(ctx, {
      tmpDir,
      cwd
    }) {
      const span = import_api3.trace.getSpan(ctx);
      const isDir = import_fslib2.xfs.statSync(cwd).isDirectory();
      if (!isDir) {
        return false;
      }
      let files = await import_fslib2.xfs.readdirPromise(cwd);
      for (const file of files) {
        await this.removeEmptyDirectories(ctx, {
          tmpDir,
          cwd: import_fslib2.ppath.join(cwd, file)
        });
      }
      files = await import_fslib2.xfs.readdirPromise(cwd);
      if (files.length === 0) {
        await import_fslib2.xfs.removePromise(cwd);
        this.progress({
          code: "YB1002" /* RemoveEmptyDirectories */,
          group: " \u2502 " /* Progress */,
          msg: `empty:	${cwd.replace(tmpDir + "/", "")}`,
          span
        });
        return true;
      }
      return false;
    }
    async removeExcluded(ctx, {
      tmpDir,
      excluded,
      nonRemovableFiles,
      yarnDirectory,
      cacheDirectory,
      shouldRemoveEmptyDirectories = false
    }) {
      const gitDir = `${tmpDir}/.git`;
      try {
        if (await import_fslib2.xfs.lstatPromise(gitDir)) {
          await import_fslib2.xfs.removePromise(gitDir);
        }
      } catch (e) {
      }
      await Promise.all(
        excluded.map(async (p) => {
          p;
          if (p.startsWith(yarnDirectory)) {
            return;
          }
          if (p.startsWith(cacheDirectory)) {
            return;
          }
          if (nonRemovableFiles.includes(p)) {
            return;
          }
          if (!p.startsWith(tmpDir)) {
            return;
          }
          try {
            if (await import_fslib2.xfs.lstatPromise(p)) {
              await import_fslib2.xfs.removePromise(p);
            }
          } catch (_e) {
          }
        })
      );
      if (shouldRemoveEmptyDirectories) {
        await this.removeEmptyDirectories(ctx, { tmpDir, cwd: tmpDir });
      }
    }
    async execute() {
      return await this.tracer.startSpan(
        { name: `yarn bundle`, propegateFromEnv: true },
        async ({ span, ctx }) => {
          this.progress({
            code: "YB1000" /* Info */,
            group: " \u250C " /* Start */,
            msg: `Prepare ${this.context.cwd} for bundling`,
            span
          });
          this.progress({
            code: "YB1000" /* Info */,
            group: " \u2502 " /* Progress */,
            msg: `Preparing temporary directory`,
            span
          });
          const bundle = async (tmpDir) => await this.tracer.startSpan(
            { name: `prepare for bundle`, ctx },
            async ({ span: span2, ctx: ctx2 }) => {
              const originalCwd = `${this.context.cwd}`;
              let outputArchive = import_fslib2.ppath.join(originalCwd, this.archiveName);
              const attr = {
                [Attribute.YARN_BUILD_FLAGS_BUNDLE_QUIET]: this.quiet,
                [Attribute.YARN_BUILD_FLAGS_BUNDLE_TEMPORARY_DIRECTORY]: this.temporaryDirectory,
                [Attribute.YARN_BUILD_FLAGS_BUNDLE_OUTPUT_DIRECTORY]: tmpDir,
                [Attribute.YARN_BUILD_FLAGS_BUNDLE_NO_COMPRESS]: this.noCompress,
                [Attribute.YARN_BUILD_FLAGS_BUNDLE_ARCHIVE_NAME]: this.archiveName,
                [Attribute.YARN_BUILD_FLAGS_BUNDLE_EXCLUDE]: this.exclude,
                [Attribute.YARN_BUILD_FLAGS_BUNDLE_IGNORE_FILE]: this.ignoreFile
              };
              span2.setAttributes(attr);
              if (typeof this.outputDirectory == "string") {
                const resolvedOutputDir = resolveNativePath(
                  this.outputDirectory
                );
                span2.setAttribute(
                  Attribute.YARN_BUILD_FLAGS_BUNDLE_OUTPUT_DIRECTORY,
                  resolvedOutputDir
                );
                if (!import_fslib2.xfs.existsSync(resolvedOutputDir)) {
                  await import_fslib2.xfs.mkdirPromise(resolvedOutputDir);
                }
                if (import_fslib2.xfs.readdirSync(resolvedOutputDir).length != 0) {
                  throw new Error(" --output-directory is not empty");
                }
                outputArchive = import_fslib2.ppath.join(resolvedOutputDir, this.archiveName);
              }
              const sourceConfiguration = await import_core2.Configuration.find(
                this.context.cwd,
                this.context.plugins
              );
              if (sourceConfiguration.projectCwd === null) {
                throw new Error("Can't find project directory");
              }
              const packageCwd = originalCwd.replace(
                sourceConfiguration.projectCwd,
                ""
              );
              let noCompressIsSafe = false;
              let outputPath;
              if (this.noCompress === true) {
                if (typeof this.outputDirectory !== "string") {
                  throw new Error(
                    "ERROR: you set --no-compress, but did not specify --output-directory"
                  );
                } else {
                  outputPath = resolveNativePath(this.outputDirectory);
                  if (outputPath.startsWith(sourceConfiguration.projectCwd)) {
                    throw new Error(
                      "ERROR: --output-directory is inside project root with --no-compress set.\nThis is no allowed to prevent you destroying your project"
                    );
                  }
                }
                noCompressIsSafe = true;
              }
              const baseFs = new import_fslib2.NodeFS();
              this.progress({
                code: "YB1000" /* Info */,
                group: " \u2502 " /* Progress */,
                msg: `Copying repo to temporary directory`,
                span: span2
              });
              await this.tracer.wrap(
                { name: "copy to tmp dir", ctx: ctx2 },
                async (cwd) => import_fslib2.xfs.copyPromise(tmpDir, cwd, {
                  baseFs
                }),
                sourceConfiguration.projectCwd
              );
              const tmpPackageCwd = `${tmpDir}${packageCwd}`;
              const previousArchive = `${tmpPackageCwd}/${this.archiveName}`;
              let exclude = this.exclude;
              try {
                if (await import_fslib2.xfs.lstatPromise(previousArchive)) {
                  exclude.push(previousArchive);
                }
              } catch (e) {
              }
              const configuration = await import_core2.Configuration.find(
                tmpPackageCwd,
                this.context.plugins
              );
              configuration.use(
                "<custom>",
                { enableNetwork: false },
                tmpPackageCwd
              );
              const cache = await import_core2.Cache.find(configuration);
              const yarnDirectory = `${tmpDir}/.yarn`;
              const cacheDirectory = cache.cwd;
              this.progress({
                code: "YB1000" /* Info */,
                group: " \u2502 " /* Progress */,
                msg: `Removing unused and excluded workspaces, folders and files`,
                span: span2
              });
              await this.removeUnusedPackages(
                ctx2,
                tmpDir,
                tmpPackageCwd,
                configuration
              );
              const { project, workspace } = await import_core2.Project.find(
                configuration,
                tmpPackageCwd
              );
              if (!workspace) {
                throw new import_cli.WorkspaceRequiredError(project.cwd, tmpPackageCwd);
              }
              span2.setAttributes({
                [Attribute.PACKAGE_DIRECTORY]: packageCwd,
                [Attribute.PACKAGE_NAME]: workspace.anchoredLocator.name
              });
              if (typeof workspace.anchoredLocator.scope === "string") {
                span2.setAttribute(
                  Attribute.PACKAGE_SCOPE,
                  `@${workspace.anchoredLocator.scope}`
                );
              }
              const root = await import_core2.Project.find(configuration, tmpDir);
              if (!root.workspace) {
                throw new import_cli.WorkspaceRequiredError(root.project.cwd, tmpDir);
              }
              const requiredWorkspaces = /* @__PURE__ */ new Set([
                workspace,
                root.workspace
              ]);
              const nonRemovableFiles = getAllWorkspacesNonRemovables({
                workspaces: requiredWorkspaces,
                rootDir: tmpDir
              });
              exclude = await getExcludedFiles({
                cwd: tmpDir,
                ignoreFile: this.ignoreFile,
                exclude
              });
              for (const workspace2 of requiredWorkspaces) {
                for (const dependencyType of import_core2.Manifest.allDependencies) {
                  for (const descriptor of workspace2.manifest.getForScope(dependencyType).values()) {
                    const matchingWorkspace = project.tryWorkspaceByDescriptor(descriptor);
                    if (matchingWorkspace === null)
                      continue;
                    requiredWorkspaces.add(matchingWorkspace);
                  }
                }
              }
              await this.tracer.wrap(
                { name: "remove unused workspaces", ctx: ctx2 },
                async () => {
                  for (const workspace2 of requiredWorkspaces) {
                    const workspaceExclude = await getExcludedFiles({
                      cwd: workspace2.cwd,
                      ignoreFile: this.ignoreFile,
                      exclude
                    });
                    await this.removeExcluded(ctx2, {
                      tmpDir,
                      excluded: workspaceExclude,
                      nonRemovableFiles,
                      yarnDirectory,
                      cacheDirectory,
                      shouldRemoveEmptyDirectories: false
                    });
                  }
                }
              );
              await this.tracer.wrap(
                { name: "remove excluded files", ctx: ctx2 },
                async () => {
                  await this.removeExcluded(ctx2, {
                    tmpDir,
                    excluded: exclude,
                    nonRemovableFiles,
                    yarnDirectory,
                    cacheDirectory,
                    shouldRemoveEmptyDirectories: true
                  });
                }
              );
              await this.tracer.wrap(
                { name: "add entrypoint.js", ctx: ctx2 },
                async () => {
                  for (const workspace2 of project.workspaces) {
                    workspace2.manifest.devDependencies.clear();
                    if (requiredWorkspaces.has(workspace2))
                      continue;
                    workspace2.manifest.dependencies.clear();
                    workspace2.manifest.peerDependencies.clear();
                  }
                  if (workspace?.manifest?.raw?.main) {
                    const mainFile = workspace.relativeCwd + import_path3.default.posix.sep + workspace?.manifest?.raw?.main;
                    const pnp = `.pnp.cjs`;
                    import_fslib2.xfs.writeFilePromise(
                      `${tmpDir}${import_path3.default.posix.sep}entrypoint.js`,
                      generateEntrypointFile(mainFile, pnp)
                    );
                  }
                  this.progress({
                    code: "YB1000" /* Info */,
                    group: " \u2514 " /* End */,
                    msg: `Completed`,
                    span: span2
                  });
                }
              );
              const report = await this.tracer.startSpan(
                { name: `bundle`, ctx: ctx2 },
                async ({ ctx: ctx3 }) => {
                  return await import_core2.StreamReport.start(
                    {
                      configuration,
                      json: this.json,
                      stdout: this.context.stdout,
                      includeLogs: true
                    },
                    async (report2) => {
                      await this.tracer.wrap(
                        { name: "yarn install", ctx: ctx3 },
                        async ({ cache: cache2, report: report3 }) => (
                          // Install and remove everything we dont need
                          await project.install({
                            cache: cache2,
                            report: report3
                          })
                        ),
                        { cache, report: report2 }
                      );
                      if (typeof this.temporaryDirectory !== `undefined`) {
                        return;
                      }
                      if (noCompressIsSafe && typeof outputPath !== `undefined`) {
                        report2.reportInfo(
                          null,
                          "Moving build to output directory"
                        );
                        await this.tracer.wrap(
                          { name: "copy to output directory", ctx: ctx3 },
                          async ({ outputPath: outputPath2, tmpDir: tmpDir2 }) => baseFs.copyPromise(outputPath2, tmpDir2),
                          { outputPath, tmpDir }
                        );
                      } else {
                        report2.reportInfo(null, "Creating archive");
                        const zipFs = new import_libzip.ZipFS(outputArchive, {
                          create: true
                        });
                        report2.reportInfo(null, "Copying files to archive");
                        await this.tracer.wrap(
                          { name: "copy to zip", ctx: ctx3 },
                          async ({ tmpDir: tmpDir2, baseFs: baseFs2 }) => (
                            // copy into the root of the zip file
                            await zipFs.copyPromise(
                              "/",
                              tmpDir2,
                              {
                                baseFs: baseFs2
                              }
                            )
                          ),
                          { tmpDir, baseFs }
                        );
                        await this.tracer.wrap(
                          { name: "save zip", ctx: ctx3 },
                          async () => zipFs.saveAndClose()
                        );
                        report2.reportJson({
                          name: "ArchiveSuccess",
                          message: "Archive created successfuly at ",
                          outputArchive
                        });
                      }
                    }
                  );
                }
              );
              return report.exitCode();
            }
          );
          if (typeof this.temporaryDirectory !== `undefined`) {
            return await bundle(this.temporaryDirectory);
          } else {
            return await import_fslib2.xfs.mktempPromise(bundle);
          }
        }
      );
    }
  };
  var generateEntrypointFile = (main, pnp) => `
"use strict";

const path = require("path");

const pnp = require(path.normalize(path.resolve( __dirname, "${pnp}"))).setup();

const index = require(path.normalize(path.resolve( __dirname,"${main}")));

Object.defineProperty(exports, "__esModule", { value: true });

exports.default = index;
`;
  function resolveNativePath(path3) {
    const portablePath = import_fslib2.npath.toPortablePath(path3);
    return import_fslib2.ppath.resolve(portablePath);
  }

  // src/index.ts
  var plugin = {
    commands: [Bundler]
  };
  var src_default = plugin;
  return __toCommonJS(src_exports);
})();
/*! Bundled license information:

is-extglob/index.js:
  (*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-glob/index.js:
  (*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

to-regex-range/index.js:
  (*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

fill-range/index.js:
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

queue-microtask/index.js:
  (*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

run-parallel/index.js:
  (*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
*/
return plugin;
}
};
