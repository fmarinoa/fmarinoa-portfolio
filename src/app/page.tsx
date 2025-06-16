import Image from "next/image";
import Header from "@/components/Header";
import SectionTitle from "@/components/SectionTitle";
import ProfileJPG from "@/public/franco.jpg";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="pt-20 max-w-4xl mx-auto px-4 space-y-24">
        <section id="about-me">
          <SectionTitle title="Sobre mí" />
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Image
              src={ProfileJPG.src}
              alt="Foto de Franco"
              className="rounded-full w-32 h-32 object-cover"
            />
            <p className="text-justify">
              Soy un Ingeniero especializado en automatización de pruebas, con experiencia liderando iniciativas de calidad en entornos de telecomunicaciones, bancarios y financieros. Me apasiona el uso de tecnologías modernas para asegurar productos robustos y eficientes.
            </p>
          </div>
        </section>

        <section id="experience">
          <SectionTitle title="Experiencia Laboral" />
          <Experience />
        </section>

        <section id="education">
          <SectionTitle title="Educación" />
        </section>

        <section id="projects">
          <SectionTitle title="Proyectos Personales" />
        </section>
      </main>
    </>
  );
}
