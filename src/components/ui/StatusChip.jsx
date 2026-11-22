import { getStatus } from '../../lib/statuses'

export default function StatusChip({ status, count, size = 'sm' }) {
  const s = getStatus(status)
  const Icon = s.icon
  const sizes = size === 'md' ? 'text-sm px-3.5 py-1.5' : 'text-xs px-2.5 py-1'

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizes} ${s.bg} ${s.ink}`}>
      <Icon size={size === 'md' ? 14 : 12} strokeWidth={2.2} aria-hidden="true" />
      {count !== undefined ? `${count} ${s.label.toLowerCase()}` : s.label}
    </span>
  )
}
