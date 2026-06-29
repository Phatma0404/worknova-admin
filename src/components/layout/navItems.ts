import type { IconType } from 'react-icons'
import { FiGrid, FiFolder, FiCheckSquare, FiUsers, FiSettings } from 'react-icons/fi'

export interface NavItem {
  label: string
  to: string
  icon: IconType
}

// Single source of truth for the sidebar links - kept separate so the desktop
// rail and the mobile drawer render the exact same set.
export const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/', icon: FiGrid },
  { label: 'Projects', to: '/projects', icon: FiFolder },
  { label: 'Tasks', to: '/tasks', icon: FiCheckSquare },
  { label: 'Team', to: '/team', icon: FiUsers },
  { label: 'Settings', to: '/settings', icon: FiSettings },
]
