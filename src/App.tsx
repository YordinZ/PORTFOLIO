import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const run = () => {
      let tries = 0;

      const t = setInterval(() => {
        tries++;

        const id = window.location.hash.replace("#", "");
        if (!id) {
          clearInterval(t);
          return;
        }

        const el = document.getElementById(id);
        if (el) {
          const header = document.querySelector("header");
          const headerH = header ? header.getBoundingClientRect().height : 0;

          const topGap = 16; // por tu header: top-4
          const extra = 12;  // margen extra para que respire

          const y =
            el.getBoundingClientRect().top +
            window.scrollY -
            headerH -
            topGap -
            extra;

          window.scrollTo({ top: y, behavior: "smooth" });
          clearInterval(t);
        }

        if (tries >= 40) clearInterval(t);
      }, 100);
    };

    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, []);

  return (
    <div className="relative">
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            600px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(0, 157, 255, 0.1),
            transparent 40%
          )`,
        }}
      />

      <Header />
      <Hero />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
