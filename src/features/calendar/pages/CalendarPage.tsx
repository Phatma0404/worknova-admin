import { useMemo, useState } from 'react'
import { cn } from '@/shared/lib/utils'
import { useCalendar } from '../hooks/useCalendar'
import CalendarToolbar from '../components/CalendarToolbar'
import CalendarHeader from '../components/CalendarHeader'
import CalendarGrid from '../components/CalendarGrid'
import TodaySchedule from '../components/TodaySchedule'
import UpcomingEvents from '../components/UpcomingEvents'
import EventDialog from '../components/EventDialog'
import EventDetailsDialog from '../components/EventDetailsDialog'
import DeleteEventDialog from '../components/DeleteEventDialog'
import { MOCK_EVENTS, EVENT_TYPES, EVENT_TYPE_ORDER } from '../constants'
import { toISODate, parseISODate } from '../utils/date'
import type { CalendarEvent, EventDraft, EventTypeFilter } from '../types'

type DialogState =
  | { type: 'create'; date?: string }
  | { type: 'edit'; event: CalendarEvent }
  | { type: 'details'; event: CalendarEvent }
  | { type: 'delete'; event: CalendarEvent }
  | null

export default function CalendarPage() {
  const {
    viewDate,
    view,
    selectedDate,
    setView,
    goPrev,
    goNext,
    goToday,
    goToDate,
  } = useCalendar()

  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<EventTypeFilter>('all')
  const [dialog, setDialog] = useState<DialogState>(null)

  // Search + type filter applied globally (grid and both side panels).
  const filteredEvents = useMemo(() => {
    const q = search.trim().toLowerCase()
    return events.filter((e) => {
      const matchesType = typeFilter === 'all' || e.type === typeFilter
      if (!matchesType) return false
      if (q === '') return true
      return (
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        (e.projectName?.toLowerCase().includes(q) ?? false) ||
        e.attendees.some((a) => a.toLowerCase().includes(q)) ||
        EVENT_TYPES[e.type].label.toLowerCase().includes(q)
      )
    })
  }, [events, search, typeFilter])

  // Group filtered events by ISO date, each day's list sorted by time.
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>()
    for (const event of filteredEvents) {
      const list = map.get(event.date)
      if (list) list.push(event)
      else map.set(event.date, [event])
    }
    for (const list of map.values()) list.sort((a, b) => a.time.localeCompare(b.time))
    return map
  }, [filteredEvents])

  // --- CRUD ---
  const handleSubmitEvent = (draft: EventDraft, id?: string) => {
    if (id) {
      setEvents((prev) => prev.map((e) => (e.id === id ? { ...draft, id } : e)))
    } else {
      setEvents((prev) => [...prev, { ...draft, id: `ev-${Date.now()}` }])
    }
    goToDate(parseISODate(draft.date)) // surface the saved event
    setDialog(null)
  }

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
    setDialog(null)
  }

  const openCreate = (date?: Date) =>
    setDialog({ type: 'create', date: toISODate(date ?? selectedDate) })

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Calendar</h1>
        <p className="text-sm text-muted-foreground">
          Plan deadlines, meetings, sprints and milestones across every project.
        </p>
      </div>

      {/* Toolbar */}
      <CalendarToolbar
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        view={view}
        onViewChange={setView}
        onAddEvent={() => openCreate()}
      />

      {/* Category legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Categories
        </span>
        {EVENT_TYPE_ORDER.map((type) => (
          <span key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={cn('size-2.5 rounded-full', EVENT_TYPES[type].dotClass)} />
            {EVENT_TYPES[type].label}
          </span>
        ))}
      </div>

      {/* Main: calendar + side panels */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex flex-col gap-4">
          <CalendarHeader
            viewDate={viewDate}
            view={view}
            onPrev={goPrev}
            onNext={goNext}
            onToday={goToday}
            onPickDate={goToDate}
          />
          <CalendarGrid
            viewDate={viewDate}
            view={view}
            selectedDate={selectedDate}
            eventsByDate={eventsByDate}
            onSelectDate={goToDate}
            onEventClick={(event) => setDialog({ type: 'details', event })}
            onAddEvent={openCreate}
          />
        </div>

        <div className="flex flex-col gap-4">
          <TodaySchedule
            events={filteredEvents}
            onEventClick={(event) => setDialog({ type: 'details', event })}
          />
          <UpcomingEvents
            events={filteredEvents}
            onEventClick={(event) => setDialog({ type: 'details', event })}
          />
        </div>
      </div>

      {/* Dialogs */}
      {(dialog?.type === 'create' || dialog?.type === 'edit') && (
        <EventDialog
          event={dialog.type === 'edit' ? dialog.event : undefined}
          defaultDate={dialog.type === 'create' ? dialog.date : undefined}
          onClose={() => setDialog(null)}
          onSubmit={handleSubmitEvent}
        />
      )}
      {dialog?.type === 'details' && (
        <EventDetailsDialog
          event={dialog.event}
          onClose={() => setDialog(null)}
          onEdit={(event) => setDialog({ type: 'edit', event })}
          onDelete={(event) => setDialog({ type: 'delete', event })}
        />
      )}
      {dialog?.type === 'delete' && (
        <DeleteEventDialog
          event={dialog.event}
          onClose={() => setDialog(null)}
          onConfirm={() => handleDelete(dialog.event.id)}
        />
      )}
    </div>
  )
}
