import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/layout/PageContainer'
import { AlertMessage } from '../../components/ui/AlertMessage'
import { Button } from '../../components/ui/button'
import { FormField } from '../../components/ui/FormField'
import { requestPasswordReset } from '../../services/api'
import { ROUTES } from '../../lib/routes'

const forgotSchema = z.object({
  email: z.string().trim().min(1, 'Enter your email address.').email('Enter a valid email address.'),
})
type ForgotForm = z.infer<typeof forgotSchema>

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: '' },
  })

  const mutation = useMutation({
    mutationFn: (data: ForgotForm) => requestPasswordReset(data.email),
  })

  if (mutation.isSuccess) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-3xl font-semibold">Check your email</h1>
          {/* Same message whether or not the account exists (security) */}
          <p className="mt-3">If an account exists for that email, we've sent a link to reset your password.</p>
          <Link to={ROUTES.login} className="mt-6 inline-block font-medium text-navy-700 underline hover:text-navy-900">
            Back to login
          </Link>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-md">
        <h1 className="text-center text-3xl font-semibold">Forgot your password?</h1>
        <p className="mt-2 text-center">Enter your email and we'll send you a reset link.</p>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          noValidate
          className="mt-8 space-y-5 rounded-xl border border-ink-200 bg-white p-6 shadow-sm"
        >
          <FormField
            label="Email address"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />

          {mutation.isError && (
            <AlertMessage variant="error" title="Could not send the link">
              Something went wrong. Check your connection and try again.
            </AlertMessage>
          )}

          <Button type="submit" loading={mutation.isPending} className="w-full">
            {mutation.isPending ? 'Sending…' : 'Send reset link'}
          </Button>

          <p className="text-center text-sm">
            <Link to={ROUTES.login} className="font-medium text-navy-700 underline hover:text-navy-900">
              Back to login
            </Link>
          </p>
        </form>
      </div>
    </PageContainer>
  )
}