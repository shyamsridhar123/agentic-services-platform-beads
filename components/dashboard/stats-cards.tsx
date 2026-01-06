import { Card, CardContent } from "@/components/ui/card"
import { Bot, FolderKanban, CheckCircle2, Clock, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    name: "Active Agents",
    value: "5",
    change: "+2 this week",
    changeType: "positive",
    icon: Bot,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    name: "Active Projects",
    value: "4",
    change: "12 total tasks",
    changeType: "neutral",
    icon: FolderKanban,
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    name: "Tasks Completed",
    value: "25",
    change: "+8 this week",
    changeType: "positive",
    icon: CheckCircle2,
    iconColor: "text-success",
    bgColor: "bg-success/10",
  },
  {
    name: "Ready Tasks",
    value: "7",
    change: "No blockers",
    changeType: "positive",
    icon: Clock,
    iconColor: "text-warning",
    bgColor: "bg-warning/10",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">{stat.name}</span>
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span
                  className={cn("text-xs", stat.changeType === "positive" ? "text-success" : "text-muted-foreground")}
                >
                  {stat.changeType === "positive" && <TrendingUp className="inline w-3 h-3 mr-1" />}
                  {stat.change}
                </span>
              </div>
              <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                <stat.icon className={cn("w-6 h-6", stat.iconColor)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
