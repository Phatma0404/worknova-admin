import { Link } from 'react-router-dom'
import {
  Compass,
  ArrowLeft,
  Home,
  Workflow,
  LayoutDashboard,
  FolderKanban,
  ListChecks,
  Users,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ThemeSwitch from '@/components/ui/ThemeSwitch'

const QUICK_LINKS = [
  { label: 'Dashboard', to: '/',          icon: LayoutDashboard },
  { label: 'Projects',  to: '/projects',  icon: FolderKanban },
  { label: 'Tasks',     to: '/tasks',     icon: ListChecks },
  { label: 'Team',      to: '/team',      icon: Users },
  { label: 'Calendar',  to: '/calendar',  icon: Calendar },
]

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      {/* Decorative dot grid, faded toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:24px_24px] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,transparent_0%,var(--color-background)_75%)]"
      />

      {/* Top bar - brand mark + theme switch, mirrors the login page header */}
      <div className="relative z-10 flex items-center justify-between p-4 sm:p-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Workflow className="size-5" />
          </div>
          <span className="text-lg font-bold text-foreground">WorkNova</span>
        </Link>
        <ThemeSwitch />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-4 pb-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground shadow-sm">
          <Compass className="size-8" />
        </div>

        <div className="space-y-2">
          <p className="bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-7xl font-bold tracking-tight text-transparent sm:text-8xl">
            404
          </p>
          <h1 className="text-xl font-semibold">Page not found</h1>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" onClick={() => window.history.back()} className="cursor-pointer">
            <ArrowLeft className="size-4" />
            Go back
          </Button>
          <Button asChild>
            <Link to="/">
              <Home className="size-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Quick links - helps admins jump straight back into their work */}
        <div className="mt-4 flex flex-col items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Or jump to
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {QUICK_LINKS.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
              >
                <Icon className="size-3.5 text-muted-foreground" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
