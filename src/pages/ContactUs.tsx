import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { AlertMessage } from '../components/ui/AlertMessage'
import { Button } from '../components/ui/button'
import { FormField } from '../components/ui/FormField'
import { TextAreaField } from '../components/ui/TextAreaField'
import { COMPANY_CONTACT, COMPANY_NAME } from '../lib/constants'
import { contactSchema, MESSAGE_MAX_LENGTH, type ContactFormValues } from '../schemas/contact.schema'
import { sendContactMessage } from '../services/contact.service'

type SubmitStatus = 'success' | 'error' | null

const DETAILS = [
  { label: 'Phone', value: COMPANY_CONTACT.phone, icon: Phone },
  { label: 'Email', value: COMPANY_CONTACT.email, icon: Mail },
  { label: 'Address', value: COMPANY_CONTACT.address, icon: MapPin },
  { label: 'Opening hours', value: COMPANY_CONTACT.hours, icon: Clock },
] as const

export default function ContactUs() {
  const [status, setStatus] = useState<SubmitStatus>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: '', email: '', phone: '', subject: '', message: '' },
  })

  const messageLength = watch('message').length

  const onSubmit = async (values: ContactFormValues) => {
    setStatus(null)
    try {
      await sendContactMessage(values)
      setStatus('success') // shown only after the service succeeds
      reset() // clear the form
    } catch {
      setStatus('error') // keep what the person typed so they can retry
    }
  }

  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold sm:text-4xl">Contact us</h1>
      <p className="mt-3 max-w-prose">
        Questions about a booking, a delivery or our services? Send {COMPANY_NAME} a message and the team will reply by email.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        {/* Contact details (placeholders until the team supplies approved details) */}
        <section aria-labelledby="details-heading" className="lg:col-span-2">
          <h2 id="details-heading" className="text-xl font-semibold">
            Our details
          </h2>
          <dl className="mt-4 space-y-5">
            {DETAILS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex gap-3">
                <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-navy-700" />
                <div>
                  <dt className="text-sm font-medium text-navy-900">{label}</dt>
                  <dd>{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </section>

        {/* Form */}
        <section aria-labelledby="form-heading" className="lg:col-span-3">
          <h2 id="form-heading" className="text-xl font-semibold">
            Send us a message
          </h2>
          <p className="mt-1 text-sm">All fields are required.</p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5 space-y-5">
            <FormField
              label="Full name"
              autoComplete="name"
              error={errors.fullName?.message}
              {...register('fullName')}
            />
            <FormField
              label="Email address"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <FormField
              label="Phone number"
              type="tel"
              autoComplete="tel"
              hint="For example 08012345678 or +2348012345678."
              error={errors.phone?.message}
              {...register('phone')}
            />
            <FormField
              label="Subject"
              autoComplete="off"
              error={errors.subject?.message}
              {...register('subject')}
            />
            <TextAreaField
              label="Message"
              hint={`${messageLength} of ${MESSAGE_MAX_LENGTH} characters`}
              error={errors.message?.message}
              {...register('message')}
            />

            <Button type="submit" loading={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send message'}
            </Button>

            {status === 'success' && (
              <AlertMessage variant="success" title="Demo only: your message was not sent">
                The form works, but this version is not connected to a server, so no email was sent and nothing was saved.
              </AlertMessage>
            )}
            {status === 'error' && (
              <AlertMessage variant="error" title="Message not sent">
                Something went wrong. Check your connection and press Send message again. What you typed is still here.
              </AlertMessage>
            )}
          </form>
        </section>
      </div>
    </PageContainer>
  )
}