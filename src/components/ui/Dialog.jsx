import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

// A calm modal: soft overlay, closes on Escape or clicking outside, full height on phones.
export default function Dialog({ open, onClose, title, children }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('textarea, input')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-paper/90 backdrop-blur-md sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="animate-[rise_220ms_cubic-bezier(0.2,0.8,0.2,1)] max-h-[92vh] w-full overflow-y-auto rounded-t-card border border-line bg-surface p-6 shadow-[0_24px_64px_rgb(46_42_51/0.10)] sm:max-w-xl sm:rounded-card sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="float-right -mr-2 -mt-2 rounded-full p-2 text-muted transition-colors hover:bg-lavender-soft hover:text-ink"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  )
}
