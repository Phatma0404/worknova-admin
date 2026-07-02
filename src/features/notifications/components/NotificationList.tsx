import NotificationCard from './NotificationCard'
import EmptyNotifications from './EmptyNotifications'
import type { AppNotification } from '../types'

interface NotificationListProps {
  notifications: AppNotification[]
  hasAnyNotifications: boolean
  onMarkAsRead: (id: string) => void
  onMarkAsUnread: (id: string) => void
  onDelete: (id: string) => void
}

export default function NotificationList({
  notifications,
  hasAnyNotifications,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return <EmptyNotifications filtered={hasAnyNotifications} />
  }

  return (
    <div className="flex flex-col gap-2">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
          onMarkAsUnread={onMarkAsUnread}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
