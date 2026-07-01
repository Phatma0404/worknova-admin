import type { LucideIcon } from 'lucide-react'
import { Flag, ListChecks, Users, Target, Briefcase, Trophy } from 'lucide-react'
import { isoFromToday } from './utils/date'
import type {
  EventType,
  EventPriority,
  CalendarEvent,
  CalendarProject,
  CalendarMember,
} from './types'

export interface EventTypeConfig {
  label: string
  icon: LucideIcon
  badgeClass: string    // soft pill: bg + text + ring
  dotClass: string      // solid dot / left bar
  iconWrapClass: string // soft icon chip: bg + text
}

// Each category owns a distinct color so projects, tasks, meetings and
// milestones are instantly distinguishable across the grid and panels.
export const EVENT_TYPES: Record<EventType, EventTypeConfig> = {
  'project-deadline': {
    label: 'Project Deadline',
    icon: Flag,
    badgeClass: 'bg-rose-500/10 text-rose-400 ring-rose-500/20',
    dotClass: 'bg-rose-500',
    iconWrapClass: 'bg-rose-500/10 text-rose-400',
  },
  'task-deadline': {
    label: 'Task Deadline',
    icon: ListChecks,
    badgeClass: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
    dotClass: 'bg-amber-500',
    iconWrapClass: 'bg-amber-500/10 text-amber-400',
  },
  'team-meeting': {
    label: 'Team Meeting',
    icon: Users,
    badgeClass: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
    dotClass: 'bg-blue-500',
    iconWrapClass: 'bg-blue-500/10 text-blue-400',
  },
  'sprint-planning': {
    label: 'Sprint Planning',
    icon: Target,
    badgeClass: 'bg-violet-500/10 text-violet-400 ring-violet-500/20',
    dotClass: 'bg-violet-500',
    iconWrapClass: 'bg-violet-500/10 text-violet-400',
  },
  'client-meeting': {
    label: 'Client Meeting',
    icon: Briefcase,
    badgeClass: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    dotClass: 'bg-emerald-500',
    iconWrapClass: 'bg-emerald-500/10 text-emerald-400',
  },
  'project-milestone': {
    label: 'Project Milestone',
    icon: Trophy,
    badgeClass: 'bg-sky-500/10 text-sky-400 ring-sky-500/20',
    dotClass: 'bg-sky-500',
    iconWrapClass: 'bg-sky-500/10 text-sky-400',
  },
}

// Stable display order for legends, filters and the type picker.
export const EVENT_TYPE_ORDER: EventType[] = [
  'project-deadline',
  'task-deadline',
  'team-meeting',
  'sprint-planning',
  'client-meeting',
  'project-milestone',
]

export const PRIORITIES: Record<EventPriority, { label: string; className: string }> = {
  low:      { label: 'Low',      className: 'bg-slate-500/10 text-slate-400 ring-slate-500/20' },
  medium:   { label: 'Medium',   className: 'bg-blue-500/10 text-blue-400 ring-blue-500/20' },
  high:     { label: 'High',     className: 'bg-amber-500/10 text-amber-400 ring-amber-500/20' },
  critical: { label: 'Critical', className: 'bg-rose-500/10 text-rose-400 ring-rose-500/20' },
}

export const PRIORITY_ORDER: EventPriority[] = ['low', 'medium', 'high', 'critical']

export const CALENDAR_PROJECTS: CalendarProject[] = [
  { id: 'p1', name: 'WorkNova Admin Dashboard' },
  { id: 'p2', name: 'Mobile Banking App' },
  { id: 'p3', name: 'Design System 2.0' },
  { id: 'p4', name: 'Analytics Platform' },
  { id: 'p5', name: 'Marketing Website' },
  { id: 'p6', name: 'E-Commerce Checkout' },
]

export const CALENDAR_MEMBERS: CalendarMember[] = [
  { id: 'm1', name: 'Ada Lovelace' },
  { id: 'm2', name: 'Grace Hopper' },
  { id: 'm3', name: 'Alan Turing' },
  { id: 'm4', name: 'Katherine Johnson' },
  { id: 'm5', name: 'Linus Torvalds' },
  { id: 'm6', name: 'Margaret Hamilton' },
  { id: 'm7', name: 'Sofia Kovalevskaya' },
  { id: 'm8', name: 'Hedy Lamarr' },
]

