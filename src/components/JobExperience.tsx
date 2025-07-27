import { jobList } from "@data/jobs";

export default function JobExperience() {
  return (
    <div className="relative border-l-4 border-indigo-500 pl-6 space-y-6">
      {jobList.map((job) => (
        <div
          key={`${job.company}-${job.title}`}
          className="relative group transition-all duration-300"
        >
          {/* Punto de la línea */}
          <span className="absolute -left-3 top-6 w-5 h-5 rounded-full bg-indigo-500 border-4 border-white dark:border-gray-900 shadow-md group-hover:scale-110 transition-transform"></span>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 flex flex-col gap-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                {job.title}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300 mb-1">
              <span className="flex items-center gap-1">
                <span aria-label="empresa" title="Empresa">
                  🏢
                </span>
                <span className="font-medium">
                  <a
                    href={job.linkCompany}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline hover:text-indigo-400 transition-colors"
                  >
                    {job.company}
                  </a>
                </span>
              </span>
              <span className="hidden sm:inline text-gray-500">|</span>
              <span className="flex items-center gap-1">
                <span aria-label="ubicación" title="Ubicación">
                  📍
                </span>
                <span>{job.location}</span>
              </span>
            </div>
            <p className="text-xs text-indigo-300 italic mb-2">{job.period}</p>
            <ul className="list-disc pl-5 text-gray-200 space-y-1 marker:text-indigo-400">
              {job.details.map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
