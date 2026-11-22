// "5 of 7 skills" with a small soft bar. Shown on cards when a job lists skills.
export default function MatchMeter({ match }) {
  if (!match.total) return null
  const pct = Math.round(match.ratio * 100)

  return (
    <div className="mt-3 flex items-center gap-2" title={`You have ${match.matched.length} of the ${match.total} skills this job asks for`}>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f1ede7]">
        <div className="h-full rounded-full bg-[#b9aee3] transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs tabular-nums text-muted">
        {match.matched.length} of {match.total} skills
      </span>
    </div>
  )
}
