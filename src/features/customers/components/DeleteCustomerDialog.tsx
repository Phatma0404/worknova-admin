import { AlertTriangle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogMedia,
} from '@/components/ui/alert-dialog'
import { fullName } from '../utils'
import type { Customer } from '../types'

interface DeleteCustomerDialogProps {
  customer: Customer
  isDeleting: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteCustomerDialog({
  customer,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteCustomerDialogProps) {
  return (
    <AlertDialog open onOpenChange={(o) => !o && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <AlertTriangle />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete customer?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove{' '}
            <span className="font-medium text-foreground">{fullName(customer)}</span>. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
