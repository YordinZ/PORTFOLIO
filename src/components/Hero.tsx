import { useEffect, useRef } from 'react';
import { Github, Linkedin, Download, Mail } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // URL para GitHub Pages
  const cvUrl = `${import.meta.env.BASE_URL}assets/Yordin_Herrera_CV.pdf`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 2
        );

        gradient.addColorStop(0, i % 2 === 0 ? '#009dff' : '#ff00ff');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i === j) return;

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 157, 255, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          {/* Profile image */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />

            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
              <img
                src={`${import.meta.env.BASE_URL}assets/image.jpg`}
                alt="Profile"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-white"
                fill="none"
              >
                <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 4L9.8589 19.4548" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Text */}
          <div className="text-center lg:text-left space-y-6 max-w-2xl">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-light text-white/70">
                Hi, I'm
              </h3>
              <h1 className="text-5xl md:text-7xl font-bold text-white">
                Yordin Herrera B.
              </h1>
              <p className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                Data Science
              </p>
            </div>

            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              Passionate about data-driven insights and animal welfare. Building solutions that make a difference.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 hover:shadow-xl hover:shadow-white/20 hover:scale-105 transition-all"
              >
                <Download size={20} className="group-hover:animate-bounce" />
                <span>Open CV</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/20 text-white font-semibold hover:bg-white/10 hover:border-white/40 hover:scale-105 transition-all"
              >
                <Mail size={20} />
                <span>Contact</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-6 justify-center lg:justify-start">
              <a
                href="https://github.com/YordinZ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-fuchsia-600 hover:border-transparent hover:scale-110 transition-all"
              >
                <Github className="text-white" size={24} />
              </a>

              <a
                href="https://www.linkedin.com/in/yordinxherrera/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-cyan-500 hover:to-fuchsia-600 hover:border-transparent hover:scale-110 transition-all"
              >
                <Linkedin className="text-white" size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
