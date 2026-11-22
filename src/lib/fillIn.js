import { extractDetails } from './extract'

const TIMEOUT_MS = 15000

// Ask the AI first. If it isn't set up, is slow or fails, fall back to the simple rules,
// so filling in always works (also in the free demo).
export async function fillInFromPosting(posting) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch('/api/extract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ posting }),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error('AI unavailable')
    const { details } = await res.json()
    const suggested = Object.keys(details).filter((k) => (Array.isArray(details[k]) ? details[k].length : details[k]))
    return { details, suggested, source: 'ai' }
  } catch {
    return { ...extractDetails(posting), source: 'rules' }
  } finally {
    clearTimeout(timer)
  }
}
