import Avatar from '@/components/ui/Avatar'
import StatusBadge from './StatusBadge'
import { recentUsers } from '../constants'

// Compact recent-users table. Horizontal scroll keeps it usable on mobile.
export default function RecentUsersTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-100 text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="pb-3 font-medium">User</th>
            <th className="pb-3 font-medium">Role</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {recentUsers.map((u) => (
            <tr key={u.id} className="border-b border-border/50 last:border-0">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <Avatar name={u.name} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">{u.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4 text-muted-foreground">{u.role}</td>
              <td className="py-3">
                <StatusBadge status={u.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
