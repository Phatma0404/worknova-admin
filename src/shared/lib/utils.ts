import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Class-name merge helper used across the app and by shadcn/ui components.
// clsx resolves conditionals; tailwind-merge dedupes conflicting Tailwind classes.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
