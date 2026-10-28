import type { ReactNode } from 'react'

type SectionHeadingProps = {
  id: string
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  dark?: boolean
  className?: string
}

export function SectionHeading({ id, eyebrow, title, intro, dark = false, className = '' }: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-on-navy-muted' : 'text-muted'}`}>{intro}</p>
      )}
    </div>
  )
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mb-4 flex items-center gap-3 text-sm font-medium ${dark ? 'text-on-navy-muted' : 'text-muted'}`}
    >
      <span aria-hidden="true" className="h-0.5 w-6 bg-electric" />
      {children}
    </p>
  )
}
