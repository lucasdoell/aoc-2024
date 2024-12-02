const input = await Bun.file("day02/data.txt").text();

let numOfSafeRows = 0;

input.split("\n").forEach((str) => {
  const row = str.split(" ").map((str) => parseInt(str));

  let safety = true;
  let state: "asc" | "desc" | "undetermined" = "undetermined";

  row.reduce((prev, curr) => {
    const difference = Math.abs(prev - curr);
    if (difference < 1 || difference > 3) safety = false;

    if (prev - curr > 0) {
      if (state === "desc") safety = false;
      state = "asc";
    }

    if (prev - curr < 0) {
      if (state === "asc") safety = false;
      state = "desc";
    }

    return curr;
  });
  if (safety) numOfSafeRows += 1;
});

console.log("Number of safe rows: ", numOfSafeRows);
