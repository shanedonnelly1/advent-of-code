import { getCalibrationValueFromFile } from "./part1";
import { getFilePath, getExpectedValue, getDebug } from "./args";

const expectedValue = getExpectedValue();
(async () => {
  const calibrationValue = await getCalibrationValueFromFile(
    getFilePath(),
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
