import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { PageContainer } from '../../components/layout/PageContainer'
import { AlertMessage } from '../../components/ui/AlertMessage'
import { Button } from '../../components/ui/button'
import { FormField } from '../../components/ui/FormField'
import { PasswordField } from '../../components/ui/PasswordField'
import { useAuth } from '../../context/useAuth'
import { HOME_BY_ROLE } from '../../context/auth-context'
import { login } from '../../services/api'
import { ROUTES } from '../../lib/routes'

const loginSchema = z.object({
    userType: z.enum(['customer', 'admin', 'rider']),
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .email('Enter a valid email address.'),
  password: z.string().min(1, 'Enter your password.'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userType: 'customer',
      email: '',
      password: '',
    },
  })

  const mutation = useMutation({
    mutationFn: async ({ userType, email, password }: LoginForm) => {
      const response = await login({ email, password })

      if (response.user.role !== userType) {
        throw new Error(
          `This account is not a ${userType} account. Please select the correct account type.`,
        )
      }

      return response
    },
    onSuccess: ({ user }) => {
      setUser(user)
      navigate(HOME_BY_ROLE[user.role], { replace: true })
    },
  })

  return (
    <PageContainer>
      <div className="mx-auto max-w-md">
        <h1 className="text-center text-3xl font-semibold">
          Welcome back
        </h1>

        <p className="mt-2 text-center">
          Log in to book deliveries and track your shipments.
        </p>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          noValidate
          className="mt-8 space-y-5 rounded-xl border border-ink-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label
              htmlFor="userType"
              className="mb-2 block text-sm font-medium"
            >
              Account type
            </label>

            <select
              id="userType"
              {...register('userType')}
              aria-invalid={Boolean(errors.userType)}
              aria-describedby={
                errors.userType ? 'userType-error' : undefined
              }
              className="w-full rounded-lg border border-ink-200 bg-white px-3 py-2 focus:border-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-700"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
                            <option value="rider">Rider</option>
            </select>

            {errors.userType && (
              <p
                id="userType-error"
                role="alert"
                className="mt-1 text-sm text-red-600"
              >
                {errors.userType.message}
              </p>
            )}
          </div>

          <FormField
            label="Email address"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <PasswordField
            label="Password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password')}
          />

          {mutation.isError && (
            <AlertMessage variant="error" title="Could not log in">
              {mutation.error instanceof Error
                ? mutation.error.message
                : 'Unable to log in. Please try again.'}
            </AlertMessage>
          )}

          <Button
            type="submit"
            loading={mutation.isPending}
            disabled={mutation.isPending}
            className="w-full"
          >
            {mutation.isPending ? 'Logging in…' : 'Log in'}
          </Button>

          <p className="text-center text-sm">
            <Link
              to={ROUTES.forgotPassword}
              className="font-medium text-navy-700 underline hover:text-navy-900"
            >
              Forgot password?
            </Link>
          </p>

          <p className="text-center text-sm">
            New here?{' '}
            <Link
              to={ROUTES.register}
              className="font-medium text-navy-700 underline hover:text-navy-900"
            >
              Create an account
            </Link>
          </p>
        </form>

        {/* <p className="mt-4 text-center text-xs">
          Demo accounts: Customer — test@example.com; Admin —
          admin@example.com (password: password123)
        </p> */}
      </div>
    </PageContainer>
  )
}