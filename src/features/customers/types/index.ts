export type CustomerStatus = 'active' | 'pending' | 'inactive' | 'blocked'

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  jobTitle?: string
  status: CustomerStatus
  notes?: string
  joinedDate: string // ISO timestamp
  avatar?: string
}

export type StatusFilter = CustomerStatus | 'all'
export type CompanyFilter = string | 'all'

export type SortOption = 'name-asc' | 'name-desc' | 'newest' | 'oldest'

export interface CustomerFilters {
  status?: StatusFilter
  company?: CompanyFilter
}
