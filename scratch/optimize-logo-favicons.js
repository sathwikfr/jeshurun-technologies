const sharp = require('sharp');
const path = require('path');

const srcImage = path.join(__dirname, '..', 'public', 'images', 'logo.png');
const outDir = path.join(__dirname, '..', 'src', 'app');

async function main() {
  console.log("Optimizing logo for favicons...");

  // 1. Trim the transparent borders tightly
  // 2. Resize to 460x460 (keeping aspect ratio, contained within the box)
  // 3. Extend the canvas to 512x512 with transparent padding (safe zone)
  const baseProcessor = sharp(srcImage)
    .trim() // removes transparent dead space
    .resize(460, 460, { 
      fit: 'contain', 
      background: { r: 0, g: 0, b: 0, alpha: 0 } 
    })
    .extend({
      top: 26,
      bottom: 26,
      left: 26,
      right: 26,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    });

  // Generate the padded, squared, trimmed buffer
  const optimizedBuffer = await baseProcessor.toBuffer();

  // Generate the various icons from this perfect master buffer
  await sharp(optimizedBuffer).resize(32, 32).toFile(path.join(outDir, 'icon.png'));
  console.log("Created icon.png (32x32)");
  
  await sharp(optimizedBuffer).resize(192, 192).toFile(path.join(outDir, 'icon1.png'));
  console.log("Created icon1.png (192x192)");

  await sharp(optimizedBuffer).resize(512, 512).toFile(path.join(outDir, 'icon2.png'));
  console.log("Created icon2.png (512x512)");

  await sharp(optimizedBuffer).resize(180, 180).toFile(path.join(outDir, 'apple-icon.png'));
  console.log("Created apple-icon.png (180x180)");

  console.log("All favicons successfully cropped, squared, and optimized!");
}

main().catch(console.error);
