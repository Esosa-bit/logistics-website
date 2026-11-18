import { useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRiderDeliveries } from '../../hooks/useRiderDeliveries'
import { withId } from '../../lib/riderRoutes'
import { riderInputClass } from '../../lib/riderStyles'
import { RiderCard } from './RiderCard'

type Props = { basePath: string; selectedId?: string }

export function DeliveryPicker({ basePath, selectedId }: Props) {
  const id = useId() // unique id that links the <label> to the <select>
  const navigate = useNavigate()
  const { data: deliveries = [], isLoading } = useRiderDeliveries()

  return (
    <RiderCard className="mb-6 p-4 sm:p-5">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-900">
        Choose a delivery
      </label>
      <select
        id={id}
        value={selectedId ?? ''}
        disabled={isLoading}
        onChange={(e) => e.target.value && navigate(withId(basePath, e.target.value))}
        className={riderInputClass}
      >
        <option value="">{isLoading ? 'Loading deliveries…' : 'Select a delivery…'}</option>
        {deliveries.map((d) => (
          <option key={d.id} value={d.id}>
            {d.id} – {d.customerName} ({d.status})
          </option>
        ))}
      </select>
    </RiderCard>
  )
}