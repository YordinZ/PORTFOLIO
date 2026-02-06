import { useEffect, useRef } from 'react';
import { GraduationCap, Award, Globe } from 'lucide-react';

const Education = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = canvas.offsetHeight;

    const waves: Array<{
      y: number;
      length: number;
      amplitude: number;
      frequency: number;
      color: string;
    }> = [
      { y: 100, length: 0.01, amplitude: 50, frequency: 0.002, color: 'rgba(0, 157, 255, 0.3)' },
      { y: 150, length: 0.015, amplitude: 40, frequency: 0.003, color: 'rgba(255, 0, 255, 0.2)' },
      { y: 200, length: 0.012, amplitude: 45, frequency: 0.0025, color: 'rgba(0, 157, 255, 0.15)' },
    ];

    let animationId: number;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);

        for (let x = 0; x < canvas.width; x++) {
          const y = wave.y + Math.sin(x * wave.length + frame * wave.frequency) * wave.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      frame++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const education = [
    {
      type: 'academic',
      icon: GraduationCap,
      title: 'Academic Education',
      items: [
        {
          degree: "Bachelor's Degree in Data Science Engineering",
          institution: 'LEAD University',
          period: 'Expected Graduation: 2027',
          color: 'from-cyan-400 to-blue-500',
        },
        {
          degree: 'Technical Degree in Software Development',
          institution: 'CTP Francisco J. Orlich Professional',
          period: '2017–2022',
          color: 'from-blue-400 to-cyan-500',
        },
      ],
    },
    {
      type: 'professional',
      icon: Award,
      title: 'Professional Development',
      items: [
        {
          degree: 'Python Data Analyst',
          institution: 'DataCamp',
          period: 'Certified',
          color: 'from-fuchsia-400 to-pink-500',
        },
        {
          degree: 'SQL for Data Analysis',
          institution: 'DataCamp',
          period: 'Certified',
          color: 'from-pink-400 to-fuchsia-500',
        },
      ],
    },
    {
      type: 'language',
      icon: Globe,
      title: 'Languages',
      items: [
        {
          degree: 'English – B2',
          institution: 'Professional Working Proficiency',
          period: 'Certified by INA',
          color: 'from-cyan-400 to-fuchsia-500',
        },
        {
          degree: 'Spanish',
          institution: 'Native Speaker',
        },
      ],
    },
  ];

  return (
    <section id="education" className="relative min-h-screen py-32 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,157,255,0.1),transparent_50%)]" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Education & <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {education.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <div
                key={sectionIndex}
                className="group relative"
                style={{
                  animation: `fade-in-up 0.6s ease-out ${sectionIndex * 0.15}s both`,
                }}
              >
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-[1.02] h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-fuchsia-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {section.title}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="group/item relative bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/5 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300"
                        >
                          <div className="space-y-2">
                            <h4 className="text-lg font-bold text-white group-hover/item:text-cyan-400 transition-colors">
                              {item.degree}
                            </h4>
                            <p className="text-white/60 font-medium text-sm">
                              {item.institution}
                            </p>
                            <p className="text-cyan-400 text-xs font-semibold">
                              {item.period}
                            </p>
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 backdrop-blur-xl rounded-full border border-white/10">
            <span className="text-2xl">🐍</span>
            <p className="text-white/80 font-medium">
              Committed to lifelong learning and data science
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Education;
