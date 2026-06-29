import { FiMenu, FiLogOut } from 'react-icons/fi'
import { useAuthStore } from '@/store/auth'

interface NavbarProps {
  onMenuClick: () => void // opens the mobile sidebar drawer
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-4 lg:px-6">
      {/* Hamburger - only on mobile where the sidebar is hidden */}
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
        aria-label="Open menu"
      >
        <FiMenu className="size-5" />
      </button>

      <div className="ml-auto flex items-center gap-3">
        {user && (
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <FiLogOut className="size-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  )
}
