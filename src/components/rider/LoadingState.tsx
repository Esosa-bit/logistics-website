import { Spinner } from '../ui/spinner'

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex justify-center py-16 text-navy-900">
      <Spinner label={label} className="size-6 text-orange-600" />
    </div>
  )
}