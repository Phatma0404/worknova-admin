import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Loader from '@/components/ui/Loader'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { customerSchema, type CustomerFormValues } from '../schema'
import type { Customer } from '../types'

interface CustomerFormDialogProps {
  customer?: Customer // undefined = add mode
  isSubmitting: boolean
  onClose: () => void
  onSubmit: (values: CustomerFormValues) => Promise<void>
}

const STATUS_LABELS: Record<CustomerFormValues['status'], string> = {
  active: 'Active',
  pending: 'Pending',
  inactive: 'Inactive',
  blocked: 'Blocked',
}

const EMPTY_VALUES: CustomerFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  status: 'active',
  notes: '',
}

const inputClass =
  'h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50'

export default function CustomerFormDialog({
  customer,
  isSubmitting,
  onClose,
  onSubmit,
}: CustomerFormDialogProps) {
  const isEdit = !!customer

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer
      ? {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          company: customer.company,
          jobTitle: customer.jobTitle ?? '',
          status: customer.status,
          notes: customer.notes ?? '',
        }
      : EMPTY_VALUES,
  })

  // Re-sync the form when switching which customer is being edited.
  useEffect(() => {
    reset(
      customer
        ? {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            company: customer.company,
            jobTitle: customer.jobTitle ?? '',
            status: customer.status,
            notes: customer.notes ?? '',
          }
        : EMPTY_VALUES,
    )
  }, [customer, reset])

  const submit = async (values: CustomerFormValues) => {
    await onSubmit(values)
    reset(EMPTY_VALUES)
    onClose()
  }

  return (
    <Dialog open onOpenChange={(o) => !o && !isSubmitting && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the customer details below.'
              : 'Create a new customer record. No data is sent to a server.'}
          </DialogDescription>
        </DialogHeader>

        <form id="customer-form" onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cust-first-name">First Name *</Label>
              <input
                id="cust-first-name"
                placeholder="Jane"
                className={inputClass}
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cust-last-name">Last Name *</Label>
              <input
                id="cust-last-name"
                placeholder="Cooper"
                className={inputClass}
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className="text-xs text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cust-email">Email *</Label>
              <input
                id="cust-email"
                type="email"
                placeholder="jane@example.com"
                className={inputClass}
                {...register('email')}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cust-phone">Phone Number *</Label>
              <input
                id="cust-phone"
                type="tel"
                placeholder="+1 555 123 4567"
                className={inputClass}
                {...register('phone')}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cust-company">Company *</Label>
              <input
                id="cust-company"
                placeholder="Acme Corp"
                className={inputClass}
                {...register('company')}
              />
              {errors.company && (
                <p className="text-xs text-destructive">{errors.company.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cust-job-title">Job Title</Label>
              <input
                id="cust-job-title"
                placeholder="Marketing Lead"
                className={inputClass}
                {...register('jobTitle')}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cust-status">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="cust-status" className="h-9 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.keys(STATUS_LABELS) as (keyof typeof STATUS_LABELS)[]).map((s) => (
                      <SelectItem key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cust-notes">Notes</Label>
            <textarea
              id="cust-notes"
              placeholder="Additional context about this customer..."
              rows={3}
              className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
              {...register('notes')}
            />
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" form="customer-form" disabled={isSubmitting}>
            {isSubmitting && <Loader size="sm" />}
            {isEdit ? 'Save Changes' : 'Create Customer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
