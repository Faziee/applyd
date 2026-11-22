import { Sparkle } from '../ui/Decorations'

const messages = {
  todo: ['No jobs saved', "Add a job you'd love to apply for."],
  applied: ['Nothing sent', "Drag a card here once you've applied."],
  interview: ['No interviews', 'Keep going. Drag a card here when you hear back.'],
  offer: ['No offers', 'Good news lands here. This column is waiting for you.'],
  rejected: ['Nothing here', "And if something lands here, it's just practice."],
}

export default function EmptyState({ status }) {
  const s = status
  const [title, body] = messages[s.id]
  const Icon = s.icon

  return (
    <div className="flex flex-col items-center rounded-[14px] border-2 border-dashed border-line px-4 py-7 text-center">
      <div className={`relative flex h-11 w-11 items-center justify-center rounded-full ${s.bg}`}>
        <Sparkle className="absolute -right-1 -top-1 h-3 w-3 text-lavender" />
        <Icon size={17} className={s.ink} aria-hidden="true" />
      </div>
      <p className="mt-3 font-serif text-base font-medium">
        {title} <span className="italic">yet</span>
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted">{body}</p>
    </div>
  )
}
