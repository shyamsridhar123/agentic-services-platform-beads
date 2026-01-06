export type AgentStatus = "idle" | "working" | "blocked" | "completed" | "error"
export type TaskPriority = 0 | 1 | 2 | 3 | 4
export type TaskStatus = "open" | "in_progress" | "blocked" | "completed" | "cancelled"
export type TaskType = "epic" | "feature" | "task" | "bug" | "chore"
export type DependencyType = "blocks" | "related" | "parent-child" | "discovered-from"

export interface Agent {
  id: string
  name: string
  type: "architect" | "developer" | "analyst" | "tester" | "reviewer"
  status: AgentStatus
  currentTask?: string
  skills: string[]
  utilization: number
  completedTasks: number
  avatar: string
}

export interface Task {
  id: string
  title: string
  description: string
  type: TaskType
  priority: TaskPriority
  status: TaskStatus
  assignee?: string
  labels: string[]
  dependencies: Dependency[]
  createdAt: string
  updatedAt: string
  estimatedHours?: number
  actualHours?: number
  projectId: string
}

export interface Dependency {
  type: DependencyType
  targetId: string
}

export interface Project {
  id: string
  name: string
  client: string
  status: "active" | "on-hold" | "completed" | "planning"
  progress: number
  startDate: string
  endDate: string
  budget: number
  spent: number
  team: string[]
  tasks: number
  completedTasks: number
}

export interface Engagement {
  id: string
  name: string
  client: string
  type: "implementation" | "consulting" | "managed-services" | "staff-augmentation"
  status: "discovery" | "proposal" | "active" | "completed"
  value: number
  startDate: string
  projects: string[]
}

export interface Resource {
  id: string
  name: string
  role: string
  department: string
  skills: string[]
  availability: number
  currentProjects: string[]
  hourlyRate: number
  avatar: string
}

export interface WorkflowStep {
  id: string
  name: string
  type: "human" | "agent" | "approval" | "integration"
  status: "pending" | "active" | "completed" | "skipped"
  assignee?: string
  agentId?: string
  dependencies: string[]
  outputs: string[]
}

export interface Workflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  status: "draft" | "active" | "paused" | "completed"
  projectId: string
  createdAt: string
}
