"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockProjects, mockAgents, mockTasks } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Calendar, DollarSign, MoreHorizontal, Bot, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const statusColors = {
  active: "bg-success/20 text-success border-success/30",
  "on-hold": "bg-warning/20 text-warning border-warning/30",
  completed: "bg-primary/20 text-primary border-primary/30",
  planning: "bg-muted text-muted-foreground border-muted-foreground/30",
}

export function ProjectList() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {mockProjects.map((project) => {
        const projectAgents = mockAgents.filter((a) => project.team.includes(a.id))
        const projectTasks = mockTasks.filter((t) => t.projectId === project.id)
        const inProgressTasks = projectTasks.filter((t) => t.status === "in_progress").length
        const blockedTasks = projectTasks.filter((t) => t.status === "blocked").length
        const budgetUsed = (project.spent / project.budget) * 100
        const daysRemaining = Math.ceil(
          (new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
        )

        return (
          <Card key={project.id} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {project.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn("capitalize", statusColors[project.status])}>
                    {project.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuItem>Manage Team</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Tasks</DropdownMenuItem>
                      <DropdownMenuItem>Generate Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Overall Progress</span>
                  <span className="text-sm font-medium text-foreground">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Timeline</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
                  </p>
                  <p className="text-xs text-muted-foreground">Due {new Date(project.endDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xs">Budget</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    ${(project.spent / 1000).toFixed(0)}k / ${(project.budget / 1000).toFixed(0)}k
                  </p>
                  <div className="flex items-center gap-1">
                    <Progress value={budgetUsed} className="h-1 flex-1" />
                    <span className={cn("text-xs", budgetUsed > 80 ? "text-destructive" : "text-muted-foreground")}>
                      {budgetUsed.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Task Summary */}
              <div className="flex items-center gap-4 py-3 border-y border-border">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-sm text-foreground">{project.completedTasks} completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="text-sm text-foreground">{inProgressTasks} in progress</span>
                </div>
                {blockedTasks > 0 && (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-foreground">{blockedTasks} blocked</span>
                  </div>
                )}
              </div>

              {/* Team Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Assigned Agents</span>
                </div>
                <div className="flex -space-x-2">
                  {projectAgents.map((agent) => (
                    <Avatar key={agent.id} className="h-8 w-8 border-2 border-card" title={agent.name}>
                      <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                      <AvatarFallback>{agent.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
