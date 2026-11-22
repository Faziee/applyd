import Field, { inputClass } from './ui/Field'
import SkillInput from './ui/SkillInput'
import { STATUSES } from '../lib/statuses'

// The fields of an application, shared by "add" and "edit".
export default function ApplicationForm({ form, update, suggested = [] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
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
  )
}
