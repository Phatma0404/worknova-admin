import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { useId } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
  ref?: Ref<HTMLInputElement> // React 19 forwards refs as a plain prop (used by react-hook-form)
}

export default function Input({
  label,
  error,
  hint,
  leftIcon,
  id,
  className,
  ref,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          className={cn(
            'h-10 w-full rounded-lg border bg-white px-3 text-sm text-gray-900 transition-colors',
            'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:bg-gray-900 dark:text-gray-100',
            !!leftIcon && 'pl-10',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-gray-400 dark:border-gray-700',
            className,
          )}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : (
        hint && <p className="text-xs text-gray-500">{hint}</p>
      )}
    </div>
  )
}
