"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, GitBranch, AlertCircle, FileText, Zap } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "task_completed",
    agent: "Developer Agent",
    task: "bd-b2c1.1",
    message: "Completed REST Gateway implementation",
    time: "2 min ago",
    icon: CheckCircle2,
    iconColor: "text-success",
  },
  {
    id: 2,
    type: "task_started",
    agent: "Architect Agent",
    task: "bd-a3f8.2",
    message: "Started architecture design phase",
    time: "8 min ago",
    icon: Clock,
    iconColor: "text-warning",
  },
  {
    id: 3,
    type: "dependency_resolved",
    agent: "Test Agent",
    task: "bd-c4d2.2",
    message: "Dependency bd-c4d2.1 resolved",
    time: "15 min ago",
    icon: GitBranch,
    iconColor: "text-primary",
  },
  {
    id: 4,
    type: "issue_discovered",
    agent: "Test Agent",
    task: "bd-c4d2.4",
    message: "Discovered security vulnerability",
    time: "22 min ago",
    icon: AlertCircle,
    iconColor: "text-destructive",
  },
  {
    id: 5,
    type: "report_generated",
    agent: "Analysis Agent",
    task: "bd-a3f8.1",
    message: "Generated assessment report",
    time: "45 min ago",
    icon: FileText,
    iconColor: "text-accent",
  },
  {
    id: 6,
    type: "auto_assigned",
    agent: "System",
    task: "bd-d5e3.2",
    message: "Auto-assigned to Review Agent",
    time: "1 hour ago",
    icon: Zap,
    iconColor: "text-primary",
  },
]

export function AgentActivityLog() {
  return (
    <Card className="bg-card border-border h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground text-base">Activity Log</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={cn("p-1.5 rounded-lg bg-secondary", activity.iconColor)}>
              <activity.icon className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity.message}</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-xs text-primary font-mono">{activity.task}</code>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{activity.agent}</span>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
