import type { ProjectStatus } from '@/features/projects/types'

export type ActivityType =
  | 'completed-task'
  | 'created-project'
  | 'updated-profile'
  | 'assigned-task'

export interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: string // relative, human-readable (e.g. "2 hours ago")
}

export interface ProfileProject {
  id: string
  name: string
  progress: number // 0-100
  status: ProjectStatus
  dueDate: string // ISO date string
}

export interface ProfileStats {
  completedTasks: number
  activeProjects: number
  teamMemberships: number
  productivityScore: number // 0-100
}

export interface UserProfile {
  id: string
  name: string
  title: string
  department: string
  email: string
  phone: string
  location: string
  joinDate: string // ISO date string
  online: boolean
  bio: string
  skills: string[]
  yearsOfExperience: number
  stats: ProfileStats
  projects: ProfileProject[]
  activities: Activity[]
}

// Fields the Edit Profile dialog can change - a subset of UserProfile.
export type EditableProfile = Pick<
  UserProfile,
  'name' | 'title' | 'department' | 'email' | 'phone' | 'location' | 'bio' | 'skills'
>
