import type { User, UserRole, UserStatus, Department } from './types'

export const ROLES: UserRole[] = ['Admin', 'Manager', 'Developer', 'Designer', 'Analyst', 'Viewer']

export const DEPARTMENTS: Department[] = [
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Sales',
  'Support',
]

export const STATUSES: UserStatus[] = ['active', 'inactive', 'invited', 'suspended']

export const PAGE_SIZE = 8

// Realistic mock users. Timestamps are anchored around late June 2026 so the
// "last active" relative times render sensibly. Replaced with API data later.
export const mockUsers: User[] = [
  { id: 'u01', name: 'Ada Lovelace', email: 'ada@projectflow.io', role: 'Admin', department: 'Engineering', status: 'active', lastActive: '2026-06-30T11:42:00Z' },
  { id: 'u02', name: 'Grace Hopper', email: 'grace@projectflow.io', role: 'Manager', department: 'Engineering', status: 'active', lastActive: '2026-06-30T09:15:00Z' },
  { id: 'u03', name: 'Alan Turing', email: 'alan@projectflow.io', role: 'Developer', department: 'Engineering', status: 'invited', lastActive: '2026-06-29T18:30:00Z' },
  { id: 'u04', name: 'Katherine Johnson', email: 'katherine@projectflow.io', role: 'Analyst', department: 'Product', status: 'active', lastActive: '2026-06-30T08:05:00Z' },
  { id: 'u05', name: 'Linus Torvalds', email: 'linus@projectflow.io', role: 'Developer', department: 'Engineering', status: 'suspended', lastActive: '2026-06-22T14:20:00Z' },
  { id: 'u06', name: 'Margaret Hamilton', email: 'margaret@projectflow.io', role: 'Manager', department: 'Product', status: 'active', lastActive: '2026-06-30T07:48:00Z' },
  { id: 'u07', name: 'Tim Berners-Lee', email: 'tim@projectflow.io', role: 'Developer', department: 'Engineering', status: 'active', lastActive: '2026-06-29T22:10:00Z' },
  { id: 'u08', name: 'Dennis Ritchie', email: 'dennis@projectflow.io', role: 'Developer', department: 'Engineering', status: 'inactive', lastActive: '2026-06-12T10:00:00Z' },
  { id: 'u09', name: 'Barbara Liskov', email: 'barbara@projectflow.io', role: 'Analyst', department: 'Product', status: 'active', lastActive: '2026-06-30T06:30:00Z' },
  { id: 'u10', name: 'Donald Knuth', email: 'donald@projectflow.io', role: 'Developer', department: 'Engineering', status: 'active', lastActive: '2026-06-28T16:45:00Z' },
  { id: 'u11', name: 'Sofia Kovalevskaya', email: 'sofia@projectflow.io', role: 'Designer', department: 'Design', status: 'active', lastActive: '2026-06-30T10:20:00Z' },
  { id: 'u12', name: 'John McCarthy', email: 'john@projectflow.io', role: 'Manager', department: 'Engineering', status: 'invited', lastActive: '2026-06-27T12:00:00Z' },
  { id: 'u13', name: 'Hedy Lamarr', email: 'hedy@projectflow.io', role: 'Designer', department: 'Design', status: 'active', lastActive: '2026-06-30T05:55:00Z' },
  { id: 'u14', name: 'Claude Shannon', email: 'claude@projectflow.io', role: 'Analyst', department: 'Marketing', status: 'inactive', lastActive: '2026-06-08T09:30:00Z' },
  { id: 'u15', name: 'Edsger Dijkstra', email: 'edsger@projectflow.io', role: 'Developer', department: 'Engineering', status: 'active', lastActive: '2026-06-29T20:15:00Z' },
  { id: 'u16', name: 'Radia Perlman', email: 'radia@projectflow.io', role: 'Developer', department: 'Engineering', status: 'active', lastActive: '2026-06-30T11:05:00Z' },
  { id: 'u17', name: 'Vint Cerf', email: 'vint@projectflow.io', role: 'Manager', department: 'Sales', status: 'active', lastActive: '2026-06-26T13:40:00Z' },
  { id: 'u18', name: 'Shafi Goldwasser', email: 'shafi@projectflow.io', role: 'Analyst', department: 'Product', status: 'suspended', lastActive: '2026-06-19T11:25:00Z' },
  { id: 'u19', name: 'Ken Thompson', email: 'ken@projectflow.io', role: 'Developer', department: 'Engineering', status: 'active', lastActive: '2026-06-30T04:10:00Z' },
  { id: 'u20', name: 'Frances Allen', email: 'frances@projectflow.io', role: 'Designer', department: 'Marketing', status: 'invited', lastActive: '2026-06-25T15:30:00Z' },
  { id: 'u21', name: 'Adele Goldberg', email: 'adele@projectflow.io', role: 'Designer', department: 'Design', status: 'active', lastActive: '2026-06-30T09:50:00Z' },
  { id: 'u22', name: 'Bjarne Stroustrup', email: 'bjarne@projectflow.io', role: 'Developer', department: 'Engineering', status: 'inactive', lastActive: '2026-06-05T08:00:00Z' },
  { id: 'u23', name: 'Leslie Lamport', email: 'leslie@projectflow.io', role: 'Viewer', department: 'Support', status: 'active', lastActive: '2026-06-28T17:20:00Z' },
  { id: 'u24', name: 'Anita Borg', email: 'anita@projectflow.io', role: 'Manager', department: 'Support', status: 'active', lastActive: '2026-06-30T03:35:00Z' },
]
