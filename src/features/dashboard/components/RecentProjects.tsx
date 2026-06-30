import StatusBadge from './StatusBadge'
import { recentProjects } from '../constants'

// Recent projects list with a progress bar per row.
export default function RecentProjects() {
  return (
    <ul className="flex flex-col divide-y divide-border">
      {recentProjects.map((p) => (
        <li key={p.id} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-medium text-foreground">{p.name}</p>
              <p className="truncate text-xs text-muted-foreground">{p.client}</p>
            </div>
            <StatusBadge status={p.status} />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${p.progress}%` }} />
            </div>
            <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">
              {p.progress}%
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
