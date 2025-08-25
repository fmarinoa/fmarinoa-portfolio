interface Props {
  readonly title: string;
  readonly entity: string;
  readonly linkEntity?: string;
  readonly location: string;
  readonly period: string;
  readonly details: string[];
  readonly logo?: string;
  readonly logoAlt?: string;
}

export default function InfoCard({
  title,
  entity,
  linkEntity,
  location,
  period,
  details,
  logo,
  logoAlt,
}: Props) {
  const EntityInfo = linkEntity ? (
    <a
      href={linkEntity}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:underline hover:text-indigo-400 transition-colors"
    >
      {entity}
    </a>
  ) : (
    <span className="text-sm font-semibold text-gray-100">{entity}</span>
  );

  const Meta = (
    <>
      <p className="flex items-center gap-2 text-sm text-gray-300">
        🏢 {EntityInfo} <span className="text-gray-500">|</span> 📍 {location}
      </p>
      <p className="text-sm text-gray-300">📅 {period}</p>
    </>
  );

  const Header = (
    <>
      <div>
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        {Meta}
      </div>
    </>
  );

  return (
    <div
      className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-gray-700 
                  hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 flex flex-col gap-2 group"
    >
      {logo ? (
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt={logoAlt ?? entity}
              width={60}
              height={60}
              className="rounded w-16 h-auto"
            />
          </div>
          {Header}
        </div>
      ) : (
        Header
      )}

      <ul className="list-disc pl-5 text-gray-200 space-y-1 marker:text-indigo-400">
        {details.map((item) => (
          <li key={item} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
