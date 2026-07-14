import { Mail, Phone, Building2, Briefcase } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import type { Customer } from '../types'

function InfoRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}

export default function ContactInfoCard({ customer }: { customer: Customer }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardBody className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoRow icon={Mail} label="Email" value={customer.email} />
        <InfoRow icon={Phone} label="Phone" value={customer.phone} />
        <InfoRow icon={Building2} label="Company" value={customer.company} />
        <InfoRow icon={Briefcase} label="Job Title" value={customer.jobTitle || '-'} />
      </CardBody>
    </Card>
  )
}
