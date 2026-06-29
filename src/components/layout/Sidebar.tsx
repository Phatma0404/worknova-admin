import { NavLink } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import { navItems } from './navItems'

interface SidebarProps {
  open: boolean // controls the mobile drawer; ignored on desktop where the rail is always visible
  onClose: () => void
}

// Shared link list so the desktop rail and mobile drawer stay identical.
function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'} // only exact-match the dashboard so it isn't "active" on every route
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`
          }
        >
          <Icon className="size-5 shrink-0" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop rail - static, always present from lg up */}
      <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white lg:block">
        <div className="flex h-16 items-center px-6">
          <span className="text-lg font-bold text-gray-900">ProjectFlow</span>
        </div>
        <NavLinks />
      </aside>

      {/* Mobile drawer - dimmed backdrop, tap to dismiss */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900/50 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-200 bg-white transition-transform lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <span className="text-lg font-bold text-gray-900">ProjectFlow</span>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            aria-label="Close menu"
          >
            <FiX className="size-5" />
          </button>
        </div>
        <NavLinks onNavigate={onClose} />
      </aside>
    </>
  )
}
