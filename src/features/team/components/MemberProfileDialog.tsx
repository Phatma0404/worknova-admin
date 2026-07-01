import { Mail, Phone, MapPin, FolderKanban, Calendar } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import MemberAvatar from './MemberAvatar'
import SkillBadge from './SkillBadge'
import WorkloadProgress from './WorkloadProgress'
import type { TeamMember } from '../types'

interface MemberProfileDialogProps {
  member: TeamMember
  onClose: () => void
  onEdit: () => void
}

const DEPT_COLORS: Record<string, string> = {
  Engineering: 'bg-blue-500/15 text-blue-400 ring-blue-500/20',
  Design:      'bg-violet-500/15 text-violet-400 ring-violet-500/20',
  Product:     'bg-emerald-500/15 text-emerald-400 ring-emerald-500/20',
  Marketing:   'bg-amber-500/15 text-amber-400 ring-amber-500/20',
  Sales:       'bg-orange-500/15 text-orange-400 ring-orange-500/20',
  Support:     'bg-teal-500/15 text-teal-400 ring-teal-500/20',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function MemberProfileDialog({ member, onClose, onEdit }: MemberProfileDialogProps) {
  const deptClass = DEPT_COLORS[member.department] ?? 'bg-slate-500/15 text-slate-400 ring-slate-500/20'

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>{member.name}</DialogTitle>
          <DialogDescription>Team member profile</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          {/* Hero section */}
          <div className="flex flex-col items-center gap-3 pt-2 text-center">
            <MemberAvatar name={member.name} size="xl" online={member.availability === 'online'} />
            <div>
              <h2 className="text-lg font-bold text-foreground">{member.name}</h2>
              <p className="text-sm text-muted-foreground">{member.title}</p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${deptClass}`}
                >
                  {member.department}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium ${member.availability === 'online' ? 'text-emerald-400' : 'text-slate-400'}`}
                >
                  <span className={`size-2 rounded-full ${member.availability === 'online' ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                  {member.availability === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {member.bio && (
            <p className="text-center text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
          )}

          {/* Contact + Info */}
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
                  <Mail className="size-3.5" />
                </div>
                <a href={`mailto:${member.email}`} className="text-sm text-foreground hover:text-primary transition-colors">
                  {member.email}
                </a>
              </div>
              {member.phone && (
                <div className="flex items-center gap-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
                    <Phone className="size-3.5" />
                  </div>
                  <span className="text-sm text-foreground">{member.phone}</span>
                </div>
              )}
              {member.location && (
                <div className="flex items-center gap-3">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
                    <MapPin className="size-3.5" />
                  </div>
                  <span className="text-sm text-foreground">{member.location}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
                  <FolderKanban className="size-3.5" />
                </div>
                <span className="text-sm text-foreground">{member.currentProject}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground shadow-sm">
                  <Calendar className="size-3.5" />
                </div>
                <span className="text-sm text-muted-foreground">Joined {formatDate(member.joinedDate)}</span>
              </div>
            </div>
          </div>

          {/* Workload */}
          <WorkloadProgress value={member.workload} showLabel />

          {/* Skills */}
          {member.skills.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit}>Edit profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
