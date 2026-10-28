import { featuredTestimonials } from '../../content/testimonials'
import { QuoteCard } from '../QuoteCard'
import { Section } from '../ui/Section'

/** Featured client quotes and recommendations. Renders nothing until one is approved. */
export function Testimonials() {
  if (featuredTestimonials.length === 0) return null

  return (
    <Section tone="cool" labelledBy="testimonials-title" className="py-14! sm:py-16! lg:py-20!">
      <h2 id="testimonials-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
        What clients and colleagues say
      </h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {featuredTestimonials.map((t) => (
          <li key={t.quote}>
            <QuoteCard testimonial={t} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
