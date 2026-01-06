"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Bot,
  FolderKanban,
  Users,
  Workflow,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Search,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Engagements", href: "/engagements", icon: Briefcase },
  { name: "Resources", href: "/resources", icon: Users },
  { name: "Workflows", href: "/workflows", icon: Workflow },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
]

interface SidebarProps {
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    if (onMobileClose) {
      onMobileClose()
    }
  }, [pathname, onMobileClose])

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
          // Desktop styles
          "hidden md:flex",
          collapsed ? "md:w-16" : "md:w-64",
          // Mobile styles - fixed overlay
          "fixed inset-y-0 left-0 z-50 w-64",
          "md:relative md:z-auto",
          mobileOpen ? "flex" : "hidden md:flex",
        )}
      >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">AgentFlow</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          {/* Close button for mobile */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileClose}
            className="md:hidden text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="w-4 h-4" />
          </Button>
          {/* Collapse button for desktop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {!collapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
            collapsed && "justify-center",
          )}
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
    </>
  )
}
