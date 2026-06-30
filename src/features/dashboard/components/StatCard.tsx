import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/shared/lib/utils'
import type { Stat } from '../constants'

// One statistics tile: colored icon, big value, and a trend chip.
export default function StatCard({ label, value, change, trend, icon: Icon, iconClass }: Stat) {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className={cn('flex size-10 items-center justify-center rounded-lg', iconClass)}>
          <Icon className="size-5" />
        </div>
      </div>

      <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{value}</p>

      <div className="mt-2 flex items-center gap-1.5 text-xs">
        <span
          className={cn(
            'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium',
            trend === 'up'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-red-500/10 text-red-600 dark:text-red-400',
          )}
        >
          <TrendIcon className="size-3" />
          {change}
        </span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </Card>
  )
}
