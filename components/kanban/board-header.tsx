"use client"

import { LayoutGrid, Search, Plus, Filter, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface BoardHeaderProps {
  onAddTask: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function BoardHeader({ onAddTask, searchQuery, onSearchChange }: BoardHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <LayoutGrid className="size-4 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-semibold text-foreground tracking-tight">FlowBoard</h1>
        </div>
        <span className="hidden text-muted-foreground sm:inline">/</span>
        <span className="hidden text-sm font-medium text-foreground sm:inline">Sprint 14</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="h-8 w-56 pl-8 text-sm"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
          <Filter className="size-4" />
          <span className="sr-only">Filter tasks</span>
        </Button>

        <Button variant="ghost" size="icon-sm" className="relative text-muted-foreground">
          <Bell className="size-4" />
          <span className="sr-only">Notifications</span>
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
        </Button>

        <Button size="sm" className="gap-1.5" onClick={onAddTask}>
          <Plus className="size-4" />
          <span className="hidden sm:inline">Add Task</span>
        </Button>

        <Avatar className="ml-1 size-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
            YU
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
