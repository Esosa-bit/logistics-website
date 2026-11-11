import { ClipboardList, CircleCheck, MapPin, Package, Truck, TriangleAlert, type LucideIcon } from 'lucide-react'
import type { ShipmentStatus } from '../../types/shipments'
import { cn } from '../../lib/cn'

// Every status has an icon AND a text label, so colour is never the only signal.
const config: Record<ShipmentStatus, { label: string; icon: LucideIcon; classes: string }> = {
  booked: { label: 'Booked', icon: ClipboardList, classes: 'bg-navy-100 text-navy-900' },
  picked_up: { label: 'Picked up', icon: Package, classes: 'bg-navy-100 text-navy-900' },
  in_transit: { label: 'In transit', icon: Truck, classes: 'bg-navy-100 text-navy-900' },
  out_for_delivery: { label: 'Out for delivery', icon: MapPin, classes: 'bg-navy-100 text-navy-900' },
  delivered: { label: 'Delivered', icon: CircleCheck, classes: 'bg-green-50 text-success-700' },
  exception: { label: 'Delivery problem', icon: TriangleAlert, classes: 'bg-red-50 text-danger-700' },
}

export function StatusBadge({ status }: { status: ShipmentStatus }) {
  const { label, icon: Icon, classes } = config[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold', classes)}>
      <Icon aria-hidden="true" className="size-4" />
      {label}
    </span>
  )
}