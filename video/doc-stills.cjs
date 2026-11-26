// Gambar diam video dokumenter (BUKAN render video).
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const out = process.argv[2]; const times = (process.argv[3] || '5,15,28.6,45,95').split(',').map(Number);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + path.resolve('documentary.html'), { waitUntil: 'load', timeout: 60000 });
  await Promise.race([p.evaluate(() => document.fonts.ready.then(() => 1)), p.waitForTimeout(15000)]);
  console.log('canplay h264:', await p.evaluate(() => document.createElement('video').canPlayType('video/mp4; codecs="avc1.42E01E"')));
  require('fs').mkdirSync(out, { recursive: true });
  for (const t of times) {
    await Promise.race([p.evaluate(t => window.__seek(t).then(() => 1), t), p.waitForTimeout(20000)]);
    await p.waitForTimeout(200);
    await p.screenshot({ path: `${out}/doc-${String(t).replace('.', '_')}.png` }); console.log('shot', t);
  }
  await b.close();
})();
