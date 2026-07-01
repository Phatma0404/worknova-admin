import { useState, type FormEvent } from 'react'
import { Shield, Lock, Smartphone, Monitor, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import SettingsToggle from './SettingsToggle'
import SettingsRow from './SettingsRow'
import type { ActiveSession } from '../types'

const MOCK_SESSIONS: ActiveSession[] = [
  {
    id: 's1',
    device: 'Chrome on macOS',
    os: 'macOS Ventura',
    location: 'San Francisco, CA',
    lastActive: 'Active now',
    current: true,
  },
  {
    id: 's2',
    device: 'Safari on iPhone',
    os: 'iOS 17',
    location: 'San Francisco, CA',
    lastActive: '2 hours ago',
    current: false,
  },
  {
    id: 's3',
    device: 'Firefox on Windows',
    os: 'Windows 11',
    location: 'New York, NY',
    lastActive: '3 days ago',
    current: false,
  },
]

const inputClass =
  'h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50'

function SectionTitle({ icon: Icon, title, description }: { icon: typeof Shield; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 pb-5 border-b border-border">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  )
}

export default function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false)
  const [sessions, setSessions] = useState<ActiveSession[]>(MOCK_SESSIONS)
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState(false)

  const handlePasswordSave = (e: FormEvent) => {
    e.preventDefault()
    setPwError('')
    if (!pwForm.current) { setPwError('Current password is required.'); return }
    if (pwForm.next.length < 8) { setPwError('New password must be at least 8 characters.'); return }
    if (pwForm.next !== pwForm.confirm) { setPwError('Passwords do not match.'); return }
    setPwSuccess(true)
    setPwForm({ current: '', next: '', confirm: '' })
    setTimeout(() => setPwSuccess(false), 3000)
  }

  const revokeSession = (id: string) =>
    setSessions((prev) => prev.filter((s) => s.id !== id))

  return (
    <div className="flex flex-col gap-6">
      {/* Change Password */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <SectionTitle
          icon={Lock}
          title="Change Password"
          description="Use a strong unique password. Minimum 8 characters."
        />
        <form onSubmit={handlePasswordSave} className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="pw-current">Current Password</Label>
            <input
              id="pw-current"
              type="password"
              value={pwForm.current}
              onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pw-new">New Password</Label>
              <input
                id="pw-new"
                type="password"
                value={pwForm.next}
                onChange={(e) => setPwForm((p) => ({ ...p, next: e.target.value }))}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pw-confirm">Confirm New Password</Label>
              <input
                id="pw-confirm"
                type="password"
                value={pwForm.confirm}
                onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
          </div>

          {pwError && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {pwError}
            </p>
          )}
          {pwSuccess && (
            <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
              Password changed successfully.
            </p>
          )}

          <div className="flex justify-end">
            <Button type="submit" variant="outline" className="gap-2">
              <Lock className="size-4" />
              Update Password
            </Button>
          </div>
        </form>
      </div>

      {/* 2FA */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <SectionTitle
          icon={Smartphone}
          title="Two-Factor Authentication"
          description="Add an extra layer of security to your account."
        />
        <div className="mt-2 divide-y divide-border">
          <SettingsRow
            label="Enable 2FA"
            description="Require a verification code in addition to your password at sign in."
            htmlFor="2fa-toggle"
          >
            <SettingsToggle
              id="2fa-toggle"
              checked={twoFactor}
              onChange={setTwoFactor}
            />
          </SettingsRow>
        </div>
        {twoFactor && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
            <Smartphone className="mt-0.5 size-4 shrink-0 text-amber-400" />
            <p className="text-sm text-amber-300">
              2FA is enabled. Download an authenticator app (e.g. Google Authenticator) to complete setup.
            </p>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <SectionTitle
          icon={Monitor}
          title="Active Sessions"
          description="Manage devices that are currently signed in to your account."
        />
        <div className="mt-5 flex flex-col gap-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background px-4 py-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Monitor className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{session.device}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session.location} · {session.lastActive}
                  </p>
                </div>
              </div>
              {session.current ? (
                <span className="shrink-0 inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Current
                </span>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => revokeSession(session.id)}
                  className="shrink-0 h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="size-3.5 mr-1" />
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
