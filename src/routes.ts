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
}

export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'DemandDrive Studio | B2B demand generation and conversion',
    description:
      'DemandDrive Studio helps UK B2B businesses generate better demand and convert more of it, combining growth strategy, SEO, landing pages and measurement.',
    priority: 1,
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
      'How DemandDrive Studio works: commercially minded strategy, clear communication and hands-on delivery for UK B2B businesses.',
    priority: 0.7,
  },
  {
    path: '/contact',
    title: 'Contact | DemandDrive Studio',
    description:
      'Discuss your B2B marketing and growth objectives with DemandDrive Studio. Send a short enquiry and we will arrange an introductory call.',
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
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]
