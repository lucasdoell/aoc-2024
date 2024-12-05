const input = await Bun.file("day05/data.txt").text();
const rules = input
  .split("\n\n")[0]
  .split("\n")
  .map((v) => v.split("|"))
  .map((arr) => arr.map(Number));
const updates = input
  .split("\n\n")[1]
  .split("\n")
  .map((v) => v.split(","))
  .map((arr) => arr.map(Number));

const correctlyOrderedUpdates: number[][] = [];
const incorrectlyOrderedUpdates: number[][] = [];

const failingRules: Record<string, number[]> = {};

updates.forEach((update) => {
  const correct = checkCorrectness(update);

  if (correct) {
    correctlyOrderedUpdates.push(update);
  } else {
    incorrectlyOrderedUpdates.push(update);
  }
});

console.log(incorrectlyOrderedUpdates);

incorrectlyOrderedUpdates.forEach((update) => {
  let correct = checkCorrectness(update);
  while (!correct) {
    const rule = failingRules[JSON.stringify(update)];

    const problemNum = rule[1];
    const problemIdx = update.findIndex((v) => v === rule[1]);
    const afterIdx = update.findIndex((v) => v === rule[0]);

    update.splice(afterIdx + 1, 0, problemNum);
    update.splice(problemIdx, 1);

    correct = checkCorrectness(update);
  }
});

let sumPageNums = 0;

incorrectlyOrderedUpdates.forEach((update) => {
  const num = update.at((update.length - 1) / 2);
  sumPageNums += num || 0;
});

console.log(
  "Sum of incorrectly ordered updates' middle page num: ",
  sumPageNums
);

function checkCorrectness(update: number[]) {
  let correct = true;

  update.forEach((val) => {
    const relatedRules = rules.filter((v) => v.includes(val));

    relatedRules.forEach((rule) => {
      const beforeNum = rule[0];
      const afterNum = rule[1];

      const beforeIdx = update.findIndex((v) => v === beforeNum);
      const afterIdx = update.findIndex((v) => v === afterNum);
      if (beforeIdx === -1 || afterIdx === -1) return;

      if (beforeIdx > afterIdx) {
        failingRules[JSON.stringify(update)] = rule;
        correct = false;
      }
    });
  });

  return correct;
}
