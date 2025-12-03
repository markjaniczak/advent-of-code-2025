const fs = require("fs");
const path = require("path");

const FILE_PATH = process.argv[2];

const BANKS = fs
  .readFileSync(path.join(__dirname, FILE_PATH), "utf-8")
  .trim()
  .split("\n");

function findHighestPair(joltages) {
  const digits = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];

    const map = {};

  for (let i = 0; i < joltages.length; i++) {
    const digit = joltages[i];

    if (!map[digit]) {
      map[digit] = [];
    }

    map[digit].push(i);
  }

  for (let i = 0; i < digits.length; i++) {
    const highDigit = digits[i];

    if (!map[highDigit]) {
      continue;
    }

    for (const leftIndex of map[highDigit]) {
      for (let j = 0; j < digits.length; j++) {
        const lowDigit = digits[j];

        if (!map[lowDigit]) {
          continue;
        }

        const indexes = map[lowDigit];

        const right = indexes[indexes.length - 1];

        if (right < leftIndex) {
          continue;
        }

        for (const rightIndex of indexes) {
          if (rightIndex > leftIndex) {
            return parseInt(highDigit + lowDigit, 10);
          }
        }
      }
    }
  }
}

function solution(banks) {
  let total = 0;

  for (const bank of banks) {
    const joltages = bank.split("");
    total += findHighestPair(joltages);
  }

  return total;
}

console.log(solution(BANKS));
