export type Department =
  | 'Engineering'
  | 'Design'
  | 'Product'
  | 'Marketing'
  | 'Sales'
  | 'Support'

export type Availability = 'online' | 'offline'

export interface TeamMember {
  id: string
  name: string
  title: string
  department: Department
  email: string
  phone: string
  currentProject: string
  workload: number // 0-100
  skills: string[]
  availability: Availability
  joinedDate: string // ISO date
  bio?: string
  location?: string
}

export type SortField = 'name' | 'workload'
export type SortDirection = 'asc' | 'desc'
export type DepartmentFilter = Department | 'all'
export type AvailabilityFilter = Availability | 'all'
