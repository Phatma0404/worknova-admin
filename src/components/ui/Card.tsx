import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Composable card: use <Card> as the shell and the sub-parts for structured
// sections, or just drop arbitrary children inside. Each accepts className.

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white shadow-sm',
        'dark:border-gray-800 dark:bg-gray-900',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('border-b border-gray-200 px-5 py-4 dark:border-gray-800', className)}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-base font-semibold text-gray-900 dark:text-gray-100', className)}
      {...props}
    />
  )
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 py-4', className)} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('border-t border-gray-200 px-5 py-4 dark:border-gray-800', className)}
      {...props}
    />
  )
}

export default Card
