const variants = {
  // Only one primary button per screen, for the main action.
  primary: 'bg-lavender text-white hover:bg-[#5d4f95] shadow-soft',
  secondary: 'bg-transparent text-lavender border border-lavender-line hover:bg-lavender-soft',
  ghost: 'bg-transparent text-muted hover:bg-lavender-soft hover:text-ink',
}

export default function Button({ variant = 'secondary', icon: Icon, children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-control px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2} aria-hidden="true" />}
      {children}
    </button>
  )
}
