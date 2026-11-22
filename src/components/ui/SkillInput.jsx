import { useState } from 'react'
import { X } from 'lucide-react'
import { inputClass } from './Field'

// Type a skill and press Enter (or comma) to add it as a chip.
export default function SkillInput({ id, skills, onChange }) {
  const [draft, setDraft] = useState('')

  const add = () => {
    const value = draft.trim().replace(/,$/, '')
    if (value && !skills.some((s) => s.toLowerCase() === value.toLowerCase())) onChange([...skills, value])
    setDraft('')
  }

  return (
    <div>
      {skills.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-lavender-soft py-1 pl-2.5 pr-1.5 text-xs text-todo-ink">
              {skill}
              <button
                type="button"
                onClick={() => onChange(skills.filter((s) => s !== skill))}
                aria-label={`Remove ${skill}`}
                className="rounded-full p-0.5 hover:bg-todo"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        id={id}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            add()
          }
        }}
        onBlur={add}
        placeholder="Figma, React, user research"
        className={inputClass}
      />
    </div>
  )
}
