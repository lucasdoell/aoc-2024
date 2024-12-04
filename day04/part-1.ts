const input = await Bun.file("day04/data.txt").text();
const arr = input.split("\n");
const grid = arr.map((row) => row.split(""));

const directions = [
  [0, 1], // Right
  [0, -1], // Left
  [1, 0], // Down
  [-1, 0], // Up
  [1, 1], // Diagonal down-right
  [1, -1], // Diagonal down-left
  [-1, 1], // Diagonal up-right
  [-1, -1], // Diagonal up-left
];

let countOfXmas = 0;

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    for (const [dr, dc] of directions) {
      if (checkDirection(grid, row, col, dr, dc)) {
        countOfXmas++;
      }
    }
  }
}

console.log("Count of XMAS: ", countOfXmas);

function checkDirection(
  grid: string[][],
  row: number,
  col: number,
  dr: number,
  dc: number
) {
  const word = ["X", "M", "A", "S"];
  for (let i = 0; i < word.length; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    if (
      r < 0 ||
      r >= grid.length ||
      c < 0 ||
      c >= grid[0].length ||
      grid[r][c] !== word[i]
    ) {
      return false;
    }
  }
  return true;
}
