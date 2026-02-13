# 🚀 Portafolio Personal

Portafolio web desarrollado con **React + TypeScript + Vite**, con una interfaz moderna, animaciones y secciones para presentar perfil profesional, proyectos, habilidades, educación y contacto.

## 🧰 Tecnologías usadas

### Frontend
- **React 18** para la construcción de la UI por componentes.
- **TypeScript** para tipado estático y mayor mantenibilidad.
- **Vite** como bundler y entorno de desarrollo rápido.
- **Tailwind CSS** para estilos utilitarios y diseño responsive.
- **Framer Motion** para transiciones y animaciones interactivas.
- **Lucide React** para iconografía.

### Herramientas de calidad y build
- **ESLint** para linting del código.
- **PostCSS + Autoprefixer** para el procesamiento de estilos.
- **TypeScript Compiler (`tsc`)** para verificación de tipos.

### Integraciones
- **Formspree** para gestionar el envío del formulario de contacto.

---

## 📁 Estructura del proyecto

```bash
PORTFOLIO/
├── docs/                    # Build estático generado (deploy)
├── public/
│   └── assets/              # Recursos públicos (CV, imágenes, íconos)
├── src/
│   ├── components/          # Componentes por sección del portafolio
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── use-mobile.tsx   # Hook utilitario para detección mobile
│   ├── App.tsx              # Composición principal de secciones
│   ├── main.tsx             # Punto de entrada de React
│   └── index.css            # Estilos globales + Tailwind
├── index.html               # Plantilla HTML base
├── package.json             # Dependencias y scripts
├── tailwind.config.js       # Configuración de Tailwind
├── postcss.config.js        # Configuración de PostCSS
├── vite.config.ts           # Configuración de Vite
└── tsconfig*.json           # Configuración de TypeScript
```

---

## 🧩 Secciones principales del portafolio

- **Header:** navegación principal.
- **Hero:** presentación personal y accesos rápidos.
- **Projects:** showcase de proyectos.
- **Skills:** habilidades técnicas.
- **Education:** formación y logros.
- **Contact:** formulario de contacto conectado a Formspree.
- **Footer:** cierre y enlaces complementarios.

---

## ⚙️ Scripts disponibles

```bash
npm run dev        # Levanta servidor de desarrollo
npm run build      # Genera build de producción
npm run preview    # Previsualiza el build
npm run lint       # Ejecuta ESLint
npm run typecheck  # Verifica tipos con TypeScript
```

---

## ▶️ Cómo ejecutar el proyecto

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```
3. Generar build:
   ```bash
   npm run build
   ```