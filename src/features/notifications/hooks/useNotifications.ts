import { useCallback, useMemo, useState } from 'react'
import { MOCK_NOTIFICATIONS } from '../constants'
import type { AppNotification, CategoryFilter, ReadStatusFilter } from '../types'

// Owns notification data, filters, and mutations for the Notifications page.
export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [status, setStatus] = useState<ReadStatusFilter>('all')

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return notifications
      .filter((n) => {
        const matchesCategory = category === 'all' || n.category === category
        const matchesStatus =
          status === 'all' || (status === 'unread' ? !n.read : n.read)
        const matchesSearch =
          q === '' ||
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          (n.actor?.name.toLowerCase().includes(q) ?? false)
        return matchesCategory && matchesStatus && matchesSearch
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }, [notifications, search, category, status])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const markAsUnread = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: false } : n)))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications: filtered,
    totalCount: notifications.length,
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
  }
}
