import { ArrowRight, PackageOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RIDER_ROUTES } from '../../lib/riderRoutes'
import type { RiderDelivery } from '../../types/rider'
import { DeliveryTable } from './DeliveryTable'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { LoadingState } from './LoadingState'
import { RiderCard } from './RiderCard'

type Props = {
  deliveries: RiderDelivery[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

export function RecentDeliveries({ deliveries, isLoading, isError, onRetry }: Props) {
  return (
    <RiderCard className="overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-lg font-bold">Recent Deliveries</h2>
        <Link
          to={RIDER_ROUTES.deliveries}
          className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          View All <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      {isLoading && <LoadingState label="Loading deliveries…" />}
      {isError && (
        <div className="p-5">
          <ErrorState message="We couldn't load your deliveries." onRetry={onRetry} />
        </div>
      )}
      {!isLoading && !isError && deliveries.length === 0 && (
        <EmptyState icon={PackageOpen} title="No deliveries yet" message="New assignments will appear here." />
      )}
      {!isLoading && !isError && deliveries.length > 0 && (
        <DeliveryTable deliveries={deliveries} caption="Your five most recent deliveries" />
      )}
    </RiderCard>
  )
}