import { Calendar, DollarSign, Users, Tag } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import ProjectStatusBadge from './ProjectStatusBadge'
import ProjectPriorityBadge from './ProjectPriorityBadge'
import ProgressBar from './ProgressBar'
import TeamAvatars from './TeamAvatars'
import type { Project } from '../types'

interface ProjectDetailsDialogProps {
  project: Project
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

function formatBudget(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
}

function InfoRow({ icon: Icon, label, children }: { icon: typeof Calendar; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-muted-foreground">{label}</span>
        <div className="text-sm font-medium text-foreground">{children}</div>
      </div>
    </div>
  )
}

export default function ProjectDetailsDialog({ project, onClose, onEdit }: ProjectDetailsDialogProps) {
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg">{project.name}</DialogTitle>
          <DialogDescription>{project.client}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <ProjectStatusBadge status={project.status} />
            <ProjectPriorityBadge priority={project.priority} />
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
          )}

          {/* Progress */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm font-semibold text-foreground">{project.progress}%</span>
            </div>
            <ProgressBar value={project.progress} />
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoRow icon={Calendar} label="Start Date">
              {formatDate(project.startDate)}
            </InfoRow>
            <InfoRow icon={Calendar} label="Due Date">
              {formatDate(project.dueDate)}
            </InfoRow>
            {project.budget !== undefined && (
              <InfoRow icon={DollarSign} label="Budget">
                {formatBudget(project.budget)}
              </InfoRow>
            )}
            <InfoRow icon={Users} label={`Team (${project.team.length})`}>
              {project.team.length > 0 ? (
                <TeamAvatars members={project.team} />
              ) : (
                <span className="text-muted-foreground">No members assigned</span>
              )}
            </InfoRow>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Tag className="size-4" />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground">Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
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
          <Button onClick={onEdit}>
            Edit project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
