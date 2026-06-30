const d3 = require('d3-geo');

const cities = {
  "LONDON": [-0.1278, 51.5074],
  "DUBAI": [55.2708, 25.2048],
  "SINGAPORE": [103.8198, 1.3521],
  "SYDNEY": [151.2093, -33.8688]
};

const projections = [
  { name: 'geoNaturalEarth1', proj: d3.geoNaturalEarth1 },
  { name: 'geoEquirectangular', proj: d3.geoEquirectangular },
  { name: 'geoMercator', proj: d3.geoMercator }
];

for (const p of projections) {
  console.log('--- ' + p.name + ' ---');
  const proj = p.proj().fitSize([860, 560], {type: "Sphere"});
  for (const [name, coords] of Object.entries(cities)) {
    const [x, y] = proj(coords);
    console.log(`${name}: ${Math.round(x)}, ${Math.round(y)}`);
  }
}
