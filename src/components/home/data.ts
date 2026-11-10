/**
 * Content for the redesigned header, footer and homepage, built from the
 * existing content files so copy stays in one place.
 */
import { services } from '../../content/services'
import { publishedProjects, kindLabels } from '../../content/work'
import { posts, formatDate } from '../../content/posts'

export type StageId = 'strategy' | 'attract' | 'convert' | 'measure' | 'improve'

export type SystemStage = {
  id: StageId
  k: string
  stage: string
  title: string
  href: string
  touch: string
  summary: string
  items: string[]
  cta: string
}

function service(id: string) {
  const s = services.find((x) => x.id === id)
  if (!s) throw new Error(`Unknown service: ${id}`)
  return s
}

function fromService(id: StageId, serviceId: string, k: string, stage: string, touch: string, title: string, cta: string): SystemStage {
  const s = service(serviceId)
  return { id, k, stage, title, href: `/services#${s.id}`, touch, summary: s.purpose, items: s.includes, cta }
}

export const systemStages: Record<StageId, SystemStage> = {
  strategy: fromService('strategy', 'growth-strategy', 'Across every stage', 'Direction', 'Sets the brief and success measures', 'B2B growth strategy', 'Growth strategy'),
  attract: fromService('attract', 'seo', 'Stage 1', 'Attract', 'Buyer search → service page', 'SEO and organic visibility', 'SEO and visibility'),
  convert: fromService('convert', 'landing-pages', 'Stage 2', 'Convert', 'Landing page → enquiry', 'Landing pages and conversion', 'Landing pages'),
  measure: fromService('measure', 'measurement', 'Stage 3', 'Measure', 'CRM record → pipeline', 'Measurement and insight', 'Measurement'),
  improve: {
    id: 'improve',
    k: 'Stage 4',
    stage: 'Improve',
    title: 'Review and reprioritise',
    href: '/#improve',
    touch: 'Evidence → next priorities',
    summary: 'I review results with you, explain what I have learned and adjust the plan. Then the cycle continues.',
    items: ['Results reviewed against the agreed measures', 'What to keep doing, and what to stop', 'The next set of priorities'],
    cta: 'How the cycle works',
  },
}

export const flowOrder: StageId[] = ['attract', 'convert', 'measure', 'improve']

/** Funnel rows, widest (direction) to narrowest (measurement). */
export const funnel = [
  { tag: 'Direction', id: 'growth-strategy', title: 'B2B growth strategy', outcome: 'A clear brief and budget priorities for every channel', width: '100%' },
  { tag: 'Attract', id: 'seo', title: 'SEO and organic visibility', outcome: 'Visibility for searches that signal buying intent', width: '90%' },
  { tag: 'Convert', id: 'landing-pages', title: 'Landing pages and conversion', outcome: 'Focused pages with one clear next step', width: '80%' },
  { tag: 'Measure', id: 'measurement', title: 'Measurement and insight', outcome: 'Enquiries traced to their source and pipeline', width: '70%' },
]

/** Short one-liners for the Work mega menu, keyed by project slug. */
const workLines: Record<string, string> = {
  'industrial-coatings-enquiry-growth': 'Inbound enquiries from 10.7 a month to 24, then 30.',
  'water-treatment-record-month': 'A record month: 21 form submissions, 16 qualified leads.',
  'the-circle-line-website': 'A calm, credible website for a leadership psychology consultancy.',
  'engineering-new-sector-go-to-market': 'Opening a new sector with design and R&D houses.',
  'industrial-supplier-website-redesign': 'Navigation rebuilt around the sectors and applications buyers search by.',
}

const shortTitles: Record<string, string> = {
  'industrial-coatings-enquiry-growth': 'Industrial coatings manufacturer',
  'water-treatment-record-month': 'Industrial water treatment specialist',
  'the-circle-line-website': 'The Circle Line',
  'engineering-new-sector-go-to-market': 'Defence-focused engineering manufacturer',
  'industrial-supplier-website-redesign': 'Industrial components supplier',
}

export const workMenu = [
  ...publishedProjects
    .filter((p) => workLines[p.slug])
    .map((p) => ({
      chip: kindLabels[p.kind],
      title: shortTitles[p.slug] ?? p.client,
      x: workLines[p.slug],
      href: `/work/${p.slug}`,
    })),
  { chip: 'All work', title: 'See every project', x: 'Previous roles, client work and concepts, each clearly labelled.', href: '/work' },
]

function postTag(tags: string[] | undefined) {
  return tags && tags.length > 0 ? tags[0] : 'Insights'
}

export const latestPosts = posts.slice(0, 2).map((p) => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  meta: `${postTag(p.tags)} · ${formatDate(p.date)}`,
}))
