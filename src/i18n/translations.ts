import resumeEn from '../data/resume.en.json';
import resumeEs from '../data/resume.es.json';
import type { ResumeData } from '../types/resume';

export type Language = 'en' | 'es';

const commonValueStatements = {
  react: {
    en: 'React → ship resilient interfaces with clean architecture patterns and reusable hooks.',
    es: 'React → interfaces resilientes con arquitecturas limpias y hooks reutilizables.',
  },
  'next.js': {
    en: 'Next.js → fast full-stack delivery with hybrid rendering, ISR, and SEO-first routing.',
    es: 'Next.js → entregas full-stack rápidas con render híbrido, ISR y rutas orientadas al SEO.',
  },
  typescript: {
    en: 'TypeScript → stricter contracts that prevent regressions and speed up refactors.',
    es: 'TypeScript → contratos estrictos que previenen regresiones y aceleran refactors.',
  },
  redux: {
    en: 'Redux → predictable state modeling for complex UI flows.',
    es: 'Redux → modelado de estado predecible para flujos UI complejos.',
  },
  tailwind: {
    en: 'Tailwind → design tokens in code, building cohesive systems quickly.',
    es: 'Tailwind → design tokens en código para sistemas cohesivos rápidamente.',
  },
  mui: {
    en: 'MUI → accessible component foundations aligned to design tokens.',
    es: 'MUI → bases de componentes accesibles alineadas a design tokens.',
  },
  storybook: {
    en: 'Storybook → document design systems and unblock cross-team collaboration.',
    es: 'Storybook → documenta sistemas de diseño y habilita colaboración entre equipos.',
  },
  'node.js': {
    en: 'Node.js → performant APIs with structured logging and monitoring.',
    es: 'Node.js → APIs de alto rendimiento con logging estructurado y monitoreo.',
  },
  express: {
    en: 'Express → lightweight REST services tuned for maintainability.',
    es: 'Express → servicios REST livianos orientados a la mantenibilidad.',
  },
  nestjs: {
    en: 'NestJS → opinionated backend scaffolding for scalable services.',
    es: 'NestJS → andamiaje backend con opiniones fuertes para servicios escalables.',
  },
  'graphql (schema design)': {
    en: 'GraphQL → strongly-typed contracts that empower product teams.',
    es: 'GraphQL → contratos fuertemente tipados que empoderan a producto.',
  },
  'apollo client': {
    en: 'Apollo Client → normalized caching that keeps UIs fast and consistent.',
    es: 'Apollo Client → caching normalizado que mantiene UIs rápidas y consistentes.',
  },
  'rest apis': {
    en: 'REST APIs → pragmatic integrations and backwards-compatible evolutions.',
    es: 'REST APIs → integraciones pragmáticas y evolución compatible.',
  },
  contentful: {
    en: 'Contentful → structured content workflows for marketing teams.',
    es: 'Contentful → flujos de contenido estructurado para equipos de marketing.',
  },
  mongodb: {
    en: 'MongoDB → schema-flexible data models with performance guardrails.',
    es: 'MongoDB → modelos flexibles con salvaguardas de rendimiento.',
  },
  'odoo erp': {
    en: 'Odoo ERP → unify ops data flows across finance, inventory, and storefronts.',
    es: 'Odoo ERP → unifica flujos operativos entre finanzas, inventario y storefronts.',
  },
  jest: {
    en: 'Jest → fast unit suites with solid snapshot governance.',
    es: 'Jest → suites unitarias rápidas con buen gobierno de snapshots.',
  },
  'react testing library': {
    en: 'React Testing Library → user-focused tests that harden critical journeys.',
    es: 'React Testing Library → pruebas enfocadas en el usuario para robustecer flujos críticos.',
  },
  testcafe: {
    en: 'TestCafe → cross-browser end-to-end validation in CI.',
    es: 'TestCafe → validación end-to-end multi-navegador en CI.',
  },
  tdd: {
    en: 'TDD → build confidence-first pipelines, catching regressions before release.',
    es: 'TDD → pipelines orientados a la confianza, detectando regresiones antes del release.',
  },
  'github actions': {
    en: 'GitHub Actions → automated quality gates and preview env orchestration.',
    es: 'GitHub Actions → compuertas de calidad automatizadas y orquestación de ambientes preview.',
  },
  circleci: {
    en: 'CircleCI → parallelized pipelines that keep releases flowing.',
    es: 'CircleCI → pipelines paralelos que mantienen entregas continuas.',
  },
  docker: {
    en: 'Docker → reproducible environments from laptop to production.',
    es: 'Docker → entornos reproducibles del local a producción.',
  },
  kubernetes: {
    en: 'Kubernetes → resilient workloads with autoscaling and observability baked in.',
    es: 'Kubernetes → cargas resilientes con autoscaling y observabilidad incorporada.',
  },
  aws: {
    en: 'AWS → cloud primitives tuned for cost, resilience, and compliance.',
    es: 'AWS → primitivos cloud optimizados para costo, resiliencia y cumplimiento.',
  },
  vercel: {
    en: 'Vercel → instant previews and global edge delivery for the frontend.',
    es: 'Vercel → previews instantáneos y entrega edge global para frontend.',
  },
  netlify: {
    en: 'Netlify → automated deploy previews with edge functions ready to extend.',
    es: 'Netlify → previews de deploy automatizados con edge functions listas para extender.',
  },
  'frontend architecture': {
    en: 'Frontend Architecture → component standards that keep teams aligned at scale.',
    es: 'Frontend Architecture → estándares de componentes que alinean equipos a escala.',
  },
  accessibility: {
    en: 'Accessibility → WCAG-driven interfaces that include every user.',
    es: 'Accessibility → interfaces guiadas por WCAG que incluyen a todas las personas.',
  },
  'performance optimization': {
    en: 'Performance Optimization → real-world budget tracking for fast experiences.',
    es: 'Performance Optimization → control de presupuestos reales para experiencias rápidas.',
  },
  seo: {
    en: 'SEO → technical hygiene that lifts visibility and conversion.',
    es: 'SEO → higiene técnica que eleva visibilidad y conversión.',
  },
  'agile/scrum': {
    en: 'Agile/Scrum → iterative delivery with clear ceremonies and planning.',
    es: 'Agile/Scrum → entregas iterativas con ceremonias y planeación claras.',
  },
  mentorship: {
    en: 'Mentorship → growing engineers through pairing, feedback, and roadmap context.',
    es: 'Mentorship → crecimiento de ingenieros vía acompañamiento, feedback y contexto.',
  },
  chromatic: {
    en: 'Chromatic → automated visual QA guarding against regressions.',
    es: 'Chromatic → QA visual automatizado que protege contra regresiones.',
  },
  eslint: {
    en: 'ESLint → consistent code style & catch issues before they merge.',
    es: 'ESLint → estilo consistente y detección de issues antes del merge.',
  },
  prettier: {
    en: 'Prettier → automatic formatting that keeps reviews focused on logic.',
    es: 'Prettier → formateo automático que enfoca las revisiones en la lógica.',
  },
} as const;

