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
  { name: "AtlassianIcon", icon: <AtlassianIcon />, category: "Tools", description: "Documentación técnica clara", orbit: 3 },
  { name: "QA/QC", icon: <QAIcon />, category: "Tools", description: "Aseguramiento de calidad", orbit: 3 },
  { name: "Data Val.", icon: <DataValidationIcon />, category: "Data", description: "Validación e integridad de datos", orbit: 3 },
  { name: "Neon", icon: <NeonIcon />, category: "Data", description: "Serverless PostgreSQL database for scalable cloud applications", orbit: 3 },
  { name: "Railway", icon: <RailwayIcon />, category: "Dev", description: "Cloud platform for backend deployment and infrastructure management", orbit: 3 },
  { name: "Formspree", icon: <FormspreeIcon />, category: "Tools", description: "Form backend service for handling contact forms without a custom server", orbit: 3 },
  { name: "Render", icon: <RenderIcon />, category: "Dev", description: "Cloud platform for deploying web services, APIs, and full-stack applications", orbit: 3 },
  { name: "Hugging Face", icon: <HuggingFaceIcon />, category: "ML", description: "Open-source AI platform for machine learning models, transformers, and NLP applications", orbit: 3 },
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
  // Un solo systemRef (no lo dupliques en el JSX)
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

  // orbitRadii dentro del componente (hook OK)
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
  // Sin zoom/scroll: sistema fijo y centrado
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
      // mejor para viewport real, evita scroll horizontal raro
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
          {/* SOLO uno: systemRef */}
          <div
            ref={systemRef}
            className="relative w-full max-w-[900px] aspect-square [height:clamp(340px,66vh,680px)]"
            // size de nodos responsive
            style={{ ["--node" as any]: "clamp(34px,4.2vw,48px)" }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ x: orbitalX, y: orbitalY, scale: orbitalScale }}
            >
              {/* SVG responsive */}
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
        // tamaño responsive
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
   ICONOS
   =========================== */

function PythonIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0164 2C10.8193 2 9.03825 3.72453 9.03825 5.85185V8.51852H15.9235V9.25926H5.97814C3.78107 9.25926 2 10.9838 2 13.1111L2 18.8889C2 21.0162 3.78107 22.7407 5.97814 22.7407H8.27322V19.4815C8.27322 17.3542 10.0543 15.6296 12.2514 15.6296H19.5956C21.4547 15.6296 22.9617 14.1704 22.9617 12.3704V5.85185C22.9617 3.72453 21.1807 2 18.9836 2H13.0164ZM12.0984 6.74074C12.8589 6.74074 13.4754 6.14378 13.4754 5.40741C13.4754 4.67103 12.8589 4.07407 12.0984 4.07407C11.3378 4.07407 10.7213 4.67103 10.7213 5.40741C10.7213 6.14378 11.3378 6.74074 12.0984 6.74074Z"
        fill="url(#paint0_linear)"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.9834 30C21.1805 30 22.9616 28.2755 22.9616 26.1482V23.4815L16.0763 23.4815L16.0763 22.7408L26.0217 22.7408C28.2188 22.7408 29.9998 21.0162 29.9998 18.8889V13.1111C29.9998 10.9838 28.2188 9.25928 26.0217 9.25928L23.7266 9.25928V12.5185C23.7266 14.6459 21.9455 16.3704 19.7485 16.3704L12.4042 16.3704C10.5451 16.3704 9.03809 17.8296 9.03809 19.6296L9.03809 26.1482C9.03809 28.2755 10.8192 30 13.0162 30H18.9834ZM19.9015 25.2593C19.1409 25.2593 18.5244 25.8562 18.5244 26.5926C18.5244 27.329 19.1409 27.9259 19.9015 27.9259C20.662 27.9259 21.2785 27.329 21.2785 26.5926C21.2785 25.8562 20.662 25.2593 19.9015 25.2593Z"
        fill="url(#paint1_linear)"
      />

      <defs>
        <linearGradient
          id="paint0_linear"
          x1="12.4809"
          y1="2"
          x2="12.4809"
          y2="22.7407"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#327EBD" />
          <stop offset="1" stopColor="#1565A7" />
        </linearGradient>

        <linearGradient
          id="paint1_linear"
          x1="19.519"
          y1="9.25928"
          x2="19.519"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDA4B" />
          <stop offset="1" stopColor="#F9C600" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function NumPyIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="14.048 7.689 9.405 5.327 4.309 7.89 9.078 10.303 14.048 7.689" fill="#4dabcf" />
      <polygon points="16.177 8.771 21.045 11.247 15.994 13.803 11.218 11.386 16.177 8.771" fill="#4dabcf" />
      <polygon points="22.678 5.363 27.679 7.89 23.207 10.153 18.328 7.674 22.678 5.363" fill="#4dabcf" />
      <polygon points="20.526 4.274 16.023 2 11.57 4.239 16.209 6.597 20.526 4.274" fill="#4dabcf" />
      <polygon points="17.006 23.809 17.006 30 22.46 27.258 22.454 21.064 17.006 23.809" fill="#4dabcf" />
      <polygon points="22.452 18.903 22.446 12.774 17.006 15.499 17.006 21.63 22.452 18.903" fill="#4dabcf" />
      <polygon points="29 17.754 29 23.969 24.348 26.308 24.345 20.122 29 17.754" fill="#4dabcf" />
      <polygon points="29 15.581 29 9.491 24.339 11.826 24.343 17.967 29 15.581" fill="#4dabcf" />

      <path
        d="M15.08,15.5l-3.674-1.861v8.045S6.913,12.05,6.5,11.185a.9.9,0,0,0-.331-.264C5.361,10.5,3,9.29,3,9.29V23.5L6.266,25.26V17.832s4.445,8.607,4.49,8.7a4.026,4.026,0,0,0,.968,1.32c.635.423,3.357,2.073,3.357,2.073Z"
        fill="#4d77cf"
      />
    </svg>
  );
}

