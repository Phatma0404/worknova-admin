import { useMemo, useState } from 'react'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TeamFilters from '../components/TeamFilters'
import TeamGrid from '../components/TeamGrid'
import MemberDialog from '../components/MemberDialog'
import MemberProfileDialog from '../components/MemberProfileDialog'
import RemoveMemberDialog from '../components/RemoveMemberDialog'
import { mockTeamMembers } from '../constants'
import type {
  TeamMember,
  SortField,
  SortDirection,
  DepartmentFilter,
  AvailabilityFilter,
} from '../types'

type DialogState =
  | { type: 'invite' }
  | { type: 'edit'; member: TeamMember }
  | { type: 'view'; member: TeamMember }
  | { type: 'remove'; member: TeamMember }
  | null

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState<DepartmentFilter>('all')
  const [availability, setAvailability] = useState<AvailabilityFilter>('all')
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>('asc')
  const [dialog, setDialog] = useState<DialogState>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return members.filter((m) => {
      const matchesSearch =
        q === '' || m.name.toLowerCase().includes(q) || m.title.toLowerCase().includes(q)
      const matchesDept = department === 'all' || m.department === department
      const matchesAvail = availability === 'all' || m.availability === availability
      return matchesSearch && matchesDept && matchesAvail
    })
  }, [members, search, department, availability])

  const sorted = useMemo(() => {
    if (!sortField) return filtered
    const dir = sortDir === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => {
      if (sortField === 'name') return a.name.localeCompare(b.name) * dir
      return (a.workload - b.workload) * dir
    })
  }, [filtered, sortField, sortDir])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const handleInvite = (member: TeamMember) => {
    setMembers((prev) => [member, ...prev])
    setDialog(null)
  }

  const handleEdit = (member: TeamMember) => {
    setMembers((prev) => prev.map((m) => (m.id === member.id ? member : m)))
    setDialog(null)
  }

  const handleRemove = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id))
    setDialog(null)
  }

  const handleViewToEdit = (member: TeamMember) => {
    setDialog({ type: 'edit', member })
  }

  // Department breakdown for stats
  const stats = useMemo(() => {
    const online = members.filter((m) => m.availability === 'online').length
    const avgWorkload = members.length
      ? Math.round(members.reduce((sum, m) => sum + m.workload, 0) / members.length)
      : 0
    const overloaded = members.filter((m) => m.workload >= 90).length
    return { total: members.length, online, avgWorkload, overloaded }
  }, [members])

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Team</h1>
          <p className="text-sm text-muted-foreground">
            Manage your team members, roles, and workloads.
          </p>
        </div>
        <Button onClick={() => setDialog({ type: 'invite' })}>
          <UserPlus className="size-4" />
          Invite Member
        </Button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Members', value: stats.total,       color: 'text-foreground' },
          { label: 'Online Now',    value: stats.online,      color: 'text-emerald-400' },
          { label: 'Avg Workload',  value: `${stats.avgWorkload}%`, color: 'text-blue-400' },
          { label: 'Overloaded',    value: stats.overloaded,  color: 'text-rose-400' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm"
          >
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <TeamFilters
          search={search}
          onSearchChange={setSearch}
          department={department}
          onDepartmentChange={setDepartment}
          availability={availability}
          onAvailabilityChange={setAvailability}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
        />
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {sorted.length === members.length
            ? `${members.length} members`
            : `${sorted.length} of ${members.length} members`}
        </p>
      </div>

      {/* Grid */}
      <TeamGrid
        members={sorted}
        onView={(m) => setDialog({ type: 'view', member: m })}
        onEdit={(m) => setDialog({ type: 'edit', member: m })}
        onRemove={(m) => setDialog({ type: 'remove', member: m })}
      />

      {/* Dialogs */}
      {dialog?.type === 'invite' && (
        <MemberDialog onClose={() => setDialog(null)} onSubmit={handleInvite} />
      )}
      {dialog?.type === 'edit' && (
        <MemberDialog
          member={dialog.member}
          onClose={() => setDialog(null)}
          onSubmit={handleEdit}
        />
      )}
      {dialog?.type === 'view' && (
        <MemberProfileDialog
          member={dialog.member}
          onClose={() => setDialog(null)}
          onEdit={() => handleViewToEdit(dialog.member)}
        />
      )}
      {dialog?.type === 'remove' && (
        <RemoveMemberDialog
          member={dialog.member}
          onClose={() => setDialog(null)}
          onConfirm={() => handleRemove(dialog.member.id)}
        />
      )}
    </div>
  )
}
