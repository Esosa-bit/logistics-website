import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { registerUser } from '../../services/api'

const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Enter your full name'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  // .refine runs AFTER the fields pass, and compares two fields together
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // show the error under THIS field
  })

type RegisterForm = z.infer<typeof registerSchema>

export default function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) })

  const mutation = useMutation({
    // Send ONLY name, email, password. Never confirmPassword, never a role.
    mutationFn: (data: RegisterForm) =>
      registerUser({ name: data.name, email: data.email, password: data.password }),
    onSuccess: () => navigate('/login'),
  })

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-center text-2xl font-bold">Create your account</h1>

      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        noValidate
        className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <InputField id="name" label="Full name" autoComplete="name"
          error={errors.name?.message} {...register('name')} />
        <InputField id="email" label="Email" type="email" autoComplete="email"
          error={errors.email?.message} {...register('email')} />
        <InputField id="password" label="Password" type="password" autoComplete="new-password"
          error={errors.password?.message} {...register('password')} />
        <InputField id="confirmPassword" label="Confirm password" type="password" autoComplete="new-password"
          error={errors.confirmPassword?.message} {...register('confirmPassword')} />

        {mutation.isError && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-navy-700">
            {mutation.error.message}
          </p>
        )}

        <Button type="submit" loading={mutation.isPending}>Create account</Button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </form>
    </section>
  )
}