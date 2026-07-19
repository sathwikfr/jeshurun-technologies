const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('SpiralDustBackground')) {
        const isKeep = fullPath.includes(path.join('app', 'services')) || 
                       fullPath.includes(path.join('app', 'technology')) || 
                       fullPath.includes(path.join('app', 'software')) || 
                       fullPath.includes('preview-spiral');
        if (!isKeep) {
          content = content.replace(/import \{ SpiralDustBackground \} from \"@\/components\/effects\/SpiralDustBackground\";\r?\n/g, '');
          content = content.replace(/[ \t]*<SpiralDustBackground[^>]*\/>\r?\n?/g, '');
          fs.writeFileSync(fullPath, content);
          console.log('Removed from', fullPath);
        }
      }
    }
  }
}

processDir('src/app');
