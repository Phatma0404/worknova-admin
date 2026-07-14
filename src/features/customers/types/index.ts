import type { ProjectStatus } from '@/features/projects/types'

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

// --- Customer Detail page ---

export interface CustomerDetailStats {
  lifetimeValue: number
  activeProjects: number
  totalInvoices: number
  customerSince: string // human-readable duration, e.g. "8 months"
}

export type CustomerActivityType =
  | 'created'
  | 'status-changed'
  | 'note-added'
  | 'invoice-sent'
  | 'project-started'
  | 'email-sent'

export interface CustomerActivity {
  id: string
  type: CustomerActivityType
  title: string
  description: string
  timestamp: string // relative, human-readable (e.g. "2 days ago")
}

export interface CustomerProjectSummary {
  id: string
  name: string
  status: ProjectStatus
  progress: number // 0-100
  dueDate: string // ISO date string
}

export type InvoiceStatus = 'paid' | 'pending' | 'overdue'

export interface CustomerInvoice {
  id: string
  number: string
  date: string // ISO date string
  amount: number
  status: InvoiceStatus
}

export type CustomerFileType = 'pdf' | 'image' | 'doc' | 'sheet'

export interface CustomerFile {
  id: string
  name: string
  type: CustomerFileType
  size: string // human-readable, e.g. "1.2 MB"
  uploadedDate: string // ISO date string
}
