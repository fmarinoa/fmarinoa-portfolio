import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { careers } from "@data/careers";
import { courses } from "@data/courses";

function Careers() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      {careers.map((career) => (
        <div
          key={`${career.institution}-${career.title}`}
          className="flex items-start gap-4 bg-gray-700 rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex-shrink-0">
            <Image
              src={career.logo}
              alt={career.institution}
              width={60}
              height={60}
              className="rounded w-16 h-auto"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{career.title}</h3>
            <span className="text-sm text-gray-300">
              {career.institution} &middot; {career.period}
            </span>
            <ul className="list-disc pl-5 mt-1 text-sm text-gray-200">
              {career.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function Courses() {
  return (
    <ul className="pl-2">
      {courses.map(({ name, institution, year, url }) => (
        <li key={name} className="mb-2">
          <span className="font-medium">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline underline-offset-4 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              {name}
            </a>
          </span>
          <br />
          <span className="text-gray-400">{institution}</span>{" "}
          <span className="text-gray-500">({year})</span>
        </li>
      ))}
    </ul>
  );
}

export default function Education() {
  return (
    <section id="education">
      <SectionTitle title="Educación" />

      <Careers />

      <h3 className="text-lg font-bold mt-6 mb-2">Algunas certificaciones:</h3>
      <Courses />
    </section>
  );
}
