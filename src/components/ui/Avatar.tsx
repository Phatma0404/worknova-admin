import { useState } from 'react'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'

interface AvatarProps {
  name: string // used for initials fallback and alt text
  src?: string
  size?: Size
  className?: string
}

const sizes: Record<Size, string> = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
}

// Derive up to two initials from the name (e.g. "Ada Lovelace" -> "AL").
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const [failed, setFailed] = useState(false)
  const showImage = src && !failed

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200',
        sizes[size],
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={name}
          className="size-full object-cover"
          onError={() => setFailed(true)} // fall back to initials if the image fails to load
        />
      ) : (
        getInitials(name)
      )}
    </span>
  )
}
