const input = await Bun.file("day08/data.txt").text();
const arr = input.split("\n");
const map = arr.map((v) => v.split(""));

type Coordinate = [x: number, y: number];

const antennas = new Map<string, Coordinate[]>();

map.forEach((row, i) => {
  row.forEach((char, j) => {
    if (isAlphanumeric(char)) {
      const coordinates = antennas.get(char) ?? [];
      coordinates.push([i, j]);
      antennas.set(char, coordinates);
    }
  });
});

const antinodes = new Set<string>();

antennas.forEach((coordinates) => {
  for (let i = 0; i < coordinates.length; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const p1 = coordinates[i];
      const p2 = coordinates[j];
      const slope = calculateSlope(p1, p2);

      antinodes.add(`${p1[0]},${p1[1]}`);
      antinodes.add(`${p2[0]},${p2[1]}`);

      for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
          const point: Coordinate = [x, y];

          // Skip p1 and p2 since they've already been added
          if ((x === p1[0] && y === p1[1]) || (x === p2[0] && y === p2[1]))
            continue;

          if (!withinBounds(point)) continue;

          const slopeToP1 = calculateSlope(p1, point);

          if (slopeToP1[0] === slope[0] && slopeToP1[1] === slope[1])
            antinodes.add(`${point[0]},${point[1]}`);
        }
      }
    }
  }
});

console.log("Unique antinodes:", antinodes.size);

function isAlphanumeric(str: string) {
  return /^[a-z0-9]+$/i.test(str);
}

function calculateSlope(a: Coordinate, b: Coordinate) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];

  if (dx === 0) {
    return [1, 0]; // vertical line
  }
  if (dy === 0) {
    return [0, 1]; // horizontal line
  }

  const g = gcd(dy, dx);
  const reducedDy = dy / g;
  const reducedDx = dx / g;

  if (reducedDx < 0) {
    return [-reducedDy, -reducedDx];
  }
  return [reducedDy, reducedDx] as Coordinate;
}

function gcd(a: number, b: number) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function withinBounds(c: Coordinate) {
  const xBound = map.length;
  const yBound = map[0].length;
  return c[0] >= 0 && c[1] >= 0 && c[0] < xBound && c[1] < yBound;
}
