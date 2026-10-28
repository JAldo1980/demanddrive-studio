import { ButtonLink } from '../components/ui/Button'
import { PageHero } from '../components/sections/PageHero'

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="Page not found"
      intro="The page you were looking for has moved or does not exist."
    >
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink to="/">Go to the homepage</ButtonLink>
        <ButtonLink to="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </PageHero>
  )
}
