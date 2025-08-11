import JobExperience from "./JobExperience";
import SectionTitle from "./SectionTitle";

export default function Experience() {
  return (
    <section id="experience" className="mb-12">
      <SectionTitle title="Experiencia laboral" />
      <div className="max-w-4xl mx-auto px-4">
        <JobExperience />
      </div>
    </section>
  );
}
