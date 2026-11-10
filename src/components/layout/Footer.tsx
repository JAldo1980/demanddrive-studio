import { Link } from 'react-router'
import { site } from '../../config/site'
import { services } from '../../content/services'
import { latestPosts } from '../home/data'
import { Arrow } from '../home/icons'
import { Placeholder } from '../ui/Placeholder'
import { Logo } from './Logo'

const year = new Date().getFullYear()

const shortServiceNames: Record<string, string> = {
  'growth-strategy': 'Growth strategy',
  seo: 'SEO',
  'landing-pages': 'Landing pages',
  measurement: 'Measurement',
}

export function Footer() {
  const { email, location } = site.contact

  return (
    <footer className="ftr tone-ink">
      <div className="wrap">
        <div className="ftr__top">
          <p className="d1">
            Generate better B2B demand. <span className="hl">Convert more of it.</span>
          </p>
          <Link className="btn" to="/contact">
            Discuss a project
            <span className="btn__i"><Arrow /></span>
          </Link>
        </div>

        <div className="grid12 ftr__g">
          <div className="ftr__b">
            <Link className="logo" to="/" aria-label="DemandDrive Studio home">
              <Logo variant="reverse" />
            </Link>
            <p style={{ margin: 0, color: 'var(--fg-2)', maxWidth: '34ch', fontSize: '.95rem' }}>{site.positioning}</p>
            {location && <span className="mono" style={{ color: 'var(--fg-3)' }}>{location}</span>}
          </div>

          <nav className="ftr__c" aria-label="Services">
            <h2 className="ftr__h mono">Services</h2>
            <ul>
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.id}`}>{shortServiceNames[s.id] ?? s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="ftr__c" aria-label="Work">
            <h2 className="ftr__h mono">Work</h2>
            <ul>
              <li><Link to="/work/industrial-coatings-enquiry-growth">Industrial coatings</Link></li>
              <li><Link to="/work/water-treatment-record-month">Water treatment</Link></li>
              <li><Link to="/work/the-circle-line-website">The Circle Line</Link></li>
              <li><Link to="/work">All work</Link></li>
            </ul>
          </nav>

          <nav className="ftr__c" aria-label="Insights">
            <h2 className="ftr__h mono">Insights</h2>
            <ul>
              {latestPosts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/insights/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
              <li><Link to="/insights">All insights</Link></li>
            </ul>
          </nav>

          <nav className="ftr__c" aria-label="Studio">
            <h2 className="ftr__h mono">Studio</h2>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/free-audit">Free audit</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              {email && <li><a href={`mailto:${email}`}>Email</a></li>}
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="me noopener" target="_blank">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="ftr__bot">
          <span>
            © {year} {site.legal.companyName ?? site.name}.{' '}
            {site.legal.companyNumber ? (
              `Registered in England and Wales, no. ${site.legal.companyNumber}.`
            ) : (
              <Placeholder dark>company registration details</Placeholder>
            )}
          </span>
          <span style={{ display: 'flex', gap: 20 }}>
            <Link to="/privacy">Privacy</Link>
            <a href="#main">Back to top ↑</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
