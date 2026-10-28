import { site } from '../../config/site'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/SectionHeading'

const pillars = [
  {
    title: 'Strategic thinking',
    text: 'I start with your commercial objectives and the way your buyers make decisions, then decide which marketing will move things forward.',
  },
  {
    title: 'Clear communication',
    text: 'Plain-English recommendations and reporting in enquiries, pipeline and revenue: the language boards act on.',
  },
  {
    title: 'Hands-on delivery',
    text: 'I build the pages, content and tracking myself, so strategy does not get lost in handover.',
  },
]

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-title" className="overflow-hidden bg-cool">
      <Container className="grid items-end gap-10 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-12 lg:pt-24">
        <div className="pb-16 sm:pb-20 lg:col-span-7 lg:pb-24">
          <Eyebrow>About</Eyebrow>
          <h2 id="about-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Strategy and delivery from one person who has done both
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            I’m {site.founder.name}. Over 13+ years I have worked in agencies, in-house and as an agency co-founder,
            always measured on enquiries and client results. Now I work with UK B2B businesses directly.
          </p>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.title} className="bg-white p-5">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
          <ButtonLink to="/about" variant="secondary" className="mt-8 bg-white">
            More about me
          </ButtonLink>
        </div>
        <div className="lg:col-span-5">
          <img
            src={site.founder.portrait}
            alt={`${site.founder.name}, founder of ${site.name}`}
            width={800}
            height={1239}
            loading="lazy"
            className="mx-auto h-auto w-full max-w-xs sm:max-w-sm"
          />
        </div>
      </Container>
    </section>
  )
}
