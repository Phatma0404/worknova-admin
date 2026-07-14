import type { Customer, SortOption } from '../types'

// Relative timestamp formatting, e.g. "5 minutes ago", "3 days ago".
export function formatRelativeTime(iso: string): string {
  const diffSeconds = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000))

  if (diffSeconds < 60) return 'Just now'
  const diffMinutes = Math.floor(diffSeconds / 60)
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
  const diffWeeks = Math.floor(diffDays / 7)
  if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 12) return `${diffMonths} month${diffMonths === 1 ? '' : 's'} ago`
  const diffYears = Math.floor(diffDays / 365)
  return `${diffYears} year${diffYears === 1 ? '' : 's'} ago`
}

export function formatJoinedDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function fullName(customer: Pick<Customer, 'firstName' | 'lastName'>): string {
  return `${customer.firstName} ${customer.lastName}`
}

export function generateCustomerId(): string {
  return crypto.randomUUID()
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function sortCustomers(customers: Customer[], sort: SortOption): Customer[] {
  const sorted = [...customers]
  switch (sort) {
    case 'name-asc':
      return sorted.sort((a, b) => fullName(a).localeCompare(fullName(b)))
    case 'name-desc':
      return sorted.sort((a, b) => fullName(b).localeCompare(fullName(a)))
    case 'oldest':
      return sorted.sort(
        (a, b) => new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime(),
      )
    case 'newest':
    default:
      return sorted.sort(
        (a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime(),
      )
  }
}

// Simulated network latency so the async CRUD shape (loading states,
// disabled buttons) behaves the same way it will once swapped for real
// API calls.
const SIMULATED_LATENCY_MS = 500

export function simulateLatency<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

// Builds a CSV file from the given customers and triggers a browser download.
export function exportCustomersToCsv(customers: Customer[], filename = 'customers.csv'): void {
  const headers = ['Full Name', 'Email', 'Phone', 'Company', 'Job Title', 'Status', 'Joined Date']
  const rows = customers.map((c) => [
    fullName(c),
    c.email,
    c.phone,
    c.company,
    c.jobTitle ?? '',
    c.status,
    formatJoinedDate(c.joinedDate),
  ])

  const escapeCell = (cell: string) =>
    /[",\n]/.test(cell) ? `"${cell.replace(/"/g, '""')}"` : cell

  const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(',')).join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
