import { ProjectDetailWrapper } from "./project-detail-wrapper"

// This is required for static export
export function generateStaticParams() {
  // Generate static params for project detail pages
  // In production, fetch actual project IDs from your data source
  return ['1', '2', '3'].map(id => ({ id }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProjectDetailWrapper projectId={id} />
}
