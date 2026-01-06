import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ProjectList } from "@/components/projects/project-list"
import { ProjectFilters } from "@/components/projects/project-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ProjectsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Projects</h2>
                <p className="text-muted-foreground">Manage and track all professional services projects</p>
              </div>
              <Button className="bg-primary text-primary-foreground">
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
