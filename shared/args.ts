const getFlagValueFromArgs = (flag: string, defaultValue: string | number) => {
  var flagValueFromArgs;
  const inputFlagIndex = process.argv.indexOf(flag);

  // Checks for flag in argv and to see if a value is provided
  if (inputFlagIndex > -1 && process.argv.length >= inputFlagIndex + 1) {
    // Retrieve the value after flag
    flagValueFromArgs = process.argv[inputFlagIndex + 1];
  }
  // If no value, return default.
  return flagValueFromArgs || defaultValue;
};

export const getExpectedValue = () => {
  return Number(getFlagValueFromArgs("-e", 0));
};

export const getFilePath = (currentPath: string = ".") => {
  return String(getFlagValueFromArgs("-f", `${currentPath}/data/input.txt`));
};

export const getDebug = () => {
  const stringValue = String(getFlagValueFromArgs("-d", "false"));
  if (stringValue.toLowerCase() === "true") {
    return true;
  }
  return false;
};
