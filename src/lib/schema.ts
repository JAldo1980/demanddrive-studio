import { site } from '../config/site'
import { qualifications } from '../content/about'
import { audit } from '../content/audit'
import { faqsByPath } from '../content/faqs'
import { getPost } from '../content/posts'
import { services } from '../content/services'
import { getProject } from '../content/work'
import type { PageMeta } from '../routes'

/**
 * Schema.org structured data for every page, as one connected JSON-LD graph.
 * Shared entities (business, website, founder) are referenced by @id.
 */

type Node = Record<string, unknown>

const sectionLabels: Record<string, string> = {
  work: 'Work',
  insights: 'Insights',
  services: 'Services',
  about: 'About',
  contact: 'Contact',
  privacy: 'Privacy notice',
  'free-audit': 'Free landing page audit',
}

const ids = {
  org: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  person: `${site.url}/#james-alderman`,
  audit: `${site.url}/free-audit#service`,
}

const pageUrl = (path: string) => site.url + (path === '/' ? '/' : path)
const plainTitle = (meta: PageMeta) => meta.title.replace(/ \| DemandDrive Studio$/, '').replace(/ \(concept\)$/, '')

function organization(): Node {
  const location = site.contact.location?.split(',')[0]
  return {
    '@type': 'ProfessionalService',
    '@id': ids.org,
    name: site.name,
    description: site.positioning,
    slogan: site.tagline,
    url: `${site.url}/`,
    logo: { '@type': 'ImageObject', url: `${site.url}/apple-touch-icon.png`, width: 180, height: 180 },
    image: `${site.url}/og-image.png`,
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
    founder: { '@id': ids.person },
    ...(location ? { address: { '@type': 'PostalAddress', addressLocality: location, addressCountry: 'GB' } } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
    knowsAbout: ['B2B marketing', 'Demand generation', 'SEO', 'Conversion rate optimisation', 'Landing pages', 'Marketing analytics', 'HubSpot'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'B2B growth services',
      itemListElement: [
        ...services.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', '@id': `${site.url}/services#${s.id}`, name: s.title },
        })),
        { '@type': 'Offer', price: '0', priceCurrency: 'GBP', itemOffered: { '@id': ids.audit } },
      ],
    },
  }
}

function website(): Node {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    name: site.name,
    url: `${site.url}/`,
    inLanguage: 'en-GB',
    publisher: { '@id': ids.org },
  }
}

function person(): Node {
  const linkedIn = site.social.find((s) => s.label === 'LinkedIn')
  return {
    '@type': 'Person',
    '@id': ids.person,
    name: site.founder.name,
    jobTitle: site.founder.role,
    url: `${site.url}/about`,
    image: `${site.url}${site.founder.portrait}`,
    worksFor: { '@id': ids.org },
    ...(linkedIn ? { sameAs: [linkedIn.href] } : {}),
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Leeds' },
    hasCredential: qualifications.map((q) => ({ '@type': 'EducationalOccupationalCredential', name: q })),
    knowsAbout: ['B2B marketing strategy', 'Lead and demand generation', 'HubSpot CRM', 'SEO', 'Web development', 'Conversion rate optimisation'],
  }
}

function breadcrumbs(meta: PageMeta): Node | null {
  const parts = meta.path.split('/').filter(Boolean)
  if (parts.length === 0 || meta.path === '/404') return null
  const items = [{ name: 'Home', url: `${site.url}/` }]
  parts.forEach((part, i) => {
    const path = `/${parts.slice(0, i + 1).join('/')}`
    const last = i === parts.length - 1
    items.push({ name: last && i > 0 ? plainTitle(meta) : (sectionLabels[part] ?? plainTitle(meta)), url: pageUrl(path) })
  })
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl(meta.path)}#breadcrumb`,
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
  }
}

function pageType(meta: PageMeta): string | string[] {
  if (meta.path === '/about') return 'ProfilePage'
  if (meta.path === '/contact') return 'ContactPage'
  if (meta.path === '/work' || meta.path === '/insights') return 'CollectionPage'
  if (faqsByPath[meta.path]) return ['WebPage', 'FAQPage']
  return 'WebPage'
}

export function structuredData(meta: PageMeta) {
  const url = pageUrl(meta.path)
  const crumb = breadcrumbs(meta)
  const faqs = faqsByPath[meta.path]
  const graph: Node[] = [organization(), website(), person()]

  graph.push({
    '@type': pageType(meta),
    '@id': `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: 'en-GB',
    isPartOf: { '@id': ids.website },
    about: { '@id': ids.org },
    ...(crumb ? { breadcrumb: { '@id': crumb['@id'] } } : {}),
    ...(meta.path === '/about' ? { mainEntity: { '@id': ids.person } } : {}),
    ...(faqs
      ? {
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : {}),
  })
  if (crumb) graph.push(crumb)

  if (meta.path === '/services') {
    for (const s of services) {
      graph.push({
        '@type': 'Service',
        '@id': `${site.url}/services#${s.id}`,
        name: s.title,
        description: `${s.summary} ${s.purpose}`,
        serviceType: s.title,
        provider: { '@id': ids.org },
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        audience: { '@type': 'BusinessAudience', name: 'UK B2B SMEs and mid-market businesses' },
      })
    }
  }

  if (meta.path === '/free-audit') {
    graph.push({
      '@type': 'Service',
      '@id': ids.audit,
      name: 'Free landing page audit',
      description: `A ${audit.videoLength} video walkthrough of one landing page and its enquiry tracking, with prioritised fixes, delivered within ${audit.turnaround}.`,
      serviceType: 'Landing page audit',
      provider: { '@id': ids.org },
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
      audience: { '@type': 'BusinessAudience', name: 'UK B2B businesses' },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'GBP',
        url,
        eligibleRegion: { '@type': 'Country', name: 'United Kingdom' },
        availability: 'https://schema.org/LimitedAvailability',
      },
    })
  }

  const post = meta.path.startsWith('/insights/') ? getPost(meta.path.split('/')[2]) : undefined
  if (post) {
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      image: `${site.url}/og-image.png`,
      author: { '@id': ids.person },
      publisher: { '@id': ids.org },
      mainEntityOfPage: { '@id': `${url}#webpage` },
      inLanguage: 'en-GB',
      wordCount: post.readingMinutes * 220,
      ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
    })
  }

  const project = meta.path.startsWith('/work/') ? getProject(meta.path.split('/')[2]) : undefined
  if (project) {
    graph.push({
      '@type': 'CreativeWork',
      '@id': `${url}#case-study`,
      name: project.title,
      description: project.summary,
      genre: project.kind === 'concept' ? 'Concept project' : 'Case study',
      creator: { '@id': ids.person },
      publisher: { '@id': ids.org },
      mainEntityOfPage: { '@id': `${url}#webpage` },
      inLanguage: 'en-GB',
      about: project.sector,
      ...(project.screenshot ? { image: `${site.url}${project.screenshot.src}` } : {}),
      ...(project.liveUrl ? { url: project.liveUrl } : {}),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
