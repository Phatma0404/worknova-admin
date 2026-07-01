import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

export interface TabItem {
  id: string
  label: string
  icon: LucideIcon
}

interface SettingsTabsProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (id: string) => void
}

export default function SettingsTabs({ tabs, activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <>
      {/* Mobile: horizontal scroll row */}
      <div className="flex gap-1 overflow-x-auto pb-1 md:hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              <Icon className="size-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Desktop: vertical sidebar nav */}
      <nav className="hidden md:flex md:flex-col md:gap-0.5">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 text-left',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
              )}
              <Icon className="size-4 shrink-0" />
              {tab.label}
            </button>
          )
        })}
      </nav>
    </>
  )
}
