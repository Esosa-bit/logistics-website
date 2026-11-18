import {
  Bell,
  FileSignature,
  FileText,
  History,
  LayoutDashboard,
  LifeBuoy,
  Package,
  RefreshCw,
  User,
  type LucideIcon,
} from 'lucide-react'
import { RIDER_ROUTES } from './riderRoutes'

export type RiderNavItem = { label: string; to: string; icon: LucideIcon }

export const RIDER_NAV_ITEMS: RiderNavItem[] = [
  { label: 'Dashboard', to: RIDER_ROUTES.dashboard, icon: LayoutDashboard },
  { label: 'My Assigned Deliveries', to: RIDER_ROUTES.deliveries, icon: Package },
  { label: 'Delivery Details', to: RIDER_ROUTES.details, icon: FileText },
  { label: 'Update Delivery Status', to: RIDER_ROUTES.status, icon: RefreshCw },
  { label: 'Proof of Delivery', to: RIDER_ROUTES.proof, icon: FileSignature },
  { label: 'Delivery History', to: RIDER_ROUTES.history, icon: History },
  { label: 'Notifications', to: RIDER_ROUTES.notifications, icon: Bell },
  { label: 'My Profile', to: RIDER_ROUTES.profile, icon: User },
  { label: 'Help & Support', to: RIDER_ROUTES.help, icon: LifeBuoy },
]