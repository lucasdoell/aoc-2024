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

updates.forEach((update) => {
  let correct = true;

  update.forEach((val) => {
    const relatedRules = rules.filter((v) => v.includes(val));

    relatedRules.forEach((rule) => {
      const beforeNum = rule[0];
      const afterNum = rule[1];

      const beforeIdx = update.findIndex((v) => v === beforeNum);
      const afterIdx = update.findIndex((v) => v === afterNum);
      if (beforeIdx === -1 || afterIdx === -1) return;

      if (beforeIdx > afterIdx) correct = false;
    });
  });

  if (correct) correctlyOrderedUpdates.push(update);
});

let sumPageNums = 0;

correctlyOrderedUpdates.forEach((update) => {
  const num = update.at((update.length - 1) / 2);
  sumPageNums += num || 0;
});

console.log("Sum of correct updates' middle page num: ", sumPageNums);
