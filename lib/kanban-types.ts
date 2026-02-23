export type Priority = "low" | "medium" | "high"

export interface Task {
  id: string
  title: string
  description?: string
  priority: Priority
  assignee?: string
  tags: string[]
  createdAt: Date
}

export interface Column {
  id: string
  title: string
  tasks: Task[]
  color: string
}

export const INITIAL_COLUMNS: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "bg-muted-foreground",
    tasks: [
      {
        id: "task-1",
        title: "Research competitor features",
        description: "Analyze top 5 competitors and document their key features",
        priority: "low",
        assignee: "AK",
        tags: ["Research"],
        createdAt: new Date("2026-02-10"),
      },
      {
        id: "task-2",
        title: "Define API schema",
        description: "Create OpenAPI spec for the new endpoints",
        priority: "medium",
        assignee: "JM",
        tags: ["Backend", "API"],
        createdAt: new Date("2026-02-12"),
      },
    ],
  },
  {
    id: "todo",
    title: "To Do",
    color: "bg-primary",
    tasks: [
      {
        id: "task-3",
        title: "Design dashboard layout",
        description: "Create wireframes for the analytics dashboard",
        priority: "high",
        assignee: "LS",
        tags: ["Design", "UI"],
        createdAt: new Date("2026-02-14"),
      },
      {
        id: "task-4",
        title: "Set up CI/CD pipeline",
        description: "Configure GitHub Actions for automated testing and deployment",
        priority: "medium",
        assignee: "AK",
        tags: ["DevOps"],
        createdAt: new Date("2026-02-15"),
      },
      {
        id: "task-5",
        title: "Write unit tests for auth module",
        priority: "high",
        assignee: "JM",
        tags: ["Testing", "Backend"],
        createdAt: new Date("2026-02-16"),
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-accent",
    tasks: [
      {
        id: "task-6",
        title: "Implement user authentication",
        description: "Build login, signup, and password reset flows",
        priority: "high",
        assignee: "JM",
        tags: ["Backend", "Auth"],
        createdAt: new Date("2026-02-11"),
      },
      {
        id: "task-7",
        title: "Build notification system",
        description: "Real-time notifications using WebSockets",
        priority: "medium",
        assignee: "AK",
        tags: ["Frontend", "Backend"],
        createdAt: new Date("2026-02-13"),
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "bg-chart-2",
    tasks: [
      {
        id: "task-8",
        title: "Project kickoff meeting",
        description: "Align on goals, timeline, and responsibilities",
        priority: "low",
        assignee: "LS",
        tags: ["Planning"],
        createdAt: new Date("2026-02-01"),
      },
      {
        id: "task-9",
        title: "Set up development environment",
        priority: "medium",
        assignee: "AK",
        tags: ["DevOps"],
        createdAt: new Date("2026-02-02"),
      },
    ],
  },
]
