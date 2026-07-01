import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { kpis } from '../constants'

// Top KPI row. Self-contained so the analytics feature has no cross-feature deps.
export default function KPISection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map(({ id, label, value, change, trend, icon: Icon, iconClass }) => {
        const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown
        return (
          <div key={id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
              <div className={cn('flex size-10 items-center justify-center rounded-lg', iconClass)}>
                <Icon className="size-5" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold tracking-tight text-foreground">{value}</p>
            <div className="mt-1 flex items-center gap-1 text-xs">
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 font-medium',
                  trend === 'up'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400',
                )}
              >
                <TrendIcon className="size-3" />
                {change}
              </span>
              <span className="text-muted-foreground">vs last period</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
