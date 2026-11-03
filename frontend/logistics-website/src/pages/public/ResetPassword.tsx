import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { resetPassword } from '../../services/api'

// ✏️ YOUR TURN: add a .refine() so confirmPassword must equal password.
// Hint: the error should appear under the confirmPassword field (use `path`).
const resetSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
})
type ResetForm = z.infer<typeof resetSchema>

export default function ResetPassword() {
  // Reads ?token=... from the URL
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({ resolver: zodResolver(resetSchema) })

  const mutation = useMutation({
    mutationFn: (data: ResetForm) =>
      resetPassword({ token: token ?? '', password: data.password }),
  })

  // No token in the URL: nothing to reset
  if (!token) {
    return (
      <section className="mx-auto max-w-md px-4 py-12 text-center">
        <h1 className="mb-3 text-2xl font-bold">Invalid link</h1>
        <p className="mb-6 text-gray-600">This reset link is missing or broken.</p>
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Request a new link
        </Link>
      </section>
    )
  }

  if (mutation.isSuccess) {
    return (
      <section className="mx-auto max-w-md px-4 py-12 text-center">
        <h1 className="mb-3 text-2xl font-bold">Password updated</h1>
        <p className="mb-6 text-gray-600">You can now log in with your new password.</p>
        <Link to="/login" className="text-blue-600 hover:underline">
          Go to login
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-center text-2xl font-bold">Set a new password</h1>

      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        noValidate
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <InputField
          id="password"
          label="New password"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <InputField
          id="confirmPassword"
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        {mutation.isError && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {mutation.error.message}
          </p>
        )}

        <Button type="submit" loading={mutation.isPending}>
          Update password
        </Button>
      </form>
    </section>
  )
}