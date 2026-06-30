import { Link } from 'react-router-dom'
import { Compass, ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center text-foreground">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
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
        <Button variant="outline" onClick={() => window.history.back()}>
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
    </div>
  )
}
