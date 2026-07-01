import type { LucideIcon } from 'lucide-react'

export interface Kpi {
  id: string
  label: string
  value: string
  change: string // e.g. "+12.5%"
  trend: 'up' | 'down'
  icon: LucideIcon
  iconClass: string // colored icon container (bg + text)
}

export interface RevenuePoint {
  month: string
  revenue: number
}

export interface UserGrowthPoint {
  month: string
  users: number
}

export interface ProjectStatusSlice {
  name: string
  value: number
  color: string // CSS color (theme chart token)
}

export interface WeeklyActivityPoint {
  day: string
  completed: number
  created: number
}

export interface TaskCompletion {
  rate: number // 0-100
  completed: number
  total: number
}
