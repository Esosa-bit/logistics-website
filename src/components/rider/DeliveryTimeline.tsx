import { cn } from '../../lib/cn'
import { formatDateTime } from '../../lib/format'
import type { TrackingEntry } from '../../types/rider'

export function DeliveryTimeline({ tracking }: { tracking: TrackingEntry[] }) {
  const items = [...tracking].reverse() // newest first
  return (
    <ol className="relative space-y-6 border-l-2 border-ink-200 pl-6">
      {items.map((entry, index) => (
        <li key={`${entry.time}-${index}`} className="relative">
          <span
            aria-hidden="true"
            className={cn(
              'absolute -left-33px top-1 size-4 rounded-full border-2 border-white',
              index === 0 ? 'bg-orange-500' : 'bg-navy-100',
            )}
          />
          <p className="text-sm font-semibold text-navy-900">{entry.status}</p>
          <p className="text-xs">{formatDateTime(entry.time)}</p>
          {entry.note && <p className="mt-1 text-sm">{entry.note}</p>}
        </li>
      ))}
    </ol>
  )
}