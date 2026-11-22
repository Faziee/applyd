import { useState } from 'react'
import { greeting } from '../../lib/dates'

// "Good evening, Sam". Without a name it gently offers to add one, right where it's shown.
export default function Greeting({ name, onName }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(name)

  const save = () => {
    onName(draft.trim().slice(0, 30))
    setEditing(false)
  }

  if (editing) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          save()
        }}
        className="flex items-center gap-2 text-sm text-muted"
      >
        {greeting()},
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === 'Escape' && setEditing(false)}
          placeholder="your name"
          aria-label="Your name"
          className="w-32 border-b border-lavender-line bg-transparent pb-0.5 text-ink outline-none placeholder:text-muted/70"
        />
      </form>
    )
  }

  return (
    <p className="text-sm text-muted">
      {greeting()}
      {name ? (
        <>
          ,{' '}
          <button
            onClick={() => {
              setDraft(name)
              setEditing(true)
            }}
            className="underline-offset-4 hover:text-ink hover:underline"
            title="Change your name"
          >
            {name}
          </button>
        </>
      ) : (
        <>
          {' · '}
          <button onClick={() => setEditing(true)} className="text-lavender underline-offset-4 hover:underline">
            What should we call you?
          </button>
        </>
      )}
    </p>
  )
}
