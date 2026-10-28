import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'

type FinalCtaProps = {
  title?: string
  text?: string
}

export function FinalCta({
  title = 'Have a growth objective to discuss?',
  text = 'Tell us where things stand and what you would like to achieve. We will give you an honest view of whether, and how, we can help. No obligation and no hard sell.',
}: FinalCtaProps) {
  return (
    <section aria-labelledby="cta-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="on-dark flex flex-col gap-8 rounded-xl bg-navy px-6 py-12 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-16">
          <div className="max-w-2xl">
            <h2 id="cta-title" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-on-navy-muted">{text}</p>
          </div>
          <ButtonLink to="/contact" arrow className="shrink-0 self-start lg:self-center">
            Discuss your goals
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
