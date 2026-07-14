import { CircleDot, CalendarDays, Hash } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import CustomerStatusBadge from './CustomerStatusBadge'
import { formatJoinedDate } from '../utils'
import type { Customer } from '../types'

export default function CustomerInfoCard({ customer }: { customer: Customer }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <CircleDot className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Status</p>
            <CustomerStatusBadge status={customer.status} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <CalendarDays className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Joined Date</p>
            <p className="text-sm font-medium text-foreground">{formatJoinedDate(customer.joinedDate)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Hash className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Customer ID</p>
            <p className="truncate text-sm font-medium text-foreground" title={customer.id}>
              {customer.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
