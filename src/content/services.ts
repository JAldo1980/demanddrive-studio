export type Service = {
  id: string
  title: string
  /** One-line summary used on cards. */
  summary: string
  /** The business reason for the service. */
  purpose: string
  includes: string[]
  /** How this service connects to the others. */
  connects: string
}

export const services: Service[] = [
  {
    id: 'growth-strategy',
    title: 'B2B growth strategy',
    summary: 'Decide where to compete, who to reach and which activity deserves budget.',
    purpose:
      'Gives every channel a clear brief. We review your markets, buyers, sales process and current marketing, then set priorities that link marketing activity to pipeline and commercial targets.',
    includes: [
      'Market, audience and competitor review',
      'Positioning and messaging priorities',
      'Channel and budget recommendations',
      'A prioritised, practical action plan',
    ],
    connects: 'Sets the direction and success measures the other three services work to.',
  },
  {
    id: 'seo',
    title: 'SEO and organic visibility',
    summary: 'Be found by buyers who are researching the problems you solve.',
    purpose:
      'Technical and industrial buyers research thoroughly before they make contact. We improve how your site is structured, written and maintained so it appears for searches that signal genuine commercial intent, not just traffic for its own sake.',
    includes: [
      'Technical SEO audit and fixes',
      'Keyword and search-intent research',
      'Service, product and sector page content',
      'On-page optimisation and internal linking',
    ],
    connects: 'Builds long-term demand that landing pages convert and measurement attributes.',
  },
  {
    id: 'landing-pages',
    title: 'Landing pages and conversion optimisation',
    summary: 'Make it easier for interested prospects to take the next step.',
    purpose:
      'Traffic is only useful when visitors understand your offer and can act on it. We design and build fast, focused landing pages, and improve existing pages using evidence from analytics and user behaviour.',
    includes: [
      'Landing page design and development',
      'Conversion reviews of existing pages',
      'Form and enquiry-journey improvements',
      'Structured testing where traffic allows',
    ],
    connects: 'Turns the visibility from SEO into enquiries your team can follow up.',
  },
  {
    id: 'measurement',
    title: 'Measurement and performance insight',
    summary: 'Know what is working, and what to change next.',
    purpose:
      'Decisions are only as good as the data behind them. We set up tracking you can trust, connect marketing data to enquiries and pipeline where your systems allow, and report in plain English with clear recommendations.',
    includes: [
      'Analytics and conversion tracking set-up',
      'CRM and enquiry attribution',
      'Focused reporting dashboards',
      'Regular performance reviews',
    ],
    connects: 'Shows which activity contributes to pipeline, and feeds the next round of priorities.',
  },
]

export function serviceTitles(ids: string[]) {
  return ids.map((id) => services.find((s) => s.id === id)?.title).filter((t): t is string => !!t)
}
