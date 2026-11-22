import Board from './components/board/Board'
import BoardHeader from './components/board/BoardHeader'
import Wordmark from './components/ui/Wordmark'
import Styleguide from './pages/Styleguide'
import { useApplications } from './hooks/useApplications'

export default function App() {
  const { applications, moveTo } = useApplications()

  // The design system lives at /#styleguide
  if (window.location.hash === '#styleguide') return <Styleguide />

  return (
    <div className="mx-auto max-w-7xl px-6 pb-16">
      <nav className="flex items-center justify-between py-6">
        <Wordmark />
      </nav>
      <BoardHeader applications={applications} onAdd={() => {}} />
      <Board applications={applications} onMove={moveTo} />
    </div>
  )
}
