"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockTasks } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import type { TaskPriority, TaskStatus, TaskType } from "@/lib/types"
import { ArrowRight, GitBranch, Clock, AlertCircle, CheckCircle2, Circle, Pause } from "lucide-react"

const priorityColors: Record<TaskPriority, string> = {
  0: "bg-destructive text-destructive-foreground",
  1: "bg-warning text-warning-foreground",
  2: "bg-primary text-primary-foreground",
  3: "bg-muted text-muted-foreground",
  4: "bg-muted text-muted-foreground",
}

const priorityLabels: Record<TaskPriority, string> = {
  0: "P0",
  1: "P1",
  2: "P2",
  3: "P3",
  4: "P4",
}

const statusIcons: Record<TaskStatus, typeof Circle> = {
  open: Circle,
  in_progress: Clock,
  blocked: Pause,
  completed: CheckCircle2,
  cancelled: AlertCircle,
}

const typeColors: Record<TaskType, string> = {
  epic: "border-primary text-primary",
  feature: "border-accent text-accent",
  task: "border-muted-foreground text-muted-foreground",
  bug: "border-destructive text-destructive",
  chore: "border-muted-foreground text-muted-foreground",
}

export function TaskBoard() {
  const readyTasks = mockTasks.filter((t) => t.status === "open" || t.status === "in_progress").slice(0, 6)

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Ready Work Queue</CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Tasks with no open blockers, ready for assignment</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {readyTasks.map((task) => {
          const StatusIcon = statusIcons[task.status]
          const hasBlockers = task.dependencies.some((d) => d.type === "blocks")

          return (
            <div
              key={task.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <StatusIcon
                className={cn(
                  "w-5 h-5 mt-0.5 shrink-0",
                  task.status === "in_progress" && "text-success",
                  task.status === "blocked" && "text-destructive",
                  task.status === "open" && "text-muted-foreground",
                  task.status === "completed" && "text-primary",
                )}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <code className="text-xs text-primary font-mono">{task.id}</code>
                  <Badge className={cn("text-xs", priorityColors[task.priority])}>
                    {priorityLabels[task.priority]}
                  </Badge>
                  <Badge variant="outline" className={cn("text-xs", typeColors[task.type])}>
                    {task.type}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  {task.dependencies.length > 0 && (
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3" />
                      {task.dependencies.length} deps
                    </span>
                  )}
                  {task.estimatedHours && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.estimatedHours}h est
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
