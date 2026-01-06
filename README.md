# Agentic services platform

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/shyamsridhar123s-projects/v0-agentic-services-platform)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/iBIcLlK54Nj)

## GitHub Repository

**[https://github.com/shyamsridhar123/agentic-services-platform-beads](https://github.com/shyamsridhar123/agentic-services-platform-beads)**

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

### Vercel Deployment

Your project is live at:

**[https://vercel.com/shyamsridhar123s-projects/v0-agentic-services-platform](https://vercel.com/shyamsridhar123s-projects/v0-agentic-services-platform)**

### GitHub Pages Deployment

This repository is also configured for GitHub Pages deployment using GitHub Actions. 

To deploy to GitHub Pages:
1. Enable GitHub Pages in repository settings (Settings → Pages → Source: GitHub Actions)
2. Push to the `main` branch or manually trigger the workflow from the Actions tab

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Build your app

Continue building your app on:

**[https://v0.app/chat/iBIcLlK54Nj](https://v0.app/chat/iBIcLlK54Nj)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Development

### Prerequisites

- Node.js 20 or higher
- pnpm 8 or higher

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
