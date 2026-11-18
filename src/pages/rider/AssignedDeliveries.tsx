import { useMemo, useState } from 'react'
import { PackageSearch } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { DeliveryTable } from '../../components/rider/DeliveryTable'
import { EmptyState } from '../../components/rider/EmptyState'
import { ErrorState } from '../../components/rider/ErrorState'
import { LoadingState } from '../../components/rider/LoadingState'
import { RiderCard } from '../../components/rider/RiderCard'
import { RiderPageHeader } from '../../components/rider/RiderPageHeader'
import { SearchInput } from '../../components/rider/SearchInput'
import { Button } from '../../components/ui/button'
import { useRiderDeliveries } from '../../hooks/useRiderDeliveries'
import { riderInputClass } from '../../lib/riderStyles'
import { RIDER_STATUSES, type RiderDeliveryStatus } from '../../types/rider'

// The filter can be "All" or any one of the six statuses
type StatusFilter = 'All' | RiderDeliveryStatus

export default function AssignedDeliveries() {
  const { data: deliveries = [], isLoading, isError, refetch } = useRiderDeliveries()

  // The search text lives in the URL (?q=...), the status filter in normal state
  const [params, setParams] = useSearchParams()
  const [status, setStatus] = useState<StatusFilter>('All')
  const q = params.get('q') ?? ''

  const setQuery = (value: string) => setParams(value ? { q: value } : {}, { replace: true })

  // Re-filter only when the data or a filter changes
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return deliveries.filter(
      (d) =>
        (status === 'All' || d.status === status) &&
        (!term ||
          [d.id, d.customerName, d.destination, d.pickupLocation].some((v) =>
            v.toLowerCase().includes(term),
          )),
    )
  }, [deliveries, q, status])

  const clearFilters = () => {
    setQuery('')
    setStatus('All')
  }

  return (
    <>
      <RiderPageHeader
        title="My Assigned Deliveries"
        subtitle="Every delivery assigned to you. Search or filter by status."
      />

      <RiderCard className="overflow-hidden">
        {/* Search + filter bar */}
        <div className="flex flex-col gap-3 border-b border-ink-200 p-4 sm:flex-row sm:items-center">
          <div className="sm:max-w-sm sm:flex-1">
            <SearchInput value={q} onChange={setQuery} placeholder="Search ID, customer or location" />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
            aria-label="Filter by status"
            className={`${riderInputClass} sm:w-52`}
          >
            <option value="All">All statuses</option>
            {RIDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {!isLoading && !isError && (
            <p className="text-sm sm:ml-auto" aria-live="polite">
              {filtered.length} of {deliveries.length} deliveries
            </p>
          )}
        </div>

        {/* The four states */}
        {isLoading && <LoadingState label="Loading your deliveries…" />}
        {isError && (
          <div className="p-5">
            <ErrorState message="We couldn't load your deliveries." onRetry={refetch} />
          </div>
        )}
        {!isLoading && !isError && filtered.length === 0 && (
          <EmptyState
            icon={PackageSearch}
            title="No matching deliveries"
            message="Try a different search or clear the filters."
            action={
              <Button variant="secondary" onClick={clearFilters}>
                Clear filters
              </Button>
            }
          />
        )}
        {!isLoading && !isError && filtered.length > 0 && (
          <DeliveryTable deliveries={filtered} showPickup caption="All deliveries assigned to you" />
        )}
      </RiderCard>
    </>
  )
}