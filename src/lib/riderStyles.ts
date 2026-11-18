import { cn } from './cn'

type Variant = 'primary' | 'accent' | 'outline' | 'ghost'

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-navy-900 text-white hover:bg-navy-700',
  accent: 'bg-orange-600 text-white hover:bg-orange-700',
  outline: 'border border-navy-900 bg-white text-navy-900 hover:bg-navy-100',
  ghost: 'text-navy-900 hover:bg-ink-50',
}

// Usage: <Link className={riderButton('accent')}> or <button className={riderButton()}>
export const riderButton = (variant: Variant = 'primary', extra?: string) =>
  cn(base, variants[variant], extra)
// For raw <select> and <input type="date"> (FormField covers text inputs)
export const riderInputClass =
  'block min-h-11 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-600 placeholder:text-ink-600/60 disabled:bg-ink-50'