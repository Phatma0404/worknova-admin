export type ProjectStatus = 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold'
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical'

export interface TeamMember {
  id: string
  name: string
  avatar?: string
}

export interface Project {
  id: string
  name: string
  client: string
  status: ProjectStatus
  priority: ProjectPriority
  progress: number // 0-100
  team: TeamMember[]
  dueDate: string  // ISO date string
  startDate: string
  description: string
  budget?: number
  tags?: string[]
}

export type SortField = 'name' | 'dueDate'
export type SortDirection = 'asc' | 'desc'
export type StatusFilter = ProjectStatus | 'all'
export type PriorityFilter = ProjectPriority | 'all'
