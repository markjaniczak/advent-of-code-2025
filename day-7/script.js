const fs = require("fs");
const path = require("path");

const FILE_PATH = process.argv[2];
const IS_PART_TWO = process.argv[3] === "true";

function solution(lines) {
  lines = lines.trim().split("\n");

  const root = [Math.floor(lines[0].length / 2), 0];

  /**
   * 
   * @param {[number, number]} node 
   * @returns {string}
   */
  function generateKey(node) {
    const [x, y] = node;
    return `${x},${y}`;
  }

  /**
   * @type {Map<number, string[]>}
   */
  const beams = new Map([[root[0], [generateKey(root)]]]);

  /**
   * @type {Map<string, [number, number][]>}
   */
  const graph = new Map([]);

  for (let y = 1; y < lines.length; y++) {
    const line = lines[y];

    for (let x = 0; x < line.length; x++) {
      const cell = line[x];

      // Finalize beams at the bottom row
      if (y === lines.length - 1) {
        beams.forEach((parentKeys, beamX) => {
          for (const parentKey of parentKeys) {
            if (!graph.has(parentKey)) {
              graph.set(parentKey, []);
            }

            graph.get(parentKey).push([beamX, y]);
          }
        });
        break;
      }

      // Skip if not a splitter or no beams present
      if (cell !== "^" || !beams.has(x)) {
        continue;
      }

      const parentKeys = beams.get(x);

      for (const parentKey of parentKeys) {
        if (!graph.has(parentKey)) {
          graph.set(parentKey, []);
        }
      }

      for (const parentKey of parentKeys) {
        graph.get(parentKey).push([x, y]);
      }

      // Splitter consumes the beam
      beams.delete(x);

      const left = x - 1;
      const right = x + 1;

      const node = [x, y];

      const key = generateKey(node);

      const leftBeams = beams.get(left) ?? [];
      const rightBeams = beams.get(right) ?? [];

      beams.set(left, [...leftBeams, key]);
      beams.set(right, [...rightBeams, key]);
    }
  }

  if (!IS_PART_TWO) {
    // Remove the root node from the count
    return graph.size - 1;
  }

  /**
   * 
   * @param {[number, number]} node 
   * @param {Map<string, number>} memo 
   * @returns {number}
   */
  function traverse(node, memo) {
    const key = generateKey(node);

    if (!graph.has(key)) {
      return 1;
    }

    let total = 0;

    /**
     * @type {[number, number][]}
     */
    const children = graph.get(key);

    for (const child of children) {
      const childKey = generateKey(child);
      total += memo.get(childKey) ?? traverse(child, memo);
    }

    memo.set(key, total);

    return total;
  }

  return traverse(root, new Map());
}

const lines = fs.readFileSync(path.join(__dirname, FILE_PATH), "utf-8");

console.time("solution-time");
console.log(solution(lines));
console.timeEnd("solution-time");
