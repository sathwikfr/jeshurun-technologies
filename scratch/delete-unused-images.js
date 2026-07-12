const fs = require('fs');
const path = require('path');

const unusedJsonPath = path.join(__dirname, 'unused-images.json');

if (!fs.existsSync(unusedJsonPath)) {
  console.error('Error: scratch/unused-images.json not found. Run find-unused-images.js first.');
  process.exit(1);
}

const unusedImages = JSON.parse(fs.readFileSync(unusedJsonPath, 'utf8'));

console.log(`Starting deletion of ${unusedImages.length} unused assets...`);

let successCount = 0;
let failCount = 0;

for (const img of unusedImages) {
  if (fs.existsSync(img.fullPath)) {
    try {
      fs.unlinkSync(img.fullPath);
      console.log(`[DELETED] ${img.relativePath}`);
      successCount++;
    } catch (err) {
      console.error(`[ERROR] Failed to delete ${img.relativePath}:`, err.message);
      failCount++;
    }
  } else {
    console.log(`[SKIPPED (Already gone)] ${img.relativePath}`);
    successCount++;
  }
}

// Check if bg directory is empty and remove it if so
const bgDir = path.join(__dirname, '../public/images/bg');
if (fs.existsSync(bgDir)) {
  const files = fs.readdirSync(bgDir);
  if (files.length === 0) {
    try {
      fs.rmdirSync(bgDir);
      console.log('[DELETED] Empty directory: public/images/bg');
    } catch (err) {
      console.error('[ERROR] Failed to delete directory public/images/bg:', err.message);
    }
  }
}

console.log(`\nCleanup complete: ${successCount} files cleaned up, ${failCount} failures.`);
