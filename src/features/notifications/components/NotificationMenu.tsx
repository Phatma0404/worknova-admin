import { MoreHorizontal, MailOpen, Mail, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import type { AppNotification } from '../types'

interface NotificationMenuProps {
  notification: AppNotification
  onMarkAsRead: (id: string) => void
  onMarkAsUnread: (id: string) => void
  onDelete: (id: string) => void
}

export default function NotificationMenu({
  notification,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}: NotificationMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={(e) => e.stopPropagation()}
          aria-label="Notification actions"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44" onClick={(e) => e.stopPropagation()}>
        {notification.read ? (
          <DropdownMenuItem onClick={() => onMarkAsUnread(notification.id)}>
            <Mail className="size-4" />
            Mark as unread
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => onMarkAsRead(notification.id)}>
            <MailOpen className="size-4" />
            Mark as read
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => onDelete(notification.id)}>
          <Trash2 className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
