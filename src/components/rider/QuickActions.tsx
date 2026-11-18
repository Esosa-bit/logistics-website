import { History, Package, RefreshCw, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RIDER_ROUTES } from '../../lib/riderRoutes'
import { riderButton } from '../../lib/riderStyles'
import { RiderCard } from './RiderCard'

type Action = { to: string; label: string; icon: LucideIcon; variant: 'primary' | 'accent' | 'outline' }

const actions: Action[] = [
  { to: RIDER_ROUTES.deliveries, label: 'View Assigned Deliveries', icon: Package, variant: 'primary' },
  { to: RIDER_ROUTES.status, label: 'Update Delivery Status', icon: RefreshCw, variant: 'accent' },
  { to: RIDER_ROUTES.history, label: 'View Delivery History', icon: History, variant: 'outline' },
]

export function QuickActions() {
  return (
    <RiderCard className="p-5">
      <h2 className="text-lg font-bold">Quick Actions</h2>
      <div className="mt-1 h-1 w-10 rounded-full bg-orange-500" aria-hidden="true" />
      <div className="mt-5 space-y-3">
        {actions.map(({ to, label, icon: Icon, variant }) => (
          <Link key={to} to={to} className={riderButton(variant, 'w-full justify-start gap-3 py-3')}>
            <Icon aria-hidden="true" className="size-5 shrink-0" />
            {label}
          </Link>
        ))}
      </div>
    </RiderCard>
  )
}