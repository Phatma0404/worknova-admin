import { Search } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { CATEGORIES, CATEGORY_ORDER } from '../constants'
import type { CategoryFilter, ReadStatusFilter } from '../types'

interface NotificationFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  category: CategoryFilter
  onCategoryChange: (value: CategoryFilter) => void
  status: ReadStatusFilter
  onStatusChange: (value: ReadStatusFilter) => void
}

export default function NotificationFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
}: NotificationFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative sm:max-w-xs sm:flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notifications..."
          aria-label="Search notifications"
          className="h-9 w-full rounded-lg border border-input bg-background pl-8 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
        />
      </div>

      {/* Category filter */}
      <Select value={category} onValueChange={(v) => onCategoryChange(v as CategoryFilter)}>
        <SelectTrigger className="h-9 w-full sm:w-52" aria-label="Filter by category">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {CATEGORY_ORDER.map((c) => (
            <SelectItem key={c} value={c}>
              {CATEGORIES[c].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Read status segmented control */}
      <div className="inline-flex shrink-0 rounded-lg border border-border bg-card p-0.5">
        {(['all', 'unread', 'read'] as ReadStatusFilter[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onStatusChange(s)}
            className={cn(
              'rounded-md px-3 py-1 text-sm font-medium capitalize transition-colors',
              status === s
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
