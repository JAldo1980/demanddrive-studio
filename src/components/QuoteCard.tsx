import { Link } from 'react-router'
import type { Testimonial } from '../content/testimonials'

/** A single client quote or LinkedIn recommendation. */
export function QuoteCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white p-7 sm:p-8">
      <span aria-hidden="true" className="text-5xl leading-none font-bold text-electric">
        “
      </span>
      <blockquote className="mt-2 text-lg leading-relaxed text-navy">{t.quote}</blockquote>
      <figcaption className="mt-auto pt-6 text-sm">
        {t.name ? (
          <>
            <span className="block font-semibold text-navy">{t.name}</span>
            <span className="block text-muted">{t.source}</span>
          </>
        ) : (
          <span className="block">
            <span className="font-semibold text-navy">{t.source}</span>
            {t.organisation && <span className="text-muted">, {t.organisation}</span>}
          </span>
        )}
        {t.context && <span className="mt-1 block text-muted">{t.context}</span>}
        {t.projectSlug && (
          <Link
            to={`/work/${t.projectSlug}`}
            className="mt-1 inline-block font-medium text-electric underline-offset-2 hover:underline"
          >
            See the results
          </Link>
        )}
      </figcaption>
    </figure>
  )
}
