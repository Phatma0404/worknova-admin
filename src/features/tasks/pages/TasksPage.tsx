import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TaskFilters from '../components/TaskFilters'
import TasksTable from '../components/TasksTable'
import TaskDialog from '../components/TaskDialog'
import DeleteTaskDialog from '../components/DeleteTaskDialog'
import TaskDetailsDialog from '../components/TaskDetailsDialog'
import { mockTasks, PAGE_SIZE } from '../constants'
import type {
  Task,
  SortField,
  SortDirection,
  StatusFilter,
  PriorityFilter,
  ProjectFilter,
} from '../types'

type DialogState =
  | { type: 'add' }
  | { type: 'edit'; task: Task }
  | { type: 'view'; task: Task }
  | { type: 'delete'; task: Task }
  | null

const PRIORITY_ORDER: Record<string, number> = {
  critical: 3,
  high: 2,
  medium: 1,
  low: 0,
}

function TasksPagination({
  page,
  pageCount,
  total,
  pageSize,
  onPageChange,
}: {
  page: number
  pageCount: number
  total: number
  pageSize: number
  onPageChange: (p: number) => void
}) {
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)
  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-muted-foreground">
        {total === 0 ? 'No results' : `Showing ${from}-${to} of ${total} tasks`}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            variant={p === page ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPageChange(p)}
            className="hidden sm:inline-flex"
          >
            {p}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('all')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>('asc')
  const [page, setPage] = useState(1)
  const [dialog, setDialog] = useState<DialogState>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tasks.filter((t) => {
      const matchesSearch = q === '' || t.name.toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter
      const matchesProject = projectFilter === 'all' || t.projectId === projectFilter
      return matchesSearch && matchesStatus && matchesPriority && matchesProject
    })
  }, [tasks, search, statusFilter, priorityFilter, projectFilter])

  const sorted = useMemo(() => {
    if (!sortField) return filtered
    const dir = sortDir === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => {
      if (sortField === 'dueDate') {
        return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * dir
      }
      return (PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]) * dir
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

  const handleAdd = (task: Task) => {
    setTasks((prev) => [task, ...prev])
    setDialog(null)
  }

  const handleEdit = (task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)))
    setDialog(null)
  }

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    setDialog(null)
  }

  const handleViewToEdit = (task: Task) => {
    setDialog({ type: 'edit', task })
  }

  // Summary stats
  const stats = useMemo(() => ({
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
    blocked: tasks.filter((t) => t.status === 'blocked').length,
    overdue: tasks.filter(
      (t) => t.status !== 'done' && new Date(t.dueDate).getTime() < Date.now()
    ).length,
  }), [tasks])

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage all project tasks in one place.
          </p>
        </div>
        <Button onClick={() => setDialog({ type: 'add' })}>
          <Plus className="size-4" />
          New Task
        </Button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          { label: 'Total',       value: stats.total,      color: 'text-foreground' },
          { label: 'In Progress', value: stats.inProgress, color: 'text-blue-400' },
          { label: 'Done',        value: stats.done,       color: 'text-emerald-400' },
          { label: 'Blocked',     value: stats.blocked,    color: 'text-rose-400' },
          { label: 'Overdue',     value: stats.overdue,    color: 'text-amber-400' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
        <TaskFilters
          search={search}
          onSearchChange={(v) => { setSearch(v); resetPage() }}
          status={statusFilter}
          onStatusChange={(v) => { setStatusFilter(v); resetPage() }}
          priority={priorityFilter}
          onPriorityChange={(v) => { setPriorityFilter(v); resetPage() }}
          project={projectFilter}
          onProjectChange={(v) => { setProjectFilter(v); resetPage() }}
        />

        <TasksTable
          tasks={paginated}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
          onView={(t) => setDialog({ type: 'view', task: t })}
          onEdit={(t) => setDialog({ type: 'edit', task: t })}
          onDelete={(t) => setDialog({ type: 'delete', task: t })}
        />

        <TasksPagination
          page={currentPage}
          pageCount={pageCount}
          total={sorted.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>

      {/* Dialogs */}
      {dialog?.type === 'add' && (
        <TaskDialog onClose={() => setDialog(null)} onSubmit={handleAdd} />
      )}
      {dialog?.type === 'edit' && (
        <TaskDialog
          task={dialog.task}
          onClose={() => setDialog(null)}
          onSubmit={handleEdit}
        />
      )}
      {dialog?.type === 'view' && (
        <TaskDetailsDialog
          task={dialog.task}
          onClose={() => setDialog(null)}
          onEdit={() => handleViewToEdit(dialog.task)}
        />
      )}
      {dialog?.type === 'delete' && (
        <DeleteTaskDialog
          task={dialog.task}
          onClose={() => setDialog(null)}
          onConfirm={() => handleDelete(dialog.task.id)}
        />
      )}
    </div>
  )
}
