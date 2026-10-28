/** Concept: a search-to-enquiry measurement map from an SEO and tracking audit. */
export function AuditMock() {
  const journey = [
    { stage: 'Search', detail: 'High-intent service query', tag: 'Landing page' },
    { stage: 'Service page', detail: 'Answers the buyer’s questions', tag: 'Engaged visit' },
    { stage: 'Enquiry form', detail: 'Short, clear next step', tag: 'Form submitted' },
    { stage: 'CRM record', detail: 'Source and page recorded', tag: 'Lead source' },
  ]
  const priorities = [
    { level: 'High', text: 'Track every enquiry form and contact route consistently' },
    { level: 'High', text: 'Add source and landing-page fields to the CRM' },
    { level: 'Medium', text: 'Build service pages for priority high-intent searches' },
  ]
  return (
    <div className="px-6 pt-5 pb-6">
      <div className="flex items-baseline justify-between">
        <p className="text-[1.3em] font-bold tracking-tight text-navy">Search to enquiry: measurement map</p>
        <p className="text-[0.75em] text-muted">Audit findings</p>
      </div>

      <ol className="mt-5 grid grid-cols-4 gap-3">
        {journey.map((j, i) => (
          <li key={j.stage} className="relative rounded-[0.5em] border border-line bg-white p-3">
            <p className="text-[0.7em] font-semibold text-electric">{String(i + 1).padStart(2, '0')}</p>
            <p className="mt-1 text-[0.95em] font-semibold text-navy">{j.stage}</p>
            <p className="mt-1 text-[0.72em] leading-snug text-muted">{j.detail}</p>
            <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-electric/10 px-2 py-0.5 text-[0.65em] font-medium text-electric">
              <span className="size-1.5 rounded-full bg-electric" />
              {j.tag}
            </span>
            {i < journey.length - 1 && (
              <span className="absolute top-1/2 -right-3 z-10 flex size-5 -translate-y-1/2 translate-x-1/4 items-center justify-center rounded-full border border-line bg-white text-[0.7em] text-electric">
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-[0.5em] bg-cool p-4">
        <p className="text-[0.85em] font-semibold text-navy">Prioritised actions</p>
        <ul className="mt-2.5 space-y-2">
          {priorities.map((p) => (
            <li key={p.text} className="flex items-center gap-3 rounded-[0.4em] bg-white px-3 py-2">
              <span
                className={`w-14 shrink-0 rounded-full py-0.5 text-center text-[0.65em] font-semibold ${
                  p.level === 'High' ? 'bg-navy text-white' : 'bg-line text-navy'
                }`}
              >
                {p.level}
              </span>
              <span className="text-[0.78em] text-charcoal">{p.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
