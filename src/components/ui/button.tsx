import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'
import { Spinner } from './spinner'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary'
  loading?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary: 'bg-orange-600 text-white hover:bg-orange-700',
  secondary: 'border border-navy-900 bg-white text-navy-900 hover:bg-navy-100',
} as const

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  className,
  children,
  type = 'button', // safe default; pass type="submit" for form buttons
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading} // blocks double submission
      aria-busy={loading}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}