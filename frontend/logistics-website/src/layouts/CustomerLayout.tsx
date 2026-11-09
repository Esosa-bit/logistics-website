import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar, { type SidebarLink } from '../components/Sidebar'
import { useAuth } from '../context/useAuth'

const customerLinks: SidebarLink[] = [
  { to: '/customer/dashboard', label: 'Dashboard' },
  { to: '/customer/book', label: 'Book delivery' },
  { to: '/customer/shipments', label: 'My shipments' },
  { to: '/customer/profile', label: 'My profile' },
]

export default function CustomerLayout() {
  const { user, setUser } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false) // only matters on phones

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b-4 border-brand-orange bg-navy px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="rounded-lg border border-white px-2 py-1 text-white md:hidden"
          >
            ☰
          </button>
          <span className="text-xl font-bold text-white">
            Logi<span className="text-brand-orange">Track</span>
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-white sm:inline">{user?.name}</span>
          <button
            type="button"
            onClick={() => setUser(null)} // later: also call the backend to clear the cookie
            className="rounded-lg bg-brand-orange px-3 py-1.5 font-semibold text-white hover:bg-brand-orange-dark"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Hidden on phones until the ☰ button opens it; always visible from md up */}
        <aside
          className={`${menuOpen ? 'block' : 'hidden'} w-56 shrink-0 border-r-4 border-brand-orange bg-navy text-white md:block`}
        >
          <Sidebar links={customerLinks} onNavigate={() => setMenuOpen(false)} />
        </aside>

        <main className="flex-1 bg-white p-4 text-navy md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}