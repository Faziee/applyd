// Vercel serverless function: reads a job posting with Gemini and returns structured details.
// The API key only lives on the server (environment variable), never in the browser.

const MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash'
const MAX_CHARS = 20000

const PROMPT = `You read job postings and pull out the facts. Reply with JSON only, in this exact shape:
{"company": string, "role": string, "city": string, "deadline": string, "link": string, "skills": string[]}

Rules:
- Only use information that is actually in the posting. Never guess or invent anything.
- If something isn't in the posting, use an empty string (or an empty array for skills).
- role: the job title without gender tags like (f/m/d).
- city: one city name in English, or "Remote".
- deadline: the application deadline as YYYY-MM-DD, only if a date is clearly stated.
- link: the application or job URL if one is in the text.
- skills: at most 10 short skill names the posting asks for (tools, languages, methods), as written in the posting.

Job posting:
"""
`

const clean = (v, max = 120) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export function sanitize(raw) {
  const deadline = clean(raw?.deadline, 10)
  const link = clean(raw?.link, 500)
  return {
    company: clean(raw?.company),
    role: clean(raw?.role),
    city: clean(raw?.city, 60),
    deadline: /^\d{4}-\d{2}-\d{2}$/.test(deadline) ? deadline : '',
    link: /^https?:\/\//.test(link) ? link : '',
    skills: Array.isArray(raw?.skills)
      ? [...new Set(raw.skills.map((s) => clean(s, 40)).filter(Boolean))].slice(0, 10)
      : [],
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' })

  const key = process.env.GEMINI_API_KEY
  if (!key) return res.status(503).json({ error: 'AI is not set up' })

  const posting = typeof req.body?.posting === 'string' ? req.body.posting.slice(0, MAX_CHARS) : ''
  if (posting.trim().length < 40) return res.status(400).json({ error: 'Posting is too short' })

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        contents: [{ parts: [{ text: PROMPT + posting + '\n"""' }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0 },
      }),
    })
    if (!response.ok) return res.status(502).json({ error: 'AI request failed' })

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}'
    return res.status(200).json({ details: sanitize(JSON.parse(text)) })
  } catch {
    return res.status(502).json({ error: 'AI request failed' })
  }
}
