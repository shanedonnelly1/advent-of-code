import { getCalibrationValueFromFile } from "./part2";
import { getFilePath, getExpectedValue, getDebug } from "../shared/args";

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

/*
import { open } from "node:fs/promises";

// const getLineWithoutNumberWords = (line: string) => {
//   if (line.length < 3) {
//     return line;
//   }
//   var processLine = line.toLocaleLowerCase();
//   if (line.length < 6) {
//     return processLine
//       .replace("one", "1")
//       .replace("two", "2")
//       .replace("six", "6")
//       .replace("four", "4")
//       .replace("five", "5")
//       .replace("nine", "9")
//       .replace("three", "3")
//       .replace("seven", "7")
//       .replace("eight", "8");
//   }

//   var out;
//   for (var i = 4; i < processLine.length; i++) {
//     const sub = processLine.substring(0, i + 1);
//     console.log(`  - sub: ${sub}`);
//     out = sub
//       .replace("one", "1")
//       .replace("two", "2")
//       .replace("six", "6")
//       .replace("four", "4")
//       .replace("five", "5")
//       .replace("nine", "9")
//       .replace("three", "3")
//       .replace("seven", "7")
//       .replace("eight", "8");
//     if (out.length !== sub.length) {
//       processLine = out + processLine.substring(i + 1);
//       i -= 2;
//     }
//   }
//   return processLine;
// };

const containsNumber = (subString: string) => {
  if (subString.length < 3) {
    return false;
  }
  const out = subString
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
  if (subString.length !== out.length) {
    console.log(`out: ${subString} !== ${out}`);
  }
  return subString.length !== out.length;
};

const replaceNumber = (subString: string) => {
  if (subString.length < 3) {
    return subString;
  }
  return subString
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
};

(async () => {
  const file = await open("./input.txt");

  var sum = 0;
  for await (const line of file.readLines()) {
    var endPoint = 0,
      firstDigit,
      lastDigit;
    console.log(`  ${line}`);
    // Get first digit
    for (var i = 0; i < line.length; i++) {
      // Here, we need to check for substring too
      //   console.log(`  ${line.charAt(i)}`);
      const replacedSubString = replaceNumber(line.substring(0, i + 1));
      if (
        !isNaN(Number(line.charAt(i))) ||
        line.charAt(i).length !== replacedSubString.length
      ) {
        if (!isNaN(Number(line.charAt(i)))) {
          firstDigit = Number(line.charAt(i));
        } else {
          // firstDigit = getNumberFromString(line, i)
        }
        // console.log(`  first: ${firstDigit} found at ${i}`);
        endPoint = i;
        break;
      }
    }
    // Check to see if we found a firstDigit.  If not, there will be no last digit.
    if (firstDigit === undefined) {
      console.log("No first digit found");
      continue;
    }
    // We have found a digit, so we know we we have at least one.  Worst case we
    // will get the last number being the same as first - line.charAt(endPoint)
    for (var i = line.length - 1; i >= endPoint; i--) {
      //   console.log(`i === ${i}, endpoint === ${endPoint}`);
      if (!isNaN(Number(line.charAt(i)))) {
        lastDigit = Number(line.charAt(i));
        break;
      }
    }
    console.log(`  value: ${firstDigit}${lastDigit}`);
    sum += Number(`${firstDigit}${lastDigit}`);
    firstDigit = undefined;
    lastDigit = undefined;
  }
  console.log(`sum: ${sum}`);
})();

// 281 + 81 = 362
*/
