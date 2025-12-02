const fs = require("fs");
const path = require("path");

const PRODUCT_CODE_RANGES = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .trim()
  .split(",");

/**
 *
 * @param {string[]} ranges
 */
function solution(ranges) {
  let invalidCount = 0;

  for (let i = 0; i < ranges.length; i++) {
    const [startId, endId] = ranges[i].split("-");

    const start = parseInt(startId, 10);
    const end = parseInt(endId, 10);

    for (let id = start; id <= end; id++) {
      const idStr = id.toString();

      for (let j = 0; j < (idStr.length - 1) / 2; j++) {
        const part = idStr.slice(0, j + 1);

        const isInvalid = new RegExp(`^(${part})+$`).test(idStr);

        if (isInvalid) {
          invalidCount += id;
          break;
        }
      }
    }
  }

  return invalidCount;
}

console.log(solution(PRODUCT_CODE_RANGES));
