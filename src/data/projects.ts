import { Project } from '@/types';

export const projects: Project[] = [
  {
    title: 'Scraper de ofertas — LinkedIn',
    description:
      'Servicio que scrappea LinkedIn a partir de una URL con queryparams (keywords, location), filtra ofertas publicadas en las últimas 24 horas y las envía a un endpoint REST. Diseñado para ejecución programada (00 UTC) y resiliente ante cambios menores en el DOM.',
    technologies: ['Python', 'Requests', 'Beautiful Soup', 'Github Actions'],
    githubUrl: 'https://github.com/fmarinoa/search-job-linkedin',
  },
  {
    title: 'API de ingestión y almacenamiento (Backend)',
    description:
      'API REST desarrollada con Fastify y desplegada con Render que recibe las ofertas del scraper y las persiste en MongoDB mediante Mongoose. Incluye modelos, validación básica de payloads y endpoints para consultar resultados.',
    technologies: ['Node.js', 'TypeScript', 'Fastify', 'MongoDB', 'Github Actions'],
    githubUrl: 'https://github.com/fmarinoa/job-offers-api',
  },
  {
    title: 'Matcher IA y notificador',
    description:
      'Servicio que consulta el backend para obtener las ofertas del último día, las procesa con una IA (Gemini) según un perfil de usuario preconfigurado y prioriza las propuestas más relevantes. Envía un resumen por correo electrónico con las mejores coincidencias y enlaces a las ofertas.',
    technologies: ['Python', 'Gemini (API)', 'Github Actions', 'Requests'],
    githubUrl: 'https://github.com/fmarinoa/job-offers-analyzer',
  },
  {
    title: 'What is my public IP?',
    description:
      'Aplicación web que muestra la dirección IP pública del usuario consumiendo la API de api.ipquery.io. Con esta información, además se obtiene el clima mediante la API de api.open-meteo.com y se muestra un pequeño mapa integrado desde Google Maps.',
    technologies: ['Fetch API', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/fmarinoa/what-is-my-public-ip',
    demoUrl: 'https://fmarinoa.github.io/what-is-my-public-ip/',
  },
  {
    title: 'Portfolio Personal',
    description:
      'Portafolio web personal con animaciones fluidas y diseño responsivo. Desplegado en Vercel, implementa buenas prácticas de SEO y optimización de rendimiento.',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
    githubUrl: 'https://github.com/fmarinoa/fmarinoa-portfolio',
    demoUrl: 'https://francomarino.vercel.app/',
  },
];
