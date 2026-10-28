import { Line } from './BrowserFrame'

/** Concept: industry/application-led navigation for an industrial supplier. */
export function RedesignMock() {
  const columns = [
    { title: 'By industry', items: ['Food and drink', 'Energy', 'Automotive', 'Water treatment'] },
    { title: 'By application', items: ['Flow control', 'Sealing', 'Filtration', 'Monitoring'] },
    { title: 'Products', items: ['Valves', 'Seals and gaskets', 'Filters', 'Sensors'] },
  ]
  return (
    <div className="pb-6">
      <div className="flex items-center justify-between border-b border-line px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="size-5 rounded-full bg-navy" />
          <Line className="w-14 bg-navy/70" />
        </div>
        <div className="flex items-center gap-5 text-[0.85em] font-medium text-navy">
          <span className="border-b-2 border-electric pb-0.5">Industries</span>
          <span>Applications</span>
          <span>Products</span>
          <span className="rounded-[0.35em] bg-electric px-3 py-1.5 font-semibold text-white">Talk to an engineer</span>
        </div>
      </div>

      <div className="mx-6 mt-0 grid grid-cols-[1fr_1fr_1fr_1.1fr] gap-5 rounded-b-[0.6em] border border-t-0 border-line bg-white p-5 shadow-[0_1.2em_2em_-1.2em_rgba(11,31,58,0.3)]">
        {columns.map((c, i) => (
          <div key={c.title}>
            <p className={`text-[0.75em] font-semibold tracking-wide uppercase ${i < 2 ? 'text-electric' : 'text-muted'}`}>
              {c.title}
            </p>
            <ul className="mt-2.5 space-y-2 text-[0.85em] text-navy">
              {c.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="rounded-[0.5em] bg-navy p-4 text-white">
          <p className="text-[0.95em] leading-snug font-semibold">Not sure which product fits?</p>
          <Line className="mt-2 w-full bg-white/25" />
          <Line className="mt-1.5 w-3/4 bg-white/25" />
          <span className="mt-3 inline-block rounded-[0.35em] bg-white px-2.5 py-1.5 text-[0.75em] font-semibold text-navy">
            Ask an engineer
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[1.3fr_1fr] gap-6 px-6">
        <div>
          <p className="text-[0.75em] text-muted">Industries / Food and drink</p>
          <p className="mt-1.5 text-[1.6em] leading-tight font-bold tracking-tight text-navy">
            Hygienic flow control for food and drink production
          </p>
          <div className="mt-3 space-y-2">
            <Line className="w-full" />
            <Line className="w-5/6" />
          </div>
        </div>
        <div className="rounded-[0.5em] border border-line p-3">
          <p className="text-[0.75em] font-semibold text-navy">Specification summary</p>
          {['Material', 'Pressure', 'Certification'].map((r) => (
            <div key={r} className="mt-2 flex items-center justify-between border-t border-line pt-2 text-[0.7em] text-muted">
              <span>{r}</span>
              <Line className="w-10" />
            </div>
          ))}
          <span className="mt-3 block rounded-[0.35em] bg-electric py-1.5 text-center text-[0.75em] font-semibold text-white">
            Request pricing
          </span>
        </div>
      </div>
    </div>
  )
}
