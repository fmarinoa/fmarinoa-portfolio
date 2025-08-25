import Carousel from '@/components/Carousel';
import SectionTitle from '@/components/SectionTitle';
import { toolsList } from '@/data/tools';

export default function AboutMe() {
  const mid: number = Math.ceil(toolsList.length / 2);
  const first = [...toolsList.slice(0, mid), ...toolsList.slice(0, mid)];
  const second = [...toolsList.slice(mid), ...toolsList.slice(mid)];

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

          <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
            <Carousel icons={first} />
            <Carousel icons={second} />
          </div>
        </div>
      </div>
    </section>
  );
}
