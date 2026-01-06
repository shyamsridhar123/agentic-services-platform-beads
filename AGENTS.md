# Agent Instructions

## Task Tracking with Beads

This project uses [Beads](https://github.com/steveyegge/beads) for distributed, git-backed task tracking optimized for AI agents.

### Quick Start

Use `bd` commands for task tracking:

```bash
# List ready tasks (no blockers)
bd ready

# Create a new task
bd create "Task title" -p 0

# Show task details
bd show <task-id>

# Add dependencies
bd dep add <child-task> <parent-task>
```

### Task Hierarchy

Beads supports hierarchical task IDs:
- `bd-a3f8` - Epic
- `bd-a3f8.1` - Task under epic
- `bd-a3f8.1.1` - Sub-task

### Best Practices

1. **Check Ready Tasks First**: Use `bd ready` to find tasks with no open blockers
2. **Track Dependencies**: Always link related tasks using `bd dep add`
3. **Update Status**: Keep task status current as you work
4. **Use Priorities**: P0 (critical) through P4 (low priority)
5. **Git Integration**: Tasks are stored in `.beads/` and versioned with git

### Task Types

- **epic**: Large feature or project
- **feature**: User-facing functionality
- **task**: General work item
- **bug**: Defect to fix
- **chore**: Maintenance or technical debt

### Dependency Types

- **blocks**: Child task cannot start until parent completes
- **related**: Tasks are related but not blocking
- **parent-child**: Hierarchical relationship
- **discovered-from**: Task was discovered during another task

### Agent Workflow

1. Run `bd ready` to find available work
2. Review task details with `bd show <id>`
3. Update task status as you progress
4. Create sub-tasks for complex work
5. Link dependencies as you discover them
6. Mark tasks complete when done

### Example Workflow

```bash
# Find ready work
bd ready

# View task details
bd show bd-a3f8.2

# Create a sub-task
bd create "Implement authentication" -p 1 --parent bd-a3f8.2

# Add a blocker
bd dep add bd-a3f8.2.1 bd-a3f8.1

# Mark complete
bd close bd-a3f8.2.1
```

## Development Guidelines

### Code Style
- Use TypeScript with strict typing
- Follow React best practices
- Use Tailwind CSS for styling
- Keep components small and focused

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

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
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
