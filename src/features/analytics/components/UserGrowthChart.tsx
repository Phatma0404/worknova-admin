import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartCard from './ChartCard'
import { tooltipContentStyle, tooltipLabelStyle } from './chartTheme'
import { userGrowthData } from '../constants'

export default function UserGrowthChart({ className }: { className?: string }) {
  return (
    <ChartCard title="User Growth" description="Total users over time" className={className}>
      <div className="h-72 w-full" role="img" aria-label="Line chart of user growth over time">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={userGrowthData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
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
              width={40}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(v) => `${Number(v) / 1000}k`}
            />
            <Tooltip
              contentStyle={tooltipContentStyle}
              labelStyle={tooltipLabelStyle}
              formatter={(value) => [Number(value).toLocaleString(), 'Users']}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
