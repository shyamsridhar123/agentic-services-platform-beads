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
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <ProjectDetail projectId={id} />
        </main>
      </div>
    </div>
  )
}
