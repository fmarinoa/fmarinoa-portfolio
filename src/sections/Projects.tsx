import { useState } from 'react';

import Link from '@/components/Link';
import SectionTitle from '@/components/SectionTitle';
import { projects } from '@/data/projects';
import { Project } from '@/types';

export default function Projects() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="projects" className="mb-12">
      <SectionTitle title="Proyectos personales" />

      <div className="relative overflow-hidden w-full h-[520px]">
        <div className="edge-fade-left" aria-hidden="true" />
        <div className="edge-fade-right" aria-hidden="true" />

        <div
          className="flex gap-6 w-max h-full marquee py-4"
          style={{ animationPlayState: paused ? 'paused' : 'running' }}
        >
          {projects.concat(projects).map((project: Project, index: number) => (
            <article
              key={`${project.title}-${index}`}
              className="group flex flex-col w-[320px] h-full shrink-0 bg-gradient-to-br from-gray-800 to-gray-900 
                rounded-xl shadow-xl border border-gray-700 hover:border-indigo-400 hover:shadow-2xl 
                p-6 transition-all duration-300 whitespace-normal"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {project.imageUrl && (
                <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-white mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-end w-full text-sm mt-auto">
                <div className="flex gap-4">
                  {project.demoUrl && <Link href={project.demoUrl}>Demo 🛜</Link>}
                  {project.githubUrl && <Link href={project.githubUrl}>{'< GitHub / >'}</Link>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
