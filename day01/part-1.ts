const input = await Bun.file("day01/data.txt").text();

const leftList: number[] = [];
const rightList: number[] = [];

input.split("\n").map((str) => {
  leftList.push(parseInt(str));
  rightList.push(parseInt(str.substring(str.indexOf("   "))));
});

const sortedLeftList = leftList.sort((a, b) => b - a);
const sortedRightList = rightList.sort((a, b) => b - a);
let distance = 0;

Array.from({ length: leftList.length }).forEach(() => {
  const smallestLeft = sortedLeftList.pop()!;
  const smallestRight = sortedRightList.pop()!;

  distance += Math.abs(smallestLeft - smallestRight);
});

console.log("Distance: ", distance);
