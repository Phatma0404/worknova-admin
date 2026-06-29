import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />, // catches errors thrown by any child route
    children: [
      // Feature routes are added here as the dashboard grows
      // e.g. { path: 'dashboard', lazy: () => import('@/features/dashboard/DashboardPage') }
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
