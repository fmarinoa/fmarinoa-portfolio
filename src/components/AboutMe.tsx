import SectionTitle from "./SectionTitle";
import Image from "next/image";
import ProfileJPG from "../../public/franco.webp";

const toolIcons = [
  { src: "/tools/playwright.svg", alt: "Playwright" },
  { src: "/tools/selenium.svg", alt: "Selenium" },
  { src: "/tools/appium.svg", alt: "Appium" },
  { src: "/tools/postman.svg", alt: "Postman" },
  { src: "/tools/jest.svg", alt: "Jest" },
  { src: "/tools/typescript.svg", alt: "TypeScript" },
  { src: "/tools/python.svg", alt: "Python" },
  { src: "/tools/java.svg", alt: "Java" },
  { src: "/tools/aws.svg", alt: "AWS" },
  { src: "/tools/jenkins.svg", alt: "Jenkins" },
  { src: "/tools/git.svg", alt: "Git" },
  { src: "/tools/sonarqube.svg", alt: "SonarQube" },
  { src: "/tools/intellij-idea.svg", alt: "IntelliJ IDEA" },
  { src: "/tools/jetbrains-pycharm.svg", alt: "JetBrains PyCharm" },
];

export default function AboutMe() {
  return (
    <section id="about-me" className="mb-12">
      <SectionTitle title="Sobre mí" />

      <div className="flex flex-col md:flex-row gap-8 items-start md:items-stretch">
        <Image
          width={256}
          height={256}
          src={ProfileJPG.src}
          alt="Foto de Franco"
          className="rounded-full w-full h-full max-w-xs object-cover self-center md:self-stretch"
        />

        <div className="flex-1">
          <p className="mb-6 text-center md:text-left">
            Soy un Ingeniero especializado en automatización de pruebas, con
            experiencia liderando iniciativas de calidad en entornos de
            telecomunicaciones, bancarios y financieros. Me apasiona el uso de
            tecnologías modernas para asegurar productos robustos y eficientes.
          </p>

          <h3 className="text-lg font-semibold text-white mb-4">
            Mis herramientas:
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {toolIcons.map((tool) => (
              <div
                key={tool.src}
                className="p-2 bg-white rounded-md shadow shadow-gray-300 dark:shadow-none transition-transform hover:scale-110"
              >
                <Image
                  src={tool.src}
                  alt={tool.alt}
                  width={40}
                  height={40}
                  title={tool.alt}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
