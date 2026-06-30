const fs = require('fs');

const path = 'src/components/WorldMap.tsx';
let content = fs.readFileSync(path, 'utf8');

const mapping = {
  "LONDON": { x: 430, y: 138 },
  "DÜSSELDORF": { x: 444, y: 139 },
  "FRANKFURT": { x: 448, y: 142 },
  "BOSTON": { x: 275, y: 163 },
  "NEW YORK": { x: 267, y: 167 },
  "SAN FRANCISCO": { x: 158, y: 175 },
  "DUBAI": { x: 558, y: 210 },
  "HYDERABAD": { x: 615, y: 232 },
  "SINGAPORE": { x: 678, y: 276 },
  "TOKYO": { x: 743, y: 181 },
  "PARIS": { x: 435, y: 145 },
  "AMSTERDAM": { x: 440, y: 136 },
  "SÃO PAULO": { x: 322, y: 345 },
  "JOHANNESBURG": { x: 495, y: 353 },
  "SYDNEY": { x: 771, y: 374 },
  "TORONTO": { x: 258, y: 159 }
};

for (const [name, coords] of Object.entries(mapping)) {
  const regex = new RegExp(`{ name: "${name}", tier: (2|3), x: \\d+, y: \\d+,`, 'g');
  content = content.replace(regex, `{ name: "${name}", tier: $1, x: ${coords.x}, y: ${coords.y},`);
}

// Special handling for Dublin
content = content.replace(/405px 135px/g, `417px 133px`);
content = content.replace(/cx="405" cy="135"/g, `cx="417" cy="133"`);
content = content.replace(/x1="405"\s+y1="135"/g, `x1="417" y1="133"`);
content = content.replace(/x2="415"\s+y2="103"/g, `x2="427" y2="101"`);
content = content.replace(/405,\s*135/g, `417, 133`);
content = content.replace(/x:\s*405,\s*y:\s*135/g, `x: 417, y: 133`);

fs.writeFileSync(path, content, 'utf8');
console.log("Done");
