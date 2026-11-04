import { useId, type ComponentProps } from 'react'
import { CircleAlert } from 'lucide-react'
import { cn } from '../../lib/cn'

type FormFieldProps = Omit<ComponentProps<'input'>, 'id'> & {
  label: string
  error?: string
  hint?: string
}

export function FormField({ label, error, hint, className, ...inputProps }: FormFieldProps) {
  const id = useId() // unique id links the label to the input
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-900">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          'block w-full rounded-md border bg-white px-3 py-2.5 text-base text-ink-600 placeholder:text-ink-600/60',
          error ? 'border-danger-700' : 'border-ink-200',
          className,
        )}
        {...inputProps}
      />
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