import { principles } from '../content/principles'
import { FinalCta } from '../components/sections/FinalCta'
import { PageHero } from '../components/sections/PageHero'
import { Placeholder } from '../components/ui/Placeholder'
import { Section } from '../components/ui/Section'
import { SectionHeading } from '../components/ui/SectionHeading'
import { site } from '../config/site'

const audience = [
  { title: 'Sectors', text: 'Manufacturing, engineering, industrial and technical markets, and professional services.' },
  { title: 'Size', text: 'UK SMEs and mid-market businesses, often with a small in-house marketing function or none at all.' },
  { title: 'People', text: 'Owners, managing directors, commercial directors and marketing managers who are accountable for growth.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Strategy and delivery in one place"
        intro={site.positioning}
      />

      <Section labelledBy="why-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading
            id="why-title"
            className="lg:col-span-5"
            eyebrow="Why we work this way"
            title="Good marketing decisions need commercial context and practical follow-through"
          />
          <div className="space-y-5 text-lg leading-relaxed lg:col-span-7">
            <p>
              B2B buying decisions are considered, involve several people and often take months. Marketing that supports
              them needs to be planned around how your buyers research, compare and decide, and around the commercial
              targets your business is working towards.
            </p>
            <p>
              Too often, strategy and execution are separated. A plan is written, then handed to different suppliers for
              SEO, advertising and web development, and the thread is lost. DemandDrive Studio exists to keep those
              pieces together: to set clear priorities, build the work that delivers them, and measure whether it is
              making a difference.
            </p>
            <p>
              We are direct about what we think will work, candid about what we do not know yet, and focused on outcomes
              you can recognise in your pipeline.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cool" labelledBy="principles-title">
        <SectionHeading id="principles-title" eyebrow="Working principles" title="What you can expect from us" />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <li key={p.title} className="bg-white p-6 sm:p-8">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="audience-title">
        <SectionHeading
          id="audience-title"
          eyebrow="Who we work with"
          title="Built for B2B businesses with complex sales"
        />
        <dl className="mt-12 grid gap-8 md:grid-cols-3">
          {audience.map((a) => (
            <div key={a.title} className="border-t-2 border-navy pt-5">
              <dt className="text-lg font-semibold text-navy">{a.title}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{a.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="cool" labelledBy="experience-title">
        <SectionHeading id="experience-title" eyebrow="Experience" title="Background and experience" />
        <div className="mt-8 max-w-3xl">
          <Placeholder block>
            Studio background and relevant experience, to be written by the owner. For example: the sectors and types of
            business you have worked with, and how long you have worked in B2B marketing. Only include details that are
            accurate and can be substantiated. Add founder or team profiles here if you want them published.
          </Placeholder>
        </div>
      </Section>

      <FinalCta />
    </>
  )
}
