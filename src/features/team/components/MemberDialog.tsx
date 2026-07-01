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
import { DEPARTMENTS } from '../constants'
import type { TeamMember, Department, Availability } from '../types'

interface MemberDialogProps {
  member?: TeamMember
  onClose: () => void
  onSubmit: (member: TeamMember) => void
}

const inputClass =
  'h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50'

export default function MemberDialog({ member, onClose, onSubmit }: MemberDialogProps) {
  const isEdit = !!member

  const [name, setName] = useState(member?.name ?? '')
  const [title, setTitle] = useState(member?.title ?? '')
  const [department, setDepartment] = useState<Department>(member?.department ?? 'Engineering')
  const [email, setEmail] = useState(member?.email ?? '')
  const [phone, setPhone] = useState(member?.phone ?? '')
  const [location, setLocation] = useState(member?.location ?? '')
  const [currentProject, setCurrentProject] = useState(member?.currentProject ?? '')
  const [workload, setWorkload] = useState(String(member?.workload ?? 50))
  const [availability, setAvailability] = useState<Availability>(member?.availability ?? 'online')
  const [skills, setSkills] = useState(member?.skills?.join(', ') ?? '')
  const [bio, setBio] = useState(member?.bio ?? '')
  const [joinedDate, setJoinedDate] = useState(member?.joinedDate ?? '')

  const valid = name.trim() !== '' && email.trim() !== '' && title.trim() !== ''

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return

    const parsedSkills = skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    onSubmit({
      id: member?.id ?? `tm${Date.now()}`,
      name: name.trim(),
      title: title.trim(),
      department,
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim() || undefined,
      currentProject: currentProject.trim() || 'Unassigned',
      workload: Math.max(0, Math.min(100, Number(workload) || 0)),
      availability,
      skills: parsedSkills,
      joinedDate: joinedDate || new Date().toISOString().slice(0, 10),
      bio: bio.trim() || undefined,
    })
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit member' : 'Invite member'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update this team member\'s information.'
              : 'Add a new member to your team.'}
          </DialogDescription>
        </DialogHeader>

        <form id="member-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name + Title */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mem-name">Full Name *</Label>
              <input
                id="mem-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Cooper"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mem-title">Job Title *</Label>
              <input
                id="mem-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Senior Engineer"
                className={inputClass}
              />
            </div>
          </div>

          {/* Department + Availability */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mem-dept">Department</Label>
              <Select value={department} onValueChange={(v) => setDepartment(v as Department)}>
                <SelectTrigger id="mem-dept" className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mem-avail">Status</Label>
              <Select value={availability} onValueChange={(v) => setAvailability(v as Availability)}>
                <SelectTrigger id="mem-avail" className="h-9 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mem-email">Email *</Label>
              <input
                id="mem-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.io"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mem-phone">Phone</Label>
              <input
                id="mem-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className={inputClass}
              />
            </div>
          </div>

          {/* Location + Current Project */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mem-loc">Location</Label>
              <input
                id="mem-loc"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="mem-project">Current Project</Label>
              <input
                id="mem-project"
                value={currentProject}
                onChange={(e) => setCurrentProject(e.target.value)}
                placeholder="Project name"
                className={inputClass}
              />
            </div>
          </div>

          {/* Workload slider */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mem-workload">Workload ({workload}%)</Label>
            <input
              id="mem-workload"
              type="range"
              min={0}
              max={100}
              value={workload}
              onChange={(e) => setWorkload(e.target.value)}
              className="h-2 w-full accent-primary cursor-pointer"
            />
          </div>

          {/* Joined Date */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mem-joined">Joined Date</Label>
            <input
              id="mem-joined"
              type="date"
              value={joinedDate}
              onChange={(e) => setJoinedDate(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mem-skills">Skills (comma separated)</Label>
            <input
              id="mem-skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, TypeScript, Node.js"
              className={inputClass}
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="mem-bio">Bio</Label>
            <textarea
              id="mem-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Short professional bio..."
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 resize-none"
            />
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="member-form" disabled={!valid}>
            {isEdit ? 'Save changes' : 'Invite member'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
