"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ProjectDetail } from "@/components/projects/project-detail"

// TODO: Replace with actual data fetching logic from your data source
// These are placeholder project IDs for static generation
const STATIC_PROJECT_IDS = ['1', '2', '3']

export async function generateStaticParams() {
  // Generate static params for project detail pages
  // In production, fetch actual project IDs from your data source
  return STATIC_PROJECT_IDS.map(id => ({ id }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // This component needs to be a Client Component wrapper
  return <ProjectDetailPageClient projectId={id} />
}

function ProjectDetailPageClient({ projectId }: { projectId: string }) {
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
