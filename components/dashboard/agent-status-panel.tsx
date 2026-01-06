"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockAgents, mockTasks } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import type { AgentStatus } from "@/lib/types"

const statusColors: Record<AgentStatus, string> = {
  idle: "bg-muted-foreground",
  working: "bg-success",
  blocked: "bg-destructive",
  completed: "bg-primary",
  error: "bg-destructive",
}

const statusLabels: Record<AgentStatus, string> = {
  idle: "Idle",
  working: "Working",
  blocked: "Blocked",
  completed: "Done",
  error: "Error",
}

export function AgentStatusPanel() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground flex items-center justify-between">
          Agent Orchestration
          <Badge variant="outline" className="font-normal">
            {mockAgents.filter((a) => a.status === "working").length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAgents.map((agent) => {
          const currentTask = agent.currentTask ? mockTasks.find((t) => t.id === agent.currentTask) : null

          return (
            <div
              key={agent.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                  <AvatarFallback>{agent.name[0]}</AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
                    statusColors[agent.status],
                  )}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground truncate">{agent.name}</span>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs",
                      agent.status === "working" && "bg-success/20 text-success",
                      agent.status === "blocked" && "bg-destructive/20 text-destructive",
                      agent.status === "idle" && "bg-muted text-muted-foreground",
                    )}
                  >
                    {statusLabels[agent.status]}
                  </Badge>
                </div>

                {currentTask ? (
                  <p className="text-xs text-muted-foreground truncate mb-2">
                    {currentTask.id}: {currentTask.title}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground mb-2">Awaiting task assignment</p>
                )}

                <div className="flex items-center gap-2">
                  <Progress value={agent.utilization} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground w-8">{agent.utilization}%</span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
