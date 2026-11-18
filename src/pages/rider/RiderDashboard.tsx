import { useMemo } from 'react'
import { CircleCheck, Clock, Package, Truck } from 'lucide-react'
import { QuickActions } from '../../components/rider/QuickActions'
import { RecentDeliveries } from '../../components/rider/RecentDeliveries'
import { RiderPageHeader } from '../../components/rider/RiderPageHeader'
import { SummaryCard } from '../../components/rider/SummaryCard'
import { useRiderDeliveries } from '../../hooks/useRiderDeliveries'
import { PENDING_STATUSES, TRANSIT_STATUSES } from '../../lib/riderStatus'

export default function RiderDashboard() {
  const { data: deliveries = [], isLoading, isError, refetch } = useRiderDeliveries()

  const stats = useMemo(() => {
    const count = (list: string[]) => deliveries.filter((d) => list.includes(d.status)).length
    return {
      total: deliveries.length,
      inTransit: count(TRANSIT_STATUSES),
      delivered: count(['Delivered']),
      pending: count(PENDING_STATUSES),
    }
  }, [deliveries])

  // Newest first (by date, then by ID), top five
  const recent = useMemo(
    () =>
      [...deliveries]
        .sort((a, b) => b.deliveryDate.localeCompare(a.deliveryDate) || b.id.localeCompare(a.id))
        .slice(0, 5),
    [deliveries],
  )

  return (
    <>
      <RiderPageHeader title="Welcome back, Rider!" subtitle="Here's what's happening with your deliveries today." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={Package} label="Total Assigned Deliveries" value={stats.total} tone="navy" loading={isLoading} />
        <SummaryCard icon={Truck} label="In Transit" value={stats.inTransit} tone="orange" loading={isLoading} />
        <SummaryCard icon={CircleCheck} label="Delivered" value={stats.delivered} tone="green" loading={isLoading} />
        <SummaryCard icon={Clock} label="Pending" value={stats.pending} tone="amber" loading={isLoading} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <RecentDeliveries deliveries={recent} isLoading={isLoading} isError={isError} onRetry={refetch} />
        </div>
        <QuickActions />
      </div>
    </>
  )
}