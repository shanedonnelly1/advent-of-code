# Advent of code

## Setup new day

* Create new folder in folder advent-of-code

    ```bash
    cd ~/Documents/developments/repos/react-tests/advent-of-code
    mkdir day-xx
    cd day-xx
    ```

* Create files from template (day-xx)

    ```bash
    cp ../day-xx/index.01.ts .
    cp ../day-xx/part1.* .
    cp ../day-xx/input.txt
    ```

* Change all references to day-xx in new directory to the current day.

* Run the index file

    ```bash
    cd ~/Documents/developments/repos/react-tests/advent-of-code
    npx ts-node day-xx/index.01
    ```

* Run the tests

    ```bash
    npx jest
    ```
