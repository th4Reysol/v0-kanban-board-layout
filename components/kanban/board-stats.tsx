"use client"

import { CheckCircle2, Clock, AlertCircle, Layers } from "lucide-react"
import type { Column } from "@/lib/kanban-types"

interface BoardStatsProps {
  columns: Column[]
}

export function BoardStats({ columns }: BoardStatsProps) {
  const totalTasks = columns.reduce((sum, col) => sum + col.tasks.length, 0)
  const doneTasks = columns.find((c) => c.id === "done")?.tasks.length ?? 0
  const inProgressTasks = columns.find((c) => c.id === "in-progress")?.tasks.length ?? 0
  const highPriority = columns.reduce(
    (sum, col) => sum + col.tasks.filter((t) => t.priority === "high").length,
    0
  )

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: Layers,
      iconClass: "text-primary",
    },
    {
      label: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      iconClass: "text-accent",
    },
    {
      label: "Completed",
      value: doneTasks,
      icon: CheckCircle2,
      iconClass: "text-chart-2",
    },
    {
      label: "High Priority",
      value: highPriority,
      icon: AlertCircle,
      iconClass: "text-destructive",
    },
  ]

  return (
    <div className="flex items-center gap-6 border-b border-border bg-card px-6 py-2.5">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-2">
          <stat.icon className={`size-4 ${stat.iconClass}`} />
          <span className="text-xs text-muted-foreground">{stat.label}</span>
          <span className="text-sm font-semibold text-foreground">{stat.value}</span>
        </div>
      ))}
    </div>
  )
}
