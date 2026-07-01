import { createBrowserRouter } from 'react-router-dom'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import AppLayout from '@/layouts/AppLayout'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import AnalyticsPage from '@/features/analytics/pages/AnalyticsPage'
import UsersPage from '@/features/users/pages/UsersPage'
import ProjectsPage from '@/features/projects/pages/ProjectsPage'
import TasksPage from '@/features/tasks/pages/TasksPage'
import TeamPage from '@/features/team/pages/TeamPage'
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
          { path: 'analytics', element: <AnalyticsPage /> },
          { path: 'users', element: <UsersPage /> },
          { path: 'projects', element: <ProjectsPage /> },
          { path: 'tasks', element: <TasksPage /> },
          { path: 'team', element: <TeamPage /> },
          // Further feature routes (settings, ...) are added here as siblings
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
