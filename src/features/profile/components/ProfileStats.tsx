import { CheckCircle2, FolderKanban, Users, TrendingUp } from 'lucide-react'
import type { ProfileStats as ProfileStatsType } from '../types'

interface StatCardConfig {
  key: keyof ProfileStatsType
  label: string
  icon: typeof CheckCircle2
  iconClass: string
  suffix?: string
}

const STAT_CARDS: StatCardConfig[] = [
  {
    key: 'completedTasks',
    label: 'Completed Tasks',
    icon: CheckCircle2,
    iconClass: 'bg-emerald-500/10 text-emerald-400',
  },
  {
    key: 'activeProjects',
    label: 'Active Projects',
    icon: FolderKanban,
    iconClass: 'bg-blue-500/10 text-blue-400',
  },
  {
    key: 'teamMemberships',
    label: 'Team Memberships',
    icon: Users,
    iconClass: 'bg-violet-500/10 text-violet-400',
  },
  {
    key: 'productivityScore',
    label: 'Productivity Score',
    icon: TrendingUp,
    iconClass: 'bg-amber-500/10 text-amber-400',
    suffix: '%',
  },
]

interface ProfileStatsProps {
  stats: ProfileStatsType
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold text-foreground">Statistics</h3>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STAT_CARDS.map(({ key, label, icon: Icon, iconClass, suffix }) => (
          <div
            key={key}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/30"
          >
            <div className={`flex size-9 items-center justify-center rounded-lg ${iconClass}`}>
              <Icon className="size-4" />
            </div>
            <p className="mt-3 text-2xl font-bold tabular-nums text-foreground">
              {stats[key]}
              {suffix && <span className="text-base font-semibold text-muted-foreground">{suffix}</span>}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
