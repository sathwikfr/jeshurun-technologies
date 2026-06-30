const d3 = require('d3-geo');

const cities = {
  "LONDON": [-0.1278, 51.5074],
  "DÜSSELDORF": [6.7735, 51.2277],
  "FRANKFURT": [8.6821, 50.1109],
  "BOSTON": [-71.0589, 42.3601],
  "NEW YORK": [-74.0060, 40.7128],
  "SAN FRANCISCO": [-122.4194, 37.7749],
  "DUBAI": [55.2708, 25.2048],
  "HYDERABAD": [78.4867, 17.3850],
  "SINGAPORE": [103.8198, 1.3521],
  "TOKYO": [139.6503, 35.6762],
  "PARIS": [2.3522, 48.8566],
  "AMSTERDAM": [4.9041, 52.3676],
  "SÃO PAULO": [-46.6333, -23.5505],
  "JOHANNESBURG": [28.0473, -26.2041],
  "SYDNEY": [151.2093, -33.8688],
  "TORONTO": [-79.3470, 43.6510],
  // I should check if there are others
  "DUBLIN": [-6.2603, 53.3498]
};

const proj = d3.geoNaturalEarth1().fitSize([860, 560], {type: "Sphere"});

const results = {};
for (const [name, coords] of Object.entries(cities)) {
  const [x, y] = proj(coords);
  results[name] = { x: Math.round(x), y: Math.round(y) };
}

console.log(JSON.stringify(results, null, 2));
