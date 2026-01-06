"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockProjects, mockTasks, mockAgents, mockWorkflows } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  Circle,
  Pause,
  GitBranch,
  Bot,
  Settings,
} from "lucide-react"
import Link from "next/link"
import type { TaskStatus, TaskPriority } from "@/lib/types"

const statusColors = {
  active: "bg-success/20 text-success",
  "on-hold": "bg-warning/20 text-warning",
  completed: "bg-primary/20 text-primary",
  planning: "bg-muted text-muted-foreground",
}

const taskStatusIcons: Record<TaskStatus, typeof Circle> = {
  open: Circle,
  in_progress: Clock,
  blocked: Pause,
  completed: CheckCircle2,
  cancelled: Circle,
}

const priorityColors: Record<TaskPriority, string> = {
  0: "bg-destructive text-destructive-foreground",
  1: "bg-warning text-warning-foreground",
  2: "bg-primary text-primary-foreground",
  3: "bg-muted text-muted-foreground",
  4: "bg-muted text-muted-foreground",
}

export function ProjectDetail({ projectId }: { projectId: string }) {
  const project = mockProjects.find((p) => p.id === projectId)
  const projectTasks = mockTasks.filter((t) => t.projectId === projectId)
  const projectAgents = mockAgents.filter((a) => project?.team.includes(a.id))
  const workflow = mockWorkflows.find((w) => w.projectId === projectId)

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-muted-foreground">Project not found</p>
        <Link href="/projects">
          <Button variant="link" className="mt-2">
            Back to Projects
          </Button>
        </Link>
      </div>
    )
  }

  const budgetUsed = (project.spent / project.budget) * 100
  const daysRemaining = Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/projects">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-foreground">{project.name}</h2>
            <Badge className={cn(statusColors[project.status])}>{project.status}</Badge>
          </div>
          <p className="text-muted-foreground">{project.client}</p>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{project.progress}%</p>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{daysRemaining}</p>
                <p className="text-sm text-muted-foreground">Days Remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">${(project.spent / 1000).toFixed(0)}k</p>
                <p className="text-sm text-muted-foreground">of ${(project.budget / 1000).toFixed(0)}k Budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Bot className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{projectAgents.length}</p>
                <p className="text-sm text-muted-foreground">Agents Assigned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList className="bg-secondary">
          <TabsTrigger value="tasks">Tasks ({projectTasks.length})</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Task Dependency Graph</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projectTasks.map((task) => {
                  const StatusIcon = taskStatusIcons[task.status]
                  const agent = task.assignee ? mockAgents.find((a) => a.id === task.assignee) : null

                  return (
                    <div
                      key={task.id}
                      className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <StatusIcon
                        className={cn(
                          "w-5 h-5 shrink-0",
                          task.status === "completed" && "text-success",
                          task.status === "in_progress" && "text-warning",
                          task.status === "blocked" && "text-destructive",
                          task.status === "open" && "text-muted-foreground",
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-xs text-primary font-mono">{task.id}</code>
                          <Badge className={cn("text-xs", priorityColors[task.priority])}>P{task.priority}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {task.type}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground">{task.title}</p>
                        {task.dependencies.length > 0 && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <GitBranch className="w-3 h-3" />
                            <span>Depends on: {task.dependencies.map((d) => d.targetId).join(", ")}</span>
                          </div>
                        )}
                      </div>
                      {agent && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                          <AvatarFallback>{agent.name[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      {task.estimatedHours && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {task.actualHours || 0}h / {task.estimatedHours}h
                          </p>
                          <Progress
                            value={((task.actualHours || 0) / task.estimatedHours) * 100}
                            className="h-1 w-20"
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectAgents.map((agent) => (
              <Card key={agent.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                      <AvatarFallback>
                        <Bot className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">{agent.name}</h4>
                      <p className="text-xs text-muted-foreground capitalize">{agent.type}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Progress value={agent.utilization} className="h-1.5 flex-1" />
                        <span className="text-xs text-muted-foreground">{agent.utilization}% utilized</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        agent.status === "working" && "border-success text-success",
                        agent.status === "idle" && "border-muted-foreground text-muted-foreground",
                        agent.status === "blocked" && "border-destructive text-destructive",
                      )}
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {agent.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflow">
          {workflow ? (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">{workflow.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflow.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                          step.status === "completed" && "bg-success text-success-foreground",
                          step.status === "active" && "bg-primary text-primary-foreground",
                          step.status === "pending" && "bg-muted text-muted-foreground",
                        )}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{step.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{step.type} task</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          step.status === "completed" && "border-success text-success",
                          step.status === "active" && "border-primary text-primary",
                          step.status === "pending" && "border-muted-foreground text-muted-foreground",
                        )}
                      >
                        {step.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No workflow configured for this project</p>
                <Button className="mt-4">Create Workflow</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Timeline view coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
