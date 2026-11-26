// Render frame-accurate: seek timeline per frame, screenshot JPEG, pipe ke ffmpeg.
// node render.cjs <page.html> <fps> <startFrame> <endFrame> <out.mp4>
const { chromium } = require('playwright'); const path = require('path'); const { spawn } = require('child_process');
(async () => {
  const [page, fpsS, sS, eS, out] = process.argv.slice(2); const fps = +fpsS, s0 = +sS, s1 = +eS;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.error('ERR', e.message));
  await p.goto('file://' + path.resolve(page), { waitUntil: 'load', timeout: 120000 });
  await Promise.race([p.evaluate(() => document.fonts.ready.then(() => 1)), p.waitForTimeout(20000)]);
  const isDoc = await p.evaluate(() => typeof window.__seek === 'function');
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(fps), '-g', String(fps * 2), out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = s0; f < s1; f++) {
    const t = f / fps;
    if (isDoc) await p.evaluate(t => window.__seek(t).then(() => 1), t);
    else await p.evaluate(t => { window.__tl.seek(t, false); }, t);
    const buf = await p.screenshot({ type: 'jpeg', quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - s0) % 600 === 0) console.log(out, 'frame', f, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
  console.log('done', out, ((Date.now() - t0) / 1000).toFixed(0) + 's');
})();
