const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('spiral_debug.png')
  .pipe(new PNG())
  .on('parsed', function() {
    let nonBgPixels = 0;
    // background of light-ink is #f7f5f0 (247, 245, 240)
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx+1];
        let b = this.data[idx+2];
        
        // check if it's strictly the background color or close
        if (Math.abs(r - 247) > 2 || Math.abs(g - 245) > 2 || Math.abs(b - 240) > 2) {
          // not background
          // ignore the UI text overlay area (which is white/black etc)
          // UI box is centered, let's just count all
          nonBgPixels++;
        }
      }
    }
    console.log("Non-background pixels:", nonBgPixels);
  });
