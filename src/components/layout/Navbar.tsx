import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Truck, X } from 'lucide-react'
import { COMPANY_NAME } from '../../lib/constants'
import { NAV_LINKS, ROUTES } from '../../lib/routes'
import { PageContainer } from './PageContainer'

// NavLink tells us isActive. Active = bolder + lighter background (not colour alone).
const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm transition-colors',
    isActive ? 'bg-white/15 font-semibold text-white' : 'font-medium text-navy-100 hover:bg-white/10 hover:text-white',
  ].join(' ')

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="bg-navy-900">
      <PageContainer className="flex items-center justify-between py-3">
        <Link to={ROUTES.home} className="flex items-center gap-2 font-heading text-lg font-semibold text-white">
          <Truck aria-hidden="true" className="size-6" />
          {COMPANY_NAME}
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link to={ROUTES.login} className="ml-2 rounded-md px-3 py-2 text-sm font-medium text-navy-100 hover:bg-white/10 hover:text-white">
            Log in
          </Link>
          <Link to={ROUTES.register} className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700">
            Create account
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="rounded-md p-2 text-white hover:bg-white/10 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
        </button>
      </PageContainer>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-white/15 lg:hidden">
          <PageContainer className="flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} end className={linkClass} onClick={closeMenu}>
                {link.label}
              </NavLink>
            ))}
            <Link to={ROUTES.login} onClick={closeMenu} className="rounded-md px-3 py-2 text-sm font-medium text-navy-100 hover:bg-white/10 hover:text-white">
              Log in
            </Link>
            <Link to={ROUTES.register} onClick={closeMenu} className="mt-1 rounded-md bg-orange-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-orange-700">
              Create account
            </Link>
          </PageContainer>
        </nav>
      )}
    </header>
  )
}