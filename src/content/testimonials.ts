/**
 * Client testimonials. Only add genuine quotes the client has approved for
 * publication, attributed as they agreed. Unapproved entries are never shown.
 */

export type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
  approved: boolean
}

export const testimonials: Testimonial[] = []

export const publishedTestimonials = testimonials.filter((t) => t.approved)
