const sharp = require('sharp');
const path = require('path');

const srcImage = path.join(__dirname, '..', 'public', 'images', 'logo.png');

async function analyzeLogo() {
  const image = sharp(srcImage);
  const metadata = await image.metadata();
  
  const stats = await image.stats();
  
  console.log("Width:", metadata.width);
  console.log("Height:", metadata.height);
  console.log("Has Alpha (Transparency):", metadata.hasAlpha);
  
  // If it has alpha, check if it's actually used
  if (metadata.hasAlpha) {
    const alphaChannel = stats.channels[stats.channels.length - 1];
    console.log("Min Alpha:", alphaChannel.min);
    console.log("Max Alpha:", alphaChannel.max);
    console.log("Mean Alpha:", alphaChannel.mean);
  }
}

analyzeLogo().catch(console.error);
