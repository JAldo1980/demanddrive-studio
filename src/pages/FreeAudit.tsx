import { Link } from 'react-router'
import { AuditForm } from '../components/AuditForm'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Eyebrow, SectionHeading } from '../components/ui/SectionHeading'
import { site } from '../config/site'
import { audit } from '../content/audit'

export default function FreeAudit() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-line bg-cool">
        <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
          <div className="lg:col-span-6 lg:pt-4">
            <Eyebrow>Free landing page audit</Eyebrow>
            <h1 id="page-title" className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl">
              Find out why your page isn’t producing more enquiries
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Send me one landing page or key page from your website. I will review it, check how its enquiries are
              tracked, and send you a {audit.videoLength} video walkthrough with a short list of fixes in priority
              order. Free, with no obligation.
            </p>
            <ul className="mt-8 space-y-3">
              {[`Video walkthrough within ${audit.turnaround}`, 'Prioritised list of fixes', 'Reviewed by me, not a tool'].map((t) => (
                <li key={t} className="flex items-center gap-3 font-medium text-navy">
                  <span aria-hidden="true" className="flex size-6 items-center justify-center rounded-full bg-electric text-white">
                    <svg viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 10.5l3.5 3.5 7.5-8" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-4">
              <img src={site.founder.headshot} alt="" width={56} height={55} className="size-14 rounded-full bg-white object-cover" />
              <p className="text-sm leading-snug">
                <span className="block font-semibold text-navy">{site.founder.name}</span>
                <span className="text-muted">13+ years in B2B marketing, and I build landing pages too</span>
              </p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <AuditForm />
          </div>
        </Container>
      </section>

      <Section labelledBy="reviews-title">
        <SectionHeading
          id="reviews-title"
          eyebrow="What I look at"
          title="Four things that decide whether a page produces enquiries"
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audit.reviews.map((r, i) => (
            <li key={r.title} className="rounded-xl border border-line p-6">
              <span className="text-sm font-semibold text-electric tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{r.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="navy" labelledBy="how-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading dark id="how-title" className="lg:col-span-5" eyebrow="How it works" title="Three simple steps" />
          <ol className="space-y-4 lg:col-span-7">
            {audit.steps.map((s, i) => (
              <li key={s.title} className="flex gap-5 rounded-xl border border-line-dark p-5">
                <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-electric font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 leading-relaxed text-on-navy-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section labelledBy="eligibility-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading id="eligibility-title" className="lg:col-span-5" eyebrow="Who it’s for" title="Is it right for you?" />
          <div className="lg:col-span-7">
            <ul className="divide-y divide-line border-y border-line">
              {audit.eligibility.map((e) => (
                <li key={e} className="flex gap-3 py-4 text-lg">
                  <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-electric" />
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-muted">
              Need more than one page looked at?{' '}
              <Link to="/contact" className="font-medium text-electric underline underline-offset-2">
                Get in touch
              </Link>{' '}
              to discuss a wider review.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
