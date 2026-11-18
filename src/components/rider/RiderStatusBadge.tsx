import { cn } from '../../lib/cn'
import { STATUS_STYLES } from '../../lib/riderStatus'
import type { RiderDeliveryStatus } from '../../types/rider'

export function RiderStatusBadge({ status }: { status: RiderDeliveryStatus }) {
  const { icon: Icon, classes } = STATUS_STYLES[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        classes,
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {status}
    </span>
  )
}