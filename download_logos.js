const https = require('https');
const fs = require('fs');

const logos = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Vodafone_icon.svg', file: 'public/logos/vodafone.svg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Pfizer_%282021%29.svg', file: 'public/logos/pfizer.svg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Astellas_Pharma_logo.svg', file: 'public/logos/astellas.svg' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/ERGO_Group_Logo.svg', file: 'public/logos/ergo.svg' }
];

const options = {
  headers: {
    'User-Agent': 'AntigravityAgent/1.0 (contact: bot@example.com)'
  }
};

logos.forEach(logo => {
  https.get(logo.url, options, (res) => {
    if (res.statusCode === 200) {
      const fileStream = fs.createWriteStream(logo.file);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${logo.file}`);
      });
    } else {
      console.log(`Failed to download ${logo.file}: ${res.statusCode}`);
    }
  }).on('error', (e) => {
    console.error(`Error downloading ${logo.file}: ${e.message}`);
  });
});
