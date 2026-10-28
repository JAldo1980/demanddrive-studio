/** Real figures: inbound enquiries for an industrial coatings manufacturer. */
const bars = [
  { label: 'Previous agency', sub: 'monthly average', value: 10.7, note: '' },
  { label: 'May', sub: '', value: 24, note: '24 quoted · 3+ won' },
  { label: 'June', sub: '', value: 30, note: '28 quoted · 4+ won' },
]

export function EnquiriesChart() {
  const max = 30
  return (
    <div className="px-6 pt-5 pb-5">
      <div className="flex h-[17em] items-end gap-6 border-b border-line pl-1">
        {bars.map((b, i) => (
          <div key={b.label} className="flex h-full flex-1 flex-col justify-end">
            <p className={`mb-1.5 text-[1.9em] leading-none font-bold tracking-tight ${i === 0 ? 'text-muted' : 'text-navy'}`}>
              {b.value}
            </p>
            <div
              className={`rounded-t-[0.4em] ${i === 0 ? 'bg-line' : 'bg-electric'}`}
              style={{ height: `${(b.value / max) * 75}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex gap-6 pl-1">
        {bars.map((b) => (
          <div key={b.label} className="flex-1">
            <p className="text-[0.9em] font-semibold text-navy">{b.label}</p>
            <p className="text-[0.75em] text-muted">{b.sub || b.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[0.7em] text-muted">July excluded: it was tracked to mid-month only.</p>
    </div>
  )
}
