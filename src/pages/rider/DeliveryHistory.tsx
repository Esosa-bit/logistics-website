import { useMemo, useState } from 'react'
import { History } from 'lucide-react'
import { DeliveryTable } from '../../components/rider/DeliveryTable'
import { EmptyState } from '../../components/rider/EmptyState'
import { ErrorState } from '../../components/rider/ErrorState'
import { LoadingState } from '../../components/rider/LoadingState'
import { RiderCard } from '../../components/rider/RiderCard'
import { RiderPageHeader } from '../../components/rider/RiderPageHeader'
import { SearchInput } from '../../components/rider/SearchInput'
import { Button } from '../../components/ui/button'
import { useRiderDeliveries } from '../../hooks/useRiderDeliveries'
import { HISTORY_STATUSES } from '../../lib/riderStatus'
import { riderInputClass } from '../../lib/riderStyles'
import type { RiderDeliveryStatus } from '../../types/rider'

// The outcome filter is "All" or one of the finished statuses
type OutcomeFilter = 'All' | RiderDeliveryStatus

export default function DeliveryHistory() {
  const { data: deliveries = [], isLoading, isError, refetch } = useRiderDeliveries()

  // Four filters, each remembered with its own useState
  const [q, setQ] = useState('')
  const [outcome, setOutcome] = useState<OutcomeFilter>('All')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return deliveries
      .filter((d) => HISTORY_STATUSES.includes(d.status)) // finished only
      .filter((d) => outcome === 'All' || d.status === outcome)
      .filter((d) => !from || d.deliveryDate >= from) // empty = no limit
      .filter((d) => !to || d.deliveryDate <= to)
      .filter(
        (d) =>
          !term ||
          [d.id, d.customerName, d.destination, d.pickupLocation].some((v) =>
            v.toLowerCase().includes(term),
          ),
      )
      .sort((a, b) => b.deliveryDate.localeCompare(a.deliveryDate)) // newest first
  }, [deliveries, q, outcome, from, to])

  const clear = () => {
    setQ('')
    setOutcome('All')
    setFrom('')
    setTo('')
  }

  return (
    <>
      <RiderPageHeader title="Delivery History" subtitle="Your completed and unsuccessful deliveries." />

      <RiderCard className="overflow-hidden">
        {/* Filter bar: 1 column on phones, 2 on tablets, 4 on large screens */}
        <div className="grid gap-3 border-b border-ink-200 p-4 sm:grid-cols-2 xl:grid-cols-4">
          <SearchInput value={q} onChange={setQ} placeholder="Search ID, customer or location" />
          <select
            value={outcome}
            onChange={(e) => setOutcome(e.target.value as OutcomeFilter)}
            aria-label="Filter by outcome"
            className={riderInputClass}
          >
            <option value="All">All outcomes</option>
            {HISTORY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            aria-label="From date"
            className={riderInputClass}
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            aria-label="To date"
            className={riderInputClass}
          />
        </div>

        {isLoading && <LoadingState label="Loading history…" />}
        {isError && (
          <div className="p-5">
            <ErrorState message="We couldn't load your history." onRetry={refetch} />
          </div>
        )}
        {!isLoading && !isError && filtered.length === 0 && (
          <EmptyState
            icon={History}
            title="No history found"
            message="No completed or failed deliveries match these filters."
            action={
              <Button variant="secondary" onClick={clear}>
                Clear filters
              </Button>
            }
          />
        )}
        {!isLoading && !isError && filtered.length > 0 && (
          <DeliveryTable deliveries={filtered} showPickup caption="Completed and failed deliveries" />
        )}
      </RiderCard>
    </>
  )
}