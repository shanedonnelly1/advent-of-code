import { powerOfMinSetSumFromFile } from "./part2";
import { getFilePath, getExpectedValue, getDebug } from "../shared/args";

const expectedValue = getExpectedValue();
(async () => {
  const power = await powerOfMinSetSumFromFile(getFilePath(), getDebug());
  if (expectedValue && power !== expectedValue) {
    console.error(`Expected value ${expectedValue} but got ${power}`);
  } else if (expectedValue && power === expectedValue) {
    console.log(`Value ${power} as expected`);
  } else {
    console.log(`Value ${power}`);
  }
})();
