import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AddCustomerModal from '../components/AddCustomerModal'

export default function CustomersPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground">Manage all your customers.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="size-4" />
          Add Customer
        </Button>
      </div>

      {modalOpen && <AddCustomerModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}
