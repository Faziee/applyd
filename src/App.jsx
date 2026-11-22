import { useState } from 'react'
import Board from './components/board/Board'
import BoardHeader from './components/board/BoardHeader'
import TopBar from './components/TopBar'
import Styleguide from './pages/Styleguide'
import { useApplications } from './hooks/useApplications'

export default function App() {
  const { applications, moveTo } = useApplications()
  const [search, setSearch] = useState('')

  // The design system lives at /#styleguide
  if (window.location.hash === '#styleguide') return <Styleguide />

  // Every word has to match somewhere, so "berlin design" finds design roles in Berlin.
  const words = search.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const query = words.join(' ')
  const visible = applications.filter((a) => {
    const text = `${a.company} ${a.role} ${a.city}`.toLowerCase()
    return words.every((w) => text.includes(w))
  })

  return (
    <div className="mx-auto max-w-7xl px-6 pb-16">
      <TopBar search={search} onSearch={setSearch} onAdd={() => {}} />
      <BoardHeader applications={applications} />
      <Board applications={visible} onMove={moveTo} searching={Boolean(query)} />
    </div>
  )
}
