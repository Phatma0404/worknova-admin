import { cn } from '@/shared/lib/utils'
import { EVENT_TYPES } from '../constants'
import { formatTime } from '../utils/date'
import type { CalendarEvent } from '../types'

interface EventBadgeProps {
  event: CalendarEvent
  onClick?: (event: CalendarEvent) => void
  showTime?: boolean
  className?: string
}

// Compact, color-coded pill used inside calendar cells. The category color makes
// projects / tasks / meetings / milestones instantly scannable across the grid.
export default function EventBadge({ event, onClick, showTime = false, className }: EventBadgeProps) {
  const cfg = EVENT_TYPES[event.type]

  return (
    <button
      type="button"
      title={`${formatTime(event.time)} - ${event.title}`}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(event)
      }}
      className={cn(
        'flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-xs ring-1 ring-inset transition-all hover:brightness-125',
        cfg.badgeClass,
        className,
      )}
    >
      <span className={cn('size-1.5 shrink-0 rounded-full', cfg.dotClass)} />
      {showTime && (
        <span className="shrink-0 font-medium tabular-nums opacity-80">{formatTime(event.time)}</span>
      )}
      <span className="truncate font-medium text-foreground/90">{event.title}</span>
    </button>
  )
}
