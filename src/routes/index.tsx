import { createBrowserRouter } from 'react-router-dom'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import AppLayout from '@/layouts/AppLayout'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import LoginPage from '@/features/auth/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    // Standalone - no sidebar/navbar chrome around the login screen
    path: '/login',
    element: <LoginPage />,
  },
  {
    // Auth guard - redirects to /login when there's no session
    element: <ProtectedLayout />,
    children: [
      {
        path: '/',
        element: <AppLayout />, // sidebar + navbar chrome around every routed page
        errorElement: <NotFoundPage />, // catches errors thrown by any child route
        children: [
          { index: true, element: <DashboardPage /> },
          // Further feature routes (projects, users, ...) are added here as siblings
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
