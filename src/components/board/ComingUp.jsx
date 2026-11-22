import { CalendarClock, MessagesSquare, Coffee } from 'lucide-react'
import { daysUntil } from '../../lib/dates'

const inDays = (d) => (d === 0 ? 'today' : d === 1 ? 'tomorrow' : `in ${d} days`)

// The next things that need attention: interviews and deadlines in the coming two weeks.
export default function ComingUp({ applications }) {
  const items = applications
    .filter((a) => ['todo', 'applied', 'interview'].includes(a.status))
    .map((a) => ({ ...a, days: daysUntil(a.deadline) }))
    .filter((a) => a.days !== null && a.days >= 0 && a.days <= 14)
    .sort((a, b) => a.days - b.days)
    .slice(0, 3)

  return (
    <aside className="w-full rounded-[14px] border border-line bg-paper p-5 sm:w-80">
      <p className="mb-3 font-serif text-lg font-medium">
        Coming <span className="italic text-lavender">up</span>
      </p>

      {items.length === 0 ? (
        <div className="flex items-center gap-3 text-sm text-muted">
          <Coffee size={16} aria-hidden="true" />
          Nothing urgent. Enjoy the calm.
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((a) => {
            const isInterview = a.status === 'interview'
            const Icon = isInterview ? MessagesSquare : CalendarClock
            return (
              <li key={a.id} className="flex items-center gap-3 rounded-control bg-surface px-3 py-2.5">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    isInterview ? 'bg-interview text-interview-ink' : 'bg-todo text-todo-ink'
                  }`}
                >
                  <Icon size={15} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{a.company}</p>
                  <p className="text-xs text-muted">
                    {isInterview ? 'Interview' : 'Deadline'} {inDays(a.days)}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </aside>
  )
}
