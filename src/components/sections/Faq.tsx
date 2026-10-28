import { faqs as generalFaqs, type Faq as FaqItem } from '../../content/faqs'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

type FaqProps = {
  items?: FaqItem[]
  title?: string
  intro?: string
  tone?: 'white' | 'cool'
}

export function Faq({
  items = generalFaqs,
  title = 'Before you get in touch',
  intro = 'Straight answers to the questions I am asked most often.',
  tone = 'white',
}: FaqProps) {
  return (
    <Section tone={tone} labelledBy="faq-title">
      <div className="grid gap-10 lg:grid-cols-12">
        <SectionHeading
          id="faq-title"
          className="lg:col-span-4"
          eyebrow="Questions"
          title={title}
          intro={intro}
        />
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {items.map((f) => (
            <details key={f.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-navy hover:text-electric [&::-webkit-details-marker]:hidden">
                {f.question}
                <span
                  aria-hidden="true"
                  className="relative size-5 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:bg-current after:transition-transform group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
