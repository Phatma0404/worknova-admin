import type { Customer, CustomerStatus } from '../types'

export const STATUSES: CustomerStatus[] = ['active', 'pending', 'inactive', 'blocked']

export const PAGE_SIZE = 8

// Seed data only - useCustomers() copies this into state and never mutates
// this array directly. Timestamps are anchored around mid-2026.
export const mockCustomers: Customer[] = [
  { id: 'c01', firstName: 'Olivia', lastName: 'Bennett', email: 'olivia.bennett@acme.io', phone: '+1 202 555 0142', company: 'Acme Corp', jobTitle: 'Head of Procurement', status: 'active', joinedDate: '2026-01-14T09:20:00Z' },
  { id: 'c02', firstName: 'Ethan', lastName: 'Clarke', email: 'ethan.clarke@globex.com', phone: '+1 202 555 0198', company: 'Globex', jobTitle: 'VP Engineering', status: 'active', joinedDate: '2026-02-03T11:05:00Z' },
  { id: 'c03', firstName: 'Sophia', lastName: 'Martinez', email: 'sophia.martinez@initech.com', phone: '+1 202 555 0111', company: 'Initech', jobTitle: 'Finance Manager', status: 'pending', joinedDate: '2026-02-20T14:40:00Z' },
  { id: 'c04', firstName: 'Liam', lastName: 'Foster', email: 'liam.foster@umbrella.co', phone: '+1 202 555 0176', company: 'Umbrella Co', jobTitle: 'Marketing Director', status: 'active', joinedDate: '2026-03-01T08:15:00Z' },
  { id: 'c05', firstName: 'Ava', lastName: 'Nguyen', email: 'ava.nguyen@soylent.io', phone: '+1 202 555 0134', company: 'Soylent', jobTitle: 'Product Owner', status: 'blocked', joinedDate: '2026-03-12T16:50:00Z' },
  { id: 'c06', firstName: 'Noah', lastName: 'Petrov', email: 'noah.petrov@acme.io', phone: '+1 202 555 0165', company: 'Acme Corp', jobTitle: 'IT Manager', status: 'active', joinedDate: '2026-03-25T10:30:00Z' },
  { id: 'c07', firstName: 'Isabella', lastName: 'Rossi', email: 'isabella.rossi@stark.com', phone: '+1 202 555 0122', company: 'Stark Industries', jobTitle: 'Operations Lead', status: 'active', joinedDate: '2026-04-02T13:10:00Z' },
  { id: 'c08', firstName: 'Mason', lastName: 'Osei', email: 'mason.osei@globex.com', phone: '+1 202 555 0187', company: 'Globex', jobTitle: 'Account Executive', status: 'pending', joinedDate: '2026-04-15T09:45:00Z' },
  { id: 'c09', firstName: 'Mia', lastName: 'Kowalski', email: 'mia.kowalski@initech.com', phone: '+1 202 555 0159', company: 'Initech', jobTitle: 'HR Business Partner', status: 'inactive', joinedDate: '2026-04-28T15:20:00Z' },
  { id: 'c10', firstName: 'Lucas', lastName: 'Dubois', email: 'lucas.dubois@umbrella.co', phone: '+1 202 555 0193', company: 'Umbrella Co', jobTitle: 'Supply Chain Manager', status: 'blocked', joinedDate: '2026-05-05T11:00:00Z' },
  { id: 'c11', firstName: 'Amelia', lastName: 'Johansson', email: 'amelia.johansson@stark.com', phone: '+1 202 555 0128', company: 'Stark Industries', jobTitle: 'Legal Counsel', status: 'active', joinedDate: '2026-05-18T08:35:00Z' },
  { id: 'c12', firstName: 'James', lastName: 'Okafor', email: 'james.okafor@soylent.io', phone: '+1 202 555 0146', company: 'Soylent', jobTitle: 'Growth Manager', status: 'active', joinedDate: '2026-05-30T17:25:00Z' },
  { id: 'c13', firstName: 'Charlotte', lastName: 'Alvarez', email: 'charlotte.alvarez@acme.io', phone: '+1 202 555 0172', company: 'Acme Corp', jobTitle: 'Customer Success Lead', status: 'pending', joinedDate: '2026-06-06T12:15:00Z' },
  { id: 'c14', firstName: 'Benjamin', lastName: 'Sato', email: 'benjamin.sato@globex.com', phone: '+1 202 555 0139', company: 'Globex', jobTitle: 'Data Analyst', status: 'inactive', joinedDate: '2026-06-14T09:50:00Z' },
  { id: 'c15', firstName: 'Emma', lastName: 'Larsen', email: 'emma.larsen@initech.com', phone: '+1 202 555 0184', company: 'Initech', jobTitle: 'Compliance Officer', status: 'active', joinedDate: '2026-06-19T14:05:00Z' },
  { id: 'c16', firstName: 'William', lastName: 'Novak', email: 'william.novak@umbrella.co', phone: '+1 202 555 0117', company: 'Umbrella Co', jobTitle: 'Regional Sales Manager', status: 'active', joinedDate: '2026-06-25T10:40:00Z' },
  { id: 'c17', firstName: 'Harper', lastName: 'Singh', email: 'harper.singh@stark.com', phone: '+1 202 555 0153', company: 'Stark Industries', jobTitle: 'Product Designer', status: 'blocked', joinedDate: '2026-07-01T16:10:00Z' },
  { id: 'c18', firstName: 'Henry', lastName: 'Adeyemi', email: 'henry.adeyemi@soylent.io', phone: '+1 202 555 0161', company: 'Soylent', jobTitle: 'CTO', status: 'active', joinedDate: '2026-07-08T08:55:00Z' },
]
