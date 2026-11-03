import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

async function requestPasswordReset(email: string) {
  const response = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    throw new Error('Unable to request a password reset')
  }
}

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
})
type ForgotForm = z.infer<typeof forgotSchema>

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({ resolver: zodResolver(forgotSchema) })

  const mutation = useMutation({
    mutationFn: (data: ForgotForm) => requestPasswordReset(data.email),
  })

  // After sending, show a confirmation instead of the form
  if (mutation.isSuccess) {
    return (
      <section className="mx-auto max-w-md px-4 py-12 text-center">
        <h1 className="mb-3 text-2xl font-bold">Check your email</h1>
        {/* Same message whether or not the account exists (security) */}
        <p className="mb-6 text-gray-600">
          If an account exists for that email, we've sent a link to reset your password.
        </p>
        <Link to="/login" className="text-blue-600 hover:underline">
          Back to login
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-2 text-center text-2xl font-bold">Forgot your password?</h1>
      <p className="mb-6 text-center text-gray-600">
        Enter your email and we'll send you a reset link.
      </p>

      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        noValidate
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <InputField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" loading={mutation.isPending}>
          Send reset link
        </Button>
        <p className="text-center text-sm">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </section>
  )
}