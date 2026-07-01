interface WorkloadProgressProps {
  value: number // 0-100
  showLabel?: boolean
  className?: string
}

function getColor(value: number): string {
  if (value >= 90) return 'bg-rose-500'
  if (value >= 70) return 'bg-amber-500'
  if (value >= 40) return 'bg-blue-500'
  return 'bg-emerald-500'
}

function getLabel(value: number): string {
  if (value >= 90) return 'Overloaded'
  if (value >= 70) return 'Busy'
  if (value >= 40) return 'Active'
  return 'Available'
}

export default function WorkloadProgress({ value, showLabel = false, className = '' }: WorkloadProgressProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Workload</span>
          <span className="text-xs font-medium text-foreground">
            {clamped}% - {getLabel(clamped)}
          </span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getColor(clamped)}`}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