function PandasIcon() {
  return (
    <svg
      viewBox="0 0 128 128"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M48.697 15.176h12.25v25.437h-12.25z"
        fill="#130754"
      />
      <path
        d="M48.697 52.251h12.25v25.436h-12.25z"
        fill="#130754"
      />
      <path
        d="M48.697 48.037h12.25v12.001h-12.25z"
        fill="#ffca00"
      />
      <path
        d="M29.017 36.087h12.25v84.552h-12.25z"
        fill="#130754"
      />
      <path
        d="M67.97 88.414h12.25v25.436H67.97z"
        fill="#130754"
      />
      <path
        d="M67.97 36.117h12.25v25.437H67.97z"
        fill="#130754"
      />
      <path
        d="M67.97 68.983h12.25v12.001H67.97z"
        fill="#e70488"
      />
      <path
        d="M87.238 8.55h12.25v84.552h-12.25z"
        fill="#130754"
      />
    </svg>
  );
}

function SQLIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.562,15.256A21.159,21.159,0,0,0,16,16.449a21.159,21.159,0,0,0,7.438-1.194c1.864-.727,2.525-1.535,2.525-2V9.7a10.357,10.357,0,0,1-2.084,1.076A22.293,22.293,0,0,1,16,12.078a22.36,22.36,0,0,1-7.879-1.3A10.28,10.28,0,0,1,6.037,9.7v3.55C6.037,13.724,6.7,14.528,8.562,15.256Z"
        fill="#ffda44"
      />
      <path
        d="M8.562,21.961a15.611,15.611,0,0,0,2.6.741A24.9,24.9,0,0,0,16,23.155a24.9,24.9,0,0,0,4.838-.452,15.614,15.614,0,0,0,2.6-.741c1.864-.727,2.525-1.535,2.525-2v-3.39a10.706,10.706,0,0,1-1.692.825A23.49,23.49,0,0,1,16,18.74a23.49,23.49,0,0,1-8.271-1.348,10.829,10.829,0,0,1-1.692-.825V19.96C6.037,20.426,6.7,21.231,8.562,21.961Z"
        fill="#ffda44"
      />
      <path
        d="M16,30c5.5,0,9.963-1.744,9.963-3.894V23.269a10.5,10.5,0,0,1-1.535.762l-.157.063A23.487,23.487,0,0,1,16,25.445a23.422,23.422,0,0,1-8.271-1.351c-.054-.02-.106-.043-.157-.063a10.5,10.5,0,0,1-1.535-.762v2.837C6.037,28.256,10.5,30,16,30Z"
        fill="#ffda44"
      />
      <ellipse
        cx="16"
        cy="5.894"
        rx="9.963"
        ry="3.894"
        fill="#ffda44"
      />
    </svg>
  );
}

