// Rule-based extraction: finds details in a pasted job posting without AI.
// Used as the free demo mode, and as a fallback if the AI is unavailable.

const CITIES = [
  'Berlin', 'Dublin', 'Amsterdam', 'Rotterdam', 'Utrecht', 'Eindhoven', 'Leeuwarden', 'Groningen',
  'Munich', 'München', 'Hamburg', 'Cologne', 'Köln', 'Frankfurt', 'Düsseldorf', 'Stuttgart', 'Leipzig',
  'Lisbon', 'Porto', 'Barcelona', 'Madrid', 'Copenhagen', 'Stockholm', 'Oslo', 'Helsinki',
  'London', 'Manchester', 'Paris', 'Brussels', 'Vienna', 'Zurich', 'Prague', 'Warsaw', 'Remote',
]

const SKILLS = [
  'Figma', 'Sketch', 'Adobe XD', 'Adobe Creative Suite', 'Photoshop', 'Illustrator', 'InDesign', 'After Effects',
  'Prototyping', 'Wireframing', 'User research', 'Usability testing', 'Design systems', 'Accessibility',
  'Interaction design', 'Visual design', 'Typography', 'Branding',
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue', 'Angular', 'Svelte', 'Tailwind',
  'Node.js', 'Python', 'Java', 'Kotlin', 'Swift', 'C#', 'PHP', 'SQL', 'Git', 'REST', 'GraphQL',
  'Unity', 'Blender', 'Three.js', 'WordPress', 'English', 'German', 'Dutch',
]

const ROLE_WORDS = /\b(intern(ship)?|praktikum|working student|werkstudent|trainee|designer|developer|engineer|researcher)\b/i
const MONTHS = 'jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec'

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function findDeadline(text) {
  const near = /(deadline|apply by|apply before|closing date|bewerbungsfrist|until|bis)[^\n]{0,40}/i.exec(text)
  const scope = near ? near[0] : ''
  if (!scope) return ''

  const iso = /(\d{4})-(\d{2})-(\d{2})/.exec(scope)
  if (iso) return iso[0]

  const dotted = /(\d{1,2})[./](\d{1,2})[./](\d{4})/.exec(scope)
  if (dotted) return `${dotted[3]}-${dotted[2].padStart(2, '0')}-${dotted[1].padStart(2, '0')}`

  const written = new RegExp(`(\\d{1,2})(?:st|nd|rd|th)?\\s+(${MONTHS})[a-z]*\\.?,?\\s+(\\d{4})`, 'i').exec(scope)
  const writtenUS = new RegExp(`(${MONTHS})[a-z]*\\.?\\s+(\\d{1,2})(?:st|nd|rd|th)?,?\\s+(\\d{4})`, 'i').exec(scope)
  const m = written ? [written[1], written[2], written[3]] : writtenUS ? [writtenUS[2], writtenUS[1], writtenUS[3]] : null
  if (m) {
    const month = MONTHS.split('|').findIndex((mo) => m[1].toLowerCase().startsWith(mo.slice(0, 3))) + 1
    return `${m[2]}-${String(month).padStart(2, '0')}-${m[0].padStart(2, '0')}`
  }
  return ''
}

function findCompany(text) {
  const name = '([A-Z][\\w&.+-]*(?:[ \\t]+[A-Z][\\w&.+-]*){0,2})'
  const patterns = [
    new RegExp(`\\b[Jj]oin[ \\t]+${name}`),
    new RegExp(`\\b[Aa]bout[ \\t]+${name}\\b`),
    new RegExp(`\\bat[ \\t]+${name}(?:,|[ \\t]+we|[ \\t]+is|\\.)`),
    new RegExp(`^${name}[ \\t]+is[ \\t]+(?:a|an|the|looking|hiring|building)`, 'm'),
  ]
  for (const p of patterns) {
    const m = p.exec(text)
    if (m && !ROLE_WORDS.test(m[1]) && !/^(Us|Our|The|We|You)$/.test(m[1])) return m[1].trim()
  }
  return ''
}

export function extractDetails(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)

  const role = lines.find((l) => l.length < 90 && ROLE_WORDS.test(l))
    ?.replace(/^(job title|position|role)\s*[:-]\s*/i, '')
    .replace(/\s*\((?:[fmwdx]\s*\/\s*)+[fmwdx]\)\s*/i, ' ')
    .trim() ?? ''
  const city = CITIES.find((c) => new RegExp(`\\b${escape(c)}\\b`, 'i').test(text)) ?? ''
  const link = /(https?:\/\/[^\s)]+)/.exec(text)?.[1] ?? ''
  const skills = SKILLS.filter((s) => new RegExp(`(^|[^\\w])${escape(s)}($|[^\\w])`, 'i').test(text))

  const details = {
    company: findCompany(text),
    role,
    city: city === 'München' ? 'Munich' : city === 'Köln' ? 'Cologne' : city,
    deadline: findDeadline(text),
    link,
    skills,
  }

  // Which fields were filled in for you, so the form can ask you to check them.
  const suggested = Object.keys(details).filter((k) => (Array.isArray(details[k]) ? details[k].length : details[k]))
  return { details, suggested }
}
