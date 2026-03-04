import { Github, Linkedin, Download, Mail, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const cvUrl = `${import.meta.env.BASE_URL}Yordin_Herrera_CV.pdf`;
  const { t } = useLanguage();

  return (
    <section id="hero" className="section-page flex items-center justify-center bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/5 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-full blur-2xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
              <img src="/images/profile.jpg" alt="Yordin Herrera" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="text-center lg:text-left space-y-6 max-w-xl">
            <div className="space-y-3">
              <p className="text-muted-foreground text-lg font-light tracking-wide animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {t.heroGreeting}
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Yordin Herrera B.
              </h1>
              <p className="text-2xl md:text-3xl font-semibold gradient-text animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                {t.heroRole}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {t.heroDescription}
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <a href={cvUrl} download="Yordin_Herrera_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity">
                <Download size={16} />
                {t.downloadCV}
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors">
                <Mail size={16} />
                {t.contact}
              </a>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <a href="https://github.com/YordinZ" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/yordinxherrera/" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce">
        <ChevronDown size={28} />
      </a>
    </section>
  );
};

export default HeroSection;
