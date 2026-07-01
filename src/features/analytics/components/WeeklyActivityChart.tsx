import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ChartCard from './ChartCard'
import { tooltipContentStyle, tooltipLabelStyle } from './chartTheme'
import { weeklyActivityData } from '../constants'

export default function WeeklyActivityChart({ className }: { className?: string }) {
  return (
    <ChartCard title="Weekly Activity" description="Tasks created vs completed" className={className}>
      <div className="h-72 w-full" role="img" aria-label="Bar chart of weekly task activity">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyActivityData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip
              cursor={{ fill: 'var(--color-muted)', opacity: 0.4 }}
              contentStyle={tooltipContentStyle}
              labelStyle={tooltipLabelStyle}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs capitalize text-muted-foreground">{value}</span>
              )}
            />
            <Bar dataKey="completed" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="created" fill="var(--color-chart-3)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
