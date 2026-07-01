import TeamCard from './TeamCard'
import type { TeamMember } from '../types'

interface TeamGridProps {
  members: TeamMember[]
  onView: (member: TeamMember) => void
  onEdit: (member: TeamMember) => void
  onRemove: (member: TeamMember) => void
}

export default function TeamGrid({ members, onView, onEdit, onRemove }: TeamGridProps) {
  if (members.length === 0) {
    return (
      <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border">
        <p className="text-sm font-medium text-foreground">No team members found</p>
        <p className="text-xs text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {members.map((member) => (
        <TeamCard
          key={member.id}
          member={member}
          onView={onView}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}
