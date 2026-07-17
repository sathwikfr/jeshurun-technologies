const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcImage = "C:\\Users\\sathw\\.gemini\\antigravity-ide\\brain\\c95c3576-c214-4a48-a182-4662a00b26e2\\favicon_node_mark_1784298827024.png";
const outDir = path.join(__dirname, '..', 'src', 'app');

async function main() {
  console.log("Generating favicons...");

  // Generate icon.png (32x32) - Next.js will use this as primary favicon
  await sharp(srcImage).resize(32, 32).toFile(path.join(outDir, 'icon.png'));
  console.log("Created icon.png (32x32)");
  
  // Generate icon1.png (192x192) - For Android/Chrome
  await sharp(srcImage).resize(192, 192).toFile(path.join(outDir, 'icon1.png'));
  console.log("Created icon1.png (192x192)");

  // Generate icon2.png (512x512) - For PWA
  await sharp(srcImage).resize(512, 512).toFile(path.join(outDir, 'icon2.png'));
  console.log("Created icon2.png (512x512)");

  // Generate apple-icon.png (180x180) - For iOS
  await sharp(srcImage).resize(180, 180).toFile(path.join(outDir, 'apple-icon.png'));
  console.log("Created apple-icon.png (180x180)");

  console.log("All icons generated successfully!");
}

main().catch(console.error);
