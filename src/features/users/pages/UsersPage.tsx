import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import UsersToolbar from '../components/UsersToolbar'
import UsersTable from '../components/UsersTable'
import UsersPagination from '../components/UsersPagination'
import UserFormDialog from '../components/UserFormDialog'
import ViewUserDialog from '../components/ViewUserDialog'
import DeleteUserDialog from '../components/DeleteUserDialog'
import { mockUsers, PAGE_SIZE } from '../constants'
import type { User, SortField, SortDirection, RoleFilter, StatusFilter } from '../types'

type DialogState =
  | { type: 'add' }
  | { type: 'edit'; user: User }
  | { type: 'view'; user: User }
  | { type: 'delete'; user: User }
  | null

export default function UsersPage() {
  // In-memory only - add/edit/delete mutate this list since there's no API.
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>('asc')
  const [page, setPage] = useState(1)
  const [dialog, setDialog] = useState<DialogState>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return users.filter((u) => {
      const matchesSearch =
        q === '' || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      const matchesRole = roleFilter === 'all' || u.role === roleFilter
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, search, roleFilter, statusFilter])

  const sorted = useMemo(() => {
    if (!sortField) return filtered
    const dir = sortDir === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => {
      if (sortField === 'name') return a.name.localeCompare(b.name) * dir
      return (new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()) * dir
    })
  }, [filtered, sortField, sortDir])

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const paginated = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
    setPage(1)
  }

  const resetPage = () => setPage(1)

  const handleAdd = (user: User) => {
    setUsers((prev) => [user, ...prev])
    setDialog(null)
  }
  const handleEdit = (user: User) => {
    setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)))
    setDialog(null)
  }
  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    setDialog(null)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage your team members and their access.
          </p>
        </div>
        <Button onClick={() => setDialog({ type: 'add' })}>
          <Plus className="size-4" />
          Add User
        </Button>
      </div>

      {/* Toolbar + table + pagination */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
        <UsersToolbar
          search={search}
          onSearchChange={(v) => {
            setSearch(v)
            resetPage()
          }}
          role={roleFilter}
          onRoleChange={(v) => {
            setRoleFilter(v)
            resetPage()
          }}
          status={statusFilter}
          onStatusChange={(v) => {
            setStatusFilter(v)
            resetPage()
          }}
        />
        <UsersTable
          users={paginated}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
          onView={(u) => setDialog({ type: 'view', user: u })}
          onEdit={(u) => setDialog({ type: 'edit', user: u })}
          onDelete={(u) => setDialog({ type: 'delete', user: u })}
        />
        <UsersPagination
          page={currentPage}
          pageCount={pageCount}
          total={sorted.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>

      {/* Dialogs */}
      {dialog?.type === 'add' && (
        <UserFormDialog onClose={() => setDialog(null)} onSubmit={handleAdd} />
      )}
      {dialog?.type === 'edit' && (
        <UserFormDialog user={dialog.user} onClose={() => setDialog(null)} onSubmit={handleEdit} />
      )}
      {dialog?.type === 'view' && (
        <ViewUserDialog user={dialog.user} onClose={() => setDialog(null)} />
      )}
      {dialog?.type === 'delete' && (
        <DeleteUserDialog
          user={dialog.user}
          onClose={() => setDialog(null)}
          onConfirm={() => handleDelete(dialog.user.id)}
        />
      )}
    </div>
  )
}
