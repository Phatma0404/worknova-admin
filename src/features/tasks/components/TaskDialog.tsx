import { useState, type FormEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { TASK_STATUSES, TASK_PRIORITIES, TASK_PROJECTS, TASK_ASSIGNEES } from '../constants'
import type { Task, TaskStatus, TaskPriority } from '../types'

interface TaskDialogProps {
  task?: Task
  onClose: () => void
  onSubmit: (task: Task) => void
}

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  review: 'Review',
  done: 'Done',
  blocked: 'Blocked',
}

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
}

const inputClass =
  'h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50'

export default function TaskDialog({ task, onClose, onSubmit }: TaskDialogProps) {
  const isEdit = !!task

  const [name, setName] = useState(task?.name ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [projectId, setProjectId] = useState(task?.projectId ?? '')
  const [assigneeId, setAssigneeId] = useState(task?.assigneeId ?? '')
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? 'todo')
  const [priority, setPriority] = useState<TaskPriority>(task?.priority ?? 'medium')
  const [progress, setProgress] = useState(String(task?.progress ?? 0))
  const [dueDate, setDueDate] = useState(task?.dueDate ?? '')
  const [tags, setTags] = useState(task?.tags?.join(', ') ?? '')

  const valid = name.trim() !== '' && projectId !== '' && assigneeId !== '' && dueDate !== ''

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return

    const selectedProject = TASK_PROJECTS.find((p) => p.id === projectId)!
    const selectedAssignee = TASK_ASSIGNEES.find((a) => a.id === assigneeId)!
    const parsedProgress = Math.max(0, Math.min(100, Number(progress) || 0))
    const parsedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    onSubmit({
      id: task?.id ?? `t${Date.now()}`,
      name: name.trim(),
      description: description.trim() || undefined,
      projectId,
      projectName: selectedProject.name,
      assigneeId,
      assigneeName: selectedAssignee.name,
      status,
      priority,
      progress: parsedProgress,
      dueDate,
      createdAt: task?.createdAt ?? new Date().toISOString(),
      tags: parsedTags.length > 0 ? parsedTags : undefined,
    })
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit task' : 'New task'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update task details below.' : 'Fill in the details to create a new task.'}
          </DialogDescription>
        </DialogHeader>

        <form id="task-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Task Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-name">Task Name *</Label>
            <input
              id="task-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g. Implement login page"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-desc">Description</Label>
            <textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the task in detail..."
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 resize-none"
            />
          </div>

          {/* Project + Assignee */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-project">Project *</Label>
              <Select value={projectId} onValueChange={setProjectId}>
                <SelectTrigger id="task-project" className="h-9 w-full">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PROJECTS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-assignee">Assignee *</Label>
              <Select value={assigneeId} onValueChange={setAssigneeId}>
                <SelectTrigger id="task-assignee" className="h-9 w-full">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_ASSIGNEES.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-status">Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as TaskStatus)}>
                <SelectTrigger id="task-status" className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="task-priority">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
                <SelectTrigger id="task-priority" className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {PRIORITY_LABELS[p]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Progress slider */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-progress">Progress ({progress || 0}%)</Label>
            <input
              id="task-progress"
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="h-2 w-full accent-primary cursor-pointer"
            />
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-due">Due Date *</Label>
            <input
              id="task-due"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="task-tags">Tags (comma separated)</Label>
            <input
              id="task-tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="E.g. API, React, Security"
              className={inputClass}
            />
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="task-form" disabled={!valid}>
            {isEdit ? 'Save changes' : 'Create task'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
