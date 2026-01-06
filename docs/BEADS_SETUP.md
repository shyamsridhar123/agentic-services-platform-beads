# Beads Issue Tracking Setup

This document describes the Beads (bd) issue tracking configuration for the Agentic Services Platform.

## Overview

[Beads](https://github.com/steveyegge/beads) is a distributed, git-backed task tracking system optimized for AI agents. It stores issues as JSONL files in the `.beads/` directory, enabling version control and branch-aware issue tracking.

## Configuration

### Issue Prefix

Issues use the prefix `asp` (Agentic Services Platform):
- Example: `asp-b2p`, `asp-b2p.1`, `asp-b10`

### Git Hooks

The following git hooks are installed for automatic syncing:

| Hook | Purpose |
|------|---------|
| `pre-commit` | Sync beads data before commit |
| `post-merge` | Import changes after merge |
| `pre-push` | Ensure beads data is synced before push |
| `post-checkout` | Sync after branch checkout |
| `prepare-commit-msg` | Add issue context to commit messages |

## Project Structure

### Epics

| ID | Name | Priority | Labels |
|----|------|----------|--------|
| `asp-pl2` | Platform Core Infrastructure | P1 | frontend, api |
| `asp-b10` | Agents Module | P1 | agents, frontend |
| `asp-6r5` | Workflows Module | P1 | workflows, frontend |
| `asp-yjq` | Projects Module | P1 | projects, frontend |
| `asp-px0` | Engagements Module | P2 | engagements, frontend |
| `asp-9oq` | Analytics Module | P2 | analytics, dashboard |
| `asp-8y4` | Resources Module | P2 | resources, frontend |
| `asp-b2p` | Improved UX | P2 | ux, frontend |

### UX Epic Sub-tasks (asp-b2p)

| ID | Task | Priority | Labels |
|----|------|----------|--------|
| `asp-b2p.1` | Add loading skeletons to all data components | P2 | frontend, ux |
| `asp-b2p.2` | Implement keyboard navigation shortcuts | P2 | frontend, ux, a11y |
| `asp-b2p.3` | Add mobile responsive fixes | P1 | frontend, mobile, ux |
| `asp-b2p.4` | Improve command menu UX | P2 | frontend, ux |
| `asp-b2p.5` | Add toast notifications for actions | P2 | frontend, ux |
| `asp-b2p.6` | Improve form validation feedback | P2 | frontend, ux |

## Labels

Use these labels consistently across the project:

| Label | Description |
|-------|-------------|
| `frontend` | React/Next.js UI components |
| `dashboard` | Dashboard page components |
| `agents` | Agent management features |
| `workflows` | Workflow visualization |
| `projects` | Project management features |
| `engagements` | Engagement tracking |
| `analytics` | Analytics and reporting |
| `resources` | Resource management |
| `mobile` | Mobile responsiveness |
| `a11y` | Accessibility improvements |
| `api` | API/data layer work |
| `ux` | User experience improvements |

## Workflow Formulas

Custom workflow formulas are stored in `.beads/formulas/`:

### Feature Formula

**File:** `.beads/formulas/feature.formula.toml`

A 6-step workflow for feature development:

1. **Design** - Create design specs and wireframes
2. **Implement** - Build core functionality
3. **Style** - Apply Tailwind CSS and responsive design
4. **Test** - Test functionality and accessibility
5. **Review** - Code review (human gate)
6. **Merge** - Merge to main branch

**Usage:**
```bash
bd mol pour feature --var feature_name="Agent Health Dashboard"
```

### Bugfix Formula

**File:** `.beads/formulas/bugfix.formula.toml`

A 4-step workflow for bug fixes:

1. **Investigate** - Reproduce and identify root cause
2. **Fix** - Implement the fix
3. **Test** - Verify fix and check for regressions
4. **Review** - Code review (human gate)

**Usage:**
```bash
bd mol pour bugfix --var bug_description="Login fails on mobile"
```

## Common Commands

### Starting a Session

```bash
bd prime                              # Load workflow context
bd ready                              # See available work
bd show <id>                          # Review task details
bd update <id> --status in_progress   # Claim the work
```

### During Work

```bash
# Found a bug while working?
bd create "Bug description" -t bug -p 2 -l "frontend" --deps discovered-from:<current-id>

# Create sub-tasks
bd create "Sub-task" -p 2 --parent <epic-id>

# Check blocked items
bd blocked
```

### Finding Work

```bash
# By label
bd list --label frontend
bd list --label dashboard,ux

# By priority
bd ready --priority 1

# Project overview
bd status
```

### Ending a Session

```bash
bd close <id> --reason "Completed: description"
bd sync
git add -A
git commit -m "feat: description"
git push
```

## Priority Levels

| Priority | Description |
|----------|-------------|
| P0 | Critical - blocking production |
| P1 | High - important feature or bug |
| P2 | Medium - standard work items |
| P3 | Low - nice to have |
| P4 | Backlog - future consideration |

## Task Types

| Type | Description |
|------|-------------|
| `epic` | Large feature or project |
| `feature` | User-facing functionality |
| `task` | General work item |
| `bug` | Defect to fix |
| `chore` | Maintenance or technical debt |

## Dependency Types

| Type | Description |
|------|-------------|
| `blocks` | Child cannot start until parent completes |
| `related` | Tasks are related but not blocking |
| `parent-child` | Hierarchical relationship |
| `discovered-from` | Task discovered during another task |

## File Structure

```
.beads/
├── beads.db           # SQLite cache for fast queries
├── config.yaml        # Beads configuration
├── issues.jsonl       # Issue data (git-tracked)
├── interactions.jsonl # Interaction history
├── formulas/          # Workflow templates
│   ├── feature.formula.toml
│   └── bugfix.formula.toml
└── README.md          # Auto-generated readme
```

## Troubleshooting

### Health Check
```bash
bd doctor
```

### View Stale Issues
```bash
bd stale
```

### Check Daemon Status
```bash
bd info | grep daemon
```

### Force Direct Mode (Skip Daemon)
```bash
bd --no-daemon ready
```

## Resources

- [Beads GitHub Repository](https://github.com/steveyegge/beads)
- [CLI Reference](https://github.com/steveyegge/beads/blob/main/docs/CLI_REFERENCE.md)
- [Workflow Formulas](https://github.com/steveyegge/beads/blob/main/docs/MOLECULES.md)
- [Project AGENTS.md](../AGENTS.md) - Agent instructions for this project
