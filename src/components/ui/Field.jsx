import { Sparkle } from './Decorations'

export const inputClass =
  'w-full rounded-control border border-line bg-surface px-3.5 py-2.5 text-sm placeholder:text-muted/70 transition-colors focus:border-lavender-line focus:outline-none focus:ring-4 focus:ring-lavender-soft'

// A labelled form field. When `suggested` is true, the value was filled in for you
// and gets a quiet sparkle next to the label until you edit it.
export default function Field({ label, htmlFor, suggested = false, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
        {label}
        {suggested && (
          <>
            <Sparkle className="h-2.5 w-2.5 text-lavender" />
            <span className="sr-only">(filled in from the posting)</span>
          </>
        )}
      </label>
      {children}
    </div>
  )
}
