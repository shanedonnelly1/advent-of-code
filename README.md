# Advent of code

## Setup new day

* Create new folder in folder advent-of-code

    ```bash
    cd ~/Documents/developments/repos/react-tests/advent-of-code
    mkdir day-xx
    cd day-xx
    ```

* Initialise an npm module

    ```bash
    npm init -y
    ```

* Add typescript and initialise it

    ```bash
    npm add typescript ts-node @types/node -D
    npx tsc --init
    ```

* Install jest and initialise it

    ```bash
    npm install jest @types/jest ts-jest -D
    npx ts-jest config:init
    ```

* Make sure we're still using node version 18 (we are using it for reading files line by line) as jest seems to overwrite it.

    ```bash
    nvm use 18.13.0
    ```

* Set the 'test' script in package.json

    ```json
    "scripts": {
        "test": "jest"
    },
    ```

* Create files from template

    ```bash
    cp ../index.01.ts .
    cp ../part1.ts .
    cp ../part1.test.ts .
    cp ../args.ts .    
    cp ../debug.ts .
    ```

* Run the index file

    ```bash
    npx ts-node index.01
    ```

* Run the test
