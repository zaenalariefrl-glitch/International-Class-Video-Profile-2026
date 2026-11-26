import Magnet from '../components/reactbits/Magnet';
import SplitText from '../components/reactbits/SplitText';
import { cta, site } from '../content';

export default function Cta() {
  return (
    <section className="cta">
      <div className="container cta__inner">
        <SplitText text={cta.title} tag="h2" className="cta__title" splitType="words" delay={60} effect="blur" textAlign="center" />
        <Magnet padding={120} magnetStrength={3}>
          <a className="btn btn--gold btn--lg" href={site.registerUrl}>{cta.button} →</a>
        </Magnet>
      </div>
      <footer className="footer container">
        <p>
          {site.program} · {site.department}
          <br />
          {site.university} · {site.year}
        </p>
        <p className="footer__links">
          {site.instagram && <a href={`https://instagram.com/${site.instagram}`}>Instagram</a>}
          {site.contactEmail && <a href={`mailto:${site.contactEmail}`}>Email</a>}
        </p>
      </footer>
    </section>
  );
}
