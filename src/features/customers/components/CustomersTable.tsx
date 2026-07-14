import { useMemo } from 'react'
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table'
import { MoreHorizontal, Eye, Pencil, Trash2, SearchX } from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import Avatar from '@/components/ui/Avatar'
import { cn } from '@/shared/lib/utils'
import CustomerStatusBadge from './CustomerStatusBadge'
import { fullName, formatJoinedDate } from '../utils'
import type { Customer } from '../types'

interface CustomersTableProps {
  customers: Customer[]
  onView: (customer: Customer) => void
  onEdit: (customer: Customer) => void
  onDelete: (customer: Customer) => void
}

const columnHelper = createColumnHelper<Customer>()

// Column width/visibility, kept separate for <th> (needs the width) and
// <td> (needs the same responsive hiding, no width) but sourced from one map.
const COLUMN_LAYOUT: Record<string, { width?: string; hidden?: string; align?: string }> = {
  avatar: { width: 'w-10' },
  email: { hidden: 'hidden md:table-cell' },
  company: { hidden: 'hidden sm:table-cell' },
  joinedDate: { hidden: 'hidden lg:table-cell' },
  actions: { width: 'w-12', align: 'text-right' },
}

function headerClass(columnId: string) {
  const layout = COLUMN_LAYOUT[columnId]
  if (!layout) return undefined
  return cn(layout.width, layout.hidden, layout.align)
}

function cellClass(columnId: string) {
  const layout = COLUMN_LAYOUT[columnId]
  if (!layout) return undefined
  return cn(layout.hidden, layout.align)
}

export default function CustomersTable({ customers, onView, onEdit, onDelete }: CustomersTableProps) {
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'avatar',
        header: () => <span className="sr-only">Avatar</span>,
        cell: ({ row }) => <Avatar name={fullName(row.original)} src={row.original.avatar} size="sm" />,
      }),
      columnHelper.accessor((row) => fullName(row), {
        id: 'fullName',
        header: 'Full Name',
        cell: (info) => <span className="font-medium text-foreground">{info.getValue()}</span>,
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: (info) => <span className="text-muted-foreground">{info.getValue()}</span>,
      }),
      columnHelper.accessor('company', {
        header: 'Company',
        cell: (info) => <span className="text-muted-foreground">{info.getValue()}</span>,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => <CustomerStatusBadge status={info.getValue()} />,
      }),
      columnHelper.accessor('joinedDate', {
        header: 'Joined Date',
        cell: (info) => (
          <span className="text-muted-foreground">{formatJoinedDate(info.getValue())}</span>
        ),
      }),
      columnHelper.display({
        id: 'actions',
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Actions for ${fullName(row.original)}`}
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(row.original)}>
                <Eye className="size-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                <Pencil className="size-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => onDelete(row.original)}>
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      }),
    ],
    [onView, onEdit, onDelete],
  )

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="hover:bg-transparent">
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className={headerClass(header.column.id)}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length === 0 ? (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={columns.length} className="p-0">
              <EmptyState
                icon={<SearchX className="size-8" />}
                title="No customers found"
                description="Try changing your search or filters."
                className="rounded-none border-none"
              />
            </TableCell>
          </TableRow>
        ) : (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={cellClass(cell.column.id)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
