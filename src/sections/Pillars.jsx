import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ShinyText from '../components/reactbits/ShinyText';
import { pillars } from '../content';

// Desktop: section di-pin, kartu bergeser horizontal. Mobile: tumpuk vertikal.
export default function Pillars() {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 900px)', () => {
        const distance = () => track.current.scrollWidth - window.innerWidth + 64;
        gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: 0.8, pin: true, invalidateOnRefresh: true },
        });
      });
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.pillar').forEach(card => {
          gsap.from(card.querySelector('.pillar__no'), {
            yPercent: 60, opacity: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="why" className="pillars" ref={root}>
      <div className="pillars__head container">
        <p className="eyebrow">Why International Class</p>
        <h2 className="display">
          Four reasons to <ShinyText text="choose us" color="#C9A24B" shineColor="#FFF4D6" speed={3} />
        </h2>
      </div>
      <div className="pillars__track" ref={track}>
        {pillars.map(p => (
          <article className="pillar" key={p.no}>
            <span className="pillar__no">{p.no}</span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
