import type { ReactNode } from 'react'
import { CircleAlert, CircleCheck, Info, TriangleAlert, type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

type Variant = 'success' | 'error' | 'info' | 'warning'

const styles: Record<Variant, { box: string; icon: LucideIcon }> = {
  success: { box: 'border-success-700/30 bg-green-50 text-success-700', icon: CircleCheck },
  error: { box: 'border-danger-700/30 bg-red-50 text-danger-700', icon: CircleAlert },
  info: { box: 'border-navy-700/30 bg-navy-100 text-navy-900', icon: Info },
  warning: { box: 'border-amber-400 bg-amber-50 text-amber-900', icon: TriangleAlert },
}

type AlertMessageProps = {
  variant: Variant
  title?: string
  children?: ReactNode
  className?: string
}

export function AlertMessage({ variant, title, children, className }: AlertMessageProps) {
  const { box, icon: Icon } = styles[variant]
  return (
    // role="alert" interrupts screen readers (errors). role="status" waits politely.
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn('flex gap-3 rounded-lg border p-4 text-sm', box, className)}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        {children && <div>{children}</div>}
      </div>
    </div>
  )
}