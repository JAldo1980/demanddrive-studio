import { FinalCta } from '../components/sections/FinalCta'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Section } from '../components/ui/Section'
import { Eyebrow, SectionHeading } from '../components/ui/SectionHeading'
import { site } from '../config/site'
import { QuoteCard } from '../components/QuoteCard'
import { boardLanguage, certifications, qualifications, roles, strengths, tools } from '../content/about'
import { recommendations } from '../content/testimonials'

const audience = [
  { title: 'Sectors', text: 'Manufacturing, engineering, industrial and technical markets, and professional services.' },
  { title: 'Size', text: 'UK SMEs and mid-market businesses, often with a small in-house marketing function or none at all.' },
  { title: 'People', text: 'Owners, managing directors, commercial directors and marketing managers who are accountable for growth.' },
]

export default function About() {
  const linkedIn = site.social.find((s) => s.label === 'LinkedIn')
  return (
    <>
      <section aria-labelledby="page-title" className="overflow-hidden border-b border-line bg-white">
        <Container className="grid items-end gap-10 pt-12 lg:grid-cols-12 lg:gap-12 lg:pt-16">
          <div className="pb-12 lg:col-span-7 lg:pb-20">
            <Eyebrow>About</Eyebrow>
            <h1 id="page-title" className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Hi, I’m James. I’m a B2B marketer who also builds.
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
              <p>
                For 13+ years I have been measured on enquiries and client results: in agencies, in-house, and in a
                digital agency I co-founded and ran. Along the way I kept ending up in the code, and now I build the
                websites and landing pages myself.
              </p>
              <p>
                DemandDrive Studio is how I work with UK B2B businesses directly. You get the strategy and the delivery
                from one person, without the handovers.
              </p>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/contact" arrow>
                Discuss a project
              </ButtonLink>
              {linkedIn && (
                <a
                  href={linkedIn.href}
                  target="_blank"
                  rel="me noopener"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-navy/20 px-6 font-semibold text-navy transition-colors hover:border-navy hover:bg-cool"
                >
                  Connect on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/4 rounded-t-[2rem] bg-cool" />
            <img
              src={site.founder.portrait}
              alt={`${site.founder.name}, founder of ${site.name}`}
              width={800}
              height={1239}
              fetchPriority="high"
              className="relative mx-auto h-auto w-full max-w-sm lg:max-w-md"
            />
          </div>
        </Container>
      </section>

      <Section labelledBy="strengths-title">
        <SectionHeading
          id="strengths-title"
          eyebrow="What I bring"
          title="Strategy, board-level communication and hands-on delivery"
          intro="I have spent my career in the meetings where marketing is judged on enquiries, not activity. That is the standard I work to."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {strengths.map((s) => (
            <li key={s.title} className="bg-white p-6 sm:p-8">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="navy" labelledBy="board-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <SectionHeading
            dark
            id="board-title"
            className="lg:col-span-5"
            eyebrow="I speak board"
            title="Marketing results, in the language decisions are made in"
            intro="I present performance and recommendations to boards and senior leadership, run strategy workshops and keep a rolling 30-60-90 day plan."
          />
          <table className="w-full text-left lg:col-span-7">
            <caption className="sr-only">What marketing says, and what the board hears</caption>
            <thead>
              <tr className="text-sm text-on-navy-muted">
                <th scope="col" className="pb-4 font-semibold">Marketing says</th>
                <th scope="col" className="pb-4 font-semibold">The board hears</th>
              </tr>
            </thead>
            <tbody>
              {boardLanguage.map((b) => (
                <tr key={b.says} className="border-t border-line-dark">
                  <td className="py-5 pr-4 text-lg text-on-navy-muted">“{b.says}”</td>
                  <td className="py-5 text-lg font-semibold text-white">“{b.hears}”</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section labelledBy="roles-title">
        <SectionHeading
          id="roles-title"
          eyebrow="Background"
          title="The roles that shaped how I work"
          intro="Start-ups, agencies and in-house teams. Each one taught me something about what makes marketing pay its way."
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => (
            <li key={r.title} className="rounded-xl border border-line p-6">
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{r.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="cool" labelledBy="credentials-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="credentials-title" eyebrow="Qualifications" title="Always learning, always teaching" />
            <ul className="mt-8 space-y-4">
              {qualifications.map((q) => (
                <li key={q} className="flex gap-3 text-lg leading-relaxed">
                  <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-electric" />
                  {q}
                </li>
              ))}
            </ul>
            <h3 className="mt-10 text-sm font-semibold text-navy">Certifications</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {certifications.map((c) => (
                <li key={c.name} className="py-3">
                  <span className="block font-medium text-navy">{c.name}</span>
                  <span className="text-sm text-muted">
                    {c.issuer} · {c.year}
                  </span>
                </li>
              ))}
            </ul>
            {linkedIn && (
              <p className="mt-6 text-muted">
                Credentials can be verified on{' '}
                <a href={linkedIn.href} target="_blank" rel="me noopener" className="font-medium text-electric underline underline-offset-2">
                  my LinkedIn profile<span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </p>
            )}
          </div>
          <div className="lg:col-span-6">
            <h3 className="text-sm font-semibold text-navy">Tools I use every day</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tools.map((t) => (
                <li key={t} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {recommendations.length > 0 && (
        <Section labelledBy="recommendations-title">
          <SectionHeading
            id="recommendations-title"
            eyebrow="Recommendations"
            title="What people say about working with me"
            intro="From clients, colleagues and marketers I have mentored, as written on LinkedIn."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {recommendations.map((t) => (
              <li key={t.quote} className="rounded-2xl border border-line">
                <QuoteCard testimonial={t} />
              </li>
            ))}
          </ul>
          {linkedIn && (
            <a
              href={`${linkedIn.href}details/recommendations/`}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-electric underline-offset-2 hover:underline"
            >
              Read the full recommendations on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </Section>
      )}

      <Section tone="cool" labelledBy="audience-title">
        <SectionHeading id="audience-title" eyebrow="Who I work with" title="Built for B2B businesses with complex sales" />
        <dl className="mt-12 grid gap-8 md:grid-cols-3">
          {audience.map((a) => (
            <div key={a.title} className="border-t-2 border-navy pt-5">
              <dt className="text-lg font-semibold text-navy">{a.title}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{a.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <FinalCta />
    </>
  )
}
