"""Sintesis efek suara (tanpa sampel luar, bebas hak cipta) dan mixing track SFX 300 detik.
Jalankan: python3 sfx/synth.py  (butuh numpy, scipy). Output: sfx/samples/*.wav, sfx/sfx-track.wav
"""
import json, os
import numpy as np
from scipy.signal import butter, sosfilt
from scipy.io import wavfile

SR = 48000
rng = np.random.default_rng(7)
D = os.path.dirname(os.path.abspath(__file__))
os.makedirs(f'{D}/samples', exist_ok=True)

def t(n): return np.arange(int(n * SR)) / SR
def bp(x, lo, hi, order=2): return sosfilt(butter(order, [lo, hi], 'bandpass', fs=SR, output='sos'), x)
def lp(x, f, order=2): return sosfilt(butter(order, f, 'lowpass', fs=SR, output='sos'), x)
def hp(x, f, order=2): return sosfilt(butter(order, f, 'highpass', fs=SR, output='sos'), x)
def norm(x, peak=0.9): return x / (np.abs(x).max() + 1e-9) * peak
def fade(x, a=0.005, b=0.05):
    n = len(x); ea = int(a * SR); eb = int(b * SR)
    x[:ea] *= np.linspace(0, 1, ea); x[n - eb:] *= np.linspace(1, 0, eb); return x
def stereo(x, width=0.0):
    d = int(0.012 * SR * width)
    L = x; R = np.concatenate([np.zeros(d), x[:len(x) - d]]) if d else x
    return np.stack([L, R], 1)

def whoosh(dur=1.6, lo=250, hi=5000, peak_at=0.55, level=0.8):
    tt = t(dur); n = rng.standard_normal(len(tt))
    # sapuan filter: potong jadi blok dengan pusat frekuensi bergerak naik lalu turun
    out = np.zeros_like(n); blk = 1024
    for i in range(0, len(n), blk):
        ph = i / len(n)
        fc = lo * (hi / lo) ** (np.sin(np.pi * min(ph / peak_at, 1) / 2) if ph < peak_at else 1 - 0.6 * (ph - peak_at) / (1 - peak_at))
        seg = n[max(0, i - 4096):i + blk]
        y = bp(seg, max(60, fc * 0.5), min(SR / 2 - 100, fc * 1.6))
        out[i:i + blk] = y[-len(n[i:i + blk]):]
    env = np.where(tt < dur * peak_at, (tt / (dur * peak_at)) ** 2, np.exp(-(tt - dur * peak_at) * 5))
    return stereo(fade(norm(out * env, level)), 1.0)

def drop():
    # foto atau kertas jatuh di meja: gesek kertas singkat + ketukan rendah
    tt = t(0.45); n = rng.standard_normal(len(tt))
    paper = bp(n, 1500, 7000) * np.exp(-tt * 38)
    thump = np.sin(2 * np.pi * 95 * tt) * np.exp(-tt * 30) * 0.9
    body = lp(n, 600) * np.exp(-tt * 25) * 0.5
    return stereo(fade(norm(paper * 0.6 + thump + body, 0.85), 0.001, 0.08), 0.4)

def tick():
    tt = t(0.12)
    x = np.sin(2 * np.pi * 2400 * tt) * np.exp(-tt * 90) + hp(rng.standard_normal(len(tt)), 4000) * np.exp(-tt * 160) * 0.4
    return stereo(fade(norm(x, 0.6), 0.0005, 0.03))

def shutter():
    tt = t(0.32); n = rng.standard_normal(len(tt)); x = np.zeros_like(tt)
    for st, g in [(0.0, 1.0), (0.085, 0.75)]:
        m = tt >= st; u = tt[m] - st
        x[m] += (bp(n[m], 1800, 9000) * np.exp(-u * 120) + np.sin(2 * np.pi * 180 * u) * np.exp(-u * 70) * 0.5) * g
    return stereo(fade(norm(x, 0.8), 0.0005, 0.05), 0.3)

def shimmer(dur=2.4):
    tt = t(dur); x = np.zeros_like(tt)
    for k, f in enumerate([1318.5, 1975.5, 2637.0, 3951.1, 5274.0]):  # E6 B6 E7 B7 E8, terang dan lembut
        trem = 1 + 0.25 * np.sin(2 * np.pi * (5 + k) * tt + k)
        x += np.sin(2 * np.pi * f * tt) * trem / (k + 1.3)
    env = (1 - np.exp(-tt * 18)) * np.exp(-tt * 1.6)
    air = hp(rng.standard_normal(len(tt)), 6000) * env * 0.05
    return stereo(fade(norm(x * env + air, 0.5), 0.01, 0.4), 1.5)

def swell(dur=3.2):
    tt = t(dur); x = np.zeros_like(tt)
    for k, f in enumerate([220, 329.6, 440, 659.3]):
        x += np.sin(2 * np.pi * f * tt + 0.3 * np.sin(2 * np.pi * 0.7 * tt)) / (k + 1)
    env = np.sin(np.pi * np.clip(tt / dur, 0, 1)) ** 2
    return stereo(fade(norm(lp(x, 2500) * env, 0.45), 0.05, 0.3), 1.2)

BANK = {
    'whoosh': whoosh(), 'whoosh_soft': whoosh(1.8, 200, 2500, 0.6, 0.5),
    'drop': drop(), 'tick': tick(), 'shutter': shutter(), 'shimmer': shimmer(), 'swell': swell(),
}
LEVEL = {'whoosh': 0.55, 'whoosh_soft': 0.4, 'drop': 0.5, 'tick': 0.22, 'shutter': 0.45, 'shimmer': 0.3, 'swell': 0.35}
for k, v in BANK.items():
    wavfile.write(f'{D}/samples/{k}.wav', SR, (v * 32767 * 0.9).astype(np.int16))

cues = json.load(open(f'{D}/cues.json'))
TOTAL = 300.0
mix = np.zeros((int(TOTAL * SR) + SR * 3, 2))
for c in cues:
    s = BANK[c['sfx']] * LEVEL[c['sfx']] * c['gain']
    # whoosh dipusatkan: puncaknya jatuh di tengah gerakan geser
    i = int(c['t'] * SR); mix[i:i + len(s)] += s[:len(mix) - i]
mix = mix[:int(TOTAL * SR)]
peak = np.abs(mix).max(); print('peak', round(float(peak), 3), 'cues', len(cues))
if peak > 0.95: mix *= 0.95 / peak
wavfile.write(f'{D}/sfx-track.wav', SR, (mix * 32767).astype(np.int16))
