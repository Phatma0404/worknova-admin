import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/auth'

// Route guard: blocks unauthenticated access and remembers where the user was
// headed so login can send them back there afterwards.
export default function ProtectedLayout() {
  const token = useAuthStore((s) => s.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
