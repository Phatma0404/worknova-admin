import type { LucideIcon } from 'lucide-react'
import {
  ClipboardCheck,
  CheckCircle2,
  FolderKanban,
  UserPlus,
  MessageSquare,
  AtSign,
  Clock,
  Megaphone,
} from 'lucide-react'
import { isoMinutesAgo } from './utils/time'
import type { NotificationCategory, AppNotification } from './types'

export interface CategoryConfig {
  label: string
  icon: LucideIcon
  badgeClass: string    // soft pill: bg + text + ring
  iconWrapClass: string // soft icon chip: bg + text
}

// Each category owns a distinct color so the notification list stays scannable
// at a glance, mirroring the color-coded categories used across the app.
export const CATEGORIES: Record<NotificationCategory, CategoryConfig> = {
  'task-assigned': {
    label: 'Task Assigned',
    icon: ClipboardCheck,
    badgeClass: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
    iconWrapClass: 'bg-blue-500/10 text-blue-400',
  },
  'task-completed': {
    label: 'Task Completed',
    icon: CheckCircle2,
    badgeClass: 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
    iconWrapClass: 'bg-emerald-500/10 text-emerald-400',
  },
  'project-updated': {
    label: 'Project Updated',
    icon: FolderKanban,
    badgeClass: 'bg-violet-500/10 text-violet-400 ring-violet-500/20',
    iconWrapClass: 'bg-violet-500/10 text-violet-400',
  },
  'team-invitation': {
    label: 'Team Invitation',
    icon: UserPlus,
    badgeClass: 'bg-sky-500/10 text-sky-400 ring-sky-500/20',
    iconWrapClass: 'bg-sky-500/10 text-sky-400',
  },
  comment: {
    label: 'Comment',
    icon: MessageSquare,
    badgeClass: 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
    iconWrapClass: 'bg-amber-500/10 text-amber-400',
  },
  mention: {
    label: 'Mention',
    icon: AtSign,
    badgeClass: 'bg-fuchsia-500/10 text-fuchsia-400 ring-fuchsia-500/20',
    iconWrapClass: 'bg-fuchsia-500/10 text-fuchsia-400',
  },
  'deadline-reminder': {
    label: 'Deadline Reminder',
    icon: Clock,
    badgeClass: 'bg-rose-500/10 text-rose-400 ring-rose-500/20',
    iconWrapClass: 'bg-rose-500/10 text-rose-400',
  },
  'system-update': {
    label: 'System Update',
    icon: Megaphone,
    badgeClass: 'bg-slate-500/10 text-slate-400 ring-slate-500/20',
    iconWrapClass: 'bg-slate-500/10 text-slate-400',
  },
}

// Stable display order for filters and legends.
export const CATEGORY_ORDER: NotificationCategory[] = [
  'task-assigned',
  'task-completed',
  'project-updated',
  'team-invitation',
  'comment',
  'mention',
  'deadline-reminder',
  'system-update',
]

