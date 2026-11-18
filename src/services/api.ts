import type { User } from '../context/auth-context'

export interface LoginPayload {
  email: string
  password: string
}

const MOCK_USERS: { email: string; user: User }[] = [
  { email: 'test@example.com', user: { id: 1, name: 'Test Customer', role: 'customer' } },
  { email: 'admin@example.com', user: { id: 2, name: 'Test Admin', role: 'admin' } },
  { email: 'rider@example.com', user: { id: 3, name: 'Test Rider', role: 'rider' } },
]
export async function requestPasswordReset(email: string) {
  const response = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Failed to request password reset');
  }

  return response.json();
}
// MOCK: replace with a real POST /api/auth/login (credentials: 'include')
export async function login(payload: LoginPayload) {
  await wait(800)
  const found = MOCK_USERS.find((m) => m.email === payload.email)
  if (found && payload.password === 'password123') {
    return { user: found.user }
  }
  throw new Error('Invalid email or password') // vague on purpose
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
export type RegisterPayload = { name: string; email: string; password: string }

// MOCK: the real backend hashes the password, saves the user, and always assigns role 'customer'
export async function registerUser(payload: RegisterPayload) {
  await wait(800)
  if (payload.email === 'test@example.com') {
    throw new Error('Could not create the account. Try a different email or log in.')
  }
}
export async function resetPassword(payload: { token: string; password: string }) {
  await wait(800)
  if (payload.token === 'expired') {
    throw new Error('This reset link is invalid or has expired')
  }
}