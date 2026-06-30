import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min - avoid redundant refetches for stable data
      retry: 1,
      refetchOnWindowFocus: false, // admin dashboards shouldn't silently refetch on tab switch
    },
  },
})
