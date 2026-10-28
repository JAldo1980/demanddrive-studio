/**
 * Business details for DemandDrive Studio.
 *
 * Anything set to `null` has not been confirmed by the owner. The site renders
 * a clearly labelled placeholder (or omits the item) until a real value is
 * supplied. Do not fill these with guessed or example values.
 */

export type SocialLink = { label: string; href: string }

export const site = {
  name: 'DemandDrive Studio',
  tagline: 'Strategy that creates demand. Digital that drives growth.',
  positioning:
    'A B2B growth studio combining strategy, digital marketing and conversion-focused web experiences to help businesses generate better demand.',

  /** Absolute site URL used for canonical, Open Graph and sitemap URLs. */
  url: (import.meta.env.VITE_SITE_URL || 'https://www.example.com').replace(/\/$/, ''),

  founder: {
    name: 'James Alderman',
    role: 'Founder, B2B marketer and developer',
    portrait: '/images/james-alderman-portrait.webp',
    headshot: '/images/james-alderman-headshot.webp',
  },

  contact: {
    email: 'james_codes@icloud.com' as string | null,
    /** Optional. Leave null to hide the phone number everywhere. */
    phone: null as string | null,
    /** Town/city or full address, as the owner wants it shown publicly. */
    location: 'Stafford, UK' as string | null,
  },

  /** Registered company details for the footer and privacy notice. */
  legal: {
    companyName: null as string | null,
    companyNumber: null as string | null,
    registeredAddress: null as string | null,
  },

  /** Only add profiles the owner has supplied. Empty means none are shown. */
  social: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/jamespalderman/' }] as SocialLink[],
}

export const siteUrlIsPlaceholder = site.url === 'https://www.example.com'
