const input = await Bun.file("day07/data.txt").text();
const arr = input.split("\n");

type Equation = { testValue: number; nums: number[] };
const equations: Equation[] = arr.map((str) => {
  const splitResult = str.split(": ");
  return {
    testValue: parseInt(splitResult[0]),
    nums: splitResult[1].split(" ").map(Number),
  };
});

const solvableEquations: Equation[] = [];

equations.forEach((equation) => {
  const solvable = solve(
    equation.nums,
    equation.testValue,
    1,
    equation.nums[0]
  );

  if (solvable) solvableEquations.push(equation);
});

const calibrationResult = solvableEquations.reduce(
  (sum, eq) => sum + eq.testValue,
  0
);

console.log("Calibration result: ", calibrationResult);

function solve(
  nums: number[],
  target: number,
  index: number,
  currentResult: number
) {
  // base case: used all numbers
  if (index == nums.length) return currentResult === target;

  // recursive case: add or multiply the next number
  const nextNum = nums[index];

  if (solve(nums, target, index + 1, currentResult + nextNum)) return true;
  if (solve(nums, target, index + 1, currentResult * nextNum)) return true;
  if (solve(nums, target, index + 1, concatenate(currentResult, nextNum)))
    return true;

  return false;
}

function concatenate(a: number, b: number) {
  return parseInt(a.toString() + b.toString());
}
