export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`rounded-card border border-line bg-surface p-5 shadow-soft ${className}`} {...props}>
      {children}
    </div>
  )
}
