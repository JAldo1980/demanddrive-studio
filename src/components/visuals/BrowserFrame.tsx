import type { ReactNode } from 'react'

type BrowserFrameProps = {
  /** Describes the mock-up for screen readers. */
  label: string
  address?: string
  className?: string
  children: ReactNode
}

/** A restrained browser window used to present interface mock-ups. */
export function BrowserFrame({ label, address = 'concept preview', className = '', children }: BrowserFrameProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`@container overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_60px_-30px_rgba(11,31,58,0.35)] ${className}`}
    >
      <div aria-hidden="true" className="mock-canvas select-none">
        <div className="flex items-center gap-1.5 border-b border-line bg-cool px-4 py-2.5">
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="ml-4 flex-1 truncate rounded-full bg-white px-3 py-1 text-[0.85em] text-muted">{address}</span>
        </div>
        {children}
      </div>
    </div>
  )
}

/** A plain panel for results and diagrams, so they do not read as screenshots. */
export function PanelFrame({ label, title, className = '', children }: { label: string; title: string; className?: string; children: ReactNode }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`@container overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_60px_-30px_rgba(11,31,58,0.35)] ${className}`}
    >
      <div aria-hidden="true" className="mock-canvas select-none">
        <p className="border-b border-line px-6 py-3 text-[0.95em] font-semibold text-navy">{title}</p>
        {children}
      </div>
    </div>
  )
}

/** A grey text line placeholder for mock-ups. */
export function Line({ className = '' }: { className?: string }) {
  return <span className={`block h-1.5 rounded-full bg-line ${className}`} />
}
