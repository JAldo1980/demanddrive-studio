import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/SectionHeading'

const audience = [
  'Manufacturing and engineering',
  'Industrial and technical markets',
  'Professional services',
]

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line bg-white">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-7">
          <Eyebrow>B2B digital growth studio</Eyebrow>
          <h1 id="hero-title" className="text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-[3.5rem]">
            Generate better B2B demand. <span className="text-electric">Convert more of it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            DemandDrive Studio brings growth strategy, SEO, conversion-focused landing pages and measurement into
            one joined-up plan, built and measured against the commercial outcomes that matter to your business.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <ButtonLink to="/contact" arrow>
              Discuss your goals
            </ButtonLink>
            <ButtonLink to="/services" variant="secondary">
              Explore our services
            </ButtonLink>
          </div>
        </div>

        <aside
          aria-labelledby="hero-audience"
          className="self-end rounded-lg border border-line bg-cool p-6 sm:p-8 lg:col-span-5"
        >
          <h2 id="hero-audience" className="text-sm font-semibold text-navy">
            Who we work with
          </h2>
          <p className="mt-3 leading-relaxed">
            UK SMEs and mid-market B2B businesses, typically owners, managing directors, commercial directors and
            marketing managers who need marketing to support pipeline, not just activity.
          </p>
          <ul className="mt-6 divide-y divide-line border-t border-line">
            {audience.map((item) => (
              <li key={item} className="flex items-center gap-3 py-3 font-medium text-navy">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-electric" />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </section>
  )
}
