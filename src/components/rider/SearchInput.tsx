import { Search } from 'lucide-react'

type Props = { value: string; onChange: (value: string) => void; placeholder?: string }

export function SearchInput({ value, onChange, placeholder = 'Search…' }: Props) {
  return (
    <div className="relative w-full">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-600"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="block min-h-11 w-full rounded-md border border-ink-200 bg-white py-2 pl-9 pr-3 text-sm text-ink-600 placeholder:text-ink-600/60"
      />
    </div>
  )
}