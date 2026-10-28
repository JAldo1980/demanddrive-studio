import { challenges } from '../../content/challenges'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function Challenges() {
  return (
    <Section tone="cool" labelledBy="challenges-title">
      <SectionHeading
        id="challenges-title"
        eyebrow="The problems we solve"
        title="Where B2B marketing usually stalls"
        intro="Most of the businesses we speak to are not short of marketing activity. The issue is that it is not connected, not converting or not clearly measured."
      />
      <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {challenges.map((c, i) => (
          <li key={c.title} className="flex flex-col bg-white p-6 sm:p-8">
            <span aria-hidden="true" className="text-sm font-semibold text-electric tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-xl font-semibold">{c.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{c.problem}</p>
            <p className="mt-6 border-t border-line pt-4 font-medium text-navy">
              <span className="sr-only">How we help: </span>
              {c.response}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