const buildValueStatements = (language: Language) =>
  Object.entries(commonValueStatements).reduce<Record<string, string>>(
    (accumulator, [key, value]) => {
      accumulator[key] = value[language];
      return accumulator;
    },
    {}
  );

const en = {
  common: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      contact: 'Contact',
    },
    actions: {
      startProject: 'Start a project',
      downloadResume: 'Resume (PDF)',
      emailMe: 'Email me',
      startConversation: 'Start a conversation',
    },
    labels: {
      availability: 'Availability',
    },
    aria: {
      home: 'JZ Web Studio home',
      themeToggle: 'Activate {{mode}} mode',
      languageSelector: 'Language selector',
      language: {
        en: 'Switch to English',
        es: 'Switch to Spanish',
      },
      openNavigation: 'Open navigation',
      closeNavigation: 'Close navigation',
    },
    modes: {
      light: 'light',
      dark: 'dark',
    },
  },
  header: {
    availabilityChip: 'Availability: {{status}}',
  },
  hero: {
    kpis: [
      '10+ yrs shipping React/Next',
      'A11y & SEO as first-class citizens',
      'CI/CD with preview envs',
    ],
    resumeCta: 'Resume (PDF)',
    emailLabel: 'Email',
    fallbacks: {
      name: 'Julio Zeledón',
      label: 'Product Designer & Engineer',
      region: 'Remote',
      availability: 'Open to opportunities',
      timezone: 'UTC-6',
    },
  },
  skills: {
    overline: 'Skills & Capabilities',
    heading: 'Systems-minded craft across the stack.',
    description:
      'Filter the matrix to surface focus areas. Every chip carries a quick note explaining how it supports reliable product delivery.',
    filterLabel: 'Filter focus:',
    filters: {
      all: 'All',
      frontend: 'Frontend',
      performance: 'Performance',
      a11y: 'A11y',
      seo: 'SEO',
      testing: 'Testing',
      ci_cd: 'CI/CD',
    },
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      apis_data: 'APIs & Data',
      testing: 'Testing',
      devops_infra: 'DevOps',
      tooling: 'Tooling',
      practices: 'Practices',
    },
    spotlightTitle: 'Spotlight notes',
    fallbackStatements: {
      focus: '{{skill}} → elevates delivery for this focus area.',
      general: '{{skill}} → elevates delivery for modern teams.',
    },
    valueStatements: buildValueStatements('en'),
  },
  experience: {
    overline: 'Experience',
    heading: 'Leading teams and shipping outcomes.',
    description:
      'Timeline with highlights and tech stacks. Hover to dig into the work and surface the tools referenced most often.',
    dateUnavailable: 'Dates unavailable',
    present: 'Present',
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    fallbacks: {
      company: 'Company',
      role: 'Role',
    },
  },
  contact: {
    overline: 'Contact',
    heading: 'Let’s build performant, inclusive web experiences.',
    description:
      'I’m based in Costa Rica (UTC-6), making it easy to sync with U.S. schedules. Share your project details and we’ll map a plan to ship something exceptional.',
    form: {
      nameLabel: 'Name',
      emailLabel: 'Email',
      projectTypeLabel: 'Project type',
      projectTypeOptions: ['Product build', 'Site refresh', 'Design system', 'Consulting'],
      budgetLabel: 'Budget range',
      budgetOptions: ['$5k–$10k', '$10k–$25k', '$25k–$50k', '$50k+'],
      messageLabel: 'Message',
      messagePlaceholder: 'Tell me about your goals, timelines, and success metrics.',
      submitCta: 'Start a conversation',
      privacyNotice: 'I respect your privacy—details stay between us unless we engage a project.',
    },
    aside: {
      emailCta: 'Email me',
      trustedStacks: 'Trusted stacks',
    },
  },
  footer: {
    rights: '© {{year}} Julio Zeledón. All rights reserved.',
  },
} as const;

