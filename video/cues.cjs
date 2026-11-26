// Ekspor daftar cue efek suara dari timeline animasi ke JSON.
const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.resolve('index.html'), { waitUntil: 'load', timeout: 60000 });
  const cues = await p.evaluate(() => window.__cues); require('fs').writeFileSync('sfx/cues.json', JSON.stringify(cues, null, 1));
  console.log(cues.length, 'cues'); await b.close(); })();
