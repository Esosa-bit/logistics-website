import { createContext } from 'react'

export type Role = 'customer' | 'admin' | 'rider'
export type User = { id: number; name: string; role: Role }

export type AuthContextValue = {
  user: User | null // null = nobody logged in
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

// Where each role lands after login
export const HOME_BY_ROLE: Record<Role, string> = {
  customer: '/customer/dashboard',
  admin: '/admin/dashboard',
  rider: '/rider/dashboard',
}