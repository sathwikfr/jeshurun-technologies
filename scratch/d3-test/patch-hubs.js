const fs = require('fs');

const path = 'src/components/WorldMap.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace cities array with isHub flags
const citiesRegex = /const cities = \[\s*\/\/ Tier 2[\s\S]*?\];/;
const newCities = `const cities = [
    { name: "LONDON", isHub: true, x: 430, y: 138, offsetX: -16, offsetY: 0, anchor: "end" as const, fontSize: 5.5, labelW: 34, dotR: 2, info: "European Hub" },
    { name: "DÜSSELDORF", isHub: true, x: 444, y: 139, offsetX: 10, offsetY: -8, anchor: "start" as const, fontSize: 5.5, labelW: 50, dotR: 2, info: "Partner Hub" },
    { name: "FRANKFURT", isHub: false, x: 448, y: 142, offsetX: 14, offsetY: 12, anchor: "start" as const, fontSize: 5.5, labelW: 46, dotR: 1.5, info: "FinTech Hub" },
    { name: "BOSTON", isHub: true, x: 275, y: 163, offsetX: -12, offsetY: -12, anchor: "end" as const, fontSize: 5.5, labelW: 36, dotR: 2, info: "North American HQ" },
    { name: "NEW YORK", isHub: true, x: 267, y: 167, offsetX: 12, offsetY: -12, anchor: "start" as const, fontSize: 5.5, labelW: 44, dotR: 2, info: "Financial Hub" },
    { name: "SAN FRANCISCO", isHub: false, x: 158, y: 175, offsetX: 12, offsetY: 4, anchor: "start" as const, fontSize: 5.5, labelW: 66, dotR: 1.5, info: "West Coast Hub" },
    { name: "DUBAI", isHub: false, x: 558, y: 210, offsetX: -10, offsetY: -12, anchor: "end" as const, fontSize: 5.5, labelW: 28, dotR: 1.5, info: "MEA Hub" },
    { name: "HYDERABAD", isHub: true, x: 615, y: 232, offsetX: -12, offsetY: 15, anchor: "end" as const, fontSize: 5.5, labelW: 48, dotR: 2, info: "APAC Engineering" },
    { name: "SINGAPORE", isHub: false, x: 678, y: 276, offsetX: 12, offsetY: 6, anchor: "start" as const, fontSize: 5.5, labelW: 48, dotR: 1.5, info: "APAC Hub" },
    { name: "TOKYO", isHub: true, x: 743, y: 181, offsetX: -12, offsetY: -10, anchor: "end" as const, fontSize: 5.5, labelW: 32, dotR: 2, info: "East Asia Operations" },
    { name: "PARIS", isHub: false, x: 435, y: 145, offsetX: -8, offsetY: 15, anchor: "end" as const, fontSize: 5.5, labelW: 28, dotR: 1.5, info: "Regional Office" },
    { name: "AMSTERDAM", isHub: false, x: 440, y: 136, offsetX: 4, offsetY: -18, anchor: "start" as const, fontSize: 5.5, labelW: 50, dotR: 1.5, info: "Data Center" },
    { name: "SÃO PAULO", isHub: false, x: 322, y: 345, offsetX: 12, offsetY: 6, anchor: "start" as const, fontSize: 5.5, labelW: 50, dotR: 1.5, info: "South American Hub" },
    { name: "JOHANNESBURG", isHub: false, x: 495, y: 353, offsetX: 12, offsetY: 6, anchor: "start" as const, fontSize: 5.5, labelW: 68, dotR: 1.5, info: "African Hub" },
    { name: "SYDNEY", isHub: false, x: 771, y: 374, offsetX: 12, offsetY: 6, anchor: "start" as const, fontSize: 5.5, labelW: 40, dotR: 1.5, info: "Oceania Hub" },
    { name: "TORONTO", isHub: false, x: 258, y: 159, offsetX: -10, offsetY: -10, anchor: "end" as const, fontSize: 5.5, labelW: 44, dotR: 1.5, info: "Canadian Office" }
  ];`;

content = content.replace(citiesRegex, newCities);

// Replace tier logic
content = content.replace(/const isTier2 = city.tier === 2;/g, `const isHub = city.isHub;`);
content = content.replace(/className={isTier2 \?/g, `className={isHub ?`);
content = content.replace(/animationDelay: isTier2 \?/g, `animationDelay: isHub ?`);
content = content.replace(/opacity: isTier2 \?/g, `opacity: isHub ?`);
content = content.replace(/opacity={city.tier === 2 \?/g, `opacity={city.isHub ?`);
content = content.replace(/className={city.tier === 2 \?/g, `className={city.isHub ?`);
content = content.replace(/\{city.tier === 2 && \(/g, `{city.isHub && (`);
content = content.replace(/if \(city.tier !== 2\) return null;/g, `if (!city.isHub) return null;`);

fs.writeFileSync(path, content, 'utf8');
console.log("Done");
