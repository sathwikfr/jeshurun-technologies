import fs from "fs";

const content = fs.readFileSync("./src/lib/worldMapPath.ts", "utf-8");
// Extract the string inside quotes
const match = content.match(/worldMapPath\s*=\s*"([^"]+)"/);
if (!match) {
  console.log("Could not find path string");
  process.exit(1);
}
const pathStr = match[1];

const numbers = pathStr.match(/-?[\d.]+/g).map(Number);
let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;

for (let i = 0; i < numbers.length; i += 2) {
  const x = numbers[i];
  const y = numbers[i+1];
  if (!isNaN(x) && !isNaN(y)) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}

console.log({ minX, maxX, minY, maxY });
