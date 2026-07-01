import { Mail, Phone, FolderKanban, MapPin, MoreHorizontal, Eye, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import MemberAvatar from './MemberAvatar'
import SkillBadge from './SkillBadge'
import WorkloadProgress from './WorkloadProgress'
import type { TeamMember } from '../types'

const DEPT_COLORS: Record<string, string> = {
  Engineering: 'bg-blue-500/15 text-blue-400 ring-blue-500/20',
  Design:      'bg-violet-500/15 text-violet-400 ring-violet-500/20',
  Product:     'bg-emerald-500/15 text-emerald-400 ring-emerald-500/20',
  Marketing:   'bg-amber-500/15 text-amber-400 ring-amber-500/20',
  Sales:       'bg-orange-500/15 text-orange-400 ring-orange-500/20',
  Support:     'bg-teal-500/15 text-teal-400 ring-teal-500/20',
}

interface TeamCardProps {
  member: TeamMember
  onView: (member: TeamMember) => void
  onEdit: (member: TeamMember) => void
  onRemove: (member: TeamMember) => void
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const MAX_SKILLS = 3

export default function TeamCard({ member, onView, onEdit, onRemove }: TeamCardProps) {
  const deptClass = DEPT_COLORS[member.department] ?? 'bg-slate-500/15 text-slate-400 ring-slate-500/20'

  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Top actions */}
      <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${member.name}`}>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView(member)}>
              <Eye className="size-4" />
              View profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(member)}>
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => onRemove(member)}>
              <Trash2 className="size-4" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-4 p-5">
        {/* Avatar + Name */}
        <div className="flex items-center gap-3">
          <MemberAvatar name={member.name} size="lg" online={member.availability === 'online'} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{member.name}</p>
            <p className="truncate text-xs text-muted-foreground">{member.title}</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${deptClass}`}
              >
                {member.department}
              </span>
              <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${member.availability === 'online' ? 'text-emerald-400' : 'text-slate-400'}`}>
                <span className={`size-1.5 rounded-full ${member.availability === 'online' ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                {member.availability === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-1.5">
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="size-3.5 shrink-0" />
            <span className="truncate">{member.email}</span>
          </a>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="size-3.5 shrink-0" />
            <span>{member.phone}</span>
          </div>
          {member.location && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">{member.location}</span>
            </div>
          )}
        </div>

        {/* Current Project */}
        <div className="flex items-start gap-2 rounded-lg bg-muted/60 px-3 py-2">
          <FolderKanban className="mt-px size-3.5 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Current Project</p>
            <p className="truncate text-xs font-medium text-foreground">{member.currentProject}</p>
          </div>
        </div>

        {/* Workload */}
        <WorkloadProgress value={member.workload} showLabel />

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {member.skills.slice(0, MAX_SKILLS).map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
          {member.skills.length > MAX_SKILLS && (
            <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground ring-1 ring-inset ring-border">
              +{member.skills.length - MAX_SKILLS} more
            </span>
          )}
        </div>
      </div>

      {/* Card footer */}
      <div className="mt-auto flex items-center justify-between border-t border-border px-5 py-3">
        <span className="text-[10px] text-muted-foreground">
          Joined {formatDate(member.joinedDate)}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onView(member)}
          className="h-7 px-2 text-xs"
        >
          View Profile
        </Button>
      </div>
    </div>
  )
}
