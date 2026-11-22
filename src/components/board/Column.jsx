import { useDroppable } from '@dnd-kit/core'
import AppCard from './AppCard'
import EmptyState from './EmptyState'

export default function Column({ status, apps }) {
  const { setNodeRef, isOver } = useDroppable({ id: status.id })
  const Icon = status.icon

  return (
    <section
      ref={setNodeRef}
      aria-label={status.label}
      className={`flex w-64 shrink-0 flex-col rounded-card p-2.5 transition-colors duration-200 lg:w-auto lg:min-w-0 lg:flex-1 ${
        isOver ? 'bg-lavender-soft ring-2 ring-lavender-line' : 'bg-[#f4f1ec]'
      }`}
    >
      <header className="mb-3 flex items-center justify-between px-1.5 pt-1">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.bg} ${status.ink}`}>
          <Icon size={12} strokeWidth={2.2} aria-hidden="true" />
          {status.label}
        </span>
        <span className="text-xs tabular-nums text-muted">{apps.length}</span>
      </header>

      <div className="flex flex-1 flex-col gap-2.5">
        {apps.length === 0 ? <EmptyState status={status} /> : apps.map((app) => <AppCard key={app.id} app={app} />)}
      </div>
    </section>
  )
}
