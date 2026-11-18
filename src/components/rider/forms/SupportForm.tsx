import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { supportSchema, type SupportValues } from '../../../schemas/rider.schema'
import { wait } from '../../../lib/wait'
import { AlertMessage } from '../../ui/AlertMessage'
import { Button } from '../../ui/button'
import { FormField } from '../../ui/FormField'
import { TextAreaField } from '../../ui/TextAreaField'

type Props = { defaultName?: string; defaultEmail?: string }

export function SupportForm({ defaultName = '', defaultEmail = '' }: Props) {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }, // isSubmitting is true while an async onSubmit runs
  } = useForm<SupportValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: { name: defaultName, email: defaultEmail, subject: '', message: '' },
  })

  // `async` lets us wait. Later this is where the real request goes.
  const onSubmit = async () => {
    await wait(700)
    setSent(true)
    // Clear subject and message, but keep the rider's name and email filled in
    reset({ name: defaultName, email: defaultEmail, subject: '', message: '' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {sent && (
        <AlertMessage variant="success" title="Form checked successfully">
          Demo mode: no message was actually sent. Once the backend exists, this will reach the support team.
        </AlertMessage>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Your name" autoComplete="name" error={errors.name?.message} {...register('name')} />
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>
      <FormField label="Subject" error={errors.subject?.message} {...register('subject')} />
      <TextAreaField label="Message" rows={4} error={errors.message?.message} {...register('message')} />

      <Button type="submit" loading={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}