import { useCallback, useMemo, useState } from 'react'
import { mockCustomers } from '../data/mockCustomers'
import { generateCustomerId, simulateLatency, fullName, sortCustomers as applySortOrder } from '../utils'
import type { Customer, CustomerFilters, CompanyFilter, StatusFilter, SortOption } from '../types'
import type { CustomerFormValues } from '../schema'

// Owns all Customers business logic (state, CRUD, search, filter, sort,
// derived stats) so UI components stay presentational. The async CRUD
// functions are shaped like real API calls (Promise-returning, with a
// simulated delay) so swapping the in-memory store for a REST client later
// only touches this file.
export function useCustomers() {
  const [allCustomers, setAllCustomers] = useState<Customer[]>(() => [...mockCustomers])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [companyFilter, setCompanyFilter] = useState<CompanyFilter>('all')
  const [sort, setSort] = useState<SortOption>('newest')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Search -> filter -> sort, each its own memo so an update to one input
  // (e.g. changing sort) doesn't re-run the search/filter predicates.
  const searchedCustomers = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (q === '') return allCustomers
    return allCustomers.filter(
      (c) =>
        fullName(c).toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q),
    )
  }, [allCustomers, search])

  const filteredCustomers = useMemo(() => {
    return searchedCustomers.filter((c) => {
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter
      const matchesCompany = companyFilter === 'all' || c.company === companyFilter
      return matchesStatus && matchesCompany
    })
  }, [searchedCustomers, statusFilter, companyFilter])

  const sortedCustomers = useMemo(
    () => applySortOrder(filteredCustomers, sort),
    [filteredCustomers, sort],
  )

  const stats = useMemo(
    () => ({
      total: allCustomers.length,
      active: allCustomers.filter((c) => c.status === 'active').length,
      pending: allCustomers.filter((c) => c.status === 'pending').length,
      blocked: allCustomers.filter((c) => c.status === 'blocked').length,
    }),
    [allCustomers],
  )

  const companies = useMemo(
    () => Array.from(new Set(allCustomers.map((c) => c.company))).sort(),
    [allCustomers],
  )

  const searchCustomers = useCallback((query: string) => setSearch(query), [])

  const filterCustomers = useCallback((filters: CustomerFilters) => {
    if (filters.status !== undefined) setStatusFilter(filters.status)
    if (filters.company !== undefined) setCompanyFilter(filters.company)
  }, [])

  const sortCustomers = useCallback((option: SortOption) => setSort(option), [])

  const createCustomer = useCallback(async (input: CustomerFormValues): Promise<void> => {
    setIsSubmitting(true)
    try {
      const customer: Customer = { ...input, id: generateCustomerId(), joinedDate: new Date().toISOString() }
      await simulateLatency(undefined)
      setAllCustomers((prev) => [customer, ...prev])
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const updateCustomer = useCallback(async (id: string, input: CustomerFormValues): Promise<void> => {
    setIsSubmitting(true)
    try {
      await simulateLatency(undefined)
      setAllCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...input } : c)))
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const deleteCustomer = useCallback(async (id: string): Promise<void> => {
    setIsSubmitting(true)
    try {
      await simulateLatency(undefined)
      setAllCustomers((prev) => prev.filter((c) => c.id !== id))
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return {
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
  }
}
