import ScrollReveal from '../components/reactbits/ScrollReveal';
import { manifesto } from '../content';

export default function Manifesto() {
  return (
    <section id="manifesto" className="section manifesto">
      <div className="container container--narrow">
        <p className="eyebrow">Our belief</p>
        <ScrollReveal baseOpacity={0.12} enableBlur blurStrength={6} baseRotation={2} textClassName="manifesto__text">
          {manifesto}
        </ScrollReveal>
      </div>
    </section>
  );
}
