import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts'
import ChartCard from './ChartCard'
import { taskCompletion } from '../constants'

export default function TaskCompletionChart({ className }: { className?: string }) {
  const data = [{ name: 'rate', value: taskCompletion.rate }]

  return (
    <ChartCard title="Task Completion Rate" description="Completed vs total tasks" className={className}>
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div
          className="relative mx-auto h-52 w-full max-w-55"
          role="img"
          aria-label={`Radial gauge showing ${taskCompletion.rate}% task completion`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={data}
              innerRadius="72%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                dataKey="value"
                cornerRadius={12}
                fill="var(--color-chart-1)"
                background={{ fill: 'var(--color-muted)' }}
                angleAxisId={0}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          {/* Center value */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{taskCompletion.rate}%</span>
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          <span className="font-medium text-foreground">
            {taskCompletion.completed.toLocaleString()}
          </span>{' '}
          of {taskCompletion.total.toLocaleString()} tasks completed
        </p>
      </div>
    </ChartCard>
  )
}