function JavaScriptIcon() {
  return (
    <svg
      viewBox="0 0 512 512"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="JavaScript"
      role="img"
    >
      <rect
        width="512"
        height="512"
        rx="15%"
        fill="#f7df1e"
      />

      <path
        d="M324 370c10 17 24 29 47 29c20 0 33-10 33 -24c0-16 -13 -22 -35 -32l-12-5c-35-15 -58 -33 -58 -72c0-36 27 -64 70 -64c31 0 53 11 68 39l-37 24c-8-15 -17 -21 -31 -21c-14 0-23 9 -23 21c0 14 9 20 30 29l12 5c41 18 64 35 64 76c0 43-34 67 -80 67c-45 0-74 -21 -88 -49zm-170 4c8 13 14 25 31 25c16 0 26-6 26 -30V203h48v164c0 50-29 72 -72 72c-39 0-61 -20 -72 -44z"
        fill="#000000"
      />
    </svg>
  );
}

function HTMLIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="HTML5"
      role="img"
    >
      <polygon
        points="5.902 27.201 3.655 2 28.345 2 26.095 27.197 15.985 30 5.902 27.201"
        fill="#e44f26"
      />
      <polygon
        points="16 27.858 24.17 25.593 26.092 4.061 16 4.061 16 27.858"
        fill="#f1662a"
      />
      <polygon
        points="16 13.407 11.91 13.407 11.628 10.242 16 10.242 16 7.151 15.989 7.151 8.25 7.151 8.324 7.981 9.083 16.498 16 16.498 16 13.407"
        fill="#ebebeb"
      />
      <polygon
        points="16 21.434 15.986 21.438 12.544 20.509 12.324 18.044 10.651 18.044 9.221 18.044 9.654 22.896 15.986 24.654 16 24.65 16 21.434"
        fill="#ebebeb"
      />
      <polygon
        points="15.989 13.407 15.989 16.498 19.795 16.498 19.437 20.507 15.989 21.437 15.989 24.653 22.326 22.896 22.372 22.374 23.098 14.237 23.174 13.407 22.341 13.407 15.989 13.407"
        fill="#ffffff"
      />
      <polygon
        points="15.989 7.151 15.989 9.071 15.989 10.235 15.989 10.242 23.445 10.242 23.455 10.242 23.517 9.548 23.658 7.981 23.732 7.151 15.989 7.151"
        fill="#ffffff"
      />
    </svg>
  );
}

