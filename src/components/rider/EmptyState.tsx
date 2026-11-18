import type { ReactNode } from 'react'
import { Inbox, type LucideIcon } from 'lucide-react'

type Props = { icon?: LucideIcon; title: string; message?: string; action?: ReactNode }

export function EmptyState({ icon: Icon = Inbox, title, message, action }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-navy-100 text-navy-900">
        <Icon aria-hidden="true" className="size-6" />
      </span>
      <h2 className="text-base font-semibold">{title}</h2>
      {message && <p className="max-w-sm text-sm">{message}</p>}
      {action}
    </div>
  )
}