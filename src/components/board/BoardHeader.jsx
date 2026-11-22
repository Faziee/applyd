import StatusChip from '../ui/StatusChip'
import { Accent, Blob } from '../ui/Decorations'
import ComingUp from './ComingUp'
import { greeting } from '../../lib/dates'

export default function BoardHeader({ applications }) {
  const count = (id) => applications.filter((a) => a.status === id).length
  const active = ['todo', 'applied', 'interview', 'offer'].filter((id) => count(id) > 0)

  return (
    <header className="relative mb-8 overflow-hidden rounded-card border border-line bg-surface px-6 py-8 shadow-soft sm:px-10 sm:py-10">
      <Blob className="pointer-events-none absolute -bottom-36 -left-24 h-72 -rotate-12 text-[#fdf0e8]" />
      <Blob className="pointer-events-none absolute -right-20 -top-24 h-72 rotate-[25deg] text-lavender-soft" />
      <div className="relative flex flex-wrap items-center justify-between gap-8">
        <div>
          <p className="text-sm text-muted">{greeting()}</p>
          <h1 className="mt-1 text-4xl sm:text-5xl">
            Your <Accent>applications</Accent>
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {active.map((id) => (
              <StatusChip key={id} status={id} count={count(id)} size="md" />
            ))}
          </div>
        </div>
        <ComingUp applications={applications} />
      </div>
    </header>
  )
}
