import { HomeContact } from '../components/home/HomeContact'
import {
  HomeAbout,
  HomeAttract,
  HomeConvert,
  HomeHero,
  HomeImprove,
  HomeInsights,
  HomeMeasure,
  HomeWork,
  StageBar,
} from '../components/home/HomeSections'

/**
 * Homepage: an annotated growth report in four chapters
 * (Attract, Convert, Measure, Improve), then About, Insights and a conversational enquiry form.
 */
export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeAttract />
      <HomeConvert />
      <HomeMeasure />
      <HomeImprove />
      <HomeWork />
      <HomeAbout />
      <HomeInsights />
      <HomeContact />
      <StageBar />
    </>
  )
}
