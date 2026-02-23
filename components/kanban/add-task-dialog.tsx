"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import type { Priority, Task } from "@/lib/kanban-types"
import { cn } from "@/lib/utils"

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (task: Omit<Task, "id" | "createdAt">) => void
  targetColumnId?: string
}

const priorities: { value: Priority; label: string; dotClass: string }[] = [
  { value: "low", label: "Low", dotClass: "bg-chart-2" },
  { value: "medium", label: "Medium", dotClass: "bg-chart-4" },
  { value: "high", label: "High", dotClass: "bg-destructive" },
]

const suggestedTags = ["Frontend", "Backend", "Design", "DevOps", "Testing", "API", "UI", "Research"]

export function AddTaskDialog({ open, onOpenChange, onAdd }: AddTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<Priority>("medium")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [assignee, setAssignee] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      assignee: assignee.trim() || undefined,
      tags: selectedTags,
    })

    setTitle("")
    setDescription("")
    setPriority("medium")
    setSelectedTags([])
    setAssignee("")
    onOpenChange(false)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a new task and assign it to a column.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-title" className="text-sm font-medium text-foreground">
              Title
            </label>
            <Input
              id="task-title"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-desc" className="text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              id="task-desc"
              placeholder="Add a description..."
              className="min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Priority</label>
            <div className="flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                    priority === p.value
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:bg-secondary"
                  )}
                >
                  <span className={cn("size-2 rounded-full", p.dotClass)} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Tags</label>
            <div className="flex flex-wrap gap-1.5">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                >
                  <Badge
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer text-[11px]"
                  >
                    {tag}
                    {selectedTags.includes(tag) && <X className="ml-0.5 size-3" />}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="task-assignee" className="text-sm font-medium text-foreground">
              Assignee Initials
            </label>
            <Input
              id="task-assignee"
              placeholder="e.g. JM"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              maxLength={2}
              className="w-24"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
