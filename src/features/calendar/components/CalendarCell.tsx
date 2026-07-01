import { Plus } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import EventBadge from './EventBadge'
import { isToday } from '../utils/date'
import type { CalendarEvent, CalendarView } from '../types'

interface CalendarCellProps {
  date: Date
  events: CalendarEvent[]
  isCurrentMonth: boolean
  isSelected: boolean
  view: CalendarView
  onSelectDate: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
  onAddEvent: (date: Date) => void
}

export default function CalendarCell({
  date,
  events,
  isCurrentMonth,
  isSelected,
  view,
  onSelectDate,
  onEventClick,
  onAddEvent,
}: CalendarCellProps) {
  const today = isToday(date)
  const isWeek = view === 'week'
  const maxVisible = isWeek ? 12 : 3
  const visible = events.slice(0, maxVisible)
  const hiddenCount = events.length - visible.length

  return (
    <div
      onClick={() => onSelectDate(date)}
      className={cn(
        'group relative flex cursor-pointer flex-col gap-1 p-1.5 transition-colors',
        isWeek ? 'min-h-[24rem]' : 'min-h-24 sm:min-h-28',
        isCurrentMonth ? 'bg-card hover:bg-accent/40' : 'bg-muted/40 hover:bg-muted/60',
        isSelected && 'z-10 ring-2 ring-inset ring-primary',
      )}
    >
      {/* Day header: number + hover add button */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'flex size-6 items-center justify-center rounded-full text-xs font-semibold tabular-nums',
            today
              ? 'bg-primary text-primary-foreground'
              : isCurrentMonth
                ? 'text-foreground'
                : 'text-muted-foreground/40',
          )}
        >
          {date.getDate()}
        </span>

        <button
          type="button"
          title="Add event"
          onClick={(e) => {
            e.stopPropagation()
            onAddEvent(date)
          }}
          className="flex size-5 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-primary hover:text-primary-foreground group-hover:opacity-100"
        >
          <Plus className="size-3.5" />
        </button>
      </div>

      {/* Events */}
      <div className="flex flex-col gap-1">
        {visible.map((event) => (
          <EventBadge
            key={event.id}
            event={event}
            showTime={isWeek}
            onClick={onEventClick}
          />
        ))}
        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onSelectDate(date)
            }}
            className="px-1.5 text-left text-[11px] font-medium text-muted-foreground hover:text-foreground"
          >
            +{hiddenCount} more
          </button>
        )}
      </div>
    </div>
  )
}
