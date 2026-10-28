import { publishedTestimonials } from '../../content/testimonials'
import { Placeholder } from '../ui/Placeholder'
import { Section } from '../ui/Section'

/**
 * Approved client testimonials. Hidden on the live site until at least one
 * approved quote exists; shows a labelled placeholder in development.
 */
export function Testimonials() {
  if (publishedTestimonials.length === 0) {
    if (!import.meta.env.DEV) return null
    return (
      <Section tone="white" className="py-10!">
        <Placeholder block>
          Testimonials. Development preview only: this section is hidden on the live site until an approved client quote
          is added to src/content/testimonials.ts.
        </Placeholder>
      </Section>
    )
  }

  return (
    <Section tone="white" labelledBy="testimonials-title">
      <h2 id="testimonials-title" className="sr-only">
        What clients say
      </h2>
      <ul className="grid gap-6 md:grid-cols-2">
        {publishedTestimonials.map((t) => (
          <li key={t.quote}>
            <figure className="h-full rounded-2xl border border-line p-8">
              <blockquote className="text-xl leading-relaxed text-navy">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold text-navy">{t.name}</span>
                <span className="text-muted">
                  , {t.role}, {t.company}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
