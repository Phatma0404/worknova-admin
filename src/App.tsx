import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { queryClient } from '@/shared/lib/queryClient'
import { router } from '@/routes'
import { useThemeStore } from '@/store/theme'

export default function App() {
  const theme = useThemeStore((s) => s.theme)

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster theme={theme} richColors position="top-right" />
    </QueryClientProvider>
  )
}
