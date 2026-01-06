"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockWorkflows, mockAgents } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Bot, User, CheckCircle2, Stamp, Plug, ArrowRight } from "lucide-react"

const stepIcons = {
  human: User,
  agent: Bot,
  approval: Stamp,
  integration: Plug,
}

const stepStatusColors = {
  pending: "bg-muted border-muted-foreground/30",
  active: "bg-primary/20 border-primary",
  completed: "bg-success/20 border-success",
  skipped: "bg-muted border-muted-foreground/20",
}

export function WorkflowVisualizer() {
  const workflow = mockWorkflows[0]

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">{workflow.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{workflow.description}</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            {workflow.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {workflow.steps.map((step, index) => {
            const StepIcon = stepIcons[step.type]
            const agent = step.agentId ? mockAgents.find((a) => a.id === step.agentId) : null

            return (
              <div key={step.id} className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border-2 min-w-[120px] transition-all",
                    stepStatusColors[step.status],
                  )}
                >
                  <div
                    className={cn(
                      "p-2 rounded-full",
                      step.status === "completed" && "bg-success/20",
                      step.status === "active" && "bg-primary/20",
                      step.status === "pending" && "bg-muted",
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
                  <span className="text-xs font-medium text-foreground text-center">{step.name}</span>
                  {agent && <span className="text-xs text-muted-foreground">{agent.name}</span>}
                  {step.assignee && <span className="text-xs text-muted-foreground">Human Review</span>}
                </div>
                {index < workflow.steps.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
