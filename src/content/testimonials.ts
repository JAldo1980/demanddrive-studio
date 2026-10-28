/**
 * Client feedback and LinkedIn recommendations. Only add genuine, approved
 * quotes, attributed as agreed. Quote recommendations exactly as written; use
 * "…" where text is shortened. Unapproved entries are never shown.
 */

export type Testimonial = {
  quote: string
  /** Person's name, if they are happy to be named. */
  name?: string
  /** Their role, or the document the quote came from. */
  source: string
  /** The organisation, anonymised unless agreed otherwise. */
  organisation?: string
  kind: 'client' | 'recommendation'
  /** For LinkedIn recommendations: the relationship and date LinkedIn shows. */
  context?: string
  /** Show on the homepage as well as the About page. */
  featured?: boolean
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
    kind: 'client',
    featured: true,
    projectSlug: 'industrial-coatings-enquiry-growth',
    approved: true,
  },
  {
    quote: 'Figures now show a consistent improvement in leads after 2.5 months tracking… Clear positives.',
    source: 'Board report',
    organisation: 'UK industrial coatings manufacturer',
    kind: 'client',
    featured: true,
    projectSlug: 'industrial-coatings-enquiry-growth',
    approved: true,
  },
  {
    quote:
      'I entrusted James with the design of my freelance business’s website, having efficiently worked with him previously on other, dissimilar projects… When I look at my website, all I see is an expertly crafted website…',
    name: 'Ryan Watson',
    source: 'Freelance social media manager for property-related companies',
    kind: 'recommendation',
    context: 'Client · LinkedIn recommendation, November 2022',
    featured: true,
    approved: true,
  },
  {
    quote:
      'James is an innovative individual, constantly challenging the norm and striving to get better results. He encourages everyone around him to do the same and offers advice and support no matter your goals.',
    name: 'Alison Davey',
    source: 'Producer at Scopely',
    kind: 'recommendation',
    context: 'LinkedIn recommendation, August 2021',
    featured: true,
    approved: true,
  },
  {
    quote:
      'James is an awesome front-end developer and a great teammate… He’s got a solid handle on design, works really well with clients, and is always eager to pick up new skills.',
    name: 'Marius Adam',
    source: 'AI-native software engineer',
    kind: 'recommendation',
    context: 'Worked on the same team · LinkedIn recommendation, December 2024',
    approved: true,
  },
  {
    quote:
      'James has given me so much advice and guidance from day one, he has shared his knowledge of Marketing and the business world in general…',
    name: 'Gemma Threlfall',
    source: 'Marketing executive',
    kind: 'recommendation',
    context: 'LinkedIn recommendation, July 2021',
    approved: true,
  },
]

export const publishedTestimonials = testimonials.filter((t) => t.approved)
export const featuredTestimonials = publishedTestimonials.filter((t) => t.featured)
export const recommendations = publishedTestimonials.filter((t) => t.kind === 'recommendation')
