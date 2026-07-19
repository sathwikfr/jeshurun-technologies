const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  
  // Try to find the canvas and its dimensions
  const canvasInfo = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return null;
    return {
      width: canvas.width,
      height: canvas.height,
      clientWidth: canvas.clientWidth,
      clientHeight: canvas.clientHeight,
      style: canvas.getAttribute('style')
    };
  });
  
  console.log("Canvas Info on Homepage:", canvasInfo);
  
  await page.screenshot({ path: 'home_debug.png' });
  console.log("Screenshot saved to home_debug.png");
  
  await browser.close();
})();
