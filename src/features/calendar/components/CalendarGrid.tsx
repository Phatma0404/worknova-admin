import CalendarCell from './CalendarCell'
import {
  getMonthGrid,
  getWeekGrid,
  toISODate,
  isSameDay,
  isSameMonth,
  weekdayLabels,
} from '../utils/date'
import type { CalendarEvent, CalendarView } from '../types'

interface CalendarGridProps {
  viewDate: Date
  view: CalendarView
  selectedDate: Date
  eventsByDate: Map<string, CalendarEvent[]>
  onSelectDate: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
  onAddEvent: (date: Date) => void
}

export default function CalendarGrid({
  viewDate,
  view,
  selectedDate,
  eventsByDate,
  onSelectDate,
  onEventClick,
  onAddEvent,
}: CalendarGridProps) {
  const days = view === 'month' ? getMonthGrid(viewDate) : getWeekGrid(viewDate)

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* Weekday header */}
      <div className="grid grid-cols-7 border-b border-border bg-muted/30">
        {weekdayLabels.map((label) => (
          <div
            key={label}
            className="px-2 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
          >
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.charAt(0)}</span>
          </div>
        ))}
      </div>

      {/* Day cells - gap-px over a border background paints the grid lines */}
      <div className="grid grid-cols-7 gap-px bg-border">
        {days.map((day) => {
          const events = eventsByDate.get(toISODate(day)) ?? []
          const isCurrentMonth = view === 'month' ? isSameMonth(day, viewDate) : true
          return (
            <CalendarCell
              key={toISODate(day)}
              date={day}
              events={events}
              isCurrentMonth={isCurrentMonth}
              isSelected={isSameDay(day, selectedDate)}
              view={view}
              onSelectDate={onSelectDate}
              onEventClick={onEventClick}
              onAddEvent={onAddEvent}
            />
          )
        })}
      </div>
    </div>
  )
}