const es = {
  common: {
    nav: {
      about: 'Sobre mí',
      skills: 'Habilidades',
      experience: 'Experiencia',
      contact: 'Contacto',
    },
    actions: {
      startProject: 'Iniciar un proyecto',
      downloadResume: 'Currículum (PDF)',
      emailMe: 'Escríbeme',
      startConversation: 'Iniciar conversación',
    },
    labels: {
      availability: 'Disponibilidad',
    },
    aria: {
      home: 'Inicio de JZ Web Studio',
      themeToggle: 'Activar modo {{mode}}',
      languageSelector: 'Selector de idioma',
      language: {
        en: 'Cambiar a inglés',
        es: 'Cambiar a español',
      },
      openNavigation: 'Abrir navegación',
      closeNavigation: 'Cerrar navegación',
    },
    modes: {
      light: 'claro',
      dark: 'oscuro',
    },
  },
  header: {
    availabilityChip: 'Disponibilidad: {{status}}',
  },
  hero: {
    kpis: [
      '+10 años entregando React/Next',
      'Accesibilidad y SEO como pilares',
      'CI/CD con entornos de revisión',
    ],
    resumeCta: 'Currículum (PDF)',
    emailLabel: 'Correo',
    fallbacks: {
      name: 'Julio Zeledón',
      label: 'Diseñador y desarrollador de producto',
      region: 'Remoto',
      availability: 'Disponible para oportunidades',
      timezone: 'UTC-6',
    },
  },
  skills: {
    overline: 'Habilidades y Capacidades',
    heading: 'Ejecución con mentalidad sistémica a través del stack.',
    description:
      'Filtra la matriz para resaltar focos clave. Cada chip incluye una nota rápida sobre cómo impulsa la entrega confiable de producto.',
    filterLabel: 'Enfoque:',
    filters: {
      all: 'Todo',
      frontend: 'Frontend',
      performance: 'Rendimiento',
      a11y: 'Accesibilidad',
      seo: 'SEO',
      testing: 'Pruebas',
      ci_cd: 'CI/CD',
    },
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      apis_data: 'APIs y Datos',
      testing: 'Pruebas',
      devops_infra: 'DevOps',
      tooling: 'Tooling',
      practices: 'Prácticas',
    },
    spotlightTitle: 'Notas destacadas',
    fallbackStatements: {
      focus: '{{skill}} → impulsa la entrega en este enfoque.',
      general: '{{skill}} → potencia la entrega en equipos modernos.',
    },
    valueStatements: buildValueStatements('es'),
  },
  experience: {
    overline: 'Experiencia',
    heading: 'Liderando equipos y generando resultados.',
    description:
      'Línea de tiempo con logros y stacks tecnológicos. Pasa el cursor para profundizar y ver las herramientas más referenciadas.',
    dateUnavailable: 'Fechas no disponibles',
    present: 'Actualidad',
    months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    fallbacks: {
      company: 'Empresa',
      role: 'Rol',
    },
  },
  contact: {
    overline: 'Contacto',
    heading: 'Construyamos experiencias web rápidas e inclusivas.',
    description:
      'Estoy basado en Costa Rica (UTC-6), perfecto para coordinar con horarios de EE. UU. Comparte los detalles de tu proyecto y planifiquemos un lanzamiento sobresaliente.',
    form: {
      nameLabel: 'Nombre',
      emailLabel: 'Correo',
      projectTypeLabel: 'Tipo de proyecto',
      projectTypeOptions: ['Producto nuevo', 'Rediseño web', 'Design system', 'Consultoría'],
      budgetLabel: 'Rango de presupuesto',
      budgetOptions: ['$5k–$10k', '$10k–$25k', '$25k–$50k', '$50k+'],
      messageLabel: 'Mensaje',
      messagePlaceholder: 'Cuéntame sobre tus objetivos, tiempos y métricas de éxito.',
      submitCta: 'Iniciar conversación',
      privacyNotice:
        'Respeto tu privacidad: la información se mantiene confidencial a menos que iniciemos un proyecto.',
    },
    aside: {
      emailCta: 'Escríbeme',
      trustedStacks: 'Stacks de confianza',
    },
  },
  footer: {
    rights: '© {{year}} Julio Zeledón. Todos los derechos reservados.',
  },
} as const;

export const translations = {
  en,
  es,
} as const;

export type TranslationContent = typeof translations.en;

export const resumeByLanguage: Record<Language, ResumeData> = {
  en: resumeEn as ResumeData,
  es: resumeEs as ResumeData,
};
