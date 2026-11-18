import { useState } from 'react'
import { Bell, CheckCheck, PackagePlus, RefreshCw, TriangleAlert, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../../components/rider/EmptyState'
import { ErrorState } from '../../components/rider/ErrorState'
import { LoadingState } from '../../components/rider/LoadingState'
import { RiderCard } from '../../components/rider/RiderCard'
import { RiderPageHeader } from '../../components/rider/RiderPageHeader'
import { Button } from '../../components/ui/button'
import {
  useMarkAllNotificationsRead,
  useRiderNotifications,
  useSetNotificationRead,
} from '../../hooks/useRiderNotifications'
import { cn } from '../../lib/cn'
import { formatDateTime } from '../../lib/format'
import { RIDER_ROUTES, withId } from '../../lib/riderRoutes'
import type { RiderNotificationType } from '../../types/rider'

// One icon and colour per notification type
const typeStyles: Record<RiderNotificationType, { icon: LucideIcon; classes: string }> = {
  assignment: { icon: PackagePlus, classes: 'bg-navy-100 text-navy-900' },
  update: { icon: RefreshCw, classes: 'bg-sky-100 text-sky-700' },
  alert: { icon: TriangleAlert, classes: 'bg-orange-100 text-orange-700' },
}

type Filter = 'all' | 'unread'

export default function RiderNotifications() {
  const { data: notifications = [], isLoading, isError, refetch } = useRiderNotifications()
  const setRead = useSetNotificationRead()
  const markAll = useMarkAllNotificationsRead()
  const [filter, setFilter] = useState<Filter>('all')

  const unreadCount = notifications.filter((n) => !n.read).length
  const visible = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications

  return (
    <>
      <RiderPageHeader
        title="Notifications"
        subtitle={
          unreadCount
            ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}.`
            : "You're all caught up."
        }
        action={
          <Button
            variant="secondary"
            onClick={() => markAll.mutate()}
            disabled={unreadCount === 0}
            loading={markAll.isPending}
          >
            <CheckCheck aria-hidden="true" className="size-4" /> Mark all as read
          </Button>
        }
      />

      {/* All / Unread toggle. aria-pressed tells screen readers which one is on. */}
      <div
        role="group"
        aria-label="Filter notifications"
        className="mb-4 inline-flex rounded-xl border border-ink-200 bg-white p-1"
      >
        {(['all', 'unread'] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              'min-h-10 rounded-lg px-4 text-sm font-semibold capitalize transition-colors',
              filter === f ? 'bg-navy-900 text-white' : 'hover:bg-ink-50',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {isLoading && <LoadingState label="Loading notifications…" />}
      {isError && <ErrorState message="We couldn't load your notifications." onRetry={refetch} />}
      {!isLoading && !isError && visible.length === 0 && (
        <RiderCard>
          <EmptyState
            icon={Bell}
            title={filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            message="New assignments and updates will show up here."
          />
        </RiderCard>
      )}

      <ul className="space-y-3">
        {visible.map((n) => {
          const { icon: Icon, classes } = typeStyles[n.type]
          return (
            <li key={n.id}>
              <RiderCard className={cn('flex gap-4 p-4', !n.read && 'border-orange-200 bg-orange-50/50')}>
                <span className={cn('flex size-11 shrink-0 items-center justify-center rounded-full', classes)}>
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-base font-semibold">
                      {/* Unread: an orange dot for eyes, "Unread:" for screen readers */}
                      {!n.read && (
                        <>
                          <span aria-hidden="true" className="mr-2 inline-block size-2 rounded-full bg-orange-600" />
                          <span className="sr-only">Unread: </span>
                        </>
                      )}
                      {n.title}
                    </h2>
                    <time dateTime={n.time} className="shrink-0 text-xs">
                      {formatDateTime(n.time)}
                    </time>
                  </div>
                  <p className="mt-1 text-sm">{n.message}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 text-sm font-semibold">
                    {n.deliveryId && (
                      <Link
                        to={withId(RIDER_ROUTES.details, n.deliveryId)}
                        onClick={() => !n.read && setRead.mutate({ id: n.id, read: true })}
                        className="inline-flex min-h-11 items-center text-orange-600 hover:underline"
                      >
                        View delivery
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => setRead.mutate({ id: n.id, read: !n.read })}
                      className="inline-flex min-h-11 items-center text-navy-900 hover:underline"
                    >
                      Mark as {n.read ? 'unread' : 'read'}
                    </button>
                  </div>
                </div>
              </RiderCard>
            </li>
          )
        })}
      </ul>
    </>
  )
}