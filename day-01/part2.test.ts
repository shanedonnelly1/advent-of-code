import {
  getCalibrationValueFromFile,
  getCalibrationValueFromLine,
  getFirstDigitAndIndex,
  getLastDigit,
} from "./part2";

// test("Calibration value from part2.input.362.txt to equal 362", async () => {
//   expect(await getCalibrationValueFromFile("./part2.input.362.txt")).toBe(362);
// });

// test("Calibration value from part2.input.281.txt to equal 281", async () => {
//   expect(await getCalibrationValueFromFile("./part2.input.281.txt")).toBe(281);
// });

// test("Get first digit and index for two1nine is equal to 2 and 0", () => {
//   expect(getFirstDigitAndIndex("two1nine")).toStrictEqual({
//     firstDigit: 2,
//     index: 0,
//   });
// });

// test("Get last digit for two1nine is equal to 9", () => {
//   expect(getLastDigit("two1nine", 0)).toBe(9);
// });

// test("Get first digit and index for eightwothree is equal to 8 and 0", () => {
//   expect(getFirstDigitAndIndex("eightwothree")).toStrictEqual({
//     firstDigit: 8,
//     index: 0,
//   });
// });

// test("Get first digit and index for zeightwothree is equal to 8 and 1", () => {
//   expect(getFirstDigitAndIndex("zeightwothree")).toStrictEqual({
//     firstDigit: 8,
//     index: 1,
//   });
// });

// test("Get first digit and index for twonethree is equal to 2 and 0", () => {
//   expect(getFirstDigitAndIndex("twonethree")).toStrictEqual({
//     firstDigit: 2,
//     index: 0,
//   });
// });

// test("Get calibration value for line two1nine is equal to 29", () => {
//   expect(getCalibrationValueFromLine("two1nine")).toBe(29);
// });
// test("Get calibration value for line eightwothree is equal to 83", () => {
//   expect(getCalibrationValueFromLine("eightwothree")).toBe(83);
// });
// test("Get calibration value for line abcone2threexyz is equal to 13", () => {
//   expect(getCalibrationValueFromLine("abcone2threexyz")).toBe(13);
// });
// test("Get calibration value for line xtwone3four is equal to 24", () => {
//   expect(getCalibrationValueFromLine("xtwone3four")).toBe(24);
// });
// test("Get calibration value for line 4nineeightseven2 is equal to 42", () => {
//   expect(getCalibrationValueFromLine("4nineeightseven2")).toBe(42);
// });
// test("Get calibration value for line zoneight234 is equal to 14", () => {
//   expect(getCalibrationValueFromLine("zoneight234")).toBe(14);
// });
// test("Get calibration value for line 7pqrstsixteen is equal to 76", () => {
//   expect(getCalibrationValueFromLine("7pqrstsixteen")).toBe(76);
// });
// test("Get calibration value for line 85ntwonexlm is equal to 81", () => {
//   expect(getCalibrationValueFromLine("85ntwonexlm")).toBe(81);
// });

test("Get last digit for seven8one is equal to 1", () => {
  expect(getLastDigit("seven8one", 0)).toBe(1);
});

test("Get calibration value for line seven8one is equal to 71", () => {
  expect(getCalibrationValueFromLine("seven8one")).toBe(71);
});
