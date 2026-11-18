import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { RIDER_STATUSES, type RiderDelivery } from '../../../types/rider'
import { statusUpdateSchema, type StatusUpdateValues } from '../../../schemas/rider.schema'
import { useUpdateDeliveryStatus } from '../../../hooks/useRiderDeliveries'
import { RIDER_ROUTES, withId } from '../../../lib/riderRoutes'
import { AlertMessage } from '../../ui/AlertMessage'
import { Button } from '../../ui/button'
import { TextAreaField } from '../../ui/TextAreaField'
import { RiderCard } from '../RiderCard'
import { RiderStatusBadge } from '../RiderStatusBadge'

// This form receives an ALREADY LOADED delivery, so `defaultValues` can safely
// use delivery.status. (Setting defaults before the data exists is a classic bug.)
export function StatusUpdateForm({ delivery }: { delivery: RiderDelivery }) {
  const mutation = useUpdateDeliveryStatus()

  const {
    register, // connects an input to the form
    handleSubmit, // validates first, then runs our function
    reset, // puts the form back to given values
    control,
    formState: { errors },
  } = useForm<StatusUpdateValues>({
    resolver: zodResolver(statusUpdateSchema),
    defaultValues: { status: delivery.status, note: '' },
  })

  // useWatch re-renders this component whenever the chosen status changes
  const selected = useWatch({ control, name: 'status' })

  const onSubmit = (values: StatusUpdateValues) => {
    mutation.mutate(
      { id: delivery.id, ...values },
      { onSuccess: () => reset({ status: values.status, note: '' }) },
    )
  }

  return (
    <RiderCard className="p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-bold">{delivery.id}</h2>
        <span className="text-sm">Current status:</span>
        <RiderStatusBadge status={delivery.status} />
      </div>

      {mutation.isSuccess && (
        <AlertMessage variant="success" title={`Status updated to ${mutation.data.status}`} className="mb-5">
          Demo mode: this is saved in your browser session only. Nothing was sent to a server.
        </AlertMessage>
      )}
      {mutation.isError && (
        <AlertMessage variant="error" title="Could not update status" className="mb-5">
          {mutation.error instanceof Error ? mutation.error.message : 'Please try again.'}
        </AlertMessage>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-navy-900">New status</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {RIDER_STATUSES.map((status) => (
              <label
                key={status}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-ink-200 px-4 py-3 text-sm font-medium transition-colors hover:bg-ink-50 has-:checked:border-orange-600 has-:checked:bg-orange-50"
              >
                <input type="radio" value={status} {...register('status')} className="size-4 accent-orange-600" />
                {status}
              </label>
            ))}
          </div>
        </fieldset>

        {/* A helpful hint, shown only while "Delivered" is selected */}
        {selected === 'Delivered' && (
          <AlertMessage variant="info">
            To record who received the package, use{' '}
            <Link to={withId(RIDER_ROUTES.proof, delivery.id)} className="font-semibold underline">
              Proof of Delivery
            </Link>
            .
          </AlertMessage>
        )}

        <TextAreaField
          label={selected === 'Failed Delivery' ? 'Reason for failure (required)' : 'Note (optional)'}
          rows={3}
          placeholder="e.g. Customer asked for a later time."
          error={errors.note?.message}
          {...register('note')}
        />

        <Button type="submit" loading={mutation.isPending} className="w-full sm:w-auto">
          {mutation.isPending ? 'Saving…' : 'Update status'}
        </Button>
      </form>
    </RiderCard>
  )
}