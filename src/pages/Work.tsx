import { FinalCta } from '../components/sections/FinalCta'
import { PageHero } from '../components/sections/PageHero'
import { Container } from '../components/ui/Container'
import { ProjectCard } from '../components/work/ProjectCard'
import { hasClientWork, publishedProjects } from '../content/work'

export default function Work() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Strategy in practice"
        intro="How we approach the problems B2B businesses bring to us: the business challenge, our thinking, what we would deliver and how we would measure success."
      >
        {!hasClientWork && (
          <p role="note" className="mt-8 rounded-lg border border-dashed border-navy/30 bg-cool p-5 text-charcoal">
            <span className="font-semibold text-navy">About these projects.</span> They are concept work: realistic B2B
            briefs we have worked through to show our approach. They are not client engagements, and the success measures
            describe what we would track, not results achieved. Client work will be added here as it is approved for
            publication.
          </p>
        )}
      </PageHero>
      <section aria-label="Projects" className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          <ul className="grid gap-8">
            {publishedProjects.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} layout="feature" headingLevel="h2" />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <FinalCta />
    </>
  )
}
