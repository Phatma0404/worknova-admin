export type NotificationCategory =
  | 'task-assigned'
  | 'task-completed'
  | 'project-updated'
  | 'team-invitation'
  | 'comment'
  | 'mention'
  | 'deadline-reminder'
  | 'system-update'

export type ReadStatus = 'read' | 'unread'
export type ReadStatusFilter = ReadStatus | 'all'
export type CategoryFilter = NotificationCategory | 'all'

export interface NotificationUser {
  name: string
  avatar?: string
}

export interface AppNotification {
  id: string
  title: string
  description: string
  category: NotificationCategory
  createdAt: string // ISO datetime
  read: boolean
  actor?: NotificationUser // related user, if applicable
}
