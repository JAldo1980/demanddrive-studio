import { Container } from '../ui/Container'

const stats = [
  { value: '13+', label: 'years in B2B and digital marketing' },
  { value: '2.2×', label: 'inbound enquiries for an industrial manufacturer in 2.5 months' },
  { value: '100%', label: 'of that client’s May enquiries went to quote' },
  { value: '30+', label: 'marketers trained and mentored' },
]

/** Headline figures from James's track record, with their source stated. */
export function TrackRecord() {
  return (
    <section aria-labelledby="track-record-title" className="border-b border-line bg-white">
      <Container className="py-12 sm:py-14">
        <h2 id="track-record-title" className="sr-only">
          Track record
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="border-l-2 border-electric pl-5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-4xl font-bold tracking-tight text-navy sm:text-5xl">{s.value}</dd>
              <dd className="mt-2 max-w-[16rem] text-[0.9375rem] leading-snug text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-sm text-muted">Results from my previous agency and in-house roles.</p>
      </Container>
    </section>
  )
}
