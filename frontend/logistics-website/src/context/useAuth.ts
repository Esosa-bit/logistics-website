import { useContext } from 'react'
import { AuthContext } from './auth-context'

export function useAuth() {
  const ctx = useContext(AuthContext)
  // Helpful error if someone forgets to wrap the app in AuthProvider
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}