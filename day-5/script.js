const fs = require("fs");
const path = require("path");

const FILE_PATH = process.argv[2];
const IS_PART_TWO = process.argv[3] === "true";

class Interval2D {
  constructor(interval, left = null, right = null) {
    this.interval = interval;
    this.left = left;
    this.right = right;
    this.max = interval[1];
  }
}

class IntervalTree {
  constructor() {
    this.root = null;
  }

  insert(interval) {
    this.root = this._insert(this.root, interval);
  }

  _insert(node, interval) {
    if (!node) return new Interval2D(interval);
    if (interval[0] < node.interval[0]) {
      node.left = this._insert(node.left, interval);
    } else {
      node.right = this._insert(node.right, interval);
    }
    node.max = Math.max(node.max, interval[1]);
    return node;
  }

  searchPoint(point) {
    return this._searchPoint(this.root, point);
  }

  _searchPoint(node, point) {
    if (!node) return null;
    if (node.interval[0] <= point && point <= node.interval[1]) {
      return node.interval;
    }
    if (node.left && node.left.max >= point) {
      return this._searchPoint(node.left, point);
    }
    return this._searchPoint(node.right, point);
  }

  _forEach(node, callback) {
    if (!node) return;
    this._forEach(node.left, callback);
    callback(node.interval);
    this._forEach(node.right, callback);
  }

  forEach(callback) {
    this._forEach(this.root, callback);
  }
}

function solution() {
  const lines = fs
    .readFileSync(path.join(__dirname, FILE_PATH), "utf-8")
    .trim()
    .split("\n");

  const tree = new IntervalTree();

  let index = 0;
  for (index; index < lines.length; index++) {
    const line = lines[index];
    if (line === "") {
      break;
    }
    const [startStr, endStr] = line.split("-");
    const start = parseInt(startStr, 10);
    const end = parseInt(endStr, 10);
    tree.insert([start, end]);
  }

  if (IS_PART_TWO) {
    let total = 0;

    // Find contiguous intervals and sum their lengths
    let currentStart = null;
    let currentEnd = null;

    tree.forEach((interval) => {
      // If no current interval, start a new one
      if (currentStart === null) {
        currentStart = interval[0];
        currentEnd = interval[1];
      }
      // If overlapping or contiguous, extend the current interval
      else if (interval[0] <= currentEnd + 1) {
        currentEnd = Math.max(currentEnd, interval[1]);
      }
      // Otherwise, finalize the current interval and start a new one
      else {
        total += currentEnd - currentStart + 1;
        currentStart = interval[0];
        currentEnd = interval[1];
      }
    });

    if (currentStart !== null) {
      total += currentEnd - currentStart + 1;
    }

    return total;
  }

  index += 1; // skip empty line
  let total = 0;
  for (index; index < lines.length; index++) {
    const line = lines[index];
    const point = parseInt(line, 10);
    const isFresh = tree.searchPoint(point);
    if (isFresh) {
      total += 1;
    }
  }
  return total;
}

console.log(solution());
