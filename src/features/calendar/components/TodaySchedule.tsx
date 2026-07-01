import { CalendarClock } from 'lucide-react'
import EventListRow from './EventListRow'
import { toISODate, formatLongDate } from '../utils/date'
import type { CalendarEvent } from '../types'

interface TodayScheduleProps {
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
}

export default function TodaySchedule({ events, onEventClick }: TodayScheduleProps) {
  const now = new Date()
  const todayISO = toISODate(now)
  const todays = events
    .filter((e) => e.date === todayISO)
    .sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <CalendarClock className="size-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Today's Schedule</h3>
          <p className="text-xs text-muted-foreground">{formatLongDate(now)}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {todays.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-8 text-center">
            <p className="text-sm text-muted-foreground">Nothing scheduled today</p>
            <p className="mt-0.5 text-xs text-muted-foreground/70">Enjoy the clear day.</p>
          </div>
        ) : (
          todays.map((event) => (
            <EventListRow key={event.id} event={event} onClick={onEventClick} />
          ))
        )}
      </div>
    </div>
  )
}
