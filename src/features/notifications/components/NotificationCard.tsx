import { cn } from '@/shared/lib/utils'
import Avatar from '@/components/ui/Avatar'
import NotificationBadge from './NotificationBadge'
import NotificationMenu from './NotificationMenu'
import { CATEGORIES } from '../constants'
import { formatRelativeTime } from '../utils/time'
import type { AppNotification } from '../types'

interface NotificationCardProps {
  notification: AppNotification
  onMarkAsRead: (id: string) => void
  onMarkAsUnread: (id: string) => void
  onDelete: (id: string) => void
}

export default function NotificationCard({
  notification,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}: NotificationCardProps) {
  const cfg = CATEGORIES[notification.category]
  const Icon = cfg.icon

  return (
    <div
      onClick={() => !notification.read && onMarkAsRead(notification.id)}
      className={cn(
        'group relative flex gap-3 rounded-xl border p-4 transition-colors',
        notification.read
          ? 'border-border bg-card'
          : 'cursor-pointer border-primary/20 bg-primary/[0.03] hover:border-primary/30',
      )}
    >
      {/* Unread indicator */}
      {!notification.read && (
        <span className="absolute left-2 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary" />
      )}

      {/* Category icon or actor avatar */}
      {notification.actor ? (
        <Avatar name={notification.actor.name} size="md" className="shrink-0" />
      ) : (
        <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-full', cfg.iconWrapClass)}>
          <Icon className="size-4.5" />
        </div>
      )}

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className={cn('text-sm', notification.read ? 'font-medium text-foreground/90' : 'font-semibold text-foreground')}>
            {notification.title}
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <span className="text-xs text-muted-foreground">{formatRelativeTime(notification.createdAt)}</span>
            <NotificationMenu
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onMarkAsUnread={onMarkAsUnread}
              onDelete={onDelete}
            />
          </div>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>

        <div className="mt-2.5 flex items-center gap-2">
          <NotificationBadge category={notification.category} />
          {notification.actor && (
            <span className="text-xs text-muted-foreground">from {notification.actor.name}</span>
          )}
        </div>
      </div>
    </div>
  )
}
