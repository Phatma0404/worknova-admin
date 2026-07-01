import type { TaskPriority } from '../types'

const CONFIG: Record<TaskPriority, { label: string; className: string }> = {
  low:      { label: 'Low',      className: 'bg-slate-500/15 text-slate-400 ring-slate-500/20' },
  medium:   { label: 'Medium',   className: 'bg-amber-500/15 text-amber-400 ring-amber-500/20' },
  high:     { label: 'High',     className: 'bg-orange-500/15 text-orange-400 ring-orange-500/20' },
  critical: { label: 'Critical', className: 'bg-rose-500/15 text-rose-400 ring-rose-500/20' },
}

export default function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  const { label, className } = CONFIG[priority]
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}>
      {label}
    </span>
  )
}
