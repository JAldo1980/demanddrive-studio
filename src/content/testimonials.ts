/**
 * Client feedback. Only add genuine, approved quotes, attributed as the client
 * agreed. Unapproved entries are never shown.
 */

export type Testimonial = {
  quote: string
  /** Who said it, e.g. a role, or the document it came from. */
  source: string
  /** The organisation, anonymised unless the client agreed to be named. */
  organisation: string
  /** Link to related work, if any. */
  projectSlug?: string
  approved: boolean
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'I can see there’s lots of positive changes happening and the increase in enquiries is a tangible result off the back of the work your team have done.',
    source: 'Head of Commercial',
    organisation: 'UK industrial coatings manufacturer',
    projectSlug: 'industrial-coatings-enquiry-growth',
    approved: true,
  },
  {
    quote: 'Figures now show a consistent improvement in leads after 2.5 months tracking… Clear positives.',
    source: 'Board report',
    organisation: 'UK industrial coatings manufacturer',
    projectSlug: 'industrial-coatings-enquiry-growth',
    approved: true,
  },
]

export const publishedTestimonials = testimonials.filter((t) => t.approved)
