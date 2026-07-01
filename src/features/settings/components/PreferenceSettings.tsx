import { useState } from 'react'
import { Save, Globe, LayoutDashboard, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import SettingsToggle from './SettingsToggle'
import SettingsRow from './SettingsRow'
import type { PreferenceSettings, Language, DefaultPage } from '../types'

const LANGUAGES: { value: Language; label: string; flag: string }[] = [
  { value: 'en', label: 'English',    flag: '🇺🇸' },
  { value: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { value: 'fr', label: 'Français',   flag: '🇫🇷' },
  { value: 'es', label: 'Español',    flag: '🇪🇸' },
  { value: 'tr', label: 'Türkçe',     flag: '🇹🇷' },
  { value: 'az', label: 'Azərbaycan', flag: '🇦🇿' },
]

const DEFAULT_PAGES: { value: DefaultPage; label: string }[] = [
  { value: '/',          label: 'Dashboard' },
  { value: '/analytics', label: 'Analytics' },
  { value: '/projects',  label: 'Projects' },
  { value: '/tasks',     label: 'Tasks' },
  { value: '/team',      label: 'Team' },
]

function SectionTitle({ icon: Icon, title, description }: { icon: typeof Globe; title: string; description: string }) {
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

const DEFAULTS: PreferenceSettings = {
  language: 'en',
  defaultPage: '/',
  autoSave: true,
}

export default function PreferenceSettings() {
  const [prefs, setPrefs] = useState<PreferenceSettings>(DEFAULTS)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Language */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <SectionTitle
          icon={Globe}
          title="Language & Region"
          description="Set your preferred language for the interface."
        />
        <div className="mt-5">
          <div className="flex flex-col gap-1.5 max-w-xs">
            <Label htmlFor="pref-lang">Display Language</Label>
            <Select
              value={prefs.language}
              onValueChange={(v) => setPrefs((p) => ({ ...p, language: v as Language }))}
            >
              <SelectTrigger id="pref-lang" className="h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l.value} value={l.value}>
                    {l.flag} {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <SectionTitle
          icon={LayoutDashboard}
          title="Navigation"
          description="Customize your default landing page after login."
        />
        <div className="mt-5">
          <div className="flex flex-col gap-1.5 max-w-xs">
            <Label htmlFor="pref-page">Default Dashboard Page</Label>
            <Select
              value={prefs.defaultPage}
              onValueChange={(v) => setPrefs((p) => ({ ...p, defaultPage: v as DefaultPage }))}
            >
              <SelectTrigger id="pref-page" className="h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_PAGES.map((page) => (
                  <SelectItem key={page.value} value={page.value}>
                    {page.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Behavior */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <SectionTitle
          icon={Zap}
          title="Behavior"
          description="Control how the app behaves during your workflow."
        />
        <div className="mt-2 divide-y divide-border">
          <SettingsRow
            label="Auto Save"
            description="Automatically save changes to forms and editors without manually clicking Save."
            htmlFor="auto-save-toggle"
          >
            <SettingsToggle
              id="auto-save-toggle"
              checked={prefs.autoSave}
              onChange={(v) => setPrefs((p) => ({ ...p, autoSave: v }))}
            />
          </SettingsRow>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2 min-w-32">
          {saved ? (
            <>Saved!</>
          ) : (
            <>
              <Save className="size-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
