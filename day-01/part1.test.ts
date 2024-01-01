import { getCalibrationValueFromFile } from "./part1";

test("Calibration value from part1.input.294.txt to equal 294", async () => {
  expect(
    await getCalibrationValueFromFile("./day-01/part1.input.294.txt")
  ).toBe(294);
});

test("Calibration value from part1.input.142.txt to equal 142", async () => {
  expect(
    await getCalibrationValueFromFile("./day-01/part1.input.142.txt")
  ).toBe(142);
});

test("Calibration value from input.full.txt to equal 54951", async () => {
  expect(await getCalibrationValueFromFile("./day-01/input.txt")).toBe(54951);
});
