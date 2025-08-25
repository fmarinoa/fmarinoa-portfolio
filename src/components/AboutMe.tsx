import SectionTitle from './SectionTitle';
import ToolsCarousel from './ToolsCarrusel';

export default function AboutMe() {
  return (
    <section id="about-me" className="mb-12">
      <SectionTitle title="Sobre mí" />

      <div className="flex flex-col md:flex-row gap-8 items-start md:items-stretch">
        <img
          src="/franco.webp"
          alt="Franco — Ingeniero especializado en automatización de pruebas"
          width={256}
          height={256}
          loading="eager"
          className="rounded-full w-full h-full max-w-xs object-cover self-center md:self-stretch"
        />

        <div className="flex flex-col w-full md:max-w-lg">
          <p className="mb-6 text-center md:text-left">
            Soy un Ingeniero especializado en automatización de pruebas, con experiencia liderando
            iniciativas de calidad en entornos de telecomunicaciones, bancarios y financieros. Me
            apasiona el uso de tecnologías modernas para asegurar productos robustos y eficientes.
          </p>

          <h3 className="text-lg font-semibold text-white mb-4">Herramientas y tecnologías:</h3>

          <ToolsCarousel />
        </div>
      </div>
    </section>
  );
}
