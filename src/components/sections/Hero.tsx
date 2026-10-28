import { Link } from 'react-router'
import { site } from '../../config/site'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/SectionHeading'
import { BrowserFrame } from '../visuals/BrowserFrame'
import { LandingMock } from '../visuals/LandingMock'

const notes = [
  { title: 'A specific offer', text: 'Leads with what buyers check first.' },
  { title: 'One next step', text: 'A short form that accepts drawings.' },
  { title: 'Every enquiry tracked', text: 'Source and page recorded.' },
]

const sectors = ['Manufacturing', 'Engineering', 'Industrial and technical', 'Professional services']

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-white">
      <Container className="grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
        <div className="lg:col-span-6 xl:col-span-5">
          <Eyebrow>B2B growth and digital performance</Eyebrow>
          <h1
            id="hero-title"
            className="text-[2.5rem] leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem]"
          >
            Generate better B2B demand. <span className="text-electric">Convert more of it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I help UK B2B businesses turn marketing into enquiries, pipeline and revenue: growth strategy, SEO,
            conversion-focused landing pages and measurement, planned as one system and built hands-on.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink to="/contact" arrow>
              Discuss a project
            </ButtonLink>
            <ButtonLink to="/work" variant="secondary">
              See the work
            </ButtonLink>
          </div>
          <Link to="/about" className="group mt-10 flex items-center gap-4">
            <img
              src={site.founder.headshot}
              alt=""
              width={56}
              height={55}
              className="size-14 rounded-full bg-cool object-cover"
            />
            <span className="text-sm leading-snug">
              <span className="block font-semibold text-navy group-hover:text-electric">{site.founder.name}</span>
              <span className="text-muted">Founder · 13+ years in B2B marketing</span>
            </span>
          </Link>
        </div>

        <figure className="lg:col-span-6 xl:col-span-7">
          <div className="rounded-2xl bg-cool bg-[radial-gradient(circle,rgba(11,31,58,0.09)_1px,transparent_1px)] bg-[size:20px_20px] p-4 sm:p-7 lg:p-9">
            <BrowserFrame
              label="Concept landing page for a precision engineering firm, with a quote request form and drawing upload"
              address="Concept · quote request page"
            >
              <LandingMock />
            </BrowserFrame>
            <ol className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-4">
              {notes.map((n, i) => (
                <li key={n.title} className="flex gap-3 rounded-lg bg-white/80 p-3 sm:block sm:bg-transparent sm:p-0">
                  <span className="text-sm font-semibold text-electric tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="font-semibold text-navy sm:mt-1">{n.title}</p>
                    <p className="text-sm text-muted">{n.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            Concept work by DemandDrive Studio.{' '}
            <Link to="/work/engineering-enquiry-landing-page" className="font-medium text-electric underline-offset-2 hover:underline">
              See the thinking behind it
            </Link>
          </figcaption>
        </figure>
      </Container>

      <div className="border-y border-line bg-cool">
        <Container className="flex flex-col gap-3 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
          <p className="text-sm font-semibold text-navy">For UK B2B businesses in</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal">
            {sectors.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-electric" />
                {s}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
}
