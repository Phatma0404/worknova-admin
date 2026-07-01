interface TaskProgressProps {
  value: number // 0-100
  showLabel?: boolean
  className?: string
}

function getColor(value: number): string {
  if (value >= 100) return 'bg-emerald-500'
  if (value >= 70) return 'bg-blue-500'
  if (value >= 40) return 'bg-amber-500'
  return 'bg-rose-500'
}

export default function TaskProgress({ value, showLabel = false, className = '' }: TaskProgressProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getColor(clamped)}`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="w-8 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
          {clamped}%
        </span>
      )}
    </div>
  )
}
