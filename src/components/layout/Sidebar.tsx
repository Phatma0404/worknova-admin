import { NavLink, useNavigate } from 'react-router-dom'
import { X, Workflow, LogOut } from 'lucide-react'
import { navSections } from './navItems'
import Avatar from '@/components/ui/Avatar'
import { useAuthStore } from '@/store/auth'
import { cn } from '@/shared/lib/utils'

interface SidebarProps {
  open: boolean // controls the mobile drawer; ignored on desktop where the rail is always visible
  onClose: () => void
}

// Single navigation link with a left accent bar that fades in when active.
function NavItemLink({
  to,
  label,
  icon: Icon,
  onNavigate,
}: {
  to: string
  label: string
  icon: typeof Workflow
  onNavigate?: () => void
}) {
  return (
    <NavLink
      to={to}
      end={to === '/'} // only exact-match the dashboard so it isn't active everywhere
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={cn(
              'absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-opacity duration-200',
              isActive ? 'opacity-100' : 'opacity-0',
            )}
          />
          <Icon className="size-5 shrink-0" />
          {label}
        </>
      )}
    </NavLink>
  )
}

// Full sidebar body shared by the desktop rail and the mobile drawer.
function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const name = user?.name ?? 'Admin User'

  // Clear the session and return to the login screen.
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center gap-2.5 px-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Workflow className="size-5" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold">WorkNova</span>
          <span className="text-xs text-muted-foreground">Admin Dashboard</span>
        </div>
      </div>

      {/* Sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {navSections.map((section) => (
          <div key={section.label} className="mb-5">
            <p className="px-3 pb-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {section.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <NavItemLink key={item.to} {...item} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User profile */}
      <div className="shrink-0 border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
          <Avatar name={name} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">{name}</p>
            <p className="truncate text-xs text-muted-foreground">Administrator</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground cursor-pointer"
            aria-label="Logout"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop rail - always visible from lg up */}
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer - dimmed backdrop, tap to dismiss */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 border-r border-sidebar-border transition-transform lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-5 z-10 rounded-md p-1 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          aria-label="Close menu"
        >
          <X className="size-5" />
        </button>
        <SidebarContent onNavigate={onClose} />
      </aside>
    </>
  )
}
