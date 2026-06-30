const fs = require('fs');
const path = 'src/components/WorldMap.tsx';
let content = fs.readFileSync(path, 'utf8');

// Fix M 405 135
content = content.replace(/M 405 135/g, `M 417 133`);

// Fix label rect x="410" -> "422"
content = content.replace(/x="410"/g, `x="422"`);

// Fix label text x="442.5" -> "454.5"
content = content.replace(/x="442.5"/g, `x="454.5"`);
content = content.replace(/y="103"/g, `y="101"`);

// Wait, the rect y="97.5" should be "95.5"
content = content.replace(/y="97.5"/g, `y="95.5"`);

// Let's also check for "Dublin Glow"
content = content.replace(/<rect\s+x="422"\s+y="95.5"/g, `<rect \n              x="422" \n              y="95.5"`);
fs.writeFileSync(path, content, 'utf8');
console.log("Done");
