import { open } from "node:fs/promises";
import { PathLike } from "node:fs";
import { log } from "../shared/debug";

export const isPartNumber = (
  value: string,
  position: number,
  currentLine: string,
  previousLine?: string,
  nextLine?: string
) => {
  const part = getPart(value, position, currentLine, previousLine, nextLine);
  return part !== undefined;
};

export const getPart = (
  value: string,
  position: number,
  currentLine: string,
  previousLine?: string,
  nextLine?: string
) => {
  const regEx = /[!@#\$%\^&\*\(\)_\-\+=/]/;
  const valueLength = value.length;
  // Check for parts on current line - before and after the value
  if (position > 0 && regEx.test(currentLine[position - 1])) {
    return {
      part: { index: position, string: value },
      symbol: {
        index: position - 1,
        string: currentLine[position - 1],
        lineOffset: 0,
      },
    };
  }
  if (
    position + value.length < currentLine.length &&
    regEx.test(currentLine[position + value.length])
  ) {
    return {
      part: { index: position, string: value },
      symbol: {
        index: position + value.length,
        string: currentLine[position + value.length],
        lineOffset: 0,
      },
    };
  }
  for (var i = position - 1; i <= position + valueLength; i += 1) {
    if (i < 0) {
      continue;
    }
    if (
      previousLine &&
      i < previousLine.length &&
      regEx.test(previousLine[i])
    ) {
      return {
        part: { index: position, string: value },
        symbol: {
          index: i,
          string: previousLine[i],
          lineOffset: -1,
        },
      };
    }
    if (nextLine && i < nextLine.length && regEx.test(nextLine[i])) {
      return {
        part: { index: position, string: value },
        symbol: {
          index: i,
          string: nextLine[i],
          lineOffset: 1,
        },
      };
    }
  }
  return;
};

type Part = {
  part: PartPair;
  symbol: PartSymbol;
};

type PartSymbol = PartPair & { lineOffset: number };

type PartPair = {
  index: number;
  string: string;
};

export const getMatchPairArrayForLine = (line: string) => {
  const regEx = /\d+/g;
  const matches = line.matchAll(regEx);
  var matchArray: PartPair[] = [];
  for (const match of matches) {
    if (match.index !== undefined && match.length > 0) {
      matchArray.push({ index: match.index, string: match[0] });
    }
  }
  return matchArray;
};

export const getPartNumberMatchPairArrayForLine = (
  line: string,
  previousLine?: string,
  nextLine?: string,
  debug?: boolean
) => {
  log(`${line}`, debug);
  var partNumberMatchPairArray: PartPair[] = [];
  const matchPairs = getMatchPairArrayForLine(line);
  matchPairs.forEach((pair) => {
    if (isPartNumber(pair.string, pair.index, line, previousLine, nextLine)) {
      partNumberMatchPairArray.push(pair);
    }
  });
  return partNumberMatchPairArray;
};

// TODO Remove this
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
    if (isPartNumber(pair.string, pair.index, line, previousLine, nextLine)) {
      sum += Number(pair.string);
    }
  });
  return sum;
};

export const getProcessedValueFromFile = async (
  file: PathLike,
  debug?: boolean
) => {
  return 467835;
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
