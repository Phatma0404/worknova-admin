import { Bell } from 'lucide-react'
import { useNotifications } from '../hooks/useNotifications'
import NotificationFilters from '../components/NotificationFilters'
import NotificationActions from '../components/NotificationActions'
import NotificationList from '../components/NotificationList'

export default function NotificationsPage() {
  const {
    notifications,
    totalCount,
    unreadCount,
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotifications()

  const isFiltering = search.trim() !== '' || category !== 'all' || status !== 'all'

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Bell className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Stay on top of task updates, mentions, and team activity.
            </p>
          </div>
        </div>

        <NotificationActions
          unreadCount={unreadCount}
          totalCount={totalCount}
          onMarkAllAsRead={markAllAsRead}
          onClearAll={clearAll}
        />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <NotificationFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          status={status}
          onStatusChange={setStatus}
        />
      </div>

      {/* Result count */}
      {totalCount > 0 && (
        <p className="text-sm text-muted-foreground">
          {notifications.length === totalCount
            ? `${totalCount} notification${totalCount === 1 ? '' : 's'}`
            : `${notifications.length} of ${totalCount} notifications`}
        </p>
      )}

      {/* List */}
      <NotificationList
        notifications={notifications}
        hasAnyNotifications={totalCount > 0 && isFiltering}
        onMarkAsRead={markAsRead}
        onMarkAsUnread={markAsUnread}
        onDelete={deleteNotification}
      />
    </div>
  )
}
