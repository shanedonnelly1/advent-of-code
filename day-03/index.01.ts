import { getProcessedValueFromFile } from "./part1";
import { getFilePath, getExpectedValue, getDebug } from "../shared/args";

const expectedValue = getExpectedValue();
(async () => {
  const calibrationValue = await getProcessedValueFromFile(
    getFilePath("./day-03"),
    getDebug()
  );
  if (expectedValue && calibrationValue !== expectedValue) {
    console.error(
      `Expected value ${expectedValue} but got ${calibrationValue}`
    );
  } else if (expectedValue && calibrationValue === expectedValue) {
    console.log(`Value ${calibrationValue} as expected`);
  } else {
    console.log(`Value ${calibrationValue}`);
  }
})();
