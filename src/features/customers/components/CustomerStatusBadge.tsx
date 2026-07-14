import { Badge } from '@/components/ui/badge'
import { cn } from '@/shared/lib/utils'
import type { CustomerStatus } from '../types'

const styles: Record<CustomerStatus, string> = {
  active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  blocked: 'bg-red-500/10 text-red-600 dark:text-red-400',
}

export default function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  return <Badge className={cn('border-transparent capitalize', styles[status])}>{status}</Badge>
}
