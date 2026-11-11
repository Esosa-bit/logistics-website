import { cn } from '../../lib/cn'

type SpinnerProps = {
  label?: string // visible text; also announced to screen readers
  className?: string
}

export function Spinner({ label, className }: SpinnerProps) {
  return (
    <span
      role={label ? 'status' : undefined}
      className="inline-flex items-center gap-2"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        className={cn('size-4 animate-spin', className)}
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {label && <span>{label}</span>}
    </span>
  )
}