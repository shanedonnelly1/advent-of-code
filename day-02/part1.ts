import { open } from "node:fs/promises";
import { PathLike } from "node:fs";
import { log } from "../shared/debug";
import { machine } from "node:os";

const getFirstDigitAndIndex = (line: string) => {
  for (var i = 0; i < line.length; i++) {
    if (!isNaN(Number(line.charAt(i)))) {
      const firstDigit = Number(line.charAt(i));
      const firstDigitIndex = i;
      return { firstDigit: firstDigit, index: firstDigitIndex };
    }
  }
  return { firstDigit: undefined, index: undefined };
};

const getLastDigit = (line: string, endPoint: number) => {
  // We have found a digit, so we know we we have at least one.  Worst case we
  // will get the last number being the same as first - line.charAt(endPoint)
  for (var i = line.length - 1; i > endPoint; i--) {
    //   console.log(`i === ${i}, endpoint === ${endPoint}`);
    if (!isNaN(Number(line.charAt(i)))) {
      return Number(line.charAt(i));
    }
  }
  return Number(line.charAt(endPoint));
};

export const isCubeChoicePossible = (
  cube: "red" | "green" | "blue",
  count: Number
) => {
  var maxCubes: Number;
  switch (cube) {
    case "red":
      maxCubes = 12;
      break;
    case "green":
      maxCubes = 13;
      break;
    default:
      maxCubes = 14;
  }
  return count <= maxCubes;
};

export const isCubeSetPossible = (cubeSet: CubeSet) => {
  const isRedCubeChoicePossible =
    cubeSet.red === undefined || isCubeChoicePossible("red", cubeSet.red);
  const isGreenCubeChoicePossible =
    cubeSet.green === undefined || isCubeChoicePossible("green", cubeSet.green);
  const isBlueCubeChoicePossible =
    cubeSet.blue === undefined || isCubeChoicePossible("blue", cubeSet.blue);
  return (
    isRedCubeChoicePossible &&
    isGreenCubeChoicePossible &&
    isBlueCubeChoicePossible
  );
};

export const getPossibleGameValueFromLine = (line: string, debug?: boolean) => {
  log(`${line}`, debug);
  const { firstDigit, index: firstDigitIndex } = getFirstDigitAndIndex(line);
  if (firstDigit === undefined) {
    log("  No first digit found", debug);
    return 0;
  }
  log(`  First digit ${firstDigit} (found at index ${firstDigitIndex})`, debug);
  const lastDigit = getLastDigit(line, firstDigitIndex);
  log(`  Last digit ${lastDigit}`, debug);
  return Number(`${firstDigit}${lastDigit}`);
};

type CubeSet = {
  red?: Number;
  green?: Number;
  blue?: Number;
};

type GameRow = {
  game: Number;
  sets: CubeSet[];
};

const getCubeSetFromString = (cubeString: string) => {
  const regex = /(,?\s?(\d*)\s*(?:blue|green|red))/gm;
  const matches = cubeString.matchAll(regex);
  var cubeSet: CubeSet = {};
  for (const match of matches) {
    const num = Number(match[2]);
    if (match[0].includes("blue") && !isNaN(num)) {
      cubeSet.blue = num;
    } else if (match[0].includes("green") && !isNaN(num)) {
      cubeSet.green = num;
    } else if (match[0].includes("red") && !isNaN(num)) {
      cubeSet.red = num;
    }
  }
  return cubeSet;
};

export const parseGameRow = (line: string) => {
  // Split to get game
  const gamePlusSets = line.split(":");
  const game = Number(gamePlusSets[0].trim().substring(5));
  const setsString = gamePlusSets[1].trim().split(";");
  const sets: CubeSet[] = [];
  setsString.forEach((s) => {
    const cubeSet = getCubeSetFromString(s);
    // TODO Clear out empty cubesets
    sets.push(cubeSet);
  });

  return {
    game: game,
    sets: sets,
  };
};

export const getPossibleGameValueFromFile = async (
  file: PathLike,
  debug?: boolean
) => {
  var sum = 0;
  const fileHandle = await open(file);
  for await (const line of fileHandle.readLines()) {
    const gameRow = parseGameRow(line);
    // gameRow.sets.forEach((c) => {
    //   console.log(isCubeSetPossible(c));
    // });
    const impossibleCubeSet = gameRow.sets.some((c) => !isCubeSetPossible(c));
    if (!impossibleCubeSet) {
      sum += gameRow.game;
      log(`  Game is possible for Game ${gameRow.game}`, debug);
    }
  }
  return sum;
};
