import { FileText, FileImage, FileType, FileSpreadsheet, Download } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import type { CustomerFile, CustomerFileType } from '../types'

const FILE_ICONS: Record<CustomerFileType, { icon: typeof FileText; className: string }> = {
  pdf: { icon: FileText, className: 'bg-red-500/10 text-red-600 dark:text-red-400' },
  image: { icon: FileImage, className: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
  doc: { icon: FileType, className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  sheet: { icon: FileSpreadsheet, className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function CustomerFilesSection({ files }: { files: CustomerFile[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Files</CardTitle>
      </CardHeader>
      <CardBody className="flex flex-col divide-y divide-border p-0">
        {files.map((file) => {
          const { icon: Icon, className } = FILE_ICONS[file.type]
          return (
            <div key={file.id} className="flex items-center gap-3 px-5 py-3">
              <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${className}`}>
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {file.size} - Uploaded {formatDate(file.uploadedDate)}
                </p>
              </div>
              <Button variant="ghost" size="icon-sm" aria-label={`Download ${file.name}`}>
                <Download className="size-4" />
              </Button>
            </div>
          )
        })}
      </CardBody>
    </Card>
  )
}
