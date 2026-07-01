import { useCallback, useState } from 'react'
import type { CalendarView } from '../types'
import { addDays, addMonths } from '../utils/date'

// Owns calendar navigation + view state (the "where am I looking" concern).
// Event data and filters live in the page so this stays focused and reusable.
export function useCalendar() {
  const [viewDate, setViewDate] = useState<Date>(() => new Date())
  const [view, setView] = useState<CalendarView>('month')
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date())

  // Step forward/back by one month (month view) or one week (week view).
  const goPrev = useCallback(() => {
    setViewDate((d) => (view === 'month' ? addMonths(d, -1) : addDays(d, -7)))
  }, [view])

  const goNext = useCallback(() => {
    setViewDate((d) => (view === 'month' ? addMonths(d, 1) : addDays(d, 7)))
  }, [view])

  const goToday = useCallback(() => {
    const now = new Date()
    setViewDate(now)
    setSelectedDate(now)
  }, [])

  // Jump to an arbitrary date (date picker / clicking a day).
  const goToDate = useCallback((date: Date) => {
    setViewDate(date)
    setSelectedDate(date)
  }, [])

  return {
    viewDate,
    view,
    selectedDate,
    setView,
    setSelectedDate,
    goPrev,
    goNext,
    goToday,
    goToDate,
  }
}
