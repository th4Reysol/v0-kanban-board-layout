"use client"

import { GripVertical, MessageSquare, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Task, Priority } from "@/lib/kanban-types"
import { cn } from "@/lib/utils"

const priorityConfig: Record<Priority, { label: string; dotClass: string }> = {
  high: { label: "High", dotClass: "bg-destructive" },
  medium: { label: "Medium", dotClass: "bg-chart-4" },
  low: { label: "Low", dotClass: "bg-chart-2" },
}

interface TaskCardProps {
  task: Task
  isDragging?: boolean
  onDragStart: (e: React.DragEvent, taskId: string) => void
}

export function TaskCard({ task, isDragging, onDragStart }: TaskCardProps) {
  const priority = priorityConfig[task.priority]
  const formattedDate = task.createdAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={cn(
        "group cursor-grab rounded-lg border border-border bg-card p-3.5 shadow-sm transition-all active:cursor-grabbing",
        "hover:border-primary/30 hover:shadow-md",
        isDragging && "rotate-2 scale-105 opacity-80 shadow-lg"
      )}
    >
      <div className="mb-2.5 flex items-start justify-between">
        <div className="flex flex-wrap gap-1.5">
          {task.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="px-2 py-0 text-[11px] font-medium"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <GripVertical className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <h3 className="mb-1.5 text-sm font-medium leading-snug text-foreground">
        {task.title}
      </h3>

      {task.description && (
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className={cn("size-2 rounded-full", priority.dotClass)} />
            <span className="text-[11px] font-medium text-muted-foreground">{priority.label}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="size-3" />
            <span className="text-[11px]">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageSquare className="size-3" />
            <span className="text-[11px]">2</span>
          </div>
        </div>
        {task.assignee && (
          <Avatar className="size-6">
            <AvatarFallback className="bg-secondary text-[10px] font-medium text-secondary-foreground">
              {task.assignee}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  )
}
