import { MoreHorizontal, Eye, Pencil, Trash2, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import Avatar from '@/components/ui/Avatar'
import UserStatusBadge from './UserStatusBadge'
import { formatRelativeTime } from '../utils'
import type { User, SortField, SortDirection } from '../types'

interface UsersTableProps {
  users: User[]
  sortField: SortField | null
  sortDir: SortDirection
  onSort: (field: SortField) => void
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDirection }) {
  if (!active) return <ArrowUpDown className="size-3.5 opacity-50" />
  return dir === 'asc' ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />
}

export default function UsersTable({
  users,
  sortField,
  sortDir,
  onSort,
  onView,
  onEdit,
  onDelete,
}: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-10" aria-label="Avatar" />
          <TableHead>
            <button
              onClick={() => onSort('name')}
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              Name <SortIcon active={sortField === 'name'} dir={sortDir} />
            </button>
          </TableHead>
          <TableHead className="hidden md:table-cell">Email</TableHead>
          <TableHead className="hidden sm:table-cell">Role</TableHead>
          <TableHead className="hidden lg:table-cell">Department</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">
            <button
              onClick={() => onSort('lastActive')}
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              Last Active <SortIcon active={sortField === 'lastActive'} dir={sortDir} />
            </button>
          </TableHead>
          <TableHead className="w-12 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={8} className="h-24 text-center text-sm text-muted-foreground">
              No users found.
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar name={user.name} src={user.avatar} size="sm" />
              </TableCell>
              <TableCell className="font-medium text-foreground">{user.name}</TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {user.email}
              </TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">{user.role}</TableCell>
              <TableCell className="hidden text-muted-foreground lg:table-cell">
                {user.department}
              </TableCell>
              <TableCell>
                <UserStatusBadge status={user.status} />
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {formatRelativeTime(user.lastActive)}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${user.name}`}>
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(user)}>
                      <Eye className="size-4" />
                      View profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(user)}>
                      <Pencil className="size-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onClick={() => onDelete(user)}>
                      <Trash2 className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
