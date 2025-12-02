const fs = require("fs");
const path = require("path");

const MIN = 0;
const MAX = 99;
const START = 50;

const ROTATIONS = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .trim()
  .split("\n");

/**
 *
 * @param {string[]} rotations
 * @param {number} min
 * @param {number} max
 * @param {number} start
 * @param {number} count
 */
function rotate(min, max, start, rotations) {
  let count = 0;

  for (let index = 0; index < rotations.length; index++) {
    let rotation = rotations[index];

    const [, direction, clicks] = rotation.match(/([LR])(\d+)/);

    const polarity = direction === "L" ? -1 : 1;
    const steps = parseInt(clicks, 10);

    const range = max - min + 1;
    const offset = (polarity * steps) % range;

    let position = start + offset;

    if (position > max) {
      position = min + (position - max - 1);
    } else if (position < min) {
      position = max - (min - position - 1);
    }

    if (position === 0) {
      count++;
    }

    start = position;
  }

  return count;
}

console.log(rotate(MIN, MAX, START, ROTATIONS));
