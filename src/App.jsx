import { useCallback, useState } from 'react'
import Board from './components/board/Board'
import BoardHeader from './components/board/BoardHeader'
import TopBar from './components/TopBar'
import AddApplication from './components/AddApplication'
import ApplicationDetails from './components/ApplicationDetails'
import SkillsDialog from './components/SkillsDialog'
import Toast from './components/ui/Toast'
import Styleguide from './pages/Styleguide'
import { useApplications } from './hooks/useApplications'
import { useSkills } from './hooks/useSkills'
import { useName } from './hooks/useName'

export default function App() {
  const { applications, moveTo, add, update, remove, restore } = useApplications()
  const [mySkills, setMySkills] = useSkills()
  const [name, setName] = useName()
  const [editingSkills, setEditingSkills] = useState(false)
  const [search, setSearch] = useState('')
  const [adding, setAdding] = useState(false)
  const [openId, setOpenId] = useState(null)
  const [toast, setToast] = useState(null)
  const clearToast = useCallback(() => setToast(null), [])

  // The design system lives at /#styleguide
  if (window.location.hash === '#styleguide') return <Styleguide />

  // Every word has to match somewhere, so "berlin design" finds design roles in Berlin.
  const words = search.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const visible = applications.filter((a) => {
    const text = `${a.company} ${a.role} ${a.city}`.toLowerCase()
    return words.every((w) => text.includes(w))
  })

  const handleSave = (app) => {
    add(app)
    setSearch('')
    setToast({ message: `${app.company} is on your board` })
  }

  // Delete right away, but offer an undo instead of an "are you sure?" question.
  const handleDelete = (app) => {
    const index = applications.findIndex((a) => a.id === app.id)
    setOpenId(null)
    remove(app.id)
    setToast({ message: `${app.company} deleted`, action: { label: 'Undo', onClick: () => restore(app, index) } })
  }

  return (
    <div className="mx-auto max-w-7xl px-6 pb-16">
      <TopBar search={search} onSearch={setSearch} onAdd={() => setAdding(true)} onSkills={() => setEditingSkills(true)} name={name} />
      <BoardHeader applications={applications} name={name} onName={setName} />
      <Board applications={visible} onMove={moveTo} onOpen={setOpenId} mySkills={mySkills} searching={words.length > 0} />
      <AddApplication open={adding} onClose={() => setAdding(false)} onSave={handleSave} />
      <ApplicationDetails
        app={applications.find((a) => a.id === openId)}
        mySkills={mySkills}
        onClose={() => setOpenId(null)}
        onUpdate={update}
        onDelete={handleDelete}
      />
      <SkillsDialog open={editingSkills} onClose={() => setEditingSkills(false)} skills={mySkills} onChange={setMySkills} />
      <Toast toast={toast} onDone={clearToast} />
    </div>
  )
}
