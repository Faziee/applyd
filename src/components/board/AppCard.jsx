import { useDraggable } from '@dnd-kit/core'
import { CalendarClock, MapPin } from 'lucide-react'
import { daysUntil, formatShortDate } from '../../lib/dates'
import { matchSkills } from '../../lib/skills'
import MatchMeter from '../ui/MatchMeter'

function Deadline({ date }) {
  const days = daysUntil(date)
  if (days === null) return null

  // Soon deadlines get a gentle peach nudge instead of an alarming red.
  const soon = days >= 0 && days <= 7
  const label = days < 0 ? 'Deadline passed' : days === 0 ? 'Due today' : soon ? `${days} days left` : formatShortDate(date)

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
        soon ? 'bg-interview text-interview-ink' : 'text-muted'
      }`}
    >
      <CalendarClock size={12} aria-hidden="true" />
      {label}
    </span>
  )
}

export function CardContent({ app, mySkills = [] }) {
  return (
    <>
      <p className="font-medium leading-snug">{app.company}</p>
      <p className="mt-0.5 text-sm leading-snug text-muted">{app.role}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {app.city && (
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <MapPin size={12} aria-hidden="true" />
            {app.city}
          </span>
        )}
        <Deadline date={app.deadline} />
      </div>
      <MatchMeter match={matchSkills(app.skills, mySkills)} />
    </>
  )
}

export default function AppCard({ app, onOpen, mySkills }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: app.id })

  return (
    <article
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onOpen(app.id)}
      onKeyDown={(e) => {
        listeners.onKeyDown?.(e)
        if (e.key === 'Enter') onOpen(app.id)
      }}
      aria-label={`${app.company}, ${app.role}`}
      aria-roledescription="application card. Press Enter to open, Space to move"
      className={`cursor-grab touch-none rounded-[14px] border border-line bg-surface p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-lavender-line active:cursor-grabbing ${
        isDragging ? 'opacity-30' : ''
      }`}
    >
      <CardContent app={app} mySkills={mySkills} />
    </article>
  )
}
