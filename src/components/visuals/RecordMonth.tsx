/** Real figures: a water treatment specialist's best month on record. */
export function RecordMonth() {
  return (
    <div className="px-6 pt-5 pb-6">
      <p className="text-[0.8em] font-semibold tracking-wide text-electric uppercase">September · best month on record</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {[
          { value: '21', label: 'Form submissions' },
          { value: '16', label: 'Unique qualified leads' },
        ].map((s) => (
          <div key={s.label} className="rounded-[0.6em] bg-cool p-4">
            <p className="text-[3.2em] leading-none font-bold tracking-tight text-navy">{s.value}</p>
            <p className="mt-2 text-[0.85em] text-muted">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <div className="flex justify-between text-[0.75em] text-muted">
          <span>Qualified leads against target</span>
          <span>16 of 20 a month</span>
        </div>
        <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-electric" style={{ width: '80%' }} />
        </div>
      </div>
      <p className="mt-5 text-[0.8em] font-semibold text-navy">What moved the needle</p>
      <ul className="mt-2 grid grid-cols-3 gap-2 text-[0.75em] text-charcoal">
        {['Service-page SEO', 'Local SEO and Google Business Profile', 'New content'].map((t) => (
          <li key={t} className="rounded-[0.4em] border border-line px-2.5 py-2">{t}</li>
        ))}
      </ul>
    </div>
  )
}
