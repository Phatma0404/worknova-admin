import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { DEPARTMENTS } from '../constants'
import type { DepartmentFilter, AvailabilityFilter, SortField, SortDirection } from '../types'

interface TeamFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  department: DepartmentFilter
  onDepartmentChange: (value: DepartmentFilter) => void
  availability: AvailabilityFilter
  onAvailabilityChange: (value: AvailabilityFilter) => void
  sortField: SortField | null
  sortDir: SortDirection
  onSort: (field: SortField) => void
}

function SortButton({
  label,
  field,
  active,
  dir,
  onSort,
}: {
  label: string
  field: SortField
  active: boolean
  dir: SortDirection
  onSort: (f: SortField) => void
}) {
  const Icon = active ? (dir === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown
  return (
    <Button
      variant={active ? 'default' : 'outline'}
      size="sm"
      onClick={() => onSort(field)}
      className="h-9 gap-1.5"
    >
      <Icon className="size-3.5" />
      {label}
    </Button>
  )
}

export default function TeamFilters({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  availability,
  onAvailabilityChange,
  sortField,
  sortDir,
  onSort,
}: TeamFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search team members..."
          aria-label="Search team members"
          className="h-9 w-full rounded-lg border border-input bg-background pl-8 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
        />
      </div>

      {/* Filters + Sort */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Department */}
        <Select value={department} onValueChange={(v) => onDepartmentChange(v as DepartmentFilter)}>
          <SelectTrigger className="h-9 w-40" aria-label="Filter by department">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Availability */}
        <Select value={availability} onValueChange={(v) => onAvailabilityChange(v as AvailabilityFilter)}>
          <SelectTrigger className="h-9 w-36" aria-label="Filter by availability">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort divider */}
        <div className="h-6 w-px bg-border" />

        {/* Sort buttons */}
        <SortButton
          label="Name"
          field="name"
          active={sortField === 'name'}
          dir={sortDir}
          onSort={onSort}
        />
        <SortButton
          label="Workload"
          field="workload"
          active={sortField === 'workload'}
          dir={sortDir}
          onSort={onSort}
        />
      </div>
    </div>
  )
}
