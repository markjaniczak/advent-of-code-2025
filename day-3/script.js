const fs = require("fs");
const path = require("path");

const FILE_PATH = process.argv[2];
const IS_PART_TWO = process.argv[3] === "true";

function solution() {
  let total = 0;

  const banks = fs
    .readFileSync(path.join(__dirname, FILE_PATH), "utf-8")
    .trim()
    .split("\n");

  const length = IS_PART_TWO ? 12 : 2;

  for (const bank of banks) {
    const joltages = bank.split("");

    let digits = [];

    while (joltages.length > 0) {
      const digit = parseInt(joltages.shift(), 10);

      while (
        digits.length > 0 &&
        digits[digits.length - 1] < digit &&
        digits.length + joltages.length >= length
      ) {
        digits.pop();
      }

      if (digits.length < length) {
        digits.push(digit);
      }
    }

    total += parseInt(digits.join(""), 10);
  }

  return total;
}

console.log(solution());
