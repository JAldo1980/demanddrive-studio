import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { buttonClass, type Variant } from './buttonStyles'

type ButtonLinkProps = {
  to: string
  children: ReactNode
  variant?: Variant
  className?: string
  arrow?: boolean
}

export function ButtonLink({ to, children, variant = 'primary', className, arrow = false }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClass(variant, className)}>
      {children}
      {arrow && <ArrowRight />}
    </Link>
  )
}

export function ArrowRight({ className = 'size-4' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
