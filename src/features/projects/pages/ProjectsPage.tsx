import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProjectFilters from '../components/ProjectFilters'
import ProjectsTable from '../components/ProjectsTable'
import ProjectDialog from '../components/ProjectDialog'
import DeleteProjectDialog from '../components/DeleteProjectDialog'
import ProjectDetailsDialog from '../components/ProjectDetailsDialog'
import { mockProjects, PAGE_SIZE } from '../constants'
import type { Project, SortField, SortDirection, StatusFilter, PriorityFilter } from '../types'

type DialogState =
  | { type: 'add' }
  | { type: 'edit'; project: Project }
  | { type: 'view'; project: Project }
  | { type: 'delete'; project: Project }
  | null

function ProjectsPagination({
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
        {total === 0 ? 'No results' : `Showing ${from}-${to} of ${total} projects`}
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>('asc')
  const [page, setPage] = useState(1)
  const [dialog, setDialog] = useState<DialogState>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesSearch =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || p.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [projects, search, statusFilter, priorityFilter])

  const sorted = useMemo(() => {
    if (!sortField) return filtered
    const dir = sortDir === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => {
      if (sortField === 'name') return a.name.localeCompare(b.name) * dir
      return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * dir
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

  const handleAdd = (project: Project) => {
    setProjects((prev) => [project, ...prev])
    setDialog(null)
  }

  const handleEdit = (project: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === project.id ? project : p)))
    setDialog(null)
  }

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
    setDialog(null)
  }

  // When user clicks "Edit project" from the details dialog - switch dialogs
  const handleViewToEdit = (project: Project) => {
    setDialog({ type: 'edit', project })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track all your client projects.
          </p>
        </div>
        <Button onClick={() => setDialog({ type: 'add' })}>
          <Plus className="size-4" />
          New Project
        </Button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total', value: projects.length, color: 'text-foreground' },
          { label: 'In Progress', value: projects.filter((p) => p.status === 'in-progress').length, color: 'text-blue-400' },
          { label: 'Completed', value: projects.filter((p) => p.status === 'completed').length, color: 'text-emerald-400' },
          { label: 'On Hold', value: projects.filter((p) => p.status === 'on-hold').length, color: 'text-rose-400' },
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
        <ProjectFilters
          search={search}
          onSearchChange={(v) => { setSearch(v); resetPage() }}
          status={statusFilter}
          onStatusChange={(v) => { setStatusFilter(v); resetPage() }}
          priority={priorityFilter}
          onPriorityChange={(v) => { setPriorityFilter(v); resetPage() }}
        />

        <ProjectsTable
          projects={paginated}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
          onView={(p) => setDialog({ type: 'view', project: p })}
          onEdit={(p) => setDialog({ type: 'edit', project: p })}
          onDelete={(p) => setDialog({ type: 'delete', project: p })}
        />

        <ProjectsPagination
          page={currentPage}
          pageCount={pageCount}
          total={sorted.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>

      {/* Dialogs */}
      {dialog?.type === 'add' && (
        <ProjectDialog onClose={() => setDialog(null)} onSubmit={handleAdd} />
      )}
      {dialog?.type === 'edit' && (
        <ProjectDialog
          project={dialog.project}
          onClose={() => setDialog(null)}
          onSubmit={handleEdit}
        />
      )}
      {dialog?.type === 'view' && (
        <ProjectDetailsDialog
          project={dialog.project}
          onClose={() => setDialog(null)}
          onEdit={() => handleViewToEdit(dialog.project)}
        />
      )}
      {dialog?.type === 'delete' && (
        <DeleteProjectDialog
          project={dialog.project}
          onClose={() => setDialog(null)}
          onConfirm={() => handleDelete(dialog.project.id)}
        />
      )}
    </div>
  )
}