// Notifications are seeded relative to "now" so the list always feels live
// and the unread badge / relative timestamps make sense on first load.
export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'New task assigned to you',
    description: '"Finalize checkout screens" was assigned to you in Mobile Banking App.',
    category: 'task-assigned',
    createdAt: isoMinutesAgo(4),
    read: false,
    actor: { name: 'Grace Hopper' },
  },
  {
    id: 'n2',
    title: 'Katherine Johnson mentioned you',
    description: '"@Alex can you review the analytics dashboard spec before standup?"',
    category: 'mention',
    createdAt: isoMinutesAgo(12),
    read: false,
    actor: { name: 'Katherine Johnson' },
  },
  {
    id: 'n3',
    title: 'Deadline approaching',
    description: '"Checkout UI Deadline" for E-Commerce Checkout is due tomorrow at 11:00 AM.',
    category: 'deadline-reminder',
    createdAt: isoMinutesAgo(38),
    read: false,
  },
  {
    id: 'n4',
    title: 'New comment on your task',
    description: 'Alan Turing commented: "Looks great, just fix the spacing on mobile."',
    category: 'comment',
    createdAt: isoMinutesAgo(55),
    read: false,
    actor: { name: 'Alan Turing' },
  },
  {
    id: 'n5',
    title: 'Task marked as completed',
    description: '"API Integration Deadline" in Mobile Banking App was marked complete.',
    category: 'task-completed',
    createdAt: isoMinutesAgo(95),
    read: true,
    actor: { name: 'Linus Torvalds' },
  },
  {
    id: 'n6',
    title: 'Project updated',
    description: 'Margaret Hamilton updated the timeline for Marketing Website.',
    category: 'project-updated',
    createdAt: isoMinutesAgo(140),
    read: true,
    actor: { name: 'Margaret Hamilton' },
  },
  {
    id: 'n7',
    title: 'Team invitation accepted',
    description: 'Sofia Kovalevskaya accepted your invitation to join Design System 2.0.',
    category: 'team-invitation',
    createdAt: isoMinutesAgo(180),
    read: true,
    actor: { name: 'Sofia Kovalevskaya' },
  },
  {
    id: 'n8',
    title: 'System maintenance scheduled',
    description: 'WorkNova will undergo scheduled maintenance this Sunday at 2:00 AM UTC.',
    category: 'system-update',
    createdAt: isoMinutesAgo(220),
    read: true,
  },
  {
    id: 'n9',
    title: 'New task assigned to you',
    description: '"Audit color contrast" was assigned to you in Design System 2.0.',
    category: 'task-assigned',
    createdAt: isoMinutesAgo(310),
    read: false,
    actor: { name: 'Hedy Lamarr' },
  },
  {
    id: 'n10',
    title: 'Ada Lovelace mentioned you',
    description: '"@Alex the sprint planning doc needs your input on scope."',
    category: 'mention',
    createdAt: isoMinutesAgo(400),
    read: true,
    actor: { name: 'Ada Lovelace' },
  },
  {
    id: 'n11',
    title: 'Deadline approaching',
    description: '"Analytics Platform Deadline" is due in 3 days.',
    category: 'deadline-reminder',
    createdAt: isoMinutesAgo(520),
    read: true,
  },
  {
    id: 'n12',
    title: 'New comment on your project',
    description: 'Bjarne Stroustrup commented: "Let\'s sync on the API contract before merging."',
    category: 'comment',
    createdAt: isoMinutesAgo(680),
    read: true,
    actor: { name: 'Bjarne Stroustrup' },
  },
  {
    id: 'n13',
    title: 'Task marked as completed',
    description: '"Ship empty states" in Analytics Platform was marked complete.',
    category: 'task-completed',
    createdAt: isoMinutesAgo(900),
    read: true,
    actor: { name: 'Katherine Johnson' },
  },
  {
    id: 'n14',
    title: 'Project updated',
    description: 'Grace Hopper changed the status of Mobile Banking App to In Review.',
    category: 'project-updated',
    createdAt: isoMinutesAgo(1180),
    read: true,
    actor: { name: 'Grace Hopper' },
  },
  {
    id: 'n15',
    title: 'Team invitation sent',
    description: 'You invited Frances Allen to join WorkNova Admin Dashboard.',
    category: 'team-invitation',
    createdAt: isoMinutesAgo(1440),
    read: true,
  },
  {
    id: 'n16',
    title: 'System update available',
    description: 'A new version of the WorkNova admin dashboard has been deployed.',
    category: 'system-update',
    createdAt: isoMinutesAgo(2100),
    read: true,
  },
  {
    id: 'n17',
    title: 'New task assigned to you',
    description: '"Email Templates Deadline" was assigned to you in Marketing Website.',
    category: 'task-assigned',
    createdAt: isoMinutesAgo(2880),
    read: true,
    actor: { name: 'Margaret Hamilton' },
  },
  {
    id: 'n18',
    title: 'Radia Perlman mentioned you',
    description: '"@Alex thoughts on the new onboarding flow?"',
    category: 'mention',
    createdAt: isoMinutesAgo(4200),
    read: true,
    actor: { name: 'Radia Perlman' },
  },
]
