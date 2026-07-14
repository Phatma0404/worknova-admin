import { CalendarClock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import ProgressBar from '@/features/projects/components/ProgressBar'
import type { ProjectStatus } from '@/features/projects/types'
import type { CustomerProjectSummary } from '../types'

const STATUS_STYLES: Record<ProjectStatus, { label: string; className: string }> = {
  planning: { label: 'Planning', className: 'bg-slate-500/10 text-slate-400 ring-slate-500/20' },
  'in-progress': { label: 'In Progress', className: 'bg-blue-500/10 text-blue-400 ring-blue-500/20' },
  review: { label: 'Review', className: 'bg-amber-500/10 text-amber-400 ring-amber-500/20' },
  completed: { label: 'Completed', className: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20' },
  'on-hold': { label: 'On Hold', className: 'bg-rose-500/10 text-rose-400 ring-rose-500/20' },
}

function formatDueDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function CustomerProjectsSection({ projects }: { projects: CustomerProjectSummary[] }) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <span className="text-xs text-muted-foreground">{projects.length} total</span>
      </CardHeader>
      <CardBody className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {projects.map((project) => {
          const status = STATUS_STYLES[project.status]
          return (
            <div
              key={project.id}
              className="rounded-xl border border-border p-4 transition-colors hover:border-primary/30"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="min-w-0 text-sm font-semibold text-foreground">{project.name}</h4>
                <span
                  className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${status.className}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium tabular-nums text-foreground">{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} />
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarClock className="size-3.5" />
                <span>Due {formatDueDate(project.dueDate)}</span>
              </div>
            </div>
          )
        })}
      </CardBody>
    </Card>
  )
}
