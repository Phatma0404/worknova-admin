import { CheckCircle2, FolderPlus, UserCog, ClipboardList } from 'lucide-react'
import type { Activity, ActivityType } from '../types'

const ACTIVITY_CONFIG: Record<ActivityType, { icon: typeof CheckCircle2; className: string }> = {
  'completed-task':  { icon: CheckCircle2,  className: 'bg-emerald-500/10 text-emerald-400' },
  'created-project': { icon: FolderPlus,    className: 'bg-blue-500/10 text-blue-400' },
  'updated-profile': { icon: UserCog,       className: 'bg-violet-500/10 text-violet-400' },
  'assigned-task':   { icon: ClipboardList, className: 'bg-amber-500/10 text-amber-400' },
}

interface ActivityTimelineProps {
  activities: Activity[]
}

export default function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>

      <ol className="mt-5 flex flex-col">
        {activities.map((activity, index) => {
          const { icon: Icon, className } = ACTIVITY_CONFIG[activity.type]
          const isLast = index === activities.length - 1
          return (
            <li key={activity.id} className="relative flex gap-4 pb-6 last:pb-0">
              {/* Connector line */}
              {!isLast && (
                <span className="absolute left-4 top-9 -ml-px h-[calc(100%-1.5rem)] w-px bg-border" />
              )}

              {/* Icon node */}
              <div
                className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-card ${className}`}
              >
                <Icon className="size-4" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 pt-1">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{activity.description}</p>
                <p className="mt-1 text-[11px] text-muted-foreground/70">{activity.timestamp}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
