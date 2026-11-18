import { Construction } from 'lucide-react'

export default function RiderPlaceholder({ title }: { title: string }) {
  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-8 text-center shadow-sm">
      <Construction aria-hidden="true" className="mx-auto size-10 text-orange-600" />
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm">This page is coming in a later stage. The sidebar link works.</p>
    </section>
  )
}