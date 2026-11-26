import useSmoothScroll from './hooks/useSmoothScroll';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import Film from './sections/Film';
import Stats from './sections/Stats';
import Pillars from './sections/Pillars';
import Marquee from './sections/Marquee';
import Voices from './sections/Voices';
import Cta from './sections/Cta';

export default function App() {
  useSmoothScroll();
  return (
    <>
      <a className="skip" href="#film">Skip to video</a>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Film />
        <Stats />
        <Pillars />
        <Marquee />
        <Voices />
        <Cta />
      </main>
    </>
  );
}
