import { Line } from './BrowserFrame'

/** Concept: a quote-request landing page for a precision engineering firm. */
export function LandingMock() {
  return (
    <div className="px-6 pt-4 pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="size-5 rounded-[0.3em] bg-navy" />
          <Line className="w-14 bg-navy/70" />
        </div>
        <div className="flex items-center gap-4">
          <Line className="w-9" />
          <Line className="w-9" />
          <Line className="w-9" />
          <span className="rounded-[0.35em] bg-navy px-3 py-1.5 text-[0.8em] font-semibold text-white">Request a quote</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-[1.2fr_1fr] items-start gap-6">
        <div>
          <p className="text-[0.8em] font-semibold tracking-wide text-electric uppercase">Precision CNC machining</p>
          <p className="mt-2 text-[2.15em] leading-[1.08] font-bold tracking-tight text-navy">
            Tight-tolerance parts, delivered to schedule
          </p>
          <div className="mt-4 space-y-2">
            <Line className="w-full" />
            <Line className="w-11/12" />
            <Line className="w-3/4" />
          </div>
          <div className="mt-5 flex gap-2">
            <span className="rounded-[0.35em] bg-electric px-3 py-2 text-[0.85em] font-semibold text-white">Upload a drawing</span>
            <span className="rounded-[0.35em] border border-navy/25 px-3 py-2 text-[0.85em] font-semibold text-navy">Capabilities</span>
          </div>
        </div>

        <div className="rounded-[0.6em] border border-line bg-white p-4 shadow-[0_1em_2em_-1em_rgba(11,31,58,0.3)]">
          <p className="text-[1.05em] font-semibold text-navy">Request a quote</p>
          <p className="mt-0.5 text-[0.75em] text-muted">Reply within one working day</p>
          {['Name', 'Work email', 'Quantity'].map((f) => (
            <div key={f} className="mt-3">
              <p className="text-[0.72em] font-medium text-navy">{f}</p>
              <span className="mt-1 block h-6 rounded-[0.3em] border border-line" />
            </div>
          ))}
          <div className="mt-3 rounded-[0.3em] border border-dashed border-electric/50 bg-cool px-2 py-2.5 text-center text-[0.72em] text-muted">
            Drop drawings here · PDF, STEP, DXF
          </div>
          <span className="mt-3 block rounded-[0.35em] bg-electric py-2 text-center text-[0.85em] font-semibold text-white">
            Send request
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3 border-t border-line pt-5">
        {['Capabilities', 'Materials', 'Industries', 'Quality'].map((t) => (
          <div key={t} className="rounded-[0.5em] bg-cool p-3">
            <span className="block size-4 rounded-[0.3em] bg-electric/15" />
            <p className="mt-2 text-[0.8em] font-semibold text-navy">{t}</p>
            <Line className="mt-1.5 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  )
}
