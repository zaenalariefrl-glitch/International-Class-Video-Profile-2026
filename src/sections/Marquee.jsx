import ScrollVelocity from '../components/reactbits/ScrollVelocity';
import { marquee } from '../content';

export default function Marquee() {
  return (
    <section className="marquee" aria-hidden="true">
      <ScrollVelocity
        texts={[marquee.join('  ✦  ') + '  ✦  ']}
        velocity={60}
        className="marquee__text"
        outlineAlternate
        fadeEdges
      />
    </section>
  );
}
