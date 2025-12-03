const fs = require("fs");
const path = require("path");

const FILE_PATH = process.argv[2];
const MIN = 0;
const MAX = 99;
const START = 50;
const ROTATIONS = fs
  .readFileSync(path.join(__dirname, FILE_PATH), "utf-8")
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
  let position = start;
  const range = max - min + 1;

  for (let index = 0; index < rotations.length; index++) {
    let rotation = rotations[index];

    const [, direction, clicks] = rotation.match(/([LR])(\d+)/);

    const polarity = direction === "L" ? -1 : 1;
    const magnitude = parseInt(clicks, 10);

    count += Math.floor(magnitude / range);
    let initial = position;
    position += (polarity * magnitude) % range;

    if (position > max) {
      count += 1;
    } else if (position < min && initial !== min) {
      count += 1;
    } else if (position === min && polarity === -1) {
      count += 1;
    }

    position = ((position - min + range) % range) + min;
  }

  return count;
}

console.log(rotate(MIN, MAX, START, ROTATIONS));
