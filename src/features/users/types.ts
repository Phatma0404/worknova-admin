export type UserRole = 'Admin' | 'Manager' | 'Developer' | 'Designer' | 'Analyst' | 'Viewer'
export type UserStatus = 'active' | 'inactive' | 'invited' | 'suspended'
export type Department = 'Engineering' | 'Design' | 'Product' | 'Marketing' | 'Sales' | 'Support'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department: Department
  status: UserStatus
  lastActive: string // ISO timestamp - sortable, rendered as relative time
  avatar?: string
}

export type SortField = 'name' | 'lastActive'
export type SortDirection = 'asc' | 'desc'

// 'all' is the "no filter" sentinel used by the role/status dropdowns.
export type RoleFilter = UserRole | 'all'
export type StatusFilter = UserStatus | 'all'
