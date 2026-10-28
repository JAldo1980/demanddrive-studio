export type Challenge = { title: string; problem: string; response: string }

export const challenges: Challenge[] = [
  {
    title: 'Disconnected channels',
    problem:
      'SEO, content, the website and sales follow-up are managed separately, so effort is duplicated and the buyer journey breaks between them.',
    response: 'One plan that sets a shared objective and gives each channel a defined role.',
  },
  {
    title: 'Landing pages that underperform',
    problem:
      'Visitors arrive but do not enquire. The message is unclear, the page is slow or the next step is hard to find.',
    response: 'Focused pages built around a single offer and a clear, low-friction next step.',
  },
  {
    title: 'Unclear measurement',
    problem:
      'Reports show clicks and sessions, but not which activity leads to qualified enquiries or pipeline.',
    response: 'Tracking and reporting connected to the enquiries and opportunities that matter.',
  },
  {
    title: 'Activity without commercial direction',
    problem:
      'Marketing activity continues because it always has, rather than because it supports a defined growth objective.',
    response: 'Priorities agreed against commercial goals, then reviewed as results come in.',
  },
]
