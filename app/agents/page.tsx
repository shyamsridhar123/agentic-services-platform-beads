import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AgentGrid } from "@/components/agents/agent-grid"
import { AgentStats } from "@/components/agents/agent-stats"
import { AgentActivityLog } from "@/components/agents/agent-activity-log"
import { Button } from "@/components/ui/button"
import { Plus, Settings } from "lucide-react"

export default function AgentsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">AI Agent Fleet</h2>
                <p className="text-muted-foreground">Monitor and configure AI agents for task execution</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
                <Button className="bg-primary text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Deploy Agent
                </Button>
              </div>
            </div>

            <AgentStats />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
