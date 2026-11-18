import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function RiderCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={cn('rounded-2xl border border-ink-200 bg-white shadow-sm', className)}>
      {children}
    </section>
  )
}