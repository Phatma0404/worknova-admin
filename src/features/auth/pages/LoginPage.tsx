import { useState } from 'react'
import { Workflow } from 'lucide-react'
import ThemeSwitch from '@/components/ui/ThemeSwitch'
import LoginForm from '../components/LoginForm'
import DemoCredentialsCard from '../components/DemoCredentialsCard'
import { DEMO_EMAIL, DEMO_PASSWORD } from '../constants'

export default function LoginPage() {
  // State lives here so "Fill Demo Credentials" can populate the form fields.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const fillDemo = () => {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/40 p-4 dark:bg-background">
      <ThemeSwitch className="absolute right-4 top-4" />

      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl lg:grid-cols-2">
        {/* Left - login form */}
        <div className="flex flex-col gap-6 p-8 sm:p-10">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Workflow className="size-5" />
            </div>
            <span className="text-lg font-bold text-foreground">ProjectFlow</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account to continue.</p>
          </div>

          <LoginForm
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
          />
        </div>

        {/* Right - demo credentials */}
        <div className="flex flex-col justify-center gap-4 border-t border-border bg-muted/30 p-8 sm:p-10 lg:border-l lg:border-t-0">
          <DemoCredentialsCard onFill={fillDemo} />
        </div>
      </div>
    </div>
  )
}
