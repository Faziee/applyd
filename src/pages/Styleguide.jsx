import { Plus, PenLine } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import StatusChip from '../components/ui/StatusChip'
import Wordmark from '../components/ui/Wordmark'
import { Accent, Blob, Sparkle } from '../components/ui/Decorations'
import { STATUSES } from '../lib/statuses'

const colors = [
  ['Paper', 'bg-paper border border-line', '#FAF8F5'],
  ['Ink', 'bg-ink', '#2E2A33'],
  ['Muted', 'bg-muted', '#7A7480'],
  ['Lavender', 'bg-lavender', '#6B5CA5'],
  ['Blush', 'bg-blush', '#F2B8C3'],
]

function Section({ title, children }) {
  return (
    <section className="mb-12">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">{title}</p>
      {children}
    </section>
  )
}

// A living reference of the design system. Every screen is built from these parts.
export default function Styleguide() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <header className="relative mb-14 overflow-hidden">
        <Blob className="absolute -right-16 -top-16 h-56 text-lavender-soft" />
        <div className="relative">
          <Wordmark />
          <h1 className="mt-6 text-5xl">
            Design <Accent>system</Accent>
          </h1>
          <p className="mt-4 max-w-md text-muted">
            Calm and warm. Pastels only show status, lavender is only for the main action.
          </p>
        </div>
      </header>

      <Section title="Colors">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {colors.map(([name, cls, hex]) => (
            <div key={name}>
              <div className={`h-16 rounded-control ${cls}`} />
              <p className="mt-2 text-sm font-medium">{name}</p>
              <p className="text-xs text-muted">{hex}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {STATUSES.map((s) => (
            <div key={s.id}>
              <div className={`h-10 rounded-control ${s.bg}`} />
              <p className={`mt-2 text-sm font-medium ${s.ink}`}>{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Type">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-4xl">
              Your <Accent>applications</Accent>
            </h2>
            <p className="mt-3 text-xs text-muted">Fraunces · headings, with italic accents</p>
          </div>
          <div>
            <p className="leading-relaxed">Paste a job posting and we'll fill in the details for you to check.</p>
            <p className="mt-3 text-xs text-muted">Inter · body and interface</p>
          </div>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" icon={Plus}>Add application</Button>
          <Button variant="secondary" icon={PenLine}>Fill in by hand</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
      </Section>

      <Section title="Status chips">
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <StatusChip key={s.id} status={s.id} />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <StatusChip status="todo" count={6} size="md" />
          <StatusChip status="applied" count={4} size="md" />
          <StatusChip status="interview" count={1} size="md" />
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">UX/UI Design Intern</p>
                <p className="text-sm text-muted">Fernweh Labs · Berlin</p>
              </div>
              <StatusChip status="interview" />
            </div>
          </Card>
          <div className="flex items-center gap-4 rounded-card border-2 border-dashed border-lavender-line p-5">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-interview">
              <Sparkle className="absolute -right-1 -top-1 h-3 w-3 text-lavender" />
              <PenLine size={18} className="text-interview-ink" aria-hidden="true" />
            </div>
            <div>
              <p className="font-serif text-lg font-medium">
                Nothing here <span className="italic">yet</span>
              </p>
              <p className="text-sm text-muted">Drag a card here when you hear back.</p>
            </div>
          </div>
        </div>
      </Section>
    </main>
  )
}
