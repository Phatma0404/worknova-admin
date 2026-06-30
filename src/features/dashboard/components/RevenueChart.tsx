import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { revenueData } from '../constants'

// Revenue area chart. Colors come from the shadcn theme CSS variables so it
// adapts to light/dark automatically.
export default function RevenueChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueData} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            stroke="var(--color-muted-foreground)"
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={52}
            stroke="var(--color-muted-foreground)"
            fontSize={12}
            tickFormatter={(v) => `$${Number(v) / 1000}k`}
          />
          <Tooltip
            cursor={{ stroke: 'var(--color-border)' }}
            contentStyle={{
              background: 'var(--color-popover)',
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              color: 'var(--color-popover-foreground)',
              fontSize: '0.8125rem',
            }}
            labelStyle={{ color: 'var(--color-foreground)', fontWeight: 600 }}
            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--color-primary)"
            strokeWidth={2}
            fill="url(#revenueFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
