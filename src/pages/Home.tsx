import { AboutTeaser } from '../components/sections/AboutTeaser'
import { Approach } from '../components/sections/Approach'
import { Challenges } from '../components/sections/Challenges'
import { Faq } from '../components/sections/Faq'
import { FinalCta } from '../components/sections/FinalCta'
import { GrowthSystem } from '../components/sections/GrowthSystem'
import { Hero } from '../components/sections/Hero'
import { Testimonials } from '../components/sections/Testimonials'
import { TrackRecord } from '../components/sections/TrackRecord'
import { WorkShowcase } from '../components/sections/WorkShowcase'

export default function Home() {
  return (
    <>
      <Hero />
      <TrackRecord />
      <WorkShowcase />
      <Testimonials />
      <Challenges />
      <GrowthSystem />
      <Approach />
      <AboutTeaser />
      <Faq />
      <FinalCta />
    </>
  )
}
