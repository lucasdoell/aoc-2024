const input = await Bun.file("day06/data.txt").text();
const arr = input.split("\n");
const originalMap = arr.map((v) => v.split(""));

const GUARD_POSITION = "^";
const OBSTRUCTION = "#";

type Direction = "left" | "right" | "up" | "down";
type Coordinate = [x: number, y: number];

let startingPos: Coordinate = [] as never;
arr.forEach((str, idx) => {
  const xCoord = str.indexOf(GUARD_POSITION);
  if (xCoord !== -1) startingPos = [xCoord, idx];
});

let validNewObstructions = 0;

originalMap.forEach((_, i) => {
  originalMap[i].forEach((_, j) => {
    if (i === startingPos[1] && j === startingPos[0]) return;

    let newMap = originalMap.map((row) => [...row]);
    newMap[i][j] = OBSTRUCTION;

    let currentPos: Coordinate = [...startingPos];
    let direction: Direction = "up";
    let guardInArea = true;
    let visited = new Set<string>();

    while (guardInArea) {
      const key = `${currentPos[0]},${currentPos[1]},${direction}`;
      if (visited.has(key)) {
        validNewObstructions += 1;
        break;
      }
      visited.add(key);

      const { newPos, newDirection, inBounds } = traverse(
        currentPos,
        direction,
        newMap
      );

      if (!inBounds) {
        guardInArea = false;
        break;
      }

      currentPos = newPos;
      direction = newDirection;
    }
  });
});

console.log("Amount of valid new obstructions: ", validNewObstructions);

function traverse(pos: Coordinate, dir: Direction, map: string[][]) {
  const [x, y] = pos;
  let newPos = pos;
  let newDirection = dir;

  if (dir === "up") newPos = [x, y - 1];
  else if (dir === "right") newPos = [x + 1, y];
  else if (dir === "down") newPos = [x, y + 1];
  else if (dir === "left") newPos = [x - 1, y];

  const [newX, newY] = newPos;

  if (!map[newY] || !map[newY][newX])
    return { newPos, newDirection, inBounds: false };
  if (map[newY][newX] === OBSTRUCTION) {
    newDirection = turn(dir);
    newPos = pos;
  }

  return { newPos, newDirection, inBounds: true };
}

function turn(direction: Direction) {
  if (direction === "up") return "right";
  if (direction === "right") return "down";
  if (direction === "down") return "left";
  return "up";
}
