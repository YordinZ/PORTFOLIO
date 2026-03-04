import { useMemo, useRef, useState, useEffect } from "react";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";
import { useLanguage } from "@/contexts/LanguageContext";

type CodeLink =
  | { kind: "single"; url: string }
  | { kind: "split"; frontend: string; backend: string };

type Project = {
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  image: string;
  code: CodeLink;
};

const isSplit = (code: CodeLink): code is { kind: "split"; frontend: string; backend: string } =>
  code.kind === "split";

const ProjectsSection = () => {
  const { ref, visible } = useReveal();
  const { t } = useLanguage();
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = useMemo(() => [
    {
      title: t.projBillingTitle,
      description: t.projBillingDesc,
      tags: ["Data Analytics", "React", "TypeScript", "Neon", "Recharts"],
      demoUrl: "https://yordinz.github.io/Dashboard/",
      image: "/PORTFOLIO/images/project-billing.jpg",
      code: { kind: "single", url: "https://github.com/YordinZ/Dashboard" },
    },
    {
      title: t.projBgTitle,
      description: t.projBgDesc,
      tags: ["Python", "Streamlit", "rembg", "ONNX Runtime"],
      demoUrl: "https://yordinz.github.io/Background-Remover/",
      image: "/PORTFOLIO/images/project-bgremover.jpg",
      code: { kind: "split", frontend: "https://github.com/YordinZ/Background-Remover", backend: "https://github.com/YordinZ/background-remover-backend" },
    },
    {
      title: t.projGestureTitle,
      description: t.projGestureDesc,
      tags: ["Python", "OpenCV", "MediaPipe", "NumPy"],
      demoUrl: "https://yordinz.github.io/Hand-Gesture-Detection/",
      image: "/PORTFOLIO/images/project-gesture.jpg",
      code: { kind: "single", url: "https://github.com/YordinZ/Hand-Gesture-Detection" },
    },
    {
      title: t.projCalcTitle,
      description: t.projCalcDesc,
      tags: ["Python", "Tkinter", "Desktop GUI"],
      demoUrl: "https://yordinz.github.io/Python-React-GUI-Calculator/",
      image: "/PORTFOLIO/images/project-calculator.jpg",
      code: { kind: "single", url: "https://github.com/YordinZ/Python-React-GUI-Calculator" },
    },
    {
      title: t.projCurrTitle,
      description: t.projCurrDesc,
      tags: ["HTML", "CSS", "JavaScript", "Flask", "REST API"],
      demoUrl: "https://yordinz.github.io/CRC-to-USD-Converter/",
      image: "/PORTFOLIO/images/project-currency.jpg",
      code: { kind: "single", url: "https://github.com/YordinZ/CRC-to-USD-Converter" },
    },
    {
      title: t.projDataTitle,
      description: t.projDataDesc,
      tags: ["Python", "Game Logic", "File Parsing"],
      demoUrl: "https://yordinz.github.io/Data-Career/",
      image: "/PORTFOLIO/images/project-datacareer.jpg",
      code: { kind: "single", url: "https://github.com/YordinZ/Data-Career" },
    },
  ], [t]);

  const closeMenu = () => setOpenMenuIndex(null);

  const positionMenuFromButton = (btn: HTMLButtonElement) => {
    const rect = btn.getBoundingClientRect();
    const menuWidth = Math.max(rect.width, 200);
    const maxLeft = Math.max(12, window.innerWidth - menuWidth - 12);
    setMenuPos({
      top: Math.min(rect.bottom + 8, window.innerHeight - 140),
      left: Math.min(Math.max(12, rect.left), maxLeft),
      width: menuWidth,
    });
  };

  const toggleSplitMenu = (index: number, btn: HTMLButtonElement) => {
    setOpenMenuIndex(prev => prev === index ? null : index);
    positionMenuFromButton(btn);
  };

  useEffect(() => {
    if (openMenuIndex === null) return;
    const onClose = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) closeMenu();
    };
    window.addEventListener("keydown", onClose);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onClose);
      window.removeEventListener("pointerdown", onClick);
    };
  }, [openMenuIndex]);

  const active = openMenuIndex !== null ? projects[openMenuIndex] : null;

  return (
    <section id="projects" className="section-page flex items-center bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-primary/3 rounded-full blur-[120px]" />
      </div>

      <div
        ref={ref}
        className={`relative z-10 container mx-auto px-6 py-20 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="text-center mb-14 space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            {t.projectsTitle} <span className="gradient-text">{t.projectsTitleAccent}</span>
          </h2>
          <div className="w-16 h-0.5 mx-auto rounded-full" style={{ background: 'var(--gradient-accent)' }} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              style={{ animation: `fade-in-up 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s both` }}
            >
              {/* Image — fixed 16:9 */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content — flex-1 to equalize */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-semibold text-foreground text-base mb-2 leading-snug">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs font-medium bg-muted border border-border/50 rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons pinned to bottom */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 text-white"
                    style={{ background: 'var(--gradient-accent)' }}
                  >
                    <ExternalLink size={14} />
                    Demo
                  </a>

                  {project.code.kind === "single" ? (
                    <a
                      href={project.code.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-muted border border-border/50 text-foreground text-sm font-semibold hover:bg-muted/80 transition-colors"
                    >
                      <Github size={14} />
                      Code
                    </a>
                  ) : (
                    <button
                      type="button"
                      data-code-split-btn={index}
                      onClick={e => toggleSplitMenu(index, e.currentTarget)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-muted border border-border/50 text-foreground text-sm font-semibold hover:bg-muted/80 transition-colors"
                    >
                      <Github size={14} />
                      Code
                      <ChevronDown size={14} className={`transition-transform ${openMenuIndex === index ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Split menu */}
      <AnimatePresence>
        {openMenuIndex !== null && active && isSplit(active.code) && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50"
            style={{ top: menuPos.top, left: menuPos.left, width: menuPos.width }}
          >
            <div className="rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-xl overflow-hidden p-1.5">
              <a href={active.code.frontend} target="_blank" rel="noopener noreferrer" onClick={closeMenu}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
                Frontend <ExternalLink size={14} className="text-muted-foreground" />
              </a>
              <a href={active.code.backend} target="_blank" rel="noopener noreferrer" onClick={closeMenu}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors">
                Backend <ExternalLink size={14} className="text-muted-foreground" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
