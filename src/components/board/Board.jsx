import { useState } from 'react'
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import Column from './Column'
import { CardContent } from './AppCard'
import { STATUSES } from '../../lib/statuses'

export default function Board({ applications, onMove, onOpen, mySkills, searching = false }) {
  const [activeId, setActiveId] = useState(null)
  const activeApp = applications.find((a) => a.id === activeId)

  // A small drag distance so a simple click doesn't start a drag.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { keyboardCodes: { start: ['Space'], cancel: ['Escape'], end: ['Space', 'Enter'] } }),
  )

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null)
    if (over && active.id) onMove(active.id, over.id)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-4 lg:mx-0 lg:overflow-visible lg:px-0">
        {STATUSES.map((status) => (
          <Column
            key={status.id}
            status={status}
            searching={searching}
            onOpen={onOpen}
            mySkills={mySkills}
            apps={applications.filter((a) => a.status === status.id)}
          />
        ))}
      </div>

      {/* The card you're dragging tilts slightly, like picking up a paper card. */}
      <DragOverlay dropAnimation={{ duration: 220, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
        {activeApp && (
          <div className="rotate-2 cursor-grabbing rounded-[14px] border border-lavender-line bg-surface p-4 shadow-[0_12px_32px_rgb(46_42_51/0.12)]">
            <CardContent app={activeApp} mySkills={mySkills} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  )
}
