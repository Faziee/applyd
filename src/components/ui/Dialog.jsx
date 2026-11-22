import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const DURATION = 200

// A calm modal: the page fades into a warm backdrop while the panel rises.
// Closing plays the same animation in reverse before it unmounts.
export default function Dialog({ open, onClose, title, children }) {
  const panelRef = useRef(null)
  const [mounted, setMounted] = useState(open)
  const [entered, setEntered] = useState(false)
  const visible = open && entered

  // Mount right away when opened (adjusting state during render, no extra effect needed).
  if (open && !mounted) setMounted(true)

  useEffect(() => {
    if (open) {
      // Wait one frame so the browser paints the start state, then animate in.
      let frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setEntered(true))
      })
      return () => cancelAnimationFrame(frame)
    }
    // Closed: play the exit animation, then unmount.
    const t = setTimeout(() => {
      setMounted(false)
      setEntered(false)
    }, DURATION)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!mounted) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('textarea, input')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mounted, onClose])

  if (!mounted) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-all duration-200 ease-out motion-reduce:transition-none sm:items-center sm:p-6 ${
        visible ? 'bg-paper/90 backdrop-blur-md' : 'bg-paper/0 backdrop-blur-none'
      }`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`max-h-[92vh] w-full overflow-y-auto rounded-t-card border border-line bg-surface p-6 shadow-[0_24px_64px_rgb(46_42_51/0.10)] transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none sm:max-w-xl sm:rounded-card sm:p-8 ${
          visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-[0.98] opacity-0'
        }`}
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
