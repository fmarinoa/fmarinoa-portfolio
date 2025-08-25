import InfoCard from '@/components/InfoCard';
import SectionTitle from '@/components/SectionTitle';
import { jobList } from '@/data/jobs';

export default function Experience() {
  return (
    <section id="experience" className="mb-12">
      <SectionTitle title="Experiencia laboral" />
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative border-l-4 border-indigo-500 pl-6 space-y-6">
          {jobList.map((job) => (
            <div
              key={`${job.company}-${job.title}`}
              className="relative group transition-all duration-300"
            >
              <span className="absolute -left-3 top-6 w-5 h-5 rounded-3xl bg-indigo-500 border-2 shadow-md group-hover:scale-110 transition-transform"></span>

              <InfoCard
                title={job.title}
                entity={job.company}
                linkEntity={job.linkCompany}
                location={job.location}
                period={job.period}
                details={job.details}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
