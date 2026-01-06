"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockProjects } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Calendar, DollarSign, Users } from "lucide-react"

const statusColors = {
  active: "bg-success/20 text-success",
  "on-hold": "bg-warning/20 text-warning",
  completed: "bg-primary/20 text-primary",
  planning: "bg-muted text-muted-foreground",
}

export function ProjectOverview() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground">Active Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockProjects.map((project) => {
          const budgetUsed = (project.spent / project.budget) * 100

          return (
            <div
              key={project.id}
              className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-foreground">{project.name}</h4>
                  <p className="text-xs text-muted-foreground">{project.client}</p>
                </div>
                <Badge className={cn("text-xs", statusColors[project.status])}>{project.status}</Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-1.5" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(project.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="w-3 h-3" />
                    <span>
                      ${(project.spent / 1000).toFixed(0)}k / ${(project.budget / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{project.team.length} agents</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    {project.completedTasks} / {project.tasks} tasks completed
                  </span>
                  <Progress value={(project.completedTasks / project.tasks) * 100} className="h-1 w-16" />
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
