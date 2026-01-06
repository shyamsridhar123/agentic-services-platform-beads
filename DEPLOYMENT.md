# GitHub Pages Deployment Guide

This document explains how to deploy the Agentic Services Platform to GitHub Pages.

## Prerequisites

1. A GitHub repository with the code
2. GitHub Actions enabled for your repository
3. **GitHub Pages enabled in repository settings** (Settings → Pages → Source: GitHub Actions)
   - If you haven't enabled this yet, see [SETUP_GITHUB_PAGES.md](./SETUP_GITHUB_PAGES.md) for detailed instructions
   - This is **required** before the workflow will work correctly

## Deployment Setup

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the changes

### Step 2: Trigger the Workflow

The deployment workflow is configured to run automatically when:
- Code is pushed to the `main` branch
- Manually triggered from the Actions tab

To manually trigger the workflow:
1. Go to the **Actions** tab in your repository
2. Click on the **Deploy to GitHub Pages** workflow
3. Click the **Run workflow** button
4. Select the branch (usually `main`)
5. Click **Run workflow**

### Step 3: Access Your Deployed Site

Once the workflow completes successfully, your site will be available at:
```
https://shyamsridhar123.github.io/agentic-services-platform-beads/
```

The site is configured with the base path `/agentic-services-platform-beads` to work correctly on GitHub Pages.

## Configuration Details

### Next.js Configuration

The application is configured for static export in `next.config.mjs`:

```javascript
{
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
}
```

### GitHub Actions Workflow

The workflow (`.github/workflows/deploy.yml`) performs the following steps:

1. **Build Job**:
   - Checks out the code
   - Sets up Node.js and pnpm
   - Installs dependencies
   - Builds the Next.js application
   - Uploads the static files as an artifact

2. **Deploy Job**:
   - Takes the build artifact
   - Deploys it to GitHub Pages

### Base Path Configuration

The application is built with a base path to work correctly on GitHub Pages:
- Base path: `/agentic-services-platform-beads`
- This is configured via the `NEXT_PUBLIC_BASE_PATH` environment variable in the workflow

## Troubleshooting

### Workflow Fails

1. Check the Actions tab for detailed error logs
2. Ensure GitHub Pages is enabled in repository settings
3. Verify that the workflow has the correct permissions

### Site Not Loading

1. Verify the base path matches your repository name
2. Check that `.nojekyll` file is present in the output
3. Ensure all pages are being built successfully

### Dynamic Routes

For dynamic routes (like `/projects/[id]`), the `generateStaticParams` function must be implemented to pre-generate pages during build time.

## Manual Local Testing

To test the static export locally:

```bash
# Install dependencies
pnpm install

# Build the static site
NEXT_PUBLIC_BASE_PATH=/agentic-services-platform-beads pnpm build

# The static files will be in the 'out' directory
# Serve them with any static file server
npx serve out
```

## Notes

- The `.nojekyll` file prevents GitHub Pages from processing the site with Jekyll
- Images are configured as unoptimized since Next.js image optimization requires a server
- TypeScript build errors are ignored (`ignoreBuildErrors: true`) to allow faster development cycles
