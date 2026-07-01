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
import TaskStatusBadge from './TaskStatusBadge'
import TaskPriorityBadge from './TaskPriorityBadge'
import TaskProgress from './TaskProgress'
import AssigneeAvatar from './AssigneeAvatar'
import type { Task, SortField, SortDirection } from '../types'

interface TasksTableProps {
  tasks: Task[]
  sortField: SortField | null
  sortDir: SortDirection
  onSort: (field: SortField) => void
  onView: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDirection }) {
  if (!active) return <ArrowUpDown className="size-3.5 opacity-50" />
  return dir === 'asc' ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function isDueSoon(iso: string): boolean {
  const diff = new Date(iso).getTime() - Date.now()
  return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000
}

function isOverdue(iso: string): boolean {
  return new Date(iso).getTime() < Date.now()
}

export default function TasksTable({
  tasks,
  sortField,
  sortDir,
  onSort,
  onView,
  onEdit,
  onDelete,
}: TasksTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="min-w-[200px]">Task Name</TableHead>
            <TableHead className="hidden lg:table-cell">Project</TableHead>
            <TableHead className="hidden md:table-cell">Assignee</TableHead>
            <TableHead className="hidden sm:table-cell">
              <button
                onClick={() => onSort('priority')}
                className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
              >
                Priority <SortIcon active={sortField === 'priority'} dir={sortDir} />
              </button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">
              <button
                onClick={() => onSort('dueDate')}
                className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
              >
                Due Date <SortIcon active={sortField === 'dueDate'} dir={sortDir} />
              </button>
            </TableHead>
            <TableHead className="hidden lg:table-cell min-w-[130px]">Progress</TableHead>
            <TableHead className="w-12 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={8} className="h-24 text-center text-sm text-muted-foreground">
                No tasks found.
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => {
              const overdue = task.status !== 'done' && isOverdue(task.dueDate)
              const soon = task.status !== 'done' && !overdue && isDueSoon(task.dueDate)
              return (
                <TableRow key={task.id} className="group">
                  {/* Task Name */}
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => onView(task)}
                        className="text-left text-sm font-medium text-foreground transition-colors hover:text-primary line-clamp-1"
                      >
                        {task.name}
                      </button>
                      {task.tags && task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {task.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded px-1.5 py-0.5 text-[10px] font-medium bg-muted text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </TableCell>

                  {/* Project */}
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {task.projectName}
                    </span>
                  </TableCell>

                  {/* Assignee */}
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <AssigneeAvatar name={task.assigneeName} />
                      <span className="text-sm text-muted-foreground">{task.assigneeName}</span>
                    </div>
                  </TableCell>

                  {/* Priority */}
                  <TableCell className="hidden sm:table-cell">
                    <TaskPriorityBadge priority={task.priority} />
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <TaskStatusBadge status={task.status} />
                  </TableCell>

                  {/* Due Date */}
                  <TableCell className="hidden md:table-cell">
                    <span
                      className={`text-sm ${
                        overdue
                          ? 'font-medium text-rose-400'
                          : soon
                          ? 'font-medium text-amber-400'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {formatDate(task.dueDate)}
                      {overdue && <span className="ml-1 text-xs">(overdue)</span>}
                      {soon && <span className="ml-1 text-xs">(soon)</span>}
                    </span>
                  </TableCell>

                  {/* Progress */}
                  <TableCell className="hidden lg:table-cell">
                    <TaskProgress value={task.progress} showLabel />
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${task.name}`}>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView(task)}>
                          <Eye className="size-4" />
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(task)}>
                          <Pencil className="size-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => onDelete(task)}>
                          <Trash2 className="size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
