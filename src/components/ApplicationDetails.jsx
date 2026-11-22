import { useState } from 'react'
import { CalendarClock, ChevronDown, ExternalLink, MapPin, PenLine, Trash2 } from 'lucide-react'
import Dialog from './ui/Dialog'
import Button from './ui/Button'
import ApplicationForm from './ApplicationForm'
import { STATUSES } from '../lib/statuses'
import { daysUntil, formatShortDate } from '../lib/dates'

function StatusPicker({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Status">
      {STATUSES.map((s) => {
        const Icon = s.icon
        const active = s.id === value
        return (
          <button
            key={s.id}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(s.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              active ? `${s.bg} ${s.ink} ring-2 ring-current/20` : 'bg-paper text-muted hover:bg-lavender-soft hover:text-ink'
            }`}
          >
            <Icon size={12} strokeWidth={2.2} aria-hidden="true" />
            {s.label}
          </button>
        )
      })}
    </div>
  )
}

function DetailRow({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <Icon size={15} className="shrink-0 text-muted" aria-hidden="true" />
      {children}
    </div>
  )
}

function View({ app, onStatus, onEdit, onDelete }) {
  const [showPosting, setShowPosting] = useState(false)
  const days = daysUntil(app.deadline)

  return (
    <div>
      <p className="text-sm text-muted">{app.company}</p>
      <h2 className="mt-1 pr-8 text-3xl leading-tight">{app.role}</h2>

      <div className="mt-5">
        <StatusPicker value={app.status} onChange={onStatus} />
      </div>

      <div className="mt-6 flex flex-col gap-2.5 rounded-[14px] border border-line bg-paper p-4">
        {app.city && <DetailRow icon={MapPin}>{app.city}</DetailRow>}
        {app.deadline && (
          <DetailRow icon={CalendarClock}>
            Deadline {formatShortDate(app.deadline)}
            {days !== null && days >= 0 && days <= 7 && (
              <span className="rounded-full bg-interview px-2 py-0.5 text-xs text-interview-ink">
                {days === 0 ? 'today' : `${days} days left`}
              </span>
            )}
          </DetailRow>
        )}
        {app.link && (
          <DetailRow icon={ExternalLink}>
            <a href={app.link} target="_blank" rel="noreferrer" className="truncate text-lavender underline-offset-4 hover:underline">
              Open job posting
            </a>
          </DetailRow>
        )}
        {!app.city && !app.deadline && !app.link && <p className="text-sm text-muted">No location, deadline or link yet.</p>}
      </div>

      {app.skills?.length > 0 && (
        <section className="mt-6">
          <h3 className="mb-2 font-sans text-sm font-medium tracking-normal">Skills they ask for</h3>
          <div className="flex flex-wrap gap-1.5">
            {app.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-lavender-soft px-2.5 py-1 text-xs text-todo-ink">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mt-6">
        <h3 className="mb-2 font-sans text-sm font-medium tracking-normal">Notes</h3>
        {app.notes ? (
          <p className="whitespace-pre-line text-sm leading-relaxed">{app.notes}</p>
        ) : (
          <button onClick={onEdit} className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
            Add a note
          </button>
        )}
      </section>

      {app.posting && (
        <section className="mt-6 border-t border-line pt-4">
          <button
            onClick={() => setShowPosting((v) => !v)}
            aria-expanded={showPosting}
            className="flex w-full items-center justify-between text-sm font-medium"
          >
            Original posting
            <ChevronDown size={16} className={`text-muted transition-transform duration-200 ${showPosting ? 'rotate-180' : ''}`} />
          </button>
          {showPosting && (
            <p className="mt-3 max-h-60 overflow-y-auto whitespace-pre-line rounded-control bg-paper p-3 text-xs leading-relaxed text-muted">
              {app.posting}
            </p>
          )}
        </section>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button variant="ghost" icon={Trash2} onClick={onDelete} className="hover:!bg-rejected hover:!text-rejected-ink">
          Delete
        </Button>
        <Button variant="secondary" icon={PenLine} onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  )
}

function Edit({ app, onSave, onCancel }) {
  const [form, setForm] = useState(app)
  const [error, setError] = useState('')
  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setError('')
  }

  const save = (e) => {
    e.preventDefault()
    if (!form.company.trim() || !form.role.trim()) {
      setError('Add at least a company and a role.')
      return
    }
    onSave(form)
  }

  return (
    <form onSubmit={save} noValidate>
      <p className="text-sm text-muted">{app.company}</p>
      <h2 className="mb-6 mt-1 text-3xl">Edit details</h2>
      <ApplicationForm form={form} update={update} />
      {error && <p className="mt-4 text-sm text-rejected-ink">{error}</p>}
      <div className="mt-6 flex justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save changes
        </Button>
      </div>
    </form>
  )
}

export default function ApplicationDetails({ app, onClose, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  // Keep showing the last application while the dialog fades out.
  const [shown, setShown] = useState(app)
  if (app && app !== shown) setShown(app)

  const close = () => {
    onClose()
    setTimeout(() => setEditing(false), 220)
  }

  return (
    <Dialog open={Boolean(app)} onClose={close} title={shown ? `${shown.company}, ${shown.role}` : 'Application'}>
      {shown &&
        (editing ? (
          <Edit
            key={shown.id}
            app={shown}
            onCancel={() => setEditing(false)}
            onSave={(changes) => {
              onUpdate(shown.id, changes)
              setEditing(false)
            }}
          />
        ) : (
          <View
            key={shown.id}
            app={shown}
            onStatus={(status) => onUpdate(shown.id, { status })}
            onEdit={() => setEditing(true)}
            onDelete={() => onDelete(shown)}
          />
        ))}
    </Dialog>
  )
}
