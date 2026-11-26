// Ambil gambar diam per adegan (BUKAN render video).
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const out = process.argv[2] || 'stills';
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('requestfailed', r => errs.push('fail ' + r.url()));
  await p.goto('file://' + path.resolve('index.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const marks = await p.evaluate(() => window.__marks);
  console.log('total', await p.evaluate(() => window.__total), errs);
  const shots = [];
  for (const m of marks) {
    const ts = m.type === 'close' ? [m.start + 8, m.start + 20] : [m.start + m.dur - 3];
    ts.forEach((t, k) => shots.push({ t, name: `${String(m.i).padStart(2, '0')}-${m.type}${k ? '-b' : ''}` }));
  }
  require('fs').mkdirSync(out, { recursive: true });
  for (const s of shots) {
    await p.evaluate(t => window.__tl.seek(t, false), s.t);
    await p.waitForTimeout(150);
    await p.screenshot({ path: `${out}/${s.name}.png` });
  }
  console.log(shots.map(s => s.name + '@' + s.t).join(' '));
  await b.close();
})();
