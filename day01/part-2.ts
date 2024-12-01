const input = await Bun.file("day01/data.txt").text();

const leftList: number[] = [];
const rightList: number[] = [];

input.split("\n").map((str) => {
  leftList.push(parseInt(str));
  rightList.push(parseInt(str.substring(str.indexOf("   "))));
});

let similarity = 0;

Array.from({ length: leftList.length }).forEach((_, i) => {
  const occurrences = rightList.filter((num) => num === leftList[i]);

  similarity += leftList[i] * occurrences.length;
});

console.log("Similarity:", similarity);
