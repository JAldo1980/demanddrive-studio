import { FinalCta } from '../components/sections/FinalCta'
import { PageHero } from '../components/sections/PageHero'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProjectCard } from '../components/work/ProjectCard'
import { conceptProjects, publishedProjects, type Project } from '../content/work'

const groups: { id: string; title: string; intro: string; kinds: Project['kind'][] }[] = [
  {
    id: 'results',
    title: 'Results from previous roles',
    intro:
      'Work I led in agency and in-house roles before DemandDrive Studio. Clients are anonymised, and the figures come from the reporting at the time.',
    kinds: ['experience'],
  },
  {
    id: 'clients',
    title: 'Client work',
    intro: 'Projects for clients who have agreed to be named.',
    kinds: ['client'],
  },
  {
    id: 'concepts',
    title: 'Concept projects',
    intro:
      'Realistic B2B briefs worked through to show how I approach a problem. They are not client engagements, and the success measures describe what I would track, not results achieved.',
    kinds: ['concept'],
  },
]

export default function Work() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Strategy in practice"
        intro="Real results from my previous roles, client work, and concept projects that show how I think through a problem. Each one is clearly labelled."
      />
      {groups.map((g, i) => {
        const items = publishedProjects.filter((p) => g.kinds.includes(p.kind))
        if (items.length === 0) return null
        return (
          <section
            key={g.id}
            aria-labelledby={`${g.id}-title`}
            className={`py-14 sm:py-16 lg:py-20 ${i % 2 ? 'bg-cool' : 'bg-white'}`}
          >
            <Container>
              <SectionHeading id={`${g.id}-title`} title={g.title} intro={g.intro} />
              <ul className={`mt-10 grid gap-8 ${g.id === 'concepts' && conceptProjects.length > 1 ? 'lg:grid-cols-2' : ''}`}>
                {items.map((p) => (
                  <li key={p.slug}>
                    <ProjectCard project={p} layout={g.id === 'concepts' ? 'stacked' : 'feature'} />
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )
      })}
      <FinalCta />
    </>
  )
}
