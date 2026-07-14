import { Mail, Phone, Building2, Briefcase, Calendar, StickyNote } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Avatar from '@/components/ui/Avatar'
import CustomerStatusBadge from './CustomerStatusBadge'
import { fullName, formatJoinedDate } from '../utils'
import type { Customer } from '../types'

export default function ViewCustomerDialog({
  customer,
  onClose,
}: {
  customer: Customer
  onClose: () => void
}) {
  const rows = [
    { icon: Mail, label: 'Email', value: customer.email },
    { icon: Phone, label: 'Phone', value: customer.phone },
    { icon: Building2, label: 'Company', value: customer.company },
    { icon: Briefcase, label: 'Job title', value: customer.jobTitle || '-' },
    { icon: Calendar, label: 'Joined', value: formatJoinedDate(customer.joinedDate) },
    { icon: StickyNote, label: 'Notes', value: customer.notes || '-' },
  ]

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {/* Visually the avatar block is the title; keep an accessible label. */}
          <DialogTitle className="sr-only">Customer profile</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3 pt-2 text-center">
          <Avatar name={fullName(customer)} src={customer.avatar} size="lg" />
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-base font-semibold text-foreground">{fullName(customer)}</p>
            <CustomerStatusBadge status={customer.status} />
          </div>
        </div>

        <dl className="flex flex-col divide-y divide-border rounded-lg border border-border">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-3 py-2.5 text-sm">
              <Icon className="size-4 shrink-0 text-muted-foreground" />
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="ml-auto truncate font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  )
}