export function EDAIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white" 
      fill="currentColor"
      aria-label="EDA"
      role="img"
    >
      <path d="M7.9295 2c0.21365 0 0.39135 0.071835 0.533 0.2155 0.14165 0.143835 0.2125 0.322 0.2125 0.5345V11c0 0.2125 -0.07235 0.3906 -0.217 0.53425 -0.1445 0.14385 -0.32365 0.21575 -0.5375 0.21575 -0.21365 0 -0.39135 -0.0719 -0.533 -0.21575 -0.14165 -0.14365 -0.2125 -0.32175 -0.2125 -0.53425V2.75c0 -0.2125 0.07235 -0.390665 0.217 -0.5345 0.1445 -0.143665 0.32365 -0.2155 0.5375 -0.2155Zm4.15 -1c0.21365 0 0.39135 0.071835 0.533 0.2155 0.14165 0.143835 0.2125 0.322 0.2125 0.5345V11c0 0.2125 -0.07235 0.3906 -0.217 0.53425 -0.1445 0.14385 -0.32365 0.21575 -0.5375 0.21575 -0.21365 0 -0.39135 -0.0719 -0.533 -0.21575 -0.14165 -0.14365 -0.2125 -0.32175 -0.2125 -0.53425V1.75c0 -0.2125 0.07235 -0.390665 0.217 -0.5345 0.1445 -0.143665 0.32365 -0.2155 0.5375 -0.2155ZM15.5 16.45V3.75c0 -0.2125 0.07235 -0.390665 0.217 -0.5345 0.1445 -0.143665 0.32365 -0.2155 0.5375 -0.2155 0.21365 0 0.39135 0.071835 0.533 0.2155 0.14165 0.143835 0.2125 0.322 0.2125 0.5345v11.825l-1.5 0.875ZM4.5 16v3.25c0 0.63335 0.216665 1.16665 0.65 1.6 0.43335 0.43335 0.96665 0.65 1.6 0.65h7.175c0.16365 0 0.3171 -0.03335 0.46025 -0.1 0.14315 -0.06665 0.2814 -0.15835 0.41475 -0.275l5.875 -5.9 -7.45 4.35c-0.33335 0.18335 -0.68335 0.2375 -1.05 0.1625 -0.36665 -0.075 -0.66665 -0.2625 -0.9 -0.5625L8.875 16H4.5Zm2.25 7c-1.05 0 -1.9375 -0.3625 -2.6625 -1.0875C3.3625 21.1875 3 20.3019 3 19.25575V14.5h5.875c0.2375 0 0.4625 0.0531 0.675 0.15925 0.2125 0.10635 0.3875 0.25325 0.525 0.44075l2.35 3.15L17 15.575l2.75 -1.6c0.26665 -0.15 0.55415 -0.21665 0.8625 -0.2 0.30835 0.01665 0.57915 0.11665 0.8125 0.3l0.075 0.075c0.36665 0.28335 0.57085 0.64585 0.6125 1.0875 0.04165 0.44165 -0.10415 0.82915 -0.4375 1.1625l-5.8 5.8c-0.26665 0.26665 -0.56715 0.46665 -0.9015 0.6 -0.33435 0.13335 -0.68385 0.2 -1.0485 0.2H6.75ZM4.5 14.5H3V4.75c0 -0.2125 0.072335 -0.390665 0.217 -0.5345C3.3615 4.071835 3.540665 4 3.7545 4c0.213665 0 0.391335 0.071835 0.533 0.2155 0.141665 0.143835 0.2125 0.322 0.2125 0.5345V14.5Z" />
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
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white" 
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      {/* Línea base */}
      <line
        x1="3"
        y1="19"
        x2="21"
        y2="19"
        stroke="#2CA9BC"
      />

      {/* Línea de crecimiento */}
      <polyline
        points="3 15 8 9 14 12 21 5"
        stroke="currentColor"
      />

      {/* Flecha */}
      <polyline
        points="21 10 21 5 16 5"
        stroke="currentColor"
      />
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
    <svg
      viewBox="0 0 32 32"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Git"
      role="img"
    >
      <path
        d="M29.472,14.753,17.247,2.528a1.8,1.8,0,0,0-2.55,0L12.158,5.067l3.22,3.22a2.141,2.141,0,0,1,2.712,2.73l3.1,3.1a2.143,2.143,0,1,1-1.285,1.21l-2.895-2.895v7.617a2.141,2.141,0,1,1-1.764-.062V12.3a2.146,2.146,0,0,1-1.165-2.814L10.911,6.314,2.528,14.7a1.8,1.8,0,0,0,0,2.551L14.753,29.472a1.8,1.8,0,0,0,2.55,0L29.472,17.3a1.8,1.8,0,0,0,0-2.551"
        fill="#dd4c35"
      />
      <path
        d="M12.158,5.067l3.22,3.22a2.141,2.141,0,0,1,2.712,2.73l3.1,3.1a2.143,2.143,0,1,1-1.285,1.21l-2.895-2.895v7.617a2.141,2.141,0,1,1-1.764-.062V12.3a2.146,2.146,0,0,1-1.165-2.814L10.911,6.314"
        fill="#ffffff"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-full h-full text-white"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="GitHub"
      role="img"
    >
      <path
        d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Docker"
      role="img"
      fill="none"
    >
      <path
        fill="#2396ED"
        d="M12.342 4.536l.15-.227.262.159.116.083c.28.216.869.768.996 1.684.223-.04.448-.06.673-.06.534 0 .893.124 1.097.227l.105.057.068.045.191.156-.066.2a2.044 2.044 0 01-.47.73c-.29.299-.8.652-1.609.698l-.178.005h-.148c-.37.977-.867 2.078-1.702 3.066a7.081 7.081 0 01-1.74 1.488 7.941 7.941 0 01-2.549.968c-.644.125-1.298.187-1.953.185-1.45 0-2.73-.288-3.517-.792-.703-.449-1.243-1.182-1.606-2.177a8.25 8.25 0 01-.461-2.83.516.516 0 01.432-.516l.068-.005h10.54l.092-.007.149-.016c.256-.034.646-.11.92-.27-.328-.543-.421-1.178-.268-1.854a3.3 3.3 0 01.3-.81l.108-.187zM2.89 5.784l.04.007a.127.127 0 01.077.082l.006.04v1.315l-.006.041a.127.127 0 01-.078.082l-.039.006H1.478a.124.124 0 01-.117-.088l-.007-.04V5.912l.007-.04a.127.127 0 01.078-.083l.039-.006H2.89zm1.947 0l.039.007a.127.127 0 01.078.082l.006.04v1.315l-.007.041a.127.127 0 01-.078.082l-.039.006H3.424a.125.125 0 01-.117-.088L3.3 7.23V5.913a.13.13 0 01.085-.123l.039-.007h1.413zm1.976 0l.039.007a.127.127 0 01.077.082l.007.04v1.315l-.007.041a.127.127 0 01-.078.082l-.039.006H5.4a.124.124 0 01-.117-.088l-.006-.04V5.912l.006-.04a.127.127 0 01.078-.083l.039-.006h1.413zm1.952 0l.039.007a.127.127 0 01.078.082l.007.04v1.315a.13.13 0 01-.085.123l-.04.006H7.353a.124.124 0 01-.117-.088l-.006-.04V5.912l.006-.04a.127.127 0 01.078-.083l.04-.006h1.412zm1.97 0l.039.007a.127.127 0 01.078.082l.006.04v1.315a.13.13 0 01-.085.123l-.039.006H9.322a.124.124 0 01-.117-.088l-.006-.04V5.912l.006-.04a.127.127 0 01.078-.083l.04-.006h1.411zM4.835 3.892l.04.007a.127.127 0 01.077.081l.007.041v1.315a.13.13 0 01-.085.123l-.039.007H3.424a.125.125 0 01-.117-.09l-.007-.04V4.021a.13.13 0 01.085-.122l.039-.007h1.412zm1.976 0l.04.007a.127.127 0 01.077.081l.007.041v1.315a.13.13 0 01-.085.123l-.039.007H5.4a.125.125 0 01-.117-.09l-.006-.04V4.021l.006-.04a.127.127 0 01.078-.082l.039-.007h1.412zm1.953 0c.054 0 .1.037.117.088l.007.041v1.315a.13.13 0 01-.085.123l-.04.007H7.353a.125.125 0 01-.117-.09l-.006-.04V4.021l.006-.04a.127.127 0 01.078-.082l.04-.007h1.412zm0-1.892c.054 0 .1.037.117.088l.007.04v1.316a.13.13 0 01-.085.123l-.04.006H7.353a.124.124 0 01-.117-.088l-.006-.04V2.128l.006-.04a.127.127 0 01.078-.082L7.353 2h1.412z"
      />
    </svg>
  );
}

function APIIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="API"
      role="img"
    >
      <g>
        <rect y="0" fill="none" width="24" height="24" />
        <g transform="translate(1.000000, 8.000000)">
          <path
            fillRule="evenodd"
            fill="#5C85DE"
            d="M2-1.9c-1.1,0-2.3,1.1-2.3,2.2V10H2V5.5h2.2V10h2.2V0.3c0-1.1-1.1-2.2-2.3-2.2H2
			L2-1.9z M2,3.2v-3h2.2v3H2L2,3.2z"
          />
          <path
            fillRule="evenodd"
            fill="#5C85DE"
            d="M10.3-2C9.1-2,8-0.9,8,0.2V10l2.2,0V5.5h2.2c1.1,0,2.3-1.1,2.3-2.2l0-3
			c0-1.1-1.1-2.2-2.3-2.2H10.3L10.3-2z M10.2,3.2v-3h2.2v3H10.2L10.2,3.2z"
          />
          <polygon
            fillRule="evenodd"
            fill="#5C85DE"
            points="18.5,0.3 18.5,7.8 16.2,7.8 16.2,10 23,10 23,7.8 20.8,7.8 20.8,0.3 23,0.3 
			23,-1.9 16.2,-1.9 16.2,0.3"
          />
          <polygon fillRule="evenodd" fill="#3367D6" points="2,5.5 2,3.2 3.5,3.2" />
          <polygon fillRule="evenodd" fill="#3367D6" points="10.2,5.5 10.2,3.2 11.5,3.2" />
          <polygon fillRule="evenodd" fill="#3367D6" points="18.5,1.8 18.5,1.8 18.5,0.3 20.8,0.3" />
        </g>
      </g>
    </svg>
  );
}

function AtlassianIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 text-sky-500"
      fill="currentColor"
      aria-label="Atlassian"
      role="img"
    >
      <path d="M44.412 12.968c.453-.737.961-1.593 1.393-2.274.387-.652.179-1.494-.467-1.892l-9.057-5.564c-.638-.429-1.504-.261-1.934.377-.018.027-.035.054-.051.082-.362.605-.829 1.391-1.338 2.233-3.588 5.912-7.197 5.189-13.703 2.087L10.303 3.774c-.695-.33-1.526-.035-1.857.658-.005.012-.011.024-.017.037L4.117 14.207c-.305.695.005 1.506.697 1.822 1.895.89 5.664 2.664 9.057 4.299 12.233 5.911 22.606 5.515 30.541-7.36z" />
      <path d="M3.588 36.032c-.453.737-.961 1.593-1.393 2.274-.387.652-.179 1.494.467 1.892l9.057 5.564c.638.429 1.504.261 1.934-.377.018-.027.035-.054.051-.082.362-.605.829-1.391 1.338-2.233 3.588-5.912 7.197-5.189 13.703-2.087l8.952 4.243c.695.33 1.526.035 1.857-.658.006-.012.012-.025.017-.037l4.312-9.738c.305-.695-.005-1.506-.697-1.822-1.895-.89-5.664-2.664-9.057-4.299-12.233-5.911-22.606-5.515-30.541 7.36z" />
    </svg>
  );
}

function QAIcon() {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className="w-6 h-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="QA"
      role="img"
    >
      <path
        d="M287 435q-42 0-74.5 18.5t-51 52.5-18.5 77 18.5 76.5 51.5 52 74 18.5q38 0 67-15l-92-92h74l60 59q16-18 24-39 11-26 11-60 0-43-18.5-77T361 453.5 287 435zm590-328h-57q-10 0-19.5-5T786 89l-39-72q-6-8-14.5-12.5t-18-4.5T696 4.5 682 17l-39 72q-6 8-15 13t-19 5h-58q-33 0-61 16.5t-44.5 45T429 230v56H123q-34 0-62 16.5T16.5 347 0 408v362q0 33 16.5 61.5t44.5 45 62 16.5h69q11 0 20 5t15 13l26 72q6 8 14.5 12.5t18.5 4.5 18.5-4.5T318 983l27-72q6-8 15-13t19-5h70q33 0 61-16.5t44.5-45T572 770v-56h305q34 0 62-16.5t44.5-44.5 16.5-61V230q0-33-16.5-61.5t-44.5-45-62-16.5zM426 786l-29-30q-46 30-110 30-58 0-104.5-26.5t-73-73T83 583t26.5-103.5 73-73.5 104-27T391 406t73.5 73.5T491 583q0 82-54 140l63 63h-74zm503-194q0 21-15.5 36T877 643H571v-52h14l42-94h168l41 94h64L715 177 571 482v-74q0-35-19-65.5T500 297v-67q0-21 15-36t36-15h70q22 0 34.5-7t20.5-21q6-9 14-31 7-18 11-26.5t13.5-8.5 12.5 8l10 27q10 28 15 36 8 13 19.5 18t36.5 5h69q21 0 36.5 15t15.5 36v362zM652 440l60-132 59 132H652z"
        fill="currentColor"
      />
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
    <svg
      viewBox="0 0 32 32"
      className="w-full h-full text-yellow-400"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Power BI"
      role="img"
    >
      <path
        d="M13.501 16h-7.498c0 0-0 0-0 0-0.69 0-1.25 0.559-1.25 1.25v12.496c0 0.69 0.559 1.25 1.25 1.25h8.747v-13.746c0-0.69-0.559-1.25-1.25-1.25zM19.749 8.502h-7.498c-0.69 0-1.25 0.559-1.25 1.25v5.623h2.499c1.035 0.001 1.873 0.84 1.874 1.874v13.746h5.623v-21.244c0-0.69-0.559-1.25-1.25-1.25zM27.247 2.254v27.492c0 0.69-0.559 1.25-1.25 1.25h-4.374v-21.244c-0.001-1.035-0.84-1.873-1.874-1.874h-2.499v-5.623c0-0.69 0.559-1.25 1.25-1.25h7.498c0.69 0 1.25 0.559 1.25 1.25z"
        fill="currentColor"
      />
    </svg>
  );
}

