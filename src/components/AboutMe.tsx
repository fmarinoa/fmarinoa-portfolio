import SectionTitle from "./SectionTitle";
import Image from "next/image";
import ProfileJPG from "../../public/franco.jpg";

export default function AboutMe() {
  return (
    <section id="about-me" className="mb-12">
      <SectionTitle title="Sobre mí" />
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Image
          width={128}
          height={128}
          src={ProfileJPG.src}
          alt="Foto de Franco"
          className="rounded-full w-32 h-32 object-cover"
          priority
        />
        <p className="text-center md:text-left text-gray-300">
          Soy un Ingeniero especializado en automatización de pruebas, con experiencia liderando iniciativas de calidad en entornos de telecomunicaciones, bancarios y financieros. Me apasiona el uso de tecnologías modernas para asegurar productos robustos y eficientes.
        </p>
      </div>
    </section>
  );
}