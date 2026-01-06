"use client"

import { useState } from "react"
import { Plus, X, Bot, FolderKanban, Workflow, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Bot,
      label: "Deploy Agent",
      color: "bg-primary hover:bg-primary/90",
      action: () => toast.success("Deploy Agent clicked"),
    },
    {
      icon: FolderKanban,
      label: "New Project",
      color: "bg-accent hover:bg-accent/90",
      action: () => toast.success("New Project clicked"),
    },
    {
      icon: Workflow,
      label: "Start Workflow",
      color: "bg-green-600 hover:bg-green-700",
      action: () => toast.success("Start Workflow clicked"),
    },
    {
      icon: Users,
      label: "Add Resource",
      color: "bg-orange-600 hover:bg-orange-700",
      action: () => toast.success("Add Resource clicked"),
    },
  ]

  const handleActionClick = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3 md:hidden">
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 -z-10"
            onClick={() => setIsOpen(false)}
          />
          {actions.map((action, index) => (
            <Button
              key={index}
              size="lg"
              className={cn(
                "rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-2",
                action.color,
                "text-white"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleActionClick(action.action)}
            >
              <action.icon className="w-5 h-5 mr-2" />
              {action.label}
            </Button>
          ))}
        </>
      )}
      <Button
        size="lg"
        className={cn(
          "rounded-full shadow-lg transition-transform",
          isOpen ? "rotate-45 bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </Button>
    </div>
  )
}
