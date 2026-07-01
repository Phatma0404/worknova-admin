export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done' | 'blocked'
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'

export interface Task {
  id: string
  name: string
  description?: string
  projectId: string
  projectName: string
  assigneeId: string
  assigneeName: string
  status: TaskStatus
  priority: TaskPriority
  progress: number // 0-100
  dueDate: string  // ISO date string
  createdAt: string
  tags?: string[]
}

export type SortField = 'dueDate' | 'priority'
export type SortDirection = 'asc' | 'desc'
export type StatusFilter = TaskStatus | 'all'
export type PriorityFilter = TaskPriority | 'all'
export type ProjectFilter = string | 'all'
