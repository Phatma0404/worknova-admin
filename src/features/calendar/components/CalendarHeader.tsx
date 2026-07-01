import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatMonthYear, formatWeekRange, toISODate, parseISODate } from '../utils/date'
import type { CalendarView } from '../types'

interface CalendarHeaderProps {
  viewDate: Date
  view: CalendarView
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onPickDate: (date: Date) => void
}

export default function CalendarHeader({
  viewDate,
  view,
  onPrev,
  onNext,
  onToday,
  onPickDate,
}: CalendarHeaderProps) {
  const label = view === 'month' ? formatMonthYear(viewDate) : formatWeekRange(viewDate)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Period navigation */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-sm" onClick={onPrev} aria-label="Previous">
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={onNext} aria-label="Next">
            <ChevronRight className="size-4" />
          </Button>
        </div>
        <h2 className="text-lg font-bold tracking-tight text-foreground">{label}</h2>
      </div>

      {/* Today + date picker */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onToday}>
          Today
        </Button>
        <label className="relative flex items-center">
          <CalendarDays className="pointer-events-none absolute left-2.5 size-4 text-muted-foreground" />
          <input
            type="date"
            value={toISODate(viewDate)}
            onChange={(e) => {
              if (e.target.value) onPickDate(parseISODate(e.target.value))
            }}
            aria-label="Jump to date"
            className="h-8 rounded-lg border border-border bg-card pl-8 pr-2 text-sm text-foreground outline-none transition-colors [color-scheme:light] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 dark:[color-scheme:dark]"
          />
        </label>
      </div>
    </div>
  )
}
