const input = await Bun.file("day09/data.txt").text();
const diskMap = input.split("").map(Number);

const FREE_SPACE = ".";
let blocks: string[] = [];
let id = 0;
let freeSpaceCount = 0;

diskMap.forEach((num, i) => {
  if (isEven(i)) {
    // num is a file length
    blocks.push(
      ...`${id.toString()}|`
        .repeat(num)
        .split("|")
        .filter((str) => str !== "")
    );
    id += 1;
  } else {
    // num is free space
    blocks.push(...FREE_SPACE.repeat(num).split(""));
    freeSpaceCount += num;
  }
});

type FileInfo = {
  id: number;
  startIndex: number;
  length: number;
};

const files: FileInfo[] = [];
const seenFiles = new Set<number>();

for (let i = 0; i < blocks.length; i++) {
  if (blocks[i] !== FREE_SPACE) {
    const currentId = parseInt(blocks[i]);
    if (!seenFiles.has(currentId)) {
      seenFiles.add(currentId);
      let length = 0;
      let j = i;
      while (j < blocks.length && blocks[j] === blocks[i]) {
        length++;
        j++;
      }
      files.push({ id: currentId, startIndex: i, length });
      i = j - 1;
    }
  }
}

files.sort((a, b) => b.id - a.id);

for (const file of files) {
  const freeStart = findFreeSpaceToTheLeft(
    blocks,
    file.startIndex,
    file.length
  );
  if (freeStart !== null) {
    const fileBlocks = blocks.slice(
      file.startIndex,
      file.startIndex + file.length
    );

    for (let k = 0; k < file.length; k++) {
      blocks[freeStart + k] = fileBlocks[k];
    }

    for (let k = file.startIndex; k < file.startIndex + file.length; k++) {
      blocks[k] = FREE_SPACE;
    }

    file.startIndex = freeStart;
  }
}

let checksum = 0;
blocks.forEach((val, i) => {
  if (val === FREE_SPACE) return;
  checksum += i * parseInt(val);
});

console.log("Checksum: ", checksum);

function isEven(num: number) {
  return num % 2 === 0;
}

function findFreeSpaceToTheLeft(
  blockArr: string[],
  maxIndex: number,
  lengthNeeded: number
) {
  let runStart = -1;
  let runLength = 0;
  for (let i = 0; i < maxIndex; i++) {
    if (blockArr[i] === FREE_SPACE) {
      if (runStart === -1) runStart = i;
      runLength++;
      if (runLength >= lengthNeeded) {
        return runStart;
      }
    } else {
      runStart = -1;
      runLength = 0;
    }
  }
  return null;
}
