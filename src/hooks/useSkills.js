import { useEffect, useState } from 'react'
import { DEFAULT_SKILLS } from '../lib/skills'

const STORAGE_KEY = 'applyd.skills'

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : DEFAULT_SKILLS
  } catch {
    return DEFAULT_SKILLS
  }
}

export function useSkills() {
  const [skills, setSkills] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(skills))
    } catch {
      // Storage unavailable: skills just won't be remembered.
    }
  }, [skills])

  return [skills, setSkills]
}
