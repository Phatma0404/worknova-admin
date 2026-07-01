import { useRef } from 'react'
import { Mail, Phone, MapPin, CalendarDays, Camera, Pencil, KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { UserProfile } from '../types'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getGradient(name: string): string {
  const colors = [
    'from-violet-500 to-purple-600',
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-sky-500 to-cyan-600',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function formatJoinDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

interface ContactRowProps {
  icon: typeof Mail
  label: string
  value: string
}

function ContactRow({ icon: Icon, label, value }: ContactRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}

interface ProfileHeaderProps {
  profile: UserProfile
  avatarUrl: string | null
  onAvatarChange: (dataUrl: string) => void
  onEditProfile: () => void
  onChangePassword: () => void
}

export default function ProfileHeader({
  profile,
  avatarUrl,
  onAvatarChange,
  onEditProfile,
  onChangePassword,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') onAvatarChange(reader.result)
    }
    reader.readAsDataURL(file)
    // Reset so selecting the same file again still fires onChange.
    e.target.value = ''
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      {/* Avatar + identity */}
      <div className="flex flex-col items-center text-center">
        <div className="relative">
          <div className="rounded-full p-1 ring-2 ring-primary/20">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={profile.name}
                className="size-24 rounded-full object-cover"
              />
            ) : (
              <div
                className={`flex size-24 items-center justify-center rounded-full bg-gradient-to-br text-3xl font-bold text-white ${getGradient(profile.name)}`}
              >
                {getInitials(profile.name)}
              </div>
            )}
          </div>

          {/* Online dot */}
          <span
            className={`absolute bottom-1.5 right-1.5 size-4 rounded-full ring-2 ring-card ${
              profile.online ? 'bg-emerald-500' : 'bg-slate-400'
            }`}
            title={profile.online ? 'Online' : 'Offline'}
          />

          {/* Change avatar button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105"
            title="Change avatar"
          >
            <Camera className="size-4" />
            <span className="sr-only">Change avatar</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <h2 className="mt-4 text-lg font-bold text-foreground">{profile.name}</h2>
        <p className="text-sm text-muted-foreground">{profile.title}</p>
        <Badge variant="secondary" className="mt-2">
          {profile.department}
        </Badge>

        <span
          className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium ${
            profile.online ? 'text-emerald-400' : 'text-muted-foreground'
          }`}
        >
          <span className={`size-1.5 rounded-full ${profile.online ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          {profile.online ? 'Online' : 'Offline'}
        </span>
      </div>

      {/* Contact details */}
      <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
        <ContactRow icon={Mail} label="Email" value={profile.email} />
        <ContactRow icon={Phone} label="Phone" value={profile.phone} />
        <ContactRow icon={MapPin} label="Location" value={profile.location} />
        <ContactRow icon={CalendarDays} label="Joined" value={formatJoinDate(profile.joinDate)} />
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-2">
        <Button size="lg" onClick={onEditProfile} className="w-full">
          <Pencil className="size-4" />
          Edit Profile
        </Button>
        <Button size="lg" variant="outline" onClick={onChangePassword} className="w-full">
          <KeyRound className="size-4" />
          Change Password
        </Button>
      </div>
    </div>
  )
}
