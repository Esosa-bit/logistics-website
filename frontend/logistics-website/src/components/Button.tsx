import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

export default function Button({
  loading = false,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading} // stops double-clicking while waiting
      className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white
                 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      {...rest}
    >
      <button className="rounded-lg bg-brand-orange px-4 py-2 font-semibold text-white hover:bg-brand-orange-dark">
        
      </button>
      {loading ? 'Please wait...' : children}
    </button>
  )
}