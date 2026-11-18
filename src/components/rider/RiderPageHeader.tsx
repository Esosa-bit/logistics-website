import type { ReactNode } from 'react'

type Props = { title: string; subtitle?: string; action?: ReactNode }

export function RiderPageHeader({ title, subtitle, action }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        <div className="mt-2 h-1 w-14 rounded-full bg-orange-500" aria-hidden="true" />
        {subtitle && <p className="mt-3 text-sm sm:text-base">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}