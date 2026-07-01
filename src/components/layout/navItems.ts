import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  ListChecks,
  Users,
  UsersRound,
  Settings,
} from 'lucide-react'

export interface NavItem {
  label: string
  to: string
  icon: LucideIcon
}

export interface NavSection {
  label: string
  items: NavItem[]
}

// Grouped navigation - the labels become the section headers (MAIN / MANAGEMENT
// / SYSTEM) and the same list feeds both the desktop rail and the mobile drawer.
export const navSections: NavSection[] = [
  {
    label: 'MAIN',
    items: [
      { label: 'Dashboard', to: '/', icon: LayoutDashboard },
      { label: 'Analytics', to: '/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      { label: 'Users', to: '/users', icon: UsersRound },
      { label: 'Projects', to: '/projects', icon: FolderKanban },
      { label: 'Tasks', to: '/tasks', icon: ListChecks },
      { label: 'Team', to: '/team', icon: Users },
    ],
  },
  {
    label: 'SYSTEM',
    items: [{ label: 'Settings', to: '/settings', icon: Settings }],
  },
]
