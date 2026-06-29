import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  to?: string // omit on the current/last page so it renders as plain text
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li>
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="font-medium text-gray-900 dark:text-gray-100"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && <FiChevronRight className="size-4 shrink-0 text-gray-400" />}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
