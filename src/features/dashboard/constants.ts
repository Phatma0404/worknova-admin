import { Users, FolderKanban, CircleCheckBig, DollarSign } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Mock data for the dashboard. Replaced with API responses in a later step.

export interface Stat {
  id: string
  label: string
  value: string
  change: string // e.g. "+12%"
  trend: 'up' | 'down'
  icon: LucideIcon
  iconClass: string // colored icon container (bg + text)
}

export const stats: Stat[] = [
  {
    id: 'users',
    label: 'Total Users',
    value: '12,480',
    change: '+12%',
    trend: 'up',
    icon: Users,
    iconClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    id: 'projects',
    label: 'Active Projects',
    value: '320',
    change: '+8%',
    trend: 'up',
    icon: FolderKanban,
    iconClass: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  },
  {
    id: 'tasks',
    label: 'Tasks Completed',
    value: '8,640',
    change: '-3%',
    trend: 'down',
    icon: CircleCheckBig,
    iconClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'revenue',
    label: 'Monthly Revenue',
    value: '$48,260',
    change: '+24%',
    trend: 'up',
    icon: DollarSign,
    iconClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
]

export interface RevenuePoint {
  month: string
  revenue: number
}

export const revenueData: RevenuePoint[] = [
  { month: 'Jan', revenue: 18400 },
  { month: 'Feb', revenue: 22100 },
  { month: 'Mar', revenue: 19800 },
  { month: 'Apr', revenue: 28600 },
  { month: 'May', revenue: 31200 },
  { month: 'Jun', revenue: 29400 },
  { month: 'Jul', revenue: 36800 },
  { month: 'Aug', revenue: 34100 },
  { month: 'Sep', revenue: 41200 },
  { month: 'Oct', revenue: 38900 },
  { month: 'Nov', revenue: 45600 },
  { month: 'Dec', revenue: 48260 },
]

export type UserStatus = 'active' | 'invited' | 'inactive'

export interface RecentUser {
  id: string
  name: string
  email: string
  role: string
  status: UserStatus
}

export const recentUsers: RecentUser[] = [
  { id: 'u1', name: 'Ada Lovelace', email: 'ada@worknova.io', role: 'Admin', status: 'active' },
  { id: 'u2', name: 'Grace Hopper', email: 'grace@worknova.io', role: 'Manager', status: 'active' },
  { id: 'u3', name: 'Alan Turing', email: 'alan@worknova.io', role: 'Developer', status: 'invited' },
  { id: 'u4', name: 'Katherine Johnson', email: 'kat@worknova.io', role: 'Analyst', status: 'active' },
  { id: 'u5', name: 'Linus Torvalds', email: 'linus@worknova.io', role: 'Developer', status: 'inactive' },
]

export type ProjectStatus = 'on-track' | 'at-risk' | 'completed'

export interface RecentProject {
  id: string
  name: string
  client: string
  progress: number // 0-100
  status: ProjectStatus
}

export const recentProjects: RecentProject[] = [
  { id: 'p1', name: 'Website Redesign', client: 'Acme Corp', progress: 82, status: 'on-track' },
  { id: 'p2', name: 'Mobile App v2', client: 'Globex', progress: 45, status: 'at-risk' },
  { id: 'p3', name: 'Billing Migration', client: 'Initech', progress: 100, status: 'completed' },
  { id: 'p4', name: 'Marketing Site', client: 'Umbrella', progress: 67, status: 'on-track' },
  { id: 'p5', name: 'Analytics Dashboard', client: 'Soylent', progress: 30, status: 'at-risk' },
]
