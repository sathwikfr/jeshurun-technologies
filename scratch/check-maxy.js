const fs = require('fs');
const content = fs.readFileSync('src/lib/worldMapPath.ts', 'utf-8');
const match = content.match(/export const worldMapPath = "(.*?)";/);
if (!match) { console.log('not found'); process.exit(1); }
const pathStr = match[1];
const subpaths = pathStr.split('M').filter(s => s.trim().length > 0).map(s => 'M' + s);
let maxYs = subpaths.map((sp, idx) => {
  let m = 0;
  const pairs = sp.match(/[\d\.]+,[\d\.]+/g);
  if (pairs) {
    pairs.forEach(p => {
      const y = parseFloat(p.split(',')[1]);
      if (y > m) m = y;
    });
  }
  return m;
});
maxYs.sort((a,b) => b - a);
console.log('Top maxYs of remaining map:', maxYs.slice(0, 5));
