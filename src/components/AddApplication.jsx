import { useState } from 'react'
import { ArrowLeft, PenLine, Wand2 } from 'lucide-react'
import Dialog from './ui/Dialog'
import Button from './ui/Button'
import Field, { inputClass } from './ui/Field'
import SkillInput from './ui/SkillInput'
import { Accent } from './ui/Decorations'
import { extractDetails } from '../lib/extract'
import { STATUSES } from '../lib/statuses'

const EMPTY = { company: '', role: '', city: '', deadline: '', link: '', skills: [], notes: '', status: 'todo' }

const EXAMPLE = `UX/UI Design Intern (f/m/d)
Join Nordlicht Studio, a small design studio in Berlin building calm digital products.

What you'll do
- Design flows and interfaces in Figma, from wireframes to polished UI
- Run usability testing sessions with real users
- Work closely with our React developers on our design system

What you bring
- Studies in design, HCI or a related field
- Experience with Figma and prototyping
- Basic HTML and CSS is a plus
- Fluent English

Apply by 15 January 2027 at https://nordlicht.studio/jobs/ux-intern`

export default function AddApplication({ open, onClose, onSave }) {
  const [step, setStep] = useState('paste')
  const [posting, setPosting] = useState('')
  const [form, setForm] = useState(EMPTY)
  const [suggested, setSuggested] = useState([])
  const [error, setError] = useState('')

  const reset = () => {
    setStep('paste')
    setPosting('')
    setForm(EMPTY)
    setSuggested([])
    setError('')
  }

  const close = () => {
    reset()
    onClose()
  }

  const fillIn = () => {
    if (posting.trim().length < 40) {
      setError('Paste a bit more of the posting so there is something to read.')
      return
    }
    const { details, suggested } = extractDetails(posting)
    setForm({ ...EMPTY, ...details })
    setSuggested(suggested)
    setStep('form')
  }

  // Editing a field means you've checked it, so its "suggested" marker goes away.
  const update = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setSuggested((s) => s.filter((k) => k !== key))
    setError('')
  }

  const save = (e) => {
    e.preventDefault()
    if (!form.company.trim() || !form.role.trim()) {
      setError('Add at least a company and a role.')
      return
    }
    onSave({ ...form, id: crypto.randomUUID(), posting, createdAt: new Date().toISOString() })
    close()
  }

  const missed = step === 'form' && posting && ['company', 'role'].filter((k) => !form[k])

  return (
    <Dialog open={open} onClose={close} title="Add application">
      {step === 'paste' ? (
        <div>
          <h2 className="text-3xl">
            Add an <Accent>application</Accent>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Paste the job posting and we'll fill in the details. You check everything before it's saved.
          </p>

          <textarea
            value={posting}
            onChange={(e) => {
              setPosting(e.target.value)
              setError('')
            }}
            rows={9}
            placeholder="Paste the full job posting here"
            aria-label="Job posting"
            className={`${inputClass} mt-6 resize-none leading-relaxed`}
          />
          {error && <p className="mt-2 text-sm text-rejected-ink">{error}</p>}
          {!posting && (
            <button type="button" onClick={() => setPosting(EXAMPLE)} className="mt-2 text-sm text-lavender underline-offset-4 hover:underline">
              No posting at hand? Try an example
            </button>
          )}

          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Button variant="secondary" icon={PenLine} onClick={() => setStep('form')}>
              Fill in by hand
            </Button>
            <Button variant="primary" icon={Wand2} onClick={fillIn}>
              Fill in details
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={save} noValidate>
          <button
            type="button"
            onClick={() => setStep('paste')}
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={15} /> Back
          </button>
          <h2 className="text-3xl">
            Check the <Accent>details</Accent>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {suggested.length > 0
              ? `We filled in ${suggested.length} ${suggested.length === 1 ? 'field' : 'fields'}. Give them a quick look and fix anything that's off.`
              : posting
                ? "We couldn't find much in this posting, so fill in what you know."
                : 'Fill in what you know. You can add more later.'}
          </p>
          {missed?.length > 0 && suggested.length > 0 && (
            <p className="mt-2 text-sm text-interview-ink">We couldn't find the {missed.join(' or ')}, so add that yourself.</p>
          )}

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Company" htmlFor="company" suggested={suggested.includes('company')}>
              <input id="company" value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Nordlicht Studio" className={inputClass} />
            </Field>
            <Field label="Role" htmlFor="role" suggested={suggested.includes('role')}>
              <input id="role" value={form.role} onChange={(e) => update('role', e.target.value)} placeholder="UX/UI Design Intern" className={inputClass} />
            </Field>
            <Field label="City" htmlFor="city" suggested={suggested.includes('city')}>
              <input id="city" value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="Berlin" className={inputClass} />
            </Field>
            <Field label="Deadline" htmlFor="deadline" suggested={suggested.includes('deadline')}>
              <input id="deadline" type="date" value={form.deadline} onChange={(e) => update('deadline', e.target.value)} className={inputClass} />
            </Field>
            <Field label="Link" htmlFor="link" suggested={suggested.includes('link')} className="sm:col-span-2">
              <input id="link" type="url" value={form.link} onChange={(e) => update('link', e.target.value)} placeholder="https://company.com/jobs/ux-intern" className={inputClass} />
            </Field>
            <Field label="Skills they ask for" htmlFor="skills" suggested={suggested.includes('skills')} className="sm:col-span-2">
              <SkillInput id="skills" skills={form.skills} onChange={(v) => update('skills', v)} />
            </Field>
            <Field label="Status" htmlFor="status">
              <select id="status" value={form.status} onChange={(e) => update('status', e.target.value)} className={inputClass}>
                {STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Notes" htmlFor="notes" className="sm:col-span-2">
              <textarea id="notes" rows={3} value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Why this one? Who to contact? Anything to mention?" className={`${inputClass} resize-none`} />
            </Field>
          </div>

          {error && <p className="mt-4 text-sm text-rejected-ink">{error}</p>}

          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save application
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  )
}
