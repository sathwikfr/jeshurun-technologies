import fs from 'fs';
import * as d3 from 'd3-geo';
import * as topojson from 'topojson-client';

async function generateMap() {
  console.log("Fetching topojson...");
  const res = await fetch("https://unpkg.com/world-atlas@2.0.2/countries-110m.json");
  const topology = await res.json();
  console.log("Converting to GeoJSON...");
  const geojson = topojson.feature(topology, topology.objects.land);

  // Map size based on design spec
  const width = 860;
  const height = 560;

  console.log("Applying Natural Earth projection...");
  // Fit size to our width and height
  const projection = d3.geoNaturalEarth1().fitSize([width, height], geojson);
  const pathGenerator = d3.geoPath().projection(projection);

  const svgPath = pathGenerator(geojson);

  console.log("Saving to src/lib/worldMapPath.ts...");
  const content = `// Generated Natural Earth Projection Path\n// Width: ${width}, Height: ${height}\nexport const WORLD_MAP_WIDTH = ${width};\nexport const WORLD_MAP_HEIGHT = ${height};\nexport const worldMapPath = "${svgPath}";\n`;
  
  if (!fs.existsSync("src/lib")) {
    fs.mkdirSync("src/lib", { recursive: true });
  }
  fs.writeFileSync("src/lib/worldMapPath.ts", content);
  console.log("Done!");
}

generateMap().catch(console.error);
