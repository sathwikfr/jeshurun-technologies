const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Tightly wrapped gradient to ensure vibrant colors -->
    <linearGradient id="grad" x1="84" y1="84" x2="428" y2="416" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>

    <!-- Mask to punch transparent holes in the centers of the nodes -->
    <mask id="hole-mask">
      <rect x="0" y="0" width="512" height="512" fill="white" />
      <circle cx="256" cy="140" r="20" fill="black" />
      <circle cx="140" cy="360" r="20" fill="black" />
      <circle cx="372" cy="360" r="20" fill="black" />
    </mask>
  </defs>
  
  <g mask="url(#hole-mask)">
    <!-- Extra thick connecting lines -->
    <line x1="256" y1="140" x2="140" y2="360" stroke="url(#grad)" stroke-width="56" stroke-linecap="round"/>
    <line x1="256" y1="140" x2="372" y2="360" stroke="url(#grad)" stroke-width="56" stroke-linecap="round"/>
    <line x1="140" y1="360" x2="372" y2="360" stroke="url(#grad)" stroke-width="56" stroke-linecap="round"/>
    
    <!-- Nodes -->
    <circle cx="256" cy="140" r="56" fill="url(#grad)"/>
    <circle cx="140" cy="360" r="56" fill="url(#grad)"/>
    <circle cx="372" cy="360" r="56" fill="url(#grad)"/>
  </g>
</svg>`;

const outDir = path.join(__dirname, '..', 'src', 'app');
const svgPath = path.join(outDir, 'icon.svg');

async function main() {
  console.log("Writing SVG favicon with padding, thicker lines, and ring cutouts...");
  fs.writeFileSync(svgPath, svgContent);
  console.log("Created icon.svg");

  const svgBuffer = Buffer.from(svgContent);

  await sharp(svgBuffer).resize(32, 32).toFile(path.join(outDir, 'icon.png'));
  console.log("Created icon.png (32x32 fallback)");
  
  await sharp(svgBuffer).resize(192, 192).toFile(path.join(outDir, 'icon1.png'));
  console.log("Created icon1.png (192x192)");

  await sharp(svgBuffer).resize(512, 512).toFile(path.join(outDir, 'icon2.png'));
  console.log("Created icon2.png (512x512)");

  await sharp(svgBuffer).resize(180, 180).toFile(path.join(outDir, 'apple-icon.png'));
  console.log("Created apple-icon.png (180x180)");

  console.log("All icons successfully updated to the v2 design!");
}

main().catch(console.error);
