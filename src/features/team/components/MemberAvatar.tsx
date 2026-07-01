function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getColor(name: string): string {
  const colors = [
    'from-violet-500 to-purple-600',
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-sky-500 to-cyan-600',
    'from-indigo-500 to-violet-600',
    'from-teal-500 to-emerald-600',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

interface MemberAvatarProps {
  name: string
  size?: 'md' | 'lg' | 'xl'
  online?: boolean
}

const SIZE_CLASSES = {
  md: 'size-10 text-sm',
  lg: 'size-14 text-lg',
  xl: 'size-20 text-2xl',
}

const DOT_CLASSES = {
  md: 'size-2.5 bottom-0 right-0',
  lg: 'size-3 bottom-0.5 right-0.5',
  xl: 'size-3.5 bottom-1 right-1',
}

export default function MemberAvatar({ name, size = 'md', online }: MemberAvatarProps) {
  return (
    <div className="relative inline-flex shrink-0">
      <div
        className={`flex items-center justify-center rounded-full bg-gradient-to-br font-bold text-white ${getColor(name)} ${SIZE_CLASSES[size]}`}
      >
        {getInitials(name)}
      </div>
      {online !== undefined && (
        <span
          className={`absolute rounded-full ring-2 ring-card ${DOT_CLASSES[size]} ${online ? 'bg-emerald-500' : 'bg-slate-400'}`}
        />
      )}
    </div>
  )
}
