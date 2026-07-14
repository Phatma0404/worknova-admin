import { UserPlus, Mail, FolderPlus, Receipt, RefreshCw, StickyNote } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import type { CustomerActivity, CustomerActivityType } from '../types'

const ACTIVITY_CONFIG: Record<CustomerActivityType, { icon: typeof UserPlus; className: string }> = {
  created: { icon: UserPlus, className: 'bg-blue-500/10 text-blue-400' },
  'status-changed': { icon: RefreshCw, className: 'bg-violet-500/10 text-violet-400' },
  'note-added': { icon: StickyNote, className: 'bg-amber-500/10 text-amber-400' },
  'invoice-sent': { icon: Receipt, className: 'bg-emerald-500/10 text-emerald-400' },
  'project-started': { icon: FolderPlus, className: 'bg-sky-500/10 text-sky-400' },
  'email-sent': { icon: Mail, className: 'bg-rose-500/10 text-rose-400' },
}

export default function CustomerActivityTimeline({ activities }: { activities: CustomerActivity[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>
      <CardBody>
        <ol className="flex flex-col">
          {activities.map((activity, index) => {
            const { icon: Icon, className } = ACTIVITY_CONFIG[activity.type]
            const isLast = index === activities.length - 1
            return (
              <li key={activity.id} className="relative flex gap-4 pb-6 last:pb-0">
                {!isLast && (
                  <span className="absolute left-4 top-9 -ml-px h-[calc(100%-1.5rem)] w-px bg-border" />
                )}
                <div
                  className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-card ${className}`}
                >
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{activity.description}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground/70">{activity.timestamp}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </CardBody>
    </Card>
  )
}
