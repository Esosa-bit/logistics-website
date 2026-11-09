import { Check } from 'lucide-react'
import type { PublicShipment, ShipmentStatus, TrackingEvent } from '../../types/shipments'
import { cn } from '../../lib/cn'
import { formatDateTime } from '../../lib/format'

// The five stages every shipment passes through, in order.
const STAGES: { status: ShipmentStatus; label: string }[] = [
  { status: 'booked', label: 'Shipment booked' },
  { status: 'picked_up', label: 'Picked up' },
  { status: 'in_transit', label: 'In transit' },
  { status: 'out_for_delivery', label: 'Out for delivery' },
  { status: 'delivered', label: 'Delivered' },
]

export function TrackingTimeline({ shipment }: { shipment: PublicShipment }) {
  // Match each stage with the event that happened at that stage (if any).
  const items = STAGES.map((stage) => ({
    ...stage,
    event: shipment.events.find((e): e is TrackingEvent => e.status === stage.status),
  }))

  // The current stage is the last one that has an event.
  let currentIndex = -1
  items.forEach((item, index) => {
    if (item.event) currentIndex = index
  })

  return (
    <section aria-labelledby="timeline-heading" className="rounded-xl border border-ink-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 id="timeline-heading" className="text-xl font-semibold">
        Shipment history
      </h2>

      <ol className="mt-6">
        {items.map((item, index) => {
          const state = index < currentIndex ? 'done' : index === currentIndex ? 'current' : 'upcoming'
          const isLast = index === items.length - 1

          return (
            <li
              key={item.status}
              aria-current={state === 'current' ? 'step' : undefined}
              className={cn('relative flex gap-4', !isLast && 'pb-8')}
            >
              {/* Route line to the next stop: solid when completed, dashed when still ahead */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute bottom-0 left-[15px] top-8',
                    state === 'done' ? 'w-0.5 bg-navy-900' : 'border-l-2 border-dashed border-ink-200',
                  )}
                />
              )}

              {/* Marker */}
              <span
                aria-hidden="true"
                className={cn(
                  'relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2',
                  state === 'done' && 'border-navy-900 bg-navy-900 text-white',
                  state === 'current' && 'border-orange-500 bg-orange-500 text-white',
                  state === 'upcoming' && 'border-ink-200 bg-white',
                )}
              >
                {state === 'done' && <Check className="size-4" />}
                {state === 'current' && <span className="size-2.5 rounded-full bg-white" />}
              </span>

              {/* Text */}
              <div className="pt-1">
                <p className={cn('font-semibold', state === 'upcoming' ? 'text-ink-600' : 'text-navy-900')}>
                  {item.label}
                  {state === 'current' && (
                    <span className="ml-2 rounded-full bg-orange-500/15 px-2 py-0.5 text-xs font-semibold text-orange-700">
                      Latest update
                    </span>
                  )}
                </p>

                {item.event ? (
                  <>
                    <p className="mt-0.5">{item.event.description}</p>
                    <p className="mt-0.5 text-sm">
                      {formatDateTime(item.event.timestamp)}
                      {item.event.location ? `, ${item.event.location}` : ''}
                    </p>
                  </>
                ) : (
                  <p className="mt-0.5 text-sm">Not reached yet</p>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}