import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  size?: Size
  children: ReactNode
  footer?: ReactNode
}

const sizes: Record<Size, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export default function Modal({ open, onClose, title, size = 'md', children, footer }: ModalProps) {
  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-gray-900/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className={cn(
              'relative w-full rounded-xl border border-gray-200 bg-white shadow-xl',
              'dark:border-gray-800 dark:bg-gray-900',
              sizes[size],
            )}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
                <button
                  onClick={onClose}
                  className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  aria-label="Close"
                >
                  <FiX className="size-5" />
                </button>
              </div>
            )}
            <div className="px-5 py-4">{children}</div>
            {footer && (
              <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-4 dark:border-gray-800">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
