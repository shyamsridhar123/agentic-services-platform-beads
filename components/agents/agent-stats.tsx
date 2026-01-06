import { Card, CardContent } from "@/components/ui/card"
import { mockAgents } from "@/lib/mock-data"
import { Bot, Cpu, CheckCircle2, AlertTriangle } from "lucide-react"

export function AgentStats() {
  const activeAgents = mockAgents.filter((a) => a.status === "working").length
  const totalTasks = mockAgents.reduce((sum, a) => sum + a.completedTasks, 0)
  const avgUtilization = mockAgents.reduce((sum, a) => sum + a.utilization, 0) / mockAgents.length
  const blockedAgents = mockAgents.filter((a) => a.status === "blocked").length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockAgents.length}</p>
              <p className="text-sm text-muted-foreground">Total Agents</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Cpu className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeAgents}</p>
              <p className="text-sm text-muted-foreground">Currently Active</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalTasks}</p>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{blockedAgents}</p>
              <p className="text-sm text-muted-foreground">Blocked Agents</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
