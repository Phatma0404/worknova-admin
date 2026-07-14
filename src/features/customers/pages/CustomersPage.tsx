import { useState } from 'react'
import { Plus, Users, UserCheck, Clock, Ban } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useCustomers } from '../hooks/useCustomers'
import CustomerStatCard from '../components/CustomerStatCard'
import CustomersToolbar from '../components/CustomersToolbar'
import CustomersTable from '../components/CustomersTable'
import CustomersPagination from '../components/CustomersPagination'
import CustomerFormDialog from '../components/CustomerFormDialog'
import ViewCustomerDialog from '../components/ViewCustomerDialog'
import DeleteCustomerDialog from '../components/DeleteCustomerDialog'
import { PAGE_SIZE } from '../data/mockCustomers'
import { exportCustomersToCsv } from '../utils'
import type { Customer } from '../types'
import type { CustomerFormValues } from '../schema'

type DialogState =
  | { type: 'add' }
  | { type: 'edit'; customer: Customer }
  | { type: 'view'; customer: Customer }
  | { type: 'delete'; customer: Customer }
  | null

export default function CustomersPage() {
  const {
    sortedCustomers,
    stats,
    companies,
    search,
    statusFilter,
    companyFilter,
    sort,
    isSubmitting,
    searchCustomers,
    filterCustomers,
    sortCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers()

  const [page, setPage] = useState(1)
  const [dialog, setDialog] = useState<DialogState>(null)

  const pageCount = Math.max(1, Math.ceil(sortedCustomers.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const paginated = sortedCustomers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const resetPage = () => setPage(1)

  const handleCreate = async (values: CustomerFormValues) => {
    await createCustomer(values)
    toast.success('Customer created successfully.')
  }

  const handleUpdate = async (values: CustomerFormValues) => {
    if (dialog?.type !== 'edit') return
    await updateCustomer(dialog.customer.id, values)
    toast.success('Customer updated successfully.')
  }

  const handleDeleteConfirm = async () => {
    if (dialog?.type !== 'delete') return
    await deleteCustomer(dialog.customer.id)
    toast.success('Customer deleted successfully.')
    setDialog(null)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground">Manage all your customers.</p>
        </div>
        <Button onClick={() => setDialog({ type: 'add' })}>
          <Plus className="size-4" />
          Add Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <CustomerStatCard
          label="Total Customers"
          value={stats.total}
          icon={Users}
          iconClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />
        <CustomerStatCard
          label="Active Customers"
          value={stats.active}
          icon={UserCheck}
          iconClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />
        <CustomerStatCard
          label="Pending Customers"
          value={stats.pending}
          icon={Clock}
          iconClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        />
        <CustomerStatCard
          label="Blocked Customers"
          value={stats.blocked}
          icon={Ban}
          iconClass="bg-red-500/10 text-red-600 dark:text-red-400"
        />
      </div>

      {/* Toolbar + table + pagination */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
        <CustomersToolbar
          search={search}
          onSearchChange={(v) => {
            searchCustomers(v)
            resetPage()
          }}
          status={statusFilter}
          onStatusChange={(v) => {
            filterCustomers({ status: v })
            resetPage()
          }}
          company={companyFilter}
          onCompanyChange={(v) => {
            filterCustomers({ company: v })
            resetPage()
          }}
          companies={companies}
          sort={sort}
          onSortChange={sortCustomers}
          onExport={() => exportCustomersToCsv(sortedCustomers, 'customers.csv')}
        />
        <CustomersTable
          customers={paginated}
          onView={(c) => setDialog({ type: 'view', customer: c })}
          onEdit={(c) => setDialog({ type: 'edit', customer: c })}
          onDelete={(c) => setDialog({ type: 'delete', customer: c })}
        />
        <CustomersPagination
          page={currentPage}
          pageCount={pageCount}
          total={sortedCustomers.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>

      {/* Dialogs */}
      {dialog?.type === 'add' && (
        <CustomerFormDialog
          isSubmitting={isSubmitting}
          onClose={() => setDialog(null)}
          onSubmit={handleCreate}
        />
      )}
      {dialog?.type === 'edit' && (
        <CustomerFormDialog
          customer={dialog.customer}
          isSubmitting={isSubmitting}
          onClose={() => setDialog(null)}
          onSubmit={handleUpdate}
        />
      )}
      {dialog?.type === 'view' && (
        <ViewCustomerDialog customer={dialog.customer} onClose={() => setDialog(null)} />
      )}
      {dialog?.type === 'delete' && (
        <DeleteCustomerDialog
          customer={dialog.customer}
          isDeleting={isSubmitting}
          onClose={() => setDialog(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  )
}
