import { open } from "node:fs/promises";

const getFlagValueFromArgs = (flag: string, defaultValue: string | number) => {
  var flagValueFromArgs;
  const inputFlagIndex = process.argv.indexOf(flag);

  // Checks for -f and if it has a value
  if (inputFlagIndex > -1 && process.argv.length >= inputFlagIndex + 1) {
    // Retrieve the value after -f
    flagValueFromArgs = process.argv[inputFlagIndex + 1];
  }
  // If no value, return default.
  return flagValueFromArgs || defaultValue;
};

const getExpectedSum = () => {
  return Number(getFlagValueFromArgs("-e", 0));
};

const getFilePath = () => {
  return String(getFlagValueFromArgs("-f", "./input.txt"));
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

const processFile = async (expectedSum?: number) => {
  const file = getFilePath();
  const fileHandle = await open(file);

  var sum = 0;
  for await (const line of fileHandle.readLines()) {
    console.log(`${line}`);
    const { firstDigit, index: firstDigitIndex } = getFirstDigitAndIndex(line);
    if (firstDigit === undefined) {
      console.log("  No first digit found");
      continue;
    }
    console.log(
      `  First digit ${firstDigit} (found at index ${firstDigitIndex})`
    );
    const lastDigit = getLastDigit(line, firstDigitIndex);
    console.log(`  Last digit ${lastDigit}`);
    sum += Number(`${firstDigit}${lastDigit}`);
  }
  if (expectedSum && sum !== expectedSum) {
    console.error(`Expected sum ${expectedSum} but got ${sum}`);
  } else if (expectedSum && sum === expectedSum) {
    console.log(`Sum ${sum} as expected`);
  } else {
    console.log(`Sum ${sum}`);
  }
};

processFile(getExpectedSum());
