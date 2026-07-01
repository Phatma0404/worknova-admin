import type { TeamMember } from '../types'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Deterministic color from name - avoids random flicker on re-render
function getColor(name: string): string {
  const colors = [
    'bg-violet-500',
    'bg-blue-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-sky-500',
    'bg-indigo-500',
    'bg-teal-500',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

const MAX_VISIBLE = 3

interface TeamAvatarsProps {
  members: TeamMember[]
}

export default function TeamAvatars({ members }: TeamAvatarsProps) {
  const visible = members.slice(0, MAX_VISIBLE)
  const overflow = members.length - MAX_VISIBLE

  return (
    <div className="flex -space-x-2">
      {visible.map((member) => (
        <div
          key={member.id}
          title={member.name}
          className={`flex size-7 items-center justify-center rounded-full text-[10px] font-semibold text-white ring-2 ring-card ${getColor(member.name)}`}
        >
          {getInitials(member.name)}
        </div>
      ))}
      {overflow > 0 && (
        <div className="flex size-7 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground ring-2 ring-card">
          +{overflow}
        </div>
      )}
    </div>
  )
}