function StreamlitIcon() {
  return (
    <svg
      viewBox="0 0 301 165"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Streamlit"
      role="img"
    >
      <path
        d="M150.731 101.547L98.1387 73.7471L6.84674 25.4969C6.7634 25.4136 6.59674 25.4136 6.51341 25.4136C3.18007 23.8303 -0.236608 27.1636 1.0134 30.497L47.5302 149.139L47.5385 149.164C47.5885 149.281 47.6302 149.397 47.6802 149.514C49.5885 153.939 53.7552 156.672 58.2886 157.747C58.6719 157.831 58.9461 157.906 59.4064 157.998C59.8645 158.1 60.5052 158.239 61.0552 158.281C61.1469 158.289 61.2302 158.289 61.3219 158.297H61.3886C61.4552 158.306 61.5219 158.306 61.5886 158.314H61.6802C61.7386 158.322 61.8052 158.322 61.8636 158.322H61.9719C62.0386 158.331 62.1052 158.331 62.1719 158.331C121.084 164.754 180.519 164.754 239.431 158.331C240.139 158.331 240.831 158.297 241.497 158.231C241.714 158.206 241.922 158.181 242.131 158.156C242.156 158.147 242.189 158.147 242.214 158.139C242.356 158.122 242.497 158.097 242.639 158.072C242.847 158.047 243.056 158.006 243.264 157.964C243.681 157.872 243.87 157.806 244.436 157.611C245.001 157.417 245.94 157.077 246.527 156.794C247.115 156.511 247.522 156.239 248.014 155.931C248.622 155.547 249.201 155.155 249.788 154.715C250.041 154.521 250.214 154.397 250.397 154.222L250.297 154.164L150.731 101.547Z"
        fill="#FF4B4B"
      />
      <path
        d="M294.766 25.4981H294.683L203.357 73.7483L254.124 149.357L300.524 30.4981V30.3315C301.691 26.8314 298.108 23.6648 294.766 25.4981"
        fill="#7D353B"
      />
      <path
        d="M155.598 2.55572C153.264 -0.852624 148.181 -0.852624 145.931 2.55572L98.1389 73.7477L150.731 101.548L250.398 154.222C251.024 153.609 251.526 153.012 252.056 152.381C252.806 151.456 253.506 150.465 254.123 149.356L203.356 73.7477L155.598 2.55572Z"
        fill="#BD4043"
      />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-full h-full text-sky-400"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="React"
      role="img"
    >
      {/* Núcleo */}
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />

      {/* Órbita 1 */}
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      {/* Órbita 2 */}
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        transform="rotate(60 12 12)"
      />

      {/* Órbita 3 */}
      <ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        transform="rotate(120 12 12)"
      />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg
      viewBox="0 -51 256 256"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Tailwind CSS"
    >
      <defs>
        <linearGradient
          id="tailwind-gradient"
          x1="-2.777%"
          y1="32%"
          x2="100%"
          y2="67.556%"
        >
          <stop offset="0%" stopColor="#2298BD" />
          <stop offset="100%" stopColor="#0ED7B5" />
        </linearGradient>
      </defs>

      <path
        d="M128,0 C93.8667,0 72.5333,17.0667 64,51.2 
           C76.8,34.1333 91.7333,27.7333 108.8,32 
           C118.5375,34.4344 125.4974,41.4985 133.2011,49.3184 
           C145.7508,62.0568 160.2754,76.8 192,76.8 
           C226.1333,76.8 247.4667,59.7333 256,25.6 
           C243.2,42.6667 228.2667,49.0667 211.2,44.8 
           C201.4625,42.3656 194.5026,35.3015 186.7989,27.4816 
           C174.2492,14.7432 159.7246,0 128,0 Z 
           M64,76.8 C29.8667,76.8 8.5333,93.8667 0,128 
           C12.8,110.9333 27.7333,104.5333 44.8,108.8 
           C54.5375,111.2344 61.4974,118.2985 69.2011,126.1184 
           C81.7508,138.8568 96.2754,153.6 128,153.6 
           C162.1333,153.6 183.4667,136.5333 192,102.4 
           C179.2,119.4667 164.2667,125.8667 147.2,121.6 
           C137.4625,119.1656 130.5026,112.1015 122.7989,104.2816 
           C110.2492,91.5432 95.7246,76.8 64,76.8 Z"
        fill="url(#tailwind-gradient)"
      />
    </svg>
  );
}

