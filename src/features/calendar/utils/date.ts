// Date helpers for the calendar. All grid math is done with local Date objects
// and normalized through the Date constructor so month/year overflow is handled
// automatically (e.g. new Date(2026, 0, 0) -> Dec 31, 2025).

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const weekdayLabels = WEEKDAY_LABELS

// Pad a number to two digits for ISO/date formatting.
function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

// Local YYYY-MM-DD (avoids the UTC shift that Date.toISOString() introduces).
export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// Parse a YYYY-MM-DD string into a local Date at midnight.
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}

export function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

// 42-day matrix (6 weeks x 7 days) for the month containing `viewDate`,
// starting on Sunday. Leading/trailing days spill into adjacent months.
export function getMonthGrid(viewDate: Date): Date[] {
  const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)
  const startOffset = firstOfMonth.getDay() // 0 (Sun) .. 6 (Sat)
  const gridStart = addDays(firstOfMonth, -startOffset)
  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i))
}

// The 7 days (Sun..Sat) of the week containing `viewDate`.
export function getWeekGrid(viewDate: Date): Date[] {
  const weekStart = addDays(viewDate, -viewDate.getDay())
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
}

export function formatMonthYear(date: Date): string {
  return `${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`
}

// Compact label for a week range, e.g. "Jun 29 - Jul 5, 2026".
export function formatWeekRange(viewDate: Date): string {
  const days = getWeekGrid(viewDate)
  const start = days[0]
  const end = days[6]
  const startMonth = MONTH_LABELS[start.getMonth()].slice(0, 3)
  const endMonth = MONTH_LABELS[end.getMonth()].slice(0, 3)
  if (start.getMonth() === end.getMonth()) {
    return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${end.getFullYear()}`
  }
  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${end.getFullYear()}`
}

// "9:00 AM" from a 24h "HH:mm" string.
export function formatTime(time: string): string {
  const [hStr, mStr] = time.split(':')
  const h = Number(hStr)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${mStr ?? '00'} ${suffix}`
}

// "Mon, Jul 6" style label for panels and dialogs.
export function formatShortDate(date: Date): string {
  return `${WEEKDAY_LABELS[date.getDay()]}, ${MONTH_LABELS[date.getMonth()].slice(0, 3)} ${date.getDate()}`
}

// "July 6, 2026" long-form label.
export function formatLongDate(date: Date): string {
  return `${MONTH_LABELS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

// ISO date offset from real "today" by `offsetDays`. Used to seed mock events
// relative to whenever the app runs, so the calendar is never empty on load.
export function isoFromToday(offsetDays: number): string {
  return toISODate(addDays(new Date(), offsetDays))
}
