"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockResources, mockProjects } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { MoreHorizontal, Calendar, DollarSign } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ResourceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {mockResources.map((resource) => {
        const assignedProjects = mockProjects.filter((p) => resource.currentProjects.includes(p.id))
        const utilization = 100 - resource.availability

        return (
          <Card key={resource.id} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={resource.avatar || "/placeholder.svg"} alt={resource.name} />
                    <AvatarFallback>{resource.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{resource.name}</h4>
                    <p className="text-xs text-muted-foreground">{resource.role}</p>
                    <p className="text-xs text-muted-foreground">{resource.department}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem>Assign to Project</DropdownMenuItem>
                    <DropdownMenuItem>View Schedule</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Availability</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        resource.availability >= 80 && "border-success text-success",
                        resource.availability >= 40 && resource.availability < 80 && "border-warning text-warning",
                        resource.availability < 40 && "border-destructive text-destructive",
                      )}
                    >
                      {resource.availability}% available
                    </Badge>
                  </div>
                  <Progress value={utilization} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="w-3 h-3" />
                    <span>${resource.hourlyRate}/hr</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{assignedProjects.length} projects</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {resource.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {resource.skills.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{resource.skills.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>

                {assignedProjects.length > 0 && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Current Projects</p>
                    <div className="space-y-1">
                      {assignedProjects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between text-xs">
                          <span className="text-foreground truncate">{project.name}</span>
                          <span className="text-muted-foreground">{project.progress}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
