import { realProjects } from '../../content/work'
import { ButtonLink } from '../ui/Button'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../work/ProjectCard'

export function WorkShowcase() {
  if (realProjects.length === 0) return null
  const [feature, ...rest] = realProjects

  return (
    <Section labelledBy="work-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="work-title"
          eyebrow="Track record"
          title="Results from real B2B work"
          intro="Examples from my previous roles and client work. Client names are withheld unless they have agreed to be named, and every figure comes from the reporting at the time."
        />
        <ButtonLink to="/work" variant="secondary" className="self-start lg:self-end">
          All work
        </ButtonLink>
      </div>
      <ul className="mt-12 grid gap-6 lg:grid-cols-2">
        <li className="lg:col-span-2">
          <ProjectCard project={feature} layout="feature" />
        </li>
        {rest.slice(0, 2).map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
