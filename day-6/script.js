const fs = require("fs");
const path = require("path");

const FILE_PATH = process.argv[2];
const IS_PART_TWO = process.argv[3] === "true";

function solution() {
  const lines = fs
    .readFileSync(path.join(__dirname, FILE_PATH), "utf-8")
    .split("\n");

  const chunks = Array.from(
    lines[lines.length - 1].matchAll(/[*+]\s*(?=\s|$)/g)
  );

  if (IS_PART_TWO) {
    let start = 0;
    let total = 0;

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i][0];

      const operator = chunk[0];

      const numbers = [];

      for (let j = 0; j < lines.length - 1; j++) {
        const line = lines[j];

        const number = line.substring(start, start + chunk.length);

        number.split("").forEach((digit, index) => {
          if (!numbers[index]) {
            numbers[index] = "";
          }

          numbers[index] += digit;
        });
      }

      total += numbers.reduce(
        (a, b) => {
          if (operator === "+") {
            return a + parseInt(b, 10);
          } else {
            return a * parseInt(b, 10);
          }
        },
        operator === "*" ? 1 : 0
      );

      start += chunk.length + 1;
    }

    return total;
  }

  // I fucked this up while trying to be clever with part two
//   let grid = [];
//   let totals = [];

//   for (const line of lines) {
//     const matches = line.matchAll(/(^\s*)?(\d+|[*+])\s*(?=\s|$)/g);
//     let i = -1;

//     for (const numbers of matches) {
//       i += 1;
//       const number = numbers[0];

//       if (["+", "*"].includes(number)) {
//         let members = grid[i];

//         totals.push(
//           members.reduce(
//             (a, b) => {
//               if (number === "*") {
//                 return a * b;
//               } else {
//                 return a + b;
//               }
//             },
//             number === "*" ? 1 : 0
//           )
//         );
//         continue;
//       }

//       if (!grid[i]) {
//         grid[i] = [];
//       }

//       grid[i].push(parseInt(number, 10));
//     }
//   }

//   return totals.reduce((a, b) => a + b, 0);
}

console.log(solution());
