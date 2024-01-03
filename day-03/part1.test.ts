import {
  getMatchPairArrayForLine,
  getPartNumberSumForLine,
  getProcessedValueFromFile,
  isPartNumber,
} from "./part1";

test("Processed value from input.txt to equal 0", async () => {
  expect(await getProcessedValueFromFile("./day-03/data/input.txt")).toBe(
    532428
  );
});

test("Processed value from part1.input.4361.txt to equal 4361", async () => {
  expect(
    await getProcessedValueFromFile("./day-03/data/part1.input.4361.txt")
  ).toBe(4361);
});

test("Values that are part numbers", () => {
  expect(
    // Previous line match above for 2 digit
    isPartNumber("35", 2, "..35......", "...*......", "..........")
  ).toBeTruthy();
  expect(
    // Previous line match diagonally before for 2 digit
    isPartNumber("35", 2, "..35......", ".*........", "..........")
  ).toBeTruthy();
  expect(
    // Previous line match diagonally after for 2 digit
    isPartNumber("35", 2, "..35......", "....*.....", "..........")
  ).toBeTruthy();
  expect(
    // Previous line match above for 2 digit at start of list
    isPartNumber("35", 0, "35........", "*.........", "..........")
  ).toBeTruthy();
  expect(
    // Previous line match above for 2 digit at end of list
    isPartNumber("35", 8, "........35", ".........*", "..........")
  ).toBeTruthy();
  expect(
    // Previous line being undefined, but next matches diagonally after
    isPartNumber("35", 2, "..35......", undefined, ".*........")
  ).toBeTruthy();
  expect(
    // Next line being undefined, but previous matches diagonally after
    isPartNumber("35", 2, "..35......", "....*.....", undefined)
  ).toBeTruthy();
  expect(
    // Test for part numbers with symbols on the same line
    isPartNumber("35", 2, "..35+.....", "..........", undefined)
  ).toBeTruthy();
  expect(
    // Test for part numbers with symbols on the same line
    isPartNumber("35", 2, ".+35......", "..........", undefined)
  ).toBeTruthy();
  expect(
    // Previous line match above for 2 digit
    isPartNumber("35", 2, "..35......", ".../......", "..........")
  ).toBeTruthy();
});

test("Values that are not a part numbers", () => {
  expect(isPartNumber("58", 7, "617*......", "..592.....")).toBeFalsy();
  expect(
    // Previous line being undefined
    isPartNumber("35", 2, "..35......", undefined, "..........")
  ).toBeFalsy();
  expect(
    // Next line being undefined
    isPartNumber("35", 2, "..35......", "..........", undefined)
  ).toBeFalsy();
});

test("Get possible numbers for line", () => {
  expect(getMatchPairArrayForLine("..35..633.")).toStrictEqual([
    { index: 2, string: "35" },
    { index: 6, string: "633" },
  ]);
  expect(getMatchPairArrayForLine("467..114..")).toStrictEqual([
    { index: 0, string: "467" },
    { index: 5, string: "114" },
  ]);
});

test("Get part number sum for line", () => {
  expect(
    getPartNumberSumForLine("..35..633.", "...*......", "......#...")
  ).toBe(668);
  expect(getPartNumberSumForLine("467..114..", undefined, "...*......")).toBe(
    467
  );
});
