import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { RiderSidebar } from './RiderSidebar'

type Props = { open: boolean; onClose: () => void; onLogout: () => void }

export function RiderMobileNav({ open, onClose, onLogout }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey) // cleanup
  }, [open, onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 lg:hidden',
        open ? 'visible' : 'invisible transition-[visibility] delay-300',
      )}
    >
      {/* Dark overlay: tapping it closes the drawer */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          'absolute inset-0 bg-navy-900/50 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />
      {/* The drawer itself */}
      <div
        className={cn(
          'absolute inset-y-0 left-0 w-72 max-w-[85%] transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute right-3 top-5 z-10 flex size-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
        <RiderSidebar onNavigate={onClose} onLogout={onLogout} />
      </div>
    </div>
  )
}