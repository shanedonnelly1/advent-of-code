import {
  getPossibleGameValueFromFile,
  isCubeChoicePossible,
  isCubeSetPossible,
  parseGameRow,
} from "./part1";

test("Possible game value from input.txt to equal 8", async () => {
  expect(await getPossibleGameValueFromFile("./part1.input.8.txt")).toBe(8);
});

test("Possible game for all items in part1.input.8.txt", () => {
  expect(isCubeSetPossible({ red: 20, green: 8, blue: 6 })).toBeFalsy();
});

test("Possible game value from input.txt to equal 9", async () => {
  expect(await getPossibleGameValueFromFile("./part1.input.9.txt")).toBe(9);
});

// test("Possible game value from 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green' to equal 1", () => {
//   expect(
//     getPossibleGameValueFromLine(
//       "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
//     )
//   ).toBe(1);
// });

test("Is cube choice possible for 3 red cube to be truthy", () => {
  expect(isCubeChoicePossible("red", 3)).toBeTruthy();
});

test("Is cube choice possible for 12 red cube to be truthy", () => {
  expect(isCubeChoicePossible("red", 12)).toBeTruthy();
});

test("Is cube choice possible for 13 red cube to be falsey", () => {
  expect(isCubeChoicePossible("red", 13)).toBeFalsy();
});

test("Is cube choice possible for 3 green cube to be truthy", () => {
  expect(isCubeChoicePossible("green", 3)).toBeTruthy();
});

test("Is cube choice possible for 13 green cube to be truthy", () => {
  expect(isCubeChoicePossible("green", 13)).toBeTruthy();
});

test("Is cube choice possible for 14 green cube to be falsey", () => {
  expect(isCubeChoicePossible("green", 14)).toBeFalsy();
});

test("Is cube choice possible for 3 blue cube to be truthy", () => {
  expect(isCubeChoicePossible("blue", 3)).toBeTruthy();
});

test("Is cube choice possible for 14 blue cube to be truthy", () => {
  expect(isCubeChoicePossible("blue", 14)).toBeTruthy();
});

test("Is cube choice possible for 15 blue cube to be falsey", () => {
  expect(isCubeChoicePossible("blue", 15)).toBeFalsy();
});

test("Is cube set possible for 1 red, 2 green, 6 blue to be truthy", () => {
  expect(isCubeSetPossible({ red: 1, green: 2, blue: 6 })).toBeTruthy();
});

test("Is cube set possible for 13 red, 2 green, 6 blue to be falsey", () => {
  expect(isCubeSetPossible({ red: 13, green: 2, blue: 6 })).toBeFalsy();
});

test("Is cube set possible for 1 red, 14 green, 6 blue to be falsey", () => {
  expect(isCubeSetPossible({ red: 1, green: 14, blue: 6 })).toBeFalsy();
});

test("Is cube set possible for 1 red, 2 green, 15 blue to be falsey", () => {
  expect(isCubeSetPossible({ red: 1, green: 2, blue: 15 })).toBeFalsy();
});

test("Is cube set possible for 3 blue, 4 red to be truthy", () => {
  expect(isCubeSetPossible({ red: 4, blue: 3 })).toBeTruthy();
});

test("Is cube set possible for 15 blue, 4 red to be falsey", () => {
  expect(isCubeSetPossible({ red: 4, blue: 15 })).toBeFalsy();
});

test("Does game row parse correctly", () => {
  expect(
    parseGameRow(
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
    )
  ).toStrictEqual({
    game: 2,
    sets: [
      { green: 2, blue: 1 },
      { red: 1, green: 3, blue: 4 },
      { green: 1, blue: 1 },
    ],
  });
  expect(
    parseGameRow(
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
    )
  ).toStrictEqual({
    game: 3,
    sets: [
      { green: 8, blue: 6, red: 20 },
      { blue: 5, red: 4, green: 13 },
      { green: 5, red: 1 },
    ],
  });
  expect(
    parseGameRow("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green")
  ).toStrictEqual({
    game: 5,
    sets: [
      { red: 6, green: 3, blue: 1 },
      { red: 1, green: 2, blue: 2 },
    ],
  });
});
