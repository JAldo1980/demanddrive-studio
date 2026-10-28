import { Link } from 'react-router'
import { serviceFaqs } from '../content/faqs'
import { services } from '../content/services'
import { publishedProjects } from '../content/work'
import { Approach } from '../components/sections/Approach'
import { Faq } from '../components/sections/Faq'
import { GrowthSystem } from '../components/sections/GrowthSystem'
import { FinalCta } from '../components/sections/FinalCta'
import { PageHero } from '../components/sections/PageHero'
import { Container } from '../components/ui/Container'


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

      <GrowthSystem />

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
                    {publishedProjects
                      .filter((p) => p.services.includes(s.id))
                      .slice(0, 1)
                      .map((p) => (
                        <Link
                          key={p.slug}
                          to={`/work/${p.slug}`}
                          className="mt-4 block border-t border-line pt-4 text-sm font-medium text-electric underline-offset-2 hover:underline"
                        >
                          See it in practice: {p.title}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </section>

      <Approach />
      <Faq
        items={serviceFaqs}
        title="Questions about my services"
        intro="How the services fit together, where to start and what to expect."
      />
      <FinalCta
        title="Not sure which service you need?"
        text="Most engagements start with a conversation about your objectives and current activity. I will recommend where to focus, even if that means starting small."
      />
    </>
  )
}
