export type EventType =
  | 'project-deadline'
  | 'task-deadline'
  | 'team-meeting'
  | 'sprint-planning'
  | 'client-meeting'
  | 'project-milestone'

export type EventPriority = 'low' | 'medium' | 'high' | 'critical'

export type CalendarView = 'month' | 'week'

export type EventTypeFilter = EventType | 'all'

export interface CalendarEvent {
  id: string
  title: string
  description: string
  date: string // ISO date - YYYY-MM-DD
  time: string // 24h - HH:mm
  type: EventType
  priority: EventPriority
  projectId?: string
  projectName?: string
  attendees: string[] // team member names
}

// Payload used by the create/edit dialog (id is assigned by the page on submit).
export type EventDraft = Omit<CalendarEvent, 'id'>

export interface CalendarProject {
  id: string
  name: string
}

export interface CalendarMember {
  id: string
  name: string
}
