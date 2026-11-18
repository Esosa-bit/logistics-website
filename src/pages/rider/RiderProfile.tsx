import { useState } from 'react'
import { Bike, CalendarDays, Mail, MapPin, Pencil, Phone, type LucideIcon } from 'lucide-react'
import { Avatar } from '../../components/rider/Avatar'
import { ErrorState } from '../../components/rider/ErrorState'
import { LoadingState } from '../../components/rider/LoadingState'
import { ProfileForm } from '../../components/rider/forms/ProfileForm'
import { RiderCard } from '../../components/rider/RiderCard'
import { RiderPageHeader } from '../../components/rider/RiderPageHeader'
import { Button } from '../../components/ui/button'
import { useRiderProfile } from '../../hooks/useRiderProfile'
import { formatDate } from '../../lib/format'

// One label + value row with a circular icon
function Detail({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-100 text-navy-900">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide">{label}</p>
        <p className="break-words text-sm font-medium text-navy-900">{value}</p>
      </div>
    </div>
  )
}

export default function RiderProfile() {
  const { data: rider, isLoading, isError, refetch } = useRiderProfile()
  const [editing, setEditing] = useState(false) // view mode or edit mode

  return (
    <>
      <RiderPageHeader
        title="My Profile"
        subtitle="Your rider information."
        action={
          !editing && rider ? (
            <Button onClick={() => setEditing(true)}>
              <Pencil aria-hidden="true" className="size-4" /> Edit profile
            </Button>
          ) : undefined
        }
      />

      {isLoading && <LoadingState label="Loading profile…" />}
      {isError && <ErrorState message="We couldn't load your profile." onRetry={refetch} />}

      {rider && (
        <RiderCard className="p-5 sm:p-8">
          {editing ? (
            <ProfileForm rider={rider} onDone={() => setEditing(false)} />
          ) : (
            <>
              <div className="flex flex-col items-center gap-4 border-b border-ink-200 pb-6 text-center sm:flex-row sm:text-left">
                <Avatar name={rider.fullName} src={rider.avatarUrl} sizeClass="size-24" textClass="text-3xl" />
                <div>
                  <h2 className="text-xl font-bold">{rider.fullName}</h2>
                  <p className="text-sm">
                    Rider ID: <span className="font-semibold text-navy-900">{rider.id}</span>
                  </p>
                </div>
              </div>
              <div className="grid gap-5 pt-6 sm:grid-cols-2">
                <Detail icon={Mail} label="Email" value={rider.email} />
                <Detail icon={Phone} label="Phone" value={rider.phone} />
                <Detail icon={Bike} label="Vehicle" value={rider.vehicle} />
                <Detail icon={MapPin} label="Zone" value={rider.zone} />
                <Detail icon={CalendarDays} label="Joined" value={formatDate(rider.joined)} />
              </div>
              <p className="mt-6 text-xs">Demo mode: profile edits are kept in your browser session only.</p>
            </>
          )}
        </RiderCard>
      )}
    </>
  )
}