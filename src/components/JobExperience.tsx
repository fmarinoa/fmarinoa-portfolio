interface JobExperienceProps {
  readonly title: string;
  readonly company: string;
  readonly location: string;
  readonly period: string;
  readonly details: readonly string[];
}

export default function JobExperience({
  title,
  company,
  location,
  period,
  details,
}: JobExperienceProps) {
  return (
    <div className="bg-gray-700 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-gray-200 mb-2">🏢{company} - 📍{location}</p>
      <p className="text-gray-300 text-sm mb-4">{period}</p>
      <ul className="list-disc pl-5 space-y-2">
        {details.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
