import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { voices } from '../content';

export default function Voices() {
  const root = useRef(null);
  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.voice', {
          y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 70%' },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="voices" className="section voices" ref={root}>
      <div className="container">
        <p className="eyebrow">Voices</p>
        <h2 className="display">Heard from our class</h2>
        <div className="voices__grid">
          {voices.map(v => (
            <figure className="voice" key={v.name}>
              <blockquote>“{v.quote}”</blockquote>
              <figcaption>
                <strong>{v.name}</strong>
                <span>{v.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
