import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: "Data" | "Dev" | "ML" | "Tools" | "Viz";
  description: string;
  orbit: number;
}

const skills: Skill[] = [
  { name: "Python", icon: <PythonIcon />, category: "Dev", description: "Lenguaje principal para análisis de datos y ML", orbit: 1 },
  { name: "SQL", icon: <SQLIcon />, category: "Data", description: "Consultas y gestión de bases de datos", orbit: 1 },
  { name: "Pandas", icon: <PandasIcon />, category: "Data", description: "Manipulación y análisis de datos estructurados", orbit: 1 },
  { name: "NumPy", icon: <NumPyIcon />, category: "Data", description: "Computación numérica y arrays multidimensionales", orbit: 1 },

  { name: "JavaScript", icon: <JavaScriptIcon />, category: "Dev", description: "Desarrollo web interactivo", orbit: 2 },
  { name: "HTML", icon: <HTMLIcon />, category: "Dev", description: "Estructura y semántica web", orbit: 2 },
  { name: "React", icon: <ReactIcon />, category: "Dev", description: "UI moderna con componentes reutilizables", orbit: 2 },
  { name: "Tailwind", icon: <TailwindIcon />, category: "Dev", description: "CSS utility-first para diseño rápido y consistente", orbit: 2 },

  { name: "Git", icon: <GitIcon />, category: "Tools", description: "Control de versiones", orbit: 2 },
  { name: "GitHub", icon: <GitHubIcon />, category: "Tools", description: "Colaboración y repositorios", orbit: 2 },
  { name: "Docker", icon: <DockerIcon />, category: "Tools", description: "Contenedores y despliegue", orbit: 2 },

  { name: "Power BI", icon: <PowerBIIcon />, category: "Viz", description: "Dashboards y reportes interactivos", orbit: 2 },
  { name: "Streamlit", icon: <StreamlitIcon />, category: "Viz", description: "Aplicaciones de datos interactivas", orbit: 2 },

  { name: "EDA", icon: <EDAIcon />, category: "Data", description: "Análisis exploratorio de datos", orbit: 3 },
  { name: "Feature Eng.", icon: <FeatureIcon />, category: "ML", description: "Creación y transformación de características", orbit: 3 },
  { name: "ML Basics", icon: <MLIcon />, category: "ML", description: "Fundamentos de aprendizaje automático", orbit: 3 },
  { name: "Statistics", icon: <StatsIcon />, category: "Data", description: "Análisis estadístico y probabilidad", orbit: 3 },
  { name: "Validation", icon: <ValidationIcon />, category: "ML", description: "Evaluación y validación de modelos", orbit: 3 },
  { name: "API", icon: <APIIcon />, category: "Dev", description: "Integración de servicios externos", orbit: 3 },
  { name: "ETL", icon: <ETLIcon />, category: "Data", description: "Extracción, transformación y carga", orbit: 3 },
  { name: "Docs", icon: <DocsIcon />, category: "Tools", description: "Documentación técnica clara", orbit: 3 },
  { name: "QA/QC", icon: <QAIcon />, category: "Tools", description: "Aseguramiento de calidad", orbit: 3 },
  { name: "Data Val.", icon: <DataValidationIcon />, category: "Data", description: "Validación e integridad de datos", orbit: 3 },
];

const categories = [
  { id: "all", label: "TODOS" },
  { id: "Data", label: "DATA" },
  { id: "Dev", label: "DEV" },
  { id: "ML", label: "ML" },
  { id: "Tools", label: "TOOLS" },
  { id: "Viz", label: "VIZ" },
] as const;

const orbitRadii = { 1: 100, 2: 180, 3: 270 };

