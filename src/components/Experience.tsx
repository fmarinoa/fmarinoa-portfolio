import JobExperience from "./JobExperience";
import SectionTitle from "./SectionTitle";

export default function Experience() {
  return (
    <section id="experience">
      <SectionTitle title="Experiencia Laboral" />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <JobExperience />
      </div>
    </section>
  );
}
