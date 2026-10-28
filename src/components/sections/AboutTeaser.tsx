import { ButtonLink } from '../ui/Button'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const pillars = [
  {
    title: 'Strategic thinking',
    text: 'We start with your commercial objectives and the way your buyers make decisions, then decide which marketing will move things forward.',
  },
  {
    title: 'Clear communication',
    text: 'Plain-English recommendations, honest about trade-offs and what the evidence does and does not show.',
  },
  {
    title: 'Hands-on delivery',
    text: 'The same people who shape the plan build the campaigns, pages and tracking, so strategy does not get lost in handover.',
  },
]

export function AboutTeaser() {
  return (
    <Section tone="cool" labelledBy="about-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="about-title"
            eyebrow="About the studio"
            title="A commercially minded partner that also does the work"
            intro="Many businesses have to choose between a consultant who advises and an agency that executes. We combine both, so recommendations are practical and delivery stays tied to the plan."
          />
          <ButtonLink to="/about" variant="secondary" className="mt-8">
            About our approach
          </ButtonLink>
        </div>
        <ul className="grid gap-px self-start overflow-hidden rounded-lg border border-line bg-line lg:col-span-7">
          {pillars.map((p) => (
            <li key={p.title} className="bg-white p-6 sm:p-8">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