// Events are seeded relative to today so the current month always has content
// and the "Today's Schedule" / "Upcoming" panels are populated on first load.
export const MOCK_EVENTS: CalendarEvent[] = [
  // Recent past
  {
    id: 'e1',
    title: 'API Integration Deadline',
    description: 'Finalize payment gateway integration and hand off to QA.',
    date: isoFromToday(-4),
    time: '17:00',
    type: 'task-deadline',
    priority: 'high',
    projectId: 'p2',
    projectName: 'Mobile Banking App',
    attendees: ['Alan Turing', 'Grace Hopper'],
  },
  {
    id: 'e2',
    title: 'Onboarding Flow Milestone',
    description: 'First full onboarding flow shipped to staging for review.',
    date: isoFromToday(-2),
    time: '12:00',
    type: 'project-milestone',
    priority: 'medium',
    projectId: 'p3',
    projectName: 'Design System 2.0',
    attendees: ['Hedy Lamarr', 'Sofia Kovalevskaya'],
  },
  {
    id: 'e3',
    title: 'Weekly Team Sync',
    description: 'Cross-team status update and blocker triage.',
    date: isoFromToday(-1),
    time: '10:00',
    type: 'team-meeting',
    priority: 'low',
    attendees: ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'],
  },

  // Today
  {
    id: 'e4',
    title: 'Sprint Planning - Q3 Kickoff',
    description: 'Scope the next sprint, assign owners and set sprint goals.',
    date: isoFromToday(0),
    time: '09:00',
    type: 'sprint-planning',
    priority: 'high',
    projectId: 'p1',
    projectName: 'WorkNova Admin Dashboard',
    attendees: ['Ada Lovelace', 'Alan Turing', 'Grace Hopper', 'Linus Torvalds'],
  },
  {
    id: 'e5',
    title: 'Design Review',
    description: 'Review the latest dashboard mockups and component tokens.',
    date: isoFromToday(0),
    time: '14:00',
    type: 'team-meeting',
    priority: 'medium',
    projectId: 'p3',
    projectName: 'Design System 2.0',
    attendees: ['Hedy Lamarr', 'Sofia Kovalevskaya'],
  },
  {
    id: 'e6',
    title: 'Client Demo - Banking App',
    description: 'Walk the client through the new transfer and card flows.',
    date: isoFromToday(0),
    time: '16:30',
    type: 'client-meeting',
    priority: 'high',
    projectId: 'p2',
    projectName: 'Mobile Banking App',
    attendees: ['Grace Hopper', 'Katherine Johnson'],
  },

  // Upcoming
  {
    id: 'e7',
    title: 'Checkout UI Deadline',
    description: 'Ship the redesigned checkout screens to production.',
    date: isoFromToday(1),
    time: '11:00',
    type: 'task-deadline',
    priority: 'high',
    projectId: 'p6',
    projectName: 'E-Commerce Checkout',
    attendees: ['Sofia Kovalevskaya', 'Linus Torvalds'],
  },
  {
    id: 'e8',
    title: 'Client Meeting - FinCore',
    description: 'Quarterly roadmap alignment and feature prioritization.',
    date: isoFromToday(2),
    time: '15:00',
    type: 'client-meeting',
    priority: 'medium',
    projectId: 'p2',
    projectName: 'Mobile Banking App',
    attendees: ['Ada Lovelace', 'Katherine Johnson'],
  },
  {
    id: 'e9',
    title: 'Design System 2.0 Milestone',
    description: 'Component library v2 reaches 80% coverage.',
    date: isoFromToday(3),
    time: '10:00',
    type: 'project-milestone',
    priority: 'high',
    projectId: 'p3',
    projectName: 'Design System 2.0',
    attendees: ['Hedy Lamarr', 'Margaret Hamilton'],
  },
  {
    id: 'e10',
    title: 'Marketing Website Deadline',
    description: 'Launch the new marketing site with updated branding.',
    date: isoFromToday(4),
    time: '18:00',
    type: 'project-deadline',
    priority: 'critical',
    projectId: 'p5',
    projectName: 'Marketing Website',
    attendees: ['Margaret Hamilton', 'Grace Hopper'],
  },
  {
    id: 'e11',
    title: 'Sprint Review',
    description: 'Demo completed work and gather stakeholder feedback.',
    date: isoFromToday(5),
    time: '13:00',
    type: 'team-meeting',
    priority: 'medium',
    projectId: 'p1',
    projectName: 'WorkNova Admin Dashboard',
    attendees: ['Ada Lovelace', 'Alan Turing', 'Linus Torvalds'],
  },
  {
    id: 'e12',
    title: 'Sprint Planning',
    description: 'Plan analytics platform sprint and estimate stories.',
    date: isoFromToday(6),
    time: '09:30',
    type: 'sprint-planning',
    priority: 'medium',
    projectId: 'p4',
    projectName: 'Analytics Platform',
    attendees: ['Katherine Johnson', 'Alan Turing'],
  },
  {
    id: 'e13',
    title: 'Analytics Platform Deadline',
    description: 'Real-time reporting module must be feature complete.',
    date: isoFromToday(8),
    time: '17:00',
    type: 'project-deadline',
    priority: 'critical',
    projectId: 'p4',
    projectName: 'Analytics Platform',
    attendees: ['Katherine Johnson', 'Linus Torvalds'],
  },
  {
    id: 'e14',
    title: '1:1 with Design Lead',
    description: 'Career growth check-in and design direction sync.',
    date: isoFromToday(9),
    time: '11:00',
    type: 'team-meeting',
    priority: 'low',
    projectId: 'p3',
    projectName: 'Design System 2.0',
    attendees: ['Hedy Lamarr'],
  },
  {
    id: 'e15',
    title: 'Beta Launch Milestone',
    description: 'Open the mobile banking beta to the first 500 users.',
    date: isoFromToday(11),
    time: '12:00',
    type: 'project-milestone',
    priority: 'high',
    projectId: 'p2',
    projectName: 'Mobile Banking App',
    attendees: ['Grace Hopper', 'Ada Lovelace', 'Katherine Johnson'],
  },
  {
    id: 'e16',
    title: 'Client Onboarding - Acme',
    description: 'Kick off implementation and gather requirements.',
    date: isoFromToday(13),
    time: '14:00',
    type: 'client-meeting',
    priority: 'medium',
    projectId: 'p6',
    projectName: 'E-Commerce Checkout',
    attendees: ['Sofia Kovalevskaya', 'Margaret Hamilton'],
  },
  {
    id: 'e17',
    title: 'Email Templates Deadline',
    description: 'Deliver responsive transactional email templates.',
    date: isoFromToday(15),
    time: '16:00',
    type: 'task-deadline',
    priority: 'medium',
    projectId: 'p5',
    projectName: 'Marketing Website',
    attendees: ['Hedy Lamarr'],
  },
  {
    id: 'e18',
    title: 'Quarterly Business Review',
    description: 'Executive review of KPIs, revenue and roadmap.',
    date: isoFromToday(18),
    time: '10:00',
    type: 'client-meeting',
    priority: 'high',
    attendees: ['Ada Lovelace', 'Grace Hopper', 'Katherine Johnson'],
  },
  {
    id: 'e19',
    title: 'Release 3.0 Deadline',
    description: 'Cut the 3.0 release branch and freeze the changelog.',
    date: isoFromToday(21),
    time: '19:00',
    type: 'project-deadline',
    priority: 'critical',
    projectId: 'p1',
    projectName: 'WorkNova Admin Dashboard',
    attendees: ['Ada Lovelace', 'Alan Turing', 'Linus Torvalds', 'Grace Hopper'],
  },
  {
    id: 'e20',
    title: 'Team Offsite Planning',
    description: 'Plan the Q3 team offsite agenda and logistics.',
    date: isoFromToday(25),
    time: '09:00',
    type: 'sprint-planning',
    priority: 'low',
    attendees: ['Margaret Hamilton', 'Sofia Kovalevskaya'],
  },
]
