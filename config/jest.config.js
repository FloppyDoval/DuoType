"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config = {
  moduleDirectories: ["node_modules", "src"],
  // Prefer .ts and .tsx files in import statements without a file extension,
  // in case JavaScript equivalents have been emitted by TypeScript.
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  preset: "ts-jest",
  rootDir: (0, path_1.resolve)(__dirname, "../src"),
  // Exclude .js and .jsx files in case these have been emitted by TypeScript.
  // See: https://jestjs.io/docs/en/configuration#testregex-string--arraystring
  testRegex: "((\\.|/)(test|spec))\\.tsx?$",
  transform: {
    "^.*\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/../tsconfig.test.json",
      },
    ],
  },
};
module.exports = config;
