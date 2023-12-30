import { getPossibleGameValueFromFile } from "./part1";
import { getFilePath, getExpectedValue, getDebug } from "./args";

const expectedValue = getExpectedValue();
(async () => {
  const possibleGameValue = await getPossibleGameValueFromFile(
    getFilePath(),
    getDebug()
  );
  if (expectedValue && possibleGameValue !== expectedValue) {
    console.error(
      `Expected value ${expectedValue} but got ${possibleGameValue}`
    );
  } else if (expectedValue && possibleGameValue === expectedValue) {
    console.log(`Value ${possibleGameValue} as expected`);
  } else {
    console.log(`Value ${possibleGameValue}`);
  }
})();
