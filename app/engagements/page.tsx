"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { EngagementList } from "@/components/engagements/engagement-list"
import { EngagementStats } from "@/components/engagements/engagement-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function EngagementsPage() {
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
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Client Engagements</h2>
                <p className="text-muted-foreground">Manage client relationships and engagement lifecycle</p>
              </div>
              <Button className="bg-primary text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                New Engagement
              </Button>
            </div>

            <EngagementStats />
            <EngagementList />
          </div>
        </main>
      </div>
    </div>
  )
}
