import { useNavigate } from 'react-router-dom'
import { Menu, Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Avatar from '@/components/ui/Avatar'
import ThemeSwitch from '@/components/ui/ThemeSwitch'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/store/auth'

interface NavbarProps {
  onMenuClick: () => void // opens the mobile sidebar drawer
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  // Clear the session and return to the login screen.
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Fallbacks so the navbar looks complete before auth is wired up.
  const name = user?.name ?? 'Admin User'
  const email = user?.email ?? 'admin@worknova.io'

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur lg:px-6">
      {/* Mobile menu toggle - hidden on desktop where the sidebar is visible */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>

      <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>

      {/* Search - collapses on mobile */}
      <div className="relative ml-auto hidden md:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search..."
          className="h-9 w-56 rounded-lg border border-input bg-background pl-8 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 lg:w-72"
        />
      </div>

      <div className="flex items-center gap-1 md:ml-0 ml-auto md:gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative cursor-pointer" aria-label="Notifications">
          <Bell className="size-5" />
          <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white ring-2 ring-background">
            3
          </span>
        </Button>

        {/* Light / dark toggle */}
        <ThemeSwitch className="cursor-pointer" />

        {/* User avatar + dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-lg p-1 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 cursor-pointer"
              aria-label="Open user menu"
            >
              <Avatar name={name} size="sm" />
              <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="py-2">
              <p className="truncate text-sm font-medium text-foreground">{name}</p>
              <p className="truncate text-xs font-normal text-muted-foreground">{email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="size-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="size-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout} className="cursor-pointer">
              <LogOut className="size-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
