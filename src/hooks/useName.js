import { useEffect, useState } from 'react'

const STORAGE_KEY = 'applyd.name'

// Your name is only kept in this browser, so a public demo never shows anyone's name.
export function useName() {
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? ''
    } catch {
      return ''
    }
  })

  useEffect(() => {
    try {
      if (name) localStorage.setItem(STORAGE_KEY, name)
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Storage unavailable: the name just won't be remembered.
    }
  }, [name])

  return [name, setName]
}
