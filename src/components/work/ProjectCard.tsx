import { Link } from 'react-router'
import { serviceTitles } from '../../content/services'
import type { Project } from '../../content/work'
import { ArrowRight } from '../ui/Button'
import { ProjectPreview } from '../visuals/ProjectPreview'

export function KindBadge({ project }: { project: Project }) {
  if (project.kind === 'concept') {
    return (
      <span className="inline-flex items-center rounded-full border border-dashed border-navy/40 px-3 py-1 text-xs font-semibold text-navy">
        Concept project
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full bg-electric/10 px-3 py-1 text-xs font-semibold text-electric">
      Client work
    </span>
  )
}

type ProjectCardProps = {
  project: Project
  layout?: 'feature' | 'stacked'
  headingLevel?: 'h2' | 'h3'
}

/** A large, linked project preview. The whole card is one link. */
export function ProjectCard({ project, layout = 'stacked', headingLevel: Heading = 'h3' }: ProjectCardProps) {
  const feature = layout === 'feature'
  return (
    <Link
      to={`/work/${project.slug}`}
      className={`group grid h-full overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-electric ${
        feature ? 'lg:grid-cols-12' : 'grid-rows-[auto_1fr]'
      }`}
    >
      <div className={`bg-cool p-4 sm:p-6 ${feature ? 'lg:col-span-7 lg:p-8' : ''}`}>
        <ProjectPreview project={project} className="transition-transform duration-300 group-hover:-translate-y-1" />
      </div>
      <div className={`flex flex-col p-6 sm:p-8 ${feature ? 'lg:col-span-5 lg:justify-center lg:p-10' : ''}`}>
        <div className="flex flex-wrap items-center gap-3">
          <KindBadge project={project} />
          <span className="text-sm text-muted">{project.sector}</span>
        </div>
        <Heading
          className={`mt-4 font-bold tracking-tight group-hover:text-electric ${feature ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}
        >
          {project.title}
        </Heading>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
        <p className="mt-5 text-sm text-muted">{serviceTitles(project.services).join(' · ')}</p>
        <span className={`inline-flex items-center gap-2 pt-6 font-semibold text-electric ${feature ? '' : 'mt-auto'}`}>
          View the project <span className="sr-only">: {project.title}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
