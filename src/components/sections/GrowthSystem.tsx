import { Link } from 'react-router'
import { ArrowRight } from '../ui/Button'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const stages = [
  { verb: 'Attract', label: 'SEO and content', text: 'Be visible for the searches that signal genuine buying intent.', to: '/services#seo' },
  { verb: 'Convert', label: 'Landing pages', text: 'Turn interest into enquiries with focused pages and a clear next step.', to: '/services#landing-pages' },
  { verb: 'Measure', label: 'Performance insight', text: 'Track enquiries and their quality, not just visits and clicks.', to: '/services#measurement' },
  { verb: 'Improve', label: 'Prioritised changes', text: 'Use the evidence to decide what to change, and what to stop.', to: '/services#growth-strategy' },
]

function Connector() {
  return (
    <span
      aria-hidden="true"
      className="flex size-8 items-center justify-center rounded-full border border-line bg-white text-electric"
    >
      <ArrowRight className="size-4 rotate-90 lg:rotate-0" />
    </span>
  )
}

/** How the services connect: a loop from visibility to conversion to insight. */
export function GrowthSystem({ headingId = 'system-title' }: { headingId?: string }) {
  return (
    <Section labelledBy={headingId}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id={headingId}
          eyebrow="How the services connect"
          title="A joined-up growth system"
          intro="Buyers do not experience your marketing channel by channel. A search, a service page, an enquiry form and a follow-up call form one impression, so I plan them as one system."
        />
      </div>

      <div className="mt-12">
        <ol className="grid items-stretch gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center lg:gap-3">
          {stages.map((s, i) => (
            <li key={s.verb} className="contents">
              <Link
                to={s.to}
                className="group flex h-full flex-col rounded-xl border border-line bg-white p-6 transition-colors hover:border-electric"
              >
                <span className="text-sm font-semibold text-electric tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span className="mt-2 text-2xl font-bold tracking-tight text-navy">{s.verb}</span>
                <span className="mt-1 font-medium text-navy group-hover:text-electric">{s.label}</span>
                <span className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{s.text}</span>
              </Link>
              {i < stages.length - 1 && (
                <span className="flex justify-center">
                  <Connector />
                </span>
              )}
            </li>
          ))}
        </ol>

        {/* The loop back: evidence from Improve feeds the next round of Attract. */}
        <div aria-hidden="true" className="relative mx-[12.5%] hidden h-10 rounded-b-2xl border-x-2 border-b-2 border-dashed border-electric/40 lg:block">
          <span className="absolute -top-1 -left-[7px] h-0 w-0 border-x-[6px] border-b-[8px] border-x-transparent border-b-electric/60" />
        </div>
        <p className="mt-4 text-center text-sm font-medium text-muted lg:-mt-3">
          <span className="bg-white px-3">What I learn feeds the next round of priorities</span>
        </p>

        <Link
          to="/services#growth-strategy"
          className="group on-dark mt-6 flex flex-col gap-2 rounded-xl bg-navy p-6 text-white transition-colors hover:bg-navy-800 sm:flex-row sm:items-center sm:justify-between sm:p-7"
        >
          <span>
            <span className="block text-lg font-semibold">Growth strategy underpins every stage</span>
            <span className="mt-1 block text-on-navy-muted">
              Setting the audience, priorities and success measures that each stage works to.
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 font-semibold">
            About growth strategy
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </Section>
  )
}
