import { Mail, Phone } from 'lucide-react'
import CustomerStatusBadge from './CustomerStatusBadge'
import { fullName, formatJoinedDate } from '../utils'
import type { Customer } from '../types'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Deterministic gradient from name - avoids random flicker on re-render.
function getGradient(name: string): string {
  const gradients = [
    'from-violet-500 to-purple-600',
    'from-blue-500 to-indigo-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-sky-500 to-cyan-600',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return gradients[Math.abs(hash) % gradients.length]
}

export default function CustomerProfileHeader({ customer }: { customer: Customer }) {
  const name = fullName(customer)

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div
          className={`flex size-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-2xl font-bold text-white ${getGradient(name)}`}
        >
          {getInitials(name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold text-foreground">{name}</h1>
            <CustomerStatusBadge status={customer.status} />
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {customer.jobTitle ? `${customer.jobTitle} at ` : ''}
            {customer.company}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Mail className="size-4" />
              {customer.email}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="size-4" />
              {customer.phone}
            </span>
            <span className="text-xs">Customer since {formatJoinedDate(customer.joinedDate)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
