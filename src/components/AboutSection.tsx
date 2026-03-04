import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { ref, visible } = useReveal();
  const { t } = useLanguage();

  const education = [
    { degree: t.aboutDegree1, institution: t.aboutInst1, period: t.aboutPeriod1 },
    { degree: t.aboutDegree2, institution: t.aboutInst2, period: t.aboutPeriod2 },
  ];

  return (
    <section id="about" className="section-page flex items-center bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div
        ref={ref}
        className={`relative z-10 container mx-auto px-6 max-w-4xl transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            {t.aboutTitle} <span className="gradient-text">{t.aboutTitleAccent}</span>
          </h2>
          <div className="w-16 h-0.5 mx-auto rounded-full" style={{ background: 'var(--gradient-accent)' }} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            <p className="text-muted-foreground leading-relaxed">{t.aboutP1}</p>
            <p className="text-muted-foreground leading-relaxed">{t.aboutP2}</p>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-muted/50 border border-border text-sm">
              <span className="text-lg">🐍</span>
              <span className="text-muted-foreground font-medium">{t.aboutBadge}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest mb-6 text-orange-600">
              {t.aboutEducation}
            </h3>

            {education.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-muted/30 border border-border/50 hover:border-border transition-colors">
                <h4 className="font-semibold text-foreground text-sm">{item.degree}</h4>
                <p className="text-muted-foreground text-sm mt-1">{item.institution}</p>
                <p className="text-primary text-xs font-medium mt-1">{item.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
