import { getProcessedValueFromFile, isPartNumber } from "./part1";

test("Processed value from input.txt to equal 0", async () => {
  expect(await getProcessedValueFromFile("./day-03/data/input.txt")).toBe(0);
});

test("Values that are part numbers", () => {
  expect(
    // Previous line match above for 2 digit
    isPartNumber("35", 2, "..35..633.", "...*......", "..........")
  ).toBeTruthy();
  expect(
    // Previous line match diagonally before for 2 digit
    isPartNumber("35", 2, "..35..633.", ".*........", "..........")
  ).toBeTruthy();
  expect(
    // Previous line match diagonally after for 2 digit
    isPartNumber("35", 2, "..35..633.", "....*.....", "..........")
  ).toBeTruthy();
  expect(
    // Previous line match above for 2 digit at start of list
    isPartNumber("35", 0, "35........", "*.........", "..........")
  ).toBeTruthy();
  expect(
    // Previous line match above for 2 digit at end of list
    isPartNumber("35", 9, "........35", ".........*", "..........")
  ).toBeTruthy();
  expect(
    // Previous line being undefined, but next matches diagonally after
    isPartNumber("35", 2, "..35..633.", undefined, ".*........")
  ).toBeTruthy();
  expect(
    // Next line being undefined, but previous matches diagonally after
    isPartNumber("35", 2, "..35..633.", "....*.....", undefined)
  ).toBeTruthy();
});

test("Values that are not a part numbers", () => {
  expect(
    isPartNumber("58", 7, ".....+.58.", "617*......", "..592.....")
  ).toBeFalsy();
  expect(
    // Previous line being undefined
    isPartNumber("35", 2, "..35..633.", undefined, "..........")
  ).toBeFalsy();
  expect(
    // Next line being undefined
    isPartNumber("35", 2, "..35..633.", "..........", undefined)
  ).toBeFalsy();
});
