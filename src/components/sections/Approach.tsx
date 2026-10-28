import { approach } from '../../content/approach'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function Approach() {
  return (
    <Section tone="navy" labelledBy="approach-title">
      <SectionHeading
        dark
        id="approach-title"
        eyebrow="How we work"
        title="A simple, repeatable process"
        intro="Every engagement follows the same cycle, whether we are fixing one landing page or shaping your wider growth plan."
      />
      <ol className="mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
        {approach.map((step, i) => (
          <li key={step.title} className="relative border-t border-line-dark pt-6 md:pr-2">
            <span
              aria-hidden="true"
              className="absolute -top-px left-0 h-0.5 w-10 bg-electric"
            />
            <p className="text-sm font-medium text-on-navy-muted tabular-nums">Step {i + 1}</p>
            <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-on-navy-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
