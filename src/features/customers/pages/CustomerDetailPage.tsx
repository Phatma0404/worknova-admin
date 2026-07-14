import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, DollarSign, FolderKanban, Receipt, CalendarDays } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/ui/Breadcrumb'
import EmptyState from '@/components/ui/EmptyState'
import { useCustomerDetail } from '../hooks/useCustomerDetail'
import CustomerProfileHeader from '../components/CustomerProfileHeader'
import CustomerStatCard from '../components/CustomerStatCard'
import ContactInfoCard from '../components/ContactInfoCard'
import CustomerInfoCard from '../components/CustomerInfoCard'
import CustomerActivityTimeline from '../components/CustomerActivityTimeline'
import CustomerProjectsSection from '../components/CustomerProjectsSection'
import CustomerInvoicesTable from '../components/CustomerInvoicesTable'
import CustomerFilesSection from '../components/CustomerFilesSection'
import CustomerNotesSection from '../components/CustomerNotesSection'
import CustomerQuickActionsSidebar from '../components/CustomerQuickActionsSidebar'
import CustomerFormDialog from '../components/CustomerFormDialog'
import DeleteCustomerDialog from '../components/DeleteCustomerDialog'
import { fullName, formatCurrency } from '../utils'
import type { CustomerFormValues } from '../schema'

export default function CustomerDetailPage() {
  const navigate = useNavigate()
  const {
    customer,
    stats,
    activities,
    projects,
    invoices,
    files,
    isSubmitting,
    updateCustomer,
    deleteCustomer,
  } = useCustomerDetail()

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  if (!customer || !stats) {
    return (
      <div className="flex flex-col gap-6">
        <EmptyState
          title="Customer not found"
          description="This customer doesn't exist or may have been removed."
          action={
            <Button onClick={() => navigate('/customers')}>
              <ArrowLeft className="size-4" />
              Back to Customers
            </Button>
          }
        />
      </div>
    )
  }

  const handleUpdate = async (values: CustomerFormValues) => {
    await updateCustomer(values)
    toast.success('Customer updated successfully.')
  }

  const handleDelete = async () => {
    await deleteCustomer()
    toast.success('Customer deleted successfully.')
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb + back */}
      <div className="flex flex-col gap-3">
        <Breadcrumb
          items={[
            { label: 'Dashboard', to: '/' },
            { label: 'Customers', to: '/customers' },
            { label: fullName(customer) },
          ]}
        />
        <Link
          to="/customers"
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Customers
        </Link>
      </div>

      <CustomerProfileHeader customer={customer} />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <CustomerStatCard
          label="Lifetime Value"
          value={formatCurrency(stats.lifetimeValue)}
          icon={DollarSign}
          iconClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />
        <CustomerStatCard
          label="Active Projects"
          value={stats.activeProjects}
          icon={FolderKanban}
          iconClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />
        <CustomerStatCard
          label="Total Invoices"
          value={stats.totalInvoices}
          icon={Receipt}
          iconClass="bg-violet-500/10 text-violet-600 dark:text-violet-400"
        />
        <CustomerStatCard
          label="Customer Since"
          value={stats.customerSince}
          icon={CalendarDays}
          iconClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        />
      </div>

      {/* Main content + sidebar */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-6">
          <ContactInfoCard customer={customer} />
          <CustomerInfoCard customer={customer} />
          <CustomerActivityTimeline activities={activities} />
          <CustomerProjectsSection projects={projects} />
          <CustomerInvoicesTable invoices={invoices} />
          <CustomerFilesSection files={files} />
          <CustomerNotesSection notes={customer.notes} />
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <CustomerQuickActionsSidebar
            customer={customer}
            onEdit={() => setEditOpen(true)}
            onDelete={() => setDeleteOpen(true)}
          />
        </aside>
      </div>

      {/* Dialogs */}
      {editOpen && (
        <CustomerFormDialog
          customer={customer}
          isSubmitting={isSubmitting}
          onClose={() => setEditOpen(false)}
          onSubmit={handleUpdate}
        />
      )}
      {deleteOpen && (
        <DeleteCustomerDialog
          customer={customer}
          isDeleting={isSubmitting}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  )
}
