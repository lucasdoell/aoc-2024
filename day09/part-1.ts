const input = await Bun.file("day09/data.txt").text();
const diskMap = input.split("").map(Number);

const FREE_SPACE = ".";
let blocks: string[] = [];
let id = 0;
let freeSpaceCount = 0;

diskMap.forEach((num, i) => {
  if (isEven(i)) {
    // num is a file
    blocks.push(
      ...`${id.toString()}|`
        .repeat(num)
        .split("|") // separate ids that can be multiple characters long
        .filter((str) => str !== "") // remove empty strings from the split operation
    );
    id += 1;
  } else {
    // num is a free space
    blocks.push(...FREE_SPACE.repeat(num).split(""));
    freeSpaceCount += num;
  }
});

for (let i = 0; i < freeSpaceCount; i++) {
  const lastNum = blocks.pop()!;

  const freeSpaceIndex = blocks.findIndex((val) => val === FREE_SPACE);
  if (freeSpaceIndex === -1) break;

  blocks[freeSpaceIndex] = lastNum;
}

blocks.push(...FREE_SPACE.repeat(freeSpaceCount));

let checksum = 0;
blocks.forEach((val, i) => {
  if (val === FREE_SPACE) return;
  checksum += i * parseInt(val);
});

console.log("Checksum: ", checksum);

function isEven(num: number) {
  return num % 2 === 0;
}
