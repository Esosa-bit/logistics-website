import { LogOut, Truck } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { RIDER_NAV_ITEMS } from '../../lib/riderNav'

type Props = {
  onNavigate?: () => void // lets the mobile drawer close after a link is tapped
  onLogout: () => void
}

export function RiderSidebar({ onNavigate, onLogout }: Props) {
  return (
    <div className="flex h-full flex-col bg-navy-900 text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <span className="flex size-10 items-center justify-center rounded-xl bg-orange-600">
          <Truck aria-hidden="true" className="size-5" />
        </span>
        <div>
          <p className="font-heading text-lg font-bold leading-tight">Visionary</p>
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">Logistics</p>
        </div>
      </div>

      {/* Links, generated from the list in riderNav.ts */}
      <nav aria-label="Rider navigation" className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {RIDER_NAV_ITEMS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex min-h-11 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-orange-600 text-white shadow' : 'text-navy-100 hover:bg-white/10 hover:text-white',
              )
            }
          >
            <Icon aria-hidden="true" className="size-5 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout, pinned to the bottom */}
      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex min-h-11 w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-navy-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut aria-hidden="true" className="size-5" />
          Logout
        </button>
      </div>
    </div>
  )
}