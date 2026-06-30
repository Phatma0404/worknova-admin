import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DEMO_EMAIL, DEMO_PASSWORD } from '../constants'

interface DemoCredentialsCardProps {
  onFill: () => void
}

export default function DemoCredentialsCard({ onFill }: DemoCredentialsCardProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">Demo Credentials</h2>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-border bg-background/60 p-3">
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-muted-foreground">Email</span>
          <code className="font-mono text-foreground">{DEMO_EMAIL}</code>
        </div>
        <div className="h-px bg-border" />
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-muted-foreground">Password</span>
          <code className="font-mono text-foreground">{DEMO_PASSWORD}</code>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={onFill}>
        Fill Demo Credentials
        <ArrowRight className="size-4" />
      </Button>

      <p className="text-xs leading-relaxed text-muted-foreground">
        This is a demo application. No real authentication is performed.
      </p>
    </div>
  )
}
