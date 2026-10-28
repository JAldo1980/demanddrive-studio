import { publishedCaseStudies, type CaseStudy } from '../../content/caseStudies'
import { Placeholder } from '../ui/Placeholder'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

/**
 * Work and credibility. Renders nothing on the live site until at least one
 * approved case study exists in src/content/caseStudies.ts. In development it
 * shows labelled placeholders so the layout can be reviewed.
 */
export function CaseStudies() {
  const items = publishedCaseStudies
  if (items.length === 0 && !import.meta.env.DEV) return null

  return (
    <Section labelledBy="work-title">
      <SectionHeading
        id="work-title"
        eyebrow="Work"
        title="Selected work"
        intro="Examples of the problems we have helped B2B businesses solve, shared with their permission."
      />
      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        {items.length > 0
          ? items.map((c) => <CaseStudyCard key={c.slug} study={c} />)
          : [1, 2, 3].map((n) => (
              <li key={n}>
                <Placeholder block>
                  Case study {n}. Development preview only: this section is hidden on the live site until an
                  approved case study is added.
                </Placeholder>
              </li>
            ))}
      </ul>
    </Section>
  )
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <li className="flex flex-col rounded-lg border border-line p-6 sm:p-7">
      <p className="text-sm font-medium text-muted">{study.sector}</p>
      <h3 className="mt-2 text-xl font-semibold">{study.client}</h3>
      <dl className="mt-5 space-y-4 text-[0.9375rem] leading-relaxed">
        <div>
          <dt className="font-semibold text-navy">Challenge</dt>
          <dd className="mt-1 text-muted">{study.challenge}</dd>
        </div>
        <div>
          <dt className="font-semibold text-navy">What we did</dt>
          <dd className="mt-1 text-muted">{study.work}</dd>
        </div>
        {study.outcome && (
          <div>
            <dt className="font-semibold text-navy">Outcome</dt>
            <dd className="mt-1 text-muted">{study.outcome}</dd>
          </div>
        )}
      </dl>
      <p className="mt-auto pt-6 text-sm text-muted">{study.services.join(' · ')}</p>
    </li>
  )
}
