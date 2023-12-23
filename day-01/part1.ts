import { open } from "node:fs/promises";
import { PathLike } from "node:fs";

const getFlagValueFromArgs = (flag: string, defaultValue: string | number) => {
  var flagValueFromArgs;
  const inputFlagIndex = process.argv.indexOf(flag);

  // Checks for flag in argv and to see if a value is provided
  if (inputFlagIndex > -1 && process.argv.length >= inputFlagIndex + 1) {
    // Retrieve the value after flag
    flagValueFromArgs = process.argv[inputFlagIndex + 1];
  }
  // If no value, return default.
  return flagValueFromArgs || defaultValue;
};

const getExpectedValue = () => {
  return Number(getFlagValueFromArgs("-e", 0));
};

const getFilePath = () => {
  return String(getFlagValueFromArgs("-f", "./input.txt"));
};

const getDebug = () => {
  const stringValue = String(getFlagValueFromArgs("-d", "false"));
  if (stringValue.toLowerCase() === "true") {
    return true;
  }
  return false;
};

const getFirstDigitAndIndex = (line: string) => {
  for (var i = 0; i < line.length; i++) {
    if (!isNaN(Number(line.charAt(i)))) {
      const firstDigit = Number(line.charAt(i));
      const firstDigitIndex = i;
      return { firstDigit: firstDigit, index: firstDigitIndex };
    }
  }
  return { firstDigit: undefined, index: undefined };
};

const getLastDigit = (line: string, endPoint: number) => {
  // We have found a digit, so we know we we have at least one.  Worst case we
  // will get the last number being the same as first - line.charAt(endPoint)
  for (var i = line.length - 1; i > endPoint; i--) {
    //   console.log(`i === ${i}, endpoint === ${endPoint}`);
    if (!isNaN(Number(line.charAt(i)))) {
      return Number(line.charAt(i));
    }
  }
  return Number(line.charAt(endPoint));
};

const log = (logMessage: string, debug?: boolean) => {
  if (debug) {
    console.log(logMessage);
  }
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

const expectedValue = getExpectedValue();
(async () => {
  const calibrationValue = await getCalibrationValueFromFile(
    getFilePath(),
    getDebug()
  );
  if (expectedValue && calibrationValue !== expectedValue) {
    console.error(
      `Expected value ${expectedValue} but got ${calibrationValue}`
    );
  } else if (expectedValue && calibrationValue === expectedValue) {
    console.log(`Value ${calibrationValue} as expected`);
  } else {
    console.log(`Value ${calibrationValue}`);
  }
})();
