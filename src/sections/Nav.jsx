import { useEffect, useState } from 'react';
import Magnet from '../components/reactbits/Magnet';
import { site, cta } from '../content';

const links = [
  ['#film', 'Video'],
  ['#why', 'Why Us'],
  ['#voices', 'Voices'],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#top" className="nav__brand" aria-label="Back to top">
        <span className="nav__mark">IC</span>
        <span className="nav__name">
          {site.program} <em>· Manajemen UNIKAL</em>
        </span>
      </a>
      <nav className="nav__links" aria-label="Main">
        {links.map(([href, label]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
      <Magnet padding={40} magnetStrength={4}>
        <a className="btn btn--gold btn--sm" href={site.registerUrl}>{cta.button}</a>
      </Magnet>
    </header>
  );
}
