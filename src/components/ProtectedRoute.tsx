import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { HOME_BY_ROLE, type Role } from '../context/auth-context'

export default function ProtectedRoute({ allow }: { allow: Role[] }) {
  const { user } = useAuth()

  // Not logged in: go to login
  if (!user) return <Navigate to="/login" replace />

  // Logged in but wrong role: send them to THEIR dashboard
  if (!allow.includes(user.role)) return <Navigate to={HOME_BY_ROLE[user.role]} replace />

  // Allowed: show the page inside
  return <Outlet />
}