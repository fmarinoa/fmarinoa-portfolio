import Image from "next/image";

interface JobExperienceProps {
  readonly title: string;
  readonly company: string;
  readonly location: string;
  readonly period: string;
  readonly details: readonly string[];
  readonly logo?: string;
}

export default function JobExperience({
  title,
  company,
  location,
  period,
  details,
  logo,
}: JobExperienceProps) {
  return (
    <div className="bg-gray-700 shadow-md rounded-lg p-6 flex items-start gap-4 relative">
      {/* Logo en la esquina superior derecha */}
      {logo && (
        <div className="absolute top-4 right-4">
          <Image src={logo} alt={company} width={100} height={100} className="rounded" />
        </div>
      )}
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-200 mb-2">🏢{company} - 📍{location}</p>
        <p className="text-gray-300 text-sm mb-4">{period}</p>
        <ul className="list-disc pl-5 space-y-2">
          {details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
