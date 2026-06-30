import { useEffect } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useThemeStore } from '@/store/theme'
import { cn } from '@/shared/lib/utils'

interface ThemeSwitchProps {
  className?: string
}

export default function ThemeSwitch({ className }: ThemeSwitchProps) {
  const theme = useThemeStore((s) => s.theme)
  const toggle = useThemeStore((s) => s.toggle)

  // Sync the persisted choice to the <html> class that drives the dark variant.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900',
        'dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100',
        className,
      )}
    >
      {isDark ? <FiSun className="size-5" /> : <FiMoon className="size-5" />}
    </button>
  )
}
