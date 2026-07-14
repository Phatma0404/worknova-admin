import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { mockCustomers } from '../data/mockCustomers'
import {
  generateCustomerActivities,
  generateCustomerFiles,
  generateCustomerInvoices,
  generateCustomerProjects,
  generateCustomerStats,
} from '../data/customerDetailData'
import { simulateLatency } from '../utils'
import type { Customer } from '../types'
import type { CustomerFormValues } from '../schema'

// Resolves the customer for /customers/:id primarily from React Router
// navigation state (passed by the "View" action in the table, so it's
// always live/correct - including customers created earlier in the same
// session), falling back to a seed-data lookup for direct URL visits.
export function useCustomerDetail() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()

  const passedCustomer = (location.state as { customer?: Customer } | null)?.customer

  const [customer, setCustomer] = useState<Customer | undefined>(() => {
    if (passedCustomer && passedCustomer.id === id) return passedCustomer
    return mockCustomers.find((c) => c.id === id)
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const stats = useMemo(() => (customer ? generateCustomerStats(customer) : null), [customer])
  const activities = useMemo(() => (customer ? generateCustomerActivities(customer) : []), [customer])
  const projects = useMemo(() => (customer ? generateCustomerProjects(customer) : []), [customer])
  const invoices = useMemo(() => (customer ? generateCustomerInvoices(customer) : []), [customer])
  const files = useMemo(() => (customer ? generateCustomerFiles(customer) : []), [customer])

  const updateCustomer = useCallback(async (input: CustomerFormValues): Promise<void> => {
    setIsSubmitting(true)
    try {
      await simulateLatency(undefined)
      setCustomer((prev) => (prev ? { ...prev, ...input } : prev))
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const deleteCustomer = useCallback(async (): Promise<void> => {
    setIsSubmitting(true)
    try {
      await simulateLatency(undefined)
    } finally {
      setIsSubmitting(false)
    }
    navigate('/customers')
  }, [navigate])

  return { customer, stats, activities, projects, invoices, files, isSubmitting, updateCustomer, deleteCustomer }
}
