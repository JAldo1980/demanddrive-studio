export type Variant = 'primary' | 'secondary' | 'inverse' | 'text'

const base =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: `${base} min-h-12 px-6 bg-electric text-white hover:bg-electric-600`,
  secondary: `${base} min-h-12 px-6 border border-navy/20 text-navy hover:border-navy hover:bg-cool`,
  inverse: `${base} min-h-12 px-6 bg-white text-navy hover:bg-cool`,
  text: `${base} text-electric hover:text-electric-600 underline-offset-4 hover:underline`,
}

export function buttonClass(variant: Variant = 'primary', className = '') {
  return `${variants[variant]} ${className}`
}
