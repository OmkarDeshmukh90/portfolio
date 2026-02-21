/* ===========================================
   MAIN APPLICATION
   =========================================== */

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';

import { Creative } from './components/sections/Creative';
import { Contact } from './components/sections/Contact';
import { SpotlightCursor } from './components/ui/SpotlightCursor';
import './styles/global.css';

function App() {
  return (
    <>
      <title>Omkar | Full Stack Developer</title>
      <meta name="description" content="Full-stack developer crafting beautiful, functional digital experiences. Specializing in React, TypeScript, and modern web technologies." />
      <meta name="keywords" content="Omkar, developer, full-stack, react, typescript, portfolio" />
      <meta property="og:title" content="Omkar | Full Stack Developer" />
      <meta property="og:description" content="Full-stack developer crafting beautiful digital experiences." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      <Navbar />
      <SpotlightCursor />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Creative />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
