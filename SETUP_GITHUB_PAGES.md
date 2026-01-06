# GitHub Pages Setup Instructions

This guide will help you enable GitHub Pages for this repository and deploy the application.

## Prerequisites

- Admin access to the repository
- GitHub Actions must be enabled for your repository

## Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/shyamsridhar123/agentic-services-platform-beads

2. Click on **Settings** (in the top navigation bar)

3. In the left sidebar, scroll down and click on **Pages**

4. Under **Source**, select **GitHub Actions** from the dropdown menu

5. Click **Save** (if there's a save button)

That's it! GitHub Pages is now enabled for your repository.

## Step 2: Trigger the Deployment Workflow

There are two ways to deploy:

### Option A: Automatic Deployment (on push to main)

The workflow is configured to automatically deploy when you push to the `main` branch. Simply merge your pull request or push directly to `main`.

### Option B: Manual Deployment

1. Go to the **Actions** tab in your repository

2. Click on **Deploy to GitHub Pages** in the left sidebar

3. Click the **Run workflow** dropdown button (on the right side)

4. Select the branch you want to deploy (usually `main` or `copilot/deploy-github-pages`)

5. Click the green **Run workflow** button

6. Wait for the workflow to complete (usually takes 2-3 minutes)

## Step 3: Access Your Deployed Site

Once the workflow completes successfully (green checkmark ✓), your site will be live at:

**https://shyamsridhar123.github.io/agentic-services-platform-beads/**

## Troubleshooting

### Workflow Fails with "Resource not accessible by integration"

This error means GitHub Pages isn't enabled in the repository settings. Follow Step 1 above.

### Workflow Fails with "Not Found" error

This means GitHub Pages was never set up. Follow Step 1 above to enable it.

### Site Shows 404 Error

1. Make sure the workflow completed successfully
2. Wait a few minutes for GitHub's CDN to update
3. Try clearing your browser cache
4. Verify the URL is exactly: https://shyamsridhar123.github.io/agentic-services-platform-beads/

### Build Fails

If the build step fails:
1. Check the workflow logs in the Actions tab
2. Try running `pnpm build` locally to reproduce the issue
3. Fix any TypeScript or build errors
4. Push your changes and try again

## Verifying the Setup

After enabling GitHub Pages, you should see:

1. In the **Pages** settings:
   - Source: GitHub Actions
   - A message showing the deployment status

2. In the **Actions** tab:
   - The "Deploy to GitHub Pages" workflow should be visible
   - Recent runs should show in the list

3. In the **Environments** section (left sidebar):
   - An environment called "github-pages" should exist
   - It should show recent deployments

## Testing the Deployment Locally

To test the static export locally before deploying:

```bash
# Install dependencies
pnpm install

# Build the static site
NEXT_PUBLIC_BASE_PATH=/agentic-services-platform-beads pnpm build

# Serve the static files (install serve if needed)
npx serve out

# Visit http://localhost:3000/agentic-services-platform-beads in your browser
```

## Next Steps

Once GitHub Pages is enabled and the first deployment succeeds:

1. Future pushes to `main` will automatically deploy
2. You can manually trigger deployments from the Actions tab anytime
3. The deployment typically takes 2-3 minutes
4. You'll receive email notifications if deployments fail

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
