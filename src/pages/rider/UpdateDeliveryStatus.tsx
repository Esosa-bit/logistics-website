import { MousePointerClick } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { DeliveryPicker } from '../../components/rider/DeliveryPicker'
import { StatusUpdateForm } from '../../components/rider/forms/StatusUpdateForm'
import { EmptyState } from '../../components/rider/EmptyState'
import { ErrorState } from '../../components/rider/ErrorState'
import { LoadingState } from '../../components/rider/LoadingState'
import { RiderCard } from '../../components/rider/RiderCard'
import { RiderPageHeader } from '../../components/rider/RiderPageHeader'
import { useRiderDelivery } from '../../hooks/useRiderDeliveries'
import { RIDER_ROUTES } from '../../lib/riderRoutes'

export default function UpdateDeliveryStatus() {
  const { id } = useParams()
  const { data: delivery, isLoading, isError, error, refetch } = useRiderDelivery(id)

  return (
    <>
      <RiderPageHeader title="Update Delivery Status" subtitle="Record your progress as the delivery moves along." />
      <DeliveryPicker basePath={RIDER_ROUTES.status} selectedId={id} />

      {!id && (
        <RiderCard>
          <EmptyState icon={MousePointerClick} title="Select a delivery" message="Choose the delivery you want to update." />
        </RiderCard>
      )}
      {id && isLoading && <LoadingState label="Loading delivery…" />}
      {id && isError && (
        <ErrorState message={error instanceof Error ? error.message : undefined} onRetry={refetch} />
      )}
      {delivery && <StatusUpdateForm key={delivery.id} delivery={delivery} />}
    </>
  )
}