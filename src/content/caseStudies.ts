/**
 * Case studies and evidence.
 *
 * Only add genuine work that the client has approved for publication, with
 * results that can be substantiated. Entries with `approved: false` are never
 * shown on the live site.
 */

export type CaseStudy = {
  slug: string
  client: string
  sector: string
  challenge: string
  work: string
  /** Approved, verifiable outcome. Leave empty rather than estimate. */
  outcome?: string
  services: string[]
  approved: boolean
}

export const caseStudies: CaseStudy[] = []

export const publishedCaseStudies = caseStudies.filter((c) => c.approved)
