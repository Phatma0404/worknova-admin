import { cn } from '@/shared/lib/utils'

type Size = 'sm' | 'md' | 'lg'

interface LoaderProps {
  size?: Size
  className?: string
}

const sizes: Record<Size, string> = {
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-10 border-[3px]',
}

// Pure CSS spinner - no extra deps. Inherits color via border-current so it
// works inside buttons of any variant.
export default function Loader({ size = 'md', className }: LoaderProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block animate-spin rounded-full border-current border-t-transparent',
        sizes[size],
        className,
      )}
    />
  )
}
