"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { mockWorkflows, mockAgents, mockProjects } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  Bot,
  User,
  CheckCircle2,
  Stamp,
  Plug,
  Plus,
  Pause,
  RotateCcw,
  Clock,
  GitBranch,
  Zap,
  ArrowUpRight,
} from "lucide-react"
import type { Workflow, WorkflowStep } from "@/lib/types"

const stepIcons = {
  human: User,
  agent: Bot,
  approval: Stamp,
  integration: Plug,
}

const statusColors = {
  draft: "bg-muted text-muted-foreground",
  active: "bg-success/20 text-success border-success",
  paused: "bg-warning/20 text-warning border-warning",
  completed: "bg-primary/20 text-primary border-primary",
}

const stepStatusColors = {
  pending: "bg-muted border-muted-foreground/30",
  active: "bg-primary/20 border-primary ring-2 ring-primary/20",
  completed: "bg-success/20 border-success",
  skipped: "bg-muted/50 border-muted-foreground/20 opacity-50",
}

function getWorkflowProgress(steps: WorkflowStep[]): number {
  const completed = steps.filter((s) => s.status === "completed").length
  return Math.round((completed / steps.length) * 100)
}

const workflowTemplates = [
  {
    id: "template-1",
    name: "Cloud Migration",
    description: "End-to-end cloud migration with assessment and validation",
    steps: 7,
    avgDuration: "4-6 weeks",
  },
  {
    id: "template-2",
    name: "Security Audit",
    description: "Comprehensive security assessment and compliance check",
    steps: 5,
    avgDuration: "2-3 weeks",
  },
  {
    id: "template-3",
    name: "API Integration",
    description: "API design, development, and deployment pipeline",
    steps: 6,
    avgDuration: "3-4 weeks",
  },
  {
    id: "template-4",
    name: "Data Pipeline",
    description: "ETL workflow with validation and monitoring",
    steps: 8,
    avgDuration: "5-7 weeks",
  },
]

export default function WorkflowsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(mockWorkflows[0])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const handleMobileMenuOpen = useCallback(() => {
    setMobileMenuOpen(true)
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar mobileOpen={mobileMenuOpen} onMobileClose={handleMobileMenuClose} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={handleMobileMenuOpen} />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Workflow Orchestration</h2>
                <p className="text-muted-foreground">
                  Design and manage automated workflows combining human and AI agent tasks
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Workflow
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-sm text-muted-foreground">Active Workflows</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/20">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">89</p>
                      <p className="text-sm text-muted-foreground">Steps Completed Today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/20">
                      <Bot className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">78%</p>
                      <p className="text-sm text-muted-foreground">Agent Automation Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-warning/20">
                      <Clock className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">2.4h</p>
                      <p className="text-sm text-muted-foreground">Avg Step Duration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="active" className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">Active Workflows</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1 space-y-3">
                    {mockWorkflows.map((workflow) => {
                      const project = mockProjects.find((p) => p.id === workflow.projectId)
                      const progress = getWorkflowProgress(workflow.steps)

                      return (
                        <Card
                          key={workflow.id}
                          className={cn(
                            "bg-card border-border cursor-pointer transition-all hover:border-primary/50",
                            selectedWorkflow?.id === workflow.id && "border-primary ring-1 ring-primary/20",
                          )}
                          onClick={() => setSelectedWorkflow(workflow)}
                        >
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-foreground">{workflow.name}</h3>
                                <p className="text-xs text-muted-foreground">{project?.name}</p>
                              </div>
                              <Badge variant="outline" className={cn("text-xs", statusColors[workflow.status])}>
                                {workflow.status}
                              </Badge>
                            </div>
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                <span>Progress</span>
                                <span>{progress}%</span>
                              </div>
                              <Progress value={progress} className="h-1.5" />
                            </div>
                            <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <GitBranch className="w-3 h-3" />
                                {workflow.steps.length} steps
                              </span>
                              <span className="flex items-center gap-1">
                                <Bot className="w-3 h-3" />
                                {workflow.steps.filter((s) => s.type === "agent").length} agent tasks
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>

                  <div className="lg:col-span-2">
                    {selectedWorkflow && (
                      <Card className="bg-card border-border">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-foreground">{selectedWorkflow.name}</CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">{selectedWorkflow.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                                <Pause className="w-4 h-4" />
                                Pause
                              </Button>
                              <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                                <RotateCcw className="w-4 h-4" />
                                Restart
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {selectedWorkflow.steps.map((step, index) => {
                              const StepIcon = stepIcons[step.type]
                              const agent = step.agentId ? mockAgents.find((a) => a.id === step.agentId) : null

                              return (
                                <div key={step.id} className="flex items-start gap-4">
                                  <div className="flex flex-col items-center">
                                    <div
                                      className={cn(
                                        "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all",
                                        stepStatusColors[step.status],
                                      )}
                                    >
                                      {step.status === "completed" ? (
                                        <CheckCircle2 className="w-5 h-5 text-success" />
                                      ) : (
                                        <StepIcon
                                          className={cn(
                                            "w-5 h-5",
                                            step.status === "active" && "text-primary",
                                            step.status === "pending" && "text-muted-foreground",
                                          )}
                                        />
                                      )}
                                    </div>
                                    {index < selectedWorkflow.steps.length - 1 && (
                                      <div
                                        className={cn(
                                          "w-0.5 h-12 mt-2",
                                          step.status === "completed" ? "bg-success" : "bg-border",
                                        )}
                                      />
                                    )}
                                  </div>
                                  <div className="flex-1 pt-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium text-foreground">{step.name}</h4>
                                      <Badge variant="outline" className="text-xs capitalize">
                                        {step.type}
                                      </Badge>
                                      {step.status === "active" && (
                                        <Badge className="text-xs bg-primary/20 text-primary border-0">
                                          In Progress
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                      {agent && (
                                        <span className="flex items-center gap-1">
                                          <Bot className="w-3 h-3" />
                                          {agent.name}
                                        </span>
                                      )}
                                      {step.assignee && (
                                        <span className="flex items-center gap-1">
                                          <User className="w-3 h-3" />
                                          Human Review Required
                                        </span>
                                      )}
                                    </div>
                                    {step.outputs.length > 0 && (
                                      <div className="flex items-center gap-2 mt-2">
                                        {step.outputs.map((output) => (
                                          <Badge key={output} variant="outline" className="text-xs bg-secondary">
                                            {output}
                                          </Badge>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {workflowTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 rounded-lg bg-primary/20">
                            <Zap className="w-5 h-5 text-primary" />
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <GitBranch className="w-3 h-3" />
                            {template.steps} steps
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {template.avgDuration}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history">
                <Card className="bg-card border-border">
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Workflow history will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
