import { Plus, Search, Sparkles, X } from 'lucide-react'
import Button from './ui/Button'
import Wordmark from './ui/Wordmark'

export default function TopBar({ search, onSearch, onAdd, onSkills }) {
  return (
    <nav className="flex flex-wrap items-center gap-4 py-6">
      <Wordmark className="mr-auto" />

      <label className="relative order-last w-full sm:order-none sm:w-72">
        <span className="sr-only">Search applications</span>
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search company or role"
          className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-9 text-sm placeholder:text-muted/80 transition-colors focus:border-lavender-line focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted hover:text-ink"
          >
            <X size={14} />
          </button>
        )}
      </label>

      <Button variant="ghost" icon={Sparkles} onClick={onSkills}>
        Your skills
      </Button>

      <Button variant="primary" icon={Plus} onClick={onAdd}>
        Add application
      </Button>

      <span
        className="flex h-10 w-10 items-center justify-center rounded-full bg-interview font-serif text-base font-medium italic text-interview-ink"
        aria-label="You"
        role="img"
      >
        A
      </span>
    </nav>
  )
}
