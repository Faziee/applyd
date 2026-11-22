import { Bookmark, Send, MessagesSquare, PartyPopper, CloudRain } from 'lucide-react'

// One place that defines every status: its label, pastel colors and icon.
// The board, chips and counters all read from this list.
export const STATUSES = [
  { id: 'todo', label: 'To apply', icon: Bookmark, bg: 'bg-todo', ink: 'text-todo-ink' },
  { id: 'applied', label: 'Applied', icon: Send, bg: 'bg-applied', ink: 'text-applied-ink' },
  { id: 'interview', label: 'Interview', icon: MessagesSquare, bg: 'bg-interview', ink: 'text-interview-ink' },
  { id: 'offer', label: 'Offer', icon: PartyPopper, bg: 'bg-offer', ink: 'text-offer-ink' },
  { id: 'rejected', label: 'Rejected', icon: CloudRain, bg: 'bg-rejected', ink: 'text-rejected-ink' },
]

export const getStatus = (id) => STATUSES.find((s) => s.id === id) ?? STATUSES[0]
