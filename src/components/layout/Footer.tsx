import { Link } from 'react-router'
import { site } from '../../config/site'
import { mainNav } from '../../routes'
import { services } from '../../content/services'
import { Container } from '../ui/Container'
import { Placeholder } from '../ui/Placeholder'
import { Logo } from './Logo'

const year = new Date().getFullYear()

const linkClass = 'text-on-navy-muted transition-colors hover:text-white'

export function Footer() {
  const { email, phone, location } = site.contact

  return (
    <footer className="on-dark bg-navy text-white">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" aria-label="DemandDrive Studio home" className="inline-block">
              <Logo variant="reverse" className="h-14 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-on-navy-muted">{site.positioning}</p>
          </div>

          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="text-sm font-semibold text-white">Studio</h2>
              <ul className="mt-4 space-y-3">
                <li><Link to="/" className={linkClass}>Home</Link></li>
                {mainNav.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className={linkClass}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">Services</h2>
              <ul className="mt-4 space-y-3">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link to={`/services#${s.id}`} className={linkClass}>{s.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">Contact</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  {email ? (
                    <a href={`mailto:${email}`} className={linkClass}>{email}</a>
                  ) : (
                    <Placeholder dark>email address</Placeholder>
                  )}
                </li>
                {phone && (
                  <li>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className={linkClass}>{phone}</a>
                  </li>
                )}
                <li>
                  {location ? <span className="text-on-navy-muted">{location}</span> : <Placeholder dark>location</Placeholder>}
                </li>
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} className={linkClass} rel="me noopener" target="_blank">
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line-dark pt-8 text-sm text-on-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legal.companyName ?? site.name}.{' '}
            {site.legal.companyNumber ? `Registered in England and Wales, no. ${site.legal.companyNumber}.` : <Placeholder dark>company registration details</Placeholder>}
          </p>
          <Link to="/privacy" className={linkClass}>Privacy notice</Link>
        </div>
      </Container>
    </footer>
  )
}
