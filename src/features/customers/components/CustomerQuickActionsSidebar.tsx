import { Pencil, Mail, Phone, Trash2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import type { Customer } from '../types'

interface CustomerQuickActionsSidebarProps {
  customer: Customer
  onEdit: () => void
  onDelete: () => void
}

export default function CustomerQuickActionsSidebar({
  customer,
  onEdit,
  onDelete,
}: CustomerQuickActionsSidebarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        <Button size="lg" className="w-full" onClick={onEdit}>
          <Pencil className="size-4" />
          Edit Customer
        </Button>
        <Button size="lg" variant="outline" className="w-full" asChild>
          <a href={`mailto:${customer.email}`}>
            <Mail className="size-4" />
            Send Email
          </a>
        </Button>
        <Button size="lg" variant="outline" className="w-full" asChild>
          <a href={`tel:${customer.phone}`}>
            <Phone className="size-4" />
            Call Customer
          </a>
        </Button>
        <Button size="lg" variant="destructive" className="w-full" onClick={onDelete}>
          <Trash2 className="size-4" />
          Delete Customer
        </Button>
      </CardBody>
    </Card>
  )
}
