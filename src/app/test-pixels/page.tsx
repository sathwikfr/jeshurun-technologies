"use client";


import { useEffect } from "react";

export default function TestPage() {
  useEffect(() => {
    const img = new Image();
    img.src = "/earth_color.jpg";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, 512, 256);
      const { data } = ctx.getImageData(0, 0, 512, 256);
      
      const testFormula = (name: string, fn: (r: number, g: number, b: number, lum: number) => boolean) => {
        let landCount = 0;
        let oceanCount = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          const lum = r * 0.299 + g * 0.587 + b * 0.114;
          if (fn(r, g, b, lum)) {
            landCount++;
          } else {
            oceanCount++;
          }
        }
        console.log(`FORMULA_${name}:`, { landCount, oceanCount, ratio: (landCount / (512 * 256)).toFixed(3) });
      };

      // Formula 1: Current formula
      testFormula("CURRENT", (r, g, b, lum) => {
        const isOcean = b > r + 18 && b > g + 12 && lum < 85;
        return !isOcean;
      });

      // Formula 2: Green or Red channel higher than Blue (standard vegetation/desert classification)
      testFormula("G_OR_R_GT_B", (r, g, b, lum) => {
        return g > b || r > b || lum > 100;
      });

      // Formula 3: Green or Red channel higher than Blue with a small offset
      testFormula("G_OR_R_GT_B_OFFSET", (r, g, b, lum) => {
        return g >= b - 4 || r >= b - 4;
      });

      // Formula 4: Simple luminance threshold
      testFormula("LUM_THRESHOLD", (r, g, b, lum) => {
        return lum > 45;
      });
      
      // Let's sample specific points to see if they are classified correctly
      const checkPoint = (x: number, y: number) => {
        const idx = (y * 512 + x) * 4;
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        const lum = r * 0.299 + g * 0.587 + b * 0.114;
        return { r, g, b, lum };
      };
      
      console.log("SAMPLES:", {
        pacific: checkPoint(100, 128),
        atlantic: checkPoint(220, 128),
        north_america: checkPoint(120, 80),
        africa: checkPoint(270, 140),
        eurasia: checkPoint(350, 80),
        australia: checkPoint(420, 200),
        south_america: checkPoint(160, 180)
      });
    };
  }, []);
  return <div>Testing pixels... Open console.</div>;
}
