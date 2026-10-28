export type EnquiryValues = {
  name: string
  email: string
  company: string
  interest: string
  message: string
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>

export const FORM_NAME = 'enquiry'
export const HONEYPOT_FIELD = 'bot-field'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (!values.name.trim()) errors.name = 'Enter your name.'
  if (!values.email.trim()) errors.email = 'Enter your email address.'
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = 'Enter an email address in the correct format, like name@company.co.uk.'
  if (!values.company.trim()) errors.company = 'Enter your company name.'
  if (values.message.trim().length < 20)
    errors.message = values.message.trim()
      ? 'Tell us a little more: at least 20 characters.'
      : 'Tell us briefly what you would like to discuss.'
  return errors
}

/**
 * Submit the enquiry.
 *
 * By default this posts to Netlify Forms (the prerendered contact page contains
 * a matching form that Netlify detects at deploy time). Set VITE_FORM_ENDPOINT
 * to post to a different public form endpoint instead. No secrets are needed or
 * used here.
 */
export async function submitEnquiry(values: EnquiryValues, honeypot: string) {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT

  if (import.meta.env.DEV && !endpoint) {
    // There is no form backend on the Vite dev server. Simulate success so the
    // form states can be tested locally.
    console.info('[dev] Enquiry not sent; no form backend in development.', values)
    await new Promise((resolve) => setTimeout(resolve, 600))
    return
  }

  const body = new URLSearchParams({ 'form-name': FORM_NAME, [HONEYPOT_FIELD]: honeypot, ...values })
  const response = await fetch(endpoint || '/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: body.toString(),
  })
  if (!response.ok) throw new Error(`Enquiry submission failed (${response.status})`)
}
