import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuthStore } from '@/store/auth'
import { cn } from '@/shared/lib/utils'

interface LoginFormProps {
  email: string
  password: string
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  className?: string
}

// Shared input styling - mirrors the shadcn input look using theme tokens.
const inputClass =
  'h-10 w-full rounded-lg border border-input bg-background text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50'

const DEMO_EMAIL = 'demo@worknova.com'
const DEMO_PASSWORD = '123456'

export default function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  className,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({})
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  // Demo sign-in - validates fields then checks demo credentials before navigating.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const newErrors: typeof errors = {}
    if (!email.trim()) newErrors.email = 'Email is required.'
    if (!password) newErrors.password = 'Password is required.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (email.trim() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setErrors({ form: 'Invalid email or password. Use the demo credentials.' })
      return
    }

    setErrors({})
    login('demo-token', { name: 'Demo User', email })
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex flex-col gap-4', className)}>
      {/* Form-level error */}
      {errors.form && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errors.form}
        </p>
      )}

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
            onChange={(e) => {
              onEmailChange(e.target.value)
              setErrors((prev) => ({ ...prev, email: undefined, form: undefined }))
            }}
            className={`${inputClass} pl-9 pr-3 ${errors.email ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50' : ''}`}
          />
        </div>
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
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
            onChange={(e) => {
              onPasswordChange(e.target.value)
              setErrors((prev) => ({ ...prev, password: undefined, form: undefined }))
            }}
            className={`${inputClass} pl-9 pr-10 ${errors.password ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50' : ''}`}
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
        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
      </div>

      {/* Remember me + forgot password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            id="remember"
            checked={remember}
            onCheckedChange={(v) => setRemember(v === true)}
            className='cursor-pointer'
          />
          <Label htmlFor="remember" className="cursor-pointer font-normal text-muted-foreground">
            Remember me
          </Label>
        </div>
        <Link to="#" className="text-sm font-medium text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full cursor-pointer">
        Sign in
      </Button>
    </form>
  )
}
