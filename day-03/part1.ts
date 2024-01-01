import { open } from "node:fs/promises";
import { PathLike } from "node:fs";
import { log } from "../shared/debug";

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
