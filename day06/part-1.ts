const input = await Bun.file("day06/data.txt").text();
const arr = input.split("\n");
const map = arr.map((v) => v.split(""));

const GUARD_POSITION = "^";
const OBSTRUCTION = "#";
const VISITED = "X";
const UNVISITED = ".";

type Direction = "left" | "right" | "up" | "down";
let direction: Direction = "up";

type Coordinate = [x: number, y: number];
let startingPos: Coordinate = [] as never;

arr.forEach((str, idx) => {
  const xCoord = str.indexOf(GUARD_POSITION);
  if (xCoord !== -1) startingPos = [xCoord, idx];
});

let currentPos = startingPos;
let traversed = 0;

let guardInArea = true;

while (guardInArea) {
  if (direction === "up") traverse(0, -1);
  else if (direction === "right") traverse(1, 0);
  else if (direction === "down") traverse(0, 1);
  else traverse(-1, 0);
}

console.log("Amount of traversed squares: ", traversed);

function turn() {
  if (direction === "up") direction = "right";
  else if (direction === "right") direction = "down";
  else if (direction === "down") direction = "left";
  else if (direction === "left") direction = "up";
}

function traverse(x: number, y: number) {
  if (!map[currentPos[1]] || !map[currentPos[1]][currentPos[0]]) {
    guardInArea = false;
    return;
  }

  const currentValue = map[currentPos[1]][currentPos[0]];
  if (currentValue === OBSTRUCTION) {
    currentPos = [currentPos[0] - x, currentPos[1] - y];
    turn();
  } else {
    map[currentPos[1]][currentPos[0]] = VISITED;
    currentPos = [currentPos[0] + x, currentPos[1] + y];

    if (currentValue === UNVISITED || currentValue === GUARD_POSITION) {
      traversed += 1;
    }
  }
}
