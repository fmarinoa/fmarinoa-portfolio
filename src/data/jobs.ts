import { capitalize } from '@/helpers/stringsUtils';

const currentMonth = capitalize(
  new Date().toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
  })
);

export const jobList = [
  {
    title: 'Senior Test Automation Engineer',
    company: 'OKA',
    linkCompany: 'https://www.linkedin.com/company/estoyoka/',
    location: 'Lima, Perú',
    period: `Junio 2025 - ${currentMonth}`,
    details: [
      'Desarrollo de pruebas automatizadas para microservicios y aplicaciones webs con Playwright y Jest.',
      'Gestión de pruebas con Jira XRay.',
      'Participación activa en ceremonias ágiles de scrum.',
    ],
  },
  {
    title: 'Test Automation Governance Specialist',
    company: 'Banco Pichincha del Perú',
    linkCompany: 'https://www.linkedin.com/company/banco-pichincha-pe/',
    location: 'Lima, Perú',
    period: 'Octubre 2024 - Mayo 2025',
    details: [
      'Responsable técnico del gobierno de automatización para soluciones Web, API y Mobile.',
      'Administrador de portales de automatización y herramientas de pruebas (Jenkins, Grafana, etc.).',
      'Implementación de mejores prácticas y estándares de calidad.',
      'Mejora continua de procesos de calidad y pruebas.',
    ],
  },
  {
    title: 'QA Automation Engineer',
    company: 'NTT DATA Perú',
    linkCompany: 'https://www.linkedin.com/company/ntt-data-europe-latam/',
    location: 'Lima, Perú',
    period: 'Enero 2024 - Octubre 2024',
    details: [
      'Migración de pruebas automatizadas de UFT a Python.',
      'Implementación de un framework de automatización basado en Python, PyJab, Behave.',
      'Desarrollo de pruebas automatizadas para aplicaciones Web y Móviles.',
      'Implementación de marco de trabajo con GitFlow.',
    ],
  },
];
