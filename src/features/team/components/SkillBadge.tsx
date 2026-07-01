function getColor(skill: string): string {
  const palettes = [
    'bg-violet-500/15 text-violet-400 ring-violet-500/20',
    'bg-blue-500/15 text-blue-400 ring-blue-500/20',
    'bg-emerald-500/15 text-emerald-400 ring-emerald-500/20',
    'bg-amber-500/15 text-amber-400 ring-amber-500/20',
    'bg-rose-500/15 text-rose-400 ring-rose-500/20',
    'bg-sky-500/15 text-sky-400 ring-sky-500/20',
    'bg-indigo-500/15 text-indigo-400 ring-indigo-500/20',
    'bg-teal-500/15 text-teal-400 ring-teal-500/20',
    'bg-orange-500/15 text-orange-400 ring-orange-500/20',
    'bg-pink-500/15 text-pink-400 ring-pink-500/20',
  ]
  let hash = 0
  for (let i = 0; i < skill.length; i++) hash = skill.charCodeAt(i) + ((hash << 5) - hash)
  return palettes[Math.abs(hash) % palettes.length]
}

export default function SkillBadge({ skill }: { skill: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${getColor(skill)}`}
    >
      {skill}
    </span>
  )
}
