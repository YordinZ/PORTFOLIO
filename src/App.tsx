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

  // 🔹 Fondo interactivo con el mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 🔹 ENTRAR DIRECTO AL HASH (#projects) DESDE OTRA PÁGINA
  useEffect(() => {
    const go = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;

      let tries = 0;
      const maxTries = 80; // reintenta hasta ~8s

      const timer = window.setInterval(() => {
        tries++;

        const el = document.getElementById(id);
        if (el) {
          // El offset del header lo maneja el CSS (scroll-margin-top)
          el.scrollIntoView({ behavior: 'auto', block: 'start' });
          window.clearInterval(timer);
        }

        if (tries >= maxTries) {
          window.clearInterval(timer);
        }
      }, 100);
    };

    // al montar
    go();

    // por si cambia el hash
    window.addEventListener('hashchange', go);

    // por si imágenes/fonts cambian el layout
    window.addEventListener('load', go);

    return () => {
      window.removeEventListener('hashchange', go);
      window.removeEventListener('load', go);
    };
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