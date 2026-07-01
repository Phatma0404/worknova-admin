import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UsersPaginationProps {
  page: number
  pageCount: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}

export default function UsersPagination({
  page,
  pageCount,
  total,
  pageSize,
  onPageChange,
}: UsersPaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-xs text-muted-foreground">
        Showing{' '}
        <span className="font-medium text-foreground">
          {from}-{to}
        </span>{' '}
        of <span className="font-medium text-foreground">{total}</span>
      </p>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>
        {Array.from({ length: pageCount }).map((_, i) => (
          <Button
            key={i}
            variant={page === i + 1 ? 'default' : 'outline'}
            size="icon-sm"
            onClick={() => onPageChange(i + 1)}
            aria-label={`Page ${i + 1}`}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pageCount}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
