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
  // 🔵 Core Data & ML
  { 
    name: "Python", 
    icon: <PythonIcon />, 
    category: "Dev", 
    description: "Primary programming language for data analysis, automation, and machine learning", 
    orbit: 1 
  },
  { 
    name: "SQL", 
    icon: <SQLIcon />, 
    category: "Data", 
    description: "Database querying, optimization, and relational data management", 
    orbit: 1 
  },
  { 
    name: "Pandas", 
    icon: <PandasIcon />, 
    category: "Data", 
    description: "Data manipulation, cleaning, and structured data analysis", 
    orbit: 1 
  },
  { 
    name: "NumPy", 
    icon: <NumPyIcon />, 
    category: "Data", 
    description: "Numerical computing and multidimensional array operations", 
    orbit: 1 
  },

  // 🟢 Frontend Development
  { 
    name: "JavaScript", 
    icon: <JavaScriptIcon />, 
    category: "Dev", 
    description: "Interactive web development and modern ES6+ features", 
    orbit: 2 
  },
  { 
    name: "HTML", 
    icon: <HTMLIcon />, 
    category: "Dev", 
    description: "Semantic web structure and accessibility best practices", 
    orbit: 2 
  },
  { 
    name: "React", 
    icon: <ReactIcon />, 
    category: "Dev", 
    description: "Modern UI development using reusable component architecture", 
    orbit: 2 
  },
  { 
    name: "Tailwind CSS", 
    icon: <TailwindIcon />, 
    category: "Dev", 
    description: "Utility-first CSS framework for rapid and scalable UI design", 
    orbit: 2 
  },

  // 🟡 Tools & DevOps
  { 
    name: "Git", 
    icon: <GitIcon />, 
    category: "Tools", 
    description: "Version control and collaborative development workflows", 
    orbit: 2 
  },
  { 
    name: "GitHub", 
    icon: <GitHubIcon />, 
    category: "Tools", 
    description: "Repository management, collaboration, and CI/CD integration", 
    orbit: 2 
  },
  { 
    name: "Docker", 
    icon: <DockerIcon />, 
    category: "Tools", 
    description: "Containerization and environment consistency for deployment", 
    orbit: 2 
  },

  // 🟣 Data Visualization
  { 
    name: "Power BI", 
    icon: <PowerBIIcon />, 
    category: "Viz", 
    description: "Interactive dashboards and business intelligence reporting", 
    orbit: 2 
  },
  { 
    name: "Streamlit", 
    icon: <StreamlitIcon />, 
    category: "Viz", 
    description: "Interactive data applications and rapid ML prototyping", 
    orbit: 2 
  },

  // 🔴 Advanced & Cloud
  { 
    name: "Machine Learning Fundamentals", 
    icon: <MLIcon />, 
    category: "ML", 
    description: "Supervised and unsupervised learning concepts and model evaluation", 
    orbit: 3 
  },
  { 
    name: "Statistics", 
    icon: <StatsIcon />, 
    category: "Data", 
    description: "Probability theory, hypothesis testing, and statistical inference", 
    orbit: 3 
  },
  { 
    name: "Model Validation", 
    icon: <ValidationIcon />, 
    category: "ML", 
    description: "Performance metrics, cross-validation, and model evaluation techniques", 
    orbit: 3 
  },
  { 
    name: "REST APIs", 
    icon: <APIIcon />, 
    category: "Dev", 
    description: "Integration and development of RESTful services", 
    orbit: 3 
  },
  { 
    name: "Matplotlib", 
    icon: <MatplotlibIcon />, 
    category: "Data", 
    description: "Data visualization and exploratory analysis using Python", 
    orbit: 3 
  },
  { 
    name: "Atlassian (Jira / Confluence)", 
    icon: <AtlassianIcon />, 
    category: "Tools", 
    description: "Agile project management and technical documentation", 
    orbit: 3 
  },
  { 
    name: "QA/QC", 
    icon: <QAIcon />, 
    category: "Tools", 
    description: "Quality assurance, testing methodologies, and process validation", 
    orbit: 3 
  },
  { 
    name: "PostgreSQL", 
    icon: <PostgreSQLIcon />, 
    category: "Data", 
    description: "Relational database design, optimization, and data integrity", 
    orbit: 3 
  },
  { 
    name: "Neon", 
    icon: <NeonIcon />, 
    category: "Data", 
    description: "Serverless PostgreSQL for scalable cloud-based applications", 
    orbit: 3 
  },
  { 
    name: "Railway", 
    icon: <RailwayIcon />, 
    category: "Dev", 
    description: "Cloud platform for backend deployment and infrastructure management", 
    orbit: 3 
  },
  { 
    name: "Formspree", 
    icon: <FormspreeIcon />, 
    category: "Tools", 
    description: "Form backend service for handling submissions without a custom server", 
    orbit: 3 
  },
  { 
    name: "Render", 
    icon: <RenderIcon />, 
    category: "Dev", 
    description: "Cloud platform for deploying web services, APIs, and full-stack applications", 
    orbit: 3 
  },
  { 
    name: "Hugging Face", 
    icon: <HuggingFaceIcon />, 
    category: "ML", 
    description: "Open-source AI ecosystem for transformers, NLP, and ML model deployment", 
    orbit: 3 
  },
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

