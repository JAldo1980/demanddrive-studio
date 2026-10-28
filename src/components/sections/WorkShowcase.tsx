import { hasClientWork, publishedProjects } from '../../content/work'
import { ButtonLink } from '../ui/Button'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../work/ProjectCard'

export function WorkShowcase() {
  if (publishedProjects.length === 0) return null
  const [feature, ...rest] = publishedProjects

  return (
    <Section labelledBy="work-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="Strategy in practice"
          intro={
            hasClientWork
              ? 'Examples of the problems we help B2B businesses solve, from the business challenge to how success is measured.'
              : 'Concept projects based on typical B2B briefs, showing how we approach a problem: the challenge, our thinking, what we would deliver and how we would measure success. They are not client engagements.'
          }
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
