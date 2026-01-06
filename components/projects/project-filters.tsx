"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"

export function ProjectFilters() {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-9 bg-secondary border-border" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px] bg-secondary border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px] bg-secondary border-border">
              <SelectValue placeholder="Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              <SelectItem value="acme">Acme Corporation</SelectItem>
              <SelectItem value="global">Global Bank Inc.</SelectItem>
              <SelectItem value="medicare">MediCare Systems</SelectItem>
              <SelectItem value="retailmax">RetailMax Corp</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-border bg-transparent">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
