import type { ReactNode } from 'react'
import { Container } from './Container'

type Tone = 'white' | 'cool' | 'navy'

const tones: Record<Tone, string> = {
  white: 'bg-white',
  cool: 'bg-cool',
  navy: 'on-dark bg-navy text-white [&_h2]:text-white [&_h3]:text-white',
}

type SectionProps = {
  children: ReactNode
  tone?: Tone
  id?: string
  labelledBy?: string
  className?: string
}

export function Section({ children, tone = 'white', id, labelledBy, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-16 sm:py-20 lg:py-28 ${tones[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