/* ICONOS */
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

export function MLIcon() {
  return (
    <svg
      viewBox="0 0 122.88 111.48"
      fill="currentColor"
      className="w-full h-full text-sky-400"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Machine Learning"
      role="img"
    >
      <path
        fillRule="evenodd"
        d="M50.21,38.57A17.17,17.17,0,1,1,33,55.74,17.17,17.17,0,0,1,50.21,38.57ZM91.31,94V85.28H67.46a44,44,0,0,0,5.64-6.17H94.38a3.09,3.09,0,0,1,3.08,3.07V94A9,9,0,1,1,91.31,94ZM89.16,30.71H75.51A44.78,44.78,0,0,0,71,24.55H86.09v-7a9,9,0,1,1,6.15-.06V27.64a3.07,3.07,0,0,1-3.08,3.07ZM122.88,15a9,9,0,1,0-12.65,8.25v18H80.12a43.4,43.4,0,0,1,1.27,6.16H113.3a3.09,3.09,0,0,0,3.07-3.08V23.67A9,9,0,0,0,122.88,15Zm-.15,49.93a9,9,0,0,0-17.49-3.08H80.88A42.08,42.08,0,0,1,79.14,68h26.1a9,9,0,0,0,17.49-3.07ZM49.56,105.3H46a6.13,6.13,0,0,1-6.12-6.11V92.93a38.11,38.11,0,0,1-10-3.78l-4.18,4.18a6.13,6.13,0,0,1-8.65,0L12,88.24a6.14,6.14,0,0,1,0-8.65l3.81-3.81a38,38,0,0,1-4.47-10.33H6.12A6.13,6.13,0,0,1,0,59.34v-7.2A6.13,6.13,0,0,1,6.12,46h5.12a38,38,0,0,1,4.44-10.44L12,31.88a6.14,6.14,0,0,1,0-8.64l5.09-5.09a6.13,6.13,0,0,1,8.65,0l4,4a38,38,0,0,1,10.13-3.87v-6A6.13,6.13,0,0,1,46,6.18h7.19A6.13,6.13,0,0,1,59.27,12V32.48A24.54,24.54,0,0,0,50.84,31c-.43,0-.86,0-1.28,0s-.85,0-1.27,0a24.61,24.61,0,1,0,0,49.21c.42,0,.85,0,1.27,0s.85,0,1.28,0a24.54,24.54,0,0,0,8.43-1.48V99.48a6.13,6.13,0,0,1-6.11,5.82Z"
      />
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
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-full h-full text-green-500"
    >
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

export function MatplotlibIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 180"
      className={className}
      role="img"
      aria-label="Matplotlib"
    >
      {/* Círculos base */}
      <g stroke="gray" strokeWidth="2" fill="#FFF">
        <circle cx="90" cy="90" r="88" />
        <circle cx="90" cy="90" r="66" />
        <circle cx="90" cy="90" r="44" />
        <circle cx="90" cy="90" r="22" />
        <path d="m90,2v176m62-26-124-124m124,0-124,124m150-62H2" />
      </g>

      {/* Secciones de colores */}
      <g opacity=".8">
        <path fill="#44C" d="m90,90h18a18,18 0 0,0 0-5z" />
        <path fill="#BC3" d="m90,90 34-43a55,55 0 0,0-15-8z" />
        <path fill="#D93" d="m90,90-16-72a74,74 0 0,0-31,15z" />
        <path fill="#DB3" d="m90,90-58-28a65,65 0 0,0-5,39z" />
        <path fill="#3BB" d="m90,90-33,16a37,37 0 0,0 2,5z" />
        <path fill="#3C9" d="m90,90-10,45a46,46 0 0,0 18,0z" />
        <path fill="#D73" d="m90,90 46,58a74,74 0 0,0 12-12z" />
      </g>
    </svg>
  );
}

