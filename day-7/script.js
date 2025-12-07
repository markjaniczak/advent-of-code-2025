const fs = require("fs");
const path = require("path");

const FILE_PATH = process.argv[2];
const IS_PART_TWO = process.argv[3] === "true";

function solution() {
  const lines = fs
    .readFileSync(path.join(__dirname, FILE_PATH), "utf-8")
    .trim()
    .split("\n");

  let total = 0;

  let beams = new Set([Math.floor(lines[0].length / 2)]);

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const splitters = new Set();

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char === "^") {
        splitters.add(j);
      }
    }

    for (const index of splitters) {
      if (!beams.has(index)) {
        continue;
      }

      beams.delete(index);

      const left = index - 1;
      const right = index + 1;

      total += 1;

      beams.add(left);
      beams.add(right);
    }
  }

  return total;
}

console.log(solution());
