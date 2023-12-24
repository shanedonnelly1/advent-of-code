import { getCalibrationValueFromFile, getFirstDigitAndIndex } from "./part2";

// test("Calibration value from part2.input.362.txt to equal 362", async () => {
//   expect(await getCalibrationValueFromFile("./part2.input.362.txt")).toBe(362);
// });

// test("Calibration value from part2.input.281.txt to equal 281", async () => {
//   expect(await getCalibrationValueFromFile("./part2.input.281.txt")).toBe(281);
// });

test("Get first digit and index for two1nine is equal to 2 and 0", () => {
  expect(getFirstDigitAndIndex("two1nine")).toStrictEqual({
    firstDigit: 2,
    index: 0,
  });
});

test("Get first digit and index for eightwothree is equal to 8 and 0", () => {
  expect(getFirstDigitAndIndex("eightwothree")).toStrictEqual({
    firstDigit: 8,
    index: 0,
  });
});

test("Get first digit and index for zeightwothree is equal to 8 and 1", () => {
  expect(getFirstDigitAndIndex("zeightwothree")).toStrictEqual({
    firstDigit: 8,
    index: 1,
  });
});

test("Get first digit and index for twonethree is equal to 2 and 0", () => {
  expect(getFirstDigitAndIndex("twonethree")).toStrictEqual({
    firstDigit: 2,
    index: 0,
  });
});
