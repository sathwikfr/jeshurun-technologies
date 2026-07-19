const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/preview-spiral', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: 'spiral_debug.png' });
  console.log("Screenshot saved to spiral_debug.png");
  
  await browser.close();
})();
