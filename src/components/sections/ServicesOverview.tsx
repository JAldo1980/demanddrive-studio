import { Link } from 'react-router'
import { services } from '../../content/services'
import { ArrowRight, ButtonLink } from '../ui/Button'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function ServicesOverview() {
  return (
    <Section labelledBy="services-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="Five services, planned as one"
          intro="Strategy sets the direction. SEO and paid media create demand. Landing pages convert it. Measurement shows what to improve next. You can start with one, but each is designed to work with the others."
        />
        <ButtonLink to="/services" variant="secondary" className="shrink-0 self-start lg:self-end">
          How they work together
        </ButtonLink>
      </div>

      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <li key={s.id}>
            <Link
              to={`/services#${s.id}`}
              className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 transition-colors hover:border-electric sm:p-7"
            >
              <span aria-hidden="true" className="text-sm font-semibold text-muted tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-xl font-semibold group-hover:text-electric">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{s.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 pt-2 text-sm font-semibold text-electric">
                Learn more <span className="sr-only">about {s.title}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
        <li className="on-dark flex flex-col rounded-lg bg-navy p-6 text-white sm:p-7">
          <p className="text-xl font-semibold text-white">Not sure where to start?</p>
          <p className="mt-3 leading-relaxed text-on-navy-muted">
            Tell us what you are trying to achieve and we will suggest where effort is likely to make the most difference.
          </p>
          <span aria-hidden="true" className="min-h-6 flex-1" />
          <ButtonLink to="/contact" variant="inverse" className="mt-auto self-start">
            Discuss your goals
          </ButtonLink>
        </li>
      </ul>
    </Section>
  )
}
