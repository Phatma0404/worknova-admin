import { Search, Plus } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { EVENT_TYPES, EVENT_TYPE_ORDER } from '../constants'
import type { CalendarView, EventTypeFilter } from '../types'

interface CalendarToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  typeFilter: EventTypeFilter
  onTypeFilterChange: (value: EventTypeFilter) => void
  view: CalendarView
  onViewChange: (value: CalendarView) => void
  onAddEvent: () => void
}

const VIEWS: CalendarView[] = ['month', 'week']

export default function CalendarToolbar({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  view,
  onViewChange,
  onAddEvent,
}: CalendarToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Search + type filter */}
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative sm:max-w-xs sm:flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events..."
            className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
          />
        </div>

        <Select
          value={typeFilter}
          onValueChange={(v) => onTypeFilterChange(v as EventTypeFilter)}
        >
          <SelectTrigger className="h-9 w-full sm:w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All event types</SelectItem>
            {EVENT_TYPE_ORDER.map((type) => (
              <SelectItem key={type} value={type}>
                <span className="flex items-center gap-2">
                  <span className={cn('size-2 rounded-full', EVENT_TYPES[type].dotClass)} />
                  {EVENT_TYPES[type].label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* View toggle + add */}
      <div className="flex items-center gap-2">
        <div className="inline-flex rounded-lg border border-border bg-card p-0.5">
          {VIEWS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => onViewChange(v)}
              className={cn(
                'rounded-md px-3 py-1 text-sm font-medium capitalize transition-colors',
                view === v
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {v}
            </button>
          ))}
        </div>

        <Button onClick={onAddEvent}>
          <Plus className="size-4" />
          Add Event
        </Button>
      </div>
    </div>
  )
}
