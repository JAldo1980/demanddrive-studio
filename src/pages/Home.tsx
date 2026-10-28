import { AboutTeaser } from '../components/sections/AboutTeaser'
import { Approach } from '../components/sections/Approach'
import { CaseStudies } from '../components/sections/CaseStudies'
import { Challenges } from '../components/sections/Challenges'
import { FinalCta } from '../components/sections/FinalCta'
import { Hero } from '../components/sections/Hero'
import { ServicesOverview } from '../components/sections/ServicesOverview'

export default function Home() {
  return (
    <>
      <Hero />
      <Challenges />
      <ServicesOverview />
      <Approach />
      <CaseStudies />
      <AboutTeaser />
      <FinalCta />
    </>
  )
}
