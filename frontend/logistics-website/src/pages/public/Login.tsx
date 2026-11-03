import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

// The rules
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  // Only "required" here. Strength rules belong on the Register page.
  password: z.string().min(1, 'Password is required'),
})

type LoginForm = z.infer<typeof loginSchema>

async function login(data: LoginForm) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const result = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(result?.message || 'Unable to log in. Please check your credentials.')
  }

  return result
}

export default function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => navigate('/'), // later: send each role to its own dashboard
  })

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-center text-2xl font-bold">Welcome back</h1>

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
        <InputField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />

        {mutation.isError && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {mutation.error.message}
          </p>
        )}

        <Button type="submit" loading={mutation.isPending}>
          Log in
        </Button>

        <p className="text-center text-sm">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </p>
      </form>
    </section>
  )
}