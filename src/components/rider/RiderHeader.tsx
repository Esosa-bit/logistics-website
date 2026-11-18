import { useState, type FormEvent } from 'react'
import { Bell, Menu, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useRiderNotifications } from '../../hooks/useRiderNotifications'
import { useRiderProfile } from '../../hooks/useRiderProfile'
import { RIDER_ROUTES } from '../../lib/riderRoutes'
import { Avatar } from './Avatar'

export function RiderHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const navigate = useNavigate()
  const [term, setTerm] = useState('')
  const { data: rider } = useRiderProfile()
  const { data: notifications = [] } = useRiderNotifications()
  const unread = notifications.filter((n) => !n.read).length

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const q = term.trim()
    navigate(q ? `${RIDER_ROUTES.deliveries}?q=${encodeURIComponent(q)}` : RIDER_ROUTES.deliveries)
  }

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-ink-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex size-11 items-center justify-center rounded-xl text-navy-900 hover:bg-ink-50 lg:hidden"
      >
        <Menu aria-hidden="true" className="size-6" />
      </button>

      <form onSubmit={handleSearch} role="search" className="relative hidden max-w-md flex-1 sm:block">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-600"
        />
        <input
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search deliveries, customers, locations…"
          aria-label="Search deliveries"
          className="block min-h-11 w-full rounded-xl border border-ink-200 bg-ink-50 py-2 pl-9 pr-3 text-sm text-ink-600"
        />
      </form>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <Link
          to={RIDER_ROUTES.notifications}
          aria-label={`Notifications, ${unread} unread`}
          className="relative flex size-11 items-center justify-center rounded-xl text-navy-900 hover:bg-ink-50"
        >
          <Bell aria-hidden="true" className="size-5" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white">
              {unread}
            </span>
          )}
        </Link>

        <Link to={RIDER_ROUTES.profile} className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-ink-50">
          <Avatar name={rider?.fullName} src={rider?.avatarUrl} />
          <span className="hidden text-left md:block">
            <span className="block text-sm font-semibold leading-tight text-navy-900">
              {rider?.fullName ?? 'Rider'}
            </span>
            <span className="block text-xs">{rider?.id}</span>
          </span>
        </Link>
      </div>
    </header>
  )
}