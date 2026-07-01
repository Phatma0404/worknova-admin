import { useState } from 'react'
import { Save, Building2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import type { GeneralSettings, DateFormat } from '../types'

const TIME_ZONES = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Europe/Istanbul',
  'Asia/Dubai',
  'Asia/Baku',
  'Asia/Tokyo',
  'Australia/Sydney',
]

const DATE_FORMATS: { value: DateFormat; label: string }[] = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY  (12/31/2026)' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY  (31/12/2026)' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD  (2026-12-31)' },
]

const inputClass =
  'h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50'

const DEFAULT: GeneralSettings = {
  companyName: 'WorkNova Inc.',
  timeZone: 'America/New_York',
  dateFormat: 'MM/DD/YYYY',
}

function SectionTitle({ icon: Icon, title, description }: { icon: typeof Save; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 pb-5 border-b border-border">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  )
}

export default function GeneralSettings() {
  const [form, setForm] = useState<GeneralSettings>(DEFAULT)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Company info */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <SectionTitle
          icon={Building2}
          title="Company Information"
          description="Basic information about your organization."
        />
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="company-name">Company Name</Label>
            <input
              id="company-name"
              value={form.companyName}
              onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
              placeholder="Acme Corporation"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Date & Time */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <SectionTitle
          icon={Clock}
          title="Date & Time"
          description="Configure how dates and times are displayed across the app."
        />
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="timezone">Time Zone</Label>
            <Select
              value={form.timeZone}
              onValueChange={(v) => setForm((prev) => ({ ...prev, timeZone: v }))}
            >
              <SelectTrigger id="timezone" className="h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIME_ZONES.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="date-format">Date Format</Label>
            <Select
              value={form.dateFormat}
              onValueChange={(v) => setForm((prev) => ({ ...prev, dateFormat: v as DateFormat }))}
            >
              <SelectTrigger id="date-format" className="h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DATE_FORMATS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2 min-w-32">
          {saved ? (
            <>Saved!</>
          ) : (
            <>
              <Save className="size-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
