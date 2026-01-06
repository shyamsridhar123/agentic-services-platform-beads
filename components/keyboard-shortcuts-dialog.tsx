"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const shortcuts = [
  { key: "⌘K / Ctrl+K", description: "Open command menu" },
  { key: "⌘B / Ctrl+B", description: "Toggle sidebar" },
  { key: "/ or F", description: "Focus search" },
  { key: "Esc", description: "Close dialogs/menus" },
  { key: "?", description: "Show keyboard shortcuts" },
  { key: "Tab", description: "Navigate between elements" },
  { key: "↑↓", description: "Navigate lists" },
  { key: "Enter", description: "Select/Activate" },
]

export function KeyboardShortcutsDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement
        // Don't open if user is typing in an input
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
          return
        }
        e.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Use these keyboard shortcuts to navigate faster
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <span className="text-sm text-muted-foreground">{shortcut.description}</span>
              <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-muted border border-border rounded">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Press <kbd className="px-1 py-0.5 text-xs font-semibold bg-muted border border-border rounded">?</kbd> to toggle this dialog
        </p>
      </DialogContent>
    </Dialog>
  )
}
