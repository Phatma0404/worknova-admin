import { useState, type FormEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { cn } from '@/shared/lib/utils'
import {
  EVENT_TYPES,
  EVENT_TYPE_ORDER,
  PRIORITIES,
  PRIORITY_ORDER,
  CALENDAR_PROJECTS,
  CALENDAR_MEMBERS,
} from '../constants'
import { toISODate } from '../utils/date'
import type { CalendarEvent, EventDraft, EventType, EventPriority } from '../types'

interface EventDialogProps {
  event?: CalendarEvent
  defaultDate?: string
  onClose: () => void
  onSubmit: (draft: EventDraft, id?: string) => void
}

const inputClass =
  'h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 [color-scheme:light] dark:[color-scheme:dark]'

const NO_PROJECT = 'none'

export default function EventDialog({ event, defaultDate, onClose, onSubmit }: EventDialogProps) {
  const isEdit = !!event

  const [title, setTitle] = useState(event?.title ?? '')
  const [description, setDescription] = useState(event?.description ?? '')
  const [date, setDate] = useState(event?.date ?? defaultDate ?? toISODate(new Date()))
  const [time, setTime] = useState(event?.time ?? '09:00')
  const [type, setType] = useState<EventType>(event?.type ?? 'team-meeting')
  const [priority, setPriority] = useState<EventPriority>(event?.priority ?? 'medium')
  const [projectId, setProjectId] = useState<string>(event?.projectId ?? NO_PROJECT)
  const [attendees, setAttendees] = useState<string[]>(event?.attendees ?? [])

  const valid = title.trim() !== '' && date !== ''

  const toggleAttendee = (name: string) =>
    setAttendees((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return

    const project = projectId !== NO_PROJECT ? CALENDAR_PROJECTS.find((p) => p.id === projectId) : undefined

    onSubmit(
      {
        title: title.trim(),
        description: description.trim(),
        date,
        time,
        type,
        priority,
        projectId: project?.id,
        projectName: project?.name,
        attendees,
      },
      event?.id,
    )
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit event' : 'New event'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the event details below.' : 'Add a new event to your calendar.'}
          </DialogDescription>
        </DialogHeader>

        <form id="event-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ev-title">Title *</Label>
            <input
              id="ev-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Sprint Planning"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ev-desc">Description</Label>
            <textarea
              id="ev-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details, agenda or notes..."
              rows={3}
              className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            />
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ev-date">Date *</Label>
              <input
                id="ev-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ev-time">Time</Label>
              <input
                id="ev-time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Type + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ev-type">Event Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as EventType)}>
                <SelectTrigger id="ev-type" className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPE_ORDER.map((t) => (
                    <SelectItem key={t} value={t}>
                      <span className="flex items-center gap-2">
                        <span className={cn('size-2 rounded-full', EVENT_TYPES[t].dotClass)} />
                        {EVENT_TYPES[t].label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ev-priority">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as EventPriority)}>
                <SelectTrigger id="ev-priority" className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_ORDER.map((p) => (
                    <SelectItem key={p} value={p}>
                      {PRIORITIES[p].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Related project */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ev-project">Related Project</Label>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger id="ev-project" className="h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NO_PROJECT}>No project</SelectItem>
                {CALENDAR_PROJECTS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Attendees */}
          <div className="flex flex-col gap-2">
            <Label>Assigned Team Members</Label>
            <div className="flex flex-wrap gap-2">
              {CALENDAR_MEMBERS.map((m) => {
                const active = attendees.includes(m.name)
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleAttendee(m.name)}
                    className={cn(
                      'rounded-full border px-2.5 py-1 text-xs font-medium transition-colors',
                      active
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground',
                    )}
                  >
                    {m.name}
                  </button>
                )
              })}
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="event-form" disabled={!valid}>
            {isEdit ? 'Save changes' : 'Create event'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