function NeonIcon() {
  return (
    <svg
      viewBox="0 0 256 256"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Neon"
      role="img"
    >
      <defs>
        <linearGradient id="neon-grad" x1="40" y1="40" x2="216" y2="216" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10D6D2" />
          <stop offset="55%" stopColor="#38F79B" />
          <stop offset="100%" stopColor="#7CFF2E" />
        </linearGradient>
      </defs>

      {/* Fondo */}
      <rect x="18" y="18" width="220" height="220" rx="36" fill="#111214" />

      {/* Marco redondeado */}
      <path
        d="M76 44H180C203.2 44 212 52.8 212 76V180C212 203.2 203.2 212 180 212H76C52.8 212 44 203.2 44 180V76C44 52.8 52.8 44 76 44Z"
        fill="none"
        stroke="url(#neon-grad)"
        strokeWidth="30"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* “N” (trazo) */}
      <path
        d="M118 186V106
           C118 92 129 82 143 82
           C152 82 160 86 165 94
           L186 126
           V186"
        fill="none"
        stroke="url(#neon-grad)"
        strokeWidth="30"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RailwayIcon() {
  return (
    <svg
      viewBox="0 0 512 512"
      className="w-full h-full text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      aria-label="Neon"
      role="img"
    >
      <path d="M2.368 219.093A260.486 260.486 0 000 244.864h388.907a44.635 44.635 0 00-5.035-7.381c-66.475-85.888-102.25-78.443-153.387-80.64-17.066-.683-28.65-.982-96.533-.982-36.352 0-75.84.107-114.325.214-4.971 13.44-9.771 26.453-12.118 37.056h199.296v25.962H2.347h.021zm389.59 51.755H.213c.427 6.933 1.067 13.76 2.006 20.501h361.685c16.128 0 25.152-9.152 28.075-20.48l-.021-.02zM22.507 362.155S82.453 509.398 255.723 512c103.552 0 192.533-61.504 232.96-149.845H22.507z" />
      <path d="M255.723 0C160 0 76.65 52.587 32.66 130.304c34.368-.064 101.334-.107 101.334-.107h.021v-.02c79.147 0 82.09.34 97.557.98l9.6.363c33.323 1.11 74.326 4.693 106.582 29.099 17.493 13.226 42.773 42.453 57.856 63.253 13.93 19.243 17.92 41.387 8.448 62.592-8.704 19.477-27.456 31.104-50.176 31.104H8.32s2.133 8.96 5.29 18.88h485.334c8.619-25.92 12.992-53.035 13.014-80.341C512 114.667 397.29 0 255.744 0h-.021z" />
    </svg>
  );
}

function FormspreeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      {/* Fondo oscuro */}
      <rect width="24" height="24" rx="4" fill="#0F0F0F" />

      {/* Barras rojas escalonadas */}
      <rect x="7" y="7" width="10" height="2.5" rx="1" fill="#F43F5E" />
      <rect x="7" y="11" width="7" height="2.5" rx="1" fill="#F43F5E" />
      <rect x="7" y="15" width="5" height="2.5" rx="1" fill="#F43F5E" />
    </svg>
  );
}

function RenderIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hugging Face"
      role="img"
    >
      <circle cx="16" cy="16" r="16" fill="#771a4e" />
      <path
        d="M10.5 24.638l3.467-1.812V10.745l4.952 2.778-3.714 1.933v3.987L23.5 25v-3.745l-5.076-3.503 4.209-2.175v-3.866L13.967 7 10.5 8.812z"
        fill="#ffffff"
      />
    </svg>
  );
}

function HuggingFaceIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Hugging Face"
      role="img"
    >
      <path
        d="M2.25 11.535c0-3.407 1.847-6.554 4.844-8.258a9.822 9.822 0 019.687 0c2.997 1.704 4.844 4.851 4.844 8.258 0 5.266-4.337 9.535-9.687 9.535S2.25 16.8 2.25 11.535z"
        fill="#FF9D0B"
      />
      <path
        d="M11.938 20.086c4.797 0 8.687-3.829 8.687-8.551 0-4.722-3.89-8.55-8.687-8.55-4.798 0-8.688 3.828-8.688 8.55 0 4.722 3.89 8.55 8.688 8.55z"
        fill="#FFD21E"
      />
      <path
        d="M11.875 15.113c2.457 0 3.25-2.156 3.25-3.263 0-.576-.393-.394-1.023-.089-.582.283-1.365.675-2.224.675-1.798 0-3.25-1.693-3.25-.586 0 1.107.79 3.263 3.25 3.263h-.003z"
        fill="#FF323D"
      />
      <path
        d="M14.76 9.21c.32.108.445.753.767.585.447-.233.707-.708.659-1.204a1.235 1.235 0 00-.879-1.059 1.262 1.262 0 00-1.33.394c-.322.384-.377.92-.14 1.36.153.283.638-.177.925-.079l-.002.003z"
        fill="#3A3B45"
      />
      <path
        d="M8.873 9.21c-.32.108-.448.753-.768.585a1.226 1.226 0 01-.658-1.204c.048-.495.395-.913.878-1.059a1.262 1.262 0 011.33.394c.322.384.377.92.14 1.36-.152.283-.64-.177-.925-.079l.003.003z"
        fill="#3A3B45"
      />
    </svg>
  );
}
