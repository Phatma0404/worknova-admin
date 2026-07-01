import { Calendar, FolderKanban, Tag } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import TaskStatusBadge from './TaskStatusBadge'
import TaskPriorityBadge from './TaskPriorityBadge'
import TaskProgress from './TaskProgress'
import AssigneeAvatar from './AssigneeAvatar'
import type { Task } from '../types'

interface TaskDetailsDialogProps {
  task: Task
  onClose: () => void
  onEdit: () => void
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function isOverdue(task: Task): boolean {
  return task.status !== 'done' && new Date(task.dueDate).getTime() < Date.now()
}

export default function TaskDetailsDialog({ task, onClose, onEdit }: TaskDetailsDialogProps) {
  const overdue = isOverdue(task)

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg leading-snug">{task.name}</DialogTitle>
          <DialogDescription>{task.projectName}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
            {overdue && (
              <span className="inline-flex items-center rounded-full bg-rose-500/15 px-2 py-0.5 text-xs font-medium text-rose-400 ring-1 ring-inset ring-rose-500/20">
                Overdue
              </span>
            )}
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{task.description}</p>
          )}

          {/* Progress */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm font-semibold text-foreground">{task.progress}%</span>
            </div>
            <TaskProgress value={task.progress} />
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Assignee */}
            <div className="flex items-start gap-3">
              <AssigneeAvatar name={task.assigneeName} size="md" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Assignee</span>
                <span className="text-sm font-medium text-foreground">{task.assigneeName}</span>
              </div>
            </div>

            {/* Project */}
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <FolderKanban className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Project</span>
                <span className="text-sm font-medium text-foreground line-clamp-1">
                  {task.projectName}
                </span>
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Calendar className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Due Date</span>
                <span className={`text-sm font-medium ${overdue ? 'text-rose-400' : 'text-foreground'}`}>
                  {formatDate(task.dueDate)}
                </span>
              </div>
            </div>

            {/* Created */}
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Calendar className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Created</span>
                <span className="text-sm font-medium text-foreground">
                  {formatDate(task.createdAt)}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Tag className="size-4" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground">Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit}>Edit task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
