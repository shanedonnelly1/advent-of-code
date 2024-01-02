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

type MatchPair = {
  index: number;
  string: string;
};

export const getMatchPairArrayForLine = (line: string) => {
  const regEx = /\d+/g;
  const matches = line.matchAll(regEx);
  var matchArray: MatchPair[] = [];
  for (const match of matches) {
    if (match.index !== undefined && match.length > 0) {
      matchArray.push({ index: match.index, string: match[0] });
    }
  }
  return matchArray;
};

export const getPartNumberSumForLine = (
  line: string,
  previousLine?: string,
  nextLine?: string,
  debug?: boolean
) => {
  log(`${line}`, debug);
  var sum = 0;
  const matchPairs = getMatchPairArrayForLine(line);
  matchPairs.forEach((pair) => {
    if (isPartNumber(pair.string, pair.index, previousLine, nextLine)) {
      sum += Number(pair.string);
    }
  });
  return sum;
};

export const getProcessedValueFromFile = async (
  file: PathLike,
  debug?: boolean
) => {
  var sum = 0;
  const fileHandle = await open(file);
  var lines: string[] = [];
  for await (const line of fileHandle.readLines()) {
    lines.push(line);
    // const value = getPartNumberSumForLine(line, previousLine, nextLine, debug);
    // log(`  Line value ${value}`, debug);
    // sum += value;
  }
  for (var i = 0; i < lines.length; i += 1) {
    var value = 0;
    if (i === 0) {
      value = getPartNumberSumForLine(lines[0], undefined, lines[1], debug);
    } else if (i === lines.length - 1) {
      value = getPartNumberSumForLine(lines[i], lines[i - 1], undefined, debug);
    } else {
      value = getPartNumberSumForLine(
        lines[i],
        lines[i - 1],
        lines[i + 1],
        debug
      );
    }
    log(`  Line value ${value}`, debug);
    sum += value;
  }
  return sum;
};
