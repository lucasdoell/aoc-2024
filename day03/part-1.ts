const input = await Bun.file("day03/data.txt").text();
const regex = /mul\(\d{1,3},\d{1,3}\)/g;

const matches = input.match(regex);
if (!matches) throw new Error("No matches detected");

let sum = 0;

matches.forEach((val) => {
  const nums = val
    .substring(4)
    .split(",")
    .map((str) => str.replace(")", ""))
    .map(Number);

  sum += nums[0] * nums[1];
});

console.log("Sum of multiplied numbers:", sum);
