const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const publicDir = path.join(__dirname, '../public');

// Recursively get all files in a directory
function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      files.push(name);
    }
  }
  return files;
}

// Find all images in public/images
const images = getFiles(path.join(publicDir, 'images'))
  .filter(file => /\.(png|jpg|jpeg|svg|webp|gif|mp4)$/i.test(file));

console.log(`Found ${images.length} images/assets in public/images.`);

// Get all src files (ts, tsx, js, jsx, css)
const srcFiles = getFiles(srcDir).filter(file => /\.(ts|tsx|js|jsx|css|json)$/i.test(file));
console.log(`Found ${srcFiles.length} source files to check.`);

// Read all source files content
const fileContents = srcFiles.map(file => {
  return {
    path: file,
    content: fs.readFileSync(file, 'utf8')
  };
});

// Check references
const unusedImages = [];
const usedImages = [];

for (const imgPath of images) {
  const relativePath = path.relative(publicDir, imgPath).replace(/\\/g, '/'); // e.g. images/foo.png
  const baseName = path.basename(imgPath); // e.g. foo.png
  
  let isUsed = false;
  
  for (const src of fileContents) {
    // Check if filename or relative path is mentioned in the source file
    if (src.content.includes(baseName) || src.content.includes(relativePath)) {
      isUsed = true;
      break;
    }
  }
  
  if (isUsed) {
    usedImages.push(relativePath);
  } else {
    unusedImages.push({
      relativePath,
      fullPath: imgPath,
      size: fs.statSync(imgPath).size
    });
  }
}

console.log('\n--- USED IMAGES ---');
usedImages.forEach(img => console.log(`[USED] ${img}`));

console.log('\n--- UNUSED IMAGES ---');
let totalUnusedSize = 0;
unusedImages.forEach(img => {
  const sizeMB = (img.size / (1024 * 1024)).toFixed(2);
  totalUnusedSize += img.size;
  console.log(`[UNUSED] ${img.relativePath} (${sizeMB} MB)`);
});
console.log(`\nTotal unused size: ${(totalUnusedSize / (1024 * 1024)).toFixed(2)} MB`);

// Output the unused images to a JSON file for the planning phase
fs.writeFileSync(
  path.join(__dirname, 'unused-images.json'),
  JSON.stringify(unusedImages, null, 2)
);
console.log(`Saved unused images to scratch/unused-images.json`);
