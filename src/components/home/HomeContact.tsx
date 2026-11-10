import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { site } from '../../config/site'
import { FORM_NAME, HONEYPOT_FIELD, submitEnquiry, validateEnquiry } from '../../lib/enquiry'
import type { EnquiryErrors, EnquiryValues } from '../../lib/enquiry'
import { Arrow } from './icons'

const interests = ['Growth strategy', 'SEO', 'Landing pages', 'Measurement', 'Not sure yet']

const fieldOrder: (keyof EnquiryValues)[] = ['name', 'company', 'email', 'message']

type Status = 'idle' | 'submitting' | 'success' | 'error'

const width = (ch: number) => ({ '--w': `${ch}ch` }) as CSSProperties

/** The homepage enquiry form, written as a sentence. Posts to the same Netlify form as the contact page. */
export function HomeContact() {
  const [values, setValues] = useState({ name: '', company: '', email: '', message: '' })
  const [picked, setPicked] = useState<string[]>([])
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLParagraphElement>(null)

  const all = (): EnquiryValues => ({ ...values, interest: picked.join(', ') })

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  function update(name: 'name' | 'company' | 'email' | 'message', value: string) {
    const next = { ...values, [name]: value }
    setValues(next)
    if (submitted) setErrors(validateEnquiry({ ...next, interest: picked.join(', ') }))
  }

  function toggle(label: string) {
    setPicked(picked.includes(label) ? picked.filter((p) => p !== label) : [...picked, label])
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    const found = validateEnquiry(all())
    setErrors(found)
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setStatus('submitting')
    try {
      await submitEnquiry(all(), honeypot)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const errorEntries = fieldOrder.filter((k) => errors[k]).map((k) => [k, errors[k] ?? ''] as const)
  const invalid = (k: keyof EnquiryValues) => (errors[k] ? true : undefined)

  return (
    <section className="sec tone-paper" id="talk" data-stage="4" style={{ paddingTop: 0 }} aria-labelledby="s-talk">
      <div className="wrap">
        <div className="talk tone-blue grid12">
          <div className="talk__side">
            <p className="eyebrow mono">Get in touch</p>
            <h2 className="d2" id="s-talk">Let’s talk about your growth goals</h2>
            <p style={{ margin: 0, color: 'var(--fg-3)' }}>
              Tell me where things stand and what you would like to achieve. I will give you an honest view of whether, and
              how, I can help.
            </p>
            <ol className="talk__steps">
              <li><b>1</b>Send a short enquiry</li>
              <li><b>2</b>I reply with my view of where to focus</li>
              <li><b>3</b>An introductory call, with no obligation</li>
            </ol>
            {site.contact.email && (
              <a className="la" href={`mailto:${site.contact.email}`} style={{ color: '#fff' }}>
                {site.contact.email}
              </a>
            )}
          </div>

          <div className="talk__form">
            {status === 'success' ? (
              <div className="done" role="status">
                <span className="pill pill--y mono" style={{ alignSelf: 'flex-start' }}>Received</span>
                <p ref={successRef} tabIndex={-1} className="d2" style={{ outline: 'none' }}>
                  Thank you, <span className="hl">{values.name.trim().split(' ')[0]}.</span>
                </p>
                <p style={{ margin: 0, color: 'var(--ink-2)' }}>
                  Your enquiry has been sent. I will read it properly and reply to <strong>{values.email}</strong> to suggest a
                  time for a short introductory call, or to ask a couple of questions first.
                </p>
              </div>
            ) : (
              <form
                name={FORM_NAME}
                method="POST"
                data-netlify="true"
                data-netlify-honeypot={HONEYPOT_FIELD}
                noValidate
                onSubmit={onSubmit}
                aria-label="Enquiry form"
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />
                <input type="hidden" name="interest" value={picked.join(', ')} />
                <p hidden>
                  <label>
                    Leave this field empty
                    <input name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </label>
                </p>

                <p className="sentence">
                  Hi James, I’m{' '}
                  <input
                    id="talk-name"
                    className="inl"
                    style={width(9)}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="your name"
                    aria-label="Your name"
                    aria-invalid={invalid('name')}
                    value={values.name}
                    onChange={(e) => update('name', e.target.value)}
                  />{' '}
                  from{' '}
                  <input
                    id="talk-company"
                    className="inl"
                    style={width(11)}
                    type="text"
                    name="company"
                    autoComplete="organization"
                    placeholder="company"
                    aria-label="Company"
                    aria-invalid={invalid('company')}
                    value={values.company}
                    onChange={(e) => update('company', e.target.value)}
                  />
                  . We’d like help with{' '}
                  <span role="group" aria-label="What would you like help with? (optional)">
                    {interests.map((label) => (
                      <button key={label} className="chipb" type="button" aria-pressed={picked.includes(label)} onClick={() => toggle(label)}>
                        {label}
                      </button>
                    ))}
                  </span>{' '}
                  You can reach me at{' '}
                  <input
                    id="talk-email"
                    className="inl"
                    style={width(15)}
                    type="email"
                    name="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="email address"
                    aria-label="Work email"
                    aria-invalid={invalid('email')}
                    value={values.email}
                    onChange={(e) => update('email', e.target.value)}
                  />
                  .
                </p>

                <label className="mono" htmlFor="talk-message" style={{ display: 'block', marginTop: 22, color: 'var(--ink-3)' }}>
                  Where things stand
                </label>
                <textarea
                  className="talk__msg"
                  id="talk-message"
                  name="message"
                  placeholder="A few sentences on your goals, current activity or the problem you want to solve"
                  aria-invalid={invalid('message')}
                  value={values.message}
                  onChange={(e) => update('message', e.target.value)}
                />

                {submitted && errorEntries.length > 0 && (
                  <div ref={summaryRef} tabIndex={-1} role="alert" className="talk__err" style={{ outline: 'none' }}>
                    <strong>Please check the following</strong>
                    <ul>
                      {errorEntries.map(([key, message]) => (
                        <li key={key}>
                          <a href={`#talk-${key}`}>{message}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {status === 'error' && (
                  <div role="alert" className="talk__err">
                    Sorry, that did not send. Please try again, or email{' '}
                    {site.contact.email ? <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a> : 'me'}.
                  </div>
                )}

                <div className="talk__f">
                  <p>
                    I will only use your details to reply to your enquiry. See the <a href="/privacy">privacy notice</a>.
                  </p>
                  <button className="btn" type="submit" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
                    <span className="btn__i"><Arrow /></span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
