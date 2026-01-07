# Agentic Services Platform

AI-powered agentic orchestration platform for IT professional services.

## GitHub Repository

**[https://github.com/shyamsridhar123/agentic-services-platform-beads](https://github.com/shyamsridhar123/agentic-services-platform-beads)**

## Deployment

### GitHub Pages Deployment

This repository is also configured for GitHub Pages deployment using GitHub Actions. 

To deploy to GitHub Pages:
1. Enable GitHub Pages in repository settings (Settings → Pages → Source: GitHub Actions)
2. Push to the `main` branch or manually trigger the workflow from the Actions tab

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Task Tracking with Beads

This project uses **[Beads](https://github.com/steveyegge/beads)** for AI-native, git-backed issue tracking.

### Where is Beads Implemented?

The Beads implementation is located in the **`.beads/`** directory:

```
.beads/
├── .gitignore          # Ignores database files, keeps JSONL tracked
├── README.md           # Beads documentation and getting started guide
├── config.yaml         # Beads configuration (2.3KB)
├── metadata.json       # Repository metadata
├── issues.jsonl        # Issue tracking database (JSONL format, git-tracked)
├── interactions.jsonl  # Audit log for agent actions (git-tracked)
└── beads.db           # Local SQLite cache (gitignored)
```

### Using Beads

```bash
# List ready tasks (no blockers)
bd ready

# Create a new task
bd create "Task title" -p 0

# Show task details
bd show <task-id>

# List all tasks
bd list

# Close a task
bd close <task-id>
```

For detailed Beads documentation, see:
- **`.beads/README.md`** - Quick start guide in this repo
- **`AGENTS.md`** - Agent workflow and best practices
- **[Beads GitHub](https://github.com/steveyegge/beads)** - Full documentation

## Development

### Prerequisites

- Node.js 20 or higher
- pnpm 8 or higher
- Beads CLI (`bd` command) for task tracking

### Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Build static export for GitHub Pages
NEXT_PUBLIC_BASE_PATH=/agentic-services-platform-beads pnpm build
```
