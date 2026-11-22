// The Applyd logo: the five status colours as rising steps, ending in the lavender dot (the offer).
// The steps use one shade deeper than the status pastels so the small mark stays visible.
export function LogoMark({ className = '' }) {
  return (
    <svg viewBox="0 0 78 70" className={className} aria-hidden="true">
      <rect x="2" y="50" width="12" height="18" rx="5" fill="#CFC7EC" />
      <rect x="17" y="40" width="12" height="28" rx="5" fill="#B5D4F4" />
      <rect x="32" y="29" width="12" height="39" rx="5" fill="#F5C4B3" />
      <rect x="47" y="17" width="12" height="51" rx="5" fill="#9FE1CB" />
      <circle cx="68" cy="9" r="7" fill="var(--color-lavender)" />
    </svg>
  )
}

export default function Wordmark({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="applyd">
      <LogoMark className="h-7 w-auto" />
      <span className="font-serif text-2xl font-medium tracking-tight" aria-hidden="true">
        applyd<span className="text-lavender">.</span>
      </span>
    </span>
  )
}
