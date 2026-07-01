import { useState } from 'react'
import { Bell, Mail, Smartphone, AlarmClock, BarChart2 } from 'lucide-react'
import SettingsToggle from './SettingsToggle'
import SettingsRow from './SettingsRow'
import type { NotificationSettings } from '../types'

function SectionTitle({ icon: Icon, title, description }: { icon: typeof Bell; title: string; description: string }) {
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

const ROWS: {
  key: keyof NotificationSettings
  label: string
  description: string
  icon: typeof Bell
}[] = [
  {
    key: 'emailNotifications',
    label: 'Email Notifications',
    description: 'Receive email updates for assignments, comments, and status changes.',
    icon: Mail,
  },
  {
    key: 'pushNotifications',
    label: 'Push Notifications',
    description: 'Browser push notifications for real-time activity alerts.',
    icon: Smartphone,
  },
  {
    key: 'taskReminders',
    label: 'Task Reminders',
    description: 'Get reminded 24 hours before a task is due.',
    icon: AlarmClock,
  },
  {
    key: 'weeklyReports',
    label: 'Weekly Reports',
    description: 'Receive a weekly digest of your team\'s progress every Monday morning.',
    icon: BarChart2,
  },
]

const DEFAULTS: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  taskReminders: true,
  weeklyReports: false,
}

export default function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULTS)

  const toggle = (key: keyof NotificationSettings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <SectionTitle
          icon={Bell}
          title="Notification Preferences"
          description="Control which notifications you receive and how they are delivered."
        />
        <div className="mt-2 divide-y divide-border">
          {ROWS.map(({ key, label, description }) => (
            <SettingsRow
              key={key}
              label={label}
              description={description}
              htmlFor={`notif-${key}`}
            >
              <SettingsToggle
                id={`notif-${key}`}
                checked={settings[key]}
                onChange={() => toggle(key)}
              />
            </SettingsRow>
          ))}
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
        <Bell className="mt-0.5 size-4 shrink-0 text-blue-400" />
        <p className="text-sm text-blue-300">
          Changes apply immediately. Email notifications are delivered to your account email address.
        </p>
      </div>
    </div>
  )
}
