import type { ReactNode } from 'react'

export const inputClass =
  'mt-2 block w-full rounded-md border bg-white px-4 py-3 text-base text-charcoal placeholder:text-muted/70 transition-colors focus:border-electric focus-visible:outline-offset-0 aria-[invalid=true]:border-danger'

type FieldProps = {
  id: string
  label: string
  hint?: string
  error?: string
  optional?: boolean
  className?: string
  children: ReactNode
}

export function Field({ id, label, hint, error, optional, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-medium text-navy">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger">
          <span aria-hidden="true">!</span>
          {error}
        </p>
      )}
    </div>
  )
}
