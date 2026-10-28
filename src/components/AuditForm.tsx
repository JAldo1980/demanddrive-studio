import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { AUDIT_FORM_NAME, submitAudit, validateAudit, type AuditErrors, type AuditValues } from '../lib/audit'
import { HONEYPOT_FIELD } from '../lib/enquiry'
import { audit } from '../content/audit'
import { Field, inputClass } from './form/Field'
import { ArrowRight } from './ui/Button'
import { buttonClass } from './ui/buttonStyles'

const initialValues: AuditValues = { name: '', email: '', company: '', url: '', goal: '' }
const fieldOrder: (keyof AuditValues)[] = ['url', 'name', 'email', 'company', 'goal']

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function AuditForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<AuditErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const uid = useId()
  const fieldId = (name: keyof AuditValues) => `${uid}-${name}`

  // Move focus to the confirmation once it has rendered.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  function update(name: keyof AuditValues, value: string) {
    const next = { ...values, [name]: value }
    setValues(next)
    if (submitted) setErrors(validateAudit(next))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    const found = validateAudit(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setStatus('submitting')
    try {
      await submitAudit(values, honeypot)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-line bg-white p-8 sm:p-10">
        <h2 ref={successRef} tabIndex={-1} className="text-2xl font-bold tracking-tight outline-none">
          Thanks, {values.name.trim().split(' ')[0]}. Your audit request is in.
        </h2>
        <p className="mt-3 leading-relaxed">
          I will take a look at the page and email your video walkthrough to{' '}
          <strong className="font-semibold text-navy">{values.email}</strong> within {audit.turnaround}. If I need
          anything else first, I will be in touch.
        </p>
        <Link to="/work" className={buttonClass('secondary', 'mt-8')}>
          See my work in the meantime
        </Link>
      </div>
    )
  }

  const errorEntries = fieldOrder.filter((k) => errors[k]).map((k) => [k, errors[k]!] as const)
  const text = (name: 'name' | 'email' | 'company' | 'url', type: string, autoComplete: string) => (
    <input
      id={fieldId(name)}
      name={name}
      type={type}
      autoComplete={autoComplete}
      value={values[name]}
      onChange={(e) => update(name, e.target.value)}
      aria-invalid={!!errors[name]}
      aria-describedby={
        [name === 'url' ? `${fieldId('url')}-hint` : '', errors[name] ? `${fieldId(name)}-error` : ''].filter(Boolean).join(' ') ||
        undefined
      }
      className={inputClass}
    />
  )

  return (
    <form
      name={AUDIT_FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot={HONEYPOT_FIELD}
      noValidate
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-white p-6 sm:p-8"
    >
      <input type="hidden" name="form-name" value={AUDIT_FORM_NAME} />
      <p hidden>
        <label>
          Leave this field empty
          <input name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </p>

      <h2 id={`${uid}-title`} className="text-2xl font-bold tracking-tight">
        Request your free audit
      </h2>
      <p className="mt-2 text-sm text-muted">All fields are required unless marked optional.</p>

      {submitted && errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby={`${uid}-error-title`}
          className="mt-6 rounded-lg border-2 border-danger bg-white p-5 outline-none"
        >
          <h3 id={`${uid}-error-title`} className="font-semibold text-danger">
            Please check the following
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorEntries.map(([key, message]) => (
              <li key={key}>
                <a href={`#${fieldId(key)}`} className="text-danger underline underline-offset-2">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 grid gap-5">
        <Field id={fieldId('url')} label="Page to audit" hint="The full web address of one landing page or key page." error={errors.url}>
          {text('url', 'url', 'url')}
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={fieldId('name')} label="Your name" error={errors.name}>
            {text('name', 'text', 'name')}
          </Field>
          <Field id={fieldId('email')} label="Work email" error={errors.email}>
            {text('email', 'email', 'email')}
          </Field>
        </div>
        <Field id={fieldId('company')} label="Company" error={errors.company}>
          {text('company', 'text', 'organization')}
        </Field>
        <Field
          id={fieldId('goal')}
          label="What is the page meant to achieve?"
          hint="For example: quote requests, demo bookings or calls with your team."
          optional
        >
          <textarea
            id={fieldId('goal')}
            name="goal"
            rows={3}
            value={values.goal}
            onChange={(e) => update('goal', e.target.value)}
            aria-describedby={`${fieldId('goal')}-hint`}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      {status === 'error' && (
        <div role="alert" className="mt-6 rounded-lg border-2 border-danger bg-white p-5">
          <p className="font-semibold text-danger">Sorry, your request could not be sent.</p>
          <p className="mt-1 text-charcoal">Please check your connection and try again in a moment.</p>
        </div>
      )}

      <button type="submit" disabled={status === 'submitting'} className={buttonClass('primary', 'mt-7 w-full')}>
        {status === 'submitting' ? 'Sending…' : 'Request my free audit'}
        {status !== 'submitting' && <ArrowRight />}
      </button>
      <p className="mt-4 text-center text-sm text-muted">
        Free, with no obligation. See the{' '}
        <Link to="/privacy" className="font-medium text-electric underline underline-offset-2">
          privacy notice
        </Link>
        .
      </p>
    </form>
  )
}
