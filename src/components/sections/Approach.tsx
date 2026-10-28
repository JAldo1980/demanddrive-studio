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
        title="From understanding to improvement"
        intro="Every engagement follows the same cycle, whether we are fixing one landing page or shaping your wider growth plan. You always know what stage we are at, and what you will get from it."
      />

      <ol className="relative mt-14 grid gap-0 lg:grid-cols-5 lg:gap-6">
        {/* Connecting line: vertical on mobile, horizontal on desktop. */}
        <span aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-px bg-line-dark lg:right-0 lg:bottom-auto lg:h-px lg:w-auto" />
        {approach.map((step, i) => (
          <li key={step.title} className="relative pb-10 pl-20 last:pb-0 lg:flex lg:flex-col lg:pb-0 lg:pl-0">
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 flex size-12 items-center justify-center rounded-full border-2 border-electric bg-navy text-lg font-bold text-white tabular-nums lg:relative"
            >
              {i + 1}
            </span>
            <h3 className="pt-2.5 text-xl font-semibold lg:mt-5 lg:pt-0">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-2 leading-relaxed text-on-navy-muted lg:flex-1">{step.description}</p>
            <p className="mt-4 rounded-lg border border-line-dark p-3 text-sm text-white lg:min-h-[5.5rem]">
              <span className="block text-xs font-semibold text-on-navy-muted">You get</span>
              {step.output}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
