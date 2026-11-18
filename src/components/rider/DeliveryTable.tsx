import { Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../lib/format'
import { RIDER_ROUTES, withId } from '../../lib/riderRoutes'
import type { RiderDelivery } from '../../types/rider'
import { RiderStatusBadge } from './RiderStatusBadge'

type Props = { deliveries: RiderDelivery[]; showPickup?: boolean; caption: string }

export function DeliveryTable({ deliveries, showPickup = false, caption }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full text-left text-sm ${showPickup ? 'min-w-900px' : 'min-w-680px'}`}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-ink-200 text-xs uppercase tracking-wide">
            <th scope="col" className="px-5 py-3 font-semibold">Tracking ID</th>
            <th scope="col" className="px-3 py-3 font-semibold">Customer</th>
            {showPickup && <th scope="col" className="px-3 py-3 font-semibold">Pickup</th>}
            <th scope="col" className="px-3 py-3 font-semibold">Destination</th>
            <th scope="col" className="px-3 py-3 font-semibold">Delivery Date</th>
            <th scope="col" className="px-3 py-3 font-semibold">Status</th>
            <th scope="col" className="px-5 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-50">
          {deliveries.map((d) => (
            <tr key={d.id} className="transition-colors hover:bg-ink-50">
              <td className="whitespace-nowrap px-5 py-4 font-semibold text-navy-900">{d.id}</td>
              <td className="px-3 py-4">{d.customerName}</td>
              {showPickup && <td className="px-3 py-4">{d.pickupLocation}</td>}
              <td className="px-3 py-4">{d.destination}</td>
              <td className="whitespace-nowrap px-3 py-4">{formatDate(d.deliveryDate)}</td>
              <td className="px-3 py-4">
                <RiderStatusBadge status={d.status} />
              </td>
              <td className="px-5 py-4">
                <Link
                  to={withId(RIDER_ROUTES.details, d.id)}
                  aria-label={`View details for ${d.id}`}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50"
                >
                  <Eye aria-hidden="true" className="size-4" /> View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}