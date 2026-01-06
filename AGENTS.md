# Agent Instructions

## BEFORE ANYTHING ELSE

Run `bd prime` at the start of each session to load workflow context.

## Task Tracking with Beads

This project uses [Beads](https://github.com/steveyegge/beads) for distributed, git-backed task tracking optimized for AI agents.

**CRITICAL**: Use `bd` for ALL task tracking. Never use markdown TODOs or comment-based task lists.

### Quick Start

```bash
# Load workflow context (start of session)
bd prime

# List ready tasks (no blockers)
bd ready

# Create a new task with labels
bd create "Task title" -p 1 -t task -l "frontend"

# Show task details
bd show <task-id>

# Claim work
bd update <task-id> --status in_progress

# Complete work
bd close <task-id> --reason "Completed: description"

# Sync to git (end of session)
bd sync
```

### Project Labels

Use these labels consistently for this project:

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

### Task Hierarchy

Beads supports hierarchical task IDs:
- `bd-a3f8` - Epic (large feature or module)
- `bd-a3f8.1` - Task under epic
- `bd-a3f8.1.1` - Sub-task

### Priority Levels

- **P0**: Critical - blocking production or core functionality
- **P1**: High - important feature or significant bug
- **P2**: Medium - standard work items
- **P3**: Low - nice to have
- **P4**: Backlog - future consideration

### Task Types

- **epic**: Large feature or project (e.g., "Agents Module")
- **feature**: User-facing functionality
- **task**: General work item
- **bug**: Defect to fix
- **chore**: Maintenance or technical debt

### Dependency Types

- **blocks**: Child task cannot start until parent completes
- **related**: Tasks are related but not blocking
- **parent-child**: Hierarchical relationship
- **discovered-from**: Task was discovered during another task

### Agent Session Workflow

#### START OF SESSION
```bash
bd prime                              # Load workflow context
bd ready                              # See available work
bd show <id>                          # Review task details
bd update <id> --status in_progress   # Claim the work
```

#### DURING WORK
```bash
# Found a bug while working? Track it:
bd create "Found bug in X" -t bug -p 2 -l "frontend" --deps discovered-from:<current-id>

# Need to break down work? Create sub-tasks:
bd create "Sub-task description" -p 2 --parent <epic-id>

# Check what's blocked:
bd blocked
```

#### END OF SESSION
```bash
bd close <id> --reason "Completed: description"
bd sync
git push
```

### Useful Commands

```bash
# Find work by label
bd list --label frontend
bd list --label dashboard,ux

# Find high priority items
bd ready --priority 1

# See what's blocking progress
bd blocked

# Check stale issues
bd stale

# Project overview
bd status

# Health check
bd doctor
```

### Example: Feature Development

```bash
# Create an epic for a new feature
bd create "Agent Monitoring Dashboard" -t epic -p 1 -l "agents,dashboard"
# Returns: bd-xxxx

# Break it down into tasks
bd create "Design agent status cards" -p 2 -l "frontend,ux" --parent bd-xxxx
bd create "Implement real-time agent updates" -p 1 -l "api,agents" --parent bd-xxxx
bd create "Add agent activity timeline" -p 2 -l "frontend,agents" --parent bd-xxxx

# Set dependencies (activity timeline needs status cards first)
bd dep add bd-xxxx.3 bd-xxxx.1 --type blocks

# Start working
bd ready  # Shows bd-xxxx.1 and bd-xxxx.2 as ready
bd update bd-xxxx.1 --status in_progress

# Complete and move on
bd close bd-xxxx.1 --reason "Completed: agent status cards with health indicators"
bd ready  # Now bd-xxxx.3 is unblocked
```

## Development Guidelines

### Code Style
- Use TypeScript with strict typing
- Follow React best practices
- Use Tailwind CSS for styling
- Keep components small and focused

### Project Structure
```
app/           # Next.js app router pages
components/    # React components organized by feature
  ui/          # Reusable UI primitives (shadcn/ui)
  dashboard/   # Dashboard-specific components
  agents/      # Agent management components
  projects/    # Project components
  workflows/   # Workflow components
  engagements/ # Engagement components
  resources/   # Resource components
lib/           # Utilities, types, and mock data
```

### Testing
- Write tests for critical functionality
- Test mobile responsiveness on multiple screen sizes
- Ensure accessibility standards are met

### Mobile-First Design
- All UI components must be mobile-responsive
- Use mobile breakpoints: 375px (mobile), 768px (tablet), 1024px+ (desktop)
- Test on actual devices when possible

### Security
- Never commit secrets or API keys
- Validate all user inputs
- Use secure authentication patterns
- Follow OWASP guidelines

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create bd issues for anything that needs follow-up:
   ```bash
   bd create "Remaining work description" -p 2 -l "appropriate-label"
   ```

2. **Run quality gates** (if code changed):
   ```bash
   pnpm run build
   pnpm run lint  # if available
   ```

3. **Update issue status** - Close finished work, update in-progress items:
   ```bash
   bd close <id> --reason "Completed: summary"
   bd update <id> --status open  # if not finished
   ```

4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git add -A
   git commit -m "feat: description of changes"
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```

5. **Clean up** - Clear stashes, prune remote branches

6. **Verify** - All changes committed AND pushed

7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
- ALL tasks must be tracked in bd, not markdown files
