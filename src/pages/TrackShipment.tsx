import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PageContainer } from '../components/layout/PageContainer'
import { ShipmentSummary } from '../components/tracking/ShipmentSummary'
import { TrackingTimeline } from '../components/tracking/TrackingTimeline'
import { AlertMessage } from '../components/ui/AlertMessage'
import { Button } from '../components/ui/button'
import { FormField } from '../components/ui/FormField'
import { Spinner } from '../components/ui/spinner'
import { trackingSchema, type TrackingFormValues } from '../schemas/tracking.schema'
import { trackShipment } from '../services/tracking.service'
import type { PublicShipment } from '../types/shipments'

// Everything the page can be showing after a search. null = nothing searched yet.
type Outcome =
  | { kind: 'found'; shipment: PublicShipment }
  | { kind: 'not_found'; trackingNumber: string }
  | { kind: 'error' }
  | null

export default function TrackShipment() {
  const [outcome, setOutcome] = useState<Outcome>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TrackingFormValues>({
    resolver: zodResolver(trackingSchema),
    defaultValues: { trackingNumber: '' },
  })

  // Runs ONLY when validation passes. isSubmitting stays true until this finishes.
  const onSubmit = async (values: TrackingFormValues) => {
    setOutcome(null) // clear the previous result
    try {
      const result = await trackShipment(values.trackingNumber)
      setOutcome(
        result.kind === 'found'
          ? { kind: 'found', shipment: result.shipment }
          : { kind: 'not_found', trackingNumber: values.trackingNumber },
      )
    } catch {
      setOutcome({ kind: 'error' })
    }
  }

  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold sm:text-4xl">Track your shipment</h1>
      <p className="mt-3 max-w-prose">Enter the tracking number from your booking confirmation to see where your shipment is.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 max-w-xl space-y-4">
        <FormField
          label="Tracking number"
          placeholder="VL-2026-00125"
          autoComplete="off"
          hint="Demo: try VL-2026-00125. Try VL-ERROR to see the error message."
          error={errors.trackingNumber?.message}
          {...register('trackingNumber')}
        />
        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? 'Checking…' : 'Track shipment'}
        </Button>
      </form>

      {/* Results area. aria-live tells screen readers when the content changes. */}
      <div aria-live="polite" className="mt-10 space-y-6">
        {isSubmitting && <Spinner label="Looking up your shipment…" className="size-5" />}

        {!isSubmitting && outcome === null && (
          <p className="rounded-lg border border-dashed border-ink-200 p-6 text-center">
            Your shipment details will appear here.
          </p>
        )}

        {outcome?.kind === 'found' && (
          <>
            <ShipmentSummary shipment={outcome.shipment} />
            <TrackingTimeline shipment={outcome.shipment} />
          </>
        )}

        {outcome?.kind === 'not_found' && (
          <AlertMessage variant="warning" title="Shipment not found">
            We could not find a shipment with the number “{outcome.trackingNumber}”. Check the number on your booking
            confirmation and try again.
          </AlertMessage>
        )}

        {outcome?.kind === 'error' && (
          <AlertMessage variant="error" title="Tracking is unavailable">
            We could not reach the tracking service. Check your internet connection and try again.
          </AlertMessage>
        )}
      </div>
    </PageContainer>
  )
}