import InfoCard from '@/components/InfoCard';
import SectionTitle from '@/components/SectionTitle';
import { careers } from '@/data/careers';
import { courses } from '@/data/courses';

function Careers() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      {careers.map((career) => (
        <InfoCard
          key={`${career.institutionShort}-${career.title}`}
          title={career.title}
          logo={career.logo}
          logoAlt={career.institutionLong}
          entity={career.institutionShort}
          location={career.location}
          period={career.period}
          details={career.details}
        />
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
