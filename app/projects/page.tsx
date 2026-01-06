"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ProjectList } from "@/components/projects/project-list"
import { ProjectFilters } from "@/components/projects/project-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"

export default function ProjectsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const handleMobileMenuOpen = useCallback(() => {
    setMobileMenuOpen(true)
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar mobileOpen={mobileMenuOpen} onMobileClose={handleMobileMenuClose} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={handleMobileMenuOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">Projects</h2>
                <p className="text-sm md:text-base text-muted-foreground">Manage and track all professional services projects</p>
              </div>
              <Button className="bg-primary text-primary-foreground w-full sm:w-auto" onClick={() => toast.success("New Project clicked")}>
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>

            <ProjectFilters />
            <ProjectList />
          </div>
        </main>
      </div>
    </div>
  )
}
