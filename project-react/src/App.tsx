import { useLenisScroll } from './hooks/useLenisScroll';
import { Cursor } from './components/Cursor/Cursor';
import { GridCanvas } from './components/GridCanvas/GridCanvas';
import { ParticleCanvas } from './components/ParticleCanvas/ParticleCanvas';
import { Nav } from './components/Nav/Nav';
import { Hero } from './components/Hero/Hero';
import { Ticker } from './components/Ticker/Ticker';
import { Pillars } from './components/Pillars/Pillars';
import { Admin } from './components/Admin/Admin';
import { Retention } from './components/Retention/Retention';
import { Timeline } from './components/Timeline/Timeline';
import { Testimonial } from './components/Testimonial/Testimonial';
import { Authority } from './components/Authority/Authority';
import { CtaFinal } from './components/CtaFinal/CtaFinal';
import { Footer } from './components/Footer/Footer';

function App() {
  useLenisScroll();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Cursor />
      <GridCanvas />
      <ParticleCanvas />

      <Nav />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Ticker />
        <Pillars />
        <Admin />
        <Retention />
        <Timeline />
        <Testimonial />
        <Authority />
        <CtaFinal />
      </main>

      <Footer />
    </>
  );
}

export default App;
