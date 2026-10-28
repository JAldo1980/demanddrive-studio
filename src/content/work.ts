/**
 * Work: concept projects and (when approved) client case studies.
 *
 * Concept projects are realistic briefs worked through to show our thinking.
 * They are not client engagements and must never show results. Client case
 * studies are only published with `approved: true`, client permission and
 * verifiable outcomes.
 */

export type Preview = 'landing' | 'redesign' | 'audit'

export type Project = {
  slug: string
  kind: 'concept' | 'client'
  title: string
  /** Who the work is for. For concepts, describe the type of business only. */
  client: string
  sector: string
  summary: string
  problem: string
  approach: string[]
  deliverables: string[]
  /** Concepts: what we would measure. Clients: what was measured. */
  measures: string[]
  /** Client work only: an approved, verifiable outcome. */
  outcome?: string
  /** Service ids from src/content/services.ts. */
  services: string[]
  preview: Preview
  approved: boolean
}

export const projects: Project[] = [
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

export const hasClientWork = publishedProjects.some((p) => p.kind === 'client')

export function getProject(slug: string | undefined) {
  return publishedProjects.find((p) => p.slug === slug)
}
