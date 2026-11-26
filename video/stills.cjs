// Ambil gambar diam per adegan (BUKAN render video).
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const out = process.argv[2] || 'stills';
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('requestfailed', r => errs.push('fail ' + r.url()));
  await p.goto('file://' + path.resolve('index.html'), { waitUntil: 'load', timeout: 60000 });
  await Promise.race([p.evaluate(() => document.fonts.ready), p.waitForTimeout(15000)]);
  console.log('fonts', await p.evaluate(() => document.fonts.check('40px Fraunces')));
  const marks = await p.evaluate(() => window.__marks);
  console.log('total', await p.evaluate(() => window.__total), errs);
  const shots = [];
  for (const m of marks) {
    const ts = m.type === 'close' ? [m.start + 8, m.start + 20] : [m.start + m.dur - 3];
    ts.forEach((t, k) => shots.push({ t, name: `${String(m.i).padStart(2, '0')}-${m.type}${k ? '-b' : ''}` }));
  }
  require('fs').mkdirSync(out, { recursive: true });
  for (const s of shots) {
    const a = Date.now(); await p.evaluate(t => { window.__tl.seek(t, false); }, s.t); console.log('seek', s.name, Date.now() - a);
    await p.waitForTimeout(150);
    const c = Date.now(); await p.screenshot({ path: `${out}/${s.name}.png`, timeout: 120000 }); console.log('shot', s.name, Date.now() - c);
  }
  console.log(shots.map(s => s.name + '@' + s.t).join(' '));
  await b.close();
})();
