export type Faq = { question: string; answer: string }

export const faqs: Faq[] = [
  {
    question: 'Who do you work with?',
    answer:
      'UK SMEs and mid-market B2B businesses, particularly in manufacturing, engineering, industrial and technical markets, and professional services. We usually work with owners, managing directors, commercial directors and marketing managers who are accountable for growth.',
  },
  {
    question: 'Can you help with a single project rather than ongoing marketing?',
    answer:
      'Yes. Many engagements start with a defined piece of work, such as a landing page, an SEO and measurement audit or a growth plan. If ongoing support would make sense afterwards, we will explain why. If it would not, we will say so.',
  },
  {
    question: 'Do you provide strategy, implementation, or both?',
    answer:
      'Both. The same people who shape the plan build the pages, content and tracking, so recommendations stay practical and nothing is lost in handover. If you have an in-house team or other suppliers, we can focus on the parts where we add most value.',
  },
  {
    question: 'How do you measure success?',
    answer:
      'We agree the measures at the start, based on your commercial goals. They typically include the number and quality of enquiries, conversion rates on key pages and visibility for the searches that matter. We are also clear about what your current systems can and cannot measure, and how to close the gaps.',
  },
  {
    question: 'What happens after the first conversation?',
    answer:
      'We follow up by email with our view of where to focus. If there is a good fit, we outline a proposed scope, timescale and cost for you to consider. There is no obligation, and no hard sell.',
  },
]

/** Questions about choosing and combining services, shown on the Services page. */
export const serviceFaqs: Faq[] = [
  {
    question: 'Do I need all four services?',
    answer:
      'No. The services are designed to work together, but most businesses start with the one that addresses their biggest gap, such as a landing page that is not converting or tracking that cannot be trusted. We will tell you which other services would strengthen it, and why, without assuming you need them all.',
  },
  {
    question: 'Where should we start if we are not sure what we need?',
    answer:
      'Start with a conversation about your goals and current activity. From there, a short review of your website, search visibility and tracking usually shows where effort is likely to make the most difference. That review becomes the basis of a prioritised plan.',
  },
  {
    question: 'Can you work with our existing website?',
    answer:
      'Often, yes. Whether we improve your current site or build new pages alongside it depends on the platform and the access available. We check this early, explain the options and recommend the most practical route.',
  },
  {
    question: 'Will you work alongside our in-house team or other agencies?',
    answer:
      'Yes. We can take on specific parts of the work, provide the strategy and measurement framework that others work to, or support an in-house marketer with hands-on delivery. Clear roles are agreed at the start so nothing falls between the gaps.',
  },
  {
    question: 'How long does it take to see results?',
    answer:
      'It depends on the work. Tracking fixes and landing page improvements can start producing useful evidence soon after launch, provided there is enough traffic. SEO builds more gradually, usually over several months. We set realistic expectations for each piece of work at the outset.',
  },
  {
    question: 'Do you guarantee rankings or leads?',
    answer:
      'No. Nobody can honestly guarantee search rankings or lead numbers, because they depend on factors outside anyone’s control. What we commit to is clear priorities, good-quality delivery, and honest reporting against measures agreed with you at the start.',
  },
]

/** FAQ sets by page path, for FAQPage structured data. */
export const faqsByPath: Record<string, Faq[]> = {
  '/': faqs,
  '/services': serviceFaqs,
}
