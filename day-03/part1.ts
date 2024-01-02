import { open } from "node:fs/promises";
import { PathLike } from "node:fs";
import { log } from "../shared/debug";

export const isPartNumber = (
  value: string,
  position: number,
  previousLine?: string,
  nextLine?: string
) => {
  const valueLength = value.length;
  for (var i = position - 1; i <= position + valueLength; i += 1) {
    const regEx = /[!@#\$%\^&\*\(\)_\-\+=]/;
    if (i < 0) {
      continue;
    }
    if (
      previousLine &&
      i < previousLine.length &&
      regEx.test(previousLine[i])
    ) {
      return true;
    }
    if (nextLine && i < nextLine.length && regEx.test(nextLine[i])) {
      return true;
    }
  }
  return false;
};

export const getProcessedValueFromLine = (line: string, debug?: boolean) => {
  log(`${line}`, debug);
  return 0;
};

export const getProcessedValueFromFile = async (
  file: PathLike,
  debug?: boolean
) => {
  var sum = 0;
  const fileHandle = await open(file);
  for await (const line of fileHandle.readLines()) {
    const value = getProcessedValueFromLine(line, debug);
    log(`  Line value ${value}`, debug);
    sum += value;
  }
  return sum;
};
