const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcImage = path.join(__dirname, '..', 'public', 'images', 'logo.png');
const outDir = path.join(__dirname, '..', 'src', 'app');
const oldSvgPath = path.join(outDir, 'icon.svg');

async function main() {
  console.log("Generating favicons from new logo...");

  // Remove the old vector SVG so Next.js uses the new PNGs
  if (fs.existsSync(oldSvgPath)) {
    fs.unlinkSync(oldSvgPath);
    console.log("Deleted old icon.svg");
  }

  // Next.js static icon sizes
  await sharp(srcImage).resize(32, 32).toFile(path.join(outDir, 'icon.png'));
  console.log("Created icon.png (32x32)");
  
  await sharp(srcImage).resize(192, 192).toFile(path.join(outDir, 'icon1.png'));
  console.log("Created icon1.png (192x192)");

  await sharp(srcImage).resize(512, 512).toFile(path.join(outDir, 'icon2.png'));
  console.log("Created icon2.png (512x512)");

  await sharp(srcImage).resize(180, 180).toFile(path.join(outDir, 'apple-icon.png'));
  console.log("Created apple-icon.png (180x180)");

  console.log("All favicons successfully updated to the new logo design!");
}

main().catch(console.error);
