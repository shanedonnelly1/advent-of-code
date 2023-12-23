// console.log("First digit");
// console.log("Last digit");
// console.log("Calibration value - single, 2 digit number");

import { open } from "node:fs/promises";

(async () => {
  const file = await open("./input.txt");

  var sum = 0;
  for await (const line of file.readLines()) {
    var endPoint = 0,
      firstDigit,
      lastDigit;
    console.log(`${line}`);
    // Get first digit
    for (var i = 0; i < line.length; i++) {
      //   console.log(`  ${line.charAt(i)}`);
      if (!isNaN(Number(line.charAt(i)))) {
        firstDigit = Number(line.charAt(i));
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
    console.log(`  value === ${firstDigit}${lastDigit}`);
    sum += Number(`${firstDigit}${lastDigit}`);
    firstDigit = undefined;
    lastDigit = undefined;
  }
  console.log(`sum === ${sum}`);
})();

// 281
