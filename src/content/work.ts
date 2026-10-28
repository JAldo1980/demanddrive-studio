/**
 * Work: proof of how James approaches B2B growth problems.
 *
 * - `experience`: real results from James's previous roles (agency and
 *   in-house), anonymised as in his published materials. Not DemandDrive
 *   Studio clients, and always labelled "Previous role".
 * - `client`: real client work, published with the client's agreement.
 * - `concept`: realistic briefs worked through to show thinking. Never shows
 *   results.
 *
 * Only publish figures and quotes that can be substantiated.
 */

export type Preview = 'landing' | 'redesign' | 'audit' | 'enquiries' | 'record' | 'gtm'

export type ProjectKind = 'experience' | 'client' | 'concept'

export type Project = {
  slug: string
  kind: ProjectKind
  title: string
  /** Who the work was for. Anonymise unless the client agreed to be named. */
  client: string
  sector: string
  summary: string
  problem: string
  approach: string[]
  deliverables: string[]
  /** Concepts: what would be measured. Otherwise: what was measured. */
  measures?: string[]
  /** Real work only: an approved, verifiable outcome. */
  outcome?: string
  /** Headline figures for real work, shown on cards and project pages. */
  stats?: { value: string; label: string }[]
  /** Service ids from src/content/services.ts. */
  services: string[]
  /** Omit to show a plain text panel instead of a mock-up. */
  preview?: Preview
  /** A real screenshot of the finished work. Takes priority over `preview`. */
  screenshot?: { src: string; width: number; height: number; alt: string }
  liveUrl?: string
  approved: boolean
}

export const kindLabels: Record<ProjectKind, string> = {
  experience: 'Previous role',
  client: 'Client work',
  concept: 'Concept project',
}

