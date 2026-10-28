import type { ReactNode } from 'react'

/**
 * A visibly labelled stand-in for content the owner has not supplied yet.
 * Search the codebase for <Placeholder to find every outstanding item.
 */
export function Placeholder({ children, dark = false, block = false }: { children: ReactNode; dark?: boolean; block?: boolean }) {
  const Tag = block ? 'div' : 'span'
  return (
    <Tag
      className={`${block ? 'block p-5' : 'inline-block px-2 py-0.5'} rounded border border-dashed text-sm ${
        dark ? 'border-on-navy-muted/60 text-on-navy-muted' : 'border-muted/50 bg-white/60 text-muted'
      }`}
    >
      <span className="font-semibold">Placeholder:</span> {children}
    </Tag>
  )
}
