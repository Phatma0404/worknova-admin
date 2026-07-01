export type ThemeOption = 'light' | 'dark' | 'system'
export type AccentColor = 'violet' | 'blue' | 'emerald' | 'amber' | 'rose' | 'sky'
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'
export type Language = 'en' | 'de' | 'fr' | 'es' | 'tr' | 'az'
export type DefaultPage = '/' | '/analytics' | '/projects' | '/tasks' | '/team'

export interface GeneralSettings {
  companyName: string
  timeZone: string
  dateFormat: DateFormat
}

export interface AppearanceSettings {
  theme: ThemeOption
  accentColor: AccentColor
  compactMode: boolean
}

export interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  taskReminders: boolean
  weeklyReports: boolean
}

export interface PreferenceSettings {
  language: Language
  defaultPage: DefaultPage
  autoSave: boolean
}

export interface ActiveSession {
  id: string
  device: string
  os: string
  location: string
  lastActive: string
  current: boolean
}
