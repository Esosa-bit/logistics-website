import { CircleCheck, MousePointerClick } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { DeliveryPicker } from '../../components/rider/DeliveryPicker'
import { ProofOfDeliveryForm } from '../../components/rider/forms/ProofOfDeliveryForm'
import { EmptyState } from '../../components/rider/EmptyState'
import { ErrorState } from '../../components/rider/ErrorState'
import { LoadingState } from '../../components/rider/LoadingState'
import { ProofSummary } from '../../components/rider/ProofSummary'
import { RiderCard } from '../../components/rider/RiderCard'
import { RiderPageHeader } from '../../components/rider/RiderPageHeader'
import { useRiderDelivery } from '../../hooks/useRiderDeliveries'
import { RIDER_ROUTES } from '../../lib/riderRoutes'

export default function ProofOfDelivery() {
  const { id } = useParams()
  const { data: delivery, isLoading, isError, error, refetch } = useRiderDelivery(id)

  return (
    <>
      <RiderPageHeader title="Proof of Delivery" subtitle="Confirm who received the package and when." />
      <DeliveryPicker basePath={RIDER_ROUTES.proof} selectedId={id} />

      {!id && (
        <RiderCard>
          <EmptyState icon={MousePointerClick} title="Select a delivery" message="Choose the delivery you just completed." />
        </RiderCard>
      )}
      {id && isLoading && <LoadingState label="Loading delivery…" />}
      {id && isError && (
        <ErrorState message={error instanceof Error ? error.message : undefined} onRetry={refetch} />
      )}

      {/* Already delivered: show the saved proof, not the form */}
      {delivery && delivery.status === 'Delivered' && (
        <RiderCard className="p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-success-700">
            <CircleCheck aria-hidden="true" className="size-5" />
            <h2 className="text-lg font-bold text-success-700">{delivery.id} is delivered</h2>
          </div>
          {delivery.proof && <ProofSummary proof={delivery.proof} />}
          <p className="mt-4 text-xs">Demo mode: proof is stored in your browser session only.</p>
        </RiderCard>
      )}

      {/* Not delivered yet: show the form */}
      {delivery && delivery.status !== 'Delivered' && (
        <ProofOfDeliveryForm key={delivery.id} delivery={delivery} />
      )}
    </>
  )
}