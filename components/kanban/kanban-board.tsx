"use client"

import { useState, useCallback } from "react"
import { BoardHeader } from "@/components/kanban/board-header"
import { BoardColumn } from "@/components/kanban/board-column"
import { BoardStats } from "@/components/kanban/board-stats"
import { AddTaskDialog } from "@/components/kanban/add-task-dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { INITIAL_COLUMNS, type Column, type Task } from "@/lib/kanban-types"

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS)
  const [searchQuery, setSearchQuery] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [targetColumnId, setTargetColumnId] = useState<string>("todo")
  const [dragInfo, setDragInfo] = useState<{
    taskId: string
    sourceColumnId: string
  } | null>(null)

  const handleDragStart = useCallback(
    (e: React.DragEvent, taskId: string, sourceColumnId: string) => {
      setDragInfo({ taskId, sourceColumnId })
      e.dataTransfer.effectAllowed = "move"
    },
    []
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const handleDrop = useCallback(
    (_e: React.DragEvent, targetColumnId: string) => {
      if (!dragInfo) return
      const { taskId, sourceColumnId } = dragInfo

      if (sourceColumnId === targetColumnId) {
        setDragInfo(null)
        return
      }

      setColumns((prev) => {
        const newColumns = prev.map((col) => ({ ...col, tasks: [...col.tasks] }))
        const sourceCol = newColumns.find((c) => c.id === sourceColumnId)
        const targetCol = newColumns.find((c) => c.id === targetColumnId)

        if (!sourceCol || !targetCol) return prev

        const taskIndex = sourceCol.tasks.findIndex((t) => t.id === taskId)
        if (taskIndex === -1) return prev

        const [task] = sourceCol.tasks.splice(taskIndex, 1)
        targetCol.tasks.push(task)

        return newColumns
      })

      setDragInfo(null)
    },
    [dragInfo]
  )

  const handleAddTask = useCallback(
    (taskData: Omit<Task, "id" | "createdAt">) => {
      const newTask: Task = {
        ...taskData,
        id: `task-${Date.now()}`,
        createdAt: new Date(),
      }

      setColumns((prev) =>
        prev.map((col) =>
          col.id === targetColumnId
            ? { ...col, tasks: [newTask, ...col.tasks] }
            : col
        )
      )
    },
    [targetColumnId]
  )

  const openAddDialog = useCallback((columnId?: string) => {
    setTargetColumnId(columnId ?? "todo")
    setDialogOpen(true)
  }, [])

  // Filter tasks by search query
  const filteredColumns = columns.map((col) => ({
    ...col,
    tasks: col.tasks.filter(
      (task) =>
        !searchQuery ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
  }))

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <BoardHeader
        onAddTask={() => openAddDialog()}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <BoardStats columns={columns} />

      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex gap-5 p-6">
            {filteredColumns.map((column) => (
              <BoardColumn
                key={column.id}
                column={column}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onAddTask={openAddDialog}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </main>

      <AddTaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={handleAddTask}
        targetColumnId={targetColumnId}
      />
    </div>
  )
}
