"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockEngagements, mockProjects } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Building2, Calendar, DollarSign, FolderKanban, MoreHorizontal, ArrowUpRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const statusColors = {
  discovery: "bg-muted text-muted-foreground",
  proposal: "bg-warning/20 text-warning",
  active: "bg-success/20 text-success",
  completed: "bg-primary/20 text-primary",
}

const typeLabels = {
  implementation: "Implementation",
  consulting: "Consulting",
  "managed-services": "Managed Services",
  "staff-augmentation": "Staff Augmentation",
}

export function EngagementList() {
  return (
    <div className="space-y-4">
      {mockEngagements.map((engagement) => {
        const engagementProjects = mockProjects.filter((p) => engagement.projects.includes(p.id))

        return (
          <Card key={engagement.id} className="bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-foreground">{engagement.name}</CardTitle>
                    <Badge className={cn(statusColors[engagement.status])}>{engagement.status}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span>{engagement.client}</span>
                    <span className="text-border">•</span>
                    <span>{typeLabels[engagement.type]}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Engagement</DropdownMenuItem>
                    <DropdownMenuItem>Add Project</DropdownMenuItem>
                    <DropdownMenuItem>Generate Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">Contract Value</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">${(engagement.value / 1000).toFixed(0)}k</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Start Date</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(engagement.startDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FolderKanban className="w-4 h-4" />
                    <span className="text-sm">Active Projects</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{engagementProjects.length} project(s)</p>
                </div>
              </div>

              {engagementProjects.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-3">Related Projects</h4>
                  <div className="flex flex-wrap gap-2">
                    {engagementProjects.map((project) => (
                      <Badge
                        key={project.id}
                        variant="outline"
                        className="cursor-pointer hover:bg-secondary transition-colors"
                      >
                        {project.name}
                        <ArrowUpRight className="w-3 h-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
