import { useState } from 'react'
import { ArrowLeft, LoaderCircle, PenLine, Wand2 } from 'lucide-react'
import Dialog from './ui/Dialog'
import Button from './ui/Button'
import { inputClass } from './ui/Field'
import ApplicationForm from './ApplicationForm'
import { EMPTY_APPLICATION as EMPTY } from '../lib/application'
import { Accent, Sparkle } from './ui/Decorations'
import { fillInFromPosting } from '../lib/fillIn'

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
  const [reading, setReading] = useState(false)
  const [source, setSource] = useState(null)

  const reset = () => {
    setStep('paste')
    setPosting('')
    setForm(EMPTY)
    setSuggested([])
    setError('')
    setReading(false)
    setSource(null)
  }

  const close = () => {
    onClose()
    setTimeout(reset, 220) // after the close animation, so the content doesn't jump while fading out
  }

  const fillIn = async () => {
    if (posting.trim().length < 40) {
      setError('Paste a bit more of the posting so there is something to read.')
      return
    }
    setReading(true)
    const { details, suggested, source } = await fillInFromPosting(posting)
    setReading(false)
    setForm({ ...EMPTY, ...details })
    setSuggested(suggested)
    setSource(source)
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
            readOnly={reading}
            placeholder="Paste the full job posting here"
            aria-label="Job posting"
            className={`${inputClass} mt-6 resize-none leading-relaxed transition-opacity ${reading ? 'opacity-50' : ''}`}
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
            <Button variant="primary" icon={reading ? undefined : Wand2} onClick={fillIn} aria-busy={reading}>
              {reading ? (
                <>
                  <LoaderCircle size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  Reading the posting
                </>
              ) : (
                'Fill in details'
              )}
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
            {suggested.length > 0 ? (
              <>
                <Sparkle className="mr-1.5 inline h-2.5 w-2.5 -translate-y-px text-lavender" />
                We filled these in from the posting. Give them a quick look.
                {source === 'rules' && <span className="block pl-4 text-xs">Demo mode: filled in with simple rules instead of AI.</span>}
              </>
            ) : posting ? (
              "We couldn't find much in this posting, so fill in what you know."
            ) : (
              'Fill in what you know. You can add more later.'
            )}
          </p>
          {missed?.length > 0 && suggested.length > 0 && (
            <p className="mt-1 text-sm text-interview-ink">We couldn't find the {missed.join(' or ')}, so add that yourself.</p>
          )}

          <div className="mt-6">
            <ApplicationForm form={form} update={update} suggested={suggested} />
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
