"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockAgents, mockTasks } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { MoreHorizontal, Pause, RefreshCw, Terminal, CheckCircle2, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { AgentStatus } from "@/lib/types"

const statusConfig: Record<AgentStatus, { color: string; bg: string; label: string }> = {
  idle: { color: "text-muted-foreground", bg: "bg-muted", label: "Idle" },
  working: { color: "text-success", bg: "bg-success/20", label: "Working" },
  blocked: { color: "text-destructive", bg: "bg-destructive/20", label: "Blocked" },
  completed: { color: "text-primary", bg: "bg-primary/20", label: "Done" },
  error: { color: "text-destructive", bg: "bg-destructive/20", label: "Error" },
}

export function AgentGrid() {
  return (
    <div className="space-y-4">
      {mockAgents.map((agent) => {
        const currentTask = agent.currentTask ? mockTasks.find((t) => t.id === agent.currentTask) : null
        const status = statusConfig[agent.status]

        return (
          <Card key={agent.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                    <AvatarFallback className="text-lg">{agent.name[0]}</AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-card",
                      agent.status === "working" && "bg-success",
                      agent.status === "idle" && "bg-muted-foreground",
                      agent.status === "blocked" && "bg-destructive",
                    )}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{agent.name}</h4>
                      <p className="text-xs text-muted-foreground capitalize">{agent.type} Agent</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={cn("text-xs", status.bg, status.color)}>{status.label}</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Terminal className="w-4 h-4 mr-2" />
                            View Logs
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Restart Agent
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause Agent
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {currentTask ? (
                    <div className="p-3 rounded-lg bg-secondary/50 mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3 h-3 text-warning" />
                        <span className="text-xs text-muted-foreground">Current Task</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs text-primary font-mono">{currentTask.id}</code>
                        <span className="text-sm text-foreground truncate">{currentTask.title}</span>
                      </div>
                      {currentTask.estimatedHours && (
                        <div className="flex items-center gap-2 mt-2">
                          <Progress
                            value={((currentTask.actualHours || 0) / currentTask.estimatedHours) * 100}
                            className="h-1 flex-1"
                          />
                          <span className="text-xs text-muted-foreground">
                            {currentTask.actualHours || 0}h / {currentTask.estimatedHours}h
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-secondary/50 mb-3 text-center">
                      <span className="text-sm text-muted-foreground">No active task</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-sm text-foreground">{agent.completedTasks} tasks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Utilization</span>
                        <Progress value={agent.utilization} className="h-2 w-20" />
                        <span className="text-sm text-foreground">{agent.utilization}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex flex-wrap gap-1">
                      {agent.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
