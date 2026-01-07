import type React from "react"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { KeyboardShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"
import "./globals.css"

export const metadata: Metadata = {
  title: "AgentFlow | Professional Services Orchestration",
  description: "AI-powered agentic orchestration platform for IT professional services",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <KeyboardShortcutsDialog />
        </ThemeProvider>
      </body>
    </html>
  )
}
