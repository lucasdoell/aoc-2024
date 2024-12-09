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
      const difference = calculateDifference(coordinates[i], coordinates[j]);

      const posAntinode: Coordinate = [
        coordinates[i][0] + difference[0],
        coordinates[i][1] + difference[1],
      ];

      const negAntinode: Coordinate = [
        coordinates[j][0] - difference[0],
        coordinates[j][1] - difference[1],
      ];

      if (withinBounds(posAntinode))
        antinodes.add(`${posAntinode[0]},${posAntinode[1]}`);

      if (withinBounds(negAntinode))
        antinodes.add(`${negAntinode[0]},${negAntinode[1]}`);
    }
  }
});

console.log("Unique antinodes:", antinodes.size);

function isAlphanumeric(str: string) {
  return /^[a-z0-9]+$/i.test(str);
}

function calculateDifference(a: Coordinate, b: Coordinate) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return [dx, dy] as Coordinate;
}

function withinBounds(c: Coordinate) {
  const xBound = map.length;
  const yBound = map[0].length;
  return c[0] >= 0 && c[1] >= 0 && c[0] < xBound && c[1] < yBound;
}
