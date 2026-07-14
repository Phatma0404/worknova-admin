import { Search, Download } from 'lucide-react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { STATUSES } from '../data/mockCustomers'
import type { StatusFilter, CompanyFilter, SortOption } from '../types'

const SORT_LABELS: Record<SortOption, string> = {
  'name-asc': 'Name (A-Z)',
  'name-desc': 'Name (Z-A)',
  newest: 'Newest first',
  oldest: 'Oldest first',
}

interface CustomersToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  company: CompanyFilter
  onCompanyChange: (value: CompanyFilter) => void
  companies: string[]
  sort: SortOption
  onSortChange: (value: SortOption) => void
  onExport: () => void
}

export default function CustomersToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  company,
  onCompanyChange,
  companies,
  sort,
  onSortChange,
  onExport,
}: CustomersToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}
      <div className="relative w-full lg:max-w-xs">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, email or company..."
          aria-label="Search customers"
          className="h-9 w-full rounded-lg border border-input bg-background pl-8 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
        />
      </div>

      {/* Filters + sort + export */}
      <div className="flex flex-wrap items-center gap-2">
        <Select value={status} onValueChange={(v) => onStatusChange(v as StatusFilter)}>
          <SelectTrigger className="h-9 w-36" aria-label="Filter by status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={company} onValueChange={(v) => onCompanyChange(v as CompanyFilter)}>
          <SelectTrigger className="h-9 w-40" aria-label="Filter by company">
            <SelectValue placeholder="Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All companies</SelectItem>
            {companies.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="h-9 w-40" aria-label="Sort customers">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(SORT_LABELS) as SortOption[]).map((s) => (
              <SelectItem key={s} value={s}>
                {SORT_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={onExport}>
          <Download className="size-4" />
          Export CSV
        </Button>
      </div>
    </div>
  )
}
