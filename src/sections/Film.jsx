import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { film } from '../content';

// Bingkai video membesar dari kartu menjadi full-bleed saat di-scroll (pinned).
export default function Film() {
  const root = useRef(null);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=120%', scrub: 0.6, pin: true },
        });
        tl.fromTo('.film__frame', { clipPath: 'inset(18% 22% 18% 22% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' })
          .fromTo('.film__media', { scale: 1.25 }, { scale: 1, ease: 'none' }, 0)
          .fromTo('.film__copy', { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.4 }, 0.45);
      });
    },
    { scope: root }
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open) {
      d.showModal();
      window.__lenis?.stop();
    } else if (d.open) d.close();
    return () => window.__lenis?.start();
  }, [open]);

  const src = film.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0`
    : null;

  return (
    <section id="film" className="film" ref={root}>
      <div className="film__frame">
        <div className="film__media">
          <img src={film.poster} alt="" onError={e => (e.currentTarget.style.display = 'none')} />
        </div>
        <div className="film__shade" />
        <div className="film__copy container">
          <p className="eyebrow">{film.label}</p>
          <h2 className="display">{film.title}</h2>
          <button className="film__play" onClick={() => setOpen(true)} aria-label="Play video profile">
            <span className="film__play-ring" />
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
          </button>
          {film.duration && <p className="film__dur">{film.duration}</p>}
        </div>
      </div>

      <dialog ref={dialogRef} className="player" onClose={() => setOpen(false)} onClick={e => e.target === dialogRef.current && setOpen(false)}>
        <button className="player__close" onClick={() => setOpen(false)} aria-label="Close video">✕</button>
        {open &&
          (src ? (
            <iframe src={src} title="International Class video profile" allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
          ) : (
            <video src={film.file} poster={film.poster} controls autoPlay playsInline />
          ))}
      </dialog>
    </section>
  );
}
