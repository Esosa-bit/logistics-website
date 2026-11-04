import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { PageContainer } from '../components/layout/PageContainer'
import { AlertMessage } from '../components/ui/AlertMessage'
import { Button } from '../components/ui/button'
import { FormField } from '../components/ui/FormField'
import { PasswordField } from '../components/ui/PasswordField'
import { ROUTES } from '../lib/routes'
import { PASSWORD_MIN_LENGTH, registerSchema, type RegisterFormValues } from '../schemas/register.schema'
import { DuplicateEmailError, registerCustomer } from '../services/registration.service'

type SubmitStatus = 'success' | 'error' | null

export default function Register() {
  const [status, setStatus] = useState<SubmitStatus>(null)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', phone: '', password: '', confirmPassword: '' },
  })

  const onSubmit = async (values: RegisterFormValues) => {
    setStatus(null)

    // Build the payload by hand so confirmPassword can never be sent by accident.
    const payload = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      password: values.password,
    }

    try {
      await registerCustomer(payload)
      setStatus('success')
      reset() // also clears both password fields
    } catch (error) {
      if (error instanceof DuplicateEmailError) {
        // Attach the problem to the email field instead of showing a general error.
        setError('email', {
          type: 'server',
          message: 'We could not use this email address. Log in if you already have an account, or try a different email.',
        })
      } else {
        setStatus('error')
      }
    }
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">Create your account</h1>
        <p className="mt-3 max-w-prose">
          Register to book deliveries and follow your shipments from one place.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
          <FormField label="Full name" autoComplete="name" error={errors.fullName?.message} {...register('fullName')} />
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
          <PasswordField
            label="Password"
            autoComplete="new-password"
            hint={`Use at least ${PASSWORD_MIN_LENGTH} characters. A longer phrase is stronger than a short complicated one.`}
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordField
            label="Confirm password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" loading={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </Button>

          {status === 'success' && (
            <AlertMessage variant="success" title="Demo only: no account was created">
              The form works, but this version is not connected to a server, so nothing was saved and you are not logged in.
            </AlertMessage>
          )}
          {status === 'error' && (
            <AlertMessage variant="error" title="Account not created">
              Something went wrong. Check your connection and press Create account again.
            </AlertMessage>
          )}
        </form>

        <p className="mt-8">
          Already registered?{' '}
          <Link to={ROUTES.login} className="font-semibold text-navy-700 underline">
            Log in
          </Link>
        </p>
      </div>
    </PageContainer>
  )
}