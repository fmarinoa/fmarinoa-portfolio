import SectionTitle from './SectionTitle';
import { careers } from '@data/careers';
import { courses } from '@data/courses';

function Careers() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      {careers.map((career) => (
        <div
          key={`${career.institutionShort}-${career.title}`}
          className="bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl border border-gray-700 hover:border-indigo-400 transition-all duration-300 bg-gray-700 rounded-lg p-4 hover:shadow-lg"
        >
          <div className="grid grid-cols-[auto_1fr] gap-4">
            <div className="flex-shrink-0 flex items-center">
              <img
                src={career.logo}
                alt={career.institutionShort}
                width={60}
                height={60}
                className="rounded w-16 h-auto"
              />
            </div>

            <div>
              <h3 className="font-bold text-lg mb-1">{career.title}</h3>
              <p className="text-sm mb-1">
                🏢 <span className="font-semibold text-gray-100">{career.institutionShort}</span>
                <span className="text-gray-300">: {career.institutionLong}</span>
              </p>
              <p className="text-sm text-gray-300">📅 {career.period}</p>
            </div>
          </div>

          <ul className="list-disc pl-5 mt-2 text-sm text-gray-200">
            {career.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
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
          <span className="text-gray-300">{institution}</span>{' '}
          <span className="text-gray-400">({year})</span>
        </li>
      ))}
    </ul>
  );
}

export default function Education() {
  return (
    <section id="education" className="mb-12">
      <SectionTitle title="Educación" />

      <Careers />

      <h3 className="text-lg font-bold mt-6 mb-2">Algunas certificaciones:</h3>
      <Courses />
    </section>
  );
}
