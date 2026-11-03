import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-blue-600">
          LogiTrack
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link
            to="/login"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}