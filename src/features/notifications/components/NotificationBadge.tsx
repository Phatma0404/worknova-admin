import { cn } from '@/shared/lib/utils'
import { CATEGORIES } from '../constants'
import type { NotificationCategory } from '../types'

interface NotificationBadgeProps {
  category: NotificationCategory
  className?: string
}

// Color-coded category pill, reused across the card, filters and details.
export default function NotificationBadge({ category, className }: NotificationBadgeProps) {
  const cfg = CATEGORIES[category]
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
        cfg.badgeClass,
        className,
      )}
    >
      {cfg.label}
    </span>
  )
}
