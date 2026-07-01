import { useState } from 'react'
import { Palette, Monitor, Moon, Sun, Layout } from 'lucide-react'
import { useThemeStore } from '@/store/theme'
import SettingsToggle from './SettingsToggle'
import SettingsRow from './SettingsRow'
import type { ThemeOption, AccentColor, AppearanceSettings } from '../types'

const ACCENT_COLORS: { value: AccentColor; label: string; class: string }[] = [
  { value: 'violet', label: 'Violet',  class: 'bg-violet-500' },
  { value: 'blue',   label: 'Blue',    class: 'bg-blue-500' },
  { value: 'emerald',label: 'Emerald', class: 'bg-emerald-500' },
  { value: 'amber',  label: 'Amber',   class: 'bg-amber-500' },
  { value: 'rose',   label: 'Rose',    class: 'bg-rose-500' },
  { value: 'sky',    label: 'Sky',     class: 'bg-sky-500' },
]

const THEME_OPTIONS: { value: ThemeOption; label: string; description: string; icon: typeof Sun }[] = [
  { value: 'light',  label: 'Light',  description: 'Always use light theme',  icon: Sun },
  { value: 'dark',   label: 'Dark',   description: 'Always use dark theme',   icon: Moon },
  { value: 'system', label: 'System', description: 'Follow OS preference',    icon: Monitor },
]

function SectionTitle({ icon: Icon, title, description }: { icon: typeof Sun; title: string; description: string }) {
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

export default function AppearanceSettings() {
  const { theme: storeTheme, setTheme } = useThemeStore()
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(storeTheme)
  const [accentColor, setAccentColor] = useState<AccentColor>('violet')
  const [compactMode, setCompactMode] = useState(false)

  const handleThemeChange = (value: ThemeOption) => {
    setSelectedTheme(value)
    if (value === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    } else {
      setTheme(value)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Theme */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <SectionTitle
          icon={Palette}
          title="Theme"
          description="Choose how WorkNova looks. Applies immediately."
        />
        <div className="mt-5 grid grid-cols-3 gap-3">
          {THEME_OPTIONS.map((opt) => {
            const Icon = opt.icon
            const active = selectedTheme === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => handleThemeChange(opt.value)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200 ${
                  active
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border bg-background text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground'
                }`}
              >
                <Icon className="size-6" />
                <div>
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="text-[10px] mt-0.5 hidden sm:block">{opt.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Accent Color */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <SectionTitle
          icon={Palette}
          title="Accent Color"
          description="Primary accent color used for buttons and highlights. UI preview only."
        />
        <div className="mt-5 flex flex-wrap gap-3">
          {ACCENT_COLORS.map((color) => {
            const active = accentColor === color.value
            return (
              <button
                key={color.value}
                title={color.label}
                onClick={() => setAccentColor(color.value)}
                className={`flex size-9 items-center justify-center rounded-full transition-all duration-200 ${color.class} ${
                  active ? 'ring-2 ring-offset-2 ring-offset-card ring-foreground/30 scale-110' : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
              >
                {active && (
                  <svg className="size-4 text-white" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Selected: <span className="font-medium capitalize text-foreground">{accentColor}</span>
        </p>
      </div>

      {/* Layout */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <SectionTitle
          icon={Layout}
          title="Layout"
          description="Adjust the UI density to your preference."
        />
        <div className="mt-5 divide-y divide-border">
          <SettingsRow
            label="Compact Mode"
            description="Reduce spacing and padding across the interface for a denser view."
            htmlFor="compact-toggle"
          >
            <SettingsToggle
              id="compact-toggle"
              checked={compactMode}
              onChange={setCompactMode}
            />
          </SettingsRow>
        </div>
      </div>
    </div>
  )
}
