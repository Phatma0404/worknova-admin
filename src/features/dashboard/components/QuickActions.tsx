import { useNavigate } from 'react-router-dom'
import { cn } from '@/shared/lib/utils'
import { quickActions } from '../constants'

// Shortcut tile grid for the most common admin actions. Only actions with a
// `to` route navigate - the rest stay decorative until wired up.
export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-2 gap-3">
      {quickActions.map(({ id, label, icon: Icon, iconClass, to }) => (
        <button
          key={id}
          type="button"
          onClick={to ? () => navigate(to) : undefined}
          className="flex cursor-pointer flex-col items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-3.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted/70 hover:shadow-md"
        >
          <span className={cn('flex size-9 items-center justify-center rounded-lg', iconClass)}>
            <Icon className="size-4.5" />
          </span>
          <span className="text-sm font-medium text-foreground">{label}</span>
        </button>
      ))}
    </div>
  )
}
