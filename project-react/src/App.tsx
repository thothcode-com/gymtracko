import { useRef } from 'react';
import { useLenisScroll } from './hooks/useLenisScroll';
import { DemoModalProvider } from './context/DemoModalContext';
import { Cursor } from './components/Cursor/Cursor';
import { GridCanvas } from './components/GridCanvas/GridCanvas';
import { ParticleCanvas } from './components/ParticleCanvas/ParticleCanvas';
import { HeroPhone } from './components/HeroPhone/HeroPhone';
import { Nav } from './components/Nav/Nav';
import { Hero } from './components/Hero/Hero';
import { Ticker } from './components/Ticker/Ticker';
import { Problem } from './components/Problem/Problem';
import { Features } from './components/Features/Features';
import { Admin } from './components/Admin/Admin';
import { Retention } from './components/Retention/Retention';
import { Timeline } from './components/Timeline/Timeline';
import { Testimonial } from './components/Testimonial/Testimonial';
import { CtaFinal } from './components/CtaFinal/CtaFinal';
import { Footer } from './components/Footer/Footer';
import { DemoModal } from './components/DemoModal/DemoModal';

function App() {
  const featuresRef = useRef<HTMLElement>(null);
  useLenisScroll();

  return (
    <DemoModalProvider>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Cursor />
      <GridCanvas />
      <ParticleCanvas />
      <HeroPhone featuresRef={featuresRef} />

      <Nav />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Ticker />
        <Problem />
        <Features sectionRef={featuresRef} />
        <Admin />
        <Retention />
        <Timeline />
        <Testimonial />
        <CtaFinal />
      </main>

      <Footer />

      <DemoModal />
    </DemoModalProvider>
  );
}

export default App;
