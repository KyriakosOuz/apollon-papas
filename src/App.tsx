import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { SITE } from './config';
import { useRoute, useRouteScroll } from './router';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Programs from './components/Programs';
import Story from './components/Story';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useScrollMotion } from './hooks/useScrollMotion';

export default function App() {
  const route = useRoute();
  useRouteScroll(route);
  // The route is a dependency: every ScrollTrigger on the page is measured
  // against DOM that a navigation replaces wholesale.
  useScrollMotion(route);
  const { i18n } = useTranslation();

  const rootVars = {
    '--aurora-opacity': SITE.auroraOpacity,
    '--grain-opacity': SITE.grainOpacity,
    '--marquee-duration': `${SITE.marqueeDurationS}s`,
  } as CSSProperties;

  return (
    <div data-lang={i18n.language} data-edit-source={`src/i18n/${i18n.language}.json`} style={rootVars}>
      <Nav route={route} />
      {route === '/about' ? (
        <main>
          <Story />
        </main>
      ) : (
        <>
          <Hero />
          <main>
            <About />
            <Journey />
            <Programs />
            <Contact />
          </main>
        </>
      )}
      <Footer route={route} />
    </div>
  );
}
