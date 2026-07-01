import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

interface ChartCardProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
  children: ReactNode
}

// Reusable titled card shell for every chart. Renders a labelled region so the
// chart inside is announced with its title to assistive tech.
export default function ChartCard({
  title,
  description,
  action,
  className,
  children,
}: ChartCardProps) {
  return (
    <section
      aria-label={title}
      className={cn(
        'flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm',
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}