export function PostgreSQLIcon() {
  return (
    <svg
      viewBox="0 0 118.53 122.88"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PostgreSQL"
      role="img"
    >
      {/* Azul (logo) */}
      <path
        d="M113.53,75.55c-14.65,3.02-15.66-1.94-15.66-1.94c15.47-22.95,21.93-52.09,16.35-59.22 C99-5.06,72.65,4.14,72.21,4.38L72.06,4.4c-2.89-0.6-6.13-0.96-9.77-1.02c-6.63-0.11-11.66,1.74-15.47,4.63 c0,0-47.01-19.37-44.82,24.36c0.47,9.3,13.33,70.38,28.68,51.93c5.61-6.75,11.03-12.45,11.03-12.45c2.69,1.79,5.92,2.7,9.29,2.37 L51.26,74c-0.08,0.84-0.04,1.66,0.1,2.63c-3.95,4.42-2.79,5.19-10.7,6.82c-8,1.65-3.3,4.58-0.23,5.35 c3.72,0.93,12.32,2.25,18.14-5.89l-0.23,0.93c1.55,1.24,2.64,8.07,2.46,14.26c-0.18,6.19-0.3,10.44,0.92,13.76 s2.44,10.79,12.83,8.56c8.68-1.86,13.18-6.68,13.81-14.72c0.44-5.72,1.45-4.87,1.51-9.98l0.81-2.42c0.93-7.75,0.15-10.25,5.5-9.09 l1.3,0.11c3.94,0.18,9.09-0.63,12.11-2.04C116.08,79.27,119.95,74.22,113.53,75.55L113.53,75.55L113.53,75.55z"
        fill="#336791"
      />

      {/* Blancos (detalles) */}
      <path
        d="M57.39,79.94c0.03-1,0.86-1.79,1.86-1.76s1.79,0.86,1.76,1.86c-0.21,7.43-0.17,14.88,0.1,20.84 c0.25,5.37,0.68,9.41,1.28,10.91c0.64,1.59,1.63,3.94,3.53,5.53c1.85,1.56,4.7,2.51,9.24,1.54c3.97-0.85,6.64-2.06,8.42-3.91 c1.76-1.83,2.76-4.42,3.38-8.04c0.46-2.64,1.09-7.25,1.66-11.84c0.72-5.74,1.38-11.54,1.52-13.41c0.07-1,0.94-1.75,1.94-1.67 c1,0.07,1.75,0.94,1.67,1.94c-0.14,1.82-0.8,7.69-1.55,13.6c-0.6,4.74-1.24,9.44-1.68,11.99c-0.75,4.33-2.02,7.52-4.35,9.94 c-2.32,2.41-5.57,3.93-10.28,4.94c-5.85,1.25-9.71-0.12-12.32-2.32c-2.57-2.16-3.79-5.02-4.56-6.95c-0.76-1.89-1.27-6.35-1.54-12.1 C57.21,95.02,57.18,87.47,57.39,79.94L57.39,79.94z"
        fill="#FFFFFF"
      />
      <path
        d="M47.41,6.01c0.93,0.37,1.38,1.42,1.01,2.35c-0.37,0.93-1.42,1.38-2.35,1.01C45.95,9.32,1.65-8.78,3.7,32.1 c0.25,5.05,4.25,25.71,10.33,40.12c1.92,4.54,4.03,8.42,6.27,10.9c1.87,2.08,3.78,3.08,5.62,2.42c1.02-0.37,2.11-1.2,3.26-2.58 c5.63-6.77,10.75-12.12,10.77-12.13c0.69-0.72,1.83-0.75,2.55-0.06c0.72,0.69,0.75,1.83,0.06,2.55c-0.01,0.01-5.01,5.22-10.6,11.95 c-1.59,1.92-3.21,3.11-4.84,3.69c-3.46,1.23-6.64-0.21-9.52-3.41c-2.52-2.79-4.84-7.02-6.9-11.93C4.45,58.83,0.34,37.51,0.08,32.27 C-2.25-14.29,47.27,5.95,47.41,6.01L47.41,6.01z"
        fill="#FFFFFF"
      />
      <path
        d="M73.1,5.73l-2.69-2.94c0.22-0.08,0.44-0.15,0.66-0.21c0.59-0.19,1.23-0.38,1.92-0.58 c1.01-0.3,2.49-0.69,4.3-1.04c9.03-1.75,26.65-2.7,38.26,12.14c3.28,4.19,3.01,14.56-0.38,26.84c-3,10.87-8.41,23.4-15.89,34.5 c-0.56,0.83-1.69,1.05-2.52,0.49s-1.05-1.69-0.49-2.52c7.26-10.77,12.5-22.92,15.41-33.44c3.1-11.22,3.59-20.37,1.02-23.65 C102.28,2.01,86.21,2.91,77.96,4.52C76.27,4.85,74.92,5.2,74,5.47L73.1,5.73L73.1,5.73z"
        fill="#FFFFFF"
      />
      <path
        d="M99.49,72.87c0.02,0.05,0.03,0.1,0.04,0.15c0,0.01,0.62,3.24,13.53,0.58c1.83-0.38,3.13-0.3,3.97,0.11 c1.09,0.52,1.56,1.39,1.49,2.51c-0.04,0.68-0.36,1.41-0.89,2.14c-1.22,1.67-4.01,3.83-7.4,5.4c-2.54,1.18-6.41,1.97-9.96,2.17 c-2.09,0.12-4.09,0.04-5.68-0.28c-2-0.4-3.52-1.23-4.15-2.58c-0.17-0.36-0.27-0.75-0.29-1.17c-0.4-7.02,3.02-8.25,5.41-8.93 c-0.25-0.36-0.59-0.79-0.97-1.26c-1.21-1.51-2.76-3.45-3.99-6.42c-0.19-0.45-0.74-1.45-1.48-2.77c-3.13-5.61-9.29-16.67-8.08-24.22 c0.86-5.39,4.97-8.97,15.24-7.9l-0.1-0.3c-0.49-1.39-1.27-3.21-2.4-5.25c-4.48-8.16-14.25-19.54-31.6-19.82 c-26.47-0.43-25.6,32.95-25.6,33.04c0.02,1-0.78,1.82-1.78,1.84s-1.82-0.78-1.84-1.78c0-0.11-0.98-37.21,29.27-36.72 c19.1,0.31,29.82,12.77,34.72,21.69c1.22,2.22,2.09,4.24,2.64,5.81c0.62,1.76,0.85,3.14,0.75,3.75c-0.14,0.9-0.64,1.46-1.5,1.63 l-0.65,0.01c-9.42-1.51-12.98,0.8-13.58,4.56c-1.01,6.33,4.75,16.65,7.67,21.9c0.79,1.42,1.39,2.5,1.66,3.16 c1.04,2.51,2.4,4.21,3.46,5.55C98.39,70.68,99.17,71.66,99.49,72.87L99.49,72.87z M113.79,77.14c-9.57,1.98-14.03,0.53-16.08-1.03 c-0.28,0.09-0.58,0.17-0.9,0.26c-1.28,0.36-3.27,0.92-3.06,5.22c0.15,0.16,0.71,0.33,1.53,0.5c1.31,0.26,2.99,0.32,4.78,0.22 c3.13-0.18,6.5-0.85,8.65-1.85c2.21-1.03,4.06-2.27,5.2-3.35L113.79,77.14L113.79,77.14z"
        fill="#FFFFFF"
      />
      <path
        d="M52.6,77.67c-0.74,0.83-1.35,1.6-1.87,2.26c-2.22,2.82-2.91,3.7-9.8,5.12c-1.24,0.26-2.08,0.51-2.6,0.76 c0.64,0.46,1.6,0.84,2.44,1.05c1.7,0.43,4.52,0.94,7.54,0.43c2.94-0.5,6.11-2.01,8.68-5.61c0.08-0.12,0.15-0.25,0.21-0.38 c0.26-0.63,0.2-1.42-0.06-2.17c-0.28-0.8-0.79-1.5-1.38-1.93c-0.14-0.1-0.28-0.18-0.43-0.24l-0.09-0.04 c-0.37-0.15-0.78-0.31-1.13-0.28C53.73,76.68,53.25,76.94,52.6,77.67L52.6,77.67L52.6,77.67z M47.88,77.68 c0.49-0.62,1.06-1.34,1.92-2.31c0.07-0.09,0.15-0.18,0.23-0.26c1.33-1.44,2.6-1.98,3.77-2.08c1.16-0.1,2.06,0.23,2.82,0.55 c0.03,0.01,0.06,0.02,0.1,0.04c0.39,0.16,0.77,0.38,1.14,0.64c1.19,0.85,2.17,2.2,2.7,3.67c0.54,1.53,0.63,3.24-0.01,4.76 c-0.16,0.38-0.36,0.74-0.61,1.09c-3.24,4.54-7.28,6.44-11.02,7.08c-3.67,0.63-7.01,0.02-9.03-0.48c-1.47-0.37-3.29-1.19-4.36-2.19 c-0.63-0.59-1.06-1.29-1.18-2.07c-0.14-0.93,0.14-1.83,0.99-2.63c0.82-0.77,2.34-1.47,4.85-1.99 C45.78,80.35,46.28,79.72,47.88,77.68L47.88,77.68z"
        fill="#FFFFFF"
      />
      <path
        d="M52.79,76.1c0.15,0.99-0.53,1.92-1.52,2.06s-1.92-0.53-2.06-1.52c-0.04-0.24-0.06-0.48-0.08-0.73 c-0.6-0.02-1.19-0.06-1.77-0.15c-3.88-0.54-7.39-2.5-10.03-5.4c-2.61-2.86-4.37-6.64-4.78-10.86c-0.15-1.5-0.12-3.06,0.1-4.63 c0.89-6.34,0.55-12.01,0.38-14.95c-0.05-0.8-0.08-1.4-0.08-1.86c0.01-1.19,3-3.81,6.94-5.43c1.78-0.73,3.77-1.34,5.74-1.64 c2.08-0.31,4.18-0.28,6.07,0.31c2.96,0.93,5.31,3.12,6.21,7.31c3.25,15.01,0.34,21.46-1.93,26.51c-0.39,0.87-0.76,1.69-1.04,2.43 c-0.01,0.05-0.03,0.09-0.05,0.14c-0.95,2.56,0.44-1.19-0.28,0.72C53.48,71.49,52.49,74.13,52.79,76.1L52.79,76.1z M49.52,72.3 c0.39-1.61,1.03-3.31,1.71-5.14c0.54-1.44-0.87,2.33,0.26-0.72c0.02-0.05,0.04-0.1,0.06-0.15c0.35-0.93,0.73-1.76,1.12-2.64 c2.06-4.57,4.68-10.41,1.69-24.25c-0.58-2.69-1.99-4.07-3.75-4.62c-1.32-0.41-2.87-0.42-4.46-0.18c-1.7,0.26-3.4,0.78-4.92,1.4 c-2.67,1.09-4.69,2.01-4.69,2.09c0,0.26,0.03,0.85,0.08,1.64c0.18,3.05,0.53,8.96-0.4,15.66c-0.18,1.31-0.21,2.58-0.09,3.8 c0.33,3.4,1.75,6.45,3.86,8.76c2.08,2.28,4.83,3.83,7.85,4.25C48.4,72.26,48.96,72.3,49.52,72.3L49.52,72.3z"
        fill="#FFFFFF"
      />
      <path
        d="M46.57,37.82c-0.08,0.59,1.09,2.18,2.61,2.39c1.52,0.21,2.83-1.03,2.91-1.62c0.08-0.59-1.09-1.25-2.61-1.46 C47.96,36.92,46.65,37.23,46.57,37.82L46.57,37.82L46.57,37.82z"
        fill="#FFFFFF"
      />
      <path
        d="M47.17,37.9c-0.02,0.13,0.19,0.47,0.54,0.84c0.39,0.41,0.94,0.78,1.55,0.87l0.01,0 c0.6,0.08,1.16-0.12,1.58-0.41c0.39-0.26,0.63-0.54,0.66-0.7c0-0.03-0.15-0.12-0.4-0.26c-0.41-0.23-1.01-0.42-1.7-0.52l-0.02,0 c-0.68-0.09-1.31-0.07-1.76,0.04C47.35,37.83,47.17,37.88,47.17,37.9L47.17,37.9L47.17,37.9z M46.84,39.57 c-0.59-0.62-0.92-1.36-0.86-1.82l0-0.02c0.08-0.57,0.59-0.96,1.37-1.15c0.59-0.14,1.37-0.17,2.2-0.06c0.01,0,0.02,0,0.03,0 c0.84,0.12,1.59,0.36,2.12,0.66c0.7,0.39,1.09,0.92,1.01,1.48c-0.06,0.44-0.51,1.08-1.18,1.53c-0.63,0.43-1.49,0.74-2.42,0.61 l-0.01,0C48.18,40.68,47.39,40.15,46.84,39.57L46.84,39.57z"
        fill="#FFFFFF"
      />
      <path
        d="M93.01,36.61c0.08,0.59-1.09,2.18-2.61,2.39c-1.53,0.21-2.83-1.03-2.91-1.62c-0.08-0.59,1.09-1.25,2.62-1.46 C91.62,35.71,92.92,36.02,93.01,36.61L93.01,36.61L93.01,36.61z"
        fill="#FFFFFF"
      />
      <path
        d="M93.3,36.57L93.3,36.57c0.05,0.38-0.25,1.03-0.78,1.59c-0.51,0.54-1.25,1.03-2.09,1.14l-0.01,0 c-0.84,0.11-1.62-0.17-2.2-0.56c-0.6-0.4-0.99-0.95-1.05-1.32v0c-0.06-0.43,0.27-0.85,0.86-1.18c0.5-0.28,1.21-0.51,2.01-0.62 c0.8-0.11,1.55-0.08,2.11,0.05C92.81,35.82,93.24,36.13,93.3,36.57L93.3,36.57z M92.08,37.74c0.41-0.43,0.65-0.87,0.62-1.09 c-0.02-0.16-0.28-0.3-0.68-0.4h0c-0.49-0.12-1.16-0.14-1.89-0.04c-0.72,0.1-1.36,0.31-1.8,0.55c-0.36,0.2-0.57,0.41-0.55,0.57 c0.03,0.22,0.33,0.59,0.79,0.9c0.47,0.32,1.11,0.55,1.79,0.46l0.01,0C91.04,38.6,91.65,38.19,92.08,37.74L92.08,37.74z"
        fill="#FFFFFF"
      />
      <path
        d="M96.65,32.59c-0.05-1,0.72-1.85,1.72-1.9c1-0.05,1.85,0.72,1.9,1.72c0.15,2.8-0.19,5.02-0.55,7.35 c-0.27,1.74-0.55,3.56-0.61,5.59c-0.06,1.93,0.19,4.07,0.46,6.27c0.7,5.79,1.44,11.99-2.86,18.4c-0.56,0.83-1.68,1.05-2.51,0.5 c-0.83-0.56-1.05-1.68-0.5-2.51c3.54-5.29,2.88-10.8,2.26-15.96c-0.28-2.3-0.55-4.54-0.47-6.8c0.07-2.34,0.36-4.21,0.64-6.02 C96.47,37.05,96.78,34.99,96.65,32.59L96.65,32.59z"
        fill="#FFFFFF"
      />
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
