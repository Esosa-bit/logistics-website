import { useState, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload } from 'lucide-react'
import type { RiderDelivery } from '../../../types/rider'
import { proofSchema, type ProofValues } from '../../../schemas/rider.schema'
import { useSubmitProof } from '../../../hooks/useRiderDeliveries'
import { nowForInput } from '../../../lib/riderDates'
import { AlertMessage } from '../../ui/AlertMessage'
import { Button } from '../../ui/button'
import { FormField } from '../../ui/FormField'
import { TextAreaField } from '../../ui/TextAreaField'
import { RiderCard } from '../RiderCard'
import { SignaturePad } from './SignaturePad'

const MAX_FILE_MB = 5

export function ProofOfDeliveryForm({ delivery }: { delivery: RiderDelivery }) {
  const mutation = useSubmitProof()

  // These two are NOT normal text inputs, so they live in plain useState
  const [signature, setSignature] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [proofError, setProofError] = useState('')

  // Passing a function means "run this ONCE", not on every render
  const [initialTime] = useState(nowForInput)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProofValues>({
    resolver: zodResolver(proofSchema),
    defaultValues: { recipientName: '', notes: '', deliveredAt: initialTime },
  })

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0]
    if (!chosen) {
      setFile(null)
      return
    }
    if (chosen.size > MAX_FILE_MB * 1024 * 1024) {
      setProofError(`That file is too large. The maximum size is ${MAX_FILE_MB}MB.`)
      e.target.value = '' // clear the rejected file from the input
      setFile(null)
      return
    }
    setProofError('')
    setFile(chosen)
  }

  const onSubmit = (values: ProofValues) => {
    // Our extra rule: at least ONE proof is required
    if (!signature && !file) {
      setProofError('Add a signature or upload a proof photo before submitting.')
      return
    }
    setProofError('')
    mutation.mutate({ id: delivery.id, ...values, signature, fileName: file?.name ?? null })
  }

  return (
    <RiderCard className="p-5 sm:p-6">
      <h2 className="text-lg font-bold">Confirm delivery for {delivery.id}</h2>
      <p className="mt-1 text-sm">
        Customer: {delivery.customerName} · {delivery.destination}
      </p>

      {mutation.isError && (
        <AlertMessage variant="error" title="Could not save proof" className="mt-4">
          {mutation.error instanceof Error ? mutation.error.message : 'Please try again.'}
        </AlertMessage>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Recipient name"
            placeholder="Who received the package?"
            error={errors.recipientName?.message}
            {...register('recipientName')}
          />
          <FormField
            label="Delivery date and time"
            type="datetime-local"
            error={errors.deliveredAt?.message}
            {...register('deliveredAt')}
          />
        </div>

        <TextAreaField
          label="Delivery confirmation notes"
          rows={3}
          placeholder="e.g. Package handed over in good condition."
          error={errors.notes?.message}
          {...register('notes')}
        />

        <div>
          <p className="mb-1.5 text-sm font-medium text-navy-900">Signature</p>
          <SignaturePad onChange={setSignature} />
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium text-navy-900">Or upload a proof photo</p>
          {/* The real file input is visually hidden; this label is the big tap target */}
          <label
            htmlFor="proof-file"
            className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-ink-200 px-4 py-3 text-sm hover:bg-ink-50 has-:focus-visible]:outline-3 has-:focus-visible:outline-navy-700"
          >
            <Upload aria-hidden="true" className="size-5 text-orange-600" />
            {file ? file.name : `Choose an image (max ${MAX_FILE_MB}MB)`}
            <input id="proof-file" type="file" accept="image/*" onChange={handleFile} className="sr-only" />
          </label>
        </div>

        {proofError && <AlertMessage variant="error">{proofError}</AlertMessage>}

        <Button type="submit" loading={mutation.isPending} className="w-full sm:w-auto">
          {mutation.isPending ? 'Saving…' : 'Submit proof of delivery'}
        </Button>
        <p className="text-xs">
          Demo mode: proof is stored in your browser session only and is not sent to a server.
        </p>
      </form>
    </RiderCard>
  )
}