export default function Skills() {
  const [isSkillsActive, setIsSkillsActive] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const spiralRef = useRef<HTMLDivElement | null>(null);

  // refs para scroll-control (sin rerenders)
  const inSkillsRef = useRef(false);
  const isZoomedRef = useRef(false);
  const animatingRef = useRef(false);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]["id"]>("all");


  const progress = useMotionValue(0);

  const orbitalX = useTransform(progress, [0, 1], [0, -100]);
  const orbitalY = useTransform(progress, [0, 1], [0, 150]);
  const orbitalScale = useTransform(progress, [0, 1], [1.5, 0.7]);
  const spiralScale = useTransform(progress, [0, 1], [1.8, 0.8]);
  const uiOpacity = useTransform(progress, [0, 0.5, 1], [0, 0.3, 1]);
  const uiY = useTransform(progress, [0, 1], [30, 0]);

  useEffect(() => {
    const unsub = spiralScale.on("change", (v) => {
      if (spiralRef.current) {
        spiralRef.current.style.setProperty("--spiral-scale", v.toString());
      }
    });
    return unsub;
  }, [spiralScale]);

  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => {
      const isCyan = i % 2 === 0;
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${8 + Math.random() * 12}s`,
        color: isCyan ? "rgb(34, 211, 238)" : "rgb(232, 121, 249)",
        shadow: isCyan
          ? "0 0 6px rgb(34, 211, 238), 0 0 12px rgb(34, 211, 238)"
          : "0 0 6px rgb(232, 121, 249), 0 0 12px rgb(232, 121, 249)",
      };
    });
  }, []);
  
  /**
   * Wheel logic:
   * - El scroll SOLO controla zoom
   * - Categorías solo con click
   * - Scroll arriba = ZOOM IN
   * - Scroll abajo = ZOOM OUT (de-zoom)
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ZOOM_MS = 650;
    const ZOOM_OUT = 0;
    const ZOOM_IN = 1;

    const animateProgress = (to: number, ms: number, onComplete?: () => void) => {
      animatingRef.current = true;

      // espiral solo gira en zoom (clase en la section)
      section.classList.toggle("skills--zoomed", to >= 0.999);

      controlsRef.current?.stop();
      controlsRef.current = animate(progress, to, {
        duration: ms / 1000,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          animatingRef.current = false;
          onComplete?.();
        },
      });
    };

    // define cuándo Skills está "activo"
    const io = new IntersectionObserver(
      ([entry]) => {
        const active =
          entry.isIntersecting && entry.intersectionRatio >= 0.55;

        inSkillsRef.current = active;
        setIsSkillsActive(active);

        // Scrollbar highlight
        document.documentElement.classList.toggle(
          "skills-scrollbar",
          active
        );
      },
      { threshold: [0, 0.55, 0.9] }
    );
    io.observe(section);

    const handleWheel = (e: WheelEvent) => {
      if (!inSkillsRef.current) return; // no tocar scroll global

      if (animatingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const dir = Math.sign(e.deltaY);

      // Scroll hacia arriba = Zoom IN
      if (dir < 0) {
        if (isZoomedRef.current) return; // ya está en zoom

        e.preventDefault();
        e.stopPropagation();
        isZoomedRef.current = true;
        animateProgress(ZOOM_IN, ZOOM_MS);
        return;
      }

      // Scroll hacia abajo = Zoom OUT (de-zoom)
      if (dir > 0) {
        if (!isZoomedRef.current) return; // ya está sin zoom, deja pasar scroll

        e.preventDefault();
        e.stopPropagation();
        isZoomedRef.current = false;
        animateProgress(ZOOM_OUT, ZOOM_MS);
        return;
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });

    // init
    progress.set(ZOOM_OUT);
    isZoomedRef.current = false;
    section.classList.remove("skills--zoomed");

    return () => {
      io.disconnect();
      setIsSkillsActive(false);
      // 🔹 Quitar el highlight del scrollbar al salir de Skills
      document.documentElement.classList.remove("skills-scrollbar");

      window.removeEventListener("wheel", handleWheel, true);
      controlsRef.current?.stop();
      section.classList.remove("skills--zoomed");
    };
  }, [progress]);

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const getSkillsByOrbit = (orbit: number) =>
    filteredSkills.filter((s) => s.orbit === orbit);

  const getPositionOnOrbit = (
    index: number,
    total: number,
    radius: number,
    offsetAngle = 0
  ) => {
    const angle = (index / total) * Math.PI * 2 + offsetAngle;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      angle,
    };
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen py-12 pt-40 overflow-hidden"
      style={{
        background: `
          linear-gradient(
            180deg,
            rgba(0, 157, 255, 0.08) 0%,
            rgba(10, 10, 10, 1) 25%,
            rgba(10, 10, 10, 1) 75%,
            rgba(255, 0, 255, 0.08) 100%
          )
        `,
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="spiral-container">
          <div ref={spiralRef} className="spiral-zoom">
            <div className="spiral spiral-1" />
            <div className="spiral spiral-2" />
            <div className="spiral spiral-3" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent top-1/4 animate-pulse" />
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent bottom-1/4 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 rounded-full animate-float-particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
              background: p.color,
              boxShadow: p.shadow,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity: uiOpacity, y: uiY }}
        className="relative z-10 container mx-auto px-4"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div className="space-y-3">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white">
              Technical{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                Stack
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full" />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                  backdrop-blur-sm border
                  ${activeCategory === cat.id
                    ? "bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/20"
                    : "bg-black/30 border-white/10 text-white/60 hover:border-white/30 hover:text-white/80"
                  }
                `}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-4">
        <div
          className="relative flex items-center justify-center"
          style={{ height: "650px" }}
        >
          <motion.div
            className="orbital-system"
            style={{
              x: orbitalX,
              y: orbitalY,
              scale: orbitalScale,
            }}
          >
            <svg
              className="orbit-svg"
              viewBox="-350 -350 700 700"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "900px",
                height: "900px",
                overflow: "visible",
                pointerEvents: "none",
              }}
            >
              <circle
                cx="0"
                cy="0"
                r={orbitRadii[1]}
                fill="none"
                stroke="rgba(34,211,238,0.25)"
                strokeWidth="1.5"
              />
              <circle
                cx="0"
                cy="0"
                r={orbitRadii[2]}
                fill="none"
                stroke="rgba(139,92,246,0.25)"
                strokeWidth="1.5"
              />
              <circle
                cx="0"
                cy="0"
                r={orbitRadii[3]}
                fill="none"
                stroke="rgba(232,121,249,0.25)"
                strokeWidth="1.5"
              />
            </svg>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="z-20"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "96px",
                height: "96px",
                marginLeft: "-48px",
                marginTop: "-48px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, rgb(34, 211, 238), rgb(232, 121, 249))",
                boxShadow:
                  "0 0 40px rgba(34, 211, 238, 0.4), 0 0 80px rgba(232, 121, 249, 0.3)",
              }}
            >
              <span className="text-3xl font-black text-white drop-shadow-lg">
                YH
              </span>
            </motion.div>

            <AnimatePresence mode="sync" initial={false}>
              {getSkillsByOrbit(1).map((skill, index, arr) => {
                const pos = getPositionOnOrbit(
                  index,
                  arr.length,
                  orbitRadii[1],
                  -Math.PI / 4
                );
                return (
                  <SkillNode
                    key={skill.name}
                    skill={skill}
                    position={pos}
                    delay={index * 0.08}
                    colorScheme="cyan"
                    onHoverStart={() => setActiveSkill(skill)}
                    onHoverEnd={() => setActiveSkill(null)}
                    onClick={() => setActiveSkill(skill)}
                  />
                );
              })}

              {getSkillsByOrbit(2).map((skill, index, arr) => {
                const pos = getPositionOnOrbit(
                  index,
                  arr.length,
                  orbitRadii[2],
                  Math.PI / 6
                );
                return (
                  <SkillNode
                    key={skill.name}
                    skill={skill}
                    position={pos}
                    delay={0.3 + index * 0.06}
                    colorScheme="mixed"
                    onHoverStart={() => setActiveSkill(skill)}
                    onHoverEnd={() => setActiveSkill(null)}
                    onClick={() => setActiveSkill(skill)}
                  />
                );
              })}

              {getSkillsByOrbit(3).map((skill, index, arr) => {
                const pos = getPositionOnOrbit(
                  index,
                  arr.length,
                  orbitRadii[3],
                  0
                );
                return (
                  <SkillNode
                    key={skill.name}
                    skill={skill}
                    position={pos}
                    delay={0.5 + index * 0.04}
                    colorScheme="fuchsia"
                    onHoverStart={() => setActiveSkill(skill)}
                    onHoverEnd={() => setActiveSkill(null)}
                    onClick={() => setActiveSkill(skill)}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Scroll Hint Indicator (solo en Skills) */}
      {isSkillsActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="fixed bottom-8 right-8 z-40 hidden md:flex flex-col items-center gap-2 pointer-events-none"
        >
          <div
            className="px-4 py-3 rounded-xl backdrop-blur-md border"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              borderColor: "rgba(34, 211, 238, 0.2)",
              boxShadow:
                "0 0 20px rgba(34, 211, 238, 0.1), 0 0 40px rgba(232, 121, 249, 0.05)",
            }}
          >
            <div className="flex flex-col gap-2 text-xs font-medium">
              {/* ✅ Scroll ↑ = ZOOM */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-3 h-3"
                  style={{ color: "rgb(34, 211, 238)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgb(34, 211, 238), rgb(139, 92, 246))",
                  }}
                >
                  Scroll ↑ Zoom
                </span>
              </div>

              {/* ✅ Scroll ↓ = DE-ZOOM */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-3 h-3"
                  style={{ color: "rgb(232, 121, 249)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgb(139, 92, 246), rgb(232, 121, 249))",
                  }}
                >
                  Scroll ↓ De-zoom
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50
                       rounded-2xl p-5 max-w-sm w-full mx-4
                       bg-black/60 backdrop-blur-xl border border-white/10"
            style={{
              boxShadow:
                "0 0 40px rgba(34, 211, 238, 0.2), 0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(232, 121, 249, 0.2))",
                  border: "1px solid rgba(34, 211, 238, 0.3)",
                }}
              >
                <div className="w-8 h-8 text-cyan-400">{activeSkill.icon}</div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {activeSkill.name}
                </h3>
                <p className="text-xs text-cyan-400/80 uppercase tracking-wider">
                  {activeSkill.category}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/70">
              {activeSkill.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface SkillNodeProps {
  skill: Skill;
  position: { x: number; y: number };
  delay: number;
  colorScheme: "cyan" | "mixed" | "fuchsia";
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

const NODE_SIZE = 48;

function SkillNode({
  skill,
  position,
  delay,
  colorScheme,
  onHoverStart,
  onHoverEnd,
  onClick,
}: SkillNodeProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getColorStyles = () => {
    switch (colorScheme) {
      case "cyan":
        return {
          border: isHovered ? "rgba(34, 211, 238, 0.6)" : "rgba(34, 211, 238, 0.2)",
          shadow: isHovered ? "0 0 30px rgba(34, 211, 238, 0.5)" : "0 4px 20px rgba(0,0,0,0.5)",
          iconColor: "text-cyan-400",
        };
      case "fuchsia":
        return {
          border: isHovered ? "rgba(232, 121, 249, 0.6)" : "rgba(232, 121, 249, 0.2)",
          shadow: isHovered ? "0 0 30px rgba(232, 121, 249, 0.5)" : "0 4px 20px rgba(0,0,0,0.5)",
          iconColor: "text-fuchsia-400",
        };
      default:
        return {
          border: isHovered ? "rgba(139, 92, 246, 0.6)" : "rgba(139, 92, 246, 0.2)",
          shadow: isHovered ? "0 0 30px rgba(139, 92, 246, 0.5)" : "0 4px 20px rgba(0,0,0,0.5)",
          iconColor: "text-violet-400",
        };
    }
  };

  const colors = getColorStyles();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: position.x,
        y: position.y,
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.5,
        delay: hasAnimated ? 0 : delay,
        type: "spring",
        stiffness: 150,
      }}
      onAnimationComplete={() => setHasAnimated(true)}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: `${NODE_SIZE}px`,
        height: `${NODE_SIZE}px`,
        marginLeft: `-${NODE_SIZE / 2}px`,
        marginTop: `-${NODE_SIZE / 2}px`,
      }}
    >
      <div
        onMouseEnter={() => {
          setIsHovered(true);
          onHoverStart();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHoverEnd();
        }}
        onClick={onClick}
        className="relative cursor-pointer w-full h-full rounded-2xl bg-black/50 backdrop-blur-xl flex items-center justify-center"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: colors.shadow,
          zIndex: isHovered ? 50 : 1,
          transform: isHovered ? "scale(1.15)" : "scale(1)",
          transition:
            "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
          willChange: "transform",
        }}
      >
        <div
          className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center ${colors.iconColor}`}
        >
          {skill.icon}
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap
                         px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-sm
                         text-xs font-semibold text-white border border-white/20 shadow-lg"
            >
              {skill.name}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ===========================
   ICONOS (los tuyos)
   =========================== */

function PythonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2c-1.5 0-2.9.2-4.1.6-2.5.8-3 2.4-3 4v2.5h6v1H5.1c-1.8 0-3.4 1.1-3.9 3.2-.6 2.4-.6 3.9 0 6.4.5 1.9 1.6 3.2 3.4 3.2h2.2v-2.9c0-2 1.8-3.8 3.8-3.8h5.9c1.7 0 3-1.4 3-3.1V6.6c0-1.7-1.4-2.9-3-3.2-1-.2-2-.4-3.3-.4zm-3.3 2.3c.6 0 1.1.5 1.1 1.1s-.5 1.2-1.1 1.2c-.6 0-1.2-.5-1.2-1.2s.5-1.1 1.2-1.1z" />
      <path d="M18.9 9.6v2.8c0 2.1-1.9 3.9-3.9 3.9h-5.9c-1.7 0-3 1.4-3 3.1v4.8c0 1.7 1.5 2.7 3 3.1 1.9.5 3.7.6 5.9 0 1.5-.4 3-1.2 3-3.1v-2.3h-6v-1h9c1.8 0 2.4-1.2 3-3.2.6-2.1.5-4.1 0-6.4-.4-1.7-1.2-3.2-3-3.2h-2.1zm-3.4 12.1c.6 0 1.2.5 1.2 1.2s-.5 1.1-1.2 1.1c-.6 0-1.1-.5-1.1-1.1s.5-1.2 1.1-1.2z" />
    </svg>
  );
}

function NumPyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12.5 2L3 7.5v9L12.5 22l9.5-5.5v-9L12.5 2zm0 2.3l6.8 3.9-6.8 3.9-6.8-3.9 6.8-3.9zM5 9.2l6.5 3.8v7.6L5 16.8V9.2zm15 0v7.6l-6.5 3.8V13l6.5-3.8z" />
    </svg>
  );
}

function PandasIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M8 3h2v7H8V3zm0 9h2v9H8v-9zm6 0h2v5h-2v-5zm0-9h2v7h-2V3zm0 16h2v2h-2v-2zM4 7h2v10H4V7zm14 0h2v10h-2V7z" />
    </svg>
  );
}

function SQLIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2C6.48 2 2 4.02 2 6.5V18c0 2.21 4.48 4 10 4s10-1.79 10-4V6.5C22 4.02 17.52 2 12 2zm0 2c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3zM4 9.73c1.54.94 4.39 1.77 8 1.77s6.46-.83 8-1.77V13c0 1.66-3.58 3-8 3s-8-1.34-8-3V9.73zm0 6c1.54.94 4.39 1.77 8 1.77s6.46-.83 8-1.77V18c0 1.66-3.58 3-8 3s-8-1.34-8-3v-2.27z" />
    </svg>
  );
}

function JavaScriptIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M3 3h18v18H3V3zm4.5 15c.5 1 1.5 1.5 2.5 1.5 1.5 0 2.5-1 2.5-2.5v-6h-2v6c0 .5-.5 1-1 1s-1-.5-1.5-1l-1.5 1zm7 0c.5 1 2 1.5 3.5 1.5 2 0 3.5-1 3.5-2.5 0-1.5-1-2-2.5-2.5l-.5-.2c-1-.4-1.5-.6-1.5-1.3 0-.5.5-1 1.5-1s1.5.5 2 1l1-1c-.5-1-1.5-1.5-3-1.5s-3 1-3 2.5c0 1.5 1 2 2.5 2.5l.5.2c1 .4 1.5.6 1.5 1.3 0 .6-.5 1-1.5 1s-2-.5-2.5-1l-1.5 1z" />
    </svg>
  );
}

function HTMLIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M4 2l1.5 17L12 21l6.5-2L20 2H4zm12.5 5H8.5l.2 2h7.6l-.6 7-3.7 1-3.7-1-.3-3h2l.1 1.5 1.9.5 1.9-.5.2-2.5H7.7l-.5-6h9.5l-.2 1z" />
    </svg>
  );
}

function EDAIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
    </svg>
  );
}

function FeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2L4 6v12l8 4 8-4V6l-8-4zm0 2.5L17 7l-5 2.5L7 7l5-2.5zM6 8.5l5 2.5v7L6 15.5v-7zm12 0v7l-5 2.5v-7l5-2.5z" />
    </svg>
  );
}

function MLIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm-4 9a2 2 0 110 4 2 2 0 010-4zm8 0a2 2 0 110 4 2 2 0 010-4z" />
      <path d="M12 9.5c-.5 0-1 .1-1.5.3l-1.5 2.7c.5.3 1 .5 1.5.5h3c.5 0 1-.2 1.5-.5l-1.5-2.7c-.5-.2-1-.3-1.5-.3z" />
    </svg>
  );
}

function StatsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" />
    </svg>
  );
}

function ValidationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
    </svg>
  );
}

function GitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M21.62 11.11l-8.73-8.73a1.3 1.3 0 00-1.84 0L9 4.44l2.32 2.32a1.54 1.54 0 011.95 1.97l2.24 2.24a1.55 1.55 0 11-.93.87l-2.09-2.09v5.5a1.55 1.55 0 11-1.28-.06V9.53a1.55 1.55 0 01-.84-2.03L8.06 5.19l-5.68 5.68a1.3 1.3 0 000 1.84l8.73 8.73a1.3 1.3 0 001.84 0l8.67-8.67a1.3 1.3 0 000-1.66z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.61-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0112 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z" />
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M13.98 11.08h2.12v2.02h-2.12v-2.02zm-2.58 0h2.12v2.02h-2.12v-2.02zm-2.57 0h2.11v2.02H8.83v-2.02zm-2.57 0h2.11v2.02H6.26v-2.02zm2.57-2.47h2.11v2.02H8.83V8.61zm2.57 0h2.12v2.02h-2.12V8.61zm2.58 0h2.12v2.02h-2.12V8.61zm0-2.47h2.12v2.02h-2.12V6.14zM23 12.27c-.29-.32-.93-.48-1.48-.38-.07-.56-.37-1.04-.78-1.46l-.16-.15-.16.13c-.4.32-.61.77-.68 1.24-.03.19-.03.39 0 .57.08.42.27.8.55 1.09-.25.15-.52.27-.8.37-.51.17-1.01.24-1.53.24H.95l-.03.24c-.09.82.02 1.65.27 2.43l.12.32.14.29c.79 1.41 2.1 2.36 3.72 2.78.67.17 1.36.26 2.05.27 1.83.02 3.57-.43 5.08-1.37 1.22-.76 2.26-1.82 3.04-3.16.77.04 1.59-.06 2.26-.45.55-.32.99-.86 1.12-1.47l.06-.27-.28-.22z" />
    </svg>
  );
}

function APIIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M14 12l-2 2-2-2 2-2 2 2zm-2-6l2.12 2.12 2.5-2.5L12 1 7.38 5.62l2.5 2.5L12 6zm-6 6l2.12-2.12-2.5-2.5L1 12l4.62 4.62 2.5-2.5L6 12zm12 0l-2.12 2.12 2.5 2.5L23 12l-4.62-4.62-2.5 2.5L18 12zm-6 6l-2.12-2.12-2.5 2.5L12 23l4.62-4.62-2.5-2.5L12 18z" />
    </svg>
  );
}

function DocsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
  );
}

function QAIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M19.77 5.03l1.4 1.4L8.43 19.17l-5.6-5.6 1.4-1.4 4.2 4.2L19.77 5.03zm-5.6 0L7.2 12l-1.4-1.4L12.77 3.63l1.4 1.4zM5.6 13.17L4.2 14.57l1.4 1.4 1.4-1.4-1.4-1.4z" />
    </svg>
  );
}

function ETLIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.66-1.34-3-3-3S9 4.34 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H3v5h5v-3.05l4-4.2 4 4.2V21h5v-5h-4z" />
    </svg>
  );
}

function DataValidationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
      <path d="M20 17l-1.41-1.41L16 18.17l-1.59-1.59L13 18l3 3 4-4z" />
    </svg>
  );
}

function PowerBIIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M10 2v20c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1zm6 4v16c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1zM4 10v12c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V10c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1z" />
    </svg>
  );
}

function StreamlitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5-9-5-9 5z" />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.73 1.9 1.33.97.97 2.09 2.09 4.6 2.09 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.73-1.9-1.33C15.63 7.12 14.51 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.73 1.9 1.33.97.97 2.09 2.09 4.6 2.09 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.73-1.9-1.33C10.63 13.12 9.51 12 7 12z" />
    </svg>
  );
}
