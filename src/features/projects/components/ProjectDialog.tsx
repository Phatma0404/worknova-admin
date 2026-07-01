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
import { STATUSES, PRIORITIES } from '../constants'
import type { Project, ProjectStatus, ProjectPriority } from '../types'

interface ProjectDialogProps {
  project?: Project
  onClose: () => void
  onSubmit: (project: Project) => void
}

const STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: 'Planning',
  'in-progress': 'In Progress',
  review: 'Review',
  completed: 'Completed',
  'on-hold': 'On Hold',
}

const PRIORITY_LABELS: Record<ProjectPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
}

const inputClass =
  'h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50'

export default function ProjectDialog({ project, onClose, onSubmit }: ProjectDialogProps) {
  const isEdit = !!project

  const [name, setName] = useState(project?.name ?? '')
  const [client, setClient] = useState(project?.client ?? '')
  const [description, setDescription] = useState(project?.description ?? '')
  const [status, setStatus] = useState<ProjectStatus>(project?.status ?? 'planning')
  const [priority, setPriority] = useState<ProjectPriority>(project?.priority ?? 'medium')
  const [progress, setProgress] = useState(String(project?.progress ?? 0))
  const [startDate, setStartDate] = useState(project?.startDate ?? '')
  const [dueDate, setDueDate] = useState(project?.dueDate ?? '')
  const [budget, setBudget] = useState(project?.budget !== undefined ? String(project.budget) : '')
  const [tags, setTags] = useState(project?.tags?.join(', ') ?? '')

  const valid = name.trim() !== '' && client.trim() !== '' && dueDate !== ''

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return

    const parsedProgress = Math.max(0, Math.min(100, Number(progress) || 0))
    const parsedBudget = budget.trim() !== '' ? Number(budget) : undefined
    const parsedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    onSubmit({
      id: project?.id ?? `p${Date.now()}`,
      name: name.trim(),
      client: client.trim(),
      description: description.trim(),
      status,
      priority,
      progress: parsedProgress,
      team: project?.team ?? [],
      startDate: startDate || new Date().toISOString().slice(0, 10),
      dueDate,
      budget: parsedBudget,
      tags: parsedTags.length > 0 ? parsedTags : undefined,
    })
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit project' : 'New project'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the project details below.'
              : 'Fill in the details to create a new project.'}
          </DialogDescription>
        </DialogHeader>

        <form id="project-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="proj-name">Project Name *</Label>
            <input
              id="proj-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g. Mobile Banking App"
              className={inputClass}
            />
          </div>

          {/* Client */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="proj-client">Client *</Label>
            <input
              id="proj-client"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="E.g. FinCore Bank"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="proj-desc">Description</Label>
            <textarea
              id="proj-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief project description..."
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 resize-none"
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="proj-status">Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as ProjectStatus)}>
                <SelectTrigger id="proj-status" className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="proj-priority">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as ProjectPriority)}>
                <SelectTrigger id="proj-priority" className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {PRIORITY_LABELS[p]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Progress */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="proj-progress">Progress ({progress || 0}%)</Label>
            <input
              id="proj-progress"
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="h-2 w-full accent-primary cursor-pointer"
            />
          </div>

          {/* Start + Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="proj-start">Start Date</Label>
              <input
                id="proj-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="proj-due">Due Date *</Label>
              <input
                id="proj-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="proj-budget">Budget (USD)</Label>
            <input
              id="proj-budget"
              type="number"
              min={0}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="E.g. 50000"
              className={inputClass}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="proj-tags">Tags (comma separated)</Label>
            <input
              id="proj-tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="E.g. React, TypeScript, AWS"
              className={inputClass}
            />
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="project-form" disabled={!valid}>
            {isEdit ? 'Save changes' : 'Create project'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
