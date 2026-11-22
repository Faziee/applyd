import Dialog from './ui/Dialog'
import Button from './ui/Button'
import SkillInput from './ui/SkillInput'
import { Accent } from './ui/Decorations'

export default function SkillsDialog({ open, onClose, skills, onChange }) {
  return (
    <Dialog open={open} onClose={onClose} title="Your skills">
      <h2 className="text-3xl">
        Your <Accent>skills</Accent>
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        We compare these with what each job asks for, so you can see where you already fit and what to brush up on.
      </p>
      <div className="mt-6">
        <label htmlFor="my-skills" className="mb-1.5 block text-sm font-medium">
          Add a skill and press Enter
        </label>
        <SkillInput id="my-skills" skills={skills} onChange={onChange} />
      </div>
      <p className="mt-3 text-xs text-muted">{skills.length} skills · saved automatically</p>
      <div className="mt-6 flex justify-end">
        <Button variant="primary" onClick={onClose}>
          Done
        </Button>
      </div>
    </Dialog>
  )
}
