// Example applications shown on first visit, so the board never starts empty.
const daysFromNow = (n) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

export const sampleApplications = [
  {
    id: 'sample-1',
    skills: ['Figma', 'Adobe Creative Suite', 'Typography', 'Branding', 'Prototyping'],
    company: 'Fernweh Labs',
    role: 'Experience Design Intern',
    city: 'Berlin',
    status: 'todo',
    deadline: daysFromNow(5),
    link: '',
    notes: 'Loves bold branding work. Show a typography project.',
  },
  {
    id: 'sample-2',
    skills: ['Figma', 'Prototyping', 'Design systems', 'Data visualisation'],
    company: 'Kaleido Studio',
    role: 'Product Designer Intern',
    city: 'Berlin',
    status: 'todo',
    deadline: daysFromNow(19),
    link: '',
    notes: 'They ask for a product I admire and why.',
  },
  {
    id: 'sample-3',
    skills: ['React', 'TypeScript', 'Next.js', 'Figma', 'CSS'],
    company: 'Mondlicht AI',
    role: 'Design Engineer',
    city: 'Berlin',
    status: 'todo',
    deadline: '',
    link: '',
    notes: 'No opening listed yet, so send an open application.',
  },
  {
    id: 'sample-4',
    skills: ['Figma', 'User research', 'Prototyping'],
    company: 'Atlas Maps',
    role: 'Product Design Intern',
    city: 'Berlin',
    status: 'applied',
    deadline: '',
    link: '',
    notes: '',
  },
  {
    id: 'sample-5',
    skills: ['Figma', 'Design systems', 'Usability testing', 'HTML', 'CSS'],
    company: 'Harbour & Co',
    role: 'UX/UI Design Intern',
    city: 'Dublin',
    status: 'applied',
    deadline: '',
    link: '',
    notes: '',
  },
  {
    id: 'sample-6',
    skills: ['Unity', 'C#', 'Git', 'Blender', 'VR'],
    company: 'Pixelgarten Games',
    role: 'Junior Game Developer',
    city: 'Berlin',
    status: 'interview',
    deadline: daysFromNow(2),
    link: '',
    notes: 'Interview on Thursday. Bring a game prototype to show.',
  },
]
