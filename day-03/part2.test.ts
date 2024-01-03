import {
  getPart,
  getPartNumberMatchPairArrayForLine,
  getProcessedValueFromFile,
  isPartNumber,
} from "./part2";

test("Processed value from part2.input.467835.txt to equal 467835", async () => {
  expect(
    await getProcessedValueFromFile("./day-03/data/part2.input.467835.txt")
  ).toBe(467835);
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

test("Get part number for line", () => {
  expect(
    getPartNumberMatchPairArrayForLine("..35..633.", "...*......", "......#...")
  ).toStrictEqual([
    { index: 2, string: "35" },
    { index: 6, string: "633" },
  ]);
  expect(
    getPartNumberMatchPairArrayForLine("467..114..", undefined, "...*......")
  ).toStrictEqual([{ index: 0, string: "467" }]);
});

test("Get part objects", () => {
  expect(
    getPart("35", 2, "..35......", "...*......", "..........")
  ).toStrictEqual({
    part: { index: 2, string: "35" },
    symbol: { index: 3, string: "*", lineOffset: -1 },
  });
  expect(
    getPart("467", 0, "467..114..", undefined, "...*......")
  ).toStrictEqual({
    part: { index: 0, string: "467" },
    symbol: { index: 3, string: "*", lineOffset: 1 },
  });
});
