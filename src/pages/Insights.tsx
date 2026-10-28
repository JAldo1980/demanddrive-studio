import { Link } from 'react-router'
import { FinalCta } from '../components/sections/FinalCta'
import { PageHero } from '../components/sections/PageHero'
import { ArrowRight } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { formatDate, posts } from '../content/posts'

export default function Insights() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical thinking on B2B demand and conversion"
        intro="Notes from 13+ years of B2B marketing: what tends to work, what tends not to, and how to decide where to focus."
      />
      <section aria-label="Articles" className="bg-white py-14 sm:py-16 lg:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-lg text-muted">The first articles are on their way.</p>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/insights/${p.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line p-7 transition-colors hover:border-electric sm:p-8"
                  >
                    <p className="text-sm text-muted">
                      <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readingMinutes} min read
                      {p.draft && <span className="ml-2 font-semibold text-danger">Draft</span>}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight group-hover:text-electric">{p.title}</h2>
                    <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
                    {p.tags && p.tags.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <li key={t} className="rounded-full bg-cool px-3 py-1 text-xs font-medium text-navy">
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-electric">
                      Read the article <span className="sr-only">: {p.title}</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
      <FinalCta />
    </>
  )
}
