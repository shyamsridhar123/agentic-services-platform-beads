import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ProjectDetail } from "@/components/projects/project-detail"

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
