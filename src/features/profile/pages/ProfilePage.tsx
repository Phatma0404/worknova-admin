import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProfileHeader from '../components/ProfileHeader'
import SkillsSection from '../components/SkillsSection'
import ProfileStats from '../components/ProfileStats'
import ActivityTimeline from '../components/ActivityTimeline'
import CurrentProjects from '../components/CurrentProjects'
import EditProfileDialog from '../components/EditProfileDialog'
import { mockProfile } from '../constants'
import type { UserProfile, EditableProfile } from '../types'

export default function ProfilePage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [editOpen, setEditOpen] = useState(false)

  const handleSave = (updated: EditableProfile) => {
    setProfile((prev) => ({ ...prev, ...updated }))
    setEditOpen(false)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Your personal information, activity, and current work.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Left sidebar */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <ProfileHeader
            profile={profile}
            avatarUrl={avatarUrl}
            onAvatarChange={setAvatarUrl}
            onEditProfile={() => setEditOpen(true)}
            onChangePassword={() => navigate('/settings')}
          />
        </aside>

        {/* Main content */}
        <div className="flex flex-col gap-6">
          <SkillsSection
            bio={profile.bio}
            skills={profile.skills}
            yearsOfExperience={profile.yearsOfExperience}
          />
          <ProfileStats stats={profile.stats} />
          <CurrentProjects projects={profile.projects} />
          <ActivityTimeline activities={profile.activities} />
        </div>
      </div>

      {/* Edit dialog */}
      {editOpen && (
        <EditProfileDialog
          profile={profile}
          onClose={() => setEditOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
