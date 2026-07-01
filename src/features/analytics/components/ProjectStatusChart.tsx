import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import ChartCard from './ChartCard'
import { tooltipContentStyle, tooltipLabelStyle } from './chartTheme'
import { projectStatusData } from '../constants'

export default function ProjectStatusChart({ className }: { className?: string }) {
  const total = projectStatusData.reduce((sum, slice) => sum + slice.value, 0)

  return (
    <ChartCard title="Project Status" description="Distribution by status" className={className}>
      <div className="flex flex-1 flex-col justify-center gap-5">
        <div
          className="relative mx-auto h-52 w-full max-w-55"
          role="img"
          aria-label="Donut chart of project status distribution"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={projectStatusData}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={2}
                strokeWidth={0}
                startAngle={90}
                endAngle={-270}
              >
                {projectStatusData.map((slice) => (
                  <Cell key={slice.name} fill={slice.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipContentStyle}
                labelStyle={tooltipLabelStyle}
                formatter={(value, name) => [`${value} projects`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center total */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{total}</span>
            <span className="text-xs text-muted-foreground">Projects</span>
          </div>
        </div>

        {/* Legend */}
        <ul className="grid grid-cols-2 gap-2">
          {projectStatusData.map((slice) => (
            <li key={slice.name} className="flex items-center gap-2 text-xs">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: slice.color }}
              />
              <span className="truncate text-muted-foreground">{slice.name}</span>
              <span className="ml-auto font-medium text-foreground">{slice.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  )
}
