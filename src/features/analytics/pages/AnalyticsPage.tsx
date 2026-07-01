import { useState } from 'react'
import { Calendar, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import KPISection from '../components/KPISection'
import RevenueChart from '../components/RevenueChart'
import UserGrowthChart from '../components/UserGrowthChart'
import ProjectStatusChart from '../components/ProjectStatusChart'
import TaskCompletionChart from '../components/TaskCompletionChart'
import WeeklyActivityChart from '../components/WeeklyActivityChart'

const DATE_RANGES = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Last 12 Months']

export default function AnalyticsPage() {
  // Cosmetic only - no data filtering until the API is wired up.
  const [range, setRange] = useState('Last 30 Days')

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Performance across revenue, users, and projects.
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="size-4" />
              {range}
              <ChevronDown className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {DATE_RANGES.map((r) => (
              <DropdownMenuItem key={r} onClick={() => setRange(r)}>
                {r}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* KPI cards */}
      <KPISection />

      {/* Charts - responsive 3-column grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueChart className="lg:col-span-2" />
        <ProjectStatusChart className="lg:col-span-1" />
        <UserGrowthChart className="lg:col-span-2" />
        <TaskCompletionChart className="lg:col-span-1" />
        <WeeklyActivityChart className="lg:col-span-3" />
      </div>
    </div>
  )
}
