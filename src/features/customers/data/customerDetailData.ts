import type { ProjectStatus } from '@/features/projects/types'
import { formatRelativeTime } from '../utils'
import type {
  Customer,
  CustomerActivity,
  CustomerDetailStats,
  CustomerFile,
  CustomerFileType,
  CustomerInvoice,
  CustomerProjectSummary,
  InvoiceStatus,
} from '../types'

// Deterministic hash -> seeded PRNG so a given customer always generates the
// same "realistic" detail data (stable across re-renders, and works out of
// the box for customers created live through the Add Customer form - there
// is no hand-authored data to run out of).
function hashSeed(id: string, salt: number): number {
  let hash = salt
  for (let i = 0; i < id.length; i++) hash = (hash << 5) - hash + id.charCodeAt(i)
  return Math.abs(hash) || 1
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(rand: () => number, items: readonly T[]): T {
  return items[Math.floor(rand() * items.length)]
}

function randomDateBetween(startIso: string, endIso: string, rand: () => number): string {
  const start = new Date(startIso).getTime()
  const end = new Date(endIso).getTime()
  if (end <= start) return new Date(start).toISOString()
  return new Date(start + rand() * (end - start)).toISOString()
}

export function generateCustomerStats(customer: Customer): CustomerDetailStats {
  const rand = mulberry32(hashSeed(customer.id, 1))
  const lifetimeValue = Math.round((8000 + rand() * 77000) / 100) * 100
  const activeProjects = 1 + Math.floor(rand() * 4)
  const totalInvoices = 3 + Math.floor(rand() * 7)

  const joined = new Date(customer.joinedDate)
  const now = new Date()
  const totalMonths = Math.max(
    0,
    (now.getFullYear() - joined.getFullYear()) * 12 + (now.getMonth() - joined.getMonth()),
  )
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const customerSince =
    totalMonths === 0
      ? 'This month'
      : years > 0
        ? `${years} year${years === 1 ? '' : 's'}${months > 0 ? ` ${months} mo` : ''}`
        : `${months} month${months === 1 ? '' : 's'}`

  return { lifetimeValue, activeProjects, totalInvoices, customerSince }
}

export function generateCustomerActivities(customer: Customer): CustomerActivity[] {
  const rand = mulberry32(hashSeed(customer.id, 2))
  const now = new Date().toISOString()

  const events: { type: CustomerActivity['type']; title: string; description: string; timestamp: string }[] = [
    {
      type: 'created',
      title: 'Customer created',
      description: `${customer.firstName} ${customer.lastName} was added to WorkNova.`,
      timestamp: customer.joinedDate,
    },
    {
      type: 'email-sent',
      title: 'Welcome email sent',
      description: `Onboarding email delivered to ${customer.email}.`,
      timestamp: randomDateBetween(customer.joinedDate, now, rand),
    },
    {
      type: 'project-started',
      title: 'New project started',
      description: `A new engagement was kicked off with ${customer.company}.`,
      timestamp: randomDateBetween(customer.joinedDate, now, rand),
    },
    {
      type: 'invoice-sent',
      title: 'Invoice sent',
      description: `An invoice was issued to ${customer.company}.`,
      timestamp: randomDateBetween(customer.joinedDate, now, rand),
    },
    {
      type: 'status-changed',
      title: 'Status updated',
      description: `Status set to "${customer.status}".`,
      timestamp: randomDateBetween(customer.joinedDate, now, rand),
    },
  ]

  if (customer.notes) {
    events.push({
      type: 'note-added',
      title: 'Internal note added',
      description: 'A team member left a note on this customer.',
      timestamp: randomDateBetween(customer.joinedDate, now, rand),
    })
  }

  return events
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .map((e, i) => ({
      id: `${customer.id}-act-${i + 1}`,
      type: e.type,
      title: e.title,
      description: e.description,
      timestamp: formatRelativeTime(e.timestamp),
    }))
}

const PROJECT_NAME_POOL = [
  'Website Redesign',
  'Mobile App Integration',
  'Brand Refresh',
  'Cloud Migration',
  'Analytics Dashboard',
  'Customer Portal',
  'API Modernization',
  'Marketing Automation',
]

const PROJECT_STATUSES: ProjectStatus[] = ['planning', 'in-progress', 'review', 'completed', 'on-hold']

export function generateCustomerProjects(customer: Customer): CustomerProjectSummary[] {
  const rand = mulberry32(hashSeed(customer.id, 3))
  const now = new Date().toISOString()
  const future = new Date(Date.now() + 90 * 86_400_000).toISOString()
  const count = 2 + Math.floor(rand() * 2)
  const used = new Set<string>()
  const projects: CustomerProjectSummary[] = []

  for (let i = 0; i < count; i++) {
    let name = pick(rand, PROJECT_NAME_POOL)
    while (used.has(name) && used.size < PROJECT_NAME_POOL.length) name = pick(rand, PROJECT_NAME_POOL)
    used.add(name)

    const status = pick(rand, PROJECT_STATUSES)
    const progress = status === 'completed' ? 100 : 5 + Math.floor(rand() * 85)
    const dueDate =
      status === 'completed'
        ? randomDateBetween(customer.joinedDate, now, rand)
        : randomDateBetween(now, future, rand)

    projects.push({ id: `${customer.id}-proj-${i + 1}`, name: `${name} - ${customer.company}`, status, progress, dueDate })
  }

  return projects
}

const INVOICE_STATUSES: InvoiceStatus[] = ['paid', 'paid', 'paid', 'pending', 'overdue']

export function generateCustomerInvoices(customer: Customer): CustomerInvoice[] {
  const rand = mulberry32(hashSeed(customer.id, 4))
  const now = new Date().toISOString()
  const count = 3 + Math.floor(rand() * 3)

  const invoices: CustomerInvoice[] = Array.from({ length: count }, (_, i) => ({
    id: `${customer.id}-inv-${i + 1}`,
    number: `INV-${String(2000 + Math.floor(rand() * 8000))}`,
    date: randomDateBetween(customer.joinedDate, now, rand),
    amount: Math.round((300 + rand() * 4700) / 10) * 10,
    status: pick(rand, INVOICE_STATUSES),
  }))

  return invoices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const FILE_POOL: { name: string; type: CustomerFileType }[] = [
  { name: 'Contract Agreement.pdf', type: 'pdf' },
  { name: 'Onboarding Checklist.pdf', type: 'pdf' },
  { name: 'Brand Assets.png', type: 'image' },
  { name: 'Meeting Notes.doc', type: 'doc' },
  { name: 'Invoice History.xlsx', type: 'sheet' },
  { name: 'Proposal Deck.pdf', type: 'pdf' },
]

export function generateCustomerFiles(customer: Customer): CustomerFile[] {
  const rand = mulberry32(hashSeed(customer.id, 5))
  const now = new Date().toISOString()
  const count = 2 + Math.floor(rand() * 3)
  const shuffled = [...FILE_POOL].sort(() => rand() - 0.5)

  return shuffled.slice(0, count).map((f, i) => ({
    id: `${customer.id}-file-${i + 1}`,
    name: f.name,
    type: f.type,
    size: `${(0.2 + rand() * 4.5).toFixed(1)} MB`,
    uploadedDate: randomDateBetween(customer.joinedDate, now, rand),
  }))
}
