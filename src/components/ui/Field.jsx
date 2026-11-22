import { Sparkle } from './Decorations'

export const inputClass =
  'w-full rounded-control border border-line bg-surface px-3.5 py-2.5 text-sm placeholder:text-muted/70 transition-colors focus:border-lavender-line focus:outline-none focus:ring-4 focus:ring-lavender-soft'

// A labelled form field. When `suggested` is true, the value was filled in for you
// and gets a gentle "check this" marker until you edit it.
export default function Field({ label, htmlFor, suggested = false, children, className = '' }) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </label>
        {suggested && (
          <span className="inline-flex items-center gap-1 text-xs text-lavender">
            <Sparkle className="h-2.5 w-2.5" />
            Suggested, check this
          </span>
        )}
      </div>
      <div className={suggested ? 'rounded-control ring-2 ring-lavender-soft' : ''}>{children}</div>
    </div>
  )
}
