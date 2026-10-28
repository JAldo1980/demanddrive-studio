/**
 * DemandDrive Studio logo, taken from the supplied editable master
 * (brand/DemandDrive_Studio_Logo_Editable.svg). Shapes, text positions and
 * sizes are unchanged; the viewBox is cropped to the artwork. The wordmark is
 * live text, so each word is pinned to its Helvetica width with textLength to
 * keep the lock-up identical where Arial is used as the fallback.
 */

const NAVY = '#0B1F3A'
const BLUE = '#1769FF'

/** Symbol bounds within the master artboard: x 141–415, y 190–450. */
const SYMBOL_D =
  'M160,190h125c82,0,130,48,130,130s-48,130-130,130h-67l55-55h15c38,0,59-28,59-75s-21-75-59-75h-73v49l-55,56v-160Z'
const SYMBOL_ARROW = '141 412.91 214 412.91 292 334.91 314 356.91 314 278.91 236 278.91 258 300.91 141 412.91'

type LogoProps = {
  variant?: 'primary' | 'reverse'
  className?: string
}

export function Logo({ variant = 'primary', className = '' }: LogoProps) {
  const ink = variant === 'reverse' ? '#FFFFFF' : NAVY
  return (
    <svg
      viewBox="141 190 1040 260"
      role="img"
      aria-label="DemandDrive Studio"
      className={className}
      fontFamily="Helvetica, 'Helvetica Neue', Arial, sans-serif"
    >
      <path d={SYMBOL_D} fill={ink} fillRule="evenodd" />
      <polygon points={SYMBOL_ARROW} fill={BLUE} fillRule="evenodd" />
      <text y="360" fontSize="112" fontWeight="700">
        <tspan x="455" fill={ink} textLength="442" lengthAdjust="spacingAndGlyphs">
          Demand
        </tspan>
        <tspan x="898" fill={variant === 'reverse' ? '#FFFFFF' : BLUE} textLength="280" lengthAdjust="spacingAndGlyphs">
          Drive
        </tspan>
      </text>
      <text x="460 506.01 549.68 598 646.32 676" y="438" fontSize="42" fill={ink}>
        STUDIO
      </text>
    </svg>
  )
}
