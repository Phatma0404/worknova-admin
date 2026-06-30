import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode // typically a <Button>
  className?: string
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 px-6 py-12 text-center dark:border-gray-700',
        className,
      )}
    >
      {icon && <div className="text-4xl text-gray-300 dark:text-gray-600">{icon}</div>}
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        {description && (
          <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
