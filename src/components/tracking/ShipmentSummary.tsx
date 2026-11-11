import { ArrowRight } from 'lucide-react'
import type { PublicShipment } from '../../types/shipments'
import { formatDate, formatDateTime } from '../../lib/format'
import { AlertMessage } from '../ui/AlertMessage'
import { StatusBadge } from '../ui/StatusBadge'

export function ShipmentSummary({ shipment }: { shipment: PublicShipment }) {
  const latest = shipment.events[shipment.events.length - 1]

  return (
    <section aria-labelledby="summary-heading" className="rounded-xl border border-ink-200 bg-white p-5 shadow-sm sm:p-6">
      <AlertMessage variant="warning" title="Demo data, not a real shipment">
        This is a sample so you can see how tracking works.
      </AlertMessage>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm">Tracking number</p>
          <h2 id="summary-heading" className="text-2xl font-semibold">
            {shipment.trackingNumber}
          </h2>
        </div>
        <StatusBadge status={shipment.status} />
      </div>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm">Route</dt>
          <dd className="mt-1 flex items-center gap-2 text-lg font-medium text-navy-900">
            {shipment.origin}
            <ArrowRight aria-hidden="true" className="size-5" />
            <span className="sr-only">to</span>
            {shipment.destination}
          </dd>
        </div>
        {shipment.estimatedDelivery && (
          <div>
            <dt className="text-sm">Estimated delivery</dt>
            <dd className="mt-1 text-lg font-medium text-navy-900">
              {formatDate(shipment.estimatedDelivery)} <span className="text-sm font-normal">(sample date)</span>
            </dd>
          </div>
        )}
      </dl>

      {latest && (
        <div className="mt-5 rounded-lg bg-navy-100 p-4">
          <p className="text-sm font-semibold text-navy-900">Latest update</p>
          <p className="mt-1 text-navy-900">{latest.description}</p>
          <p className="mt-1 text-sm">
            {formatDateTime(latest.timestamp)}
            {latest.location ? `, ${latest.location}` : ''}
          </p>
        </div>
      )}
    </section>
  )
}