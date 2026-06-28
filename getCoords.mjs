import fs from 'fs';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

async function generateCoords() {
  const res = await fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json");
  const topology = await res.json();
  const geojson = topojson.feature(topology, topology.objects.land);

  const width = 860;
  const height = 560;

  const projection = d3.geoNaturalEarth1().fitSize([width, height], geojson);

  const cities = [
    { id: "hq", name: "DUBLIN", coords: [-6.26, 53.34], isHQ: true },
    { id: "lon", name: "LONDON", coords: [-0.12, 51.50] },
    { id: "ny", name: "NEW YORK", coords: [-74.00, 40.71] },
    { id: "dxb", name: "DUBAI", coords: [55.27, 25.20] },
    { id: "hyd", name: "HYDERABAD", coords: [78.48, 17.38] },
    { id: "sin", name: "SINGAPORE", coords: [103.81, 1.35] }
  ];

  cities.forEach(c => {
    const [x, y] = projection(c.coords);
    console.log(`{ id: "${c.id}", name: "${c.name}", x: ${Math.round(x)}, y: ${Math.round(y)}${c.isHQ ? ', isHQ: true' : ''} },`);
  });
}

generateCoords().catch(console.error);
