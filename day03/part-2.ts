const input = await Bun.file("day03/data.txt").text();
const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;

const matches = input.match(regex);
if (!matches) throw new Error("No matches detected");

let sum = 0;

matches.forEach((val, i) => {
  if (val === "don't()") {
    const nextDo = matches.slice(i).findIndex((v) => v === "do()") + i;
    matches.splice(i, nextDo - i + 1);
  } else if (val === "do()") {
    matches.splice(i, 1);
  }
});

matches.forEach((val) => {
  const nums = processNumbers(val);
  sum += nums[0] * nums[1];
});

console.log("Sum of multiplied numbers:", sum);

function processNumbers(val: string) {
  return val
    .substring(4)
    .split(",")
    .map((str) => str.replace(")", ""))
    .map(Number);
}
