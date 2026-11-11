import { useAuth } from '../../context/useAuth'

export default function AdminDashboard() {
  const { user } = useAuth()
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Admin dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome, {user?.name}</p>
    </section>
  )
}