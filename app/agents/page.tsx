"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AgentGrid } from "@/components/agents/agent-grid"
import { AgentStats } from "@/components/agents/agent-stats"
import { AgentActivityLog } from "@/components/agents/agent-activity-log"
import { Button } from "@/components/ui/button"
import { Plus, Settings } from "lucide-react"
import { toast } from "sonner"

export default function AgentsPage() {
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
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">AI Agent Fleet</h2>
                <p className="text-sm md:text-base text-muted-foreground">Monitor and configure AI agents for task execution</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => toast.info("Configure clicked")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
                <Button className="bg-primary text-primary-foreground flex-1 sm:flex-none" size="sm" onClick={() => toast.success("Deploy Agent clicked")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Deploy Agent
                </Button>
              </div>
            </div>

            <AgentStats />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="lg:col-span-2">
                <AgentGrid />
              </div>
              <div>
                <AgentActivityLog />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
