import { Badge } from '@/components/ui/badge'
import { cn } from '@/shared/lib/utils'
import type { UserStatus } from '../types'

const styles: Record<UserStatus, string> = {
  active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  inactive: 'bg-gray-500/10 text-gray-500 dark:text-gray-400',
  invited: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  suspended: 'bg-red-500/10 text-red-600 dark:text-red-400',
}

export default function UserStatusBadge({ status }: { status: UserStatus }) {
  return <Badge className={cn('border-transparent capitalize', styles[status])}>{status}</Badge>
}
