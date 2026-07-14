import type { Customer, SortOption } from '../types'

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
