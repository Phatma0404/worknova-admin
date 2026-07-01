import type { TaskStatus } from '../types'

const CONFIG: Record<TaskStatus, { label: string; className: string }> = {
  todo:         { label: 'To Do',       className: 'bg-slate-500/15 text-slate-400 ring-slate-500/20' },
  'in-progress':{ label: 'In Progress', className: 'bg-blue-500/15 text-blue-400 ring-blue-500/20' },
  review:       { label: 'Review',      className: 'bg-amber-500/15 text-amber-400 ring-amber-500/20' },
  done:         { label: 'Done',        className: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/20' },
  blocked:      { label: 'Blocked',     className: 'bg-rose-500/15 text-rose-400 ring-rose-500/20' },
}

export default function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const { label, className } = CONFIG[status]
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}>
      {label}
    </span>
  )
}
