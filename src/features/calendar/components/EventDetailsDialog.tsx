import { CalendarDays, FolderKanban, Users, Trash2, Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { EVENT_TYPES, PRIORITIES } from '../constants'
import { formatLongDate, formatTime, parseISODate } from '../utils/date'
import type { CalendarEvent } from '../types'

interface EventDetailsDialogProps {
  event: CalendarEvent
  onClose: () => void
  onEdit: (event: CalendarEvent) => void
  onDelete: (event: CalendarEvent) => void
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function EventDetailsDialog({ event, onClose, onEdit, onDelete }: EventDetailsDialogProps) {
  const typeCfg = EVENT_TYPES[event.type]
  const TypeIcon = typeCfg.icon
  const priorityCfg = PRIORITIES[event.priority]

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {/* Category + priority badges */}
          <div className="flex flex-wrap items-center gap-2 pr-6">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
                typeCfg.badgeClass,
              )}
            >
              <TypeIcon className="size-3" />
              {typeCfg.label}
            </span>
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
                priorityCfg.className,
              )}
            >
              {priorityCfg.label} priority
            </span>
          </div>
          <DialogTitle className="text-lg">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Date & time */}
          <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CalendarDays className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{formatLongDate(parseISODate(event.date))}</p>
              <p className="text-xs text-muted-foreground tabular-nums">{formatTime(event.time)}</p>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Description
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{event.description}</p>
            </div>
          )}

          {/* Related project */}
          {event.projectName && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Related Project
              </h4>
              <div className="mt-1.5 flex items-center gap-2 text-sm text-foreground">
                <FolderKanban className="size-4 text-muted-foreground" />
                {event.projectName}
              </div>
            </div>
          )}

          {/* Attendees */}
          {event.attendees.length > 0 && (
            <div>
              <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Users className="size-3.5" />
                Team Members ({event.attendees.length})
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {event.attendees.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background py-0.5 pl-0.5 pr-2.5 text-xs text-foreground"
                  >
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
                      {initials(name)}
                    </span>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="-mx-4 -mb-4 mt-1 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="destructive" onClick={() => onDelete(event)}>
            <Trash2 className="size-4" />
            Delete
          </Button>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => onEdit(event)}>
              <Pencil className="size-4" />
              Edit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
