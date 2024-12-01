const input = await Bun.file("day01/data.txt").text();

// separate each input into its own list
const leftList: number[] = [];
const rightList: number[] = [];

input.split("\n").map((str) => {
  leftList.push(parseInt(str));
  rightList.push(parseInt(str.substring(str.indexOf("   "))));
});

let distance = 0;

Array.from({ length: leftList.length }).forEach(() => {
  const smallestLeft = leftList.sort((a, b) => b - a).pop()!;
  const smallestRight = rightList.sort((a, b) => b - a).pop()!;

  distance += Math.abs(smallestLeft - smallestRight);
});
