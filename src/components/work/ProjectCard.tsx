import { Link } from 'react-router'
import { serviceTitles } from '../../content/services'
import { kindLabels, type Project } from '../../content/work'
import { ArrowRight } from '../ui/Button'
import { ProjectPreview } from '../visuals/ProjectPreview'

const badgeStyles = {
  experience: 'bg-navy text-white',
  client: 'bg-electric/10 text-electric',
  concept: 'border border-dashed border-navy/40 text-navy',
}

export function KindBadge({ project }: { project: Project }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[project.kind]}`}>
      {kindLabels[project.kind]}
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
        {project.stats && feature && (
          <dl className="mt-6 grid grid-cols-3 gap-4 border-y border-line py-5">
            {project.stats.map((st) => (
              <div key={st.label}>
                <dt className="sr-only">{st.label}</dt>
                <dd className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{st.value}</dd>
                <dd className="mt-1 text-sm leading-snug text-muted">{st.label}</dd>
              </div>
            ))}
          </dl>
        )}
        <p className="mt-5 text-sm text-muted">{serviceTitles(project.services).join(' · ')}</p>
        <span className={`inline-flex items-center gap-2 pt-6 font-semibold text-electric ${feature ? '' : 'mt-auto'}`}>
          View the project <span className="sr-only">: {project.title}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
