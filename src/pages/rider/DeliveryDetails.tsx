import {
  FileSignature,
  Flag,
  Mail,
  MapPin,
  MousePointerClick,
  Package,
  Phone,
  RefreshCw,
  Scale,
  StickyNote,
  User,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DeliveryPicker } from '../../components/rider/DeliveryPicker'
import { DeliveryTimeline } from '../../components/rider/DeliveryTimeline'
import { EmptyState } from '../../components/rider/EmptyState'
import { ErrorState } from '../../components/rider/ErrorState'
import { LoadingState } from '../../components/rider/LoadingState'
import { ProofSummary } from '../../components/rider/ProofSummary'
import { RiderCard } from '../../components/rider/RiderCard'
import { RiderPageHeader } from '../../components/rider/RiderPageHeader'
import { RiderStatusBadge } from '../../components/rider/RiderStatusBadge'
import { useRiderDelivery } from '../../hooks/useRiderDeliveries'
import { formatDate } from '../../lib/format'
import { RIDER_ROUTES, withId } from '../../lib/riderRoutes'
import { riderButton } from '../../lib/riderStyles'

// One label + value row with a circular icon
function InfoRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-900">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide">{label}</p>
        <p className="wrap-break-word text-sm font-medium text-navy-900">{value}</p>
      </div>
    </div>
  )
}

// A titled white card
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <RiderCard className="p-5">
      <h2 className="mb-4 text-base font-bold">{title}</h2>
      {children}
    </RiderCard>
  )
}

export default function DeliveryDetails() {
  // useParams reads :id from /rider/details/:id?  (undefined if there is none)
  const { id } = useParams()
  const { data: d, isLoading, isError, error, refetch } = useRiderDelivery(id)

  return (
    <>
      <RiderPageHeader title="Delivery Details" subtitle="Full information about one assigned shipment." />
      <DeliveryPicker basePath={RIDER_ROUTES.details} selectedId={id} />

      {/* No id yet: ask the rider to choose */}
      {!id && (
        <RiderCard>
          <EmptyState
            icon={MousePointerClick}
            title="Select a delivery"
            message="Choose a delivery above, or open one from your list, to see its details."
          />
        </RiderCard>
      )}

      {id && isLoading && <LoadingState label="Loading delivery…" />}
      {id && isError && (
        <ErrorState message={error instanceof Error ? error.message : undefined} onRetry={refetch} />
      )}

      {/* Loaded: two columns on large screens (details left, status + timeline right) */}
      {d && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Section title="Customer information">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoRow icon={User} label="Name" value={d.customerName} />
                <InfoRow icon={Phone} label="Phone" value={d.customerPhone} />
                <InfoRow icon={Mail} label="Email" value={d.customerEmail} />
              </div>
            </Section>

            <Section title="Pickup and destination">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoRow icon={MapPin} label="Pickup location" value={d.pickupLocation} />
                <InfoRow icon={Flag} label="Destination" value={d.destination} />
              </div>
            </Section>

            <Section title="Package information">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoRow icon={Package} label="Type" value={d.packageType} />
                <InfoRow icon={Scale} label="Weight" value={d.weight} />
                <InfoRow icon={StickyNote} label="Package note" value={d.packageNote} />
              </div>
            </Section>

            <Section title="Delivery instructions">
              <p className="text-sm">{d.instructions}</p>
            </Section>

            {/* Only deliveries that have a saved proof show this card */}
            {d.proof && (
              <Section title="Proof of delivery">
                <ProofSummary proof={d.proof} />
              </Section>
            )}
          </div>

          <div className="space-y-6">
            <RiderCard className="p-5">
              <p className="text-xs uppercase tracking-wide">Tracking ID</p>
              <p className="font-heading text-xl font-bold text-navy-900">{d.id}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <RiderStatusBadge status={d.status} />
                <span className="text-sm">Due {formatDate(d.deliveryDate)}</span>
              </div>

              {/* Shortcuts are hidden once the delivery is complete */}
              {d.status !== 'Delivered' && (
                <div className="mt-5 space-y-3">
                  <Link to={withId(RIDER_ROUTES.status, d.id)} className={riderButton('primary', 'w-full')}>
                    <RefreshCw aria-hidden="true" className="size-4" /> Update status
                  </Link>
                  <Link to={withId(RIDER_ROUTES.proof, d.id)} className={riderButton('accent', 'w-full')}>
                    <FileSignature aria-hidden="true" className="size-4" /> Proof of delivery
                  </Link>
                </div>
              )}
            </RiderCard>

            <Section title="Tracking information">
              <DeliveryTimeline tracking={d.tracking} />
            </Section>
          </div>
        </div>
      )}
    </>
  )
}