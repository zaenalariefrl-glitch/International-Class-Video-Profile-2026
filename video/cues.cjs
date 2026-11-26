// Ekspor cue efek suara dan total durasi dari halaman komposisi.
// node cues.cjs [page.html] [prefix]   → sfx/<prefix>cues.json, sfx/<prefix>total.json
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => { const page = process.argv[2] || 'index.html', pre = process.argv[3] || '';
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto('file://' + path.resolve(page), { waitUntil: 'load', timeout: 60000 });
  const d = await p.evaluate(() => ({ cues: window.__cues, total: window.__total }));
  fs.writeFileSync(`sfx/${pre}cues.json`, JSON.stringify(d.cues, null, 1)); fs.writeFileSync(`sfx/${pre}total.json`, String(d.total));
  console.log(page, d.cues.length, 'cues', d.total, 's'); await b.close(); })();
