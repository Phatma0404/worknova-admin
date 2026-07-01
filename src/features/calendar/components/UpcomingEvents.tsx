import { CalendarRange } from 'lucide-react'
import EventListRow from './EventListRow'
import { toISODate } from '../utils/date'
import type { CalendarEvent } from '../types'

interface UpcomingEventsProps {
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  limit?: number
}

export default function UpcomingEvents({ events, onEventClick, limit = 6 }: UpcomingEventsProps) {
  const todayISO = toISODate(new Date())
  const upcoming = events
    // Strictly future - today is already covered by the Today's Schedule panel.
    .filter((e) => e.date > todayISO)
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, limit)

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <CalendarRange className="size-4" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Upcoming Events</h3>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {upcoming.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-8 text-center">
            <p className="text-sm text-muted-foreground">No upcoming events</p>
            <p className="mt-0.5 text-xs text-muted-foreground/70">You're all caught up.</p>
          </div>
        ) : (
          upcoming.map((event) => (
            <EventListRow key={event.id} event={event} onClick={onEventClick} showDate />
          ))
        )}
      </div>
    </div>
  )
}
