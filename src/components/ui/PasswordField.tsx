import { useId, useState, type ComponentProps } from 'react'
import { CircleAlert, Eye, EyeOff } from 'lucide-react'
import { cn } from '../../lib/cn'

type PasswordFieldProps = Omit<ComponentProps<'input'>, 'id' | 'type'> & {
  label: string
  error?: string
  hint?: string
}

export function PasswordField({ label, error, hint, className, ...inputProps }: PasswordFieldProps) {
  const id = useId()
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-900">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'block w-full rounded-md border bg-white py-2.5 pl-3 pr-12 text-base text-ink-600',
            error ? 'border-danger-700' : 'border-ink-200',
            className,
          )}
          {...inputProps}
        />
        <button
          type="button" // must NOT submit the form
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-md text-ink-600 hover:text-navy-900"
        >
          {visible ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
        </button>
      </div>

      {hint && (
        <p id={hintId} className="mt-1.5 text-sm text-ink-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger-700">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}