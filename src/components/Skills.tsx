import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  { name: "Neon", icon: <NeonIcon />, category: "Data", description: "Serverless PostgreSQL database for scalable cloud applications", orbit: 3 },
  { name: "Railway", icon: <RailwayIcon />, category: "Dev", description: "Cloud platform for backend deployment and infrastructure management", orbit: 3 },
  { name: "Formspree", icon: <FormspreeIcon />, category: "Tools", description: "Form backend service for handling contact forms without a custom server", orbit: 3 },
];

const categories = [
  { id: "all", label: "TODOS" },
  { id: "Data", label: "DATA" },
  { id: "Dev", label: "DEV" },
  { id: "ML", label: "ML" },
  { id: "Tools", label: "TOOLS" },
  { id: "Viz", label: "VIZ" },
] as const;

export default function Skills() {
  // ✅ Un solo systemRef (no lo dupliques en el JSX)
  const systemRef = useRef<HTMLDivElement | null>(null);
  const [systemSize, setSystemSize] = useState(700);

  useEffect(() => {
    const el = systemRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSystemSize(Math.min(rect.width, rect.height));
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ✅ orbitRadii dentro del componente (hook OK)
  const orbitRadii = useMemo(() => {
    const r1 = systemSize * 0.16;
    const r2 = systemSize * 0.28;
    const r3 = systemSize * 0.40;
    return { 1: r1, 2: r2, 3: r3 } as const;
  }, [systemSize]);

  const sectionRef = useRef<HTMLElement | null>(null);

  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]["id"]>("all");
  // ✅ Sin zoom/scroll: sistema fijo y centrado
  const orbitalX = 0;
  const orbitalY = 0;
  const orbitalScale = 1;

  const uiOpacity = 1;
  const uiY = 0;

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
   * Active section detection (sin capturar scroll)
   * - Sirve para estilos (ej: scrollbar glow) sin bloquear la rueda del mouse
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const active = entry.isIntersecting && entry.intersectionRatio >= 0.55;

        document.documentElement.classList.toggle("skills-scrollbar", active);
      },
      { threshold: [0, 0.55, 0.9] }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

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
      // ✅ mejor para viewport real, evita scroll horizontal raro
      className="relative min-h-[100svh] py-12 pt-24 overflow-x-clip overflow-y-visible"
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

      {/* ================= Orbital Aura (fondo premium) ================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Aura principal */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
               w-[min(78vw,820px)] h-[min(78vw,820px)] rounded-full
               blur-2xl opacity-70 animate-aura-breathe"
          style={{
            background:
              "radial-gradient(circle at center, rgba(34,211,238,0.26) 0%, rgba(232,121,249,0.18) 35%, rgba(0,0,0,0) 70%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Halo secundario (más fino) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
               w-[min(62vw,640px)] h-[min(62vw,640px)] rounded-full
               blur-xl opacity-50 animate-aura-drift"
          style={{
            background:
              "radial-gradient(circle at center, rgba(232,121,249,0.22) 0%, rgba(34,211,238,0.12) 40%, rgba(0,0,0,0) 72%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Particles */}
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

      {/* Header UI */}
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

      {/* Orbital System */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="relative flex items-center justify-center">
          {/* ✅ SOLO uno: systemRef */}
          <div
            ref={systemRef}
            className="relative w-full max-w-[900px] aspect-square [height:clamp(340px,66vh,680px)]"
            // ✅ size de nodos responsive
            style={{ ["--node" as any]: "clamp(34px,4.2vw,48px)" }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ x: orbitalX, y: orbitalY, scale: orbitalScale }}
            >
              {/* ✅ SVG responsive */}
              <svg
                className="absolute inset-0"
                viewBox="-350 -350 700 700"
                style={{
                  width: "100%",
                  height: "100%",
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
                  strokeWidth="1.8"
                />
                <circle
                  cx="0"
                  cy="0"
                  r={orbitRadii[2]}
                  fill="none"
                  stroke="rgba(139,92,246,0.25)"
                  strokeWidth="1.8"
                />
                <circle
                  cx="0"
                  cy="0"
                  r={orbitRadii[3]}
                  fill="none"
                  stroke="rgba(232,121,249,0.25)"
                  strokeWidth="1.8"
                />
              </svg>

              {/* Centro */}
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

              {/* Nodes */}
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
      </div>

      {/* Tooltip Card */}
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
                <h3 className="text-lg font-bold text-white">{activeSkill.name}</h3>
                <p className="text-xs text-cyan-400/80 uppercase tracking-wider">
                  {activeSkill.category}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/70">{activeSkill.description}</p>
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
        // ✅ tamaño responsive
        width: "var(--node)",
        height: "var(--node)",
        marginLeft: "calc(var(--node) / -2)",
        marginTop: "calc(var(--node) / -2)",
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
        className="relative cursor-pointer w-full h-full rounded-2xl bg-black/25 backdrop-blur-xl flex items-center justify-center"
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
        <div className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center ${colors.iconColor}`}>
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

function NeonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M4 4h3v16H4zM9 4h3l5 8V4h3v16h-3l-5-8v8H9z" />
    </svg>
  );
}

function RailwayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M4 17h16v2H4zM6 15V7h2v8H6zm5 0V5h2v10h-2zm5 0V9h2v6h-2z" />
    </svg>
  );
}

function FormspreeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M3 4h18v2H3zm0 4h18v12H3zM7 12h10v2H7z" />
    </svg>
  );
}
