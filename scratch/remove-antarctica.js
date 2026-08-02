const fs = require('fs');
const content = fs.readFileSync('src/lib/worldMapPath.ts', 'utf-8');
const match = content.match(/export const worldMapPath = "(.*?)";/);
if (!match) { console.log('not found'); process.exit(1); }
const pathStr = match[1];
const subpaths = pathStr.split('M').filter(s => s.trim().length > 0).map(s => 'M' + s);
console.log('Total subpaths:', subpaths.length);

let maxYs = subpaths.map((sp, idx) => {
  let m = 0;
  const pairs = sp.match(/[\d\.]+,[\d\.]+/g);
  if (pairs) {
    pairs.forEach(p => {
      const y = parseFloat(p.split(',')[1]);
      if (y > m) m = y;
    });
  }
  return { idx, maxY: m, length: sp.length };
});

maxYs.sort((a,b) => b.maxY - a.maxY);
console.log('Top 5 subpaths by maxY:');
console.log(maxYs.slice(0, 5));

// Rebuild without the Antarctica subpath (which is likely the one with the highest maxY, probably around 540-560)
// Let's filter out anything with a maxY > 450 (South America goes down to ~420, maybe).
// Let's print the actual maxY of South America and Antarctica.
const filtered = subpaths.filter((sp, idx) => {
  // Find the max Y for this subpath
  let m = 0;
  const pairs = sp.match(/[\d\.]+,[\d\.]+/g);
  if (pairs) {
    pairs.forEach(p => {
      const y = parseFloat(p.split(',')[1]);
      if (y > m) m = y;
    });
  }
  return m < 450;
});
console.log('Filtered subpaths:', filtered.length);
const newPathStr = filtered.join('');
const newContent = content.replace(/export const worldMapPath = "(.*?)";/, `export const worldMapPath = "${newPathStr}";`);
fs.writeFileSync('src/lib/worldMapPath.ts', newContent);
console.log('Done!');
