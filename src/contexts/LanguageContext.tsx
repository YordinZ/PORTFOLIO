import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "es";

const translations = {
  en: {
    // Nav
    navAbout: "About",
    navProjects: "Projects",
    navSkills: "Technical Skills",
    navContact: "Contact",
    visitGithub: "Visit Github",

    // Hero
    heroGreeting: "Hi, I'm",
    heroRole: "Data Science",
    heroDescription: "Passionate about data-driven insights and building solutions, while continuously learning and growing to make a real difference.",
    downloadCV: "Download CV",
    contact: "Contact",

    // About
    aboutTitle: "About",
    aboutTitleAccent: "Me",
    aboutP1: "I'm a Data Science Engineering student with a strong foundation in software development. I combine analytical thinking with technical skills to build data-driven solutions that create real impact.",
    aboutP2: "My journey spans from full-stack web development to machine learning, always seeking to bridge the gap between raw data and actionable insights.",
    aboutBadge: "Data lover & tech enthusiast",
    aboutEducation: "ACADEMIC EDUCATION",
    aboutDegree1: "Bachelor's Degree in Data Science Engineering",
    aboutInst1: "LEAD University",
    aboutPeriod1: "Expected Graduation: 2027",
    aboutDegree2: "Technical Degree in Software Development",
    aboutInst2: "CTP Francisco J. Orlich Professional",
    aboutPeriod2: "2017–2022",

    // Projects
    projectsTitle: "Recent",
    projectsTitleAccent: "Projects",
    projBillingTitle: "Insightful Billing Dashboard",
    projBillingDesc: "Interactive data analytics dashboard for intelligent billing systems with CSV upload, KPI tracking, and trend analysis.",
    projBgTitle: "Background Remover",
    projBgDesc: "AI-powered background removal tool using advanced computer vision techniques and deep learning models.",
    projGestureTitle: "Hand-Gesture Detection",
    projGestureDesc: "Innovative AI experiment exploring prosthetic technology applications using real-time computer vision.",
    projCalcTitle: "Python React GUI Calculator",
    projCalcDesc: "Desktop calculator application built with Python and Tkinter, featuring a clean GUI and arithmetic operations.",
    projCurrTitle: "CRC to USD Converter",
    projCurrDesc: "Real-time currency converter fetching USD→CRC rates from a Flask API deployed on Render with responsive UI.",
    projDataTitle: "Data-Career",
    projDataDesc: "Turn-based console board game in Python with configurable rules, input validation, and detailed play logging.",

    // Skills
    skillsTitle: "Technical",
    skillsTitleAccent: "Stack",
    skillsCatAll: "ALL",

    // Contact
    contactTitle: "Get In",
    contactTitleAccent: "Touch",
    contactSubtitle: "Let's collaborate on something amazing",
    emailMe: "Email Me",
    emailResponse: "I'll respond within 24 hours",
    yourName: "Your name",
    yourEmail: "Your email",
    yourMessage: "Your message",
    sendMessage: "Send Message",
    sending: "Sending...",
    messageSent: "Message sent! I'll reply soon.",
    messageError: "Something went wrong. Please try again.",
    orEmail: "Or email me directly:",

    // Footer
    footerRights: "All Rights Reserved",
  },
  es: {
    navAbout: "Sobre mí",
    navProjects: "Proyectos",
    navSkills: "Habilidades",
    navContact: "Contacto",
    visitGithub: "Ver Github",

    heroGreeting: "Hola, soy",
    heroRole: "Ciencia de Datos",
    heroDescription: "Apasionado por los insights basados en datos y la construcción de soluciones, aprendiendo y creciendo continuamente para marcar una diferencia real.",
    downloadCV: "Descargar CV",
    contact: "Contacto",

    aboutTitle: "Sobre",
    aboutTitleAccent: "Mí",
    aboutP1: "Soy estudiante de Ingeniería en Ciencia de Datos con una sólida base en desarrollo de software. Combino pensamiento analítico con habilidades técnicas para construir soluciones basadas en datos con impacto real.",
    aboutP2: "Mi camino abarca desde el desarrollo web full-stack hasta el machine learning, siempre buscando cerrar la brecha entre datos crudos e insights accionables.",
    aboutBadge: "Amante de los datos y la tecnología",
    aboutEducation: "EDUCACIÓN ACADÉMICA",
    aboutDegree1: "Bachillerato en Ingeniería en Ciencia de Datos",
    aboutInst1: "LEAD University",
    aboutPeriod1: "Graduación esperada: 2027",
    aboutDegree2: "Técnico en Desarrollo de Software",
    aboutInst2: "CTP Francisco J. Orlich Profesional",
    aboutPeriod2: "2017–2022",

    projectsTitle: "Proyectos",
    projectsTitleAccent: "Recientes",
    projBillingTitle: "Dashboard de Facturación",
    projBillingDesc: "Dashboard interactivo de análisis de datos para sistemas de facturación inteligente con carga CSV, seguimiento de KPIs y análisis de tendencias.",
    projBgTitle: "Removedor de Fondos",
    projBgDesc: "Herramienta de eliminación de fondos impulsada por IA usando técnicas avanzadas de visión por computadora y modelos de deep learning.",
    projGestureTitle: "Detección de Gestos",
    projGestureDesc: "Experimento innovador de IA explorando aplicaciones de tecnología protésica usando visión por computadora en tiempo real.",
    projCalcTitle: "Calculadora GUI Python React",
    projCalcDesc: "Aplicación de calculadora de escritorio construida con Python y Tkinter, con una interfaz limpia y operaciones aritméticas.",
    projCurrTitle: "Conversor CRC a USD",
    projCurrDesc: "Conversor de divisas en tiempo real obteniendo tasas USD→CRC desde una API Flask desplegada en Render con UI responsive.",
    projDataTitle: "Data-Career",
    projDataDesc: "Juego de mesa por turnos en consola en Python con reglas configurables, validación de entrada y registro detallado de partidas.",

    skillsTitle: "Stack",
    skillsTitleAccent: "Técnico",
    skillsCatAll: "TODOS",

    contactTitle: "Ponte en",
    contactTitleAccent: "Contacto",
    contactSubtitle: "Colaboremos en algo increíble",
    emailMe: "Escríbeme",
    emailResponse: "Responderé en 24 horas",
    yourName: "Tu nombre",
    yourEmail: "Tu correo",
    yourMessage: "Tu mensaje",
    sendMessage: "Enviar Mensaje",
    sending: "Enviando...",
    messageSent: "¡Mensaje enviado! Responderé pronto.",
    messageError: "Algo salió mal. Intenta de nuevo.",
    orEmail: "O escríbeme directamente:",

    footerRights: "Todos los Derechos Reservados",
  },
} as const;

type Translations = Record<keyof typeof translations.en, string>;

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("lang");
    return saved === "es" ? "es" : "en";
  });

  const toggle = () => {
    setLang(prev => {
      const next = prev === "en" ? "es" : "en";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
