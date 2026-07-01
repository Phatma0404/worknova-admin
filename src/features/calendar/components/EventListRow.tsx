import { Clock } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { EVENT_TYPES } from '../constants'
import { formatTime, formatShortDate, parseISODate } from '../utils/date'
import type { CalendarEvent } from '../types'

interface EventListRowProps {
  event: CalendarEvent
  onClick: (event: CalendarEvent) => void
  showDate?: boolean
}

// Shared event row used by the Today's Schedule and Upcoming Events panels.
export default function EventListRow({ event, onClick, showDate = false }: EventListRowProps) {
  const cfg = EVENT_TYPES[event.type]
  const Icon = cfg.icon

  return (
    <button
      type="button"
      onClick={() => onClick(event)}
      className="flex w-full items-start gap-3 rounded-lg border border-border bg-background p-3 text-left transition-colors hover:border-primary/40 hover:bg-accent/40"
    >
      <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', cfg.iconWrapClass)}>
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{event.title}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3 shrink-0" />
          <span className="tabular-nums">{formatTime(event.time)}</span>
          {event.projectName && (
            <>
              <span className="text-muted-foreground/50">·</span>
              <span className="truncate">{event.projectName}</span>
            </>
          )}
        </p>
      </div>

      {showDate && (
        <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
          {formatShortDate(parseISODate(event.date))}
        </span>
      )}
    </button>
  )
}
