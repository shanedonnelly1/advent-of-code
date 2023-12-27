export const log = (logMessage: string, debug?: boolean) => {
  if (debug) {
    console.log(logMessage);
  }
};
