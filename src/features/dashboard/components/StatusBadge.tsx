import { cn } from '@/shared/lib/utils'
import type { UserStatus, ProjectStatus } from '../constants'

type Status = UserStatus | ProjectStatus

// Reusable colored pill shared by the users table and projects list.
const styles: Record<Status, string> = {
  active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  invited: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  inactive: 'bg-gray-500/10 text-gray-500 dark:text-gray-400',
  'on-track': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'at-risk': 'bg-red-500/10 text-red-600 dark:text-red-400',
  completed: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
}

const labels: Record<Status, string> = {
  active: 'Active',
  invited: 'Invited',
  inactive: 'Inactive',
  'on-track': 'On track',
  'at-risk': 'At risk',
  completed: 'Completed',
}

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  )
}
