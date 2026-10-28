import { Link, useParams } from 'react-router'
import { FinalCta } from '../components/sections/FinalCta'
import { ArrowRight } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Eyebrow } from '../components/ui/SectionHeading'
import { ProjectPreview } from '../components/visuals/ProjectPreview'
import { KindBadge } from '../components/work/ProjectCard'
import { services } from '../content/services'
import { getProject, publishedProjects } from '../content/work'
import NotFound from './NotFound'

export default function WorkDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFound />

  const concept = project.kind === 'concept'
  const index = publishedProjects.indexOf(project)
  const next = publishedProjects[(index + 1) % publishedProjects.length]
  const related = services.filter((s) => project.services.includes(s.id))

  const sections = [
    { title: 'What we would deliver', items: project.deliverables, show: concept },
    { title: 'What we delivered', items: project.deliverables, show: !concept },
    { title: concept ? 'How we would measure success' : 'How success was measured', items: project.measures, show: true },
  ].filter((s) => s.show)

  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-line bg-white">
        <Container className="pt-10 pb-12 sm:pt-12 lg:pt-16 lg:pb-16">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/work" className="hover:text-electric">Work</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-navy">{project.sector}</li>
            </ol>
          </nav>
          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <KindBadge project={project} />
              <span className="text-sm text-muted">{project.client}</span>
            </div>
            <h1 id="page-title" className="mt-5 text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{project.summary}</p>
          </div>
        </Container>
      </section>

      <section aria-label="Project preview" className="bg-cool py-10 sm:py-14">
        <Container>
          <ProjectPreview project={project} className="mx-auto max-w-5xl" />
          {concept && (
            <p className="mx-auto mt-4 max-w-5xl text-sm text-muted">
              Concept design by DemandDrive Studio. Not a client project.
            </p>
          )}
        </Container>
      </section>

      <section aria-label="Project details" className="bg-white py-14 sm:py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-7">
            <div>
              <Eyebrow>The challenge</Eyebrow>
              <h2 className="sr-only">The challenge</h2>
              <p className="text-lg leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{concept ? 'Our approach' : 'What we did'}</h2>
              <ol className="mt-6 space-y-4">
                {project.approach.map((a, i) => (
                  <li key={a} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-cool text-sm font-semibold text-navy tabular-nums">
                      {i + 1}
                    </span>
                    <p className="pt-1 leading-relaxed">{a}</p>
                  </li>
                ))}
              </ol>
            </div>
            {project.outcome && (
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Outcome</h2>
                <p className="mt-4 text-lg leading-relaxed">{project.outcome}</p>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:col-span-5">
            {sections.map((s) => (
              <div key={s.title} className="rounded-xl border border-line p-6 sm:p-7">
                <h2 className="text-lg font-semibold">{s.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-electric" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="rounded-xl bg-cool p-6 sm:p-7">
              <h2 className="text-lg font-semibold">Services involved</h2>
              <ul className="mt-4 space-y-2">
                {related.map((s) => (
                  <li key={s.id}>
                    <Link to={`/services#${s.id}`} className="font-medium text-electric underline-offset-2 hover:underline">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      {next && next !== project && (
        <section aria-label="Next project" className="border-t border-line bg-white">
          <Container className="py-10">
            <Link to={`/work/${next.slug}`} className="group flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-medium text-muted">Next project</span>
              <span className="inline-flex items-center gap-3 text-xl font-semibold text-navy group-hover:text-electric">
                {next.title}
                <ArrowRight className="size-5 shrink-0" />
              </span>
            </Link>
          </Container>
        </section>
      )}

      <FinalCta />
    </>
  )
}
