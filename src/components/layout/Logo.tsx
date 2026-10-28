/**
 * DemandDrive Studio logo, built from the supplied vector master
 * (brand/DemandDrive_Studio_Logo.svg). The D/arrow symbol paths are unchanged;
 * the wordmark is set in the brand typeface and spaced to match the approved
 * lock-up. Replace with an outlined master SVG once the final logo is signed off.
 */

const NAVY = '#0B1F3A'
const BLUE = '#1769FF'

export function LogoSymbol({ dFill = NAVY, arrowFill = BLUE }: { dFill?: string; arrowFill?: string }) {
  return (
    <>
      <path
        d="M0,0 H125 C207,0 255,48 255,130 C255,212 207,260 125,260 H58 L113,205 H128 C166,205 187,177 187,130 C187,83 166,55 128,55 H55 V104 L0,160 Z"
        fill={dFill}
      />
      <path d="M0,260 L73,260 L151,182 L173,204 L173,126 L95,126 L117,148 Z" fill={arrowFill} />
    </>
  )
}

type LogoProps = {
  variant?: 'primary' | 'reverse'
  className?: string
}

export function Logo({ variant = 'primary', className = '' }: LogoProps) {
  const reverse = variant === 'reverse'
  const ink = reverse ? '#FFFFFF' : NAVY
  return (
    <svg
      viewBox="0 0 1240 260"
      role="img"
      aria-label="DemandDrive Studio"
      className={className}
      fontFamily="'Inter Variable', Inter, Arial, Helvetica, sans-serif"
    >
      <LogoSymbol dFill={ink} arrowFill={BLUE} />
      <text x="300" y="150" fontSize="168" fontWeight="700" letterSpacing="-5" textLength="935" lengthAdjust="spacingAndGlyphs">
        <tspan fill={ink}>Demand</tspan>
        <tspan fill={reverse ? '#FFFFFF' : BLUE}>Drive</tspan>
      </text>
      <text x="304" y="247" fontSize="64" fontWeight="500" fill={ink} textLength="360" lengthAdjust="spacing">
        STUDIO
      </text>
    </svg>
  )
}
