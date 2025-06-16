import Image from "next/image";

type CareerProps = {
  institution: string;
  logo: string;
  title: string;
  period: string;
  details: string[];
};

type CourseProps = {
  name: string;
  institution: string;
  year: string;
  url?: string;
};

function Career({ institution, logo, title, period, details }: Readonly<CareerProps>) {
  return (
    <div className="flex items-start gap-4 mb-6 bg-gray-700 rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
      <div className="flex-shrink-0">
        <Image src={logo} alt={institution} width={60} height={60} className="rounded" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-sm text-gray-300">{institution} &middot; {period}</span>
        <ul className="list-disc pl-5 mt-1 text-sm text-gray-200">
          {details.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </div>
    </div>
  );
}

function Course({ name, institution, year, url }: Readonly<CourseProps>) {
  return (
    <li className="mb-2">
      <span className="font-medium">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline underline-offset-4 hover:text-blue-300 transition-colors cursor-pointer"
          >
            {name}
          </a>
        ) : (
          name
        )}
      </span>
      <br />
      <span className="text-gray-400">{institution}</span>{" "}
      <span className="text-gray-500">({year})</span>
    </li>
  );
}

export default function Education() {
  return (
    <div>
      <Career
        institution="UPC: Universidad Peruana de Ciencias Aplicadas"
        logo="/UPC_logo.png"
        title="Ingeniería de Sistemas"
        period="2025 - 2028"
        details={[
          "Participación en proyectos de desarrollo de software ágil",
        ]}
      />
      <Career
        institution="IDAT: Instituto de Investigación y Desarrollo de Administración y Tecnología"
        logo="/IDAT_logo.png"
        title="Computación e Informática"
        period="2022 - 2023"
        details={[
          "Especialización en pruebas de software y automatización",
          "Desarrollo de aplicaciones web y móviles",
          "Implementación de bases de datos y sistemas de gestión",
        ]}
      />

      <h3 className="text-lg font-bold mt-6 mb-2">Licencias y certificaciones</h3>
      <ul className="pl-2">
        <Course
          name="Accredited Software Testing Fundamentals Certification (AICS® ASTFC)"
          institution="AICS® - Asociación Internacional de Calidad de Software"
          year="2024"
          url="https://api.badgr.io/public/assertions/HahT9rorSRKEvguCDlgUkw"
        />
        <Course
          name="Scrum Fundamentals Certified (SFC™)"
          institution="SCRUMstudy™ - Accreditation Body for Scrum and Agile"
          year="2023"
          url="https://www.scrumstudy.com/certification/verify?type=SFC&number=1016208"
        />
      </ul>
    </div>
  );
}