import StatCard from '../components/StatCard'
import SectionCard from '../components/SectionCard'
import RevenueChart from '../components/RevenueChart'
import RecentUsersTable from '../components/RecentUsersTable'
import RecentProjects from '../components/RecentProjects'
import { stats } from '../constants'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back - here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Four statistics cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>

      {/* Revenue chart + recent projects */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SectionCard title="Revenue Overview" className="lg:col-span-2">
          <RevenueChart />
        </SectionCard>
        <SectionCard title="Recent Projects">
          <RecentProjects />
        </SectionCard>
      </div>

      {/* Recent users */}
      <SectionCard
        title="Recent Users"
        action={
          <a href="#" className="text-sm font-medium text-primary hover:underline">
            View all
          </a>
        }
      >
        <RecentUsersTable />
      </SectionCard>
    </div>
  )
}
