import { BellOff, SearchX } from 'lucide-react'

interface EmptyNotificationsProps {
  filtered?: boolean // true when filters/search hide all results (vs. a truly empty inbox)
}

export default function EmptyNotifications({ filtered = false }: EmptyNotificationsProps) {
  const Icon = filtered ? SearchX : BellOff

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="size-5" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-foreground">
          {filtered ? 'No matching notifications' : 'You\'re all caught up'}
        </p>
        <p className="max-w-sm text-sm text-muted-foreground">
          {filtered
            ? 'Try adjusting your search or filters to find what you\'re looking for.'
            : 'New notifications about tasks, projects and mentions will show up here.'}
        </p>
      </div>
    </div>
  )
}
