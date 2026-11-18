import { useState, type ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera } from 'lucide-react'
import type { RiderProfile } from '../../../types/rider'
import { riderProfileSchema, type RiderProfileValues } from '../../../schemas/rider.schema'
import { useUpdateRiderProfile } from '../../../hooks/useRiderProfile'
import { AlertMessage } from '../../ui/AlertMessage'
import { Button } from '../../ui/button'
import { FormField } from '../../ui/FormField'
import { Avatar } from '../Avatar'

type Props = {
  rider: RiderProfile
  onDone: () => void // called after Save or Cancel, so the page can leave edit mode
}

export function ProfileForm({ rider, onDone }: Props) {
  const mutation = useUpdateRiderProfile()

  // The photo isn't a text field, so it lives in plain state
  const [photo, setPhoto] = useState<string | null>(rider.avatarUrl)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RiderProfileValues>({
    resolver: zodResolver(riderProfileSchema),
    defaultValues: { fullName: rider.fullName, email: rider.email, phone: rider.phone },
  })

  // Show the chosen photo immediately. createObjectURL makes a temporary
  // address for the file, and it only lasts for this browser session.
  // (A real upload comes with the backend.)
  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const chosen = e.target.files?.[0]
    if (chosen) setPhoto(URL.createObjectURL(chosen))
  }

  const onSubmit = (values: RiderProfileValues) => {
    mutation.mutate({ ...values, avatarUrl: photo }, { onSuccess: onDone })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="flex items-center gap-4">
        <Avatar name={rider.fullName} src={photo} sizeClass="size-20" textClass="text-2xl" />
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-navy-900 px-4 text-sm font-semibold text-navy-900 hover:bg-navy-100 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-navy-700">
          <Camera aria-hidden="true" className="size-4" /> Change photo
          <input type="file" accept="image/*" onChange={handlePhoto} className="sr-only" />
        </label>
      </div>

      {mutation.isError && (
        <AlertMessage variant="error" title="Could not save your profile">
          {mutation.error instanceof Error ? mutation.error.message : 'Please try again.'}
        </AlertMessage>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" autoComplete="name" error={errors.fullName?.message} {...register('fullName')} />

        {/* Shown but locked: disabled + readOnly, and NOT registered with the form */}
        <FormField
          label="Rider ID"
          value={rider.id}
          readOnly
          disabled
          hint="Assigned by dispatch. It cannot be changed."
        />

        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <FormField
          label="Phone number"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" loading={mutation.isPending}>
          {mutation.isPending ? 'Saving…' : 'Save changes'}
        </Button>
        <Button variant="secondary" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </form>
  )
}