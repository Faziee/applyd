import { useEffect } from 'react'
import { Check } from 'lucide-react'

// A small message at the bottom. Can carry one action, like "Undo".
export default function Toast({ toast, onDone }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onDone, toast.action ? 6000 : 3200)
    return () => clearTimeout(t)
  }, [toast, onDone])

  if (!toast) return null

  return (
    <div role="status" className="fixed left-1/2 top-4 z-[60] -translate-x-1/2 sm:bottom-6 sm:top-auto animate-[rise_220ms_cubic-bezier(0.2,0.8,0.2,1)]">
      <div className="flex items-center gap-2.5 rounded-full bg-ink py-2 pl-3 pr-2 text-sm text-white shadow-[0_12px_32px_rgb(46_42_51/0.25)]">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-offer text-offer-ink">
          <Check size={13} strokeWidth={2.5} />
        </span>
        <span className={toast.action ? '' : 'pr-3'}>{toast.message}</span>
        {toast.action && (
          <button
            onClick={() => {
              toast.action.onClick()
              onDone()
            }}
            className="rounded-full px-3 py-1 font-medium text-blush transition-colors hover:bg-white/10"
          >
            {toast.action.label}
          </button>
        )}
      </div>
    </div>
  )
}
