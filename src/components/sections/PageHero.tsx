import type { ReactNode } from 'react'
import { Container } from '../ui/Container'
import { Eyebrow } from '../ui/SectionHeading'

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
}

export function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="border-b border-line bg-white">
      <Container className="py-14 sm:py-18 lg:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id="page-title" className="text-4xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {intro && <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">{intro}</p>}
          {children}
        </div>
      </Container>
    </section>
  )
}
