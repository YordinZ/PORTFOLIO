import { useEffect, useRef } from 'react';
import { Code2, Laptop, FileCode, ExternalLink, DollarSign, Dice5, Github } from 'lucide-react';

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      section.style.setProperty('--mouse-x', `${x}px`);
      section.style.setProperty('--mouse-y', `${y}px`);
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: 'Background Remover',
      icon: FileCode,
      description: 'AI-powered background removal tool using advanced computer vision techniques.',
      tags: ['Python', 'Streamlit', 'rembg', 'ONNX Runtime', 'PIL', 'API (Backend)'],
      demoUrl: 'https://yordinz.github.io/Background-Remover/',
      codeUrl: 'https://github.com/YordinZ/Background-Remover',
    },
    {
      title: 'Hand-Gesture Detection',
      icon: Code2,
      description: 'Innovative AI experiment exploring prosthetic technology applications.',
      tags: ['Machine Learning', 'TensorFlow', 'IoT'],
      demoUrl: 'https://yordinz.github.io/Hand-Gesture-Detection/',
      codeUrl: 'https://github.com/YordinZ/Hand-Gesture-Detection',
    },
    {
      title: 'Python React GUI Calculator',
      icon: Laptop,
      description: 'TENGO QUE CAMBIAR.',
      tags: ['Streamlit', 'Pandas', 'Plotly'],
      demoUrl: 'https://yordinz.github.io/Python-React-GUI-Calculator/',
      codeUrl: 'https://github.com/YordinZ/Python-React-GUI-Calculator',
    },
    {
      title: 'CRC to USD Converter',
      icon: DollarSign,
      description: 'TENGO QUE CAMBIAR.',
      tags: ['Streamlit', 'Pandas', 'Plotly'],
      demoUrl: 'https://yordinz.github.io/CRC-to-USD-Converter/',
      codeUrl: 'https://github.com/YordinZ/CRC-to-USD-Converter',
    },
    {
      title: 'Data-Career',
      icon: Dice5,
      description:
        'End-to-end data analysis project featuring data cleaning, exploration, and interactive dashboards built with Streamlit, Pandas, and Plotly.',
      tags: ['Streamlit', 'Pandas', 'Plotly'],
      demoUrl: 'https://github.com/YordinZ/Data-Career',
      codeUrl: 'https://github.com/YordinZ/Data-Career',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 157, 255, 0.15), transparent 50%),
          linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)
        `,
      }}
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Recent{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{ animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <Icon className="text-white" size={32} />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all"
                    >
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </a>

                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:scale-105 transition-all"
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Projects;