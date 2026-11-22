import { Plus } from 'lucide-react'
import Button from '../ui/Button'
import StatusChip from '../ui/StatusChip'
import { Accent, Blob } from '../ui/Decorations'
import { greeting } from '../../lib/dates'

export default function BoardHeader({ applications, onAdd }) {
  const count = (id) => applications.filter((a) => a.status === id).length
  const active = ['todo', 'applied', 'interview', 'offer'].filter((id) => count(id) > 0)

  return (
    <header className="relative mb-8 overflow-hidden rounded-card border border-line bg-surface px-6 py-7 shadow-soft sm:px-8">
      <Blob className="pointer-events-none absolute -right-28 -top-28 h-80 rotate-[25deg] text-lavender-soft" />
      <div className="relative flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm text-muted">{greeting()}</p>
          <h1 className="mt-1 text-4xl sm:text-5xl">
            Your <Accent>applications</Accent>
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {active.map((id) => (
              <StatusChip key={id} status={id} count={count(id)} size="md" />
            ))}
          </div>
        </div>
        <Button variant="primary" icon={Plus} onClick={onAdd}>
          Add application
        </Button>
      </div>
    </header>
  )
}
