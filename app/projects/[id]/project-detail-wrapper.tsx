"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ProjectDetail } from "@/components/projects/project-detail"

interface ProjectDetailWrapperProps {
  projectId: string
}

export function ProjectDetailWrapper({ projectId }: ProjectDetailWrapperProps) {
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
          <ProjectDetail projectId={projectId} />
        </main>
      </div>
    </div>
  )
}
