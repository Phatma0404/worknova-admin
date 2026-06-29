import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  toggle: () => void
  setTheme: (theme: Theme) => void
}

// Persisted light/dark choice. The actual <html> class sync lives in the
// ThemeSwitch component (the only consumer), keeping this store DOM-free.
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggle: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'projectflow-theme' },
  ),
)
