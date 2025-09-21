import type { Project } from '@/types'

export const projectsData: Omit<Project, 'imageUrl'>[] = [
  {
    title: 'Scrapper, Matcher IA y notificador',
    description:
      'Script que extrae ofertas de LinkedIn a partir de 2 parámetros de búsqueda, las analiza con la IA Gemini en función de un perfil profesional preconfigurado y prioriza las coincidencias más relevantes. Finalmente, envía por correo un resumen con las mejores oportunidades y sus enlaces directos.',
    technologies: ['Python', 'Gemini (API)', 'Github Actions', 'Requests'],
    githubUrl: 'https://github.com/fmarinoa/search-job-linkedin',
  },
  {
    title: 'What is my public IP?',
    description:
      'Aplicación web que muestra la dirección IP pública del usuario consumiendo la API de api.ipquery.io. Con esta información, además se obtiene el clima mediante la API de api.open-meteo.com y se muestra un pequeño mapa integrado desde Google Maps.',
    technologies: ['Fetch API', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/fmarinoa/what-is-my-public-ip',
    demoUrl: 'https://what-is-my-public-ip.francomarino.dev/',
  },
  {
    title: 'Portfolio Personal',
    description:
      'Portafolio web personal con animaciones fluidas y diseño responsivo, desplegado en Vercel y optimizado en SEO y rendimiento. Incluye pruebas automatizadas visibles y documentación desde el footer. Tres worflows: entorno de preview por PR, validación de código con resultados de tests por push a master, y despliegue a producción solo si las validaciones son exitosas.',
    technologies: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
    githubUrl: 'https://github.com/fmarinoa/fmarinoa-portfolio',
    demoUrl: 'https://francomarino.vercel.app/',
  },
]
