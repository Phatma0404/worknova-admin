import type { CSSProperties } from 'react'

// Shared Recharts tooltip styling driven by the shadcn theme tokens, so charts
// stay consistent and adapt to light/dark automatically.
export const tooltipContentStyle: CSSProperties = {
  background: 'var(--color-popover)',
  border: '1px solid var(--color-border)',
  borderRadius: '0.5rem',
  color: 'var(--color-popover-foreground)',
  fontSize: '0.8125rem',
}

export const tooltipLabelStyle: CSSProperties = {
  color: 'var(--color-foreground)',
  fontWeight: 600,
}
