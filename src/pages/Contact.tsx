import { EnquiryForm } from '../components/EnquiryForm'
import { Faq } from '../components/sections/Faq'
import { PageHero } from '../components/sections/PageHero'
import { Container } from '../components/ui/Container'
import { Placeholder } from '../components/ui/Placeholder'
import { site } from '../config/site'

const nextSteps = [
  { title: 'I read your enquiry', text: 'You deal with me directly. No account handlers and no sales script.' },
  { title: 'I’ll reply by email', text: 'If it looks like I can help, I’ll suggest a time for a relaxed introductory chat.' },
  { title: 'An introductory call', text: 'A conversation about your objectives, current activity and constraints. No obligation, no hard sell.' },
]

export default function Contact() {
  const { email, phone, location } = site.contact
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Discuss your goals"
        intro="Tell me a little about your business and what you would like to achieve. The more context you share, the more useful our first conversation will be."
      />
      <section aria-label="Enquiry form and contact details" className="bg-white py-14 sm:py-16 lg:py-20">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>

          <aside className="space-y-8 lg:col-span-5" aria-label="What happens next and contact details">
            <div className="rounded-lg bg-cool p-6 sm:p-8">
              <h2 className="text-xl font-semibold">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold">{s.title}</h3>
                      <p className="mt-1 leading-relaxed text-muted">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-lg border border-line p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  src={site.founder.headshot}
                  alt=""
                  width={64}
                  height={63}
                  className="size-16 rounded-full bg-cool object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">Contact details</h2>
                  <p className="text-sm text-muted">You will be speaking to me, {site.founder.name.split(' ')[0]}.</p>
                </div>
              </div>
              <div className="mt-5 border-t border-line" />
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-sm font-medium text-muted">Email</dt>
                  <dd className="mt-1">
                    {email ? (
                      <a href={`mailto:${email}`} className="font-medium text-electric underline-offset-2 hover:underline">{email}</a>
                    ) : (
                      <Placeholder>confirmed email address</Placeholder>
                    )}
                  </dd>
                </div>
                {phone && (
                  <div>
                    <dt className="text-sm font-medium text-muted">Phone</dt>
                    <dd className="mt-1">
                      <a href={`tel:${phone.replace(/\s/g, '')}`} className="font-medium text-electric underline-offset-2 hover:underline">{phone}</a>
                    </dd>
                  </div>
                )}
                {site.social.map((s) => (
                  <div key={s.href}>
                    <dt className="text-sm font-medium text-muted">{s.label}</dt>
                    <dd className="mt-1">
                      <a href={s.href} target="_blank" rel="me noopener" className="font-medium text-electric underline-offset-2 hover:underline">
                        Connect with James<span className="sr-only"> on {s.label} (opens in a new tab)</span>
                      </a>
                    </dd>
                  </div>
                ))}
                <div>
                  <dt className="text-sm font-medium text-muted">Location</dt>
                  <dd className="mt-1">{location ?? <Placeholder>location or service area</Placeholder>}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </Container>
      </section>
      <Faq tone="cool" />
    </>
  )
}
