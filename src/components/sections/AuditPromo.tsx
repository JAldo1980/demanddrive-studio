import { audit } from '../../content/audit'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'

/** A compact band promoting the free landing page audit. */
export function AuditPromo() {
  return (
    <section aria-labelledby="audit-promo-title" className="bg-white py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-6 rounded-2xl border-2 border-electric/30 bg-cool p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-electric">Free landing page audit</p>
            <h2 id="audit-promo-title" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Not sure why a page isn’t converting?
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Send me one page. Within {audit.turnaround} you will get a {audit.videoLength} video walkthrough and a
              prioritised list of fixes, free.
            </p>
          </div>
          <ButtonLink to="/free-audit" arrow className="self-start lg:self-center">
            Get a free audit
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
