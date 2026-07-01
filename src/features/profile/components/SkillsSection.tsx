import { UserRound, Sparkles, Award } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface SkillsSectionProps {
  bio: string
  skills: string[]
  yearsOfExperience: number
}

export default function SkillsSection({ bio, skills, yearsOfExperience }: SkillsSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2">
        <UserRound className="size-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">About</h3>
      </div>

      {/* Bio */}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{bio}</p>

      {/* Years of experience */}
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Award className="size-4" />
        </div>
        <div>
          <p className="text-lg font-bold leading-none text-foreground">
            {yearsOfExperience} <span className="text-sm font-medium text-muted-foreground">years</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Professional experience</p>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-muted-foreground" />
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Skills</h4>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="outline" className="px-2.5 py-1">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
