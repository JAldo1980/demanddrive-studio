/** Diagram: extending an engineering manufacturer from one sector into another. */
export function GoToMarket() {
  const assets = ['Audience positioning', 'Sector content', 'Landing pages', 'Targeted campaigns', 'Sector-growth KPIs']
  return (
    <div className="grid grid-cols-[1fr_auto_1.3fr] items-center gap-4 px-6 pt-5 pb-6">
      <div className="rounded-[0.6em] border border-line p-4">
        <p className="text-[0.7em] font-semibold tracking-wide text-muted uppercase">Established</p>
        <p className="mt-1 text-[1.4em] font-bold text-navy">Defence</p>
        <p className="mt-2 text-[0.75em] leading-snug text-muted">Most of the pipeline came from one sector.</p>
      </div>
      <span className="flex size-7 items-center justify-center rounded-full bg-electric text-[0.9em] font-bold text-white">→</span>
      <div className="rounded-[0.6em] bg-navy p-4 text-white">
        <p className="text-[0.7em] font-semibold tracking-wide text-on-navy-muted uppercase">New audience</p>
        <p className="mt-1 text-[1.4em] font-bold">Design and R&amp;D houses</p>
        <ul className="mt-3 space-y-1.5">
          {assets.map((a) => (
            <li key={a} className="flex items-center gap-2 text-[0.8em]">
              <span className="size-1.5 rounded-full bg-electric" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
