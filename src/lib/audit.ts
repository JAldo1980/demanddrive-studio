import { EMAIL_PATTERN, submitForm } from './enquiry'

export const AUDIT_FORM_NAME = 'audit'

export type AuditValues = {
  name: string
  email: string
  company: string
  url: string
  goal: string
}

export type AuditErrors = Partial<Record<keyof AuditValues, string>>

/** Accepts "example.co.uk/page" as well as full URLs; returns null if unusable. */
export function normaliseUrl(input: string) {
  const trimmed = input.trim()
  if (!trimmed) return null
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`)
    return url.hostname.includes('.') ? url.toString() : null
  } catch {
    return null
  }
}

export function validateAudit(values: AuditValues): AuditErrors {
  const errors: AuditErrors = {}
  if (!values.name.trim()) errors.name = 'Enter your name.'
  if (!values.email.trim()) errors.email = 'Enter your email address.'
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = 'Enter an email address in the correct format, like name@company.co.uk.'
  if (!values.company.trim()) errors.company = 'Enter your company name.'
  if (!values.url.trim()) errors.url = 'Enter the address of the page you would like audited.'
  else if (!normaliseUrl(values.url)) errors.url = 'Enter a web address in the correct format, like yourcompany.co.uk/services.'
  return errors
}

export function submitAudit(values: AuditValues, honeypot: string) {
  return submitForm(AUDIT_FORM_NAME, { ...values, url: normaliseUrl(values.url) ?? values.url }, honeypot)
}
