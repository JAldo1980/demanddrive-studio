import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { services } from '../content/services'
import {
  FORM_NAME,
  HONEYPOT_FIELD,
  submitEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryValues,
} from '../lib/enquiry'
import { Field, inputClass } from './form/Field'
import { ArrowRight } from './ui/Button'
import { buttonClass } from './ui/buttonStyles'

const initialValues: EnquiryValues = { name: '', email: '', company: '', interest: '', message: '' }

const fieldOrder: (keyof EnquiryValues)[] = ['name', 'email', 'company', 'interest', 'message']

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function EnquiryForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const uid = useId()
  const fieldId = (name: keyof EnquiryValues) => `${uid}-${name}`

  // Move focus to the confirmation once it has rendered.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  function update(name: keyof EnquiryValues, value: string) {
    const next = { ...values, [name]: value }
    setValues(next)
    // After the first submit attempt, re-validate as the user corrects fields.
    if (submitted) setErrors(validateEnquiry(next))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
    const found = validateEnquiry(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setStatus('submitting')
    try {
      await submitEnquiry(values, honeypot)
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-lg border border-line bg-cool p-8 sm:p-10">
        <span aria-hidden="true" className="inline-flex size-11 items-center justify-center rounded-full bg-electric text-white">
          <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 10.5l3.5 3.5 7.5-8" />
          </svg>
        </span>
        <h2 ref={successRef} tabIndex={-1} className="mt-5 text-2xl font-bold tracking-tight outline-none">
          Thank you, {values.name.trim().split(' ')[0]}. Your enquiry has been sent.
        </h2>
        <p className="mt-3 max-w-xl leading-relaxed">
          I will read it properly and reply to <strong className="font-semibold text-navy">{values.email}</strong> to
          suggest a time for a short introductory call, or to ask a couple of questions first if that would be more useful.
        </p>
        <Link to="/services" className={buttonClass('secondary', 'mt-8')}>
          Read about my services
        </Link>
      </div>
    )
  }

  const errorEntries = fieldOrder.filter((k) => errors[k]).map((k) => [k, errors[k]!] as const)

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot={HONEYPOT_FIELD}
      noValidate
      onSubmit={onSubmit}
      aria-describedby={`${uid}-required-note`}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p hidden>
        <label>
          Leave this field empty
          <input name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </p>

      {submitted && errorEntries.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby={`${uid}-error-title`}
          className="mb-8 rounded-lg border-2 border-danger bg-white p-5 outline-none"
        >
          <h2 id={`${uid}-error-title`} className="text-lg font-semibold text-danger">
            Please check the following
          </h2>
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

      <p id={`${uid}-required-note`} className="mb-6 text-sm text-muted">
        All fields are required unless marked optional.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fieldId('name')} label="Your name" error={errors.name}>
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${fieldId('name')}-error` : undefined}
            className={inputClass}
          />
        </Field>
        <Field id={fieldId('email')} label="Work email" error={errors.email}>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${fieldId('email')}-error` : undefined}
            className={inputClass}
          />
        </Field>
        <Field id={fieldId('company')} label="Company" error={errors.company}>
          <input
            id={fieldId('company')}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update('company', e.target.value)}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? `${fieldId('company')}-error` : undefined}
            className={inputClass}
          />
        </Field>
        <Field id={fieldId('interest')} label="Main area of interest" optional>
          <select
            id={fieldId('interest')}
            name="interest"
            value={values.interest}
            onChange={(e) => update('interest', e.target.value)}
            className={`${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3E%3Cpath%20d='M4%206l4%204%204-4'%20fill='none'%20stroke='%230B1F3A'%20stroke-width='1.75'/%3E%3C/svg%3E")] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="">Select an option</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </Field>
        <Field
          id={fieldId('message')}
          label="What would you like to discuss?"
          hint="A few sentences on your objectives, current activity or the problem you want to solve."
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id={fieldId('message')}
            name="message"
            rows={6}
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={`${fieldId('message')}-hint${errors.message ? ` ${fieldId('message')}-error` : ''}`}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      {status === 'error' && (
        <div role="alert" className="mt-6 rounded-lg border-2 border-danger bg-white p-5">
          <p className="font-semibold text-danger">Sorry, your enquiry could not be sent.</p>
          <p className="mt-1 text-charcoal">Please check your connection and try again in a moment.</p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <button type="submit" disabled={status === 'submitting'} className={buttonClass('primary')}>
          {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
          {status !== 'submitting' && <ArrowRight />}
        </button>
        <p className="text-sm text-muted">
          I use your details only to respond to your enquiry. See the{' '}
          <Link to="/privacy" className="font-medium text-electric underline underline-offset-2">
            privacy notice
          </Link>
          .
        </p>
      </div>
    </form>
  )
}
