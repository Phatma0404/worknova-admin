import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Loader from './Loader'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const variants: Record<Variant, string> = {
  primary: 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
  outline:
    'border border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800',
  ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-11 px-6 text-base gap-2',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      // disable while loading so the action can't be fired twice
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'dark:focus-visible:ring-offset-gray-900',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {isLoading ? <Loader size="sm" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  )
}
