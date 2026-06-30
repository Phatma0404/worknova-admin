import type { ReactNode } from 'react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'

interface SectionCardProps {
  title: string
  action?: ReactNode // optional header-right slot (e.g. a "View all" link)
  children: ReactNode
  className?: string
}

// Titled card wrapper reused by every dashboard panel (chart, lists, ...).
export default function SectionCard({ title, action, children, className }: SectionCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {action}
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  )
}
