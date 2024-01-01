import { open } from "node:fs/promises";
import { PathLike } from "node:fs";
import { log } from "../shared/debug";

const convertStringToNumber = (string: string) => {
  return string
    .replace("one", "1")
    .replace("two", "2")
    .replace("three", "3")
    .replace("four", "4")
    .replace("five", "5")
    .replace("six", "6")
    .replace("seven", "7")
    .replace("eight", "8")
    .replace("nine", "9");
};

const getMatchingSubstring = (
  line: string,
  startIndex: number,
  endIndex: number
) => {
  const sub = line.substring(startIndex, endIndex + 1);
  return [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ].find((n) => (startIndex === 0 ? sub.endsWith(n) : sub.startsWith(n)));
};

const matchingSubstring = (
  line: string,
  startIndex: number,
  endIndex: number
) => {
  if (endIndex - startIndex < 2) {
    return false;
  }
  const sub = line.substring(startIndex, endIndex + 1);
  // console.log(`  index: ${endIndex}`);
  // console.log(`  sub: ${sub}`);
  const out = line
    .substring(startIndex, endIndex + 1)
    .toLocaleLowerCase()
    .replace("one", "1")
    .replace("two", "2")
    .replace("six", "6")
    .replace("four", "4")
    .replace("five", "5")
    .replace("nine", "9")
    .replace("three", "3")
    .replace("seven", "7")
    .replace("eight", "8");

  // console.log(`  out: ${out}`);
  if (out.length !== sub.length) {
    return true;
  }
  return false;
};

export const getFirstDigitAndIndex = (line: string) => {
  for (var i = 0; i < line.length; i++) {
    if (!isNaN(Number(line.charAt(i)))) {
      const firstDigit = Number(line.charAt(i));
      const firstDigitIndex = i;
      return { firstDigit: firstDigit, index: firstDigitIndex };
    } else if (matchingSubstring(line, 0, i)) {
      const match = getMatchingSubstring(line, 0, i);
      if (match) {
        return {
          firstDigit: Number(convertStringToNumber(match)),
          index: i - match.length + 1,
        };
      }
    }
  }
  return { firstDigit: undefined, index: undefined };
};

export const getLastDigit = (line: string, endPoint: number) => {
  // We have found a digit, so we know we we have at least one.  Worst case we
  // will get the last number being the same as first - line.charAt(endPoint)
  for (var i = line.length - 1; i > endPoint; i--) {
    //   console.log(`i === ${i}, endpoint === ${endPoint}`);
    if (!isNaN(Number(line.charAt(i)))) {
      return Number(line.charAt(i));
    } else if (matchingSubstring(line, i, line.length)) {
      const match = getMatchingSubstring(line, i, line.length);
      if (match) {
        // console.log(
        //   `  match: '${match}' - Number(convertStringToNumber(match)): ${Number(
        //     convertStringToNumber(match)
        //   )}`
        // );
        return Number(convertStringToNumber(match));
      }
    }
  }
  return Number(line.charAt(endPoint));
};

export const getCalibrationValueFromLine = (line: string, debug?: boolean) => {
  log(`${line}`, debug);
  const { firstDigit, index: firstDigitIndex } = getFirstDigitAndIndex(line);
  if (firstDigit === undefined) {
    log("  No first digit found", debug);
    return 0;
  }
  log(`  First digit ${firstDigit} (found at index ${firstDigitIndex})`, debug);
  const lastDigit = getLastDigit(line, firstDigitIndex);
  log(`  Last digit ${lastDigit}`, debug);
  return Number(`${firstDigit}${lastDigit}`);
};

export const getCalibrationValueFromFile = async (
  file: PathLike,
  debug?: boolean
) => {
  var sum = 0;
  const fileHandle = await open(file);
  for await (const line of fileHandle.readLines()) {
    const value = getCalibrationValueFromLine(line, debug);
    log(`  Line value ${value}`, debug);
    sum += value;
  }
  return sum;
};
