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
      if (!content.includes('<SpiralDustBackground')) {
        let variant = 'light-ink';
        if (fullPath.includes('terms') || fullPath.includes('privacy') || fullPath.includes('sla') || fullPath.includes('blog\\[slug]') || fullPath.includes('insights\\[slug]')) {
          variant = 'light-minimal';
        }
        
        const heroMatch = content.match(/<section[^>]*?min-h-dvh[^>]*?>/);
        if (heroMatch) {
          content = content.replace(heroMatch[0], heroMatch[0] + '\n        <SpiralDustBackground lightVariant="' + variant + '" />');
          fs.writeFileSync(fullPath, content);
          console.log('Injected component into', fullPath);
        }
      }
    }
  }
}

processDir('src/app');
