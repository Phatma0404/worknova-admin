import { useState } from 'react'
import { Settings, Palette, Bell, Shield, Sliders, Building2 } from 'lucide-react'
import SettingsTabs, { type TabItem } from '../components/SettingsTabs'
import GeneralSettings from '../components/GeneralSettings'
import AppearanceSettings from '../components/AppearanceSettings'
import NotificationSettings from '../components/NotificationSettings'
import SecuritySettings from '../components/SecuritySettings'
import PreferenceSettings from '../components/PreferenceSettings'

const TABS: TabItem[] = [
  { id: 'general',       label: 'General',       icon: Building2 },
  { id: 'appearance',    label: 'Appearance',     icon: Palette },
  { id: 'notifications', label: 'Notifications',  icon: Bell },
  { id: 'security',      label: 'Security',       icon: Shield },
  { id: 'preferences',   label: 'Preferences',    icon: Sliders },
]

function renderTab(id: string) {
  switch (id) {
    case 'general':       return <GeneralSettings />
    case 'appearance':    return <AppearanceSettings />
    case 'notifications': return <NotificationSettings />
    case 'security':      return <SecuritySettings />
    case 'preferences':   return <PreferenceSettings />
    default:              return null
  }
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  const current = TABS.find((t) => t.id === activeTab)!

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Settings className="size-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account and workspace preferences.</p>
        </div>
      </div>

      {/* Body: sidebar nav + content */}
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        {/* Tabs nav */}
        <aside className="md:w-48 lg:w-56 shrink-0">
          <SettingsTabs
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-5 flex items-center gap-2">
            <current.icon className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">{current.label}</h2>
          </div>
          {renderTab(activeTab)}
        </div>
      </div>
    </div>
  )
}
