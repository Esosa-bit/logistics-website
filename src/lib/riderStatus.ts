import {
  CircleCheck,
  ClipboardList,
  MapPin,
  Package,
  Truck,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'
import type { RiderDeliveryStatus } from '../types/rider'

// Which statuses each dashboard card counts
export const PENDING_STATUSES: RiderDeliveryStatus[] = ['Assigned', 'Picked Up']
export const TRANSIT_STATUSES: RiderDeliveryStatus[] = ['In Transit', 'Out for Delivery']
export const HISTORY_STATUSES: RiderDeliveryStatus[] = ['Delivered', 'Failed Delivery']

// Class names are written out in full because Tailwind can't see names built from pieces
export const STATUS_STYLES: Record<RiderDeliveryStatus, { icon: LucideIcon; classes: string }> = {
  Assigned: { icon: ClipboardList, classes: 'bg-ink-50 text-ink-600 ring-ink-200' },
  'Picked Up': { icon: Package, classes: 'bg-indigo-50 text-indigo-700 ring-indigo-200' },
  'In Transit': { icon: Truck, classes: 'bg-orange-50 text-orange-700 ring-orange-200' },
  'Out for Delivery': { icon: MapPin, classes: 'bg-sky-50 text-sky-700 ring-sky-200' },
  Delivered: { icon: CircleCheck, classes: 'bg-green-50 text-success-700 ring-green-200' },
  'Failed Delivery': { icon: TriangleAlert, classes: 'bg-red-50 text-danger-700 ring-red-200' },
}