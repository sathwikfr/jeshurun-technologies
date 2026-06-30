const fs = require('fs');
const content = fs.readFileSync('./src/lib/worldMapPath.ts', 'utf8');
const match = content.match(/export const worldMapPath = "(.*)"/);
if (match) {
  const path = match[1];
  const regex = /([ML])([-.\d]+),([-.\d]+)/g;
  let m;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  while ((m = regex.exec(path)) !== null) {
    const x = parseFloat(m[2]);
    const y = parseFloat(m[3]);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  console.log({minX, maxX, minY, maxY});
} else {
  console.log("No match");
}