export const projects: Project[] = [
  {
    slug: 'industrial-coatings-enquiry-growth',
    kind: 'experience',
    title: 'More than doubling inbound enquiries for an industrial coatings manufacturer',
    client: 'A UK industrial coatings manufacturer',
    sector: 'Manufacturing',
    summary:
      'Inbound enquiries rose from an average of 10.7 a month to 24 and then 30, within 2.5 months of launching website and SEO changes.',
    problem:
      'Under its previous agency, the manufacturer averaged 10.7 inbound sales enquiries a month. The aim was to grow inbound enquiries and show the board a clear return on the work.',
    approach: [
      'Redesigned the company website.',
      'Carried out technical SEO improvements.',
      'Ran paid search and LinkedIn activity alongside the organic work.',
      'Tracked every website enquiry in HubSpot against monthly lead targets, and reported to the board on enquiries, quotes and jobs won.',
    ],
    deliverables: ['Website redesign', 'Technical SEO', 'Paid media and LinkedIn', 'HubSpot enquiry tracking and board reporting'],
    measures: ['Inbound enquiries per month', 'Enquiries that went to quote', 'Jobs won'],
    outcome:
      'Enquiries reached 24 in May and 30 in June, against a previous average of 10.7. In May all 24 enquiries went to quote and at least 3 were won; in June 28 of 30 were quoted and at least 4 were won. On the strength of the return reported to the board, the client increased the monthly retainer from 20 to 30 hours.',
    stats: [
      { value: '2.2×', label: 'inbound enquiries within 2.5 months' },
      { value: '24/24', label: 'May enquiries went to quote' },
      { value: '+50%', label: 'retainer, approved by the board' },
    ],
    services: ['landing-pages', 'seo', 'measurement'],
    preview: 'enquiries',
    approved: true,
  },
  {
    slug: 'water-treatment-record-month',
    kind: 'experience',
    title: 'A record month for an industrial water treatment specialist',
    client: 'A UK industrial water treatment specialist',
    sector: 'Industrial and technical markets',
    summary:
      'Service-page SEO, local search and new content delivered the client’s best month on record: 21 form submissions and 16 qualified leads.',
    problem:
      'The brief was to scale inbound lead generation towards 20 qualified enquiries a month, with campaigns and SEO structured directly against the client’s master brief.',
    approach: [
      'Built a lead generation strategy around the client’s master brief and monthly target.',
      'Improved SEO across the site’s service pages.',
      'Strengthened local SEO and the Google Business Profile.',
      'Created and published new content targeting priority services.',
    ],
    deliverables: ['Lead generation strategy', 'Sitewide and local SEO', 'Google Business Profile optimisation', 'Content'],
    measures: ['Form submissions', 'Unique qualified leads', 'Progress against the 20-a-month target'],
    outcome:
      'In September, after the SEO recommendations and content went live, the site produced 21 form submissions and 16 unique qualified leads. The client flagged it as their most successful period to date. The target of 20 qualified leads a month had not yet been reached.',
    stats: [
      { value: '21', label: 'form submissions in the month' },
      { value: '16', label: 'unique qualified leads' },
    ],
    services: ['seo', 'growth-strategy'],
    preview: 'record',
    approved: true,
  },
  {
    slug: 'the-circle-line-website',
    kind: 'client',
    title: 'A calm, credible website for a leadership psychology consultancy',
    client: 'The Circle Line',
    sector: 'Professional services',
    summary:
      'A React website senior clients can trust on sight, with a clear route in for individuals and for businesses.',
    problem:
      'The Circle Line uses psychology to help leaders and teams perform. Senior clients needed to trust the website on sight, so it had to look as considered as the service: quiet, premium and uncluttered. Two audiences, individuals and businesses, each needed a clear path from the first screen, and the site had to be easy to extend.',
    approach: [
      'Built the site in React and TypeScript, from component structure to finished interface.',
      'Gave individuals and businesses their own clear route from the first screen.',
      'Created reusable, typed components so new pages and sections slot in without rework.',
      'Delivered a fully responsive layout.',
    ],
    deliverables: ['Website build in React and TypeScript', 'Reusable component system', 'Responsive interface'],
    services: ['landing-pages'],
    screenshot: {
      src: '/images/work/the-circle-line-home.webp',
      width: 1440,
      height: 900,
      alt: 'The Circle Line homepage: “Leaders, de-risked.” over a full-width image, with navigation and an Enquire button',
    },
    liveUrl: 'https://thecircleline.co.uk',
    approved: true,
  },
  {
    slug: 'engineering-new-sector-go-to-market',
    kind: 'experience',
    title: 'Opening a new sector for a defence-focused engineering manufacturer',
    client: 'A UK engineering manufacturer',
    sector: 'Engineering',
    summary:
      'Reshaping the go-to-market to reach design and R&D houses, reducing reliance on a single sector.',
    problem:
      'The manufacturer’s pipeline leaned heavily on one sector: defence. That works while it lasts, but it is a risk to growth. Buying journeys were technical, long and involved several stakeholders, and a high-potential new audience, design and R&D houses, did not yet know the brand.',
    approach: [
      'Positioned the business for a new audience: design and R&D teams.',
      'Created sector content and landing pages addressing their questions.',
      'Ran campaigns aimed at those teams.',
      'Set KPIs tied to growth in the new sector, rather than vanity metrics.',
    ],
    deliverables: ['Audience positioning', 'Sector content', 'Landing pages', 'Campaigns and sector KPIs'],
    measures: ['Enquiries and pipeline from the new sector'],
    services: ['growth-strategy', 'landing-pages'],
    preview: 'gtm',
    approved: true,
  },
  {
    slug: 'industrial-supplier-website-redesign',
    kind: 'concept',
    title: 'Navigation and conversion redesign for an industrial supplier',
    client: 'A UK industrial components supplier',
    sector: 'Industrial and technical markets',
    summary:
      'Restructuring a product-led website around the sectors and applications buyers actually search by.',
    problem:
      'The website is organised like an internal product catalogue. Buyers who think in terms of their industry or application struggle to find relevant products, sector pages do not exist for search engines to rank, and every page ends with the same generic contact link.',
    approach: [
      'Restructure navigation by industry and application, with products as the third route in.',
      'Create sector pages that answer the questions each type of buyer asks.',
      'Give product pages a clear specification summary and a relevant next step, such as a datasheet or pricing request.',
      'Plan redirects and on-page SEO so existing search visibility is protected during the change.',
    ],
    deliverables: [
      'Information architecture and sitemap',
      'Navigation and page wireframes',
      'Sector, product and enquiry page templates',
      'SEO migration and redirect plan',
    ],
    measures: [
      'Organic entrances to sector and application pages',
      'Enquiries from product and sector pages',
      'Search visibility for priority sector terms',
    ],
    services: ['seo', 'landing-pages', 'growth-strategy'],
    preview: 'redesign',
    approved: true,
  },
  {
    slug: 'engineering-enquiry-landing-page',
    kind: 'concept',
    title: 'An enquiry-focused landing page for a precision engineering firm',
    client: 'A UK precision engineering manufacturer',
    sector: 'Manufacturing and engineering',
    summary:
      'Turning a generic capabilities page into a focused route for engineers and buyers to request a quote.',
    problem:
      'Technical buyers arrive looking for specific capabilities, tolerances and materials, but the page leads with company history. The quote request form is buried at the bottom, asks for eleven fields and cannot accept drawings, so serious enquiries arrive by email with no record of where they came from.',
    approach: [
      'Lead with what buyers check first: capabilities, materials, tolerances and the industries served.',
      'Make one next step obvious: request a quote, with the option to upload drawings in common formats.',
      'Cut the form to the details needed to respond, and explain what happens after sending.',
      'Track form starts, completions and the source of each enquiry.',
    ],
    deliverables: [
      'Page structure and messaging hierarchy',
      'Responsive page design',
      'Build, including the quote form and file upload',
      'Conversion tracking plan and set-up',
    ],
    measures: [
      'Quote requests as a share of page visits',
      'Form start-to-submit rate',
      'Proportion of enquiries the sales team rates as qualified',
    ],
    services: ['landing-pages', 'measurement'],
    preview: 'landing',
    approved: true,
  },
  {
    slug: 'seo-and-measurement-audit',
    kind: 'concept',
    title: 'An SEO and measurement audit for a professional services firm',
    client: 'A UK professional services firm',
    sector: 'Professional services',
    summary:
      'Connecting search activity to real enquiries, so the firm knows which pages and topics bring in work.',
    problem:
      'Monthly reports show rising traffic, but the partners cannot see whether it leads to new work. Enquiry forms are not tracked consistently, the CRM does not record where enquiries came from, and content is planned around keywords rather than the services the firm wants to grow.',
    approach: [
      'Map priority services to the searches that signal genuine buying intent.',
      'Audit technical SEO and content gaps against those priorities.',
      'Fix and standardise enquiry tracking across every form and contact route.',
      'Add source fields to the CRM so enquiries can be traced back to the page and channel.',
    ],
    deliverables: [
      'Audit report with prioritised recommendations',
      'Search intent map for priority services',
      'Tracking plan and implementation',
      'Reporting dashboard specification',
    ],
    measures: [
      'Tracked enquiries by source and landing page',
      'Share of enquiries for priority services',
      'Visibility for high-intent service searches',
    ],
    services: ['seo', 'measurement', 'growth-strategy'],
    preview: 'audit',
    approved: true,
  },
]

export const publishedProjects = projects.filter((p) => p.approved)

export const hasRealWork = publishedProjects.some((p) => p.kind !== 'concept')

export const realProjects = publishedProjects.filter((p) => p.kind !== 'concept')
export const conceptProjects = publishedProjects.filter((p) => p.kind === 'concept')

export function getProject(slug: string | undefined) {
  return publishedProjects.find((p) => p.slug === slug)
}
