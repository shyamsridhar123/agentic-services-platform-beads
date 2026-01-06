import { Card, CardContent } from "@/components/ui/card"
import { mockEngagements } from "@/lib/mock-data"
import { Briefcase, DollarSign, TrendingUp, Users } from "lucide-react"

export function EngagementStats() {
  const totalValue = mockEngagements.reduce((sum, e) => sum + e.value, 0)
  const activeEngagements = mockEngagements.filter((e) => e.status === "active").length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockEngagements.length}</p>
              <p className="text-sm text-muted-foreground">Total Engagements</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeEngagements}</p>
              <p className="text-sm text-muted-foreground">Active Engagements</p>
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
              <p className="text-2xl font-bold text-foreground">${(totalValue / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-muted-foreground">Total Value</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Users className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{new Set(mockEngagements.map((e) => e.client)).size}</p>
              <p className="text-sm text-muted-foreground">Unique Clients</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
