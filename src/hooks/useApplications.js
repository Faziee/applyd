import { useEffect, useState } from 'react'
import { sampleApplications } from '../lib/sampleData'

const STORAGE_KEY = 'applyd.applications'

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : sampleApplications
  } catch {
    return sampleApplications
  }
}

// All application data lives here and is saved in the browser.
export function useApplications() {
  const [applications, setApplications] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
    } catch {
      // Storage can be unavailable (private mode). The app still works, it just won't remember.
    }
  }, [applications])

  const moveTo = (id, status) =>
    setApplications((apps) => apps.map((a) => (a.id === id ? { ...a, status } : a)))

  return { applications, moveTo }
}
