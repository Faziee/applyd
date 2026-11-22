// Skill matching: compares what a job asks for with the skills you have.

export const DEFAULT_SKILLS = ['Figma', 'HTML', 'CSS', 'JavaScript', 'React', 'Git']

// Different ways of writing the same skill.
const ALIASES = {
  javascript: ['js', 'es6', 'ecmascript'],
  typescript: ['ts'],
  react: ['react.js', 'reactjs'],
  'node.js': ['node', 'nodejs'],
  'next.js': ['next', 'nextjs'],
  tailwind: ['tailwind css', 'tailwindcss'],
  css: ['css3', 'html/css'],
  html: ['html5', 'html/css'],
  'c#': ['csharp', 'c sharp'],
  '.net': ['dotnet', 'asp.net'],
  'adobe creative suite': ['adobe', 'photoshop', 'illustrator', 'indesign', 'after effects', 'adobe xd', 'creative cloud'],
  git: ['github', 'gitlab', 'version control'],
  figma: ['figjam'],
}

const normalize = (s) => s.toLowerCase().trim()

// All the names a skill you have can show up as.
function namesFor(skill) {
  const n = normalize(skill)
  const names = new Set([n])
  for (const [main, alts] of Object.entries(ALIASES)) {
    if (main === n || alts.includes(n)) {
      names.add(main)
      alts.forEach((a) => names.add(a))
    }
  }
  return [...names]
}

// A dot doesn't count as a word break, so "js" doesn't match "Next.js".
function hasSkill(required, mySkills) {
  const r = normalize(required)
  return mySkills.some((mine) =>
    namesFor(mine).some((name) => r === name || new RegExp(`(^|[^a-z0-9.])${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^a-z0-9.])`).test(r)),
  )
}

export function matchSkills(required = [], mySkills = []) {
  const matched = required.filter((s) => hasSkill(s, mySkills))
  const missing = required.filter((s) => !hasSkill(s, mySkills))
  return { matched, missing, total: required.length, ratio: required.length ? matched.length / required.length : 0 }
}
