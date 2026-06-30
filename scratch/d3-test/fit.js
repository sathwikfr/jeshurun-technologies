const d3 = require('d3-geo');

const cities = {
  "LONDON": [-0.1278, 51.5074],
  "DUBAI": [55.2708, 25.2048],
  "SINGAPORE": [103.8198, 1.3521],
  "TOKYO": [139.6503, 35.6762],
  "PARIS": [2.3522, 48.8566],
  "NEW YORK": [-74.0060, 40.7128]
};

const existing = {
  "LONDON": {x: 418, y: 146},
  "DUBAI": {x: 540, y: 220},
  "SINGAPORE": {x: 700, y: 280},
  "TOKYO": {x: 730, y: 180},
  "PARIS": {x: 425, y: 155},
  "NEW YORK": {x: 240, y: 160}
};

const proj = d3.geoNaturalEarth1().fitSize([860, 560], {type: "Sphere"});

let sumX = 0, sumY = 0, sumXX = 0, sumYY = 0, sumXYx = 0, sumXYy = 0;
let n = 0;

for (const name of Object.keys(cities)) {
  const [px, py] = proj(cities[name]);
  const ex = existing[name].x;
  const ey = existing[name].y;
  console.log(`${name}: proj(${Math.round(px)}, ${Math.round(py)}) -> exist(${ex}, ${ey})`);
}
