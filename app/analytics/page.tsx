"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { mockAgents, mockProjects, mockTasks } from "@/lib/mock-data"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Bot,
  Clock,
  Target,
  Zap,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"

const kpis = [
  {
    label: "Total Revenue",
    value: "$2.47M",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-success",
  },
  {
    label: "Active Engagements",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Target,
    color: "text-primary",
  },
  {
    label: "Agent Utilization",
    value: "78%",
    change: "+8.2%",
    trend: "up",
    icon: Bot,
    color: "text-accent",
  },
  {
    label: "Avg Delivery Time",
    value: "4.2 wks",
    change: "-0.8 wks",
    trend: "up",
    icon: Clock,
    color: "text-warning",
  },
]

const agentMetrics = mockAgents.map((agent) => ({
  ...agent,
  tasksPerDay: (Math.random() * 5 + 2).toFixed(1),
  avgCompletionTime: `${(Math.random() * 4 + 1).toFixed(1)}h`,
  accuracy: Math.round(Math.random() * 10 + 90),
  costSavings: `$${Math.round(Math.random() * 50 + 20)}K`,
}))

const projectMetrics = mockProjects.map((project) => ({
  ...project,
  onTimeRate: Math.round(Math.random() * 20 + 80),
  budgetVariance: Math.round(Math.random() * 20 - 10),
  clientSatisfaction: (Math.random() * 1 + 4).toFixed(1),
}))

const weeklyData = [
  { day: "Mon", tasks: 42, agents: 5, revenue: 48000 },
  { day: "Tue", tasks: 38, agents: 5, revenue: 52000 },
  { day: "Wed", tasks: 55, agents: 5, revenue: 61000 },
  { day: "Thu", tasks: 47, agents: 4, revenue: 44000 },
  { day: "Fri", tasks: 63, agents: 5, revenue: 72000 },
]

export default function AnalyticsPage() {
  const totalTasks = mockTasks.length
  const completedTasks = mockTasks.filter((t) => t.status === "completed").length
  const inProgressTasks = mockTasks.filter((t) => t.status === "in_progress").length
  const blockedTasks = mockTasks.filter((t) => t.status === "blocked").length

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
              <p className="text-muted-foreground">Performance metrics, agent efficiency, and business intelligence</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((kpi) => (
                <Card key={kpi.label} className="bg-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-secondary ${kpi.color}`}>
                          <kpi.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                          <p className="text-sm text-muted-foreground">{kpi.label}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          kpi.trend === "up"
                            ? "bg-success/20 text-success border-success"
                            : "bg-destructive/20 text-destructive border-destructive"
                        }
                      >
                        {kpi.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {kpi.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="agents" className="space-y-4">
              <TabsList>
                <TabsTrigger value="agents" className="gap-2">
                  <Bot className="w-4 h-4" />
                  Agent Performance
                </TabsTrigger>
                <TabsTrigger value="projects" className="gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Project Metrics
                </TabsTrigger>
                <TabsTrigger value="overview" className="gap-2">
                  <Activity className="w-4 h-4" />
                  Task Overview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="agents" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Agent Efficiency Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {agentMetrics.map((agent) => (
                        <div key={agent.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-foreground truncate">{agent.name}</p>
                              <Badge variant="outline" className="text-xs capitalize">
                                {agent.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{agent.tasksPerDay} tasks/day</span>
                              <span>{agent.avgCompletionTime} avg</span>
                              <span>{agent.accuracy}% accuracy</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-success">{agent.costSavings}</p>
                            <p className="text-xs text-muted-foreground">saved</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Weekly Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {weeklyData.map((day) => (
                          <div key={day.day} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground font-medium">{day.day}</span>
                              <span className="text-muted-foreground">{day.tasks} tasks</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={(day.tasks / 70) * 100} className="h-2 flex-1" />
                              <span className="text-xs text-muted-foreground w-16 text-right">
                                ${(day.revenue / 1000).toFixed(0)}K
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {projectMetrics.map((project) => (
                    <Card key={project.id} className="bg-card border-border">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground truncate">{project.name}</h3>
                              <Badge
                                variant="outline"
                                className={
                                  project.status === "active"
                                    ? "bg-success/20 text-success border-success"
                                    : "bg-muted text-muted-foreground"
                                }
                              >
                                {project.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{project.client}</p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            <div className="text-center">
                              <p className="text-lg font-bold text-foreground">{project.progress}%</p>
                              <p className="text-xs text-muted-foreground">Progress</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-bold text-success">{project.onTimeRate}%</p>
                              <p className="text-xs text-muted-foreground">On-Time</p>
                            </div>
                            <div className="text-center">
                              <p
                                className={`text-lg font-bold ${project.budgetVariance >= 0 ? "text-success" : "text-destructive"}`}
                              >
                                {project.budgetVariance >= 0 ? "+" : ""}
                                {project.budgetVariance}%
                              </p>
                              <p className="text-xs text-muted-foreground">Budget Var</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-bold text-primary">{project.clientSatisfaction}/5</p>
                              <p className="text-xs text-muted-foreground">CSAT</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Progress value={project.progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-card border-border">
                    <CardContent className="pt-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
                        <PieChart className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-3xl font-bold text-foreground">{totalTasks}</p>
                      <p className="text-sm text-muted-foreground">Total Tasks</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border">
                    <CardContent className="pt-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-success/20 mb-3">
                        <Zap className="w-6 h-6 text-success" />
                      </div>
                      <p className="text-3xl font-bold text-foreground">{completedTasks}</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border">
                    <CardContent className="pt-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-3">
                        <Activity className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-3xl font-bold text-foreground">{inProgressTasks}</p>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border">
                    <CardContent className="pt-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/20 mb-3">
                        <Clock className="w-6 h-6 text-destructive" />
                      </div>
                      <p className="text-3xl font-bold text-foreground">{blockedTasks}</p>
                      <p className="text-sm text-muted-foreground">Blocked</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Task Distribution by Priority</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[0, 1, 2, 3, 4].map((priority) => {
                        const count = mockTasks.filter((t) => t.priority === priority).length
                        const percentage = Math.round((count / totalTasks) * 100)
                        const labels = ["P0 - Critical", "P1 - High", "P2 - Medium", "P3 - Low", "P4 - Lowest"]
                        const colors = [
                          "bg-destructive",
                          "bg-warning",
                          "bg-primary",
                          "bg-muted-foreground",
                          "bg-muted-foreground/50",
                        ]

                        return (
                          <div key={priority} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground">{labels[priority]}</span>
                              <span className="text-muted-foreground">
                                {count} tasks ({percentage}%)
                              </span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className={`h-full ${colors[priority]} rounded-full transition-all`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
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
