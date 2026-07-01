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
import type { UserProfile, EditableProfile } from '../types'

const inputClass =
  'h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50'

interface EditProfileDialogProps {
  profile: UserProfile
  onClose: () => void
  onSave: (updated: EditableProfile) => void
}

export default function EditProfileDialog({ profile, onClose, onSave }: EditProfileDialogProps) {
  const [name, setName] = useState(profile.name)
  const [title, setTitle] = useState(profile.title)
  const [department, setDepartment] = useState(profile.department)
  const [email, setEmail] = useState(profile.email)
  const [phone, setPhone] = useState(profile.phone)
  const [location, setLocation] = useState(profile.location)
  const [bio, setBio] = useState(profile.bio)
  const [skills, setSkills] = useState(profile.skills.join(', '))

  const valid = name.trim() !== '' && email.trim() !== ''

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return
    onSave({
      name: name.trim(),
      title: title.trim(),
      department,
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      bio: bio.trim(),
      skills: skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    })
  }

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Update your personal information and skills.</DialogDescription>
        </DialogHeader>

        <form id="profile-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pf-name">Full Name *</Label>
            <input
              id="pf-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g. Alex Morgan"
              className={inputClass}
            />
          </div>

          {/* Title + Department */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pf-title">Job Title</Label>
              <input
                id="pf-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g. Senior Product Designer"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pf-dept">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger id="pf-dept" className="h-9 w-full">
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
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pf-email">Email *</Label>
              <input
                id="pf-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pf-phone">Phone</Label>
              <input
                id="pf-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className={inputClass}
              />
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pf-location">Location</Label>
            <input
              id="pf-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="E.g. San Francisco, CA"
              className={inputClass}
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pf-bio">Bio</Label>
            <textarea
              id="pf-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A short introduction about yourself..."
              rows={4}
              className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            />
          </div>

          {/* Skills */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pf-skills">Skills (comma separated)</Label>
            <input
              id="pf-skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="E.g. Figma, Prototyping, User Research"
              className={inputClass}
            />
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="profile-form" disabled={!valid}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
