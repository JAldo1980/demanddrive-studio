import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'

const steps = ['Send a short enquiry', 'We reply with our view of where to focus', 'An introductory call, with no obligation']

type FinalCtaProps = {
  title?: string
  text?: string
}

export function FinalCta({
  title = 'Let’s talk about your growth goals',
  text = 'Tell us where things stand and what you would like to achieve. We will give you an honest view of whether, and how, we can help.',
}: FinalCtaProps) {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="on-dark grid gap-10 rounded-2xl bg-navy px-6 py-12 sm:px-10 lg:grid-cols-12 lg:items-center lg:px-14 lg:py-16">
          <div className="lg:col-span-7">
            <h2 id="cta-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-on-navy-muted">{text}</p>
            <ButtonLink to="/contact" arrow className="mt-8">
              Discuss a project
            </ButtonLink>
          </div>
          <div className="lg:col-span-5">
            <h3 className="text-sm font-semibold text-on-navy-muted">What happens next</h3>
            <ol className="mt-4 space-y-3">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-4 rounded-lg border border-line-dark p-4 text-white">
                  <span
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-electric text-sm font-bold"
                  >
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
