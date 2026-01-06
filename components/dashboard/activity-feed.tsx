"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, CheckCircle2, AlertCircle, GitBranch, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    type: "task_completed",
    agent: "Developer Agent",
    agentAvatar: "/robot-developer.jpg",
    task: "bd-b2c1.1",
    message: "completed REST Gateway implementation",
    time: "2 minutes ago",
    icon: CheckCircle2,
    iconColor: "text-success",
  },
  {
    id: 2,
    type: "dependency_added",
    agent: "Architect Agent",
    agentAvatar: "/robot-architect.jpg",
    task: "bd-a3f8.3",
    message: "added dependency to bd-a3f8.2",
    time: "15 minutes ago",
    icon: GitBranch,
    iconColor: "text-primary",
  },
  {
    id: 3,
    type: "task_blocked",
    agent: "Review Agent",
    agentAvatar: "/robot-reviewer.jpg",
    task: "bd-d5e3.1",
    message: "blocked - waiting for API completion",
    time: "32 minutes ago",
    icon: AlertCircle,
    iconColor: "text-destructive",
  },
  {
    id: 4,
    type: "task_started",
    agent: "Test Agent",
    agentAvatar: "/robot-tester.jpg",
    task: "bd-c4d2.3",
    message: "started penetration testing",
    time: "1 hour ago",
    icon: Clock,
    iconColor: "text-warning",
  },
  {
    id: 5,
    type: "task_completed",
    agent: "Analysis Agent",
    agentAvatar: "/robot-analyst.jpg",
    task: "bd-a3f8.1",
    message: "completed infrastructure assessment",
    time: "2 hours ago",
    icon: CheckCircle2,
    iconColor: "text-success",
  },
]

export function ActivityFeed() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground">Agent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.agentAvatar || "/placeholder.svg"} alt={activity.agent} />
              <AvatarFallback>
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{activity.agent}</span>
                <activity.icon className={cn("w-4 h-4", activity.iconColor)} />
              </div>
              <p className="text-sm text-muted-foreground">
                <code className="text-primary text-xs">{activity.task}</code> {activity.message}
              </p>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
