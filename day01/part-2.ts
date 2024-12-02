const input = await Bun.file("day01/data.txt").text();

const leftList: number[] = [];
const rightList: number[] = [];

input.split("\n").forEach((str) => {
  leftList.push(parseInt(str));
  rightList.push(parseInt(str.substring(str.indexOf("   "))));
});

const frequencyMap = rightList.reduce((map, num) => {
  map[num] = (map[num] || 0) + 1;
  return map;
}, {} as Record<number, number>);

let similarity = 0;
for (const num of leftList) {
  const occurrences = frequencyMap[num] || 0;
  similarity += num * occurrences;
}

console.log("Similarity:", similarity);
