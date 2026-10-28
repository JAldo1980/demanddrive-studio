import { Link } from 'react-router'
import { publishedTestimonials } from '../../content/testimonials'
import { Section } from '../ui/Section'

/** Client feedback. Renders nothing until an approved quote exists. */
export function Testimonials() {
  if (publishedTestimonials.length === 0) return null

  return (
    <Section tone="cool" labelledBy="testimonials-title" className="py-14! sm:py-16! lg:py-20!">
      <h2 id="testimonials-title" className="text-sm font-semibold text-muted">
        What clients said
      </h2>
      <ul className="mt-6 grid gap-6 md:grid-cols-2">
        {publishedTestimonials.map((t) => (
          <li key={t.quote}>
            <figure className="flex h-full flex-col rounded-2xl bg-white p-8">
              <span aria-hidden="true" className="text-5xl leading-none font-bold text-electric">“</span>
              <blockquote className="mt-2 text-xl leading-relaxed text-navy">{t.quote}</blockquote>
              <figcaption className="mt-auto pt-6 text-sm">
                <span className="font-semibold text-navy">{t.source}</span>
                <span className="text-muted">, {t.organisation}</span>
                {t.projectSlug && (
                  <>
                    {' · '}
                    <Link to={`/work/${t.projectSlug}`} className="font-medium text-electric underline-offset-2 hover:underline">
                      See the results
                    </Link>
                  </>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
