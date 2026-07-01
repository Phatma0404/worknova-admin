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
import ProjectStatusBadge from './ProjectStatusBadge'
import ProjectPriorityBadge from './ProjectPriorityBadge'
import ProgressBar from './ProgressBar'
import TeamAvatars from './TeamAvatars'
import type { Project, SortField, SortDirection } from '../types'

interface ProjectsTableProps {
  projects: Project[]
  sortField: SortField | null
  sortDir: SortDirection
  onSort: (field: SortField) => void
  onView: (project: Project) => void
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDirection }) {
  if (!active) return <ArrowUpDown className="size-3.5 opacity-50" />
  return dir === 'asc' ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function ProjectsTable({
  projects,
  sortField,
  sortDir,
  onSort,
  onView,
  onEdit,
  onDelete,
}: ProjectsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>
              <button
                onClick={() => onSort('name')}
                className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
              >
                Project Name <SortIcon active={sortField === 'name'} dir={sortDir} />
              </button>
            </TableHead>
            <TableHead className="hidden md:table-cell">Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell">Priority</TableHead>
            <TableHead className="hidden lg:table-cell min-w-[140px]">Progress</TableHead>
            <TableHead className="hidden xl:table-cell">Team</TableHead>
            <TableHead className="hidden md:table-cell">
              <button
                onClick={() => onSort('dueDate')}
                className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
              >
                Due Date <SortIcon active={sortField === 'dueDate'} dir={sortDir} />
              </button>
            </TableHead>
            <TableHead className="w-12 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={8} className="h-24 text-center text-sm text-muted-foreground">
                No projects found.
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <TableRow key={project.id} className="group">
                {/* Project Name */}
                <TableCell>
                  <div className="flex flex-col">
                    <button
                      onClick={() => onView(project)}
                      className="text-left text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {project.name}
                    </button>
                    {project.tags && project.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
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

                {/* Client */}
                <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                  {project.client}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <ProjectStatusBadge status={project.status} />
                </TableCell>

                {/* Priority */}
                <TableCell className="hidden sm:table-cell">
                  <ProjectPriorityBadge priority={project.priority} />
                </TableCell>

                {/* Progress */}
                <TableCell className="hidden lg:table-cell">
                  <ProgressBar value={project.progress} showLabel />
                </TableCell>

                {/* Team Avatars */}
                <TableCell className="hidden xl:table-cell">
                  <TeamAvatars members={project.team} />
                </TableCell>

                {/* Due Date */}
                <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                  {formatDate(project.dueDate)}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${project.name}`}>
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(project)}>
                        <Eye className="size-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(project)}>
                        <Pencil className="size-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive" onClick={() => onDelete(project)}>
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
    </div>
  )
}
