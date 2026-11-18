import { useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { RiderHeader } from '../rider/RiderHeader'
import { RiderMobileNav } from '../rider/RiderMobileNav'
import { RiderSidebar } from '../rider/RiderSidebar'
import { useAuth } from '../../context/useAuth'
import { ROUTES } from '../../lib/routes'

export default function RiderLayout() {
  const [menuOpen, setMenuOpen] = useState(false) // only matters below lg
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Stop the page behind the drawer from scrolling while it is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Frontend-only logout. Later: also call the backend to clear the session cookie.
  const handleLogout = () => {
    setUser(null)
    navigate(ROUTES.login, { replace: true })
  }

  return (
    <div className="min-h-screen">
      <a
        href="#rider-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900"
      >
        Skip to main content
      </a>

      {/* Desktop: fixed sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
        <RiderSidebar onLogout={handleLogout} />
      </aside>

      {/* Phones and tablets: slide-in drawer */}
      <RiderMobileNav open={menuOpen} onClose={closeMenu} onLogout={handleLogout} />

      <div className="min-w-0 lg:pl-64">
        <RiderHeader onMenuClick={() => setMenuOpen(true)} />
        <main id="rider-main" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}