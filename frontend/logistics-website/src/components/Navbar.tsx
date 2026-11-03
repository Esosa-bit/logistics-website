import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { HOME_BY_ROLE } from '../context/auth-context'

export default function Navbar() {
  const { user, setUser } = useAuth()

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-blue-600">LogiTrack</Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          {user ? (
            <>
              <Link to={HOME_BY_ROLE[user.role]} className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => setUser(null)} // later: also call the backend to clear the cookie
                className="rounded-lg border border-gray-300 px-3 py-1.5 hover:bg-gray-50"
              >
                Log out
              </button>
            </>
          ) : (
            <Link to="/login" className="rounded-lg bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}