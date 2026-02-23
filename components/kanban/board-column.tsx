"use client"

import { useState } from "react"
import { Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TaskCard } from "@/components/kanban/task-card"
import type { Column } from "@/lib/kanban-types"
import { cn } from "@/lib/utils"

interface BoardColumnProps {
  column: Column
  onDragStart: (e: React.DragEvent, taskId: string, sourceColumnId: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, targetColumnId: string) => void
  onAddTask: (columnId: string) => void
}

export function BoardColumn({
  column,
  onDragStart,
  onDragOver,
  onDrop,
  onAddTask,
}: BoardColumnProps) {
  const [isOver, setIsOver] = useState(false)

  return (
    <div className="flex w-72 shrink-0 flex-col lg:w-80">
      {/* Column Header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <span className={cn("size-2.5 rounded-full", column.color)} />
          <h2 className="text-sm font-semibold text-foreground">{column.title}</h2>
          <span className="flex size-5 items-center justify-center rounded-full bg-secondary text-[11px] font-medium text-secondary-foreground">
            {column.tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-7 text-muted-foreground hover:text-foreground"
            onClick={() => onAddTask(column.id)}
          >
            <Plus className="size-4" />
            <span className="sr-only">Add task to {column.title}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="size-7 text-muted-foreground hover:text-foreground"
          >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Column options</span>
          </Button>
        </div>
      </div>

      {/* Task List */}
      <ScrollArea
        className={cn(
          "flex-1 rounded-xl border-2 border-dashed border-transparent p-1.5 transition-colors",
          isOver && "border-primary/30 bg-primary/5"
        )}
        onDragOver={(e) => {
          e.preventDefault()
          onDragOver(e)
          setIsOver(true)
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(e) => {
          setIsOver(false)
          onDrop(e, column.id)
        }}
      >
        <div className="flex flex-col gap-2.5">
          {column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={(e, taskId) => onDragStart(e, taskId, column.id)}
            />
          ))}

          {column.tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-10 text-center">
              <p className="text-sm text-muted-foreground">No tasks yet</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 gap-1.5 text-xs text-muted-foreground"
                onClick={() => onAddTask(column.id)}
              >
                <Plus className="size-3.5" />
                Add a task
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
