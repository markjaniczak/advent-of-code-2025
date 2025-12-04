const fs = require("fs");
const path = require("path");

const FILE_PATH = process.argv[2];
const IS_PART_TWO = process.argv[3] === "true";

const rolls = fs.readFileSync(path.join(__dirname, FILE_PATH), "utf-8").trim();

/**
 *
 * @param {string} rolls
 */
function solution(rolls, isPartTwo = false) {
  console.time("solution-time");

  const map = new Map();

  const cells = rolls.split("\n").map((row) => row.split(""));

  for (let i = 0; i < cells.length; i++) {
    const columns = cells[i];

    for (let j = 0; j < columns.length; j++) {
      const cell = columns[j];

      if (cell === "@") {
        map.set(`${i},${j}`, [i, j]);
      }
    }
  }

  let total = 0;
  let canRemove = true;

  while (canRemove) {
    canRemove = false;

    for (const [cell, [row, col]] of map.entries()) {
      const neighbors = [
        [row - 1, col - 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row, col - 1],
        [row, col + 1],
        [row + 1, col - 1],
        [row + 1, col],
        [row + 1, col + 1],
      ];

      let adjacentCount = 0;

      for (let i = 0; i < neighbors.length; i++) {
        const [nRow, nCol] = neighbors[i];

        if (map.has(`${nRow},${nCol}`)) {
          adjacentCount += 1;
        }
      }

      if (adjacentCount < 4) {
        total += 1;
        if (isPartTwo) {
          map.delete(cell);
          canRemove = true;
        }
      }
    }
  }

  console.timeEnd("solution-time");

  return total;
}

console.log(solution(rolls, IS_PART_TWO));
