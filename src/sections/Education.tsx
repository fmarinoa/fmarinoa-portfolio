import InfoCard from '@/components/InfoCard';
import Link from '@/components/Link';
import SectionTitle from '@/components/SectionTitle';
import { careers } from '@/data/careers';
import { courses } from '@/data/courses';
import { Career, Course } from '@/types';

function Careers() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      {careers.map((career: Career) => (
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
      {courses.map((course: Course) => (
        <li key={course.name} className="mb-2">
          <span className="font-medium">
            <Link className="underline underline-offset-4 cursor-pointer" href={course.url}>
              {course.name}
            </Link>
          </span>
          <br />
          <span className="text-gray-300">{course.institution}</span>{' '}
          <span className="text-gray-400">({course.year})</span>
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
