import { getProcessedValueFromFile } from "./part1";

test("Processed value from input.txt to equal 0", async () => {
  expect(await getProcessedValueFromFile("./day-xx/data/input.txt")).toBe(0);
});
