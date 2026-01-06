"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { AgentStatusPanel } from "@/components/dashboard/agent-status-panel"
import { TaskBoard } from "@/components/dashboard/task-board"
import { ProjectOverview } from "@/components/dashboard/project-overview"
import { WorkflowVisualizer } from "@/components/dashboard/workflow-visualizer"
import { ActivityFeed } from "@/components/dashboard/activity-feed"

export default function DashboardPage() {
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
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">Orchestration Dashboard</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Monitor AI agents, track project progress, and manage professional services workflows
              </p>
            </div>

            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                <WorkflowVisualizer />
                <TaskBoard />
              </div>
              <div className="space-y-4 md:space-y-6">
                <AgentStatusPanel />
                <ActivityFeed />
              </div>
            </div>

            <ProjectOverview />
          </div>
        </main>
      </div>
    </div>
  )
}
