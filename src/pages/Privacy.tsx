import { Link } from 'react-router'
import { PageHero } from '../components/sections/PageHero'
import { Container } from '../components/ui/Container'
import { Placeholder } from '../components/ui/Placeholder'
import { site } from '../config/site'

/**
 * DRAFT privacy notice. This is starting wording only and must be reviewed by
 * someone qualified to advise on UK GDPR before the site goes live.
 */
export default function Privacy() {
  const controller = site.legal.companyName ?? site.name
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy notice">
        <div role="note" className="mt-8 rounded-lg border-2 border-dashed border-muted/60 bg-cool p-5">
          <p className="font-semibold text-navy">Draft: requires review before publication</p>
          <p className="mt-1 text-muted">
            This notice is placeholder wording and has not been legally reviewed. It must be checked and completed by
            the business owner, with appropriate professional advice, before the website goes live.
          </p>
        </div>
      </PageHero>

      <section aria-label="Privacy notice" className="bg-white py-14 sm:py-16">
        <Container>
          <div className="max-w-3xl space-y-10 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            <div>
              <h2>Who we are</h2>
              <p>
                This website is operated by {controller}, which is the data controller for personal information collected
                through it.
              </p>
              <p>
                {site.legal.registeredAddress ? (
                  <>Registered address: {site.legal.registeredAddress}.</>
                ) : (
                  <Placeholder>registered company name, number and address</Placeholder>
                )}{' '}
                {site.contact.email ? (
                  <>
                    Contact for privacy questions: <a href={`mailto:${site.contact.email}`} className="text-electric underline">{site.contact.email}</a>.
                  </>
                ) : (
                  <Placeholder>privacy contact email</Placeholder>
                )}
              </p>
            </div>

            <div>
              <h2>Information we collect</h2>
              <p>
                When you send an enquiry through our <Link to="/contact" className="text-electric underline">contact form</Link>,
                we collect the details you provide: your name, work email address, company, area of interest and message.
              </p>
              <p>
                When you request a <Link to="/free-audit" className="text-electric underline">free landing page audit</Link>,
                we collect your name, work email address, company, the web address of the page to review and, if you
                provide it, what the page is meant to achieve.
              </p>
              <p>We do not currently use analytics, advertising or tracking cookies on this website.</p>
            </div>

            <div>
              <h2>How we use it</h2>
              <ul>
                <li>To reply to your enquiry and arrange a conversation if you have asked for one.</li>
                <li>To carry out and send you a free audit you have requested.</li>
                <li>To keep a record of our correspondence with you.</li>
              </ul>
              <p>
                Our lawful basis is our legitimate interest in responding to business enquiries.{' '}
                <Placeholder>confirm lawful basis</Placeholder>
              </p>
            </div>

            <div>
              <h2>Who we share it with</h2>
              <p>
                Form submissions are processed and stored by our website hosting provider.{' '}
                <Placeholder>name hosting/form provider, e.g. Netlify, and any CRM or email tools used</Placeholder>
              </p>
              <p>We do not sell your personal information.</p>
            </div>

            <div>
              <h2>How long we keep it</h2>
              <p>
                <Placeholder>retention period for enquiries</Placeholder>
              </p>
            </div>

            <div>
              <h2>Your rights</h2>
              <p>
                Under UK data protection law you have rights including access to, correction of and deletion of your
                personal information, and the right to object to its use. To exercise them, contact us using the details
                above. You also have the right to complain to the Information Commissioner’s Office (ico.org.uk).
              </p>
            </div>

            <div>
              <h2>Changes to this notice</h2>
              <p>
                Last updated: <Placeholder>date</Placeholder>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
