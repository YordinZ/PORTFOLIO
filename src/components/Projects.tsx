import { useEffect, useMemo, useRef, useState } from "react";
import {
  BarChart3,
  Code2,
  Laptop,
  FileCode,
  ExternalLink,
  DollarSign,
  Dice5,
  Github,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type CodeLink =
  | { kind: "single"; url: string }
  | { kind: "split"; frontend: string; backend: string };

type Project = {
  title: string;
  icon: LucideIcon;
  description: string;
  tags: string[];
  demoUrl: string;
  image: string; // ✅ agregado
  code: CodeLink;
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Dropdown state
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });
  const menuRef = useRef<HTMLDivElement>(null);

  // ✅ para que las rutas sirvan en local y GitHub Pages (subpath)
  const ASSET_BASE = import.meta.env.BASE_URL;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      section.style.setProperty("--mouse-x", `${x}px`);
      section.style.setProperty("--mouse-y", `${y}px`);
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const projects: Project[] = useMemo(
    () => [
      {
        title: "Insightful Billing Dashboard",
        icon: BarChart3,
        description:
          "Interactive data analytics dashboard for intelligent billing systems. Features CSV upload, KPI tracking, trend analysis, and business insights visualization.",
        tags: ["Data Analytics", "TailwindCSS", "Neon", "Railway", "React", "TypeScript", "Recharts"],
        demoUrl: "https://yordinz.github.io/Dashboard/",
        image: `${ASSET_BASE}assets/project-billing.jpg`,
        code: { kind: "single", url: "https://github.com/YordinZ/Dashboard" },
      },
      {
        title: "Background Remover",
        icon: FileCode,
        description: "AI-powered background removal tool using advanced computer vision techniques.",
        tags: ["Python", "Streamlit", "rembg", "ONNX Runtime", "PIL", "API (Backend)"],
        demoUrl: "https://yordinz.github.io/Background-Remover/",
        image: `${ASSET_BASE}assets/project-bgremover.jpg`,
        code: {
          kind: "split",
          frontend: "https://github.com/YordinZ/Background-Remover",
          backend: "https://github.com/YordinZ/background-remover-backend",
        },
      },
      {
        title: "Hand-Gesture Detection",
        icon: Code2,
        description: "Innovative AI experiment exploring prosthetic technology applications.",
        tags: ["Python", "OpenCV", "MediaPipe", "NumPy"],
        demoUrl: "https://yordinz.github.io/Hand-Gesture-Detection/",
        image: `${ASSET_BASE}assets/project-gesture.jpg`,
        code: { kind: "single", url: "https://github.com/YordinZ/Hand-Gesture-Detection" },
      },
      {
        title: "Python React GUI Calculator",
        icon: Laptop,
        description:
          "Desktop calculator application built with Python and Tkinter, featuring a clean GUI and basic arithmetic operations.",
        tags: ["Python", "Tkinter", "Desktop GUI"],
        demoUrl: "https://yordinz.github.io/Python-React-GUI-Calculator/",
        image: `${ASSET_BASE}assets/project-calculator.jpg`,
        code: { kind: "single", url: "https://github.com/YordinZ/Python-React-GUI-Calculator" },
      },
      {
        title: "CRC to USD Converter",
        icon: DollarSign,
        description:
          "Real-time currency converter that fetches USD→CRC rates from a Flask API deployed on Render and serves a responsive UI via GitHub Pages.",
        tags: ["HTML", "CSS", "JavaScript", "Flask", "REST API", "Render"],
        demoUrl: "https://yordinz.github.io/CRC-to-USD-Converter/",
        image: `${ASSET_BASE}assets/project-currency.jpg`,
        code: { kind: "single", url: "https://github.com/YordinZ/CRC-to-USD-Converter" },
      },
      {
        title: "Data-Career",
        icon: Dice5,
        description:
          "Turn-based console board game in Python featuring configurable rules via a text file, input validation, and detailed play logging.",
        tags: ["Python", "Game Logic", "Input Validation", "File Parsing"],
        demoUrl: "https://yordinz.github.io/Data-Career/",
        image: `${ASSET_BASE}assets/project-datacareer.jpg`,
        code: { kind: "single", url: "https://github.com/YordinZ/Data-Career" },
      },
    ],
    [ASSET_BASE]
  );

  const closeMenu = () => setOpenMenuIndex(null);

  const positionMenuFromButton = (btn: HTMLButtonElement) => {
    const rect = btn.getBoundingClientRect();
    const gap = 10;
    const desiredTop = rect.bottom + gap;
    const desiredLeft = rect.left;

    const menuWidth = Math.max(rect.width, 220);
    const maxLeft = Math.max(12, window.innerWidth - menuWidth - 12);
    const clampedLeft = Math.min(Math.max(12, desiredLeft), maxLeft);

    const maxTop = Math.max(12, window.innerHeight - 180);
    const clampedTop = Math.min(Math.max(12, desiredTop), maxTop);

    setMenuPos({ top: clampedTop, left: clampedLeft, width: Math.max(rect.width, 220) });
  };

  const toggleSplitMenu = (index: number, buttonEl: HTMLButtonElement) => {
    setOpenMenuIndex((prev) => (prev === index ? null : index));
    positionMenuFromButton(buttonEl);
  };

  useEffect(() => {
    if (openMenuIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      const menuEl = menuRef.current;
      if (menuEl && menuEl.contains(target)) return;

      closeMenu();
    };

    const onReposition = () => {
      const idx = openMenuIndex;
      const btn = document.querySelector<HTMLButtonElement>(`[data-code-split-btn="${idx}"]`);
      if (btn) positionMenuFromButton(btn);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [openMenuIndex]);

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
            Recent{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => {

            return (
              <div
                key={project.title ?? index}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{ animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both` }}
              >
                {/* ✅ IMAGEN */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-transparent to-transparent opacity-80" />
                </div>

                <div className="p-10">
                  <div className="relative space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white">
                        {project.title}
                      </h3>

                      <p className="text-white/60 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-cyan-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-2">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all"
                      >
                        <ExternalLink size={16} />
                        <span>Demo</span>
                      </a>

                      {project.code.kind === "single" ? (
                        <a
                          href={project.code.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:scale-[1.02] transition-all"
                        >
                          <Github size={16} />
                          <span>Code</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          data-code-split-btn={index}
                          onClick={(e) => toggleSplitMenu(index, e.currentTarget as HTMLButtonElement)}
                          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:scale-[1.02] transition-all"
                          aria-haspopup="menu"
                          aria-expanded={openMenuIndex === index}
                        >
                          <Github size={16} />
                          <span>Code</span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${openMenuIndex === index ? "rotate-180" : "rotate-0"
                              }`}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>


                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {openMenuIndex !== null && projects[openMenuIndex]?.code.kind === "split" && (
          <motion.div
            ref={menuRef}
            key={`code-menu-${openMenuIndex}`}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed z-50"
            style={{ top: menuPos.top, left: menuPos.left, width: menuPos.width }}
          >
            <div className="relative rounded-2xl border border-white/10 bg-[#0b0b12]/90 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-fuchsia-500/10 opacity-60" />

              <div className="relative p-2">
                <a
                  href={projects[openMenuIndex].code.frontend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 w-full px-3 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={closeMenu}
                >
                  <span className="text-sm font-semibold">Frontend</span>
                  <ExternalLink size={16} className="text-white/70" />
                </a>

                <a
                  href={projects[openMenuIndex].code.backend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 w-full px-3 py-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={closeMenu}
                >
                  <span className="text-sm font-semibold">Backend</span>
                  <ExternalLink size={16} className="text-white/70" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
