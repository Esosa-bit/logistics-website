import { useState, type ReactNode } from 'react'
import { AuthContext, type User } from './auth-context'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}