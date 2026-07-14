import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/shared/lib/utils'

interface CustomerStatCardProps {
  label: string
  value: number
  icon: LucideIcon
  iconClass: string // colored icon container (bg + text)
}

export default function CustomerStatCard({ label, value, icon: Icon, iconClass }: CustomerStatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <div className={cn('flex size-10 items-center justify-center rounded-lg', iconClass)}>
          <Icon className="size-5" />
        </div>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{value.toLocaleString()}</p>
    </Card>
  )
}
