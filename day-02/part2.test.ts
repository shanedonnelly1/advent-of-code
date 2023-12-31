import { parse } from "path";
import {
  getMinCubeSetForCubeSets,
  parseGameRow,
  powerOfMinSetForGameRowString,
} from "./part2";

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
});

test("Power of minimum set of cubes for game row 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green' is 48", () => {
  expect(
    powerOfMinSetForGameRowString(
      "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
    )
  ).toBe(48);
});

test("Power of minimum set of cubes for game row 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue' is 12", () => {
  expect(
    powerOfMinSetForGameRowString(
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
    )
  ).toBe(12);
});

test("Minimum cubeset for game line 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green' is 4 red, 2 green and 6 blue", () => {
  const gameRow = parseGameRow(
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
  );
  expect(getMinCubeSetForCubeSets(gameRow.sets)).toStrictEqual({
    red: 4,
    green: 2,
    blue: 6,
  });
});

test("Minimum cubeset for game line 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue' is 1 red, 3 green and 4 blue", () => {
  const gameRow = parseGameRow(
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
  );
  expect(getMinCubeSetForCubeSets(gameRow.sets)).toStrictEqual({
    red: 1,
    green: 3,
    blue: 4,
  });
});
