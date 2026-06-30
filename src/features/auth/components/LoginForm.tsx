import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuthStore } from '@/store/auth'

interface LoginFormProps {
  email: string
  password: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
}

// Shared input styling - mirrors the shadcn input look using theme tokens.
const inputClass =
  'h-10 w-full rounded-lg border border-input bg-background text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50'

export default function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  // Demo sign-in - no real authentication. Stores a placeholder session so the
  // navbar/sidebar show a user, then enters the dashboard.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login('demo-token', { name: 'Demo User', email: email || 'demo@projectflow.com' })
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className={`${inputClass} pl-9 pr-3`}
          />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className={`${inputClass} pl-9 pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {/* Remember me + forgot password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={remember}
            onCheckedChange={(v) => setRemember(v === true)}
          />
          <Label htmlFor="remember" className="cursor-pointer font-normal text-muted-foreground">
            Remember me
          </Label>
        </div>
        <Link to="#" className="text-sm font-medium text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Sign in
      </Button>
    </form>
  )
}
