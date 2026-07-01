import { Mail, Shield, Building2, Calendar } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Avatar from '@/components/ui/Avatar'
import UserStatusBadge from './UserStatusBadge'
import { formatRelativeTime } from '../utils'
import type { User } from '../types'

export default function ViewUserDialog({ user, onClose }: { user: User; onClose: () => void }) {
  const rows = [
    { icon: Mail, label: 'Email', value: user.email },
    { icon: Shield, label: 'Role', value: user.role },
    { icon: Building2, label: 'Department', value: user.department },
    { icon: Calendar, label: 'Last active', value: formatRelativeTime(user.lastActive) },
  ]

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {/* Visually the avatar block is the title; keep an accessible label. */}
          <DialogTitle className="sr-only">User profile</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 pt-2 text-center">
          <Avatar name={user.name} src={user.avatar} size="lg" />
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-base font-semibold text-foreground">{user.name}</p>
            <UserStatusBadge status={user.status} />
          </div>
        </div>

        <dl className="flex flex-col divide-y divide-border rounded-lg border border-border">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-3 py-2.5 text-sm">
              <Icon className="size-4 shrink-0 text-muted-foreground" />
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="ml-auto truncate font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  )
}
