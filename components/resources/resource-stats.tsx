import { Card, CardContent } from "@/components/ui/card"
import { mockResources } from "@/lib/mock-data"
import { Users, UserCheck, Clock, DollarSign } from "lucide-react"

export function ResourceStats() {
  const totalResources = mockResources.length
  const availableResources = mockResources.filter((r) => r.availability > 50).length
  const avgUtilization = mockResources.reduce((sum, r) => sum + (100 - r.availability), 0) / mockResources.length
  const avgRate = mockResources.reduce((sum, r) => sum + r.hourlyRate, 0) / mockResources.length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalResources}</p>
              <p className="text-sm text-muted-foreground">Total Resources</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <UserCheck className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{availableResources}</p>
              <p className="text-sm text-muted-foreground">Available (50%+)</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{avgUtilization.toFixed(0)}%</p>
              <p className="text-sm text-muted-foreground">Avg Utilization</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <DollarSign className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${avgRate.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">Avg Hourly Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
