import { StickyNote } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'

export default function CustomerNotesSection({ notes }: { notes?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Internal Notes</CardTitle>
      </CardHeader>
      <CardBody>
        {notes ? (
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">{notes}</p>
        ) : (
          <div className="flex flex-col items-center gap-2 py-6 text-center">
            <StickyNote className="size-6 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No notes yet.</p>
          </div>
        )}
      </CardBody>
    </Card>
  )
}
