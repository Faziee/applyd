// Small hand-drawn touches that give the calm UI some warmth.

export function Squiggle({ className = '' }) {
  return (
    <svg viewBox="0 0 150 10" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M2 6 C30 2 60 9 90 5 C115 2 135 7 148 4"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Italic accent word with a soft squiggle underneath, used in headings.
export function Accent({ children }) {
  return (
    <span className="relative inline-block font-serif italic text-lavender">
      {children}
      <Squiggle className="absolute -bottom-1.5 left-0 h-2.5 w-full text-blush" />
    </span>
  )
}

export function Blob({ className = '' }) {
  return (
    <svg viewBox="0 0 220 160" className={className} aria-hidden="true">
      <path
        d="M60 20 C110 -10 190 10 200 60 C210 110 150 150 100 140 C40 130 10 60 60 20 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function Sparkle({ className = '' }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
      <path d="M6 0 L7.3 4.7 L12 6 L7.3 7.3 L6 12 L4.7 7.3 L0 6 L4.7 4.7 Z" fill="currentColor" />
    </svg>
  )
}
