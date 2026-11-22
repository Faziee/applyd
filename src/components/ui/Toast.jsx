import { useEffect } from 'react'
import { Check } from 'lucide-react'

export default function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onDone, 3200)
    return () => clearTimeout(t)
  }, [message, onDone])

  if (!message) return null

  return (
    <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-[rise_220ms_cubic-bezier(0.2,0.8,0.2,1)]">
      <div className="flex items-center gap-2.5 rounded-full bg-ink py-2.5 pl-3 pr-5 text-sm text-white shadow-[0_12px_32px_rgb(46_42_51/0.25)]">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-offer text-offer-ink">
          <Check size={13} strokeWidth={2.5} />
        </span>
        {message}
      </div>
    </div>
  )
}
