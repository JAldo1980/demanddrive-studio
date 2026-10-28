import { posts } from './content/posts'
import { publishedProjects } from './content/work'

/**
 * Page metadata for every route. Used for <head> tags (client and prerender),
 * sitemap.xml and the prerender list. Add new pages here as the site grows.
 */

export type PageMeta = {
  path: string
  title: string
  description: string
  /** Exclude from sitemap and ask search engines not to index. */
  noindex?: boolean
  priority?: number
  /** Articles get article Open Graph tags and Article structured data. */
  article?: { published: string; tags?: string[] }
}

export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'DemandDrive Studio | B2B demand generation and conversion',
    description:
      'DemandDrive Studio is James Alderman, a B2B marketer with 13+ years’ experience helping UK B2B businesses generate better demand and convert more of it through strategy, SEO, landing pages and measurement.',
    priority: 1,
  },
  {
    path: '/work',
    title: 'Work | DemandDrive Studio',
    description:
      'Results from real B2B work, including more than doubling inbound enquiries for an industrial manufacturer, plus client work and concept projects.',
    priority: 0.8,
  },
  ...publishedProjects.map((p) => ({
    path: `/work/${p.slug}`,
    title: `${p.title}${p.kind === 'concept' ? ' (concept)' : ''} | DemandDrive Studio`,
    description: p.summary,
    priority: 0.6,
  })),
  {
    path: '/insights',
    title: 'Insights | DemandDrive Studio',
    description:
      'Practical articles on B2B demand generation, SEO, landing pages, measurement and reporting, by James Alderman.',
    priority: 0.7,
  },
  ...posts.map((p) => ({
    path: `/insights/${p.slug}`,
    title: `${p.title} | DemandDrive Studio`,
    description: p.description,
    priority: 0.6,
    noindex: p.draft,
    article: { published: p.date, tags: p.tags },
  })),
  {
    path: '/free-audit',
    title: 'Free landing page audit | DemandDrive Studio',
    description:
      'Get a free video audit of one landing page and its enquiry tracking, with prioritised fixes, within 5 working days. For UK B2B businesses.',
    priority: 0.8,
  },
  {
    path: '/services',
    title: 'Services | DemandDrive Studio',
    description:
      'B2B growth strategy, SEO, landing pages and conversion optimisation, and measurement: four connected services planned around your commercial goals.',
    priority: 0.9,
  },
  {
    path: '/about',
    title: 'About | DemandDrive Studio',
    description:
      'James Alderman: B2B marketer, former agency co-founder and developer. 13+ years of commercially focused marketing for UK B2B businesses.',
    priority: 0.7,
  },
  {
    path: '/contact',
    title: 'Contact | DemandDrive Studio',
    description:
      'Discuss your B2B marketing and growth objectives with DemandDrive Studio. Send a short enquiry and I will arrange an introductory call.',
    priority: 0.8,
  },
  {
    path: '/privacy',
    title: 'Privacy notice | DemandDrive Studio',
    description: 'How DemandDrive Studio collects and uses personal information.',
    // Draft wording: keep out of search results until it has been reviewed.
    noindex: true,
    priority: 0.2,
  },
]

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: 'Page not found | DemandDrive Studio',
  description: 'The page you were looking for could not be found.',
  noindex: true,
}

export function getPageMeta(pathname: string): PageMeta {
  const normalised = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  return pages.find((p) => p.path === normalised) ?? notFoundMeta
}

export const mainNav = [
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/insights', label: 'Insights' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]
