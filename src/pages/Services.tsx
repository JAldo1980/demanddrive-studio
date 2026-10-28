import { Link } from 'react-router'
import { services } from '../content/services'
import { Approach } from '../components/sections/Approach'
import { FinalCta } from '../components/sections/FinalCta'
import { PageHero } from '../components/sections/PageHero'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'

const flow = [
  { label: 'Strategy', detail: 'sets direction and measures', ids: ['growth-strategy'] },
  { label: 'SEO', detail: 'builds visibility with the right buyers', ids: ['seo'] },
  { label: 'Landing pages', detail: 'turn interest into enquiries', ids: ['landing-pages'] },
  { label: 'Measurement', detail: 'shows what to improve next', ids: ['measurement'] },
]

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Connected services for B2B demand and conversion"
        intro="Each service solves a specific business problem. Together they form a single system: one plan, one set of measures and no gaps between the channels your buyers move through."
      >
        <nav aria-label="Services on this page" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  to={`#${s.id}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-medium text-navy transition-colors hover:border-electric hover:text-electric"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Section tone="cool" labelledBy="together-title">
        <SectionHeading
          id="together-title"
          eyebrow="How they work together"
          title="One system, not a list of tactics"
          intro="Buyers do not experience your marketing channel by channel. A search result, a service page, a landing page and a follow-up call all form one impression. We plan them the same way."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {flow.map((f, i) => (
            <li key={f.label} className="relative rounded-lg border border-line bg-white p-6">
              <p className="text-sm font-semibold text-electric tabular-nums">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-2 text-lg font-semibold text-navy">{f.label}</p>
              <p className="mt-1 text-muted">{f.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-3xl text-muted">
          What we learn from measurement feeds back into strategy, so priorities are adjusted based on evidence rather
          than assumption.
        </p>
      </Section>

      <section aria-label="Service details" className="bg-white">
        <Container>
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="grid gap-8 border-b border-line py-14 last:border-b-0 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20"
            >
              <div className="lg:col-span-5">
                <p className="text-sm font-semibold text-muted tabular-nums">{String(i + 1).padStart(2, '0')}</p>
                <h2 id={`${s.id}-title`} className="mt-3 text-3xl font-bold tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-4 text-lg font-medium text-navy">{s.summary}</p>
              </div>
              <div className="lg:col-span-7">
                <h3 className="text-sm font-semibold text-navy">Why it matters</h3>
                <p className="mt-2 text-lg leading-relaxed">{s.purpose}</p>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold text-navy">Typically includes</h3>
                    <ul className="mt-3 space-y-2.5">
                      {s.includes.map((item) => (
                        <li key={item} className="flex gap-3 leading-relaxed text-muted">
                          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-electric" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="self-start rounded-lg bg-cool p-5">
                    <h3 className="text-sm font-semibold text-navy">How it connects</h3>
                    <p className="mt-2 leading-relaxed text-muted">{s.connects}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <Approach />
      <FinalCta
        title="Not sure which service you need?"
        text="Most engagements start with a conversation about your objectives and current activity. We will recommend where to focus, even if that means starting small."
      />
    </>
  )
}
