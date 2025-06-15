import JobExperience from "./JobExperience";

export default function Experience() {
  return (
    <div className="space-y-8">
      <JobExperience
        title="Senior Test Automation Engineer"
        company="OKA"
        location="Lima, Perú"
        period="Junio 2025 - Presente"
        details={[
          "Desarrollo de pruebas automatizadas para microservicios con Playwright, TypeScript y Jest.",
        ]}
      />
      <JobExperience
        title="Test Automation Governance Specialist"
        company="Banco Pichincha del Perú"
        location="Lima, Perú"
        period="Octubre 2024 - Mayo 2025"
        details={[
          "Responsable técnico del gobierno de automatización para soluciones Web, API y Mobile.",
          "Administrador de portales de automatización y herramientas de pruebas (Jenkins, Grafana, etc.).",
          "Implementación de mejores prácticas y estándares de calidad.",
          "Mejora continua de procesos de calidad y pruebas.",
        ]}
      />
      <JobExperience
        title="QA Automation Engineer"
        company="NTT DATA Perú"
        location="Lima, Perú"
        period="Enero 2024 - Octubre 2024"
        details={[
          "Migración de pruebas automatizadas de UFT a Python.",
          "Implementación de un framework de automatización basado en Python, PyJab, Behave.",
          "Desarrollo de pruebas automatizadas para aplicaciones Web y Móviles.",
          "Implementación de marco de trabajo con GitFlow.",
        ]}
      />
    </div>
  );
}