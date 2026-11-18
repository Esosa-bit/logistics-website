import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'
import { RiderCard } from './RiderCard'

const tones = {
  navy: 'bg-navy-100 text-navy-900',
  orange: 'bg-orange-100 text-orange-700',
  green: 'bg-green-100 text-success-700',
  amber: 'bg-amber-100 text-amber-700',
} as const

type Props = {
  icon: LucideIcon
  label: string
  value: number
  tone?: keyof typeof tones
  loading?: boolean
}

export function SummaryCard({ icon: Icon, label, value, tone = 'navy', loading = false }: Props) {
  return (
    <RiderCard className="flex items-center gap-4 p-5 transition-shadow hover:shadow-md">
      <span className={cn('flex size-14 shrink-0 items-center justify-center rounded-full', tones[tone])}>
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <div>
        {loading ? (
          <div className="h-8 w-12 animate-pulse rounded bg-ink-200" />
        ) : (
          <p className="text-3xl font-bold text-navy-900">{value}</p>
        )}
        <p className="mt-1 text-sm">{label}</p>
      </div>
    </RiderCard>
  )
}