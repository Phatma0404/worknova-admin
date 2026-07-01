import { DollarSign, Users, FolderKanban, CircleCheckBig } from 'lucide-react'
import type {
  Kpi,
  RevenuePoint,
  UserGrowthPoint,
  ProjectStatusSlice,
  WeeklyActivityPoint,
  TaskCompletion,
} from './types'

// Mock analytics data. Replaced with API responses in a later step.

export const kpis: Kpi[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$128,400',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    iconClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'users',
    label: 'Active Users',
    value: '8,420',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    iconClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    id: 'projects',
    label: 'Active Projects',
    value: '64',
    change: '+3.1%',
    trend: 'up',
    icon: FolderKanban,
    iconClass: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  },
  {
    id: 'tasks',
    label: 'Completed Tasks',
    value: '12,840',
    change: '+18.4%',
    trend: 'up',
    icon: CircleCheckBig,
    iconClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
]

export const revenueData: RevenuePoint[] = [
  { month: 'Jan', revenue: 78200 },
  { month: 'Feb', revenue: 81500 },
  { month: 'Mar', revenue: 86400 },
  { month: 'Apr', revenue: 92100 },
  { month: 'May', revenue: 98700 },
  { month: 'Jun', revenue: 95300 },
  { month: 'Jul', revenue: 104800 },
  { month: 'Aug', revenue: 109200 },
  { month: 'Sep', revenue: 115600 },
  { month: 'Oct', revenue: 112400 },
  { month: 'Nov', revenue: 121900 },
  { month: 'Dec', revenue: 128400 },
]

export const userGrowthData: UserGrowthPoint[] = [
  { month: 'Jan', users: 3200 },
  { month: 'Feb', users: 3680 },
  { month: 'Mar', users: 4150 },
  { month: 'Apr', users: 4720 },
  { month: 'May', users: 5310 },
  { month: 'Jun', users: 5760 },
  { month: 'Jul', users: 6340 },
  { month: 'Aug', users: 6810 },
  { month: 'Sep', users: 7250 },
  { month: 'Oct', users: 7640 },
  { month: 'Nov', users: 8050 },
  { month: 'Dec', users: 8420 },
]

export const projectStatusData: ProjectStatusSlice[] = [
  { name: 'Completed', value: 42, color: 'var(--color-chart-1)' },
  { name: 'In Progress', value: 28, color: 'var(--color-chart-2)' },
  { name: 'On Hold', value: 18, color: 'var(--color-chart-3)' },
  { name: 'At Risk', value: 12, color: 'var(--color-chart-4)' },
]

export const taskCompletion: TaskCompletion = {
  rate: 78,
  completed: 12840,
  total: 16460,
}

export const weeklyActivityData: WeeklyActivityPoint[] = [
  { day: 'Mon', completed: 42, created: 38 },
  { day: 'Tue', completed: 58, created: 45 },
  { day: 'Wed', completed: 65, created: 52 },
  { day: 'Thu', completed: 49, created: 40 },
  { day: 'Fri', completed: 72, created: 60 },
  { day: 'Sat', completed: 30, created: 22 },
  { day: 'Sun', completed: 24, created: 18 },
]
