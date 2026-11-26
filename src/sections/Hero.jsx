import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitText from '../components/reactbits/SplitText';
import { hero } from '../content';

export default function Hero() {
  const root = useRef(null);
  const [videoOk, setVideoOk] = useState(true);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero__fade', { opacity: 0, y: 24, duration: 1, stagger: 0.12, delay: 0.9, ease: 'power3.out' });
        // Parallax keluar: media melambat, teks naik dan memudar.
        gsap.to('.hero__media', {
          yPercent: 18, scale: 1.08, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.hero__inner', {
          yPercent: -20, opacity: 0, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero__media" aria-hidden="true">
        {videoOk && (
          <video autoPlay muted loop playsInline poster={hero.poster} onError={() => setVideoOk(false)}>
            <source src={hero.bgVideo} type="video/mp4" onError={() => setVideoOk(false)} />
          </video>
        )}
        <div className="hero__veil" />
      </div>

      <div className="hero__inner container">
        <p className="eyebrow hero__fade">{hero.eyebrow}</p>
        <SplitText
          text={hero.title}
          tag="h1"
          className="hero__title"
          splitType="words, chars"
          delay={28}
          duration={1.1}
          mask
          textAlign="left"
          trigger="load"
        />
        <p className="hero__sub hero__fade">{hero.sub}</p>
        <div className="hero__actions hero__fade">
          <a className="btn btn--gold" href="#film">▶ Watch the film</a>
          <a className="btn btn--ghost" href="#why">Explore the program</a>
        </div>
      </div>

      <a href="#manifesto" className="hero__scroll hero__fade" aria-label="Scroll down">
        <span />
      </a>
    </section>
  );
}
