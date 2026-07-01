import type { ProjectStatus } from '../types'

const CONFIG: Record<ProjectStatus, { label: string; className: string }> = {
  planning:    { label: 'Planning',    className: 'bg-slate-500/15 text-slate-400 ring-slate-500/20' },
  'in-progress': { label: 'In Progress', className: 'bg-blue-500/15 text-blue-400 ring-blue-500/20' },
  review:      { label: 'Review',      className: 'bg-amber-500/15 text-amber-400 ring-amber-500/20' },
  completed:   { label: 'Completed',   className: 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/20' },
  'on-hold':   { label: 'On Hold',     className: 'bg-rose-500/15 text-rose-400 ring-rose-500/20' },
}

export default function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const { label, className } = CONFIG[status]
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}>
      {label}
    </span>
  )
}
