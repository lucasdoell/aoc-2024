const input = await Bun.file("day04/data.txt").text();
const arr = input.split("\n");
const grid = arr.map((row) => row.split(""));

console.log(grid);

let countOfXmasX = 0;

function isXmasX(grid: string[][], row: number, col: number) {
  if (
    row > 0 &&
    row < grid.length - 1 &&
    col > 0 &&
    col < grid[0].length - 1 &&
    grid[row][col] === "A" && // Center is A
    // Top-left and Bottom-right form M-S or S-M
    ((grid[row - 1][col - 1] === "M" && grid[row + 1][col + 1] === "S") ||
      (grid[row - 1][col - 1] === "S" && grid[row + 1][col + 1] === "M")) &&
    // Top-right and Bottom-left form S-M or M-S
    ((grid[row - 1][col + 1] === "S" && grid[row + 1][col - 1] === "M") ||
      (grid[row - 1][col + 1] === "M" && grid[row + 1][col - 1] === "S"))
  ) {
    return true;
  }
  return false;
}

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (isXmasX(grid, row, col)) {
      countOfXmasX++;
    }
  }
}

console.log("Count of X-MAS (X-shaped):", countOfXmasX);
